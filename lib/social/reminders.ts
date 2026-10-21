// One-off reminders to the founder, sent by the hourly social run (no extra service, survives any
// chat session). Each key is stored in social_posts once sent, so it never goes out twice.
export type Reminder = { key: string; at: Date; subject: string; text: string };

export const REMINDERS: Reminder[] = [
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
