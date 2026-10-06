from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public"
NAVY = (12, 20, 35)
GOLD = (214, 175, 84)
PALE = (245, 222, 155)
MINT = (117, 222, 180)


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def draw_mark(size, maskable=False):
    scale = 4
    s = size * scale
    image = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    inset = int(s * (0.08 if not maskable else 0.0))
    radius = int(s * (0.27 if not maskable else 0.18))
    draw.rounded_rectangle((inset, inset, s-inset, s-inset), radius=radius, fill=NAVY)
    # A restrained diagonal sheen keeps the app icon dimensional at launcher sizes.
    draw.arc((inset + s*.04, inset + s*.02, s-inset-s*.04, s-inset-s*.20), 205, 330, fill=(255,255,255,20), width=max(1, int(s*.006)))
    points = [(s*.25,s*.29),(s*.39,s*.29),(s*.50,s*.68),(s*.61,s*.29),(s*.75,s*.29),(s*.56,s*.75),(s*.44,s*.75)]
    draw.polygon(points, fill=GOLD)
    draw.line([(s*.59,s*.62),(s*.66,s*.69),(s*.81,s*.51)], fill=MINT, width=int(s*.045), joint="curve")
    draw.ellipse((s*.77,s*.18,s*.81,s*.22), fill=(168,240,209))
    return image.resize((size,size), Image.Resampling.LANCZOS)


icons = OUT / "icons"
icons.mkdir(exist_ok=True)
draw_mark(192).convert("RGB").save(icons / "icon-192.png", optimize=True)
draw_mark(512).convert("RGB").save(icons / "icon-512.png", optimize=True)
draw_mark(512, maskable=True).convert("RGB").save(icons / "icon-512-maskable.png", optimize=True)
draw_mark(180).save(icons / "apple-touch-icon.png", optimize=True)
draw_mark(64).save(OUT / "favicon-32.png", optimize=True)
draw_mark(256).save(OUT / "favicon.ico", format="ICO", sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])

# Social card: high contrast, generous margins, legible at timeline preview sizes.
w, h = 1200, 630
card = Image.new("RGB", (w,h), NAVY)
draw = ImageDraw.Draw(card)
for x in range(w):
    alpha = x / w
    color = tuple(int(NAVY[i]*(1-alpha) + (23,36,57)[i]*alpha) for i in range(3))
    draw.line((x,0,x,h), fill=color)
draw.ellipse((790,-260,1370,320), outline=(214,175,84), width=2)
draw.ellipse((845,-205,1315,265), outline=(117,222,180), width=1)
mark = draw_mark(330).convert("RGBA")
card.paste(mark, (88,150), mark)
draw.text((465,198), "VALIDAIRA", font=font(66, True), fill=(247,244,237))
draw.text((470,290), "AI-native quality engineering", font=font(34), fill=(214,175,84))
draw.text((470,344), "for confident releases.", font=font(34), fill=(214,175,84))
draw.line((470,414,1000,414), fill=(117,222,180), width=3)
draw.text((470,449), "GENERATE  ·  TEST  ·  EXPLAIN  ·  RELEASE", font=font(19, True), fill=(183,195,209))
card.save(OUT / "brand" / "validaira-social.png", optimize=True)
