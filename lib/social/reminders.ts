// One-off reminders to the founder, sent by the hourly social run (no extra service, survives any
// chat session). Each key is stored in social_posts once sent, so it never goes out twice.
export type Reminder = { key: string; at: Date; subject: string; text: string };

export const REMINDERS: Reminder[] = [
  {
    key: "reminder-boost-2026-11-02",
    // Monday 2 Nov 2026, 09:00 Amsterdam (08:00 UTC): week 2 of the growth sprint
    at: new Date("2026-11-02T08:00:00Z"),
    subject: "Herinnering: start de Instagram-boost (€5 per dag, 14 dagen)",
    text: [
      "Week 2 van de groeisprint (docs/marketing/GROEI-SPRINT.md): tijd voor de betaalde duw. Budget afgesproken: €70.",
      "",
      "1. Instagram-app → Professioneel dashboard → kies de Reel met het meeste bereik bij niet-volgers en de meeste keren doorgestuurd (Insights per Reel).",
      "2. Tik 'Promoten'. Doel: 'Meer profielbezoeken'.",
      "3. Doelgroep: zelf maken. Nederland en België, 18–44 jaar, interesses: mode, persoonlijke stijl, kleding.",
      "4. Budget: €5 per dag, 14 dagen (= €70). Alleen Instagram (niet Facebook), plaatsing Reels en Stories.",
      "5. Vink het AI-label aan (de beelden zijn met AI gemaakt).",
      "",
      "Vandaag om 12:00 start ook de giveaway (10 × de digitale gids): de boost helpt die meteen. Na 7 dagen kijken we samen naar de kosten per nieuwe volger.",
    ].join("\n"),
  },
  {
    key: "reminder-giveaway-draw-2026-11-09",
    at: new Date("2026-11-09T08:00:00Z"),
    subject: "Herinnering: trek de winnaars van de giveaway",
    text: [
      "De giveaway sloot zondag om 23:59. Vandaag trekken we de winnaars (voorwaarden: kulort-nyanse.com/winactie).",
      "",
      "1. Open /lab/giveaway en klik op 'Trek winnaars': 10 winnaars en 5 reserves, willekeurig uit alle unieke deelnemers.",
      "2. Controleer bij elke winnaar of die @kulortnyanse volgt (anders: de eerste reserve).",
      "3. Pak de 10 eenmalige codes uit GIFT_CODES (in .env en in Vercel). Elke code werkt één keer en alleen voor de digitale gids.",
      "4. Stuur elke winnaar een DM met één eigen code: gefeliciteerd, doe de gratis check op kulort-nyanse.com, kies de digitale gids en vul je code in. Geen adres nodig.",
      "5. Zet de winnaars (alleen hun naam) in een Story.",
      "Reageert iemand niet binnen 7 dagen: de prijs gaat naar de volgende reserve.",
    ].join("\n"),
  },
  {
    key: "reminder-etsy-black-friday-2026",
    // Wednesday 18 Nov 2026, 09:00 Amsterdam (08:00 UTC): two days before a discount is allowed
    at: new Date("2026-11-18T08:00:00Z"),
    subject: "Herinnering: Black Friday-korting op Etsy klaarzetten",
    text: [
      "Vanaf vrijdag 20 november mag je op Etsy een echte korting geven: je prijzen staan dan 30 dagen vast (EU-regel: een korting gaat uit van de laagste prijs van de 30 dagen ervoor).",
      "",
      "Voorstel: 20% op alles, van vrijdag 27 november (Black Friday) tot en met dinsdag 1 december (Cyber Monday + 1 dag).",
      "",
      "Zo zet je het klaar (5 minuten):",
      "1. Etsy Shop Manager → Marketing → Sales and discounts → Create a sale.",
      "2. Kies 'Percentage off', 20%, 'All listings'.",
      "3. Data: 27-11-2026 t/m 01-12-2026. Naam bijvoorbeeld BLACKFRIDAY20.",
      "4. Check eerst: heb je sinds 21 oktober een prijs verhoogd? Dan geldt voor die listing de laagste prijs van de laatste 30 dagen als 'van'-prijs; pas de korting daar niet op toe of laat het me weten.",
      "5. Voeg in de tags 'gift for her' en 'gift for him' toe waar nog ruimte is.",
      "",
      "Zeg het in Claude Code als je wilt dat ik er een Instagram-post en een mail voor maak.",
    ].join("\n"),
  },
];
