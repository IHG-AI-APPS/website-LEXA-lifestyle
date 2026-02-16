"""
Shared authentication utilities for all admin routes
"""
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# Security
security = HTTPBearer()

# JWT config - must match server.py
SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
if not SECRET_KEY and os.environ.get("FLASK_ENV") == "production":
    raise ValueError("JWT_SECRET_KEY environment variable is required for production deployment")
elif not SECRET_KEY:
    SECRET_KEY = "development-secret-key-not-for-production"

ALGORITHM = "HS256"


async def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Shared dependency to verify JWT token"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return {"username": username}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
