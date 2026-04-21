from pathlib import Path
import zipfile

def unzip_to(src, dst):
    dst = Path(dst)
    dst.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(src) as zf:
        zf.extractall(dst)
