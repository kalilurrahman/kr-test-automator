from pathlib import Path

def ensure_tree(paths):
    for p in paths:
        Path(p).mkdir(parents=True, exist_ok=True)
