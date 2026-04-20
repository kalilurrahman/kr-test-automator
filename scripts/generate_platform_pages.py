"""Generate uniform Salesforce-style root and sub-product index.html pages for
every static platform folder that ships CSV test-case data.

Skips SAP and Salesforce (already curated) and skips sub-folders that have no CSV.
Idempotent — safe to re-run.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# (folder_on_disk, public_url_base, display_label, accent_hex, dark_hex)
PLATFORMS = [
    ("API", "/API", "API", "#0ea5e9", "#075985"),
    ("AWS", "/AWS", "AWS", "#f59e0b", "#92400e"),
    ("Android", "/Android", "Android", "#10b981", "#065f46"),
    ("Azure", "/Azure", "Azure", "#06b6d4", "#155e75"),
    ("Dynamics365", "/Dynamics365", "Dynamics 365", "#7c3aed", "#4c1d95"),
    ("GCP", "/GCP", "GCP", "#3b82f6", "#1e3a8a"),
    ("OracleApps", "/OracleApps", "Oracle Apps", "#e11d48", "#881337"),
    ("ServiceNow", "/ServiceNow", "ServiceNow", "#10b981", "#065f46"),
    ("Veeva", "/Veeva", "Veeva", "#f43f5e", "#881337"),
    ("WebApps", "/WebApps", "Web Apps", "#14b8a6", "#115e59"),
    ("iOS", "/iOS", "iOS", "#6366f1", "#312e81"),
    ("TopProducts", "/TopProducts", "Top Products", "#c9a84c", "#854d0e"),
    ("workday/Workday", "/Workday", "Workday", "#f59e0b", "#92400e"),
]

SKIP_DIRS = {"assets", "downloads", "screenshots"}

DISPLAY = {
    "itsm": "ITSM", "itom": "ITOM", "csm": "CSM", "hrsd": "HRSD", "secops": "SecOps",
    "hcm": "HCM", "scm": "SCM", "epm": "EPM", "cx": "CX", "rds": "RDS", "rest": "REST",
    "graphql": "GraphQL", "grpc": "gRPC", "iam": "IAM", "ec2": "EC2", "s3": "S3",
    "eks": "EKS", "aks": "AKS", "gke": "GKE", "vm": "VM", "sql": "SQL", "ui": "UI",
    "api": "API", "m365": "M365", "d365": "D365", "ios": "iOS", "sap": "SAP",
    "e2e": "End-to-End", "cloud-run": "Cloud Run", "bigquery": "BigQuery",
    "customer_service": "Customer Service", "supply_chain": "Supply Chain",
    "project_ops": "Project Operations", "expanded_packs": "Expanded Packs",
}


def pretty(name: str) -> str:
    if name in DISPLAY:
        return DISPLAY[name]
    return name.replace("_", " ").replace("-", " ").title()


def find_csv(subdir: Path) -> str | None:
    csvs = sorted(p.name for p in subdir.glob("*.csv"))
    if not csvs:
        return None
    # Prefer the largest count number in the filename
    def score(name: str) -> int:
        digits = "".join(c if c.isdigit() else " " for c in name).split()
        return max((int(d) for d in digits), default=0)
    csvs.sort(key=score, reverse=True)
    return csvs[0]


def collect_subproducts(platform_dir: Path) -> list[dict]:
    subs = []
    for child in sorted(platform_dir.iterdir()):
        if not child.is_dir() or child.name in SKIP_DIRS or child.name.startswith("."):
            continue
        csv = find_csv(child)
        if not csv:
            continue
        subs.append({
            "id": child.name,
            "label": pretty(child.name),
            "folder": child.name,
            "csv": csv,
            "prefix": csv.rsplit(".", 1)[0],
        })
    return subs


def root_html(platform_label: str, public_base: str, accent: str, dark: str, subs: list[dict]) -> str:
    cards = "\n".join(
        f'''        <a class="cloud-card" href="{public_base}/{s["folder"]}/index.html">
            <h3>{s["label"]}</h3>
            <p>Browse {s["label"]} test cases — {s["prefix"]}.</p>
            <div class="actions">
                <span class="btn">View Data</span>
                <span class="btn btn-outline">{s["prefix"].rsplit("_", 1)[-1] if s["prefix"].rsplit("_", 1)[-1].isdigit() else "Suite"}</span>
            </div>
        </a>'''
        for s in subs
    )
    menu_links = "\n".join(
        f'    <a href="{public_base}/{s["folder"]}/index.html">{s["label"]}</a>'
        for s in subs
    )
    return f"""<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{platform_label} Test Repository</title>
    <style>
        body {{font-family:Arial,sans-serif;margin:0;background:#f8f9fc;color:#2c3e50}}
        header {{background:{accent};color:white;padding:24px}}
        .wrap {{max-width:1200px;margin:0 auto;padding:24px}}
        .pill {{display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,0.2);color:white;font-size:12px;font-weight:bold;margin-bottom:12px}}
        h1 {{margin:0 0 8px 0;}}
        header p {{margin:0;opacity:0.9;}}
        .menu {{display:flex;gap:16px;background:#fff;padding:16px 24px;border-bottom:1px solid #ecf0f1;flex-wrap:wrap;}}
        .menu a {{color:#2c3e50;text-decoration:none;font-weight:bold;font-size:14px;padding:8px 12px;border-radius:6px;transition:all 0.2s;}}
        .menu a:hover {{background:#ebf3fd;color:{accent};}}
        .menu a.active {{background:{accent};color:white;}}
        .clouds-grid {{display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:24px;margin-top:24px;}}
        .cloud-card {{background:white;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,.08);display:flex;flex-direction:column;gap:12px;transition:transform 0.2s;text-decoration:none;color:inherit;}}
        .cloud-card:hover {{transform:translateY(-4px);box-shadow:0 4px 16px rgba(0,0,0,.12);}}
        .cloud-card h3 {{margin:0;color:{accent};font-size:20px;}}
        .cloud-card p {{color:#7f8c8d;font-size:14px;margin:0;}}
        .btn {{display:inline-block;padding:8px 14px;background:{accent};color:white;border-radius:6px;font-weight:bold;font-size:13px;}}
        .btn-outline {{background:transparent;border:1px solid {accent};color:{accent};}}
        .actions {{display:flex;gap:8px;margin-top:auto;}}
        footer {{text-align:center;padding:32px 16px;color:#7f8c8d;font-size:13px;}}
        footer a {{color:{accent};text-decoration:none;}}
    </style>
</head>
<body>

<header>
    <div class="wrap" style="padding-bottom:0;">
        <div class="pill">{platform_label} Ecosystem</div>
        <h1>{platform_label} Test Repository</h1>
        <p>Comprehensive test scripts across {len(subs)} {platform_label} module{"s" if len(subs)!=1 else ""}.</p>
    </div>
</header>

<nav class="menu">
    <a href="{public_base}/index.html" class="active">Overview</a>
{menu_links}
</nav>

<main class="wrap">
    <div class="clouds-grid">
{cards}
    </div>
</main>

<footer>
    <p>← <a href="/dashboard">Back to dashboard</a> · <a href="/">Generator</a> · <a href="/about">About</a></p>
</footer>

</body>
</html>
"""


def sub_html(platform_label: str, public_base: str, accent: str, sub: dict, all_subs: list[dict]) -> str:
    menu_links = "\n".join(
        f'    <a href="{public_base}/{s["folder"]}/index.html"{" class=\"active\"" if s["id"]==sub["id"] else ""}>{s["label"]}</a>'
        for s in all_subs
    )
    prefix = sub["prefix"]
    return f"""<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{platform_label} {sub["label"]} Test Cases</title>
    <style>
        body {{font-family:Arial,sans-serif;margin:0;background:#f8f9fc;color:#2c3e50}}
        header {{background:{accent};color:white;padding:24px}}
        .wrap {{max-width:1200px;margin:0 auto;padding:24px}}
        .pill {{display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,0.2);color:white;font-size:12px;font-weight:bold;margin-bottom:12px}}
        h1 {{margin:0 0 8px 0;}}
        header p {{margin:0;opacity:0.9;}}
        .menu {{display:flex;gap:16px;background:#fff;padding:16px 24px;border-bottom:1px solid #ecf0f1;flex-wrap:wrap;}}
        .menu a {{color:#2c3e50;text-decoration:none;font-weight:bold;font-size:14px;padding:8px 12px;border-radius:6px;transition:all 0.2s;}}
        .menu a:hover {{background:#ebf3fd;color:{accent};}}
        .menu a.active {{background:{accent};color:white;}}
        table {{width:100%;border-collapse:collapse;box-shadow:0 2px 8px rgba(0,0,0,.08);background:white;border-radius:12px;overflow:hidden;margin-top:16px;}}
        th,td {{padding:10px 12px;border-bottom:1px solid #ecf0f1;text-align:left;font-size:13px;vertical-align:top;}}
        th {{background:#ebf3fd;font-weight:bold;color:#2c3e50;position:sticky;top:0;}}
        tr:hover {{background:#f8f9fc;}}
        .loading {{padding:48px;text-align:center;color:#7f8c8d;font-style:italic;}}
        .downloads {{display:flex;gap:14px;margin-top:24px;background:white;padding:14px 18px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08);flex-wrap:wrap;align-items:center;}}
        .downloads a {{color:{accent};text-decoration:none;font-weight:bold;font-size:13px;}}
        .downloads a:hover {{text-decoration:underline;}}
        .stats {{display:flex;gap:16px;margin-top:18px;flex-wrap:wrap;}}
        .stat {{background:white;padding:10px 16px;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.06);font-size:13px;color:#5e6c84;}}
        .stat strong {{color:{accent};font-size:16px;display:block;}}
        footer {{text-align:center;padding:32px 16px;color:#7f8c8d;font-size:13px;}}
        footer a {{color:{accent};text-decoration:none;}}
    </style>
</head>
<body>

<header>
    <div class="wrap" style="padding-bottom:0;">
        <div class="pill">{platform_label} Test Repository</div>
        <h1>{sub["label"]}</h1>
        <p>Live data view — first 100 rows. Download for the full set.</p>
    </div>
</header>

<nav class="menu">
    <a href="{public_base}/index.html">Overview</a>
{menu_links}
</nav>

<main class="wrap">
    <div class="downloads">
        <strong>Downloads:</strong>
        <a href="{prefix}.csv">CSV</a>
        <a href="{prefix}.xlsx">XLSX</a>
        <a href="{prefix}.json">JSON</a>
        <a href="{prefix}.ts">TypeScript</a>
        <a href="{prefix}.html" target="_blank">Full HTML Report</a>
    </div>

    <div class="stats" id="stats"></div>

    <div style="overflow-x:auto; max-height: 720px; margin-top:18px;">
        <table id="dataTable">
            <thead><tr id="tableHeader"></tr></thead>
            <tbody id="tableBody">
                <tr><td class="loading" colspan="100">Loading {prefix}.csv …</td></tr>
            </tbody>
        </table>
    </div>
</main>

<footer>
    <p>← <a href="{public_base}/index.html">Back to {platform_label}</a> · <a href="/dashboard">Dashboard</a> · <a href="/">Generator</a></p>
</footer>

<script>
function parseCSV(text) {{
    const rows = []; let row = []; let cell = ''; let q = false;
    for (let i=0;i<text.length;i++) {{
        const c = text[i], n = text[i+1];
        if (c === '"' && q && n === '"') {{ cell += '"'; i++; }}
        else if (c === '"') {{ q = !q; }}
        else if (c === ',' && !q) {{ row.push(cell); cell = ''; }}
        else if ((c === '\\n' || (c === '\\r' && n === '\\n')) && !q) {{
            row.push(cell); rows.push(row); row = []; cell = '';
            if (c === '\\r') i++;
        }} else {{ cell += c; }}
    }}
    if (cell || row.length) {{ row.push(cell); rows.push(row); }}
    return rows;
}}
async function load() {{
    try {{
        const res = await fetch('{prefix}.csv');
        if (!res.ok) throw new Error('HTTP '+res.status);
        const txt = await res.text();
        const rows = parseCSV(txt).filter(r => r.length > 1);
        if (!rows.length) throw new Error('Empty CSV');
        const headers = rows[0];
        const total = rows.length - 1;
        const data = rows.slice(1, 101);
        document.getElementById('tableHeader').innerHTML =
            headers.map(h => '<th>'+(h||'').replace(/</g,'&lt;')+'</th>').join('');
        document.getElementById('tableBody').innerHTML = data.map(r =>
            '<tr>' + headers.map((_,i) => {{
                const v = (r[i]||'').replace(/</g,'&lt;');
                return '<td>' + (v.length>200 ? v.slice(0,200)+'…' : v) + '</td>';
            }}).join('') + '</tr>'
        ).join('');
        document.getElementById('stats').innerHTML =
            '<div class="stat"><strong>'+total.toLocaleString()+'</strong>total cases</div>' +
            '<div class="stat"><strong>'+headers.length+'</strong>columns</div>' +
            '<div class="stat"><strong>'+Math.min(100,total)+'</strong>shown (download for all)</div>';
    }} catch (e) {{
        console.error(e);
        document.getElementById('tableBody').innerHTML =
            '<tr><td colspan="100" class="loading">Could not load {prefix}.csv — '+e.message+'</td></tr>';
    }}
}}
load();
</script>

</body>
</html>
"""


def main() -> None:
    summary = []
    for folder, base, label, accent, dark in PLATFORMS:
        platform_dir = ROOT / folder
        if not platform_dir.is_dir():
            print(f"SKIP {folder} (missing)")
            continue
        subs = collect_subproducts(platform_dir)
        if not subs:
            print(f"SKIP {folder} (no CSV subproducts)")
            continue
        # Write root index
        (platform_dir / "index.html").write_text(root_html(label, base, accent, dark, subs), encoding="utf-8")
        # Write each sub-product index
        for s in subs:
            (platform_dir / s["folder"] / "index.html").write_text(
                sub_html(label, base, accent, s, subs), encoding="utf-8"
            )
        summary.append((folder, label, len(subs)))
        print(f"OK   {folder} → {len(subs)} sub-products")

    print("\nSummary:")
    for f, l, n in summary:
        print(f"  {l:<14} {n} pages  ({f})")


if __name__ == "__main__":
    main()
