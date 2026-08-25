# SPEC — Struktur & Inhalt

Bestandsaufnahme von `germantcakulov.com` (Arbeitskopie), Stand der Analyse: 2026-08-25.
Grundlage: Quelltext aller 14 HTML-Dateien, `assets/css/main.css`, `assets/js/*`, sowie
Rendering-Messungen in Chrome via Playwright bei 1440 px und 390 px Viewport-Breite.
Screenshots: `./screenshots/`.

---

## 1. Technische Rahmendaten

| | |
|---|---|
| Art | Statische Website, reines HTML/CSS/JS, kein Build-Schritt, kein Framework |
| Basis | HTML5-UP-Template **„TXT"** von @ajlkn (CCA-3.0-Lizenz, Kommentarkopf in jeder Datei) |
| Seiten | 14 HTML-Dateien im Wurzelverzeichnis, 7 DE/EN-Paare |
| Stylesheets | `assets/css/main.css` (3.692 Zeilen, 56,4 KB) + `assets/css/fontawesome-all.min.css` (58,0 KB, per `@import`) |
| JavaScript | 7 Dateien, 111 KB, davon 87 KB jQuery 3.6.0 |
| Zeilenumbrüche | Alle HTML-Dateien CRLF, CSS/JS LF |
| Repo | 100 Commits, 2025-07-19 bis 2026-03-08. `.git` = 422 MB, Arbeitsbaum = 72 MB |

**Nicht vorhanden:** `sitemap.xml`, `robots.txt`, Favicon, `manifest.json`, `.htaccess`, `CNAME`,
Build-Konfiguration, Paketmanager, Tests, README.

---

## 2. Seitenübersicht

Die URL-Spalte nimmt an, dass die Dateien direkt im Web-Root liegen (die internen Links sind
alle relativ und dateibasiert, also `Termine.html`, nicht `/termine`).

| Datei | URL | Sprache | Zweck | Hero-Bild | Zeilen |
|---|---|---|---|---|---|
| `index.html` | `/index.html` | DE | Startseite: nächstes Konzert, Kurzvita, ausklappbares Langportrait | `images/4.2.jpg` | 442 |
| `index-en.html` | `/index-en.html` | EN | dito | `images/4.2.jpg` | 429 |
| `Termine.html` | `/Termine.html` | DE | Konzert- und Kurstermine (Liste) | `images/Termine.jpg` | 368 |
| `Termine-en.html` | `/Termine-en.html` | EN | dito | `images/Termine.jpg` | 379 |
| `Lehre.html` | `/Lehre.html` | DE | Lehrtätigkeit + Meisterkurs-Liste + Mozarteum-Foto | `images/Lehre.jpg` | 353 |
| `Lehre-en.html` | `/Lehre-en.html` | EN | dito | `images/Lehre.jpg` | 353 |
| `Media.html` | `/Media.html` | DE | Fotogalerie (6 Bilder, Lightbox), 2 YouTube-, 1 Spotify-Embed | `images/Media-spiegel.jpg` | 437 |
| `Media-en.html` | `/Media-en.html` | EN | dito | `images/Media-spiegel.jpg` | 447 |
| `Presse.html` | `/Presse.html` | DE | Download-Bereich: 4 Vita-DOCX, 6 Presse-ZIPs | **keins** | 454 |
| `Presse-en.html` | `/Presse-en.html` | EN | dito | **keins** | 454 |
| `Kontakt.html` | `/Kontakt.html` | DE | Nur Überschrift + Link „Pressebereich"; Kontaktdaten stehen im Footer | `images/4.2.jpg` | 290 |
| `Kontakt-en.html` | `/Kontakt-en.html` | EN | dito | `images/4.2.jpg` | 279 |
| `Impressum_Datenschutz.html` | `/Impressum_Datenschutz.html` | DE | Impressum §5 TMG + Datenschutzerklärung | **keins** | 214 |
| `Impressum_Datenschutz-en.html` | `/Impressum_Datenschutz-en.html` | EN | dito | **keins** | 204 |

### Beobachtungen zur Struktur

- **`Presse.html` und die Impressum-Seiten haben kein Hero-Bild.** Sie starten direkt mit
  Inhalt am oberen Rand, alle anderen Seiten mit einem 100 vh hohen Bild. Zwei visuelle
  Seitentypen ohne erkennbare Regel.
- **`Kontakt.html` hat praktisch keinen eigenen Inhalt.** Zwischen Hero und Footer stehen nur
  die `<h2>KONTAKT</h2>` und ein Link „Pressebereich". Die eigentlichen Kontaktdaten
  (Management, Telefon, Mail) stehen im Footer und damit auf jeder der 14 Seiten identisch.
- **`Presse.html` ist nicht in der Navigation.** Erreichbar nur über einen kleinen
  rechtsbündigen `<h3>`-Link auf `Media.html` und `Kontakt.html`. In der Nav von `Presse.html`
  ist stattdessen „Media" als `active` markiert.
- **Impressum ist nicht in der Navigation.** Erreichbar nur über die Fußzeile.

---

## 3. Sprachumschaltung (DE/EN)

### Technische Lösung

Es gibt **zwei vollständige, unabhängige Dateisätze**. Die Umschaltung ist ein normaler Link im
letzten `<li>` der Navigation, der hart auf die Partnerdatei zeigt:

```html
<!-- in Termine.html -->
<li style="padding-top: 1em;"><a href="Termine-en.html">DE | EN</a></li>
<!-- in Termine-en.html -->
<li style="padding-top: 1em;"><a href="Termine.html">DE | EN</a></li>
```

Der Link heißt auf **beiden** Seiten `DE | EN` — es ist nicht erkennbar, in welcher Sprache man
gerade ist oder wohin der Klick führt. Es gibt keine Zustandsanzeige, keinen Cookie, keine
`lang`-Erkennung, kein `hreflang`, keine automatische Weiterleitung.

### `lang`-Attribut ist auf allen 14 Seiten `de`

```
Impressum_Datenschutz-en.html    <html lang="de"
index-en.html                    <html lang="de"
Kontakt-en.html                  <html lang="de"
Lehre-en.html                    <html lang="de"
Media-en.html                    <html lang="de"
Presse-en.html                   <html lang="de"
Termine-en.html                  <html lang="de"
```

Auch die sieben englischen Seiten deklarieren `lang="de"`. Für Screenreader, Silbentrennung,
Übersetzungsdienste und Suchmaschinen ist die englische Fassung damit als Deutsch ausgezeichnet.

### `<title>` ist auf allen 14 Seiten identisch

Alle Seiten tragen `<title>German Tcakulov</title>`. Weder Seitenthema noch Sprache
unterscheidbar — weder im Browser-Tab, im Verlauf, im Lesezeichen noch in Suchergebnissen.

### Inhaltliche Abweichungen zwischen DE und EN

| Seitenpaar | Abweichung |
|---|---|
| `Termine` | **Monatsnamen bleiben deutsch:** die EN-Fassung zeigt `16 OKT`, `19 OKT`, `11 DEZ` statt `OCT`/`DEC`. Datumsbereiche wurden dagegen umgestellt (`20.07-25.07` → `20/07-25/07`). |
| `Termine` | Der Salzburg-Link zeigt in der EN-Fassung weiterhin auf die **deutsche** Mozarteum-Seite `moz.ac.at/de/internationale-sommerakademie#viola`. `Lehre-en.html` benutzt für denselben Kurs korrekt `moz.ac.at/en/summeracademy#viola`. |
| `index` | **Das Langportrait ist unterschiedlich gegliedert.** Der deutsche Abschnitt „Klavier – Violine – Bratsche" besteht aus 7 durch `<br>` getrennten Absätzen, der englische aus 6 — mit anderer Aufteilung der Inhalte. Gleiches gilt für „Von Wladikawkas nach St. Petersburg" (5 vs. 6). Inhaltlich vollständig, aber nicht satzweise parallel. |
| `index` | Die Zitate im EN benutzen deutsche Anführungszeichen: `„Music exists as a destination.“` |
| `index` | Die Bildnachweis-Passage ist in beiden Fassungen auskommentiert, aber unterschiedlich: DE als ein `<!-- … -->`, EN mit anderer Klammerung. |
| `index` | Nav-Eintrag der aktiven Seite: DE `href="#jumphere"`, EN `href="index-en.html"` (Reload statt Sprung). |
| `Presse` | Beschriftungen DE `Deutsch / Profilvita Kurz`, EN `GER / biography short` — die EN-Fassung benennt die Sprache der Datei, die DE-Fassung nicht durchgängig. |
| `Impressum` | EN-Rechteliste zitiert weiterhin „DSGVO" statt „GDPR", obwohl im Absatz darüber „GDPR" steht. |
| `Impressum` | DE-Zwischenüberschriften gemischt geschrieben (`Haftungshinweis`), EN in Großbuchstaben (`DISCLAIMER`). Visuell egal (CSS setzt `text-transform: uppercase`), im Quelltext inkonsistent. |
| `index` | `index-en.html` enthält einen zusätzlichen Media-Query-Block für `#hero-image img`, obwohl das Element auskommentiert ist. |
| `Lehre` | CSS-Klasse der Überschrift: DE `kurse-titel`, EN `kurse-titel-en` — zwei fast identische Regeln in `main.css`, nur um „MASTERCLASSES" 0,05 em kleiner zu setzen. |

Positiv: **Nav-Labels, Footer und Impressum-Verlinkung sind sauber übersetzt.** Der Footer ist
nach Normalisierung des Impressum-Links in DE und EN byteidentisch.

---

## 4. Wiederkehrende Bausteine

| Baustein | Auf welchen Seiten | Umsetzung |
|---|---|---|
| **`#logo`-Div** (Quelle für die mobile Titelleiste) | alle 14 | `<div id="logo" style="display:none; …;"">GERMAN TCAKULOV</div>` — mit **doppeltem Anführungszeichen-Tippfehler** am Attributende, auf allen 14 Seiten. Impressum schreibt `German Tcakulov` statt `GERMAN TCAKULOV`. |
| **Hero (`.bild` + `.name`)** | index, Termine, Lehre, Media, Kontakt (je DE+EN) = 10 | Kein gemeinsames CSS. Jede Seite hat einen eigenen `<style>`-Block im `<body>` mit 6–9 `.bild`-Regeln und 4–7 Media Queries. |
| **Navigation `#nav`** | alle 14 | Identische `<ul>`-Struktur, pro Seite von Hand geändert: `class="active"`, alle 5 `href`, das Sprachziel und das Label. |
| **Footer `#footer`** | alle 14 | Nach Normalisierung des Impressum-Links in allen 14 Dateien **byteidentisch** — bis auf **eine** Zahl: `margin-top` des `<hr>` (7 verschiedene Werte, siehe unten). |
| **Instagram-Icon** | alle 14 | `<a id="insta-icon" …>` mit einem `<span>`, das ein `href` trägt (auf einem `<span>` wirkungslos). Der Instagram-Link kommt dadurch 28× vor (2× pro Seite). |
| **Script-Block** | alle 14 | 7 identische `<script src>`-Zeilen. |
| **`toggleVita()`** | alle 14 | Vollständig kopiert, auch auf 12 Seiten, wo die Funktion kein Ziel hat. |
| **Scroll-Fade-Handler** | die 10 Seiten mit Hero | Kopiert. |
| **`is-ipad` / `is-mobile` IIFEs** | die 10 Seiten mit Hero | Kopiert. |
| **`.kurs-eintrag`-Karte** | Termine (2), Lehre (2) | Gleiche Klassen, **unterschiedliches Markup**: Termine setzt Farben inline auf `.tag`/`.jahr`, Lehre nicht; Termine wechselt zwischen `kurs-trenner-light`/`-dark`, Lehre nutzt immer `kurs-trenner-dark` mit inline überschriebener `background-color`. |
| **Download-Kachel** | Presse (2) | 4× Word-Kachel + 6× Foto-Zeile, jede vollständig ausgeschrieben. |
| **Buttons** | — | **Es gibt keine Buttons.** Kein `<button>`, kein `.button`, keine Formulare, keine Inputs. |

### Der Footer-`<hr>`: 7 handjustierte Werte

```
index          margin-top: 2.65em
Termine        margin-top: 1.9em     (und id="platzhalter20" statt id="Fußzeile")
Kontakt        margin-top: 3.15em
Impressum      margin-top: 3.35em
Lehre          margin-top: 3.75em
Presse         margin-top: 3.85em
Media          margin-top: 4.65em
```

Der einzige Unterschied zwischen den 14 Footer-Blöcken ist diese eine Zahl — pro Seite von Hand
nachgestellt, um den Abstand zum jeweils darüberliegenden Inhalt auszugleichen.

---

## 5. Kopierter statt geteilter Code — vollständige Liste

### 5.1 Footer

14 Kopien à 30 Zeilen ≈ **420 Zeilen**. Enthält Telefonnummer, E-Mail-Adresse, Instagram-Handle
und die Copyright-Jahreszahl `© 2025`. Eine Änderung der Telefonnummer bedeutet 14 Bearbeitungen.

### 5.2 Navigation

14 Kopien à 11 Zeilen ≈ **154 Zeilen**. Ein neuer Menüpunkt = 14 Bearbeitungen; die
Sprachumschalt-`href` müssen paarweise gegenläufig gesetzt werden.

### 5.3 Script-Einbindung

14 × 7 Zeilen = **98 Zeilen**.

### 5.4 `toggleVita()` — 26 Zeilen × 14 Dateien

Die Funktion greift auf `#vita-wrapper`, `#vita-link-top`, `#vita-toggle-bottom` und `#vita` zu.
Diese Elemente existieren **nur auf `index.html` und `index-en.html`**. Auf den anderen 12
Seiten ist die Funktion toter Code (sie würde beim Aufruf sofort auf `null` laufen, wird aber
nie aufgerufen).

Beweis, dass die Kopien nie nachgepflegt wurden — die Farbe im `else`-Zweig:

```
index.html, index-en.html    link.style.color = "#A78768";   ← gepflegt
alle 12 anderen              link.style.color = "#ccc";      ← alte Version
```

`#ccc` kommt sonst nirgends in der Farbpalette vor.

### 5.5 Scroll-Fade-Handler — 12 Zeilen × 10 Dateien

Identisch, bis auf einen Kommentar (`// ← hier kannst du 0.2, 0.4 usw. probieren`), der in
`index.html` entfernt, in `index-en.html` aber noch vorhanden ist.

### 5.6 `is-ipad` / `is-mobile`-Erkennung — 18 Zeilen × 10 Dateien

Zwei IIFEs, die `is-ipad` bzw. `is-mobile` an `<html>` hängen. Beide identisch kopiert.

### 5.7 Hero-CSS

Jede der 5 Hero-Seiten hat ihren eigenen `<style>`-Block im `<body>` mit derselben `.name`-Regel
(11 Deklarationen, überall gleich bis auf `font-size`) und einer eigenen `.bild`-Regel plus
4–7 Media Queries. Nach DE/EN also **10 Kopien**. Die `.name`-Regel unterscheidet sich nur in
`font-size` (`5em` bei index/Termine/Media/Kontakt, `4em` bei Lehre).

### 5.8 Inline-Styles statt Klassen

| Datei | `style="…"`-Attribute | `<style>`-Blöcke |
|---|---|---|
| Presse.html / Presse-en.html | **94** | 1 |
| index.html | 74 | 2 |
| index-en.html | 73 | 2 |
| Termine.html / -en.html | 60 | 2 |
| Media.html / -en.html | 50 | 1 |
| Lehre.html / -en.html | 39 | 1 |
| Impressum / -en | 39 | 1 |
| Kontakt / -en | 19 | 2 |
| **Summe** | **≈ 730** | **20** |

Beispiel: die Zeile für einen Presse-Foto-Text kommt 6× wörtlich vor —
`style="color: #FEF1D5; font-size: 0.95em; margin: 0 0 0.7em 0; font-weight: 100; margin-top: 2.6em;"`.

### 5.9 `!important`

| Ort | Anzahl |
|---|---|
| `assets/css/main.css` | 59 |
| index.html | 35 |
| index-en.html | 34 |
| Lehre.html / -en.html | je 23 |
| Media.html / -en.html | je 22 |
| Termine.html / -en.html | je 21 |
| Kontakt.html / -en.html | je 14 |
| Impressum / -en | je 4 |
| Presse / -en | je 3 |

**Summe ≈ 292.** Ganz überwiegend, um seiteneigene `<style>`-Blöcke gegen `main.css`
durchzusetzen.

### 5.10 Externe URLs mehrfach

| URL | Vorkommen |
|---|---|
| `instagram.com/tcakulov/` | **28** (2× pro Seite: `<a href>` + wirkungsloses `href` auf dem `<span>`) |
| `bechstein.com/…/duo-klavier-bratsche/` | **6** (Termine 1, Termine-en 1, index 2, index-en 2) |
| `i-m-s.org.uk` | 4 |
| `moz.ac.at/de/internationale-sommerakademie#viola` | 3 |
| `kug.ac.at/veranstaltungen` | 2 |
| `admissions.sze.hu/welcome` | 2 |

---

## 6. Was das JavaScript konkret macht

### 6.1 Eingebundene Bibliotheken (in dieser Reihenfolge auf allen 14 Seiten)

| Datei | Version | Größe | Was sie tut | Wird sie gebraucht? |
|---|---|---|---|---|
| `jquery.min.js` | 3.6.0 | 87,4 KB | DOM-Bibliothek | Nur von `main.js` und `util.js` benutzt. Kein eigener Code der Website nutzt jQuery. |
| `jquery.dropotron.min.js` | 1.4.3 | 5,0 KB | Baut Dropdown-Menüs aus verschachtelten `<ul>` | **Wirkungslos.** Die Nav hat keine Untermenüs (`#nav li > ul` existiert nirgends). |
| `jquery.scrolly.min.js` | 1.0.0-dev | 0,8 KB | Sanftes Scrollen für Elemente mit `class="scrolly"` | **Wirkungslos.** Keine einzige Seite hat `class="scrolly"`. (Die vorhandenen `scroll-offset`-Klassen sind reines CSS und haben nichts damit zu tun.) |
| `browser.min.js` | 1.0.1 | 2,0 KB | Browser-/OS-Erkennung, `browser.canUse()` | **Wird nirgends aufgerufen.** Weder `main.js` noch `util.js` referenzieren `browser.`. Die Seiten machen ihre Geräteerkennung stattdessen selbst per Regex (siehe 6.3). |
| `breakpoints.min.js` | 1.0 | 2,4 KB | Registriert benannte Breakpoints, `breakpoints.on()` | Wird **einmal initialisiert**, das Ergebnis aber nie abgefragt. Kein `breakpoints.on(…)`, kein `.active(…)` im Projekt. |
| `util.js` | — | 12,1 KB | 4 jQuery-Plugins (siehe 6.2) | 2 von 4 genutzt. |
| `main.js` | — | 1,5 KB | Initialisierung (siehe 6.4) | Ja. |

**Von 111 KB JavaScript sind ~95 KB ohne erkennbare Wirkung** (jQuery wird nur gebraucht, weil
`util.js`/`main.js` darauf aufbauen; dropotron, scrolly und browser.js tun nachweislich nichts).

### 6.2 `util.js` — Plugin für Plugin

| Zeile | Funktion | Was sie tut | Genutzt? |
|---|---|---|---|
| 7 | `$.fn.navList()` | Wandelt eine verschachtelte `<ul>`-Navigation in eine flache Liste von `<a class="link depth-N">` um, für das mobile Off-Canvas-Panel. | **Ja**, von `main.js`. |
| 42 | `$.fn.panel(config)` | Baut ein Off-Canvas-Panel: Positionierung, Ein-/Ausblenden per CSS-Transform, Schließen bei Klick/Swipe, `resetScroll`, `resetForms`, Sperren des Body-Scrollings. | **Ja**, von `main.js` für `#navPanel`. |
| 303 | `$.fn.placeholder()` | Polyfill für `placeholder`-Attribute in alten Browsern (IE9). | **Nein** — es gibt keine Formulare, keine Inputs. |
| 526 | `$.prioritize()` | Verschiebt Elemente je nach Bedingung im DOM (Template-Helfer für Sidebars). | **Nein** — nirgends aufgerufen. |

### 6.3 Inline-Skripte in den HTML-Dateien

**(a) `toggleVita()`** — nur auf `index.html` / `index-en.html` wirksam, auf den übrigen 12
Seiten kopierter Blindcode.

```js
function toggleVita() {
  const wrapper = document.getElementById("vita-wrapper");
  const isOpen  = wrapper.classList.contains("vita-expanded");
  if (isOpen) {
    wrapper.classList.remove("vita-expanded");
    link.innerText = "Mehr anzeigen";            // EN: "read more"
    button.style.display = "none";
    // zurückscrollen zur Überschrift #vita, Offset -73 px
    const y = document.getElementById("vita").getBoundingClientRect().top
              + window.pageYOffset - 73;
    window.scrollTo({ top: y, behavior: "smooth" });
  } else {
    wrapper.classList.add("vita-expanded");
    link.innerText = "Weniger anzeigen";         // EN: "show less"
    button.style.display = "block";
  }
}
```

Das Auf-/Zuklappen selbst passiert per CSS: `#vita-wrapper { max-height: 0; transition:
max-height .6s ease }` → `.vita-expanded { max-height: 30000px }`. Da die tatsächliche Höhe des
Textes bei ~3.900 px liegt, animiert der Browser 0 → 30.000 px in 600 ms; sichtbar ist deshalb
nur die erste Zehntelsekunde als Bewegung, der Rest springt. Die aufgeklappte Seite ist
6.177 px hoch (zugeklappt 2.290 px).

Ein Offset von `-73` px ist hart kodiert und passt nur zu einer bestimmten Kopfzeilenhöhe.

**(b) Scroll-Fade des Hero-Namens** — auf den 10 Seiten mit Hero:

```js
window.addEventListener('scroll', function () {
  const name = document.querySelector('.name');
  const hero = document.querySelector('.bild');
  const fadePoint = hero.offsetHeight * 0.3;
  name.style.opacity = (window.scrollY > fadePoint) ? '0' : '1';
});
```

Der Schriftzug „GERMAN TCAKULOV" ist `position: fixed` und wird ab 30 % der Hero-Höhe
ausgeblendet (`transition: opacity .75s ease`). Der Listener ist **ungedrosselt** und liest bei
jedem Scroll-Event `hero.offsetHeight` — das erzwingt bei jedem Frame ein Layout-Reflow. Auf
Mobil ist `.name` ohnehin `display: none`, der Listener läuft aber trotzdem.

**(c) Gerätekennungen** — zwei IIFEs auf denselben 10 Seiten:

```js
var isiPad = /iPad/.test(navigator.userAgent) ||
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (isiPad) document.documentElement.classList.add('is-ipad');

var isMobile = /Mobi|Android|iPhone|iPod|IEMobile|Opera Mini|BlackBerry/
               .test(navigator.userAgent);
if (isMobile) document.documentElement.classList.add('is-mobile');
```

`navigator.platform` ist deprecated. Die iPad-Heuristik trifft auch MacBooks mit Touch-Bar-losen
Trackpads nicht, aber jedes Mac-Gerät mit `maxTouchPoints > 1`. Die Klassen steuern
ausschließlich die Positionierung des Hero-Hintergrunds (`background-attachment`,
`background-size`, `background-position`) in den seiteneigenen `<style>`-Blöcken.

**(d) Lightbox** — nur `Media.html` / `Media-en.html`:

```js
document.querySelectorAll('.lightbox').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const src = link.getAttribute('href');
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');
    overlay.innerHTML = `<img src="${src}">`;
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
    document.body.appendChild(overlay);
  });
});
```

Die `.lightbox`-Elemente sind `<div>`s mit einem `href`-Attribut — auf einem `<div>` ist `href`
kein gültiges Attribut, funktioniert hier aber, weil das Skript es per `getAttribute` liest.
Konsequenz: **nicht per Tastatur bedienbar**, kein Fokus, kein `Esc`, kein `role="dialog"`.
Zurück geht es nur per Klick.

**(e) Lazy-Loading-Nachrüstung** — nur `Media.html` / `Media-en.html`, im `<head>`:

```js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img, iframe').forEach(el =>
    el.setAttribute('loading', 'lazy'));
});
```

Setzt `loading="lazy"` per JS nach, obwohl das Attribut direkt ins HTML geschrieben werden
könnte (bei einem der vier `<iframe>` steht es sogar schon fest im Markup).

### 6.4 `main.js` — Zeile für Zeile

```js
breakpoints({ xlarge:['1281px','1680px'], large:['981px','1280px'],
              medium:['737px','980px'], small:['361px','736px'], xsmall:[null,'360px'] });
```
Registriert 5 Breakpoints. Das Ergebnis wird nirgends abgefragt. **Wirkungslos.**

```js
$window.on('load', () => setTimeout(() => $body.removeClass('is-preload'), 100));
```
`body.is-preload` schaltet per CSS **alle** Animationen und Transitions ab
(`body.is-preload * { transition: none !important }`). 100 ms nach `load` wird die Klasse
entfernt und Transitions greifen. Verhindert Aufblitzen beim Seitenaufbau. **Wirksam.**

```js
$('#nav > ul').dropotron({ mode:'fade', noOpenerFade:true, speed:300, alignment:'center' });
```
**Wirkungslos** — keine Untermenüs vorhanden.

```js
$('.scrolly').scrolly({ speed:1000, offset: () => $nav.height() - 5 });
```
**Wirkungslos** — kein Element hat `class="scrolly"`.

```js
$('<div id="titleBar"><a href="#navPanel" class="toggle"></a>' +
  '<span class="title">' + $('#logo').html() + '</span></div>').appendTo($body);
```
Baut die mobile Titelleiste. Der Text kommt aus dem versteckten `#logo`-Div — deshalb heißt die
Leiste auf dem Impressum „German Tcakulov" statt „GERMAN TCAKULOV". **Wirksam** (nur ≤ 980 px
sichtbar).

```js
$('<div id="navPanel"><nav>' + $('#nav').navList() + '</nav></div>')
  .appendTo($body)
  .panel({ delay:500, hideOnClick:true, hideOnSwipe:true, resetScroll:true,
           resetForms:true, side:'left', target:$body, visibleClass:'navPanel-visible' });
```
Baut das Off-Canvas-Menü aus der Desktop-Nav. **Wirksam.** `resetForms` läuft ins Leere.

---

## 7. Layout und Navigationsverhalten

### Navigation
`#nav` ist **`position: fixed; bottom: 2.75vh; right: 1vw`** — dauerhaft unten rechts, über dem
Hero-Bild und über dem Footer. Auf hellen Hero-Bildern (Termine, Lehre) ist der
cremefarbene Text schlecht lesbar; das ist auf den Screenshots `1440-Termine-viewport.png` und
`1440-Lehre-viewport.png` deutlich zu sehen.

Ab ≤ 980 px wird `#nav` ausgeblendet und durch die von `main.js` erzeugte Titelleiste mit
Hamburger und ein 275 px breites Off-Canvas-Panel ersetzt.

Die Nav-`<li>`-Regeln stammen unverändert aus dem horizontalen Template-Menü:
`line-height: 0.6em`, `top: -6px`, `padding: 6px 1.5em 0.25em 1.5em`,
`border-bottom-left-radius: 6px`. Auf Hover/Active verschiebt sich der Eintrag um 9 px nach
unten (`top: -6px` → `top: 3px`) — ein Rest der ursprünglichen Tab-Optik.

### Der `#jumphere`-Anker

Der aktive Nav-Eintrag verlinkt auf `#jumphere`. Wohin dieser Anker zeigt, ist von Seite zu
Seite verschieden:

| Seite | Ziel von `#jumphere` | Ergebnis beim Klick (gemessen, 1440×900) |
|---|---|---|
| `index.html` | `<hr class="scroll-offset">` vor der Vita | y = 1168 — korrekt |
| `Lehre.html` | `<h2 id="jumphere">LEHRE</h2>` | y = 895 — korrekt |
| `Kontakt.html` | `<h2 id="jumphere">KONTAKT</h2>` | y = 433 (= Seitenende, da die Seite kürzer ist) |
| **`Termine.html`** | **nur der Copyright-`<div>` im Footer** | **y = 1009 = Seitenende** |
| **`Media.html`** | **nur der Copyright-`<div>` im Footer** | **y = 1952 = Seitenende** |

Auf `Termine.html` und `Media.html` springt ein Klick auf den eigenen, aktiven Menüpunkt also
ans **Seitenende**. Auf `index.html`, `Kontakt.html` und `Lehre.html` existiert `jumphere`
**zweimal** (Inhalt + Footer) — doppelte IDs.

Der Footer-`<div>` ist außerdem in allen 14 Dateien fehlerhaft notiert:
`<div id = "jumphere"class="container">` — es fehlt das Leerzeichen vor `class`. Chrome
korrigiert das stillschweigend.

### Seitentypen

| Typ | Seiten | Aufbau |
|---|---|---|
| **Hero + Inhalt** | index, Termine, Lehre, Media, Kontakt | 100 vh Bild mit `background-attachment: fixed`, fixierter Name rechts, danach `#main` in `.container` (64 em, ≤1680 px: 52 em → 832 px bei 1440), dann Footer |
| **Nur Inhalt** | Presse, Impressum | Kein Bild, Inhalt beginnt direkt oben, Nav schwebt frei über der Seite |

### Grid

Aus dem Template geerbtes 12-Spalten-Grid (`.row`, `.col-N`, `.col-N-small`). Tatsächlich
verwendet werden nur `col-12`, `col-7`, `col-5`, `col-12-small`. Auf `Media.html` und
`Presse.html` wird das Grid gar nicht benutzt, dort steht Flexbox direkt im `style`-Attribut.

---

## 8. Auffälligkeiten, die den Neubau betreffen

### 8.1 Die Schriftart lädt auf keiner Seite

`main.css` deklariert:
```css
@font-face { font-family:'Source Sans 3';
             src: url('fonts/SourceSans3-Regular.woff2') format('woff2'), … }
```
Die Datei liegt in `assets/css/`, der Pfad löst also zu `assets/css/fonts/…` auf. Dieses
Verzeichnis **existiert nicht** — die Fonts liegen unter `/fonts/`.

Gemessen (`document.fonts`, Chrome):
```
Source Sans 3 400 normal → error
Source Sans 3 700 normal → error
Source Sans 3 400 italic → error
```
Sechs 404-Fehler pro Seite. Die gesamte Website läuft im System-Fallback (`sans-serif`,
auf macOS Helvetica). Zusätzlich existiert unter `fonts/stylesheet.css` ein korrektes,
vollständiges `@font-face`-Set für alle 9 Schnitte — es ist **in keiner Datei eingebunden**.

### 8.2 Die letzten 158 Zeilen von `main.css` werden nie geparst

Ab Zeile 3535 stehen drei ineinander geschachtelte, nicht geschlossene Media Queries, darunter
eine syntaktisch ungültige:

```css
3535  @media screen and (max-width: 736px){
3536    #kursplatzhalter1 { margin-top: 0.2em; }
3541    @media screen and (max-width: 1080){      ← Einheit fehlt → ungültig
3547  @media screen and (max-width: 736px){
3554  @media screen and (max-width: 736px) {      /* Responsive Anpassung */
```

Der CSS-Parser schluckt alles ab Zeile 3535 in eine einzige unbrauchbare Regel. Verifiziert:
`document.styleSheets` endet nach dieser Regel; `#platzhalter2` hat computed
`margin-bottom: 0px` statt der dort deklarierten `3em`, `.kursname` bleibt bei 14,67 px statt
der dort deklarierten `1.2em`.

**Damit sind unter anderem tot:**
- der gesamte mobile Feinschliff für `.kurs-eintrag`, `.datum`, `.kursname`, `#Mozarteum`
  und zehn `#platzhalterN`-Korrekturen
- `br { display: block !important }` — **deshalb** steht in `index.html` ein eigener
  `<style>br{display:block!important}</style>` und deshalb tragen im Fließtext über 40 `<br>`
  ein eigenes `style="display: block;"`
- `.lightbox-overlay` und `.galerie-bild` — die Lightbox funktioniert nur, weil `Media.html`
  diese Regeln im eigenen `<style>`-Block wiederholt
- `@supports not (background-attachment: fixed) { .bild { … } }`
- `html.is-ipad .bild { background-attachment: scroll }` — auch das wiederholen die Seiten inline

Das erklärt einen großen Teil der Inline-Style-Menge: Regeln wurden immer wieder direkt ins
HTML nachgetragen, weil sie im Stylesheet stillschweigend nicht mehr ankamen.

### 8.3 75 % der geparsten CSS-Selektoren treffen kein Element

Gemessen über alle 14 Seiten hinweg: von 673 Selektoren, die überhaupt geparst werden, treffen
**507 auf keiner einzigen Seite ein Element**. Übrig sind 102 tatsächlich verwendete.
Dazu gehören das komplette 12-Spalten-Grid mit allen `gtr-*`/`aln-*`-Varianten, `#banner`,
`#header`, `.dropotron`, Tabellen-, Formular- und Button-Styles.

`#banner` referenziert außerdem `url("../../images/banner.jpg")` — diese Datei existiert nicht.

### 8.4 Presse-Seite auf Mobil: die Hälfte der Downloads ist unerreichbar

Die vier `id="ciao"`-Elemente (dieselbe ID auf 6 Elementen, in DE und EN) werden ab ≤ 800 px per
`visibility: hidden` versteckt. `visibility: hidden` entfernt sie aber **nicht aus dem Layout**:
sie ragen bei 390 px Viewport bis x = 749 px hinaus. Sichtbares Ergebnis (siehe
`390-Presse-full.png`): **die Langfassungen der Vita — DE und EN — sind auf dem Handy weder
sichtbar noch anklickbar.** Nur die Kurzfassungen sind erreichbar.

`Lehre.html` überläuft ebenfalls (414 px statt 390 px), verursacht durch
`margin-right: -3em` an `.kursname`.

### 8.5 Spotify-Embed wird abgeschnitten

Der Container hat `max-height: 150px`, der `<iframe>` `height: 300px` — die untere Hälfte des
Players wird beschnitten, Albumtitel und Bedienleiste überlappen. Gemessen: iframe 830×300 px in
einem 150 px hohen Elternelement (Desktop), 349×300 in 150 (Mobil). Sichtbar auf
`1440-Media-embeds-viewport.png` und `390-Media-embeds-viewport.png`.

Zusätzlich: der Container ist mit `flex: 1 1 45%` deklariert, wächst aber auf die volle
Zeilenbreite (830 px statt der beabsichtigten ~386 px), weil er allein in der letzten Flex-Zeile
steht.

Direkt darunter steht ein **zweites, identisches Spotify-Embed mit `display: none`** — dieselbe
Album-ID, offenbar ein Platzhalter für ein zweites Album.

### 8.6 Semantik und Zugänglichkeit

- **Kein `<h1>` auf keiner der 14 Seiten.** Die Hierarchie beginnt auf `index.html` mit einem
  `<h3>` („NÄCHSTES KONZERT"), danach kommt das `<h2>` („VITA").
- `h1…h6 { text-transform: uppercase }` global — jede Überschrift wird versalisiert,
  auch die 60 Zeichen lange „Alles in Bewegung und im Fluss - ein Portrait von Florian Olters".
- **Keinerlei ARIA-Attribute, kein `role`, kein `<main>`, kein `<header>`.**
- 9 verschiedene `<img>` ohne `alt`, darunter alle sechs Galeriebilder und das Mozarteum-Bild.
  Vorhandene `alt`-Texte sind nichtssagend: `alt="Hero Image"`, `alt="Pressebild"`, `alt="…"`.
- 10 Download-Links pro Presse-Seite bestehen nur aus einem `<i>`-Icon ohne Textinhalt und ohne
  `aria-label` — für Screenreader namenlos.
- `<meta name="viewport" content="… user-scalable=no">` auf allen 14 Seiten — Pinch-Zoom ist
  unterbunden (WCAG 1.4.4).
- Die Lightbox ist nicht tastaturbedienbar.
- Fließtext ist durchgängig `text-align: justify` ohne Silbentrennung. Bei 350 px Textbreite auf
  dem Handy entstehen sehr große Wortabstände (deutlich auf `390-index-full.png`).

### 8.7 Sonstiges

- **Doppelte IDs:** `jumphere` (6 Dateien), `ciao` (Presse, 6× je Datei), `platzhalter8`
  (Presse, 2× je Datei). Ein `<div>` auf `Presse.html:206` trägt sogar **zwei** `id`-Attribute:
  `<div id="ciao" id="platzhalter8" …>`.
- **Platzhalter-IDs als Layout-Werkzeug:** `#platzhalter1` bis `#platzhalter21`,
  `#kursplatzhalter1`, dazu `#help`, `#ciao`, `#handle`, `#Fußzeile` (Umlaut in einer ID).
  Diese IDs tragen keine Bedeutung, sie existieren nur als Angriffspunkt für punktuelle
  Abstandskorrekturen — und ein Teil davon ist durch 8.2 wirkungslos.
- **Auskommentierter Code:** Jede Hero-Seite trägt am Anfang eine auskommentierte
  `<section id="hero-image">` aus einer früheren Fassung. `index.html` enthält zusätzlich einen
  ~10-zeiligen auskommentierten Bildnachweis-Block. `main.css` enthält einen auskommentierten
  Media-Query-Anfang mit fehlender schließender Klammer (`/*#platzhalter4{…*/`).
- `<link rel="prefetch" … crossorigin>` auf den Media-Seiten scheitert bei allen drei Zielen an
  CORS (`net::ERR_FAILED`) — die Vorlade-Hinweise wirken nicht.
- Copyright-Jahr ist statisch `© 2025`, 14×.

---

## 9. Offene Fragen

1. **Sollen `Presse.html` und `Impressum` weiterhin ohne Hero-Bild bleiben,** oder war das
   Absicht? Sie brechen den visuellen Rhythmus der übrigen Seiten.

2. **Soll `Kontakt.html` eigenen Inhalt bekommen?** Aktuell ist sie funktional leer — alle
   Kontaktdaten stehen im Footer und damit auf jeder Seite. Ein Kontaktformular gibt es nicht;
   war eines geplant?

3. **Warum ist der Pressebereich nicht in der Navigation?** Ist das Absicht (halb-öffentlicher
   Bereich für Veranstalter) oder gewachsen?

4. **Das zweite, per `display: none` versteckte Spotify-Embed** verweist auf dasselbe Album wie
   das sichtbare. Ist ein zweites Album geplant, oder ist das ein Rest?

5. **Sollen die Vita-Bilder zurückkommen?** In `index.html` steht ein vollständiger,
   auskommentierter Block mit fünf Creative-Commons-Bildnachweisen (Wladikawkas, St. Petersburg,
   Hanns Eisler, Mozarteum). Die zugehörigen Dateien (u. a. `images/vlad.jpg`) sind aus dem
   Repo entfernt.

6. **Ist die abweichende Absatzgliederung im englischen Portrait beabsichtigt?** DE und EN
   erzählen dasselbe, teilen den Text aber unterschiedlich auf. Für einen Neubau mit gemeinsamer
   Datenstruktur wäre zu klären, ob DE und EN satzweise parallel geführt werden sollen.

7. **Welche Zielgruppe hat der Pressebereich?** Die sechs ZIPs sind zusammen 53 MB. Ist ein
   Download aller Bilder auf einmal gewünscht, oder Einzeldownloads?

8. **Wo wird die Seite gehostet?** Aus dem Repo nicht ableitbar (kein `CNAME`, keine
   Deploy-Konfiguration, keine CI). Das bestimmt, ob im Neubau serverseitige Lösungen
   (Redirects, `hreflang`, saubere URLs ohne `.html`) möglich sind.

9. **Soll die URL-Struktur erhalten bleiben?** `Termine.html` mit Großbuchstaben und
   `Impressum_Datenschutz-en.html` sind für einen Neubau untypisch. Falls die Seite schon
   indexiert ist, wären Redirects nötig.

10. **Wie ist die Historie vor Juli 2025?** Das Repo beginnt am 2025-07-19 mit „Initial commit".
    Wenn die Seite tatsächlich über zwei Jahre gewachsen ist, fehlt die frühere Historie —
    möglicherweise existieren ältere Fassungen mit weiteren Inhalten (z. B. den Vita-Bildern).
