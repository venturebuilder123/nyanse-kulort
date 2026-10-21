import Link from "next/link";
import { euro, PRICES } from "@/lib/flow/pricing";
import { currentBrand } from "../brand";
import { AppBar, Footer } from "../ui";

// Long-form explainer for search (founder, 18 Oct 2026): what colour analysis is, the problem it
// solves and how ours works. Brand-neutral (both doors), plain Dutch, no unmeasured numbers,
// no famous faces (CLAUDE.md §2, §9).

const URL = "https://www.kulort-nyanse.com/kleuranalyse";
const TITLE = "Kleuranalyse online: ontdek welke kleuren jou staan";
const DESCRIPTION =
  "Wat is kleuranalyse, welk kleurtype ben jij en hoe stop je met kleding kopen die je nooit draagt? Uitleg over ondertoon, diepte, helderheid en de 12 seizoenen, plus een gratis kleurcheck met één selfie. Voor mannen en vrouwen.";

const URL_EN = "https://www.kulort-nyanse.com/en/kleuranalyse";
const TITLE_EN = "Colour analysis online: find out which colours suit you";
const DESCRIPTION_EN =
  "What is colour analysis, which colour type are you and how do you stop buying clothes you never wear? Undertone, depth, clarity and the 12 seasons explained, plus a free colour check with one selfie. For men and women.";

export async function generateMetadata() {
  const { locale } = await currentBrand();
  const en = locale === "en";
  const [title, description, url] = en ? [TITLE_EN, DESCRIPTION_EN, URL_EN] : [TITLE, DESCRIPTION, URL];
  return {
    title: `${title} · KULØRT · NYANSE`,
    description,
    alternates: { canonical: url, languages: { nl: URL, en: URL_EN, "x-default": URL } },
    openGraph: { title, description, url, type: "article", images: ["/brand/outfits/softAutumn-both.jpg"] },
  };
}

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

export default async function ColourAnalysis() {
  const { locale } = await currentBrand();
  if (locale === "en") return <ColourAnalysisEn />;
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
        <Fig src="/brand/ads/proof-men.jpg" alt="Hetzelfde gezicht met een tomaatrode en een indigo doek onder de kin" caption="Zelfde gezicht, ander doek. Alleen de kleur onder de kin verschilt." wide />

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

// ---------- English (21 Oct 2026) ----------
const FAQ_EN: [string, string][] = [
  ["What is colour analysis?", "Colour analysis finds the colours that harmonise with the natural colours of your skin, hair and eyes. Colours that suit you make your face look calm and clear; colours that don't pull attention away from your face."],
  ["Which colour type am I?", "That depends on three things: your undertone (cool or warm), your depth (light or dark) and your clarity (soft or clear). Together they set your season, for example Soft Summer or Deep Autumn. The free colour check shows you in a few minutes."],
  ["How do I know if my undertone is warm or cool?", "Look in daylight: if silver suits you better than gold, and icy white better than cream, your undertone is usually cool. The other way round, it is usually warm. Your undertone doesn't change with a tan. Our check measures it on your own photo."],
  ["What are the 12 seasons?", "The four seasons (Spring, Summer, Autumn, Winter) are each split into three types, for example Light Spring, Warm Spring and Bright Spring. That makes 12 colour types. We also show exactly where you sit on the three scales, because many people sit between two types."],
  ["Is colour analysis for men too?", "Yes. For men it's mostly about the basics you wear every day: shirt, knit, jacket, and the colour of your watch, belt and shoes. That's why KULØRT is made for men and NYANSE for women."],
  ["How reliable is colour analysis from a selfie?", "Light and cameras affect colour. That's why we give tips for the photo (daylight, no filter, no make-up), ask for a new selfie if the photo isn't good enough, and let you check our reading of your skin, eyes and hair yourself. Still unsure? Pick your own colour type, or choose personal colour advice: a colour consultant then looks at your photos."],
  ["What does it cost?", `Your colour profile is free. Your personal style guide costs ${euro(PRICES.digital, "en")}, with a physical colour card ${euro(PRICES.card, "en")}, and personal colour advice from a colour consultant (on video, no appointment) ${euro(PRICES.session, "en")}.`],
  ["What happens to my photo?", "The analysis runs on your own phone. Your photo is not sent to us and is never stored. More in our privacy statement."],
];

function CtaEn() {
  return (
    <div className="seo-cta">
      <p>Discover your own colours. Free, with one selfie.</p>
      <div className="seo-cta-doors">
        <Link className="btn" href="/kulort">For him · KULØRT</Link>
        <Link className="btn btn-ghost" href="/nyanse">For her · NYANSE</Link>
      </div>
    </div>
  );
}

function ColourAnalysisEn() {
  const article = { ...ldArticle, headline: TITLE_EN, description: DESCRIPTION_EN, url: URL_EN, inLanguage: "en", dateModified: "2026-10-21" };
  const faq = { ...ldFaq, mainEntity: FAQ_EN.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <main className="screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <AppBar pill="Colour analysis" />
      <article className="pad seo">
        <p className="eyebrow">Colour analysis, explained</p>
        <h1 className="disp">A wardrobe full of clothes, <em>and still nothing to wear?</em></h1>
        <p className="seo-lede">
          Almost everyone knows it: the shirt that looked perfect in the shop, the knit in the most beautiful colour on the rail. At home in front
          of the mirror, it suddenly doesn&apos;t work. It&apos;s usually not the cut, and it&apos;s not you. It&apos;s the colour. Colour analysis shows which
          colours belong to you, so you doubt less, buy fewer mistakes and everything in your wardrobe goes together.
        </p>
        <Fig src="/brand/ads/proof-men.jpg" alt="The same face with a tomato red and an indigo drape under the chin" caption="Same face, different drape. Only the colour under the chin changes." wide />

        <nav className="seo-toc" aria-label="Contents">
          <b>In this article</b>
          <ol>
            <li><a href="#problem">The problem: buying what you never wear</a></li>
            <li><a href="#what">What is colour analysis?</a></li>
            <li><a href="#scales">The three scales: undertone, depth, clarity</a></li>
            <li><a href="#seasons">The 4 seasons and 12 colour types</a></li>
            <li><a href="#men">Colour advice for men</a></li>
            <li><a href="#women">Colour advice for women</a></li>
            <li><a href="#how">How our colour check works</a></li>
            <li><a href="#yourself">Test yourself: three quick checks</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
          </ol>
        </nav>

        <h2 id="problem">The problem: buying what you never wear</h2>
        <p>
          In a shop you look at the garment. At home you look at yourself. That difference is exactly where it goes wrong. Shop lighting is warm and
          flattering, product photos are edited, and a colour that is gorgeous on a hanger can turn grey, harsh or flat next to your skin. You know
          the result: returns, pieces with the price tag still on, and every morning the feeling that you have nothing to wear.
        </p>
        <p>
          The answer isn&apos;t buying more, but <b>choosing better</b>. If you know which colours suit your own colouring, you can decide in seconds:
          this, not that. Less doubt in the fitting room, and a wardrobe that is smaller and more useful.
        </p>
        <Fig src="/brand/ads/closet-choices.jpg" alt="Someone choosing clothes from a rail of garments in different colours" caption="Buy less, choose better: everything in your wardrobe goes together." />

        <h2 id="what">What is colour analysis?</h2>
        <p>
          Colour analysis (also called seasonal colour analysis or colour advice) is a way to find the colours that are in harmony with the natural
          colours of your skin, hair and eyes. A colour that suits you makes your skin look even and your eyes clear. A colour that doesn&apos;t
          emphasises shadows, redness or tiredness, and pulls attention away from your face.
        </p>
        <p>
          Traditionally this is done with coloured drapes under your chin, in daylight, with a colour consultant. That still works well, but it takes
          time and money. That&apos;s why you can find your colour profile online with us first, for free, and then choose a style guide, a colour card
          or personal colour advice.
        </p>

        <h2 id="scales">The three scales: undertone, depth and clarity</h2>
        <p>Your colour type isn&apos;t a box but a point on three scales. Together they decide which colours suit you best.</p>
        <div className="seo-cards">
          <div><b>Undertone</b><p>Cool (pink and blue beneath the skin) or warm (gold and peach). Cool looks best with silver, icy white and blue-red; warm with gold, cream and tomato red. Your undertone doesn&apos;t change with a tan.</p></div>
          <div><b>Depth</b><p>How light or dark your hair, eyes and skin are together. Light: light and medium tones. Deep: dark, rich colours; pastels fade away.</p></div>
          <div><b>Clarity</b><p>How clear your eyes and the contrast in your face are. Clear: pure, bright colours and contrast. Soft: muted, slightly greyed shades that look calm.</p></div>
        </div>
        <p>
          Because they are scales, you can also see when you sit between two types. Your palette then blends both. No more three different results
          from three different tests.
        </p>

        <h2 id="seasons">The 4 seasons and 12 colour types</h2>
        <p>
          The best-known way to describe colour types is with seasons. Each season has three variants, so there are twelve colour types. You don&apos;t
          need to learn them by heart; it does help to understand why certain colours suit you.
        </p>
        <div className="seo-grid">
          <Fig src="/brand/seasons/family-lente.jpg" alt="Light, warm and clear colours of the Spring season" caption="Spring: light, warm and fresh. Peach, coral, light gold, fresh green. Light, Warm and Bright Spring." />
          <Fig src="/brand/seasons/family-zomer.jpg" alt="Soft, cool colours of the Summer season" caption="Summer: cool and soft. Powder blue, rosewood, sage, soft navy. Light, Cool and Soft Summer." />
          <Fig src="/brand/seasons/family-herfst.jpg" alt="Warm, earthy colours of the Autumn season" caption="Autumn: warm and earthy. Olive, camel, rust, teal. Soft, Warm and Deep Autumn." />
          <Fig src="/brand/seasons/family-winter.jpg" alt="Cool, deep and clear colours of the Winter season" caption="Winter: cool and high-contrast. Navy, emerald, ruby, pure white. Deep, Cool and Bright Winter." />
        </div>

        <CtaEn />

        <h2 id="men">Colour advice for men</h2>
        <p>
          For men, colour is mostly about the pieces you wear most: your shirts, knitwear and your jacket. Close to your face, the right colour makes
          the difference between fresh and tired, and between a strong first impression and a flat one. The rest of your outfit (trousers, shoes,
          belt) can be quieter, as long as it goes together.
        </p>
        <ul>
          <li><b>Your base</b>: navy, anthracite, espresso or olive, depending on your type. Everything builds on it.</li>
          <li><b>Your white</b>: pure white doesn&apos;t suit everyone. Many men look fresher in off-white or cream.</li>
          <li><b>Your leather and metal</b>: silver or gold for your watch, and one leather colour for belt and shoes.</li>
        </ul>
        <Fig src="/brand/outfits/deepWinter-kulort.jpg" alt="Men's outfit in Deep Winter colours: navy jacket and dark green roll neck" caption="A Deep Winter outfit: navy, deep green and black leather." />
        <p><Link href="/kulort">KULØRT</Link> is our brand for men: short, practical and focused on what you wear every day.</p>

        <h2 id="women">Colour advice for women</h2>
        <p>
          For women, colour plays a part in more places: clothes, but also jewellery, make-up, hair colour and accessories. A palette brings calm:
          your lipstick, your scarf and your blazer strengthen each other instead of clashing. And you see faster which pieces to leave on the rack.
        </p>
        <ul>
          <li><b>Your colours near your face</b>: blouse, top, scarf. This is where the biggest effect is.</li>
          <li><b>Make-up and jewellery</b>: lips, blush and eyeshadow in shades that match your undertone; gold, silver or rose gold.</li>
          <li><b>Your wardrobe</b>: what doesn&apos;t suit you can often still go below the waist: as trousers, a skirt or shoes.</li>
        </ul>
        <Fig src="/brand/outfits/softAutumn-nyanse.jpg" alt="Women's outfit in Soft Autumn colours: camel, olive and soft coral" caption="A Soft Autumn outfit: soft, warm colours that go together calmly." />
        <p><Link href="/nyanse">NYANSE</Link> is our brand for women, with colour advice for clothes, jewellery and make-up.</p>

        <h2 id="how">How our colour check works</h2>
        <ol className="seo-steps">
          <li><b>Choose where you want to look good</b>: work, weekend, date or party.</li>
          <li><b>Take a selfie in daylight</b>: no filter and no make-up. The analysis runs on your own phone; your photo is never stored.</li>
          <li><b>Check our reading</b>: is that your skin, eye and hair colour, or one tint lighter or darker? Your answer sharpens the result.</li>
          <li><b>See your colour profile</b>: your place on the three scales, your colour type and your best colours. Free.</li>
          <li><b>Choose your style guide</b>: all 30 of your colours, combinations per occasion, your basics (white, dark, denim), your first five buys, a wardrobe check and the colours for watch, jewellery and make-up.</li>
        </ol>
        <div className="seo-grid two">
          <Fig src="/brand/ads/workbook.jpg" alt="The personal style guide with colours and outfits" caption="Your personal style guide, online and on any device." />
          <Fig src="/brand/product/pass-front.jpg" alt="The credit-card-size colour card with eight colours" caption="The colour card: your colours in your wallet, for in the shop." />
        </div>
        <p>
          Want to be sure? Choose personal colour advice: a colour consultant looks at your photos and sends you a personal video, without an
          appointment and within 3 working days. Handy if you&apos;re torn between two types.
        </p>

        <h2 id="yourself">Test yourself: three quick checks</h2>
        <p>No time for a check? These three questions get you a long way. Do them in daylight, without make-up.</p>
        <ul>
          <li><b>Gold or silver?</b> Hold a gold and a silver piece of jewellery next to your face. Which makes your skin look more even? Gold points to warm, silver to cool.</li>
          <li><b>White or cream?</b> Hold a pure white and a cream piece under your chin. If cream looks softer and fresher, you&apos;re probably warm or soft.</li>
          <li><b>Black or navy?</b> Does black make your face look harsh and tired, while navy or dark brown looks calmer? Then your contrast is probably not high enough for black.</li>
        </ul>
        <p>These checks give a direction, not a result. The colour check combines them with your depth and clarity into one profile.</p>

        <h2 id="faq">Frequently asked questions</h2>
        <div className="seo-faq">
          {FAQ_EN.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>

        <CtaEn />
      </article>
      <Footer />
    </main>
  );
}
