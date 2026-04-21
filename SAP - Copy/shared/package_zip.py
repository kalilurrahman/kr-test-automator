import zipfile
from pathlib import Path

def package_dir(src, out):
    src = Path(src)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in src.rglob("*"):
            if f.is_file():
                zf.write(f, f.relative_to(src).as_posix())
