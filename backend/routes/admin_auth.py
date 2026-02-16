"""
Admin authentication routes
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from models.admin import User, UserLogin
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
import jwt
import os
import logging

router = APIRouter(prefix="/api/admin", tags=["admin-auth"])
logger = logging.getLogger(__name__)
security = HTTPBearer()

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT config
SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
if not SECRET_KEY and os.environ.get("FLASK_ENV") == "production":
    raise ValueError("JWT_SECRET_KEY environment variable is required")
elif not SECRET_KEY:
    SECRET_KEY = "development-secret-key-not-for-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"username": username}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/login")
async def login(credentials: UserLogin):
    """Admin login"""
    try:
        user = await db.users.find_one({"username": credentials.username}, {"_id": 0})
        
        if not user or not verify_password(credentials.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid username or password")
        
        # Create access token
        access_token = create_access_token(data={"sub": user["username"]})
        
        # Log activity
        await db.activity_logs.insert_one({
            "user_id": user["id"],
            "action": "login",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "details": {"username": user["username"]},
            "ip": "",
            "status": "success"
        })
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "username": user["username"],
                "email": user["email"],
                "role": user["role"]
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")


@router.post("/logout")
async def logout(user: dict = Depends(verify_token)):
    """Admin logout"""
    try:
        await db.activity_logs.insert_one({
            "user_id": user["username"],
            "action": "logout",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "details": {},
            "ip": "",
            "status": "success"
        })
        return {"message": "Logged out successfully"}
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        raise HTTPException(status_code=500, detail="Logout failed")


@router.get("/me")
async def get_current_user(user: dict = Depends(verify_token)):
    """Get current user info"""
    try:
        user_doc = await db.users.find_one({"username": user["username"]}, {"_id": 0, "hashed_password": 0})
        if not user_doc:
            raise HTTPException(status_code=404, detail="User not found")
        return user_doc
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get user error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get user")
