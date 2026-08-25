# HERKUNFT — Wo kommen die Inhalte her?

Systematische Untersuchung aller Datenquellen von `germantcakulov.com` (Arbeitskopie).
Grundlage: vollständige Textsuche über alle HTML-, CSS- und JS-Dateien sowie eine
Netzwerkaufzeichnung jeder Seite in Chrome (Playwright, DevTools-Protokoll).

---

## 0. Das Ergebnis in einem Satz

**Es gibt keine Datenquelle.** Jeder Inhalt der Website steht wörtlich im HTML. Es gibt keine
Datenbank, kein CMS, keine JSON-, XML- oder JS-Datendatei, keinen API-Aufruf, kein Backend.
Die einzigen zur Laufzeit von außen geladenen Inhalte sind **drei Embeds auf den Media-Seiten**
(2× YouTube, 1× Spotify). Alles andere — inklusive aller Fotos, aller Downloads und aller
Konzerttermine — liegt als statische Datei im Repository.

---

## 1. Suchergebnisse: Wonach gesucht wurde und was gefunden wurde

Gesucht in allen `*.html`, `*.js`, `*.css` (ohne `_analyse/`, ohne `jquery.min.js`):

| Gesucht | Treffer | Bewertung |
|---|---|---|
| `fetch(` | **0** | kein API-Aufruf |
| `XMLHttpRequest` | **0** | kein AJAX |
| `axios` | **0** | — |
| `$.ajax` / `$.getJSON` / `$.get(` | **0** | jQuery wird nicht für Datenabruf genutzt |
| `localStorage` / `sessionStorage` | **0** | kein Client-State |
| `document.cookie` | **0** | **die Website setzt keine eigenen Cookies** |
| `<form>` / `<input>` / `<textarea>` | **0** | **es gibt kein Kontaktformular** |
| `<embed>` / `<object>` | **0** | — |
| `<video>` / `<audio>` | **0** | keine selbst gehosteten Medien |
| `.json` / `.xml` als Dateiendung | **0** | keine lokale Datendatei |
| `data-*`-Attribute mit URL | **0** | keine URL in Datenattributen |
| `gtag` / `googletagmanager` / `ga(` | **0** | **kein Google Analytics** |
| `matomo` / `plausible` / `fathom` / `hotjar` | **0** | **kein alternatives Tracking** |
| `facebook.net` / `fbq(` / `connect.facebook` | **0** | **kein Meta-Pixel** |
| `formspree` / `netlify` / `getform` / `mailchimp` | **0** | kein Formular-Dienst |
| `<script src>` auf fremde Domain | **0** | **alle 7 Skripte liegen lokal** |
| `<iframe>` | **8** (4 pro Media-Seite, davon 1 `display:none`) | siehe Abschnitt 3 |

**Das ist ein bemerkenswert sauberer Befund:** Die Website lädt beim reinen Betrachten von
`index.html`, `Termine.html`, `Lehre.html`, `Presse.html`, `Kontakt.html` und `Impressum` **kein
einziges Byte von einem Drittanbieter**. Kein Tracker, kein Cookie-Banner nötig, kein CDN.
Nur die beiden Media-Seiten fallen aus diesem Rahmen.

---

## 2. Inhaltstyp für Inhaltstyp

Legende: **HC** = hartcodiert im HTML · **LD** = lokale Datei im Repo · **EXT** = zur Laufzeit
von extern geladen · **EMB** = Drittanbieter-Embed

| Inhaltstyp | Herkunft | Wo genau | Anbieter |
|---|---|---|---|
| **Konzerttermine** | **HC** | `Termine.html` Z. 175–240, `Termine-en.html` Z. 178–248, dazu der „Nächstes Konzert"-Block auf `index.html` Z. 174–197 und `index-en.html` | — |
| **Meisterkurstermine** | **HC** | zusätzlich `Lehre.html` Z. 198–222, `Lehre-en.html` (andere Formulierung, anderes Markup) | — |
| **Biografie kurz (Vita)** | **HC** | `index.html` Z. 205–216 im `#kurzvita-section` | — |
| **Biografie lang (Portrait)** | **HC** | `index.html` Z. 240–430 in `#vita-wrapper`, ca. 190 Zeilen Fließtext mit `<br>`-Absätzen | — |
| **Biografie als Download** | **LD** | 4 × `.docx` in `downloads/`, verlinkt von `Presse.html` | — |
| **Pressetext / Pressestimmen** | **existiert nicht als Text.** `Presse.html` ist ausschließlich ein Downloadbereich (Vita-DOCX + Bilder-ZIPs). Es gibt keine Zitate, keine Rezensionen, keine verlinkten Artikel. | | |
| **Pressefotos** | **LD** | 6 × ZIP in `downloads/`, zusammen **55,8 MB** | — |
| **Fotogalerie** | **LD** | 6 JPG in `images/`, hartcodiert in `Media.html` Z. 300–340 | — |
| **Hero-Bilder** | **LD** | 5 JPG, per CSS `background-image` in den seiteneigenen `<style>`-Blöcken | — |
| **Videos** | **EMB** | 2 × `<iframe>` auf `Media.html` / `Media-en.html` | **YouTube** (`youtube-nocookie.com`) |
| **Audio / Album** | **EMB** | 1 sichtbares + 1 verstecktes `<iframe>` pro Media-Seite | **Spotify** (`open.spotify.com`) |
| **Kontaktdaten** | **HC** | im Footer **aller 14 Seiten**: Name, Anschrift-Verweis, `+49 151 29540528`, `mailto:office@germantcakulov.com` | — |
| **Kontaktformular** | **existiert nicht.** Kontaktaufnahme nur per `mailto:`-Link und Telefonnummer im Footer. | | |
| **Social Media** | **HC** (nur Link) | `https://www.instagram.com/tcakulov/`, 28× im Projekt. **Kein Instagram-Embed, keine Feed-Einbindung** — ein normaler Textlink mit FontAwesome-Icon. | Instagram (nur verlinkt) |
| **Karte / Anfahrt** | **existiert nicht.** Kein Google Maps, kein OpenStreetMap. | | |
| **Impressum / Datenschutz** | **HC** | `Impressum_Datenschutz.html`, Standard-Textbaustein | — |
| **Zitate auf der Startseite** | **HC** | `index.html` Z. 193–195 | — |
| **Schriften** | **LD** (theoretisch) | `fonts/` — **werden aber nicht geladen**, siehe Abschnitt 6 | — |
| **Icons** | **LD** | `assets/webfonts/`, FontAwesome 5, lokal gehostet | — |
| **jQuery & Plugins** | **LD** | `assets/js/`, lokal gehostet — **kein CDN** | — |

---

## 3. Die drei externen Embeds im Detail

Alle vier `<iframe>`-Elemente stehen ausschließlich auf `Media.html` und `Media-en.html`,
Markup in beiden Sprachfassungen identisch.

### 3.1 YouTube — 2 Videos

```html
<iframe src="https://www.youtube-nocookie.com/embed/TYMRjLTMA64"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
               gyroscope; picture-in-picture; web-share"
        allowfullscreen loading="lazy"></iframe>

<iframe src="https://www.youtube-nocookie.com/embed/L2hm253HdQc" …></iframe>
```

- Domain ist die **datenschutzfreundlichere `youtube-nocookie.com`** — gut gewählt.
  Sie unterdrückt allerdings nur das Setzen von Werbe-Cookies **vor** dem Klick auf Play;
  IP-Adresse und Geräteinformationen gehen trotzdem beim Seitenaufruf an Google.
- Video-IDs `TYMRjLTMA64` und `L2hm253HdQc` sind fest im Markup. Welcher Kanal dahinter steht,
  ist aus dem Repo nicht ableitbar.
- `allow="…"` gibt großzügige Berechtigungen weiter (Beschleunigungssensor, Gyroskop,
  Zwischenablage-Schreibzugriff). Für einen Video-Player nicht erforderlich.
- Beim Aufruf von `Media.html` gemessen: Anfragen an `www.youtube-nocookie.com`,
  `i.ytimg.com`, `yt3.ggpht.com`, `fonts.gstatic.com`, `www.google.com`, `www.gstatic.com`
  und `jnn-pa.googleapis.com`.

### 3.2 Spotify — 1 Album (doppelt eingebunden)

```html
<iframe src="https://open.spotify.com/embed/album/2YSu8lSscziK7Jr5bgTyYl"
        width="100%" height="300" frameborder="0" allowfullscreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>
```

- Album-ID `2YSu8lSscziK7Jr5bgTyYl`, in beiden Sprachfassungen dieselbe.
- **Das Embed kommt pro Seite zweimal vor.** Die zweite Instanz steht in einem Container mit
  `display: none` und zeigt auf **dasselbe Album**. Sieht nach einem vorbereiteten Platzhalter
  für ein zweites Album aus.
- **Das sichtbare Embed wird abgeschnitten:** Container `max-height: 150px`, `<iframe>`
  `height="300"`. Die untere Hälfte des Players ist nicht sichtbar (siehe
  `screenshots/1440-Media-embeds-viewport.png`).
- Spotify fächert beim Laden stark auf. Gemessene Gegenstellen: `open.spotify.com`,
  `open-exp.spotifycdn.com`, `encore.scdn.co`, `i.scdn.co`, `apresolve.spotify.com`,
  `gew4-spclient.spotify.com` — und **`o22381.ingest.us.sentry.io`**, ein
  Fehler-Telemetriedienst. Über das Spotify-Embed geht also ein Aufruf an einen
  US-Monitoring-Dienst hinaus, den man auf der Seite nirgends sieht und der in der
  Datenschutzerklärung nicht erwähnt ist.

### 3.3 Preconnect / Prefetch im `<head>` — wirkungslos

```html
<link rel="preconnect" href="https://www.youtube-nocookie.com" crossorigin>
<link rel="preconnect" href="https://i.ytimg.com"              crossorigin>
<link rel="preconnect" href="https://open.spotify.com"         crossorigin>
<link rel="prefetch" href="https://open.spotify.com/embed/album/2YSu8lSscziK7Jr5bgTyYl" as="document" crossorigin>
<link rel="prefetch" href="https://www.youtube-nocookie.com/embed/TYMRjLTMA64" as="document" crossorigin>
<link rel="prefetch" href="https://www.youtube-nocookie.com/embed/L2hm253HdQc" as="document" crossorigin>
```

Alle drei `prefetch`-Anfragen scheitern im Test mit `net::ERR_FAILED` (CORS): Ein
`as="document"`-Prefetch mit `crossorigin` wird von den Zielservern nicht mit passenden
CORS-Headern beantwortet. Die Vorlade-Hinweise beschleunigen nichts, erzeugen aber drei
zusätzliche, fehlschlagende Anfragen — und stellen die Verbindung zu Google und Spotify
**bereits vor jeder Nutzerinteraktion** her.

### 3.4 Netzwerkbilanz `Media.html`

| | |
|---|---|
| Anfragen gesamt | **83** |
| davon an Drittanbieter | 56 |
| Datenvolumen von Drittanbietern | **10,68 MB** |
| eigenes Volumen der Seite | 6,65 MB |
| kontaktierte Fremd-Hosts | 13 |

Zum Vergleich: `Termine.html` = 0 Fremd-Hosts, 0 Byte extern.

---

## 4. Konzerttermine — die zentrale Frage

### 4.1 Wo sie stehen

Termine existieren an **vier bzw. sechs Stellen** im Projekt:

| Ort | Was dort steht | Format |
|---|---|---|
| `Termine.html`, Z. 175–240 | **5 Einträge**, alle Termine (Kurse + Konzerte) | `.kurs-eintrag`-Blöcke |
| `Termine-en.html`, Z. 178–248 | dieselben 5 Einträge, englisch | dito |
| `index.html`, Z. 174–197 | **nur der nächste Termin**, als Fließtext | Absätze, anderes Markup |
| `index-en.html` | dito, englisch | dito |
| `Lehre.html`, Z. 198–222 | **die 2 Meisterkurse**, andere Formulierung | `.kurs-eintrag`, aber anderes Styling |
| `Lehre-en.html` | dito, englisch | dito |

Es gibt **keine gemeinsame Quelle**. Die Termine-Seite und die Lehre-Seite listen dieselben zwei
Meisterkurse mit unterschiedlichem Text und unterschiedlichem Markup.

### 4.2 Das Format eines Eintrags

```html
<div class="kurs-eintrag">
  <div class="datum">
    <div class="tag"  style="font-size: 1.2em; color: #E3C29E">16. OKT</div>
    <div class="jahr" style="font-size: 3em; color: #E3C29E; margin-top: -0.15em;">2026</div>
  </div>
  <div class="kurs-trenner-light" style="margin-left: 1em; margin-right: 1em;"></div>
  <div class="kursname" style="color: #E3C29E; font-size: 1em; margin-left: 0em;
                               margin-top: 0.4em; margin-right: -3em; font-weight: 100;">
    <span style="font-weight: 700; font-size: 1.2em;">
      Österreich, Wien <br style="display: block;">
    </span>
    <a href="https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/"
       target="_blank" rel="noopener noreferrer" style="all: unset; cursor: pointer;">
      Konzert im Bechstein Centrum Wien<br style="display: block;"> mit Elena Nemtsova
    </a>
  </div>
</div>
```

Beobachtungen:
- **Das Datum ist Text, kein Datum.** `16. OKT` und `2026` stehen in getrennten `<div>`s. Es
  gibt kein `<time datetime="2026-10-16">`, kein ISO-Format, nichts Maschinenlesbares.
  Sortieren, Filtern („vergangene Termine ausblenden") oder ein Export nach iCal ist auf dieser
  Basis nicht möglich.
- **Die Formate sind uneinheitlich:** Einzeltermine als `16. OKT`, Zeiträume als `20.07-25.07`
  (DE) bzw. `20/07-25/07` (EN). Ein Eintrag hat einen Punkt und ein Leerzeichen, der andere
  nicht.
- **Die Monatsnamen sind in der englischen Fassung nicht übersetzt.** `Termine-en.html` zeigt
  `16 OKT`, `19 OKT`, `11 DEZ`.
- **Die Farbe steht dreimal inline pro Eintrag** (`.tag`, `.jahr`, `.kursname`) plus einmal in
  der Trennerklasse. Die Einträge wechseln zwischen `#E3C29E` (`kurs-trenner-light`) und
  `#FEF1D5` (`kurs-trenner-dark`).

### 4.3 Durchgezählt: Was kostet ein neuer Termin?

**Beispiel:** Es kommt ein Konzert am **5. März 2027 in München mit Elena Nemtsova** dazu,
mit Veranstalter-Link. Chronologisch gehört es **ans Ende** der Liste (nach dem 11.12.2026).

| # | Datei | Was zu tun ist | Wie oft dieselbe Information |
|---|---|---|---|
| 1 | `Termine.html` | neuen `.kurs-eintrag`-Block einfügen | Datum 2×, Ort 1×, Titel 1×, URL 1×, Farbe 3× + Trennerklasse |
| 2 | `Termine-en.html` | denselben Block, Text englisch | Datum 2×, Ort 1×, Titel 1×, URL 1×, Farbe 3× |
| — | | *Farbe wählen:* der vorherige Eintrag ist `light`, also muss der neue `dark` werden — **beide** Sprachfassungen konsistent halten | |

Bisher: **2 Dateien, 6× dieselbe Farbe, 2× dieselbe URL.**

Nun der Fall, dass es der **nächste** Termin ist (also der 16.10.2026 vorbei ist und
München jetzt oben steht):

| # | Datei | Was zu tun ist |
|---|---|---|
| 3 | `index.html` | „NÄCHSTES KONZERT"-Block überschreiben: Datum, Ort, Titel, **URL zweimal** (sie steht in zwei getrennten `<a>`-Elementen — einmal für den Konzerttitel, einmal für „mit Elena Nemtsova") |
| 4 | `index-en.html` | dasselbe, englisch, **URL wieder zweimal** |

Wäre es zusätzlich ein Meisterkurs:

| # | Datei | Was zu tun ist |
|---|---|---|
| 5 | `Lehre.html` | eigener `.kurs-eintrag` mit **anderem Markup** (keine Inline-Farben auf `.tag`/`.jahr`, `kurs-trenner-dark` mit inline überschriebener `background-color: #A78768`), Text lautet „Meisterkurs am …" statt „Internationale Sommerakademie" |
| 6 | `Lehre-en.html` | dasselbe, englisch |

**Bilanz für einen Konzerttermin, der auch der nächste ist:**

| | |
|---|---|
| Betroffene Dateien | **4** |
| Wie oft das Datum getippt wird | **8×** (2× pro Termine-Datei, 2× pro index-Datei) |
| Wie oft die URL getippt wird | **6×** (1× Termine, 1× Termine-en, 2× index, 2× index-en) |
| Wie oft der Konzerttitel getippt wird | **4×** |
| Wie oft die Farbe gesetzt wird | **6×** inline + 2 Trennerklassen |
| Zusätzlich zu prüfen | Wechselt die Hell/Dunkel-Reihenfolge? Muss die Umbruch-Position `<br style="display:block">` neu gesetzt werden? |

**Für einen Meisterkurs: 6 Dateien**, dazu die Nachbildung eines abweichenden Markups.

**Der teuerste Fall ist das Einfügen mitten in der Liste.** Weil die Farbe alternierend und
hartcodiert ist, verschiebt ein Eintrag in der Mitte die Hell/Dunkel-Reihenfolge **aller
nachfolgenden Einträge** — in beiden Sprachfassungen. Bei 5 bestehenden Einträgen sind das
bis zu **24 einzelne Farbwerte**, die von Hand umgestellt werden müssen.

### 4.4 Das Repository bestätigt den Aufwand

Von 100 Commits sind **14 reine Kalender-Aktualisierungen**:

```
d5a1cb5 calendar update      Termine.html Termine-en.html
9d4e2f7 calendar update      Termine.html Termine-en.html index.html index-en.html
01348e7 calendar update      Termine.html Termine-en.html Lehre.html Lehre-en.html
                             assets/css/main.css          ← sogar das Stylesheet
70f535f calendar update      …
e36f6b6 calendar update      …
```

Jeder dieser Commits berührt **2 bis 5 Dateien**. Commit `01348e7` musste sogar `main.css`
anfassen — ein Termin verändert dort das Layout. Das ist der direkte, messbare Beleg dafür, dass
das Pflegen des Kalenders in der aktuellen Struktur kein Copy-Paste-Vorgang von einer Minute
ist, sondern jedes Mal eine kleine Layout-Aufgabe.

### 4.5 Empfehlung für den Neubau

Der Kalender ist der einzige Inhalt der Website, der sich **regelmäßig** ändert. Alles andere
(Vita, Fotos, Downloads) ändert sich selten. Deshalb genügt eine sehr einfache Lösung: **eine
einzige Datendatei** (JSON oder YAML) nach folgendem Muster —

```json
{
  "start": "2026-10-16",
  "ende":  null,
  "ort":   { "de": "Österreich, Wien", "en": "Austria, Vienna" },
  "titel": { "de": "Konzert im Bechstein Centrum Wien",
             "en": "Concert at Bechstein Centrum Vienna" },
  "mit":   "Elena Nemtsova",
  "url":   "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/",
  "typ":   "konzert"
}
```

Damit fällt die Wiederholung von 8 auf 1, die Sortierung und die Hell/Dunkel-Alternanz
ergeben sich automatisch, vergangene Termine lassen sich ausblenden, „nächstes Konzert" auf der
Startseite ist der erste Eintrag der sortierten Liste, `Lehre.html` filtert auf
`typ == "meisterkurs"`, und die Monatsnamen werden pro Sprache aus dem ISO-Datum formatiert
(womit `OKT` in der englischen Fassung von selbst verschwindet).

---

## 5. Meta-Tags, sitemap.xml, robots.txt

### 5.1 Was vorhanden ist

Auf **allen 14 Seiten** exakt und ausschließlich:

```html
<title>German Tcakulov</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
```

### 5.2 Was fehlt

| | Status |
|---|---|
| `sitemap.xml` | **fehlt** |
| `robots.txt` | **fehlt** |
| `favicon.ico` / `<link rel="icon">` | **fehlt** — der Browser-Tab bleibt leer |
| `manifest.json` / Apple-Touch-Icon | fehlt |
| `<meta name="description">` | **fehlt auf allen 14 Seiten** — Google erfindet den Snippet-Text |
| `<meta property="og:*">` | **fehlt** — beim Teilen bei WhatsApp, Instagram-DM, Facebook, LinkedIn erscheint kein Bild, kein Titel, kein Text |
| `<meta name="twitter:card">` | fehlt |
| `<link rel="canonical">` | fehlt |
| `<link rel="alternate" hreflang="de/en">` | **fehlt** — die DE- und EN-Fassung sind für Suchmaschinen nicht als Sprachvarianten derselben Seite erkennbar, sondern als Duplikate |
| `<meta name="author">` | fehlt |
| Strukturierte Daten (JSON-LD `Person`, `MusicEvent`) | fehlt — für einen Musiker mit Konzertterminen wäre `MusicEvent` genau der passende Typ und würde Termine in der Google-Suche darstellbar machen |
| `<html lang>` korrekt | **falsch** — alle 14 Seiten, auch die englischen, sagen `lang="de"` |

### 5.3 Konkrete Auswirkung

- **Alle 14 Seiten heißen im Suchergebnis, im Browser-Tab, im Verlauf und im Lesezeichen
  gleich: „German Tcakulov".** Die Unterseiten sind praktisch nicht auffindbar und nicht
  unterscheidbar.
- **Ein geteilter Link zeigt keine Vorschau.** Für eine Künstler-Website, deren Links per
  Instagram-Story und WhatsApp weitergegeben werden, ist das der spürbarste Verlust.
- `user-scalable=no` verhindert das Aufziehen mit zwei Fingern (WCAG 1.4.4 Verstoß).

---

## 6. Was ohne Zugangsdaten Dritter nicht weiterläuft

**Antwort: nichts.** Es gibt im gesamten Projekt

- keinen API-Schlüssel,
- kein Token, kein Secret, keine `.env`,
- kein Login, kein Admin-Bereich,
- keinen Dienst, der ein Konto voraussetzt.

Die Website ist eine reine Sammlung statischer Dateien. Sie läuft auf jedem Webserver, in jedem
Ordner, sogar per Doppelklick auf `index.html`, ohne dass irgendwo Zugangsdaten nötig wären.
**Das ist ein echter Vorteil und sollte beim Neubau erhalten bleiben.**

Zwei Einschränkungen, die technisch keine Zugangsdaten sind, aber Fremdbestimmung bedeuten:

1. **Die beiden YouTube-Videos und das Spotify-Album gehören jemandem.** Wird ein Video
   privat gestellt, gelöscht oder wegen eines Urheberrechtsanspruchs gesperrt, zeigt das
   Embed auf der Website eine Fehlermeldung — ohne dass im Repo etwas kaputt wäre. Ebenso, wenn
   das Album aus dem Spotify-Katalog verschwindet (Label-Wechsel, Vertriebswechsel).
   Wer die Konten kontrolliert, geht aus dem Repo nicht hervor.
2. **Sechs externe Veranstalter-Links** (`bechstein.com`, `moz.ac.at`, `i-m-s.org.uk`,
   `kug.ac.at`, `admissions.sze.hu`) zeigen auf konkrete Veranstaltungsseiten. Diese URLs
   veralten typischerweise, sobald der Termin vorbei ist — die Links laufen dann ins Leere.
   Es gibt keine Prüfung darauf.

### Ein Punkt, der rechtlich zu klären ist

Die Datenschutzerklärung auf `Impressum_Datenschutz.html` beschreibt **ausschließlich** die
Server-Logdaten beim Websiteaufruf (IP, Zeitstempel, Browsertyp). Sie erwähnt **mit keinem Wort**:

- die Einbindung von **YouTube/Google** auf den Media-Seiten,
- die Einbindung von **Spotify**,
- die daraus folgenden Anfragen an `google.com`, `gstatic.com`, `googleapis.com`, `scdn.co`
  und **`sentry.io`**.

Diese Verbindungen werden beim Laden von `Media.html` **ohne Einwilligung und ohne Hinweis**
aufgebaut, durch die `preconnect`/`prefetch`-Zeilen sogar noch vor dem Rendern der Seite.
Für den Neubau bietet sich die übliche Zwei-Klick-Lösung an: statt des Embeds zunächst ein
lokales Vorschaubild, das Embed lädt erst nach aktivem Klick. Damit sind alle Seiten wieder
vollständig trackingfrei, das Datenschutzproblem verschwindet, und `Media.html` lädt
10,68 MB weniger.

---

## 7. Anhang: Alle externen URLs im Projekt

| Host | Vorkommen | Art | Lädt beim Seitenaufruf? |
|---|---|---|---|
| `www.instagram.com` | 28 | Link (Profil `@tcakulov`) | nein |
| `www.youtube-nocookie.com` | 10 | 4 × iframe, 2 × prefetch, 1 × preconnect (je Media-Seite) | **ja** |
| `open.spotify.com` | 8 | 4 × iframe (2 versteckt), 2 × prefetch, 1 × preconnect | **ja** |
| `www.moz.ac.at` | 6 | Veranstalter-Link (Mozarteum Salzburg) | nein |
| `www.bechstein.com` | 6 | Veranstalter-Link (Bechstein Centrum Wien) | nein |
| `commons.wikimedia.org` | 6 | Bildnachweise — **nur im auskommentierten Block** in `index.html` | nein |
| `www.i-m-s.org.uk` | 4 | Veranstalter-Link (IMS Prussia Cove) | nein |
| `i.ytimg.com` | 2 | preconnect (YouTube-Thumbnails) | **ja** |
| `www.pexels.com` | 2 | Bildnachweis — nur im auskommentierten Block | nein |
| `www.kug.ac.at` | 2 | Veranstalter-Link (Kunstuniversität Graz) | nein |
| `admissions.sze.hu` | 2 | Veranstalter-Link (SZE Universität) | nein |
| `mailto:office@germantcakulov.com` | 14 | Kontakt im Footer | — |

Zusätzlich, **nur als Folge der Embeds** (nicht im Quelltext, in der Netzwerkaufzeichnung von
`Media.html` gemessen):

```
open-exp.spotifycdn.com     encore.scdn.co          i.scdn.co
apresolve.spotify.com       gew4-spclient.spotify.com
o22381.ingest.us.sentry.io  ← Fehler-Telemetrie, US-Anbieter
fonts.gstatic.com           www.google.com          www.gstatic.com
yt3.ggpht.com               jnn-pa.googleapis.com
```

---

## 8. Zusammenfassung

1. **Alle Inhalte sind hartcodiert.** Es gibt keine Datenquelle, die man beim Neubau übernehmen
   könnte — jeder Text muss aus dem HTML herausgelöst werden.
2. **Die Konzerttermine sind der einzige regelmäßig wechselnde Inhalt** und zugleich der
   teuerste: 4–6 Dateien, bis zu 8 Wiederholungen desselben Datums, alternierende Farben von
   Hand. Eine einzige Datendatei löst das vollständig.
3. **Kein Tracking, keine Cookies, keine Zugangsdaten, kein Backend.** Zwölf von vierzehn Seiten
   laden kein einziges Fremd-Byte. Das ist eine gute Ausgangslage, die man behalten sollte.
4. **Die beiden Media-Seiten brechen damit:** 13 Fremd-Hosts, 10,68 MB, ein US-Telemetriedienst
   — alles ohne Erwähnung in der Datenschutzerklärung.
5. **SEO und Teilbarkeit sind praktisch nicht vorhanden.** Ein gemeinsamer Titel, keine
   Description, keine Open-Graph-Bilder, keine Sitemap, falsche Sprachauszeichnung. Für eine
   Website, die über geteilte Links gefunden wird, ist das der größte inhaltliche Verlust.
