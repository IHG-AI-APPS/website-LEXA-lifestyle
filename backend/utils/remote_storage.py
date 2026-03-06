"""Remote file storage via SFTP to external server"""
import os
import logging
import paramiko
from io import BytesIO

logger = logging.getLogger(__name__)

REMOTE_HOST = os.environ.get("FILE_SERVER_HOST", "178.128.28.178")
REMOTE_USER = os.environ.get("FILE_SERVER_USER", "root")
REMOTE_PASS = os.environ.get("FILE_SERVER_PASS", "")
REMOTE_BASE_PATH = os.environ.get("FILE_SERVER_PATH", "/var/lexa")
CDN_BASE_URL = os.environ.get("FILE_SERVER_URL", "https://files.ihgbrands.com/lexa")


def _get_sftp():
    """Create an SFTP connection."""
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(REMOTE_HOST, username=REMOTE_USER, password=REMOTE_PASS, timeout=15)
    return ssh, ssh.open_sftp()


def _ensure_remote_dir(sftp, path):
    """Ensure remote directory exists."""
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


def upload_to_remote(content: bytes, category: str, filename: str) -> str:
    """Upload file to remote server via SFTP. Returns the CDN URL."""
    remote_dir = f"{REMOTE_BASE_PATH}/{category}"
    remote_path = f"{remote_dir}/{filename}"

    ssh, sftp = _get_sftp()
    try:
        _ensure_remote_dir(sftp, remote_dir)
        sftp.putfo(BytesIO(content), remote_path)
        sftp.chmod(remote_path, 0o644)
        logger.info(f"Uploaded to remote: {remote_path}")
    finally:
        sftp.close()
        ssh.close()

    return f"{CDN_BASE_URL}/{category}/{filename}"


def delete_from_remote(category: str, filename: str) -> bool:
    """Delete file from remote server."""
    remote_path = f"{REMOTE_BASE_PATH}/{category}/{filename}"
    ssh, sftp = _get_sftp()
    try:
        sftp.remove(remote_path)
        logger.info(f"Deleted from remote: {remote_path}")
        return True
    except FileNotFoundError:
        logger.warning(f"Remote file not found: {remote_path}")
        return False
    finally:
        sftp.close()
        ssh.close()
