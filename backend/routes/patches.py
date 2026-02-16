"""
Patch Management API Routes
Handles patch upload, apply, rollback, and history
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Depends
from fastapi.responses import JSONResponse
from typing import List
import os
import shutil
import zipfile
from datetime import datetime
from uuid import uuid4
import json
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import DESCENDING

router = APIRouter(prefix="/api/patches", tags=["patches"])

# Configuration
PATCHES_DIR = "/app/patches"
BACKUPS_DIR = "/app/backups"
MAX_PATCH_SIZE = 100 * 1024 * 1024  # 100MB
ALLOWED_EXTENSIONS = ['.zip']

# Ensure directories exist
os.makedirs(PATCHES_DIR, exist_ok=True)
os.makedirs(BACKUPS_DIR, exist_ok=True)

# Get database
def get_db():
    from motor.motor_asyncio import AsyncIOMotorClient
    client = AsyncIOMotorClient(os.getenv('MONGO_URL'))
    return client[os.getenv('DB_NAME', 'smart_home_db')]

@router.get("/")
async def get_patches():
    """Get all patches with history"""
    try:
        db = get_db()
        patches = await db.patches.find({}, {'_id': 0}).sort('uploaded_at', DESCENDING).to_list(100)
        return {"patches": patches, "success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch patches: {str(e)}")

@router.post("/upload")
async def upload_patch(
    file: UploadFile = File(...),
    description: str = ""
):
    """Upload a new patch file"""
    try:
        # Validate file
        if not file.filename.endswith('.zip'):
            raise HTTPException(status_code=400, detail="Only .zip files are allowed")
        
        # Check file size
        file.file.seek(0, 2)  # Seek to end
        file_size = file.file.tell()
        file.file.seek(0)  # Reset to beginning
        
        if file_size > MAX_PATCH_SIZE:
            raise HTTPException(
                status_code=400, 
                detail=f"File too large. Maximum size is {MAX_PATCH_SIZE / (1024*1024)}MB"
            )
        
        # Generate patch ID and save file
        patch_id = f"patch-{datetime.now().strftime('%Y%m%d-%H%M%S')}-{str(uuid4())[:8]}"
        patch_filename = f"{patch_id}.zip"
        patch_path = os.path.join(PATCHES_DIR, patch_filename)
        
        # Save uploaded file
        with open(patch_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Extract and validate patch contents
        files_modified = []
        try:
            with zipfile.ZipFile(patch_path, 'r') as zip_ref:
                files_modified = [f for f in zip_ref.namelist() if not f.endswith('/')]
                
                # Security check: prevent path traversal
                for filename in files_modified:
                    if '..' in filename or filename.startswith('/'):
                        os.remove(patch_path)
                        raise HTTPException(
                            status_code=400, 
                            detail="Invalid file paths in patch (path traversal detected)"
                        )
        except zipfile.BadZipFile:
            os.remove(patch_path)
            raise HTTPException(status_code=400, detail="Invalid or corrupted zip file")
        
        # Save patch metadata to database
        db = get_db()
        patch_data = {
            "id": patch_id,
            "filename": file.filename,
            "description": description or f"Patch uploaded on {datetime.now().strftime('%Y-%m-%d %H:%M')}",
            "uploaded_by": "admin",
            "uploaded_at": datetime.utcnow(),
            "applied": False,
            "applied_at": None,
            "rollback_available": True,
            "backup_path": None,
            "files_modified": files_modified,
            "status": "uploaded",
            "error_message": None,
            "file_size": file_size,
            "patch_path": patch_path
        }
        
        await db.patches.insert_one(patch_data)
        
        return {
            "success": True,
            "message": "Patch uploaded successfully",
            "patch_id": patch_id,
            "files_count": len(files_modified),
            "files_modified": files_modified
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.post("/{patch_id}/apply")
async def apply_patch(patch_id: str, background_tasks: BackgroundTasks):
    """Apply a patch to the system"""
    try:
        db = get_db()
        
        # Get patch from database
        patch = await db.patches.find_one({"id": patch_id}, {'_id': 0})
        if not patch:
            raise HTTPException(status_code=404, detail="Patch not found")
        
        if patch['applied']:
            raise HTTPException(status_code=400, detail="Patch already applied")
        
        if not os.path.exists(patch['patch_path']):
            raise HTTPException(status_code=404, detail="Patch file not found on disk")
        
        # Create backup before applying
        backup_id = f"backup-{patch_id}-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        backup_path = os.path.join(BACKUPS_DIR, backup_id)
        os.makedirs(backup_path, exist_ok=True)
        
        files_backed_up = []
        files_applied = []
        
        try:
            # Extract patch
            with zipfile.ZipFile(patch['patch_path'], 'r') as zip_ref:
                for file_in_patch in patch['files_modified']:
                    target_path = os.path.join('/app', file_in_patch)
                    
                    # Backup existing file if it exists
                    if os.path.exists(target_path):
                        backup_file_path = os.path.join(backup_path, file_in_patch)
                        os.makedirs(os.path.dirname(backup_file_path), exist_ok=True)
                        shutil.copy2(target_path, backup_file_path)
                        files_backed_up.append(file_in_patch)
                    
                    # Extract and apply new file
                    zip_ref.extract(file_in_patch, '/app')
                    files_applied.append(file_in_patch)
            
            # Update patch status in database
            await db.patches.update_one(
                {"id": patch_id},
                {
                    "$set": {
                        "applied": True,
                        "applied_at": datetime.utcnow(),
                        "status": "applied",
                        "backup_path": backup_path,
                        "files_modified": files_applied
                    }
                }
            )
            
            # Check if frontend or backend files were modified
            needs_restart = {
                "frontend": any(f.startswith('frontend/') for f in files_applied),
                "backend": any(f.startswith('backend/') for f in files_applied)
            }
            
            return {
                "success": True,
                "message": "Patch applied successfully",
                "files_applied": len(files_applied),
                "files_backed_up": len(files_backed_up),
                "backup_path": backup_path,
                "needs_restart": needs_restart,
                "restart_instructions": "Please restart services if needed: sudo supervisorctl restart frontend/backend"
            }
            
        except Exception as e:
            # Rollback on error
            for file_path in files_backed_up:
                try:
                    backup_file = os.path.join(backup_path, file_path)
                    target_file = os.path.join('/app', file_path)
                    if os.path.exists(backup_file):
                        shutil.copy2(backup_file, target_file)
                except:
                    pass
            
            # Update status to failed
            await db.patches.update_one(
                {"id": patch_id},
                {
                    "$set": {
                        "status": "failed",
                        "error_message": str(e)
                    }
                }
            )
            
            raise HTTPException(status_code=500, detail=f"Failed to apply patch: {str(e)}")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Apply patch failed: {str(e)}")

@router.post("/{patch_id}/rollback")
async def rollback_patch(patch_id: str):
    """Rollback a previously applied patch"""
    try:
        db = get_db()
        
        # Get patch from database
        patch = await db.patches.find_one({"id": patch_id}, {'_id': 0})
        if not patch:
            raise HTTPException(status_code=404, detail="Patch not found")
        
        if not patch['applied']:
            raise HTTPException(status_code=400, detail="Patch not applied, cannot rollback")
        
        if not patch.get('backup_path') or not os.path.exists(patch['backup_path']):
            raise HTTPException(status_code=400, detail="Backup not found, cannot rollback")
        
        # Restore files from backup
        backup_path = patch['backup_path']
        files_restored = []
        
        try:
            # Walk through backup directory and restore files
            for root, dirs, files in os.walk(backup_path):
                for filename in files:
                    backup_file = os.path.join(root, filename)
                    relative_path = os.path.relpath(backup_file, backup_path)
                    target_file = os.path.join('/app', relative_path)
                    
                    # Restore file
                    os.makedirs(os.path.dirname(target_file), exist_ok=True)
                    shutil.copy2(backup_file, target_file)
                    files_restored.append(relative_path)
            
            # Update patch status
            await db.patches.update_one(
                {"id": patch_id},
                {
                    "$set": {
                        "applied": False,
                        "status": "rolled_back",
                        "rollback_at": datetime.utcnow()
                    }
                }
            )
            
            return {
                "success": True,
                "message": "Patch rolled back successfully",
                "files_restored": len(files_restored),
                "backup_path": backup_path
            }
            
        except Exception as e:
            await db.patches.update_one(
                {"id": patch_id},
                {
                    "$set": {
                        "status": "rollback_failed",
                        "error_message": f"Rollback error: {str(e)}"
                    }
                }
            )
            raise HTTPException(status_code=500, detail=f"Rollback failed: {str(e)}")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Rollback failed: {str(e)}")

@router.delete("/{patch_id}")
async def delete_patch(patch_id: str):
    """Delete a patch (only if not applied)"""
    try:
        db = get_db()
        
        patch = await db.patches.find_one({"id": patch_id}, {'_id': 0})
        if not patch:
            raise HTTPException(status_code=404, detail="Patch not found")
        
        if patch['applied']:
            raise HTTPException(
                status_code=400, 
                detail="Cannot delete applied patch. Rollback first."
            )
        
        # Delete patch file
        if os.path.exists(patch['patch_path']):
            os.remove(patch['patch_path'])
        
        # Delete from database
        await db.patches.delete_one({"id": patch_id})
        
        return {
            "success": True,
            "message": "Patch deleted successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")

@router.get("/stats")
async def get_patch_stats():
    """Get patch statistics"""
    try:
        db = get_db()
        
        total = await db.patches.count_documents({})
        applied = await db.patches.count_documents({"applied": True})
        pending = await db.patches.count_documents({"applied": False, "status": "uploaded"})
        failed = await db.patches.count_documents({"status": "failed"})
        
        return {
            "total": total,
            "applied": applied,
            "pending": pending,
            "failed": failed
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")
