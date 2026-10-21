# Splits assets/etsy/listings.md into one listing.txt per package folder, ready to paste into Etsy,
# with short titles (Etsy Seller Handbook, Aug 2025) and the attributes to fill in per listing.
# Called at the end of scripts/make-etsy.ts; can also run on its own: python3 scripts/etsy-listing-txt.py
import json
import math
import re

md = open("assets/etsy/listings.md").read()
DATA = json.load(open("assets/social/seasons/data.json"))
SEASON = {"Soft Autumn": "softAutumn", "Deep Winter": "deepWinter", "Soft Summer": "softSummer", "Light Spring": "lightSpring", "Warm Autumn": "warmAutumn", "Cool Winter": "coolWinter", "Light Summer": "lightSummer", "Bright Spring": "brightSpring", "Deep Autumn": "deepAutumn", "Cool Summer": "coolSummer", "Warm Spring": "warmSpring", "Bright Winter": "brightWinter"}
TIER = {"1": "1-palette-card", "2": "2-colour-guide", "3": "3-style-guide", "4": "4-complete"}
# short and clear; the keywords live in the 13 tags (same as scripts/make-etsy.ts)
TITLE = {
    "1": "{n} Colour Palette Card, Printable Swatch Card and Phone Wallpaper",
    "2": "{n} Colour Guide PDF, Seasonal Colour Analysis",
    "3": "{n} Style Guide for Her and Him, Outfits and Capsule Wardrobe PDF",
    "4": "{n} Complete Colour Bundle, Style Guide, Make-up and Colour Fan PDF",
}
FILE_TYPES = {"1": "PDF, PNG", "2": "PDF, PNG", "3": "PDF, PNG", "4": "PDF, ZIP"}


def lch(hexstr):
    r, g, b = (int(hexstr[i:i + 2], 16) / 255 for i in (1, 3, 5))
    lin = lambda c: ((c + 0.055) / 1.055) ** 2.4 if c > 0.04045 else c / 12.92
    r, g, b = lin(r), lin(g), lin(b)
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
    y = r * 0.2126 + g * 0.7152 + b * 0.0722
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    L, a, bb = 116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))
    return L, math.hypot(a, bb), math.degrees(math.atan2(bb, a)) % 360


def etsy_colour(hexstr):
    """Etsy's fixed colour names (the 'Primary/Secondary colour' attribute). In CIE LCh pure red sits
    near 40 degrees and pure yellow near 100, so the hue borders follow that."""
    L, C, h = lch(hexstr)
    if C < 8:
        return "White" if L > 90 else "Black" if L < 20 else "Grey"
    if 50 <= h < 100 and C < 28 and L > 62:
        return "Beige"
    if 30 <= h < 80 and L < 50 and C < 45:  # brown is muted; a deep ruby is not brown
        return "Brown"
    if h < 42 or h >= 350:
        return "Pink" if L > 70 and C < 50 else "Red"
    if h < 68:
        return "Orange"
    if h < 105:
        return "Yellow"
    if h < 200:
        return "Green"
    if h < 290:
        return "Blue"
    if h < 335:
        return "Purple"
    return "Pink"


def top_colours(key):
    s = DATA[key]
    hexes = [c["hex"] for c in s["nyanse"] + s["kulort"] + s.get("palette", [])][:16]
    counts = {}
    for i, x in enumerate(hexes):
        counts[etsy_colour(x)] = counts.get(etsy_colour(x), 0) + (2 if i < 4 else 1)  # the core colours count double
    ranked = sorted(counts, key=lambda k: -counts[k])
    return ranked[0], ranked[1] if len(ranked) > 1 else ranked[0]


n = 0
for sec in re.split(r"\n## ", md)[1:]:
    name = sec.split("\n", 1)[0].strip()
    if name not in SEASON:  # the self-test writes its own listing.txt
        continue
    key = SEASON[name]
    primary, secondary = top_colours(key)
    for part in re.split(r"\n### ", sec)[1:]:
        tier = part[0]
        get = lambda label: re.search(label + r" ?(.+)", part).group(1).replace("`", "")
        desc = re.search(r"```\n(.*?)\n```", part, re.S).group(1)
        title = TITLE[tier].format(n=name)
        txt = f"""ETSY LISTING · {name} · {part.split(chr(10))[0].strip()}
(type: Digital files · Who made it: I did · What is it: A finished product · When: 2020-2026 · Section: {name.split()[-1]})

PHOTOS (in this order): {get(r"\*\*Foto's \(in deze volgorde\):\*\*")}
VIDEO: video.mp4
DIGITAL FILES: {get(r"\*\*Bestanden \(Digital files\):\*\*")}
PRICE: EUR {get(r"\*\*Prijs \(advies\):\*\* €")}
QUANTITY: 999

TITLE:
{title}

TAGS (paste one by one, or all at once separated by commas):
{get(r"\*\*Tags \(13\):\*\*")}

ATTRIBUTES (fill in what Etsy offers for this category; leave the rest empty):
• Primary colour: {primary}
• Secondary colour: {secondary}
• Orientation: Portrait
• Digital file type: {FILE_TYPES[tier]}
• Recipient / Who it's for: Unisex adults
• Occasion and Holiday: leave empty (from 18 Nov: see the Black Friday reminder)

DESCRIPTION:
{desc}
"""
        open(f"assets/etsy/{key}/{TIER[tier]}/listing.txt", "w").write(txt)
        n += 1

# the short titles in listings.md too, so both match
out, season, tier = [], None, None
for line in md.split("\n"):
    if line.startswith("## "):
        season = line[3:].strip() if line[3:].strip() in SEASON else None
    elif line.startswith("### ") and season:
        tier = line[4]
    elif line.startswith("**Titel:**") and season and tier:
        line = "**Titel:** " + TITLE[tier].format(n=season)
    out.append(line)
open("assets/etsy/listings.md", "w").write("\n".join(out))

# the self-test: short title and attributes as well
st = "assets/etsy/_self-test/listing.txt"
try:
    t = open(st).read()
    t = re.sub(r"TITLE:\n.*\n", "TITLE:\nWhich Season Am I? Colour Analysis Self-Test PDF, 12 Seasons\n", t)
    if "ATTRIBUTES" not in t:
        t = t.replace("\nDESCRIPTION:", "\nATTRIBUTES (fill in what Etsy offers for this category; leave the rest empty):\n• Primary colour: Beige\n• Secondary colour: Rainbow\n• Orientation: Portrait\n• Digital file type: PDF\n• Recipient / Who it's for: Unisex adults\n• Occasion and Holiday: leave empty\n\nDESCRIPTION:")
    open(st, "w").write(t)
except FileNotFoundError:
    pass
print("wrote", n, "listing.txt files (short titles, attributes)")
