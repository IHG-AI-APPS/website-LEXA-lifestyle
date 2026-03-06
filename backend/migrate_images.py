"""Migrate all Emergent-hosted images to external file server"""
import pymongo
import requests
import paramiko
import os
import hashlib
import logging
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor, as_completed

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'lexa_lifestyle')

REMOTE_HOST = "178.128.28.178"
REMOTE_USER = "root"
REMOTE_PASS = os.environ.get('FILE_SERVER_PASS', 'IhG@1HGB$2026$W3b')
REMOTE_BASE = "/var/lexa"
CDN_BASE = "https://files.ihgbrands.com/lexa"

EMERGENT_PATTERN = "emergentagent.com"

def get_sftp():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(REMOTE_HOST, username=REMOTE_USER, password=REMOTE_PASS, timeout=15)
    return ssh, ssh.open_sftp()

def ensure_remote_dir(sftp, path):
    dirs = path.split("/")
    current = ""
    for d in dirs:
        if not d:
            current = "/"
            continue
        current = f"{current}/{d}" if current != "/" else f"/{d}"
        try:
            sftp.stat(current)
        except FileNotFoundError:
            sftp.mkdir(current)

def download_image(url):
    """Download image and return (content, extension)"""
    try:
        resp = requests.get(url, timeout=30, allow_redirects=True)
        if resp.status_code == 200:
            ct = resp.headers.get('content-type', '')
            ext_map = {
                'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
                'image/gif': 'gif', 'image/svg+xml': 'svg',
                'video/mp4': 'mp4', 'application/pdf': 'pdf',
            }
            ext = 'jpg'  # default
            for mime, e in ext_map.items():
                if mime in ct:
                    ext = e
                    break
            return resp.content, ext
    except Exception as e:
        logger.error(f"Download failed: {url} - {e}")
    return None, None

def collect_all_emergent_urls():
    """Collect ALL unique Emergent URLs from the database"""
    client = pymongo.MongoClient(MONGO_URL)
    db = client[DB_NAME]
    
    url_set = set()
    
    for coll_name in db.list_collection_names():
        coll = db[coll_name]
        for doc in coll.find({}):
            for key, val in doc.items():
                if key == '_id':
                    continue
                if isinstance(val, str) and EMERGENT_PATTERN in val:
                    url_set.add(val)
                elif isinstance(val, list):
                    for item in val:
                        if isinstance(item, str) and EMERGENT_PATTERN in item:
                            url_set.add(item)
                        elif isinstance(item, dict):
                            for sv in item.values():
                                if isinstance(sv, str) and EMERGENT_PATTERN in sv:
                                    url_set.add(sv)
                elif isinstance(val, dict):
                    for sv in val.values():
                        if isinstance(sv, str) and EMERGENT_PATTERN in sv:
                            url_set.add(sv)
    
    client.close()
    return url_set

def migrate_urls(urls):
    """Download, upload, and return URL mapping"""
    url_map = {}
    ssh, sftp = get_sftp()
    remote_dir = f"{REMOTE_BASE}/migrated"
    ensure_remote_dir(sftp, remote_dir)
    
    total = len(urls)
    for i, url in enumerate(urls):
        # Create deterministic filename from URL hash
        url_hash = hashlib.md5(url.encode()).hexdigest()[:16]
        
        content, ext = download_image(url)
        if content is None:
            logger.warning(f"[{i+1}/{total}] SKIP (download failed): {url[:80]}")
            continue
        
        filename = f"{url_hash}.{ext}"
        remote_path = f"{remote_dir}/{filename}"
        new_url = f"{CDN_BASE}/migrated/{filename}"
        
        try:
            sftp.putfo(BytesIO(content), remote_path)
            sftp.chmod(remote_path, 0o644)
            url_map[url] = new_url
            if (i + 1) % 20 == 0 or i == total - 1:
                logger.info(f"[{i+1}/{total}] Uploaded: {filename} ({len(content)} bytes)")
        except Exception as e:
            logger.error(f"[{i+1}/{total}] Upload failed: {e}")
    
    sftp.close()
    ssh.close()
    return url_map

def update_database(url_map):
    """Update all DB documents with new URLs"""
    client = pymongo.MongoClient(MONGO_URL)
    db = client[DB_NAME]
    
    total_updated = 0
    
    for coll_name in db.list_collection_names():
        coll = db[coll_name]
        docs = list(coll.find({}))
        
        for doc in docs:
            updates = {}
            changed = False
            
            for key, val in doc.items():
                if key == '_id':
                    continue
                if isinstance(val, str) and val in url_map:
                    updates[key] = url_map[val]
                    changed = True
                elif isinstance(val, list):
                    new_list = []
                    list_changed = False
                    for item in val:
                        if isinstance(item, str) and item in url_map:
                            new_list.append(url_map[item])
                            list_changed = True
                        elif isinstance(item, dict):
                            new_dict = {}
                            dict_changed = False
                            for sk, sv in item.items():
                                if isinstance(sv, str) and sv in url_map:
                                    new_dict[sk] = url_map[sv]
                                    dict_changed = True
                                else:
                                    new_dict[sk] = sv
                            new_list.append(new_dict if dict_changed else item)
                            if dict_changed:
                                list_changed = True
                        else:
                            new_list.append(item)
                    if list_changed:
                        updates[key] = new_list
                        changed = True
                elif isinstance(val, dict) and key != '_id':
                    new_dict = {}
                    dict_changed = False
                    for sk, sv in val.items():
                        if isinstance(sv, str) and sv in url_map:
                            new_dict[sk] = url_map[sv]
                            dict_changed = True
                        else:
                            new_dict[sk] = sv
                    if dict_changed:
                        updates[key] = new_dict
                        changed = True
            
            if changed:
                coll.update_one({'_id': doc['_id']}, {'$set': updates})
                total_updated += 1
    
    client.close()
    return total_updated

def main():
    logger.info("=== Starting Emergent Image Migration ===")
    
    # Step 1: Collect all URLs
    logger.info("Collecting all Emergent-hosted URLs from database...")
    urls = collect_all_emergent_urls()
    logger.info(f"Found {len(urls)} unique Emergent URLs")
    
    if not urls:
        logger.info("No URLs to migrate!")
        return
    
    # Step 2: Download and upload
    logger.info("Downloading and uploading images...")
    url_map = migrate_urls(urls)
    logger.info(f"Successfully migrated {len(url_map)} / {len(urls)} URLs")
    
    # Save URL map for frontend updates
    import json
    with open('/tmp/url_migration_map.json', 'w') as f:
        json.dump(url_map, f, indent=2)
    logger.info("URL map saved to /tmp/url_migration_map.json")
    
    # Step 3: Update database
    logger.info("Updating database references...")
    updated = update_database(url_map)
    logger.info(f"Updated {updated} database documents")
    
    # Step 4: Verify
    remaining = collect_all_emergent_urls()
    logger.info(f"Remaining Emergent URLs after migration: {len(remaining)}")
    if remaining:
        logger.warning(f"Failed URLs (couldn't download): {remaining}")
    
    logger.info("=== Migration Complete ===")

if __name__ == "__main__":
    main()
