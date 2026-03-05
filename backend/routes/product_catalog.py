"""Product Catalog API routes - individual products with search, filter, pagination"""
from fastapi import APIRouter, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from models.product import Product, ProductCreate, ProductUpdate, ProductListResponse
from utils.cache import cache
from datetime import datetime, timezone
from uuid import uuid4
import os
import re
import logging
import math

router = APIRouter(prefix="/api/catalog", tags=["product-catalog"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


@router.get("/products", response_model=ProductListResponse)
async def list_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    brand_slug: Optional[str] = None,
    sub_category: Optional[str] = None,
    featured: Optional[bool] = None,
    sort: Optional[str] = Query(default="name_asc", regex="^(name_asc|name_desc|newest|oldest)$"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=24, ge=1, le=100),
):
    """List products with search, filter, sort, and pagination"""
    try:
        query = {"published": True}

        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"brand": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"category": {"$regex": search, "$options": "i"}},
            ]

        if category:
            query["category"] = {"$regex": f"^{re.escape(category)}$", "$options": "i"}

        if brand_slug:
            query["brand_slug"] = brand_slug
        elif brand:
            query["brand"] = {"$regex": f"^{re.escape(brand)}$", "$options": "i"}

        if sub_category:
            query["sub_category"] = {"$regex": f"^{re.escape(sub_category)}$", "$options": "i"}

        if featured is not None:
            query["featured"] = featured

        # Sorting
        sort_map = {
            "name_asc": [("name", 1)],
            "name_desc": [("name", -1)],
            "newest": [("created_at", -1)],
            "oldest": [("created_at", 1)],
        }
        sort_spec = sort_map.get(sort, [("name", 1)])

        # Count total
        total = await db.catalog_products.count_documents(query)
        total_pages = math.ceil(total / page_size) if total > 0 else 1

        # Fetch page
        skip = (page - 1) * page_size
        products = await db.catalog_products.find(query, {"_id": 0}).sort(sort_spec).skip(skip).limit(page_size).to_list(page_size)

        return ProductListResponse(
            products=products,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )
    except Exception as e:
        logger.error(f"List products error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch products")


@router.get("/recommendations/{slug}")
async def get_recommendations(slug: str, limit: int = Query(default=8, ge=1, le=20)):
    """Get smart product recommendations for a given product.
    Priority: 1) Same series  2) Same brand+category  3) Same category  4) Featured
    """
    try:
        product = await db.catalog_products.find_one({"slug": slug, "published": True}, {"_id": 0})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        recs = []
        seen = {product["id"]}

        # Tier 1: Same series (highest relevance)
        if product.get("sub_category"):
            tier1 = await db.catalog_products.find(
                {"sub_category": product["sub_category"], "published": True, "id": {"$nin": list(seen)}},
                {"_id": 0}
            ).limit(limit).to_list(limit)
            for p in tier1:
                if p["id"] not in seen:
                    p["_rec_reason"] = f"Same series: {product['sub_category']}"
                    recs.append(p)
                    seen.add(p["id"])

        # Tier 2: Same brand + category
        if len(recs) < limit:
            remaining = limit - len(recs)
            tier2 = await db.catalog_products.find(
                {"brand": product["brand"], "category": product["category"], "published": True, "id": {"$nin": list(seen)}},
                {"_id": 0}
            ).limit(remaining).to_list(remaining)
            for p in tier2:
                if p["id"] not in seen:
                    p["_rec_reason"] = f"Same brand & category"
                    recs.append(p)
                    seen.add(p["id"])

        # Tier 3: Same category, different brand
        if len(recs) < limit:
            remaining = limit - len(recs)
            tier3 = await db.catalog_products.find(
                {"category": product["category"], "published": True, "id": {"$nin": list(seen)}},
                {"_id": 0}
            ).limit(remaining).to_list(remaining)
            for p in tier3:
                if p["id"] not in seen:
                    p["_rec_reason"] = "Similar category"
                    recs.append(p)
                    seen.add(p["id"])

        # Tier 4: Featured products fallback
        if len(recs) < limit:
            remaining = limit - len(recs)
            tier4 = await db.catalog_products.find(
                {"featured": True, "published": True, "id": {"$nin": list(seen)}},
                {"_id": 0}
            ).limit(remaining).to_list(remaining)
            for p in tier4:
                if p["id"] not in seen:
                    p["_rec_reason"] = "Featured product"
                    recs.append(p)
                    seen.add(p["id"])

        return {"product": slug, "recommendations": recs[:limit]}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Recommendations error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get recommendations")


@router.get("/featured")
async def get_featured_products(limit: int = Query(default=8, ge=1, le=20)):
    """Get featured/curated products for homepage display.
    Returns a diverse mix across categories and brands.
    """
    try:
        # First try featured products
        featured = await db.catalog_products.find(
            {"featured": True, "published": True},
            {"_id": 0}
        ).limit(limit).to_list(limit)

        if len(featured) >= limit:
            return {"products": featured[:limit]}

        # If not enough featured, pick diverse products across categories
        pipeline = [
            {"$match": {"published": True, "image": {"$ne": ""}, "image": {"$exists": True}}},
            {"$sort": {"image": -1}},
            {"$group": {
                "_id": "$category",
                "products": {"$push": {
                    "id": "$id", "slug": "$slug", "name": "$name",
                    "brand": "$brand", "category": "$category",
                    "sub_category": "$sub_category", "image": "$image",
                    "description": "$description",
                }}
            }},
            {"$project": {
                "category": "$_id",
                "sample": {"$slice": ["$products", 2]}
            }}
        ]
        categories = await db.catalog_products.aggregate(pipeline).to_list(20)

        seen = {p["id"] for p in featured}
        for cat in categories:
            for p in cat.get("sample", []):
                if p["id"] not in seen and len(featured) < limit:
                    featured.append(p)
                    seen.add(p["id"])

        return {"products": featured[:limit]}
    except Exception as e:
        logger.error(f"Featured products error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch featured products")


@router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    """Get a single product by slug"""
    try:
        product = await db.catalog_products.find_one({"slug": slug, "published": True}, {"_id": 0})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch product")


@router.get("/categories")
async def get_categories():
    """Get all unique product categories with counts"""
    try:
        pipeline = [
            {"$match": {"published": True}},
            {"$group": {"_id": "$category", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}},
        ]
        results = await db.catalog_products.aggregate(pipeline).to_list(100)
        return [{"name": r["_id"], "count": r["count"]} for r in results if r["_id"]]
    except Exception as e:
        logger.error(f"Get categories error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch categories")


@router.get("/brands")
async def get_catalog_brands():
    """Get all unique brands in the catalog with counts"""
    try:
        pipeline = [
            {"$match": {"published": True}},
            {"$group": {"_id": "$brand", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}},
        ]
        results = await db.catalog_products.aggregate(pipeline).to_list(100)
        return [{"name": r["_id"], "count": r["count"]} for r in results if r["_id"]]
    except Exception as e:
        logger.error(f"Get catalog brands error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch brands")


@router.get("/series")
async def get_series():
    """Get all unique sub-categories/series with counts"""
    try:
        pipeline = [
            {"$match": {"published": True, "sub_category": {"$ne": None, "$ne": ""}}},
            {"$group": {"_id": "$sub_category", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}},
        ]
        results = await db.catalog_products.aggregate(pipeline).to_list(200)
        return [{"name": r["_id"], "count": r["count"]} for r in results if r["_id"]]
    except Exception as e:
        logger.error(f"Get series error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch series")


# --- Admin endpoints ---

@router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    """Create a new product (admin)"""
    try:
        now = datetime.now(timezone.utc).isoformat()
        slug = slugify(product.name)

        # Ensure unique slug
        existing = await db.catalog_products.find_one({"slug": slug})
        if existing:
            slug = f"{slug}-{str(uuid4())[:8]}"

        product_dict = product.model_dump()
        product_dict["id"] = str(uuid4())
        product_dict["slug"] = slug
        product_dict["created_at"] = now
        product_dict["updated_at"] = now

        await db.catalog_products.insert_one(product_dict)
        product_dict.pop("_id", None)
        return product_dict
    except Exception as e:
        logger.error(f"Create product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create product")


@router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductUpdate):
    """Update a product (admin)"""
    try:
        update_data = {k: v for k, v in product.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()

        result = await db.catalog_products.find_one_and_update(
            {"id": product_id},
            {"$set": update_data},
            return_document=True,
        )
        if not result:
            raise HTTPException(status_code=404, detail="Product not found")
        result.pop("_id", None)
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update product")


@router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """Delete a product (admin)"""
    try:
        result = await db.catalog_products.delete_one({"id": product_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": "Product deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete product")
