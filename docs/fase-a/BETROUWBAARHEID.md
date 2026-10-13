# Betrouwbaarheid: wanneer is de uitslag "echt goed"?

*13 oktober 2026. Vraag van de oprichter: de uitslag moet met meer dan 80% zekerheid kloppen, met een gedegen rekenmodel (zoals Art of Image).*

## 1. Wat het onderzoek zegt (FEIT)

| Bron | Bevinding |
|---|---|
| Stacchio e.a., *Deep Armocromia*, ECCV-workshops 2024 | Het beste gepubliceerde model (deep learning, ±1.900 testfoto's gelabeld door getrainde analisten) haalt **55,4% op 4 seizoenen** en **31,8% op 12 seizoenen**. Het is de enige openbare dataset met een streng labelprotocol. |
| Dinh, bachelorscriptie Universiteit Leiden (LIACS), juli 2026 | Een overzicht van alle methodes:<br>• regelmodellen in RGB: 20–30% op 4 seizoenen;<br>• klassieke machine learning: 31–35%;<br>• deep learning: 27–56%;<br>• warm/koel als losse ja/nee-vraag: 70–80%.<br>Een hiërarchische aanpak (eerst ondertoon en contrast, dan het type) in Lab/HSV werkt beter dan een platte indeling. **"De labels zijn subjectief; de seizoenen overlappen en zijn niet strikt te scheiden."** |
| Studie Chulalongkorn-universiteit (Thailand) | Waarnemers en onderzoeker waren het in **40%** van de gevallen eens over het seizoen. |
| Art of Image (artofimage.nl) | Een consultant vergelijkt huid, haar en ogen met kleurstroken en "meer dan 800 gedefinieerde kleuren", met computerondersteuning. Het resultaat is een palet van 42 kleuren ("2-staps verificatie"). **Geen gepubliceerd rekenmodel en geen gemeten nauwkeurigheid**, wel een doel van "100% tevredenheid". |

**Conclusie (FEIT):** niemand meet een seizoensuitslag met 80% zekerheid uit één foto. Ook experts zijn het onderling vaak oneens, en dat begrenst wat meetbaar is. Art of Image heeft wel een sterk proces (persoonlijk, met doeken), maar geen openbaar model dat we kunnen overnemen.

## 2. Wat "80% goed" voor ons betekent (besluit)

We beloven geen 80% op het exacte seizoen voor iedereen. Dat haalt niemand, en het zou een onbewezen claim zijn (CLAUDE.md §9). Wel dit:

1. **Goed betekent: een expert met doeken komt op hetzelfde uit.** De maatstaf is een gecertificeerde consultant met doeken, niet onze eigen regels.
2. **We zijn alleen stellig als we het zeker weten.** Elke uitslag heeft een betrouwbaarheid. We leggen per niveau (familie, seizoen of buurseizoen, exact seizoen) vast vanaf welke betrouwbaarheid de **95%-ondergrens** van de nauwkeurigheid ≥ 80% is. Daarboven tonen we de uitslag stellig. Daaronder:
   - een tweede selfie met de kaart, of
   - "tussen X en Y", met een palet dat beide mengt.
3. **De claim volgt de meting.** In de app en in advertenties komt pas een percentage als het gemeten is, met uitleg hoe ("in 9 van de 10 gevallen dezelfde uitkomst als een kleurconsultant met doeken, gemeten bij N mensen").

## 3. Het rekenmodel

Wat er al is:
- metingen op het apparaat in Lab;
- ondertoon als afstand tot de neutrale lijn (huid, natuurlijk haar, iris);
- diepte (huid, haar, ogen);
- helderheid (contrast tussen haar en huid, chroma van ogen, huid en haar);
- correctie met de kaart;
- een betrouwbaarheid per schaal;
- de keuze goud/zilver als beslisser;
- de 12 seizoenen als middelpunten, met een rand.

Die opzet is hiërarchisch en gebruikt Lab, precies wat de literatuur aanraadt.

Wat er nu bij komt:

| Onderdeel | Status |
|---|---|
| **Expertoordeel als grondwaarheid** in `/lab`: per testpersoon twee consultants, los van elkaar en blind | gebouwd (13 okt) |
| **Rapport "Klopt het?"**:<br>• exact, buurseizoen en familie, met de 95%-ondergrens;<br>• overeenstemming tussen de experts zelf (kappa, het plafond);<br>• uitsplitsing per Monk-groep;<br>• de drempel voor een stellige uitslag per niveau | gebouwd (`lib/eval/agreement.ts`, getest) |
| **Gewichten afstellen** op de expertlabels (nearest centroid, zoals in de Leidse scriptie): middelpunten verschuiven naar waar de experts mensen indelen | na de eerste 30 gelabelde personen |
| **Meerdere selfies middelen** (2–3 foto's, mediaan per schaal) | klein, na de meting |
| **Pijplijn C** (een vision-check op make-up, filter en licht) als extra signaal bij twijfel | fase A, vergelijken |

## 4. Het onderzoek dat dit bewijst

- **Wie:** 60 mensen, verspreid over de Monk-tinten (minimaal 2 per groep van twee tinten), vrouwen en mannen, mannen met baard apart.
- **Hoe:**
  1. Elke persoon maakt 3 selfies (raam, lamp, avond), met en zonder kaart, in `/lab`.
  2. Twee consultants doen ieder **los** een analyse met doeken. Ze zien onze uitslag niet.
- **Hoeveel mensen nodig zijn** (de 95%-ondergrens moet ≥ 80% zijn):

| Gemeten nauwkeurigheid | Minimaal aantal mensen |
|---|---|
| 95% | 25 |
| 92% | 40 |
| 90% | 54 |
| 88% | 87 |
| 85% | 230 |

  Met 60 mensen kunnen we dus 80% aantonen als we ±90% meten op het gekozen niveau.
- **Gratis extra toets:** de openbare Deep Armocromia-dataset (eerst de licentie checken voor gebruik buiten onderzoek).

## 5. Wat dit kost en wat ik van de oprichter nodig heb

- **Experts.** Twee consultants voor 60 mensen. De prijs van een analyse bij Art of Image staat niet online. Opties:
  - een samenwerking: consultants krijgen zichtbaarheid en doorverwijzingen in de app (bijvoorbeeld "laat je kleuren checken met doeken");
  - een testdag met 20–30 mensen per consultant.

  Dit is een afspraak met een externe partij, dus het besluit ligt bij de oprichter.
- **Testpersonen.** Toestemmingsformulier (18+), werving via het eigen netwerk. Kosten €0, eventueel een kleine bedankkaart.
- **Tijd.** ±2 testdagen plus 1 dag analyse.
