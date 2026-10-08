"""Generate all Validaira icon sizes and marketing exports from the vector mark."""
from pathlib import Path
from io import BytesIO
from zipfile import ZipFile, ZIP_DEFLATED
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public"
BRAND = OUT / "brand"
ICONS = OUT / "icons"
NAVY = (12, 20, 35)
GOLD = (214, 175, 84)
MINT = (117, 222, 180)
PAPER = (245, 248, 252)


def font(size, bold=False):
    suffix = "-Bold" if bold else ""
    candidates = list(Path("/usr/share/fonts").rglob(f"DejaVuSans{suffix}.ttf"))
    candidates += list(Path("/nix/store").glob(f"*-matplotlib-*/lib/python*/site-packages/matplotlib/mpl-data/fonts/ttf/DejaVuSans{suffix}.ttf"))
    if not candidates:
        raise FileNotFoundError("A DejaVu Sans font is required to export brand artwork.")
    return ImageFont.truetype(str(candidates[0]), size)


def mark(size, maskable=False):
    image = Image.open(BytesIO(MARK_RASTER)).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
    if maskable:
        canvas = Image.new("RGBA", (size, size), NAVY + (255,))
        inner = image.resize((int(size * .8), int(size * .8)), Image.Resampling.LANCZOS)
        inset = (size - inner.width) // 2
        canvas.alpha_composite(inner, (inset, inset))
        return canvas
    return image


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 2048, "height": 2048})
    page.set_content('<style>body{margin:0}svg{display:block;width:2048px;height:2048px}</style>' + (BRAND / "validaira-mark.svg").read_text())
    MARK_RASTER = page.locator("svg").screenshot(omit_background=True)
    page.set_content('<style>body{margin:0}svg{display:block;width:1560px;height:360px}</style>' + (BRAND / "validaira-wordmark.svg").read_text())
    page.locator("svg").screenshot(path=str(BRAND / "validaira-wordmark.png"), omit_background=True)
    browser.close()

ICONS.mkdir(exist_ok=True)
for size in [64, 192, 512]:
    mark(size).save(ICONS / f"icon-{size}.png", optimize=True)
mark(512, True).convert("RGB").save(ICONS / "icon-512-maskable.png", optimize=True)
mark(180).save(ICONS / "apple-touch-icon.png", optimize=True)
mark(32).save(OUT / "favicon-32.png", optimize=True)
mark(256).save(OUT / "favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])

# Deterministic social and mobile artwork; type remains legible at small sizes.
hero = Image.open(ROOT / "src/assets/validaira-brand-hero.jpg").convert("RGB")
card = hero.resize((1200, 680), Image.Resampling.LANCZOS).crop((0, 25, 1200, 655))
draw = ImageDraw.Draw(card)
draw.text((64, 163), "Validaira", font=font(72, True), fill=PAPER)
draw.text((68, 266), "AI-native quality engineering", font=font(24), fill=GOLD)
draw.text((68, 312), "for confident releases.", font=font(24), fill=PAPER)
draw.line((68, 388, 455, 388), fill=MINT, width=3)
draw.text((68, 420), "GENERATE / TEST / RELEASE", font=font(18, True), fill=PAPER)
card.save(BRAND / "validaira-social.png", optimize=True)
portrait = Image.new("RGB", (1080, 1920), NAVY)
portrait.paste(hero.resize((1080, 612), Image.Resampling.LANCZOS), (0, 980))
icon = mark(200)
portrait.paste(icon, (80, 180), icon)
draw = ImageDraw.Draw(portrait)
draw.text((80, 440), "Validaira", font=font(100, True), fill=PAPER)
draw.text((86, 595), "Confident releases.", font=font(48), fill=GOLD)
draw.text((86, 675), "Better tests.", font=font(48), fill=PAPER)
draw.text((86, 1690), "AI-NATIVE QUALITY ENGINEERING", font=font(32, True), fill=PAPER)
portrait.save(BRAND / "validaira-mobile.jpg", quality=92, optimize=True)
# Include both vector and raster wordmarks for common presentation tools.
with ZipFile(BRAND / "validaira-brand-kit.zip", "w", ZIP_DEFLATED) as archive:
    for asset in sorted(BRAND.glob("validaira-*")):
        if asset.suffix != ".zip":
            archive.write(asset, f"brand/{asset.name}")
    for asset in sorted(ICONS.glob("*.png")):
        archive.write(asset, f"icons/{asset.name}")
    for name in ["favicon.ico", "favicon-32.png"]:
        archive.write(OUT / name, name)
    archive.writestr("README.txt", "Validaira brand kit\nGold V with mint validation mark.\nIncludes SVG marks, PNG wordmark, launcher icons, maskable icon, favicon, social card and mobile artwork.\n")
print("Generated Validaira icons, marketing artwork, and brand kit.")
