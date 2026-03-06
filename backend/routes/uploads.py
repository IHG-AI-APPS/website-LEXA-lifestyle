"""
File Upload Routes
Handles image and document uploads — stores files on external server via SFTP
"""

import os
import uuid
import logging
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from fastapi.responses import FileResponse
import aiofiles
from utils.remote_storage import upload_to_remote, delete_from_remote

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/uploads", tags=["uploads"])

# Local upload dir (fallback for serving legacy files)
UPLOAD_DIR = "/app/backend/uploads"
ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
ALLOWED_DOC_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
MAX_PDF_SIZE = 50 * 1024 * 1024  # 50MB for PDFs

# Ensure local dirs exist (for serving legacy files)
os.makedirs(f"{UPLOAD_DIR}/images", exist_ok=True)
os.makedirs(f"{UPLOAD_DIR}/documents", exist_ok=True)
os.makedirs(f"{UPLOAD_DIR}/logos", exist_ok=True)
os.makedirs(f"{UPLOAD_DIR}/catalogues", exist_ok=True)


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    category: Optional[str] = Form(default="images")
):
    """Upload an image file to remote storage"""
    try:
        if file.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_IMAGE_TYPES)}"
            )

        content = await file.read()

        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB"
            )

        file_ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        unique_filename = f"{uuid.uuid4().hex[:12]}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{file_ext}"

        # Upload to remote server
        file_url = upload_to_remote(content, category, unique_filename)

        logger.info(f"Image uploaded: {file_url}")

        return {
            "success": True,
            "url": file_url,
            "filename": unique_filename,
            "original_filename": file.filename,
            "size": len(content),
            "content_type": file.content_type,
            "category": category
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    category: Optional[str] = Form(default="catalogues")
):
    """Upload a PDF document to remote storage"""
    try:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")

        content = await file.read()

        if len(content) > MAX_PDF_SIZE:
            raise HTTPException(status_code=400, detail=f"File too large. Maximum: {MAX_PDF_SIZE // (1024*1024)}MB")

        unique_filename = f"{uuid.uuid4().hex[:12]}_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"

        file_url = upload_to_remote(content, category, unique_filename)
        logger.info(f"PDF uploaded: {file_url}")

        return {
            "success": True,
            "url": file_url,
            "filename": unique_filename,
            "original_filename": file.filename,
            "size": len(content),
            "content_type": "application/pdf",
            "category": category
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"PDF upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.post("/multiple")
async def upload_multiple_images(
    files: list[UploadFile] = File(...),
    category: Optional[str] = Form(default="images")
):
    """Upload multiple image files to remote storage"""
    results = []
    errors = []

    for file in files:
        try:
            if file.content_type not in ALLOWED_IMAGE_TYPES:
                errors.append({"filename": file.filename, "error": "Invalid file type"})
                continue

            content = await file.read()

            if len(content) > MAX_FILE_SIZE:
                errors.append({"filename": file.filename, "error": "File too large"})
                continue

            file_ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
            unique_filename = f"{uuid.uuid4().hex[:12]}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{file_ext}"

            file_url = upload_to_remote(content, category, unique_filename)

            results.append({
                "url": file_url,
                "filename": unique_filename,
                "original_filename": file.filename,
                "size": len(content)
            })

        except Exception as e:
            errors.append({"filename": file.filename, "error": str(e)})

    return {
        "success": len(results) > 0,
        "uploaded": results,
        "errors": errors,
        "total_uploaded": len(results),
        "total_errors": len(errors)
    }


@router.get("/files/{category}/{filename}")
async def serve_uploaded_file(category: str, filename: str):
    """Serve a locally stored file (legacy support)"""
    file_path = f"{UPLOAD_DIR}/{category}/{filename}"

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    ext = filename.split(".")[-1].lower()
    content_types = {
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "png": "image/png",
        "gif": "image/gif",
        "webp": "image/webp",
        "svg": "image/svg+xml",
        "pdf": "application/pdf"
    }
    content_type = content_types.get(ext, "application/octet-stream")

    return FileResponse(
        file_path,
        media_type=content_type,
        headers={
            "Cache-Control": "public, max-age=31536000",
            "Content-Disposition": "inline"
        }
    )


@router.delete("/files/{category}/{filename}")
async def delete_uploaded_file(category: str, filename: str):
    """Delete a file from remote storage"""
    try:
        # Try remote delete
        deleted = delete_from_remote(category, filename)

        # Also try local delete if exists
        local_path = f"{UPLOAD_DIR}/{category}/{filename}"
        if os.path.exists(local_path):
            os.remove(local_path)

        if deleted:
            return {"success": True, "message": "File deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to delete file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")
