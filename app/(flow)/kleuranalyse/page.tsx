import Link from "next/link";
import { euro, PRICES } from "@/lib/flow/pricing";
import { AppBar, Footer } from "../ui";

// Long-form explainer for search (founder, 18 Oct 2026): what colour analysis is, the problem it
// solves and how ours works. Brand-neutral (both doors), plain Dutch, no unmeasured numbers,
// no famous faces (CLAUDE.md §2, §9).

const URL = "https://www.kulort-nyanse.com/kleuranalyse";
const TITLE = "Kleuranalyse online: ontdek welke kleuren jou staan";
const DESCRIPTION =
  "Wat is kleuranalyse, welk kleurtype ben jij en hoe stop je met kleding kopen die je nooit draagt? Uitleg over ondertoon, diepte, helderheid en de 12 seizoenen, plus een gratis kleurcheck met één selfie. Voor mannen en vrouwen.";

export const metadata = {
  title: `${TITLE} · KULØRT · NYANSE`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "article", images: ["/brand/outfits/softAutumn-both.jpg"] },
};

const FAQ: [string, string][] = [
  ["Wat is een kleuranalyse?", "Bij een kleuranalyse bepaal je welke kleuren passen bij de natuurlijke kleuren van je huid, haar en ogen. Kleuren die passen laten je gezicht rustig en helder ogen; kleuren die niet passen trekken de aandacht weg van je gezicht."],
  ["Welk kleurtype ben ik?", "Dat hangt af van drie dingen: je ondertoon (koel of warm), je diepte (licht of donker) en je helderheid (zacht of helder). De combinatie bepaalt je seizoen, bijvoorbeeld Soft Summer of Deep Autumn. Met de gratis kleurcheck zie je het in een paar minuten."],
  ["Hoe weet ik of ik een warme of koele ondertoon heb?", "Kijk bij daglicht: staat zilver je beter dan goud, en ijswit beter dan crème, dan is je ondertoon meestal koel. Is het andersom, dan is hij meestal warm. Je ondertoon verandert niet als je bruint. Onze check meet het op je eigen foto."],
  ["Wat zijn de 12 seizoenen?", "De vier seizoenen (Lente, Zomer, Herfst, Winter) zijn elk in drie typen verdeeld, bijvoorbeeld Light Spring, Warm Spring en Bright Spring. Zo kom je op 12 kleurtypen. Wij tonen ook waar je precies zit op de drie schalen, want veel mensen zitten tussen twee typen in."],
  ["Is kleuranalyse ook iets voor mannen?", "Ja. Voor mannen gaat het vooral om de basis die je elke dag draagt: overhemd, trui, colbert, en de kleur van je horloge, riem en schoenen. KULØRT is daarom speciaal voor mannen; NYANSE voor vrouwen."],
  ["Hoe betrouwbaar is een kleuranalyse met een selfie?", "Licht en camera beïnvloeden kleur. Daarom geven we tips voor de foto (daglicht, geen filter, geen make-up) en vragen we om een nieuwe selfie als de foto niet goed genoeg is. Twijfel je, dan kun je ook je eigen kleurtype kiezen of persoonlijk kleuradvies kiezen: een kleurconsulent bekijkt dan je foto's."],
  ["Wat kost het?", `Je kleurprofiel is gratis. Je persoonlijke stijlgids kost ${euro(PRICES.digital)}, met een fysieke kleurenpas ${euro(PRICES.card)}, en persoonlijk kleuradvies van een kleurconsulent (op video, zonder afspraak) ${euro(PRICES.session)}.`],
  ["Wat gebeurt er met mijn foto?", "De analyse gebeurt op je eigen telefoon. Je foto wordt niet naar ons gestuurd en nergens bewaard. Meer in onze privacyverklaring."],
];

const ldArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  url: URL,
  inLanguage: "nl-NL",
  image: "https://www.kulort-nyanse.com/brand/outfits/softAutumn-both.jpg",
  publisher: { "@type": "Organization", name: "KULØRT · NYANSE", url: "https://www.kulort-nyanse.com" },
  dateModified: "2026-10-18",
};
const ldFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

function Fig({ src, alt, caption, wide }: { src: string; alt: string; caption?: string; wide?: boolean }) {
  return (
    <figure className={`seo-fig${wide ? " wide" : ""}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Cta() {
  return (
    <div className="seo-cta">
      <p>Ontdek je eigen kleuren. Gratis, met één selfie.</p>
      <div className="seo-cta-doors">
        <Link className="btn" href="/kulort">Voor hem · KULØRT</Link>
        <Link className="btn btn-ghost" href="/nyanse">Voor haar · NYANSE</Link>
      </div>
    </div>
  );
}

export default function ColourAnalysis() {
  return (
    <main className="screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />
      <AppBar pill="Kleuranalyse" />
      <article className="pad seo">
        <p className="eyebrow">Kleuranalyse, uitgelegd</p>
        <h1 className="disp">Een kast vol kleren, <em>en toch niks om aan te trekken?</em></h1>
        <p className="seo-lede">
          Bijna iedereen heeft het: dat overhemd dat in de winkel perfect leek, die trui in de mooiste kleur van het rek. Thuis voor de
          spiegel klopt het ineens niet meer. Het ligt meestal niet aan het model of aan jou. Het ligt aan de kleur. Een kleuranalyse laat
          zien welke kleuren bij jou horen, zodat je minder twijfelt, minder miskoopt en alles in je kast met elkaar combineert.
        </p>
        <Fig src="/brand/ads/proof-men.jpg" alt="Hetzelfde gezicht met een grijsblauwe en een warme oranje doek onder de kin" caption="Zelfde gezicht, ander doek. Alleen de kleur onder de kin verschilt." wide />

        <nav className="seo-toc" aria-label="Inhoud">
          <b>In dit artikel</b>
          <ol>
            <li><a href="#probleem">Het probleem: kopen wat je nooit draagt</a></li>
            <li><a href="#wat">Wat is kleuranalyse?</a></li>
            <li><a href="#schalen">De drie schalen: ondertoon, diepte, helderheid</a></li>
            <li><a href="#seizoenen">De 4 seizoenen en 12 kleurtypen</a></li>
            <li><a href="#mannen">Kleuradvies voor mannen</a></li>
            <li><a href="#vrouwen">Kleuradvies voor vrouwen</a></li>
            <li><a href="#zo">Zo werkt onze kleurcheck</a></li>
            <li><a href="#zelf">Zelf testen: drie snelle checks</a></li>
            <li><a href="#vragen">Veelgestelde vragen</a></li>
          </ol>
        </nav>

        <h2 id="probleem">Het probleem: kopen wat je nooit draagt</h2>
        <p>
          In een winkel kijk je naar het kledingstuk. Thuis kijk je naar jezelf. Dat verschil is precies waar het misgaat. Winkellicht is
          warm en flatteus, productfoto&apos;s zijn bewerkt, en een kleur die op een hanger prachtig is, kan naast jouw huid grauw, hard of
          vlak worden. Het gevolg ken je: retourtjes, stukken met het prijskaartje er nog aan, en elke ochtend het gevoel dat je niks hebt.
        </p>
        <p>
          De oplossing is niet meer kopen, maar <b>gerichter kiezen</b>. Wie weet welke kleuren bij zijn of haar eigen kleuring passen, kan
          in een paar seconden beslissen: dit wel, dit niet. Dat scheelt twijfel in de paskamer en maakt je kast kleiner én bruikbaarder.
        </p>
        <Fig src="/brand/ads/closet-choices.jpg" alt="Iemand kiest kleding uit een rek met kleding in verschillende kleuren" caption="Minder kopen, beter kiezen: alles in je kast past bij elkaar." />

        <h2 id="wat">Wat is kleuranalyse?</h2>
        <p>
          Kleuranalyse (ook wel kleurenanalyse of kleuradvies) is een manier om te bepalen welke kleuren in harmonie zijn met de natuurlijke
          kleuren van je huid, haar en ogen. Een kleur die bij je past laat je huid egaal en je ogen helder ogen. Een kleur die niet past
          legt de nadruk op schaduwen, roodheid of vermoeidheid, en trekt de aandacht weg van je gezicht.
        </p>
        <p>
          Traditioneel gebeurt dit met gekleurde doeken onder je kin, bij daglicht, bij een kleurconsulent. Dat werkt nog steeds goed, maar
          het kost tijd en geld. Daarom kun je bij ons eerst gratis online je kleurprofiel bepalen, en daarna kiezen voor een stijlgids, een
          kleurenpas of persoonlijk kleuradvies.
        </p>

        <h2 id="schalen">De drie schalen: ondertoon, diepte en helderheid</h2>
        <p>Je kleurtype is geen hokje, maar een plek op drie schalen. Samen bepalen ze welke kleuren jou het best staan.</p>
        <div className="seo-cards">
          <div><b>Ondertoon</b><p>Koel (roze en blauw onder de huid) of warm (goud en perzik). Koel staat het best bij zilver, ijswit en blauwrood; warm bij goud, crème en tomaatrood. Je ondertoon verandert niet als je bruint.</p></div>
          <div><b>Diepte</b><p>Hoe licht of donker je haar, ogen en huid samen zijn. Licht: lichte en middentinten. Diep: donkere, rijke kleuren; pastel valt dan weg.</p></div>
          <div><b>Helderheid</b><p>Hoe helder je ogen en het contrast in je gezicht zijn. Helder: zuivere, felle kleuren en contrast. Zacht: gedempte, iets grijzige tinten die rustig ogen.</p></div>
        </div>
        <p>
          Omdat het schalen zijn, zie je ook als je tussen twee typen in zit. Dan mengt je palet beide. Dat voorkomt de bekende frustratie
          van drie verschillende uitslagen bij drie verschillende tests.
        </p>

        <h2 id="seizoenen">De 4 seizoenen en 12 kleurtypen</h2>
        <p>
          De bekendste manier om kleurtypen te beschrijven is met seizoenen. Elk seizoen heeft drie varianten, zodat er twaalf kleurtypen
          zijn. Je hoeft ze niet uit je hoofd te kennen; het helpt wel om te begrijpen waarom bepaalde kleuren bij je passen.
        </p>
        <div className="seo-grid">
          <Fig src="/brand/seasons/family-lente.jpg" alt="Lichte, warme en heldere kleuren van het seizoen Lente" caption="Lente: licht, warm en fris. Perzik, koraal, lichtgoud, frisgroen. Light, Warm en Bright Spring." />
          <Fig src="/brand/seasons/family-zomer.jpg" alt="Zachte, koele kleuren van het seizoen Zomer" caption="Zomer: koel en zacht. Poederblauw, rozenhout, salie, zacht marine. Light, Cool en Soft Summer." />
          <Fig src="/brand/seasons/family-herfst.jpg" alt="Warme, aardse kleuren van het seizoen Herfst" caption="Herfst: warm en aards. Olijf, camel, roest, petrol. Soft, Warm en Deep Autumn." />
          <Fig src="/brand/seasons/family-winter.jpg" alt="Koele, diepe en heldere kleuren van het seizoen Winter" caption="Winter: koel en contrastrijk. Navy, smaragd, robijn, zuiver wit. Deep, Cool en Bright Winter." />
        </div>

        <Cta />

        <h2 id="mannen">Kleuradvies voor mannen</h2>
        <p>
          Voor mannen draait kleur vooral om de stukken die je het vaakst draagt: je overhemden, truien en je colbert. Dicht bij je gezicht
          maakt de juiste kleur het verschil tussen fris en vermoeid, en tussen een sterke eerste indruk en een vlakke. De rest van je
          outfit (broek, schoenen, riem) mag rustiger zijn, als het maar bij elkaar past.
        </p>
        <ul>
          <li><b>Je basis</b>: navy, antraciet, espresso of olijf, afhankelijk van je type. Daar bouw je alles op.</li>
          <li><b>Je wit</b>: helder wit staat niet iedereen. Veel mannen ogen frisser in gebroken wit of crème.</li>
          <li><b>Je leer en metaal</b>: zilver of goud voor je horloge, en één leerkleur voor riem en schoenen.</li>
        </ul>
        <Fig src="/brand/outfits/deepWinter-kulort.jpg" alt="Herenoutfit in de kleuren van Deep Winter: navy colbert en donkergroene coltrui" caption="Een Deep Winter-outfit: navy, diepgroen en zwart leer." />
        <p>
          <Link href="/kulort">KULØRT</Link> is ons merk voor mannen: kort, praktisch en gericht op wat je elke dag draagt.
        </p>

        <h2 id="vrouwen">Kleuradvies voor vrouwen</h2>
        <p>
          Voor vrouwen speelt kleur op meer plekken: kleding, maar ook sieraden, make-up, haarkleur en accessoires. Een palet geeft rust: je
          lippenstift, je sjaal en je blazer versterken elkaar in plaats van te botsen. En je ziet sneller welke stukken je kunt laten hangen.
        </p>
        <ul>
          <li><b>Je kleuren bij je gezicht</b>: blouse, top, sjaal. Hier zit het grootste effect.</li>
          <li><b>Make-up en sieraden</b>: lippen, blush en oogschaduw in tinten die bij je ondertoon passen; goud, zilver of roségoud.</li>
          <li><b>Je kast</b>: wat niet past, kan vaak nog onder je middel: als broek, rok of schoenen.</li>
        </ul>
        <Fig src="/brand/outfits/softAutumn-nyanse.jpg" alt="Damesoutfit in de kleuren van Soft Autumn: camel, olijf en zacht koraal" caption="Een Soft Autumn-outfit: zachte, warme kleuren die rustig samengaan." />
        <p>
          <Link href="/nyanse">NYANSE</Link> is ons merk voor vrouwen, met kleuradvies voor kleding, sieraden en make-up.
        </p>

        <h2 id="zo">Zo werkt onze kleurcheck</h2>
        <ol className="seo-steps">
          <li><b>Kies waar je er goed uit wilt zien</b>: werk, weekend, date of feest.</li>
          <li><b>Maak een selfie bij daglicht</b>: zonder filter en zonder make-up. De analyse gebeurt op je eigen telefoon; je foto wordt nergens bewaard.</li>
          <li><b>Zie je kleurprofiel</b>: je plek op de drie schalen, je kleurtype en je beste kleuren. Gratis.</li>
          <li><b>Kies je stijlgids</b>: al je 30 kleuren, combinaties per gelegenheid, je basis (wit, donker, denim), je eerste vijf aankopen, een kast-check en de kleuren voor horloge, sieraden en make-up.</li>
        </ol>
        <div className="seo-grid two">
          <Fig src="/brand/ads/workbook.jpg" alt="De persoonlijke stijlgids met kleuren en outfits" caption="Je persoonlijke stijlgids, online en op elk apparaat." />
          <Fig src="/brand/product/pass-front.jpg" alt="De kleurenpas in creditcardformaat met acht kleuren" caption="De kleurenpas: je kleuren in je portemonnee, voor in de winkel." />
        </div>
        <p>
          Liever zeker? Kies persoonlijk kleuradvies: een kleurconsulent bekijkt jouw foto&apos;s en stuurt je een persoonlijke video, zonder
          afspraak en binnen 3 werkdagen. Handig als je twijfelt tussen twee typen.
        </p>

        <h2 id="zelf">Zelf testen: drie snelle checks</h2>
        <p>Geen tijd voor een check? Met deze drie vragen kom je al een eind. Doe ze bij daglicht, zonder make-up.</p>
        <ul>
          <li><b>Goud of zilver?</b> Houd een gouden en een zilveren sieraad naast je gezicht. Welke laat je huid egaler ogen? Goud wijst op warm, zilver op koel.</li>
          <li><b>Wit of crème?</b> Houd een spierwit en een crèmekleurig stuk onder je kin. Oogt crème zachter en frisser, dan ben je waarschijnlijk warm of zacht.</li>
          <li><b>Zwart of navy?</b> Maakt zwart je gezicht hard en vermoeid, en oogt navy of donkerbruin rustiger? Dan is je contrast waarschijnlijk niet hoog genoeg voor zwart.</li>
        </ul>
        <p>Deze checks geven een richting, geen uitslag. De kleurcheck combineert ze met je diepte en helderheid tot één profiel.</p>

        <h2 id="vragen">Veelgestelde vragen</h2>
        <div className="seo-faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>

        <Cta />
      </article>
      <Footer />
    </main>
  );
}
