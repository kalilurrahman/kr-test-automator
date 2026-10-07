"""Generate all Validaira icon sizes and marketing exports from the vector mark."""
from pathlib import Path
from io import BytesIO
from zipfile import ZipFile, ZIP_DEFLATED
import cairosvg
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
    return ImageFont.truetype(f"/usr/share/fonts/truetype/dejavu/DejaVuSans{suffix}.ttf", size)


def mark(size, maskable=False):
    raster = cairosvg.svg2png(url=str(BRAND / "validaira-mark.svg"), output_width=size * 4, output_height=size * 4)
    image = Image.open(BytesIO(raster)).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
    if maskable:
        canvas = Image.new("RGBA", (size, size), NAVY + (255,))
        inner = image.resize((int(size * .8), int(size * .8)), Image.Resampling.LANCZOS)
        inset = (size - inner.width) // 2
        canvas.alpha_composite(inner, (inset, inset))
        return canvas
    return image


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
# Keep the wordmark vector text-free by converting its glyphs to outlines.
cairosvg.svg2png(url=str(BRAND / "validaira-wordmark.svg"), write_to=str(BRAND / "validaira-wordmark.png"), output_width=1560, output_height=360)
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
