# Masterprompt: extensies voor Claude Code installeren

*14 oktober 2026. Eerst controleren, daarna pas installeren.*

## Waarom zo voorzichtig
Een plugin, skill of MCP-server draait met **jouw rechten** in deze map. Hij kan dus bij `.env` (Anthropic-key, Supabase service-key, VAPID-sleutels), bij je GitHub-push en bij je mappen. Eén kwaadwillende of slordige extensie kan de sleutels lekken of code pushen die live gaat. Daarom: per extensie de bron controleren, de rechten bekijken, en één voor één installeren.

## Wat ik vond (14 oktober)

| Gevraagd | Wat het is | Status | Advies |
|---|---|---|---|
| **superpowers** | skills-framework van Jesse Vincent (obra), MIT. Zit in Claude Code via `/plugin marketplace add obra/superpowers-marketplace`, daarna `/plugin install superpowers@superpowers-marketplace` | bestaat, veel gebruikt | ✅ installeren |
| **claude-mem** | persistent geheugen (thedotmack), lokaal in SQLite plus ChromaDB, draait een achtergrondproces | bestaat, populair; de licentie verschilt per bron | ⚠️ dubbel met het ingebouwde geheugen. Alleen als je meerdere projecten hebt |
| **caveman** | skill die Claude kort laat praten ("weinig woorden") | bestaat, MIT; de besparing is volgens critici klein (20–30% van de output, op de rekening weinig) | ❌ niet voor dit project: je wilt duidelijke Nederlandse uitleg met FEIT/AANNAME |
| **claude security** | het ingebouwde commando `/security-review` en de GitHub Action `anthropics/claude-code-security-review` | officieel van Anthropic | ✅ gebruiken vóór elke livegang; geen installatie nodig |
| **Higgsfield** | beeld- en videogeneratie (AI-modellen, reveal-video's); gehoste MCP-server met OAuth | bestaat, deels betaald (credits) | ✅ voor beeld en video. Kost geld boven de gratis tegoeden; AI-label blijft verplicht |
| **OmniRoute** | zelf gehoste gateway die Claude Code via andere modelaanbieders laat lopen | bestaat, MIT | ❌ stuurt je code en sleutels via derden; voorwaarden en privacy onzeker |
| **PhotoCraft / VectorCraft / FilmCraft** | open-source alternatieven voor Adobe (project ArtCraft); bureaubladapps, deels met MCP | bestaat; zelf ±45–56% klaar (alpha) | ⏸️ later; als app, niet als Claude-extensie |
| **AI influencer** | onduidelijk welk product | niet gevonden | ❓ stuur me de link |
| **Ootto** | waarschijnlijk OttoKit (workflow-agents) of iets anders | onduidelijk | ❓ stuur me de link |
| **"Harvey" sales agent** | Harvey is een bekende AI voor **juristen**, geen sales-agent; er zijn wel losse sales-skills | niet gevonden als zodanig | ❓ stuur me de link. Een sales-agent bouwen kan ook zelf |
| **cursor tracker ("eyes will follow")** | onduidelijk | niet gevonden | ❓ stuur me de link |
| **taskobserver** | een skill "task observer" op claudemarketplaces (rebelytics) | gevonden, niet gecontroleerd | ⚠️ eerst de code lezen |
| **claudecodesetup** | onduidelijk | niet gevonden | ❓ stuur me de link |

**Relevant en veilig voor dit project:**
- `/security-review` (ingebouwd);
- de officiële connectoren in claude.ai die je al hebt (Gmail en Docs);
- later Higgsfield voor beeld en video.

## De masterprompt (plakken in een nieuwe Claude Code-sessie in deze map)

> Je installeert extensies voor Claude Code in het project nyanse-kulort. Werk strikt in deze volgorde en stop bij elke twijfel.
>
> **Regels**
> 1. Installeer alleen extensies uit deze lijst: [vul in: bijvoorbeeld superpowers, Higgsfield MCP].
> 2. Zoek per extensie eerst de **officiële bron** (GitHub-repo van de maker, of de documentatie van de leverancier). Meld: maker, licentie, laatste release, aantal open security-issues, en welke rechten hij vraagt (hooks, achtergrondprocessen, netwerk, bestandstoegang).
> 3. Lees de code van hooks en scripts die bij het starten of na elke opdracht draaien. Zoek naar: lezen van `.env` of `~/.ssh`, netwerkverkeer naar onbekende domeinen, `curl | sh`, verborgen downloads en wijzigingen in git-config.
> 4. Geef me per extensie een **GO/NO-GO** met één zin waarom. Installeer pas na mijn GO.
> 5. Installeer **per project** (`--scope project`) waar dat kan, niet globaal, tenzij ik iets anders zeg.
> 6. Nooit: API-keys plakken in configuratie die in git komt, OAuth geven aan onbekende domeinen, of `--dangerously-skip-permissions` gebruiken.
> 7. Na installatie: `/help` of `/mcp` om te controleren dat het werkt, en `git status` om te zien dat er geen bestanden met geheimen bij zijn gekomen.
> 8. Leg alles vast in `docs/SETUP-EXTENSIES.md` (wat, versie, datum, waarom), en commit pas na mijn akkoord.
> 9. Kost iets geld of moet er een account worden aangemaakt (zoals Higgsfield-credits): eerst vragen.
>
> Begin met stap 2 voor de eerste extensie en wacht dan op mijn GO.

## SEO, SEA en social advertising (14 oktober)

Alle drie werken als MCP-server: Claude leest dan je campagnecijfers rechtstreeks, in plaats van via geëxporteerde CSV's. Advies voor ons budget en onze fase:

| Wat | Extensie | Officieel? | Kosten | Wanneer | Advies |
|---|---|---|---|---|---|
| **Social: Meta** (Instagram, Facebook, Reels) | Meta Ads MCP, gehost (`mcp.facebook.com/ads`), Business-OAuth | ja, open beta sinds 29 april 2026 | gratis (de advertenties zelf kosten geld) | zodra de eerste KULØRT-test draait | ✅ eerste keus: onze eerste test is Reels. Begin met alleen lezen; wijzigingen pas na jouw akkoord per actie |
| **Social: TikTok** | getmcpads of AdsMCP (community) | nee | gratis, lokaal | later (Girl Math via creators) | ⚠️ eerst de code lezen; liefst de versie met alleen lezen |
| **SEA: Google Ads** | Google Ads MCP (`googleads/google-ads-mcp`) | ja, alleen lezen | gratis; je hebt een developer-token en een Google Cloud-project nodig | als we gaan zoekadverteren ("kleuranalyse", "welke kleuren staan mij") | ✅ alleen lezen is precies goed. Campagnes zet je zelf in Google Ads |
| **SEO: eigen data** | Google Search Console MCP (community, bijvoorbeeld `mcp-server-gsc`, met alleen leesrechten) | geen officiële server | gratis | zodra het domein live staat en in Search Console zit | ✅ de beste gratis bron: waarop we gevonden worden |
| **SEO: zoekwoorden en concurrenten** | DataForSEO MCP (open source) | ja, van de leverancier | betalen per opvraging (centen) | bij het schrijven van landingspagina's en blog | ✅ past bij ons budget |
| **SEO: alles in één** | Ahrefs- of Semrush-MCP | ja | vanaf ±€100–140 per maand | niet nu | ❌ te duur voor het budget van €1.000 |
| **Analytics** | Google Analytics MCP (officieel, experimenteel) | ja | gratis | nee | ❌ wij gebruiken PostHog EU zonder cookies. GA4 vraagt een cookiebanner (CLAUDE.md §4) |

**Spelregels voor advertentiekoppelingen (bovenop de masterprompt):**
1. Eerst **alleen lezen**. Een advertentie aanmaken, het budget wijzigen of een campagne aanzetten gebeurt pas na jouw expliciete akkoord per actie, want dit kost geld.
2. Elke advertentie krijgt UTM-parameters plus stem en segment (`?s=`, `?g=`), zodat de opbrengst per bezoeker per segment meetbaar is.
3. Geen claims die niet gemeten zijn, geen onzekerheid als haakje en een AI-label op AI-beeld (CLAUDE.md §9 en §12). Laat Claude elke advertentietekst daarop toetsen.
