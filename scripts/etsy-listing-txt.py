# Splits assets/etsy/listings.md into one listing.txt per package folder, ready to paste into Etsy.
# Called at the end of scripts/make-etsy.ts; can also run on its own: python3 scripts/etsy-listing-txt.py
import re

md = open("assets/etsy/listings.md").read()
SEASON = {"Soft Autumn": "softAutumn", "Deep Winter": "deepWinter", "Soft Summer": "softSummer", "Light Spring": "lightSpring", "Warm Autumn": "warmAutumn", "Cool Winter": "coolWinter", "Light Summer": "lightSummer", "Bright Spring": "brightSpring", "Deep Autumn": "deepAutumn", "Cool Summer": "coolSummer", "Warm Spring": "warmSpring", "Bright Winter": "brightWinter"}
TIER = {"1": "1-palette-card", "2": "2-colour-guide", "3": "3-style-guide", "4": "4-complete"}
n = 0
for sec in re.split(r"\n## ", md)[1:]:
    name = sec.split("\n", 1)[0].strip()
    if name not in SEASON:  # the self-test writes its own listing.txt
        continue
    for part in re.split(r"\n### ", sec)[1:]:
        get = lambda label: re.search(label + r" ?(.+)", part).group(1).replace("`", "")
        desc = re.search(r"```\n(.*?)\n```", part, re.S).group(1)
        txt = f"""ETSY LISTING · {name} · {part.split(chr(10))[0].strip()}
(type: Digital files · Who made it: I did · What is it: A finished product · When: 2020-2026 · Section: {name.split()[-1]})

PHOTOS (in this order): {get(r"\*\*Foto's \(in deze volgorde\):\*\*")}
VIDEO: video.mp4
DIGITAL FILES: {get(r"\*\*Bestanden \(Digital files\):\*\*")}
PRICE: EUR {get(r"\*\*Prijs \(advies\):\*\* €")}
QUANTITY: 999

TITLE:
{get(r"\*\*Titel:\*\*")}

TAGS (paste one by one, or all at once separated by commas):
{get(r"\*\*Tags \(13\):\*\*")}

DESCRIPTION:
{desc}
"""
        open(f"assets/etsy/{SEASON[name]}/{TIER[part[0]]}/listing.txt", "w").write(txt)
        n += 1
print("wrote", n, "listing.txt files")
