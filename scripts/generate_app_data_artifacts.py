"""Generate the Python case packs, JSON/TypeScript downloads, and app registry.

Run from any working directory with:
    python scripts/generate_app_data_artifacts.py
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"

for script in (
    "generate_ai_coding_tool_suites.py",
    "generate_data_ai_health_suites.py",
    "generate_app_data_pack_registry.py",
):
    subprocess.run([sys.executable, str(SCRIPTS / script)], cwd=ROOT, check=True)

subprocess.run(["node", str(SCRIPTS / "build_precomputed_stats.mjs")], cwd=ROOT, check=True)
