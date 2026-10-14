#!/usr/bin/env python3
"""Turns the Gemini originals (assets/, not in git) into web images in public/brand/.

Run: python3 scripts/prepare-brand-images.py
- Portraits: neutral white balance measured on the grey T-shirt (so our analysis measures skin,
  not a colour cast), 720 px wide, named by age segment (docs/fase-b/DOELGROEPEN.md).
- Editorial, products and seasons: resized and compressed; names from docs/brand/GEMINI-HANDBOEK.md.
- Writes the provenance register (bron.txt) next to the images: file · tool · date.
"""
import os
import datetime
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets")
OUT = os.path.join(ROOT, "public", "brand")
D1 = "brand-originals/deel 1"

# source (relative to assets/) -> (target relative to public/brand/, max width)
PORTRAITS = {
    # KULØRT: young (±19–21) and 45+
    "people-originals/kulort-9.jpg": "people/kulort-jong-1.jpg",
    "people-originals/kulort-7.jpg": "people/kulort-jong-2.jpg",
    "people-originals/kulort-8.jpg": "people/kulort-jong-3.jpg",
    "people-originals/kulort-5.jpg": "people/kulort-40-1.jpg",
    "people-originals/kulort-12.jpg": "people/kulort-40-2.jpg",
    "people-originals/kulort-10.jpg": "people/kulort-40-3.jpg",
    # NYANSE: young and 45+
    "people-originals/nyanse-12.jpg": "people/nyanse-jong-1.jpg",
    "people-originals/nyanse-11.jpg": "people/nyanse-jong-2.jpg",
    "people-originals/nyanse-7.jpg": "people/nyanse-jong-3.jpg",
    "people-originals/nyanse-8.jpg": "people/nyanse-40-1.jpg",
    "people-originals/nyanse-9.jpg": "people/nyanse-40-2.jpg",
    "people-originals/nyanse-10.jpg": "people/nyanse-40-3.jpg",
}

PHOTOS = {
    f"{D1}/Editorial/Gemini_Generated_Image_16e5dy16e5dy16e5.jpg": ("editorial/maison-hero-1.jpg", 1800),
    f"{D1}/Editorial/Gemini_Generated_Image_3hl90a3hl90a3hl9.jpg": ("editorial/maison-door-kulort.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_vmdj7evmdj7evmdj.jpg": ("editorial/maison-door-nyanse.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_nz81wbnz81wbnz81.jpg": ("editorial/kulort-jong-campagne-1.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_vyp4e7vyp4e7vyp4.jpg": ("editorial/kulort-jv-campagne-1.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_ah1x0aah1x0aah1x.jpg": ("editorial/kulort-vol-campagne-1.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_qlrapaqlrapaqlra.jpg": ("editorial/kulort-40-campagne-1.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_fac5zrfac5zrfac5.jpg": ("editorial/nyanse-jong-campagne-1.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_4o8g5f4o8g5f4o8g.jpg": ("editorial/nyanse-jv-campagne-1.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_jxn5crjxn5crjxn5.jpg": ("editorial/nyanse-vol-campagne-1.jpg", 1200),
    f"{D1}/Editorial/Gemini_Generated_Image_akekz6akekz6akek.jpg": ("editorial/nyanse-40-campagne-1.jpg", 1200),
    f"{D1}/Products/product-envelope.jpg": ("product/envelope.jpg", 1200),
    f"{D1}/Products/product-fan.jpg": ("product/fan.jpg", 1200),
    f"{D1}/Products/product-pass-front.jpg": ("product/pass-front.jpg", 1200),
    f"{D1}/Products/product-wallet.jpg": ("product/wallet.jpg", 1200),
    f"{D1}/Seasons/family_seasons/Spring_family.jpg": ("seasons/family-lente.jpg", 1000),
    f"{D1}/Seasons/family_seasons/Summer_family.jpg": ("seasons/family-zomer.jpg", 1000),
    f"{D1}/Seasons/family_seasons/Autumn_family.jpg": ("seasons/family-herfst.jpg", 1000),
    f"{D1}/Seasons/family_seasons/Winter_family.jpg": ("seasons/family-winter.jpg", 1000),
}
SEASON_FILES = {
    "light_spring": "lightSpring", "Warm_spring": "warmSpring", "bright_spring": "brightSpring",
    "Light_summer": "lightSummer", "Cool_summer": "coolSummer", "soft_summer": "softSummer",
    "Soft_autumn": "softAutumn", "warm_autumn": "warmAutumn", "deep_autumn": "deepAutumn",
    "deep_winter": "deepWinter", "cool_winter": "coolWinter", "bright_winter": "brightWinter",
}
for src_name, key in SEASON_FILES.items():
    PHOTOS[f"{D1}/Seasons/sub_seasons/{src_name}.jpg"] = (f"seasons/season-{key}.jpg", 900)


def neutralise_on_shirt(im: Image.Image) -> Image.Image:
    """Scale R, G, B so the grey T-shirt (bottom centre) is neutral; gains are capped."""
    w, h = im.size
    box = im.crop((int(w * 0.3), int(h * 0.9), int(w * 0.7), int(h * 0.98))).resize((40, 8))
    px = [box.getpixel((x, y)) for y in range(box.height) for x in range(box.width)]
    med = [sorted(p[c] for p in px)[len(px) // 2] for c in range(3)]
    grey = sum(med) / 3
    gains = [max(0.88, min(1.12, grey / max(1, m))) for m in med]
    r, g, b = im.split()
    return Image.merge("RGB", [ch.point(lambda v, k=k: min(255, round(v * k))) for ch, k in zip((r, g, b), gains)])


def trim_flat_bottom(im: Image.Image) -> Image.Image:
    """Some Gemini images carry an empty paper band at the bottom: cut it off."""
    small = im.convert("L").resize((64, 256))
    w, h = small.size
    rows = [[small.getpixel((x, y)) for x in range(w)] for y in range(h)]
    cut = h
    for y in range(h - 1, -1, -1):
        r = rows[y]
        mean = sum(r) / w
        if max(abs(v - mean) for v in r) > 6:
            break
        cut = y
    return im.crop((0, 0, im.width, round(im.height * cut / h))) if cut < h * 0.97 else im


def save(im: Image.Image, target: str, width: int) -> None:
    path = os.path.join(OUT, target)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(path, "JPEG", quality=80, optimize=True, progressive=True)


def date_of(path: str) -> str:
    return datetime.date.fromtimestamp(os.path.getmtime(path)).strftime("%d-%m-%Y")


register: dict[str, list[str]] = {}
for src, target in PORTRAITS.items():
    p = os.path.join(SRC, src)
    if not os.path.exists(p):
        print("missing", src)
        continue
    save(neutralise_on_shirt(ImageOps.exif_transpose(Image.open(p)).convert("RGB")), target, 720)
    register.setdefault(os.path.dirname(target), []).append(f"{os.path.basename(target)} · Gemini · {date_of(p)} · bron {src}")
for src, (target, width) in PHOTOS.items():
    p = os.path.join(SRC, src)
    if not os.path.exists(p):
        print("missing", src)
        continue
    save(trim_flat_bottom(ImageOps.exif_transpose(Image.open(p)).convert("RGB")), target, width)
    register.setdefault(os.path.dirname(target), []).append(f"{os.path.basename(target)} · Gemini · {date_of(p)}")

for folder, lines in register.items():
    path = os.path.join(OUT, folder, "bron.txt")
    existing = open(path).read().splitlines() if os.path.exists(path) else []
    names = {l.split(" · ")[0] for l in lines}
    keep = [l for l in existing if l.split(" · ")[0] not in names]
    with open(path, "w") as f:
        f.write("\n".join(keep + sorted(lines)) + "\n")
    print(f"{folder}: {len(lines)} images")
