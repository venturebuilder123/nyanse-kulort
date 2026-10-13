"""Generate the printable A4 reference card sheet (8 cards, credit-card size).

Usage:
    pip install -r tools/card/requirements.txt
    python tools/card/generate.py [output.pdf]

All geometry comes from layout-v1.json so the /lab detector and the print stay in sync.
"""

import json
import sys
from pathlib import Path

import cv2
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

HERE = Path(__file__).parent
LAYOUT = json.loads((HERE / "layout-v1.json").read_text())
DEFAULT_OUT = HERE.parent.parent / "docs" / "fase-a" / "referentiekaart-v1.pdf"

PAGE_W, PAGE_H = A4  # points
COLS, ROWS = 2, 4
GAP = 8  # mm between cards (room for cutting)
TOP = 52  # mm from top of page to first card row

CUT_GREY = HexColor("#B8B8B8")
TEXT_GREY = HexColor("#555555")


def marker_bits(dictionary: str, marker_id: int) -> list[list[int]]:
    """Return the marker as a grid of 0/1 cells, including the black border."""
    d = cv2.aruco.getPredefinedDictionary(getattr(cv2.aruco, dictionary))
    marker_cells = int(dictionary.split("_")[1].split("X")[0]) + 2
    img = cv2.aruco.generateImageMarker(d, marker_id, marker_cells)
    return [[1 if px > 127 else 0 for px in row] for row in img]


def draw_card(c: canvas.Canvas, ox: float, oy_top: float, number: int, bits) -> None:
    """Draw one card. ox/oy_top are mm from the page's left/top edge."""
    card = LAYOUT["card"]

    def X(x_mm: float) -> float:
        return (ox + x_mm) * mm

    def Y(y_mm: float, h_mm: float = 0) -> float:
        # reportlab's origin is bottom-left; convert from top-left mm
        return PAGE_H - (oy_top + y_mm + h_mm) * mm

    # cut line
    c.setStrokeColor(CUT_GREY)
    c.setLineWidth(0.3)
    c.setDash(2, 2)
    c.roundRect(X(0), Y(0, card["height"]), card["width"] * mm, card["height"] * mm,
                card["cornerRadius"] * mm, stroke=1, fill=0)
    c.setDash()

    # ArUco marker
    m = LAYOUT["marker"]
    cell = m["size"] / len(bits)
    # one solid black square, then white cells on top: no anti-aliasing seams between black cells
    c.setFillColor(black)
    c.rect(X(m["x"]), Y(m["y"], m["size"]), m["size"] * mm, m["size"] * mm, stroke=0, fill=1)
    c.setFillColor(white)
    for r, row in enumerate(bits):
        for col, v in enumerate(row):
            if v:
                c.rect(X(m["x"] + col * cell), Y(m["y"] + r * cell, cell),
                       cell * mm, cell * mm, stroke=0, fill=1)

    # patches
    for p in LAYOUT["patches"]:
        if p["srgb"]:
            c.setFillColor(HexColor(p["srgb"]))
            c.rect(X(p["x"]), Y(p["y"], p["h"]), p["w"] * mm, p["h"] * mm, stroke=0, fill=1)
        else:
            # white patch = bare paper; mark only its corners
            c.setStrokeColor(TEXT_GREY)
            c.setLineWidth(0.4)
            t = 2.5
            x0, y0, x1, y1 = p["x"], p["y"], p["x"] + p["w"], p["y"] + p["h"]
            for (cx, cy, dx, dy) in [(x0, y0, 1, 1), (x1, y0, -1, 1), (x0, y1, 1, -1), (x1, y1, -1, -1)]:
                c.line(X(cx), Y(cy), X(cx + dx * t), Y(cy))
                c.line(X(cx), Y(cy), X(cx), Y(cy + dy * t))

    # footer text on the card
    c.setFillColor(TEXT_GREY)
    c.setFont("Helvetica-Bold", 6.5)
    c.drawString(X(4), Y(48.6), "NYANSE · KULØRT")
    c.setFont("Helvetica", 5.5)
    c.drawString(X(30), Y(48.6), "testkaart v1 · niet buigen · vlakken niet aanraken")
    c.drawRightString(X(card["width"] - 4), Y(52.2), f"kaart {number:02d}")


def draw_header(c: canvas.Canvas) -> None:
    left = 15 * mm
    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(left, PAGE_H - 16 * mm, "Referentiekaart v1 — fase A testkit")
    c.setFont("Helvetica", 8.5)
    lines = [
        "Printen: A4, mat wit papier (liefst 160–200 g/m²), schaal 100% / ‘werkelijke grootte’, niet ‘passend maken’.",
        "Controle: de balk rechts moet precies 50 mm zijn. Alle testkaarten op dezelfde printer printen en uitknippen langs de stippellijn.",
        "Gebruik: houd de kaart plat naast je kin, naar de camera gericht, in hetzelfde licht als je gezicht. Vingers van de vlakken af.",
        "Bewaren: droog en uit de zon. Een vlek of kreukel op het grijze of witte vlak? Print een nieuwe.",
    ]
    for i, line in enumerate(lines):
        c.drawString(left, PAGE_H - (24 + i * 4.6) * mm, line)

    # 50 mm scale bar
    bx, by = 145, 15
    c.setStrokeColor(black)
    c.setLineWidth(0.6)
    c.line(bx * mm, PAGE_H - by * mm, (bx + 50) * mm, PAGE_H - by * mm)
    for x in (bx, bx + 50):
        c.line(x * mm, PAGE_H - (by - 1.5) * mm, x * mm, PAGE_H - (by + 1.5) * mm)
    c.setFont("Helvetica", 7)
    c.drawCentredString((bx + 25) * mm, PAGE_H - (by - 2.5) * mm, "50 mm")


def main() -> None:
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUT
    out.parent.mkdir(parents=True, exist_ok=True)
    m = LAYOUT["marker"]
    bits = marker_bits(m["dictionary"], m["id"])

    c = canvas.Canvas(str(out), pagesize=A4)
    c.setTitle("Referentiekaart v1")
    c.setAuthor("NYANSE / KULØRT")
    draw_header(c)

    card = LAYOUT["card"]
    left = (PAGE_W / mm - (COLS * card["width"] + (COLS - 1) * GAP)) / 2
    n = 1
    for r in range(ROWS):
        for col in range(COLS):
            draw_card(c, left + col * (card["width"] + GAP), TOP + r * (card["height"] + GAP), n, bits)
            n += 1
    c.showPage()
    c.save()
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
