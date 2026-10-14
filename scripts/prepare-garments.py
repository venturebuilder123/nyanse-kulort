#!/usr/bin/env python3
"""Turns the grey garment photos (assets/brand-originals/deel 1/clothes, not in git) into
recolourable sprites in public/brand/garments/ plus lib/brand/garments.json.

Each sprite is a WebP with alpha: the white background removed (flood fill from the edges,
soft edge), and the grey normalised so the fabric's median sits at 50% grey. In the browser a
colour layer is masked by the sprite and the sprite is blended on top with soft-light: mid-grey
leaves the colour as it is, folds and seams darken or lighten it. One photo serves every colour.

Run: python3 scripts/prepare-garments.py
"""
import json
import os
from collections import deque

from PIL import Image, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "brand-originals", "deel 1", "clothes")
OUT = os.path.join(ROOT, "public", "brand", "garments")
MANIFEST = os.path.join(ROOT, "lib", "brand", "garments.json")
MAX = 720

# file stem -> garment kind used by the app (app/(flow)/Flats.tsx)
KINDS = {
    "kulort-belt": "belt", "kulort-blazer": "blazer", "kulort-blouse": "shirt", "kulort-chino": "pants",
    "kulort-crewneck": "knit", "kulort-dress-shoes": "shoe", "kulort-jeans": "jeans", "kulort-overshirt": "overshirt",
    "kulort-sneakers": "sneaker",
    "nyanse-bag": "bag", "nyanse-blazer": "blazer", "nyanse-blouse": "blouse", "nyanse-crewneck": "knit",
    "nyanse-jeans": "jeans", "nyanse-loafers": "shoe", "nyanse-longsleve": "top", "nyanse-scarf": "scarf",
    "nyanse-skirt": "skirt", "nyanse-sneakers": "sneaker", "nyanse-trousers": "wide", "nyanse-tshirt": "tee",
}


def background_mask(im: Image.Image, tol: int = 14) -> Image.Image:
    """255 = garment, 0 = background reachable from the border through near-white pixels."""
    small = im.convert("L")
    w, h = small.size
    px = small.load()
    seen = bytearray(w * h)
    bg = Image.new("L", (w, h), 255)
    bp = bg.load()
    q = deque()
    corner = sorted(px[x, y] for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)))[2]
    limit = corner - tol
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))
    while q:
        x, y = q.pop()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        if px[x, y] < limit:
            continue
        bp[x, y] = 0
        if x > 0: q.append((x - 1, y))
        if x < w - 1: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y < h - 1: q.append((x, y + 1))
    return bg.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))


def process(path: str, stem: str) -> dict:
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    im.thumbnail((1100, 1100))
    alpha = background_mask(im)
    bbox = alpha.point(lambda v: 255 if v > 30 else 0).getbbox()
    im, alpha = im.crop(bbox), alpha.crop(bbox)
    im.thumbnail((MAX, MAX), Image.LANCZOS)
    alpha = alpha.resize(im.size, Image.LANCZOS)
    grey = im.convert("L")
    vals = sorted(v for v, a in zip(grey.getdata(), alpha.getdata()) if a > 200)
    med = vals[len(vals) // 2] if vals else 128
    # median -> 128, a little extra contrast so folds read after blending
    shade = grey.point(lambda v: max(0, min(255, round(128 + (v - med) * 1.35))))
    sprite = Image.merge("LA", (shade, alpha)).convert("RGBA")
    os.makedirs(OUT, exist_ok=True)
    sprite.save(os.path.join(OUT, f"{stem}.webp"), "WEBP", quality=82, method=6)
    return {"src": f"/brand/garments/{stem}.webp", "w": im.width, "h": im.height}


manifest: dict[str, dict[str, dict]] = {"kulort": {}, "nyanse": {}}
for folder in ("men", "women"):
    d = os.path.join(SRC, folder)
    if not os.path.isdir(d):
        continue
    for f in sorted(os.listdir(d)):
        stem, ext = os.path.splitext(f)
        if ext.lower() not in (".jpg", ".jpeg", ".png", ".webp") or stem not in KINDS:
            continue
        brand = stem.split("-")[0]
        manifest[brand][KINDS[stem]] = process(os.path.join(d, f), stem)
        print("ok", stem, "->", KINDS[stem])

with open(MANIFEST, "w") as fh:
    json.dump(manifest, fh, indent=2)
    fh.write("\n")
print("wrote", MANIFEST)
