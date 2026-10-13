# NYANSE & KULØRT

Je persoonlijke kleurprofiel uit één selfie, met een tastbare kleurenpas en outfits in jouw kleuren bij echte winkels. Twee merken op één motor:

- **NYANSE** voor vrouwen, met de stemmen Girl Math en Atelier
- **KULØRT** voor mannen, met de stem Wingman

## Waar staat wat

| Pad | Inhoud |
|---|---|
| [CLAUDE.md](CLAUDE.md) | De masterprompt. Claude Code leest hem automatisch. |
| [prototype/index.html](prototype/index.html) | Klikbaar prototype v0.5. Open hem in een browser. |
| [docs/BESLISSINGEN.md](docs/BESLISSINGEN.md) | Wat besloten is en waarom |
| [docs/BRONNEN.md](docs/BRONNEN.md) | Onderzoek en bronnen |
| [docs/fase-a/](docs/fase-a/) | Fase A: plan, printbare referentiekaart, toestemmingsformulier |
| [app/lab/](app/lab/) | De testtool `/lab` (Next.js) |
| [lib/color/](lib/color/) | Kleurlogica: Lab, ΔE2000, profiel op drie schalen, seizoenen, Monk |
| [lib/analysis/](lib/analysis/) | Kaartdetectie, kalibratie en pijplijn A (op het apparaat) |
| [tools/card/](tools/card/) | Generator voor de referentiekaart (`python tools/card/generate.py`) |

## De testtool starten (lokaal)

Eenmalig: installeer [Node.js](https://nodejs.org) (versie 24) en zet in `.env`:

```
ANTHROPIC_API_KEY=...
LAB_PASSWORD=...
```

Dan in de terminal (in deze map):

```
npm install        # eenmalig; downloadt ook de gezichtsmodellen (±20 MB)
npm run dev        # start op http://localhost:3000
```

Open **http://localhost:3000/lab** en log in met je `LAB_PASSWORD`.

**Op je telefoon testen:** zet telefoon en laptop op hetzelfde wifi-netwerk en open het adres dat bij `Network:` staat, bijvoorbeeld `http://192.168.x.x:3000/lab`.

Overige commando's: `npm test` (kleurlogica), `npm run build` (productiebuild).

## Nog te doen door mij

- [ ] Domeinen vastleggen: nyanse.com/.nl, kulort.com/.nl
- [ ] Merkcheck NYANSE en KULØRT (boip.int, euipo.europa.eu)
- [ ] Social handles: @nyanse, @kulort
- [ ] 30 testpersonen werven (verdeeld over de Monk-schaal)
- [ ] ChatGPT-vergelijking (10 mensen) en 5 merkgesprekken
