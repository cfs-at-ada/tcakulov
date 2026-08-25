# KONZEPT — Neubau germantcakulov.com

Arbeitsdokument. Grundlage sind die vier Analysedokumente in `../_analyse/`.
Stand: 2026-08-25 · Phase: Konzeption

---

## 1. Ziel und Leitplanken

### Was gebaut wird

**Ein 1:1-Nachbau der bestehenden Website** — gleiche Seiten, gleiche Inhalte, gleiche
Bildsprache, gleiche Farben, gleiche Typografie. Kein Redesign. Wer die alte und die neue
Seite nebeneinander legt, soll dieselbe Website sehen.

### Was dabei anders wird

| | |
|---|---|
| **Performance** | Bilder in modernen Formaten und passenden Größen, kein jQuery, keine Icon-Fonts, kein ungenutztes CSS |
| **SEO** | Eigene Titel und Beschreibungen, korrekte Sprachauszeichnung, `hreflang`, Sitemap, strukturierte Daten für Konzerttermine, Social-Vorschaubilder |
| **Datenschutz** | Beim Seitenaufruf **null** Verbindungen zu Dritten. YouTube und Spotify laden erst auf Klick. |
| **Code** | Keine Inline-Styles, kein `!important`, kein kopierter Code. Ein Design-System aus benannten Werten. |
| **Responsiv** | Fließende Typografie und Container-Queries statt 17 handjustierter Breakpoints |
| **Pressebereich** | Auf allen Geräten vollständig nutzbar, ohne ZIP-Zwang, mit Sammel-Download |

### Eine wichtige Einordnung vorweg

„Wie sie ist" ist mehrdeutig: Die Seite **rendert heute** in der Systemschrift (Helvetica bzw.
Arial), weil die `@font-face`-Pfade ins Leere zeigen. Gemeint war immer **Source Sans 3**.

Der Nachbau setzt die Schrift ein, die immer gemeint war. Das ist die sichtbarste
Veränderung — und sie ist eine Korrektur, keine Neugestaltung. Alles andere (Farben,
Größenverhältnisse, Abstände, Anordnung) bleibt.

### Nicht in diesem Schritt

- Keine Oberfläche zum Eintragen von Terminen (kommt danach — die Architektur ist dafür
  vorbereitet, siehe Abschnitt 18)
- Keine neuen Inhalte, keine neuen Seiten, keine neuen Funktionen
- Keine Umgestaltung von Layout oder Bildsprache

---

## 2. Ist → Soll in Zahlen

| | heute | Ziel | Faktor |
|---|---|---|---|
| JavaScript ausgeliefert | 111 KB | **< 4 KB** | −96 % |
| CSS ausgeliefert | 114 KB (75 % ungenutzt) | **~12 KB** | −89 % |
| Schriftdateien geladen | 0 von 3,4 MB (defekt) | **~45 KB** (1 variable Schrift, subsettet) | funktioniert |
| Icon-Schriften | 2,8 MB für 3 Symbole | **~2 KB** (Inline-SVG) | −99,9 % |
| Bilder gesamt | 11,99 MB | **~800 KB** | −93 % |
| `Media.html` Ladegewicht | 17,32 MB | **~600 KB** vor Embed-Klick | −97 % |
| `Presse.html` Ladegewicht | 5,92 MB | **~250 KB** | −96 % |
| Fremd-Hosts beim Seitenaufruf | 13 (auf Media) | **0** | — |
| 404-Fehler pro Seitenaufruf | 4–6 | **0** | — |
| Inline-`style`-Attribute | ~730 | **0** | — |
| `!important` | ~292 | **0** | — |
| Breakpoints | 17 (3 Off-by-one-Paare) | **2** + Container-Queries | — |
| Verschiedene Margin-Werte | 56 | **9 benannte Stufen** | — |
| Verschiedene Schriftgrößen | 14 | **6 benannte Stufen** | — |
| Kopien von Navigation/Footer | je 14 | **je 1 Komponente** | — |
| Dateien für einen neuen Termin | 4–6 | **1** | — |
| Wiederholungen desselben Datums | 8× | **1×** | — |
| `<h1>` pro Seite | 0 | **1** | — |
| Eigene `<title>` | 1 für 14 Seiten | **14** | — |

---

## 3. Technische Grundentscheidung

### Empfehlung: Astro (Static Site Generator)

**Astro** erzeugt aus Komponenten und Inhaltsdateien reine statische HTML-Dateien. Das
Ergebnis ist genau das, was heute schon da ist — HTML, CSS und ein wenig JS — nur ohne die
Wiederholungen und mit einem Build-Schritt davor.

**Warum genau Astro für dieses Projekt:**

| Anforderung | Wie Astro sie löst |
|---|---|
| Nav/Footer nur einmal schreiben | Komponenten (`.astro`-Dateien), zur Build-Zeit eingesetzt |
| Kein JavaScript-Ballast | Astro liefert **standardmäßig 0 KB JavaScript** aus. JS gibt es nur da, wo man es ausdrücklich anfordert. |
| Bildoptimierung | `astro:assets` erzeugt automatisch AVIF/WebP in mehreren Größen mit `srcset`, `width`/`height` und Lazy-Loading — genau unser 11,99-MB-Problem |
| Termine als Daten | Content Collections mit Zod-Schema: **die Termine werden beim Build validiert**. Ein Tippfehler im Datum bricht den Build, statt still auf der Seite zu landen. |
| DE/EN | Eingebautes i18n-Routing mit `hreflang` |
| Später eine Eingabeoberfläche | Content Collections sind Dateien. Jede Git-basierte Oberfläche kann sie schreiben. |
| „Da war ein Profi am Werk" | TypeScript strict, klare Ordnerstruktur, alles typisiert, `astro check` in der CI |
| Hosting | Ausgabe ist ein Ordner mit statischen Dateien — läuft auf Netlify, Cloudflare Pages, GitHub Pages **oder jedem klassischen Webspace per FTP** |

**Kosten:** Node.js muss installiert sein, und vor dem Hochladen läuft ein Befehl
(`npm run build`). Das ist der einzige Preis.

### Die Alternative, ehrlich benannt

**Eleventy (11ty)** wäre die schlankere Wahl: weniger Abhängigkeiten, weniger Magie. Es kann
alles, was wir brauchen — aber Bildoptimierung, i18n und Typsicherheit muss man dort selbst
zusammensetzen. Für dieses Projekt, in dem die Bildoptimierung 93 % der Ersparnis ausmacht
und die Terminverwaltung der Kern ist, überwiegt Astros fertige Lösung.

**Reines HTML/CSS/JS ohne Build** ist keine Option: Es bringt die 14 Kopien von Navigation
und Footer sofort zurück, und die Bilder müssten von Hand in fünf Größen exportiert werden.

### Was ausdrücklich **nicht** eingesetzt wird

- Kein React, Vue, Svelte — es gibt nichts, was eine UI-Bibliothek rechtfertigt
- Kein Tailwind — bei fünf Farben und neun Abstandsstufen wäre das ein Rückschritt zu
  Klassen-Ketten im Markup; wir wollen ja genau weg von Styling im HTML
- Kein CSS-Framework, kein Bootstrap, kein Grid-System
- Kein jQuery
- Kein Icon-Font
- Kein Cookie-Banner (weil es nichts zu bannern gibt)

---

## 4. Projektstruktur

```
germantcakulov/
├─ src/
│  ├─ content/
│  │  ├─ config.ts                 # Zod-Schemas für alle Inhaltstypen
│  │  ├─ termine/                  # 1 Datei = 1 Termin
│  │  │  ├─ 2026-07-20-salzburg-mozarteum.yml
│  │  │  ├─ 2026-09-27-prussia-cove.yml
│  │  │  ├─ 2026-10-16-wien-bechstein.yml
│  │  │  ├─ 2026-10-19-gyor-sze.yml
│  │  │  └─ 2026-12-11-graz-kug.yml
│  │  ├─ vita/
│  │  │  ├─ kurz.de.md    kurz.en.md
│  │  │  └─ portrait.de.md  portrait.en.md
│  │  ├─ presse/
│  │  │  └─ fotos.yml              # Metadaten der Pressefotos
│  │  └─ recht/
│  │     ├─ impressum.de.md   impressum.en.md
│  │     └─ datenschutz.de.md datenschutz.en.md
│  │
│  ├─ components/
│  │  ├─ layout/    SiteHeader · SiteNav · MobileNav · SiteFooter · SkipLink
│  │  ├─ hero/      Hero · HeroName
│  │  ├─ termine/   TerminListe · TerminKarte · NaechsterTermin
│  │  ├─ media/     Galerie · Lightbox · VideoFacade · SpotifyFacade
│  │  ├─ presse/    FotoKachel · DownloadZeile · BioDownloads
│  │  └─ ui/        Trennlinie · AusklappText · ExternerLink · Icon
│  │
│  ├─ layouts/
│  │  ├─ BasisLayout.astro         # <head>, Meta, Skip-Link, Header, Footer
│  │  ├─ HeroSeite.astro           # Seitentyp A (mit Bild)
│  │  └─ TextSeite.astro           # Seitentyp B (ohne Bild)
│  │
│  ├─ pages/
│  │  ├─ index.astro               termine.astro    lehre.astro
│  │  ├─ media.astro               presse.astro     kontakt.astro
│  │  ├─ impressum.astro           datenschutz.astro
│  │  └─ en/  … dieselben Seiten, englische Slugs
│  │
│  ├─ styles/
│  │  ├─ tokens.css                # Farben, Größen, Abstände — die einzige Quelle
│  │  ├─ reset.css                 # moderner Reset
│  │  ├─ base.css                  # Grundtypografie, Fokus, Auswahl
│  │  └─ layout.css                # Layout-Primitive (Content-Grid, Cluster, Stack)
│  │
│  ├─ i18n/
│  │  ├─ de.ts  en.ts              # alle UI-Texte („Mehr anzeigen", „Download" …)
│  │  └─ routes.ts                 # Slug-Zuordnung DE ↔ EN
│  │
│  ├─ lib/
│  │  ├─ termine.ts                # sortieren, filtern, formatieren
│  │  ├─ seo.ts                    # Meta-Tags, JSON-LD
│  │  └─ format.ts                 # Intl-Datumsformatierung
│  │
│  └─ assets/images/               # Quellbilder, werden vom Build optimiert
│
├─ public/                         # wird 1:1 kopiert
│  ├─ presse/                      # Pressefotos in Originalauflösung
│  ├─ downloads/                   # Biografien PDF + DOCX
│  ├─ fonts/                       # Source Sans 3, subsettet
│  ├─ favicon.svg · apple-touch-icon.png · site.webmanifest
│  ├─ robots.txt
│  ├─ _headers                     # Security-Header
│  └─ _redirects                   # alte .html-URLs → neue Pfade
│
├─ scripts/
│  ├─ subset-fonts.mjs             # Schrift auf latin+latin-ext reduzieren
│  ├─ build-presse-paket.mjs       # Sammel-ZIP erzeugen
│  └─ video-thumbnails.mjs         # YouTube-Vorschaubilder einmalig lokal ablegen
│
├─ astro.config.mjs · tsconfig.json · biome.json · .editorconfig
├─ .github/workflows/ci.yml
└─ README.md                       # „So trägst du einen Termin ein" in 4 Zeilen
```

---

## 5. Inhaltsarchitektur

### 5.1 Termine — das Herzstück

**Heute:** ein Termin steht in bis zu 6 Dateien, das Datum wird 8× getippt, die URL 6×, die
Farbe 6× — und beim Einfügen in der Mitte muss die Hell/Dunkel-Reihenfolge aller
nachfolgenden Einträge von Hand umgestellt werden.

**Künftig:** eine Datei pro Termin.

```yaml
# src/content/termine/2026-10-16-wien-bechstein.yml
start: 2026-10-16
ende: null                    # nur bei Zeiträumen
typ: konzert                  # konzert | meisterkurs
ort:
  de: "Österreich, Wien"
  en: "Austria, Vienna"
titel:
  de: "Konzert im Bechstein Centrum Wien"
  en: "Concert at Bechstein Centrum Vienna"
mitwirkende: "Elena Nemtsova"
url:
  de: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/"
  en: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/"
```

Das getrennte `url` pro Sprache löst einen konkreten Fehler von heute: Die englische
Termine-Seite verlinkt beim Mozarteum auf die **deutsche** Kursseite, während die englische
Lehre-Seite korrekt auf `moz.ac.at/en/…` zeigt.

**Was daraus automatisch entsteht:**

| Ableitung | statt heute |
|---|---|
| Sortierung nach Datum | Reihenfolge von Hand |
| Vergangene Termine ausblenden | von Hand löschen |
| Abwechselnde Farben über `:nth-child(odd)` | 6 Farbwerte pro Eintrag inline |
| „Nächstes Konzert" auf der Startseite | eigener, separat gepflegter Textblock |
| Meisterkurs-Liste auf `/lehre/` | eigene, abweichend formulierte Kopie |
| `16. OKT` / `16 OCT` je nach Sprache | Monatsnamen bleiben in der EN-Fassung deutsch |
| `<time datetime="2026-10-16">` | reiner Text, maschinell nicht lesbar |
| JSON-LD `MusicEvent` für Google | nichts |
| Optionaler `.ics`-Kalenderexport | nichts |

**Validierung beim Build** (Zod-Schema in `src/content/config.ts`):

```ts
const termine = defineCollection({
  type: 'data',
  schema: z.object({
    start: z.coerce.date(),
    ende:  z.coerce.date().nullable().default(null),
    typ:   z.enum(['konzert', 'meisterkurs']),
    ort:   z.object({ de: z.string().min(1), en: z.string().min(1) }),
    titel: z.object({ de: z.string().min(1), en: z.string().min(1) }),
    mitwirkende: z.string().optional(),
    url:   z.object({ de: z.string().url(), en: z.string().url() }).optional(),
  }).refine(d => !d.ende || d.ende >= d.start, 'ende muss nach start liegen'),
});
```

Ein vergessenes Feld, ein falsches Datum, eine kaputte URL — der Build bricht ab, statt dass
es online auffällt.

### 5.2 Texte

Die Vita und das Portrait wandern aus dem HTML in Markdown-Dateien. Damit verschwinden die
über 40 `<br style="display: block;">` — Absätze sind dann wieder Absätze.

**Offener Punkt:** Das englische Portrait ist heute anders gegliedert als das deutsche
(7 vs. 6 Absätze im Abschnitt „Klavier – Violine – Bratsche", 5 vs. 6 bei „Von Wladikawkas
nach St. Petersburg"). Inhaltlich vollständig, aber nicht parallel. Ich schlage vor, beim
Übertragen die Absatzgrenzen anzugleichen — der Text bleibt Wort für Wort derselbe.

### 5.3 Sprachen und URLs

Astros i18n-Routing, Deutsch als Standardsprache ohne Präfix:

| Seite | DE | EN |
|---|---|---|
| Startseite | `/` | `/en/` |
| Termine | `/termine/` | `/en/dates/` |
| Lehre | `/lehre/` | `/en/teaching/` |
| Media | `/media/` | `/en/media/` |
| Presse | `/presse/` | `/en/press/` |
| Kontakt | `/kontakt/` | `/en/contact/` |
| Impressum | `/impressum/` | `/en/legal-notice/` |
| Datenschutz | `/datenschutz/` | `/en/privacy/` |

**Zwei Änderungen gegenüber heute:**

1. **Impressum und Datenschutz werden getrennt.** Heute stehen beide auf einer Seite. Getrennt
   ist in Deutschland üblich, rechtlich sauberer und macht die Datenschutzerklärung direkt
   verlinkbar (was wir für die Klick-zum-Laden-Embeds brauchen).
2. **Der Sprachumschalter zeigt an, wohin er führt.** Heute steht auf beiden Fassungen
   `DE | EN` ohne Zustandsanzeige. Künftig ist die aktive Sprache markiert, der Link führt auf
   die **entsprechende** Seite der anderen Sprache (nicht auf die Startseite), und er trägt
   `hreflang` und `lang`.

---

## 6. Design-System

Alle Werte stammen aus den im Browser gemessenen Ist-Werten (`../_analyse/DESIGN-IST.md`).
Sie werden nicht neu erfunden, sondern nur zu einem System zusammengefasst.

### 6.1 Farben

```css
:root {
  --c-grund:     #003049;   /* Seitenhintergrund */
  --c-akzent:    #A78768;   /* Überschriften, Linien, Navigation */
  --c-akzent-2:  #E3C29E;   /* Kalender-Alternanz, mobile Navigation */
  --c-text:      #FEF1D5;   /* Fließtext */
  --c-overlay:   #1A1A1A;   /* Lightbox */
}
```

**Unverändert.** Fünf Farben, wie heute.

**Eine Regel kommt dazu, aus Kontrastgründen:**

| Farbe auf `#003049` | Kontrast | Erlaubt für |
|---|---|---|
| `#FEF1D5` | **12,3 : 1** | alles |
| `#E3C29E` | **8,3 : 1** | alles |
| `#A78768` | **4,1 : 1** | nur Text ab 24 px (bzw. 18,7 px fett) und dekorative Linien |

Heute steht der Footer-Kontaktblock — Management, Telefonnummer, E-Mail-Adresse — in
`#A78768` bei 14,4 px und `font-weight: 100`. Das liegt deutlich unter dem
WCAG-AA-Minimum von 4,5 : 1. Ausgerechnet die Kontaktdaten sind am schlechtesten lesbar.

**Lösung ohne Gestaltungsänderung:** Der Footer-Text wechselt auf `#E3C29E`. Das ist derselbe
warme Ton, nur heller — er kommt auf der Seite ohnehin schon vor (Terminkalender, mobiles
Menü) und fügt sich nahtlos ein. Die Überschriften und Linien bleiben `#A78768`.

### 6.2 Typografie

**Schrift:** Source Sans 3, wie vorgesehen. Selbst gehostet, SIL-Open-Font-Lizenz.

- **Variable Schrift**, ein Schnitt für alle Gewichte
- Auf `latin` + `latin-ext` subsettet (deckt Deutsch, Englisch und `Irène` ab)
- Nur `woff2` — jeder Browser der letzten zehn Jahre kann das
- `font-display: swap`, `<link rel="preload">` für die Grundschrift
- **Erwartete Größe: ~45 KB** statt der heutigen 3,4 MB, die gar nicht laden

**Gewichte:** Heute steht 304× `font-weight: 100`, obwohl kein Thin-Schnitt deklariert ist.
Gemeint war die leichte Optik. Umsetzung:

| Rolle | Gewicht |
|---|---|
| Fließtext | **400** (Regular) |
| Große Anzeigetexte, Hero, `<h2>` | **300** (Light) |
| Hervorhebungen, Ortsangaben im Kalender | **600** (SemiBold) |

**Warum nicht 200 für den Fließtext:** Sehr dünne Schrift auf dunklem Grund „blüht" optisch
aus — die Striche wirken noch dünner, als sie sind, und der Text wird bei kleiner Größe
schwer lesbar. Bei großen Anzeigegrößen ist der Effekt kein Problem, deshalb dort 300.
Falls du die durchgehend leichtere Optik willst: **ein Token ändern** (`--fw-text: 300`),
und die ganze Seite folgt.

**Größenskala — fließend, 6 Stufen statt 14:**

```css
--t-xs:   clamp(0.8125rem, 0.79rem + 0.11vw, 0.875rem);  /* 13 → 14 px  Footer, Bildnachweis */
--t-s:    1rem;                                          /* 16 px       Fließtext */
--t-m:    clamp(1.125rem, 1.08rem + 0.22vw, 1.25rem);    /* 18 → 20 px  h3, Navigation */
--t-l:    clamp(1.5rem, 1.3rem + 1vw, 2.125rem);         /* 24 → 34 px  h2 mobil→desktop */
--t-xl:   clamp(2rem, 1.5rem + 2.5vw, 3rem);             /* 32 → 48 px  h2 groß */
--t-hero: clamp(2.5rem, 1rem + 7vw, 5rem);               /* 40 → 80 px  Hero-Schriftzug */
```

`clamp()` skaliert stufenlos mit der Fensterbreite. **Damit entfällt der Grund für die
meisten der 17 Breakpoints**: Schrift springt nicht mehr an willkürlichen Punkten, sondern
wächst gleichmäßig — auf jedem Gerät, auch auf denen, die es 2026 noch nicht gibt.

**Zeilenhöhen — einheitenlos, damit sie sich richtig vererben:**

```css
--lh-tight:  1.1;   /* Überschriften */
--lh-snug:   1.35;  /* Anzeigetexte */
--lh-normal: 1.6;   /* Fließtext */
```

Heute erbt `<h2>` bei 48 px eine feste Zeilenhöhe von 28 px — Verhältnis **0,58**, eine
zweizeilige Überschrift würde sich selbst überlappen. Einheitenlose Werte vererben den
*Faktor*, nicht die Pixel. Das Problem verschwindet strukturell.

**Laufweite:** `letter-spacing: -0.015em` bleibt — aber auf `body`, nicht auf `*`. Der
Universalselektor traf heute auch Icons und Formularelemente.

**Weitere Übernahmen und Korrekturen:**

| | heute | neu |
|---|---|---|
| Versalien | `h1…h6 { text-transform: uppercase }` | bleibt visuell — aber der **Inhalt** steht in normaler Schreibweise, damit Screenreader ihn nicht buchstabieren |
| Blocksatz | überall, ohne Silbentrennung | ab 48 em Blocksatz **mit** `hyphens: auto` (funktioniert, weil `lang` künftig stimmt); darunter linksbündig |
| `<h1>` | existiert auf keiner Seite | genau eine pro Seite |
| Überschriftenreihenfolge | `h3` vor `h2` auf der Startseite | korrekt absteigend |

### 6.3 Abstände

Ein 4-px-Raster in `rem`, neun Stufen statt 56 zufälliger Werte:

```css
--s-1:  0.25rem;   --s-2:  0.5rem;    --s-3:  0.75rem;
--s-4:  1rem;      --s-6:  1.5rem;    --s-8:  2rem;
--s-12: 3rem;      --s-16: 4rem;      --s-24: 6rem;

--s-section: clamp(3rem, 8vw, 8rem);   /* Abstand zwischen Seitenabschnitten */
--gutter:    clamp(1rem, 4vw, 3rem);   /* Seitenrand */
```

Die sieben handjustierten `margin-top`-Werte der Footer-Trennlinie (1,9 / 2,65 / 3,15 / 3,35 /
3,75 / 3,85 / 4,65 em) werden **ein** Wert: `--s-section`. Der Grund für die Handarbeit — die
Abstände darüber waren pro Seite verschieden — entfällt, weil die Abstände künftig aus dem
System kommen.

**Keine negativen Margins als Layoutwerkzeug.** `margin-right: -3em` an `.kursname` ist heute
die Ursache dafür, dass `Lehre.html` auf einem 390-px-Display 414 px breit ist und sich
seitlich schieben lässt. Der gewünschte Effekt entsteht künftig über die Grid-Spalten.

**Keine Platzhalter-IDs.** `#platzhalter1` bis `#platzhalter21`, `#kursplatzhalter1`, `#help`,
`#ciao`, `#handle`, `#Fußzeile` (mit Umlaut) verschwinden ersatzlos. Abstände gehören zur
Komponente, nicht zu einer durchnummerierten ID.

### 6.4 Layout-Primitive

Statt eines 12-Spalten-Grids drei benannte Muster, die alles abdecken:

**Content-Grid** — das Rückgrat jeder Seite:

```css
.inhalt {
  display: grid;
  grid-template-columns:
    [voll-start] minmax(var(--gutter), 1fr)
    [text-start] min(65ch, 100% - 2 * var(--gutter))
    [text-end]   minmax(var(--gutter), 1fr)
    [voll-ende];
}
.inhalt > *          { grid-column: text; }
.inhalt > .randlos   { grid-column: voll; }   /* Hero, Galerie */
```

Text landet automatisch in einer lesbaren Spalte (max. 65 Zeichen), Bilder können randlos
über die volle Breite gehen — ohne eine einzige Media Query.

**Stack** — vertikale Abstände zwischen Geschwistern:

```css
.stack > * + * { margin-block-start: var(--stack-abstand, var(--s-6)); }
```

**Auto-Grid** — Karten und Kacheln:

```css
.auto-grid {
  display: grid;
  gap: var(--s-6);
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
}
```

Die Galerie, die Presse-Kacheln und die Downloadliste nutzen alle dasselbe Muster und passen
sich ohne Breakpoints an jede Breite an.

### 6.5 Breakpoints

**Zwei statt siebzehn:**

```css
@media (width >= 48em) { … }   /* 768 px — Tablet */
@media (width >= 64em) { … }   /* 1024 px — Desktop */
```

Alles Weitere über **Container-Queries**: Eine Terminkarte entscheidet anhand ihrer *eigenen*
Breite, ob Datum und Titel nebeneinander oder untereinander stehen — nicht anhand der
Fensterbreite. Dadurch funktioniert dieselbe Komponente in jeder Umgebung.

```css
.termin-liste { container-type: inline-size; }

@container (width < 30em) {
  .termin-karte { grid-template-columns: 1fr; }
}
```

**Was damit gelöst ist:** Die Off-by-one-Paare (550/551, 736/737, 1080/1081), die
widersprüchlichen Überlappungen bei genau 736 px, die 18 `orientation: landscape`-Queries für
das Hero-Bild und die dritte, unabhängige Breakpoint-Definition in `main.js`.

### 6.6 Das Hero-Bild

Heute: `background-attachment: fixed` — funktioniert auf iOS nicht, weshalb `is-ipad` und
`is-mobile` per Regex aus dem `navigator.userAgent` erraten werden (mit dem inzwischen
veralteten `navigator.platform`), plus 18 Orientierungs-Queries.

Künftig: Das Bild steht in einem `position: sticky`-Container, der Inhalt scrollt darüber.
Derselbe Effekt, **ein** CSS-Regelblock, keine Browsererkennung, funktioniert überall gleich.

Höhe: `min-height: 100svh` statt `100vh`. `svh` ist die *kleine* Viewport-Höhe und
berücksichtigt die ein- und ausfahrende Adressleiste auf dem Handy — der Grund für einen
weiteren Teil der heutigen Handjustierung.

Der Schriftzug „GERMAN TCAKULOV" blendet weiterhin beim Scrollen aus — aber über einen
`IntersectionObserver` (ein Aufruf, wenn eine Marke den Bildschirm verlässt) statt über einen
ungedrosselten `scroll`-Listener, der heute bei **jedem** Scroll-Frame `hero.offsetHeight`
liest und damit ein Layout-Reflow erzwingt.

---

## 7. Komponenten

| Komponente | Ersetzt | Auf Seiten |
|---|---|---|
| `SiteHeader` + `SiteNav` | 14 Kopien der `<nav>` | alle |
| `MobileNav` | von `main.js` zur Laufzeit erzeugtes Panel | alle |
| `SiteFooter` | 14 Kopien mit 7 verschiedenen `<hr>`-Abständen | alle |
| `Hero` | 10 seiteneigene `<style>`-Blöcke mit je 4–7 Media Queries | 5 Seitentypen |
| `TerminKarte` | 2 verschiedene Markup-Varianten (Termine / Lehre) | Termine, Lehre |
| `TerminListe` | — | Termine, Lehre |
| `NaechsterTermin` | separat gepflegter Textblock auf der Startseite | Start |
| `AusklappText` | `toggleVita()`, 14× kopiert, 12× ohne Ziel | Start |
| `Galerie` + `Lightbox` | Klick-Handler auf `<div href="…">` (ungültiges HTML, nicht tastaturbedienbar) | Media |
| `VideoFacade` | direktes YouTube-`<iframe>` | Media |
| `SpotifyFacade` | abgeschnittenes Spotify-`<iframe>` + versteckte Kopie | Media |
| `FotoKachel` | Kacheln, die auf dem Handy unerreichbar sind | Presse |
| `DownloadZeile` | Icon-Links ohne zugänglichen Namen | Presse |
| `ExternerLink` | 28× wiederholte Instagram-URL, `href` auf einem `<span>` | alle |
| `Icon` | FontAwesome (2,8 MB für 3 Symbole) | alle |

**Ableitung:** Der neue Termin wird an **einer** Stelle eingetragen. `TerminListe` auf
`/termine/`, `TerminListe` gefiltert auf `/lehre/` und `NaechsterTermin` auf `/` lesen
dieselbe Quelle.

---

## 8. Bilder und Medien

### 8.1 Pipeline

Astros `<Image>`/`<Picture>` erzeugt zur Build-Zeit:

- **AVIF** und **WebP** mit JPG-Rückfall
- `srcset` in den Breiten 400 / 800 / 1200 / 1600 / 2400 px
- `width` und `height` im Markup → **kein Layoutsprung** (Cumulative Layout Shift = 0)
- `loading="lazy"` + `decoding="async"` überall außer beim Hero
- Hero: `loading="eager"` + `fetchpriority="high"` → schnellster LCP

### 8.2 Konkrete Ziele

| Bild | heute | angezeigt bei | neu |
|---|---|---|---|
| `Media.jpg` (Galerie) | 3,13 MB, 9504 px | 386 px | ~35 KB |
| `Media.jpg` (Presse-Vorschau) | 3,13 MB | **160 px** | ~12 KB |
| `Lehre.jpg` (Hero) | 3,76 MB, 6336 px | 1440 px | ~120 KB |
| `Termine.jpg` (Hero) | 1,28 MB, 9504 px | 1440 px | ~110 KB |
| `Eins`–`Sechs.jpg` | je ~520 KB | 386 px | je ~30 KB |
| **Summe `images/`** | **11,99 MB** | | **~800 KB** |

### 8.3 Ein Bild braucht neues Material

`Mozarteum.jpg` ist mit 750 × 480 px **kleiner** als der Platz, den es einnimmt (832 × 250 px)
— es wird hochskaliert und dabei unscharf, und von 480 auf 250 px Höhe gestaucht, also im
Seitenverhältnis verzerrt. **Bitte das Original heraussuchen**, mindestens 1800 px breit.
Falls es keines gibt: Wir schneiden das vorhandene korrekt zu und zeigen es kleiner an, statt
es zu strecken.

### 8.4 Alternativtexte

Neun Bilder haben heute kein `alt`, die übrigen nichtssagende (`alt="Hero Image"`). Für den
Neubau brauche ich von dir je einen kurzen Beschreibungssatz zu den sechs Galeriebildern und
zu `Mozarteum.jpg` — oder eine Freigabe, sie als rein dekorativ (`alt=""`) auszuzeichnen.

---

## 9. JavaScript

**Budget: unter 4 KB, unkomprimiert.**

| Funktion | heute | neu |
|---|---|---|
| Mobiles Menü | jQuery + `util.js` `panel()` + `navList()` (~100 KB) | `<dialog>` mit `showModal()` — nativer Fokus-Käfig, natives Esc, nativ inertes Umfeld. ~15 Zeilen. |
| Lightbox | Klick-Handler auf `<div href>` | `<dialog>` — dieselben Vorteile. Ohne JS: Der Link öffnet das Bild direkt. |
| Vita aus-/einklappen | `toggleVita()`, 26 Zeilen × 14 Dateien | `<details>` / `<summary>` — **null JavaScript**, nativ tastaturbedienbar, funktioniert auch ohne JS |
| Hero-Name ausblenden | ungedrosselter `scroll`-Listener mit Reflow pro Frame | `IntersectionObserver`, ~10 Zeilen |
| Geräteerkennung | 2 Regex-IIFEs über `navigator.userAgent`/`.platform` | **entfällt** — durch CSS gelöst |
| Lazy-Loading nachrüsten | `DOMContentLoaded`-Handler auf Media | **entfällt** — steht im Markup |
| Breakpoints registrieren | `breakpoints.min.js`, Ergebnis nie abgefragt | **entfällt** |
| Dropdown-Menüs | `jquery.dropotron.min.js`, keine Untermenüs vorhanden | **entfällt** |
| Sanftes Scrollen | `jquery.scrolly.min.js`, kein `.scrolly`-Element vorhanden | `scroll-behavior: smooth` in CSS |
| Browsererkennung | `browser.min.js`, nie aufgerufen | **entfällt** |
| Klick-zum-Laden-Embeds | — | ~25 Zeilen (neu) |

**Weiteres:** Alle Animationen respektieren `prefers-reduced-motion`. Die Vita-Animation
läuft künftig über die tatsächliche Höhe statt über `max-height: 0 → 30000px` — heute sind
die sichtbaren ~3.900 px nach 78 ms durch, die restlichen 522 ms animiert der Browser leeren
Raum, was als Sprung wahrgenommen wird.

---

## 10. Der Pressebereich

Der Bereich mit den meisten konkreten Fehlern — deshalb ein eigenes Kapitel.

### 10.1 Was heute nicht funktioniert

| Problem | Auswirkung |
|---|---|
| Die zwei „Profilvita Lang"-Kacheln (`id="ciao"`, dieselbe ID auf 6 Elementen) sind unter 800 px per `visibility: hidden` versteckt — das Element bleibt aber im Layout und steht bei 390 px Viewport auf x ≈ 750 | **Die Langfassungen der Biografie sind auf dem Handy nicht herunterladbar** |
| Sechs Bilder in Originalauflösung als 160-px-Vorschau | 5,92 MB Ladegewicht für sechs Daumennägel |
| Jedes ZIP enthält **eine** JPG-Datei; Kompression spart 0,2 % | Der Empfänger muss ohne Nutzen entpacken |
| Jedes ZIP enthält `__MACOSX/._…` | Auf Windows und Linux erscheint ein unbrauchbarer Zusatzordner |
| Kein Sammel-Download | Wer alle Bilder braucht: sechs Klicks, 53 MB einzeln |
| Download-Links bestehen nur aus einem `<i>`-Icon ohne Text und ohne `aria-label` | Für Screenreader namenlos |
| Nur `.docx` | Wer kein Word hat, muss konvertieren |
| Die Seite steht nicht in der Navigation | Erreichbar nur über einen kleinen Link auf Media und Kontakt |
| Kein Hero-Bild, anders als alle anderen Seiten | Bricht den visuellen Rhythmus |

### 10.2 Wie er wird

**Struktur**

```
/presse/
├─ Kurzinfo + Nutzungsbedingungen (© Irène Zandel)
├─ ▸ Ein Klick: komplettes Pressepaket (ZIP, ~54 MB)
├─ Biografien
│    Deutsch  · kurz [PDF] [DOCX]   · lang [PDF] [DOCX]
│    English  · short [PDF] [DOCX]  · long [PDF] [DOCX]
└─ Pressefotos — responsives Raster, 6 Kacheln
     je Kachel: Vorschau (320 px WebP, ~20 KB)
                Bildnachweis © Irène Zandel
                [Web 1600 px · JPG · 380 KB]
                [Druck 9504 × 6336 · JPG · 9,5 MB]
```

**Die einzelnen Entscheidungen**

| Entscheidung | Begründung |
|---|---|
| **ZIPs entfallen, JPGs direkt verlinkt** | Ein Archiv um eine einzelne, bereits komprimierte Datei bringt 0,2 % und kostet einen Arbeitsschritt |
| **Zwei Größen pro Foto** | Redaktionen brauchen Druckauflösung, Websites und Social Media nicht. Wer 9,5 MB braucht, bekommt sie; wer 380 KB reichen, lädt 380 KB. |
| **Dateigröße und Auflösung stehen am Link** | Niemand startet einen 9,5-MB-Download blind |
| **Dateinamen ASCII** (`TCAKULOV-01_(c)_Irene-Zandel.jpg`) | Das `©`-Zeichen ist bereits in den ZIP-Verzeichnissen fehlerhaft kodiert (`©IreÌ€neZandel`) und macht in Redaktionssystemen und E-Mail-Anhängen Probleme |
| **Voller Nachweis in IPTC/XMP-Metadaten** | Dort gehört ein Bildnachweis hin — er überlebt jedes Umbenennen und wird von Bildredaktionssystemen automatisch ausgelesen. Sichtbar bleibt er zusätzlich auf der Seite. |
| **Sammel-ZIP zur Build-Zeit erzeugt** (`scripts/build-presse-paket.mjs`, `zip -X`) | Kann nie von den Einzeldateien abweichen, und `-X` unterdrückt den macOS-Müll |
| **Biografien als PDF und DOCX** | PDF zum Lesen und Weiterleiten, DOCX zum Kürzen und Einbauen |
| **Jeder Download ein echter Textlink** mit Typ, Größe und `download`-Attribut | Zugänglich, und man sieht, was man bekommt |
| **Das Raster ist `auto-fit`** | Auf jeder Breite nutzbar — der Fehler mit den versteckten Kacheln kann strukturell nicht wiederkehren |

**Zwei Punkte, die du entscheiden musst:**

1. **Presse in die Navigation?** Der Bereich ist ein Service für Veranstalter und
   Redaktionen. Ihn zu verstecken hilft niemandem — er enthält nichts Vertrauliches.
   *Meine Empfehlung: aufnehmen.* Falls du ihn bewusst halb-öffentlich halten willst, bleibt
   er wie heute nur verlinkt (dann aber von jeder Seite aus dem Footer, nicht nur von zweien).
2. **Hero-Bild für Presse und Impressum?** Heute haben diese Seiten keines und wirken dadurch
   wie ein anderer Auftritt. *Meine Empfehlung: ein schmaler Kopfbereich* (etwa 40 svh statt
   100) — er stellt den Zusammenhang her, ohne den Zugriff auf die Downloads zu verzögern.

**Lagerung der 53 MB:** Die Pressefotos kommen **nicht** in die Git-Historie (siehe 15.3),
sondern in `public/presse/` eines frischen Repositorys. Falls sie häufiger wechseln, ziehen
wir sie in einen Objektspeicher (z. B. Cloudflare R2, kostenlos in dieser Größenordnung) um.

---

## 11. Datenschutz

### 11.1 Der Zustand heute

Zwölf von vierzehn Seiten laden **kein einziges Fremd-Byte** — das ist eine hervorragende
Ausgangslage und bleibt so.

Die beiden Media-Seiten brechen damit: 13 Fremd-Hosts, 10,67 MB, darunter Google, Spotify
und **`o22381.ingest.us.sentry.io`** (ein US-Telemetriedienst, den das Spotify-Embed
nachlädt). Die `preconnect`- und `prefetch`-Zeilen im `<head>` bauen diese Verbindungen sogar
**vor** dem Rendern der Seite auf, also bevor der Besucher irgendetwas tut.

Die Datenschutzerklärung erwähnt davon **nichts** — sie beschreibt ausschließlich
Server-Logdaten.

### 11.2 Klick zum Laden

Statt des `<iframe>` steht zunächst eine lokale Vorschau: das Videobild bzw. das Albumcover,
ein Abspielknopf, darunter ein Satz („Beim Abspielen wird eine Verbindung zu YouTube
hergestellt. Details in der [Datenschutzerklärung](/datenschutz/).") und ein Link auf die
Originalseite für alle, die gar keine Verbindung wollen.

Erst beim Klick wird das `<iframe>` eingefügt und startet direkt.

**Wichtig im Detail:** Die YouTube-Vorschaubilder werden **einmalig heruntergeladen und lokal
abgelegt** (`scripts/video-thumbnails.mjs`), nicht zur Laufzeit von `i.ytimg.com` geholt.
Sonst wäre die Fassade wirkungslos — der Kontakt zu Google fände weiterhin bei jedem
Seitenaufruf statt.

**Ergebnis: null Verbindungen zu Dritten auf allen 14 Seiten**, bis der Besucher aktiv klickt.
Ein Cookie-Banner ist dann nicht nur überflüssig, sondern gegenstandslos.

### 11.3 Weiteres

| Maßnahme | |
|---|---|
| `preconnect` / `prefetch` auf Fremd-Domains | entfernt (sie scheitern heute ohnehin an CORS) |
| Datenschutzerklärung | wird um einen Abschnitt zu den Embeds ergänzt, mit dem ausdrücklichen Hinweis, dass vor dem Klick **keine** Daten übertragen werden |
| Impressum | inhaltlich unverändert, nur auf eine eigene Seite gelöst |
| Cookies, `localStorage`, Analytics | keine (wie heute) |
| Schriften | selbst gehostet (wie heute vorgesehen) — kein Google Fonts |
| Sicherheits-Header (`public/_headers`) | `Content-Security-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` |

Die CSP erlaubt `frame-src` nur für `youtube-nocookie.com` und `open.spotify.com` — falls je
ein Skript oder Embed unbemerkt hinzukommt, blockiert der Browser es.

**Optional, falls du Besucherzahlen willst:** Eine cookielose, DSGVO-konforme Lösung ohne
Einwilligungspflicht (Cloudflare Web Analytics kostenlos, oder selbst gehostetes Umami).
Nicht Teil dieses Schritts, aber ohne Umbau nachrüstbar.

---

## 12. SEO

### 12.1 Pro Seite

| Element | heute | neu |
|---|---|---|
| `<title>` | 14× `German Tcakulov` | `Termine — German Tcakulov`, `Media — German Tcakulov`, … |
| `<meta name="description">` | fehlt überall | eigene, 140–160 Zeichen |
| `<html lang>` | 14× `de`, auch auf den englischen Seiten | `de` bzw. `en` |
| `<link rel="canonical">` | fehlt | pro Seite |
| `hreflang` | fehlt | `de`, `en` und `x-default` auf jeder Seite |
| Open Graph | fehlt | `og:title`, `og:description`, `og:image` (1200 × 630, pro Seite erzeugt), `og:type`, `og:locale`, `og:locale:alternate` |
| Twitter Card | fehlt | `summary_large_image` |
| Favicon | fehlt | `favicon.svg`, `apple-touch-icon.png`, `site.webmanifest` |
| `<h1>` | fehlt überall | genau eine pro Seite |
| `user-scalable=no` | auf allen 14 Seiten | entfernt |

**Konkrete Auswirkung:** Ein per WhatsApp oder Instagram-Nachricht geteilter Link zeigt heute
keine Vorschau — kein Bild, kein Titel, kein Text. Für eine Künstler-Website, die überwiegend
so weitergegeben wird, ist das der spürbarste Verlust.

### 12.2 Strukturierte Daten (JSON-LD)

| Typ | Wo | Nutzen |
|---|---|---|
| `Person` | Startseite | Name, Beruf, Bild, `sameAs` → Instagram |
| **`MusicEvent`** | jeder Termin | Google kann Konzerttermine als Veranstaltungen darstellen — mit Datum, Ort und Link |
| `WebSite` | alle | Sitelinks-Suchfeld |
| `BreadcrumbList` | Unterseiten | Pfadanzeige im Suchergebnis |

`MusicEvent` ist der Grund, warum das maschinenlesbare Datum in Abschnitt 5.1 wichtig ist:
Aus `16. OKT` als Text lässt sich das nicht erzeugen, aus `start: 2026-10-16` automatisch.

### 12.3 Sitemap und robots.txt

`@astrojs/sitemap` erzeugt `sitemap-index.xml` samt `hreflang`-Verweisen bei jedem Build —
sie kann nicht veralten. `robots.txt` verweist darauf.

### 12.4 Weiterleitungen der alten URLs

Falls die alten Adressen bereits indexiert oder verlinkt sind (Veranstalter, Programmhefte,
Social-Media-Beiträge), müssen sie dauerhaft weiterleiten. **Achtung: Groß-/Kleinschreibung
zählt** — auf Linux-Servern ist `Termine.html` nicht `termine.html`.

```
# public/_redirects
/index.html                        /                    301
/index-en.html                     /en/                 301
/Termine.html                      /termine/            301
/Termine-en.html                   /en/dates/           301
/Lehre.html                        /lehre/              301
/Lehre-en.html                     /en/teaching/        301
/Media.html                        /media/              301
/Media-en.html                     /en/media/           301
/Presse.html                       /presse/             301
/Presse-en.html                    /en/press/           301
/Kontakt.html                      /kontakt/            301
/Kontakt-en.html                   /en/contact/         301
/Impressum_Datenschutz.html        /impressum/          301
/Impressum_Datenschutz-en.html     /en/legal-notice/    301
/downloads/*                       /presse/             301
```

Auf klassischem Webspace stattdessen als `.htaccess` mit `RedirectPermanent`.

---

## 13. Barrierefreiheit

Ziel: **Lighthouse-Accessibility 100** und WCAG 2.2 Level AA.

| Punkt | heute | neu |
|---|---|---|
| Zoom | `user-scalable=no` (Verstoß gegen WCAG 1.4.4) | erlaubt |
| Landmarken | kein `<main>`, kein `<header>`, kein `role` | `<header> <nav> <main> <footer>`, Skip-Link |
| Überschriften | kein `<h1>`, `h3` vor `h2` | eine `<h1>`, korrekte Reihenfolge |
| Alternativtexte | 9 Bilder ohne `alt`, Rest nichtssagend | beschreibend oder bewusst `alt=""` |
| Download-Links | nur ein `<i>`-Icon, ohne Namen | echter Text + Dateityp + Größe |
| Lightbox | nicht tastaturbedienbar, kein Esc, kein Fokus | `<dialog>` — nativ |
| Mobiles Menü | Fokus wandert hinter das Panel | `<dialog>` mit `showModal()` |
| Farbkontrast | Footer-Kontaktdaten bei 4,1 : 1 | überall ≥ 4,5 : 1 (siehe 6.1) |
| Fokusanzeige | Browserstandard, teils unsichtbar | eigener `:focus-visible`-Ring in `--c-akzent-2` |
| Bewegung | keine Rücksicht | `prefers-reduced-motion: reduce` abgeschaltet |
| Versalien | Inhalt in Großbuchstaben geschrieben | Inhalt normal, Versalien nur per CSS |
| Blocksatz | ohne Silbentrennung, sehr große Wortlücken auf 350 px | `hyphens: auto` ab Tablet, darunter linksbündig |
| Doppelte IDs | `jumphere` (6 Dateien), `ciao` (6× je Seite), ein `<div>` mit **zwei** `id`-Attributen | eindeutig, im Build geprüft |
| Anker | „TERMINE" und „MEDIA" springen ans Seitenende | Ankersprünge treffen ihr Ziel |

---

## 14. Qualitätssicherung

Das ist der Teil, an dem ein erfahrener Entwickler erkennt, wie sorgfältig gearbeitet wurde.

| Werkzeug | Zweck |
|---|---|
| **TypeScript strict** | `astro check` im Build — kein `any`, keine unklaren Typen |
| **Zod-Schemas** | Inhalte werden beim Build validiert (siehe 5.1) |
| **Biome** | Formatierung und Linting für JS/TS in einem Werkzeug |
| **Stylelint** | CSS-Konventionen — u. a. eine Regel, die `!important` und Farb-Literale außerhalb von `tokens.css` **verbietet** |
| **`.editorconfig`** | einheitliche Zeilenenden (heute sind alle HTML-Dateien CRLF, CSS/JS LF) |
| **Conventional Commits** | lesbare Historie |

**GitHub Actions bei jedem Push:**

1. `npm ci && npm run build` — bricht bei Typ- oder Schemafehlern ab
2. **Lychee** — prüft alle internen und externen Links; die sechs Veranstalter-URLs veralten
   erfahrungsgemäß nach dem Termin
3. **Lighthouse CI mit Budget** — der Build schlägt fehl, wenn eine Grenze gerissen wird:

```json
{
  "performance": 95, "accessibility": 100, "best-practices": 100, "seo": 100,
  "resourceSizes": [
    { "resourceType": "script",   "budget": 10 },
    { "resourceType": "stylesheet","budget": 20 },
    { "resourceType": "total",    "budget": 600 }
  ],
  "timings": [{ "metric": "largest-contentful-paint", "budget": 1800 }]
}
```

**Warum das wichtig ist:** Genau so verhindert man, dass die Seite in zwei Jahren wieder da
steht, wo sie heute steht. Ein versehentlich in Originalgröße eingecheckter 3-MB-Screenshot
lässt den Build scheitern, statt still online zu gehen.

**Ein `README.md`, das eine Frage beantwortet:**

```markdown
## Einen Termin eintragen

1. Neue Datei in `src/content/termine/` anlegen: `JJJJ-MM-TT-ort-veranstalter.yml`
2. Vorlage aus `src/content/termine/_vorlage.yml` kopieren und ausfüllen
3. Committen und pushen — die Seite baut sich selbst neu

Alles andere passiert automatisch: Sortierung, Farbwechsel, „Nächstes Konzert"
auf der Startseite, die Meisterkurs-Liste auf /lehre/, beide Sprachen,
die Monatsnamen und die Google-Veranstaltungsdaten.
```

---

## 15. Deployment und Hosting

### 15.1 Empfehlung

**Cloudflare Pages** oder **Netlify**, beide kostenlos in dieser Größenordnung:

- Push nach `main` → automatischer Build und Veröffentlichung
- Vorschau-URL für jeden Branch, bevor etwas live geht
- `_redirects` und `_headers` werden nativ unterstützt
- HTTPS, HTTP/3 und globales CDN inklusive
- Rollback auf jede frühere Version mit einem Klick

### 15.2 Falls der bestehende Webspace bleiben soll

Kein Problem. `npm run build` erzeugt einen Ordner `dist/` mit reinen statischen Dateien —
per FTP oder rsync hochladen, fertig. Die Weiterleitungen kommen dann in eine `.htaccess`.
Die Vorschau-Builds und der automatische Rollback entfallen.

**Das muss ich von dir wissen:** Wo läuft die Seite heute? Im Repository steht dazu nichts —
kein `CNAME`, keine Deploy-Konfiguration, keine CI (offene Frage 8 in `SPEC.md`).

### 15.3 Das Repository

Das heutige `.git` ist **422 MB** — fast das Sechsfache des Arbeitsbaums (71,9 MB). Ursache
sind frühere, noch größere Fassungen der Pressefotos, die eingecheckt und später ersetzt
wurden (einzelne Objekte bis 33 MB, teils dieselbe Datei mehrfach durch Umbenennungen).

**Empfehlung: ein frisches Repository für den Neubau.** Das alte bleibt als Archiv liegen. Das
spart 420 MB und macht jedes Klonen und jeden Deploy schnell. Große Binärdateien kommen
künftig nicht in die Versionsverwaltung (siehe 10.2).

---

## 16. Umsetzungsplan

Jede Phase ist abgeschlossen, wenn ihr Ergebnis im Browser überprüfbar ist.

### Phase 0 — Entscheidungen · *ich brauche Antworten von dir*
- [ ] Hosting geklärt (siehe 15.2)
- [ ] Englische Slugs: übersetzt (`/en/dates/`) oder gleich (`/en/termine/`)?
- [ ] Pressebereich in die Navigation?
- [ ] Impressum und Datenschutz trennen?
- [ ] Schmaler Kopfbereich für Presse/Impressum?
- [ ] Original von `Mozarteum.jpg` in höherer Auflösung vorhanden?
- [ ] Alternativtexte für die sechs Galeriebilder
- [ ] Fließtext in 400 (empfohlen) oder 300?

### Phase 1 — Fundament
- [ ] Astro-Projekt, TypeScript strict, Biome, Stylelint, `.editorconfig`
- [ ] `tokens.css` mit allen Werten aus Abschnitt 6
- [ ] Reset, Basistypografie, Layout-Primitive
- [ ] Source Sans 3 subsetten (`scripts/subset-fonts.mjs`), Preload einrichten
- [ ] Drei Icons als Inline-SVG (Download, Word, Instagram)
- [ ] GitHub Actions: Build + Lychee + Lighthouse-Budget
- **Fertig, wenn:** eine leere Seite in korrekter Schrift und Farbe erscheint, CI grün ist

### Phase 2 — Rahmen
- [ ] `BasisLayout` mit vollständigem `<head>` (Meta, hreflang, JSON-LD-Grundgerüst)
- [ ] `SiteHeader`, `SiteNav`, `MobileNav` (`<dialog>`), `SiteFooter`, `SkipLink`
- [ ] `Hero` mit `position: sticky` und `100svh`
- [ ] i18n-Routing und Sprachumschalter mit Zustandsanzeige
- **Fertig, wenn:** Navigation und Footer auf allen Geräten funktionieren, tastaturbedienbar

### Phase 3 — Inhalte übertragen
- [ ] 5 Termine nach `src/content/termine/`
- [ ] Vita kurz und Portrait, DE und EN, nach Markdown
- [ ] Impressum und Datenschutz nach Markdown
- [ ] Presse-Metadaten nach `fotos.yml`
- [ ] Alle UI-Texte nach `i18n/de.ts` und `en.ts`
- **Fertig, wenn:** kein Fließtext mehr in einer `.astro`-Datei steht

### Phase 4 — Bildpipeline
- [ ] `astro:assets` einrichten, Ausgabegrößen festlegen
- [ ] Quellbilder auf sinnvolle Maximalauflösung reduzieren
- [ ] Alternativtexte einsetzen
- **Fertig, wenn:** die Bilder unter 800 KB liegen und kein Layoutsprung auftritt

### Phase 5 — Seiten
- [ ] `/` und `/en/` (Hero, Nächstes Konzert, Vita, `<details>`-Portrait)
- [ ] `/termine/` und `/en/dates/` (`TerminListe`)
- [ ] `/lehre/` und `/en/teaching/` (gefilterte `TerminListe`)
- [ ] `/kontakt/` und `/en/contact/`
- [ ] `/impressum/`, `/datenschutz/` und die englischen Fassungen
- **Fertig, wenn:** jede Seite auf 320 / 390 / 768 / 1024 / 1440 / 2560 px stimmt

### Phase 6 — Media
- [ ] Galerie als `auto-fit`-Raster
- [ ] Lightbox als `<dialog>`
- [ ] YouTube-Vorschaubilder lokal ablegen
- [ ] `VideoFacade` und `SpotifyFacade` (Klick zum Laden)
- **Fertig, wenn:** die Netzwerkanzeige beim Seitenaufruf **null** Fremd-Hosts zeigt

### Phase 7 — Presse
- [ ] Bilder in zwei Größen bereitstellen, ASCII-Dateinamen, IPTC-Nachweis
- [ ] Biografien als PDF und DOCX
- [ ] Sammel-ZIP-Skript
- [ ] Kacheln und Downloadzeilen mit vollständigen Beschriftungen
- **Fertig, wenn:** alle Downloads auf einem 320-px-Display erreichbar sind

### Phase 8 — SEO und Feinschliff
- [ ] Titel, Beschreibungen, Open-Graph-Bilder für alle 14 Seiten
- [ ] `MusicEvent`-JSON-LD, im Rich-Results-Test geprüft
- [ ] Sitemap, `robots.txt`, Favicon-Satz
- [ ] `_redirects` und `_headers`
- **Fertig, wenn:** Lighthouse viermal 100 zeigt und der Rich-Results-Test die Termine erkennt

### Phase 9 — Abnahme und Umschalten
- [ ] Seite-für-Seite-Vergleich alt/neu bei 1440 und 390 px
- [ ] Prüfung auf echten Geräten (iPhone, Android, iPad, Windows, Safari, Firefox)
- [ ] Test ohne JavaScript
- [ ] Screenreader-Durchgang (VoiceOver)
- [ ] Alle alten URLs leiten korrekt weiter
- [ ] DNS umstellen, alte Fassung als Archiv sichern
- **Fertig, wenn:** die neue Seite live ist und keine alte URL ins Leere führt

---

## 17. Abnahmekriterien

Messbar, nicht verhandelbar:

| | Ziel |
|---|---|
| Lighthouse Performance | ≥ 95 (mobil, gedrosselt) |
| Lighthouse Accessibility | **100** |
| Lighthouse Best Practices | **100** |
| Lighthouse SEO | **100** |
| Largest Contentful Paint | < 1,8 s (mobil, 4G) |
| Cumulative Layout Shift | < 0,01 |
| JavaScript ausgeliefert | < 10 KB |
| Schwerste Seite gesamt | < 600 KB |
| Fremd-Hosts beim Seitenaufruf | **0** |
| HTTP-Fehler | **0** |
| Inline-`style`-Attribute | **0** |
| `!important` | **0** |
| Horizontales Scrollen bei 320 px | **nirgends** |
| Funktioniert ohne JavaScript | Navigation, alle Inhalte, alle Downloads |
| W3C-HTML-Validator | fehlerfrei auf allen 14 Seiten |
| Dateien für einen neuen Termin | **1** |

---

## 18. Ausblick: die Termin-Oberfläche

Nicht Teil dieses Schritts — aber die Architektur ist darauf ausgelegt, damit später nichts
umgebaut werden muss.

Weil jeder Termin **eine Datei mit einem festen Schema** ist, genügt später eine Oberfläche,
die diese Dateien schreibt und einen Rebuild auslöst. Zwei Wege:

| Weg | |
|---|---|
| **Fertiges Git-CMS** (Sveltia CMS, Pages CMS) | Ein Formularfeld pro Schemafeld, Login über GitHub, kein eigener Server, kostenlos. Aufwand: wenige Stunden Konfiguration. |
| **Eigene kleine Oberfläche** | Volle Kontrolle über Aussehen und Ablauf, mehr Aufwand. Sinnvoll, wenn du zusätzliche Funktionen willst — etwa den `.ics`-Export oder eine Vorschau vor dem Veröffentlichen. |

In beiden Fällen bleibt das Zod-Schema die Wahrheit: Was die Oberfläche schreibt, wird beim
Build erneut geprüft. Eine kaputte Eingabe kann nicht online gehen.

---

## 19. Offene Entscheidungen

Das brauche ich von dir, bevor Phase 1 startet:

| # | Frage | Meine Empfehlung |
|---|---|---|
| 1 | Wo läuft die Seite heute (Hoster, Domain-Verwaltung)? | — |
| 2 | Cloudflare Pages / Netlify oder bestehender Webspace? | Cloudflare Pages |
| 3 | Englische URLs übersetzen (`/en/dates/`) oder deutsche Slugs behalten? | übersetzen |
| 4 | Pressebereich in die Navigation? | ja |
| 5 | Impressum und Datenschutz auf getrennte Seiten? | ja |
| 6 | Schmaler Kopfbereich für Presse und Impressum? | ja, ~40 svh |
| 7 | Fließtext in Gewicht 400 oder 300? | 400 |
| 8 | Footer-Kontaktdaten auf `#E3C29E` (Kontrast)? | ja |
| 9 | Englisches Portrait an die deutsche Absatzgliederung angleichen? | ja |
| 10 | Original von `Mozarteum.jpg` in höherer Auflösung vorhanden? | — |
| 11 | Alternativtexte für die sechs Galeriebilder | von dir |
| 12 | Zweites Spotify-Album geplant (das versteckte Embed) oder streichen? | streichen |
| 13 | Sollen die auskommentierten Vita-Bilder (Wladikawkas, St. Petersburg, Hanns Eisler, Mozarteum) zurück? | separat entscheiden |
| 14 | Frisches Repository oder Historie übernehmen? | frisch |

Antworten auf 1–8 genügen, um loszulegen. Der Rest lässt sich unterwegs klären.
