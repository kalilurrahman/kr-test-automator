from pathlib import Path

def build_index(title, items, out):
    html = ["<!doctype html><html><body>", f"<h1>{title}</h1>", "<ul>"]
    for label, link in items:
        html.append(f"<li><a href="{link}">{label}</a></li>")
    html.append("</ul></body></html>")
    Path(out).write_text(''.join(html), encoding='utf-8')
