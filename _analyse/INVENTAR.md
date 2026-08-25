# INVENTAR — Assets

Vollständige Aufstellung aller Bild-, Video-, Audio-, Dokument- und Schriftdateien.
Dateigrößen mit `stat`, Auflösungen mit `sips`, Anzeigegrößen im Browser gemessen
(Chrome, 1440 × 900 und 390 × 844), Ladegewicht über das DevTools-Protokoll.

Legende: 🔴 = auffällig groß · 🟡 = überdimensioniert für den Verwendungszweck ·
⚪ = ungenutzt

---

## 1. Überblick

| Verzeichnis | Größe | Inhalt |
|---|---|---|
| `downloads/` | **53,2 MB** | 6 ZIP-Archive, 4 DOCX |
| `images/` | **11,99 MB** | 11 JPG |
| `fonts/` | **3,4 MB** | 32 Schriftdateien + 1 CSS — **werden nicht geladen** |
| `assets/webfonts/` | **2,8 MB** | FontAwesome 5 in 5 Formaten — 3 Glyphen genutzt |
| `assets/css/` | 118 KB | 2 CSS + 2 PNG |
| `assets/js/` | 111 KB | 7 JS |
| HTML-Dateien | 226 KB | 14 Dateien |
| **Arbeitsbaum gesamt** | **71,9 MB** | |
| **`.git`** | **422 MB** | siehe Abschnitt 8 |

**Es gibt keine Videodateien und keine Audiodateien im Projekt.** Video und Audio kommen
ausschließlich als YouTube- bzw. Spotify-Embed von außen (siehe `HERKUNFT.md`).
**Es gibt keine PDF-Dateien.** Die Downloads sind Word-Dokumente und ZIP-Archive.
**Es gibt keine SVG-Dateien** außer den FontAwesome-Icon-Fonts.

---

## 2. Bilder

### 2.1 Hero-Bilder (per CSS `background-image`)

| Datei | Auflösung | Größe | Eingebunden in | Angezeigt bei 1440 | bei 390 | |
|---|---|---|---|---|---|---|
| `images/Lehre.jpg` | 6336 × 5346 | **3,76 MB** | `Lehre.html`, `Lehre-en.html` (`.bild`) | 1440 × 900 | 390 × 506 | 🔴 |
| `images/Termine.jpg` | 9504 × 6336 | 1,28 MB | `Termine.html`, `Termine-en.html` | 1440 × 900 | 390 × 506 | 🟡 |
| `images/Media-spiegel.jpg` | 3840 × 2560 | 851 KB | `Media.html`, `Media-en.html` | 1440 × 900 | 390 × 506 | 🟡 |
| `images/4.2.jpg` | 3840 × 2159 | 785 KB | `index.html`, `index-en.html`, `Kontakt.html`, `Kontakt-en.html` | 1440 × 900 | 390 × 506 | 🟡 |

`Lehre.jpg` ist mit **3,76 MB die größte einzelne Datei, die beim normalen Betrachten
geladen wird.** Sie ist 6336 px breit und wird auf 1440 px angezeigt — also mit dem
**4,4-fachen** der benötigten Breite ausgeliefert. Auf einem Handy mit 390 px Breite
(2× Pixeldichte = 780 px nötig) beträgt der Faktor **8,1**.

`Termine.jpg` und `Media.jpg` sind mit 9504 × 6336 px die höchstauflösenden Dateien —
das sind **60 Megapixel**, das entspricht einem unbeschnittenen Vollformat-Kamerabild.

### 2.2 Galerie (Media-Seite, mit Lightbox)

| Datei | Auflösung | Größe | Angezeigt (1440) | Angezeigt (390) | Faktor | |
|---|---|---|---|---|---|---|
| `images/Media.jpg` | **9504 × 6336** | **3,13 MB** | 386 × 257 | 350 × 233 | **24,6 ×** | 🔴 |
| `images/Sechs.jpg` | 1980 × 1320 | 607 KB | 386 × 257 | 350 × 233 | 5,1 × | 🟡 |
| `images/Funf.jpg` | 1980 × 1320 | 592 KB | 386 × 257 | 350 × 233 | 5,1 × | 🟡 |
| `images/Zwei.jpg` | 1980 × 1320 | 526 KB | 386 × 257 | 350 × 233 | 5,1 × | 🟡 |
| `images/Vier.jpg` | 1980 × 1320 | 522 KB | 386 × 257 | 350 × 233 | 5,1 × | 🟡 |
| `images/Eins.jpg` | 1980 × 1320 | 416 KB | 386 × 257 | 350 × 233 | 5,1 × | 🟡 |

**`Media.jpg` ist der auffälligste Fall im ganzen Projekt.** Die Datei ist 9504 px breit
und wird auf **386 px** angezeigt — Faktor 24,6 in der Breite, Faktor **606** in der Fläche.
Die anderen fünf Galeriebilder sind konsistent 1980 × 1320; `Media.jpg` fällt aus der Reihe
und ist offenbar versehentlich in Originalgröße abgelegt worden. Es allein ist so groß wie
die fünf anderen Galeriebilder zusammen.

In der Lightbox wird dasselbe Bild in voller Größe angezeigt — dort hat die hohe Auflösung
einen gewissen Sinn, allerdings begrenzt das Overlay die Darstellung ohnehin auf die
Bildschirmgröße.

Alle sechs Galeriebilder tragen im Markup den Nachweis `© Irène Zandel`. **Sie haben kein
`alt`-Attribut.**

### 2.3 Presse-Seite — dieselben sechs Bilder als Vorschau

| Datei | Angezeigt (1440 **und** 390) | Faktor |
|---|---|---|
| `images/Media.jpg` | **160 × 107** | **59,4 ×** |
| `images/Eins.jpg` … `Sechs.jpg` | 160 × 107 | 12,4 × |

Auf der Presse-Seite dienen dieselben sechs Bilder als Vorschau-Thumbnails mit **160 px
Breite** — und werden trotzdem in voller Auflösung geladen. `Media.jpg` wird hier mit
3,13 MB übertragen, um ein 160 px breites Vorschaubild zu zeigen. Die Bildgröße ändert sich
zwischen Desktop und Mobil nicht.

Deshalb wiegt `Presse.html` **5,92 MB** — die zweitschwerste Seite, obwohl sie nicht einmal
ein Hero-Bild hat.

### 2.4 Inhaltsbild

| Datei | Auflösung | Größe | Eingebunden in | Angezeigt (1440) | Angezeigt (390) | |
|---|---|---|---|---|---|---|
| `images/Mozarteum.jpg` | **750 × 480** | 91 KB | `Lehre.html`, `Lehre-en.html` | **832 × 250** | 350 × 224 | ⚠️ |

**Der einzige umgekehrte Fall:** Dieses Bild ist mit 750 px Breite **kleiner** als der Platz,
den es einnimmt (832 px). Es wird um 11 % **hochskaliert** und dabei sichtbar unscharf.
Zusätzlich wird es von 480 px auf 250 px Höhe gestaucht — das Seitenverhältnis stimmt nicht,
das Bild ist gequetscht. Kein `alt`-Attribut, kein Bildnachweis.

### 2.5 Template-Grafiken

| Datei | Größe | Verwendung | |
|---|---|---|---|
| `assets/css/images/overlay.png` | 108 B | `.bild::before` — halbtransparente Verdunkelung über dem Hero-Bild | genutzt |
| `assets/css/images/highlight.png` | 2,8 KB | `.box.highlight` — Hintergrundmuster | genutzt |

Beide werden korrekt geladen (die Pfade `images/…` sind relativ zu `assets/css/` und stimmen).

### 2.6 Referenzierte, aber nicht vorhandene Bilder

| Referenz | Wo | Status |
|---|---|---|
| `images/banner.jpg` | `main.css`, Regel `#banner` | **fehlt** — die Regel `#banner` ist Template-Rest und trifft kein Element, der 404 tritt daher nicht auf |
| `images/4.1.png` | `index.html:26`, `index-en.html:31`, `Kontakt.html:26`, `Kontakt-en.html:26` | **fehlt** — steht in einem auskommentierten `<section id="hero-image">` |
| `images/7.jpg` | `Lehre.html:20`, `Lehre-en.html:20` | **fehlt** — auskommentiert |
| `images/8.jpg` | `Media.html:39`, `Media-en.html:38` | **fehlt** — auskommentiert |
| `images/5.1.jpg` | `Termine.html:30`, `Termine-en.html:30` | **fehlt** — auskommentiert |
| `images/vlad.jpg` | `index.html:290` | **fehlt** — steht im auskommentierten Bildnachweis-Block der Vita |

Diese sechs Referenzen erzeugen keine 404, weil sie alle in HTML-Kommentaren stehen. Sie
belegen aber, dass eine frühere Fassung der Seite mit anderen Bildern gearbeitet hat.

### 2.7 Ungenutzte Bilder

**Keine.** Alle 11 JPG in `images/` sind eingebunden. `Eins`–`Sechs` und `Media.jpg` sogar
doppelt (Media-Galerie **und** Presse-Vorschau).

---

## 3. Downloads

### 3.1 Word-Dokumente

| Datei | Größe | Verlinkt von | Beschriftung DE / EN |
|---|---|---|---|
| `Vita-TCAKULOV-Kurz.docx` | 15,4 KB | `Presse.html`, `Presse-en.html` | Deutsch / Profilvita Kurz · GER / biography short |
| `Vita-TCAKULOV-Lang.docx` | 23,9 KB | dito | Deutsch / Profilvita Lang · GER / biography long |
| `biography-TCAKULOV-short.docx` | 16,1 KB | dito | Englisch / Profilvita Kurz · ENG / biography short |
| `biography-TCAKULOV-long.docx` | 22,4 KB | dito | Englisch / Profilvita Lang · ENG / biography long |
| **Summe** | **77,8 KB** | | |

Anmerkung: **Zwei der vier Kacheln sind auf dem Handy unerreichbar.** Die beiden
„Profilvita Lang"-Kacheln (`id="ciao"`) werden unter 800 px per `visibility: hidden`
ausgeblendet — das Element bleibt aber im Layout stehen und ragt bei 390 px Viewport bis
x ≈ 750 px hinaus. Auf dem Handy sind nur die Kurzfassungen herunterladbar. Siehe
`screenshots/390-Presse-full.png`.

`.docx` ist als Download-Format für Pressetexte üblich, aber nicht ideal — ein
Veranstalter ohne Word muss konvertieren. Für den Neubau wäre PDF (oder PDF **und** DOCX)
die robustere Wahl.

### 3.2 Presse-Fotos (ZIP)

| Datei | ZIP-Größe | Inhalt | Auflösung | Unkomprimiert |
|---|---|---|---|---|
| `TCAKULOV-P1.zip` | 9,47 MB | 1 JPG + macOS-Rest | 7680 × 5120 | 9,49 MB |
| `TCAKULOV-P2.zip` | 7,92 MB | 1 JPG + macOS-Rest | 9504 × 6336 | 7,92 MB |
| `TCAKULOV-P3.zip` | 9,37 MB | 1 JPG + macOS-Rest | 9504 × 6336 | 9,40 MB |
| `TCAKULOV-P4.zip` | 9,30 MB | 1 JPG + macOS-Rest | 9504 × 6336 | 9,52 MB |
| `TCAKULOV-P5.zip` | 8,57 MB | 1 JPG + macOS-Rest | 7680 × 5120 | 8,65 MB |
| `TCAKULOV-P6.zip` | 8,61 MB | 1 JPG + macOS-Rest | 9504 × 6336 | 8,64 MB |
| **Summe** | **53,2 MB** | | | 53,6 MB |

Drei Beobachtungen:

1. **Jedes ZIP enthält genau eine JPG-Datei.** Ein Archiv um eine einzelne Datei bringt
   keinen Nutzen — es zwingt den Empfänger nur zu einem zusätzlichen Entpack-Schritt.
   Direkt verlinkte JPGs wären für Veranstalter und Redaktionen einfacher.

2. **Die Komprimierung bringt praktisch nichts.** JPG ist bereits komprimiert:
   `TCAKULOV-P1.zip` ist 9.926.703 Bytes groß, das enthaltene Bild 9.946.659 Bytes —
   eine Ersparnis von **0,2 %**.

3. **Jedes Archiv enthält eine macOS-Systemdatei** (`__MACOSX/._TCAKULOV-…jpg`, 212–473 B).
   Auf Windows und Linux erscheint beim Entpacken ein zusätzlicher Ordner `__MACOSX` mit
   einer unbrauchbaren Datei. Das wirkt beim Empfänger unsauber.

Der Bildnachweis steht im Dateinamen (`TCAKULOV-1-©IrèneZandel.jpg`), wie es die Presse-Seite
auch ausdrücklich verlangt: *„Inhalte kostenlos verwendbar, sofern die Fotografin / der
Fotograf genannt wird (© im Dateinamen)."* Das ist eine gute Lösung — allerdings kann das
`©`-Zeichen im Dateinamen auf manchen Systemen und in manchen Redaktionssystemen zu
Kodierungsproblemen führen (im ZIP-Verzeichnis der Archive ist es bereits fehlerhaft als
`©IreÌ€neZandel` gespeichert).

Es gibt **keinen Sammel-Download** — wer alle sechs Bilder braucht, klickt sechsmal und lädt
53 MB in Einzelschritten.

---

## 4. Schriften

### 4.1 `fonts/` — 3,4 MB, wird nicht geladen ⚪

32 Dateien: 16 Schnitte von **Source Sans 3**, jeweils als `.woff` und `.woff2`.

| Schnitt | woff | woff2 | | Schnitt | woff | woff2 |
|---|---|---|---|---|---|---|
| ExtraLight | 138 KB | 92 KB | | Regular | 146 KB | 100 KB |
| ExtraLightItalic | 105 KB | 72 KB | | Italic | 111 KB | 78 KB |
| Light | 145 KB | 98 KB | | Medium | 145 KB | 99 KB |
| LightItalic | 110 KB | 77 KB | | MediumItalic | 110 KB | 77 KB |
| SemiBold | 146 KB | 99 KB | | Bold | 146 KB | 99 KB |
| SemiBoldItalic | 110 KB | 77 KB | | BoldItalic | 111 KB | 78 KB |
| ExtraBold | 145 KB | 99 KB | | Black | 139 KB | 93 KB |
| ExtraBoldItalic | 110 KB | 78 KB | | BlackItalic | 105 KB | 73 KB |

Dazu `fonts/stylesheet.css` (3,8 KB) — deklariert alle 16 Schnitte korrekt und mit richtigen
Pfaden. **Diese Datei ist in keiner HTML-Seite eingebunden.**

**Status: keine einzige dieser Dateien wird jemals geladen.** `main.css` deklariert nur drei
Schnitte (Regular, Bold, Italic) und zwar mit dem Pfad `fonts/…`, der relativ zum
Stylesheet-Verzeichnis auf `assets/css/fonts/` auflöst — dieses Verzeichnis existiert nicht.
Nachweis in `DESIGN-IST.md`, Abschnitt 0.1.

Für den tatsächlichen Bedarf der Website (Regular 400, Bold 700, dazu Light für die
`font-weight: 100`-Optik) genügen **3 Schnitte im `woff2`-Format = rund 300 KB**. Die
`.woff`-Fassungen sind nur für Browser vor 2016 nötig. Das sind **91 % Einsparung**.

### 4.2 `assets/webfonts/` — FontAwesome 5, 2,8 MB

| Datei | Größe | Format | Nötig? |
|---|---|---|---|
| `fa-solid-900.svg` | **898 KB** | SVG-Font | ⚪ Legacy (nur alte iOS-Safari) |
| `fa-brands-400.svg` | **730 KB** | SVG-Font | ⚪ Legacy |
| `fa-brands-400.eot` | 131 KB | EOT | ⚪ Legacy (nur Internet Explorer) |
| `fa-brands-400.ttf` | 131 KB | TTF | ⚪ Legacy |
| `fa-solid-900.eot` | 198 KB | EOT | ⚪ Legacy |
| `fa-solid-900.ttf` | 198 KB | TTF | ⚪ Legacy |
| `fa-solid-900.woff` | 99 KB | WOFF | Legacy-Fallback |
| `fa-brands-400.woff` | 88 KB | WOFF | Legacy-Fallback |
| **`fa-solid-900.woff2`** | **76 KB** | WOFF2 | **genutzt** — `fa-download`, `fa-file-word` |
| **`fa-brands-400.woff2`** | **75 KB** | WOFF2 | **genutzt** — `fa-instagram` |
| `fa-regular-400.svg` | 141 KB | SVG-Font | ⚪ **komplett ungenutzt** |
| `fa-regular-400.eot` | 33 KB | EOT | ⚪ **komplett ungenutzt** |
| `fa-regular-400.ttf` | 33 KB | TTF | ⚪ **komplett ungenutzt** |
| `fa-regular-400.woff` | 16 KB | WOFF | ⚪ **komplett ungenutzt** |
| `fa-regular-400.woff2` | 13 KB | WOFF2 | ⚪ **komplett ungenutzt** |

Dazu `assets/css/fontawesome-all.min.css` (58 KB) mit den Definitionen für über 1.500 Icons.

**Tatsächlich verwendet werden drei Symbole:**

| Icon | Vorkommen | Wo |
|---|---|---|
| `fa-download` | 20 | Presse-Seiten (10 pro Sprache) |
| `fa-instagram` | 14 | Footer aller 14 Seiten |
| `fa-file-word` | 8 | Presse-Seiten (4 pro Sprache) |

**2,8 MB Schriftdateien plus 58 KB CSS für drei Glyphen.** Drei einzelne SVG-Icons im HTML
wären zusammen unter 3 KB. Das ist das mit Abstand größte Einsparpotenzial pro
Aufwandseinheit im ganzen Projekt.

Beim Laden von `Presse.html` wird `fa-solid-900.woff2` tatsächlich geholt (76 KB), auf allen
anderen Seiten nur `fa-brands-400.woff2` (75 KB) für das Instagram-Icon.

---

## 5. Skripte und Stylesheets

| Datei | Größe | Status |
|---|---|---|
| `assets/js/jquery.min.js` | 87,4 KB | genutzt (nur von `util.js` und `main.js`) |
| `assets/js/util.js` | 12,1 KB | 2 von 4 Plugins genutzt (`navList`, `panel`) |
| `assets/js/jquery.dropotron.min.js` | 5,0 KB | ⚪ **wirkungslos** — keine Untermenüs vorhanden |
| `assets/js/breakpoints.min.js` | 2,4 KB | ⚪ initialisiert, Ergebnis nie abgefragt |
| `assets/js/browser.min.js` | 2,0 KB | ⚪ **nie aufgerufen** |
| `assets/js/main.js` | 1,5 KB | genutzt |
| `assets/js/jquery.scrolly.min.js` | 0,8 KB | ⚪ **wirkungslos** — kein Element mit `class="scrolly"` |
| **Summe** | **111,2 KB** | davon **10,2 KB nachweislich ohne Funktion** |
| `assets/css/fontawesome-all.min.css` | 58,0 KB | für 3 Icons |
| `assets/css/main.css` | 56,4 KB | 507 von 673 Selektoren treffen kein Element; die letzten 158 Zeilen werden nicht geparst |
| `fonts/stylesheet.css` | 3,8 KB | ⚪ **nirgends eingebunden** |

---

## 6. Ladegewicht pro Seite

Gemessen bei 1440 × 900, Chrome, leerer Cache, bis `networkidle` + 2,5 s.

| Seite | Requests | Eigenes Volumen | Extern | Fremd-Hosts | 404 |
|---|---|---|---|---|---|
| **`Media.html`** | **79** | **6,65 MB** | **10,67 MB** | **13** | 2 |
| **`Presse.html`** | 22 | **5,92 MB** | 0 | 0 | 4 |
| **`Lehre.html`** | 19 | **3,98 MB** | 0 | 0 | 6 |
| `Termine.html` | 16 | 1,53 MB | 0 | 0 | 4 |
| `index.html` | 18 | 1,07 MB | 0 | 0 | 6 |
| `Kontakt.html` | 14 | 1,05 MB | 0 | 0 | 2 |
| `Impressum_Datenschutz.html` | 15 | 0,30 MB | 0 | 0 | 4 |

Die 404-Fehler sind auf allen Seiten die fehlenden `Source Sans 3`-Dateien (siehe 4.1);
auf `index.html` und `Lehre.html` sind es sechs, weil dort zusätzlich der Italic-Schnitt
angefordert wird.

### Einordnung

- **`Media.html` überträgt 17,3 MB.** Über eine typische Mobilfunkverbindung (etwa 5 Mbit/s
  im Alltag) sind das rund **28 Sekunden**. Bei einem Auslandstarif mit Volumenbegrenzung
  ist ein einziger Seitenaufruf spürbar.
- **`Presse.html` überträgt 5,92 MB, um sechs 160-px-Vorschaubilder zu zeigen.** Das ist der
  klarste vermeidbare Aufwand im Projekt: Sechs Thumbnails mit 320 px Breite wären zusammen
  unter 150 KB — eine Ersparnis von **97 %**, ohne jede sichtbare Veränderung.
- **`Lehre.html` überträgt 3,98 MB**, davon 3,76 MB allein für das Hero-Bild.
- Die Empfehlung der Google-Kennzahlen liegt bei etwa **1,5 MB pro Seite**. Vier der sieben
  Seiten liegen darüber, `Media.html` um das Elffache.

### Was moderne Bildformate bringen würden

Bei gleicher sichtbarer Qualität liefern WebP etwa 30 %, AVIF etwa 50 % kleinere Dateien als
JPG. In Kombination mit `srcset` (mehrere Größen pro Bild, der Browser wählt) und passenden
Ausgangsauflösungen (Hero max. 2560 px, Galerie max. 1200 px, Vorschau 320 px) ließe sich das
Gesamtgewicht der Bilder von **11,99 MB auf etwa 800 KB** senken — ohne dass ein Betrachter
einen Unterschied sieht.

---

## 7. Auffälligkeiten in der Übersicht

### 🔴 Auffällig groß

| Datei | Größe | Warum auffällig |
|---|---|---|
| `images/Media.jpg` | 3,13 MB | 9504 px breit, angezeigt mit 386 px (Galerie) bzw. **160 px** (Presse). Flächenfaktor bis 606. |
| `images/Lehre.jpg` | 3,76 MB | Größte beim Betrachten geladene Datei; 6336 px für 1440 px Anzeige. |
| `downloads/*.zip` | 53,2 MB | Sechs Archive um je eine einzelne JPG-Datei; Kompression bringt 0,2 %. |
| `assets/webfonts/fa-solid-900.svg` | 898 KB | Legacy-Format, wird von keinem aktuellen Browser angefordert. |
| `assets/webfonts/fa-brands-400.svg` | 730 KB | dito |

### ⚪ Ungenutzt

| Datei / Gruppe | Größe | Status |
|---|---|---|
| `fonts/` (32 Dateien) | 3,4 MB | Wird wegen falscher `@font-face`-Pfade **nie** geladen |
| `fonts/stylesheet.css` | 3,8 KB | Korrekt, aber nirgends eingebunden |
| `assets/webfonts/fa-regular-400.*` (5 Dateien) | 240 KB | Kein einziges `fa-regular`-Icon im Projekt |
| `assets/webfonts/*.eot`, `*.ttf`, `*.svg` (9 Dateien) | 2,3 MB | Legacy-Formate für IE und iOS < 5 |
| `assets/js/browser.min.js` | 2,0 KB | Nie aufgerufen |
| `assets/js/jquery.scrolly.min.js` | 0,8 KB | Kein `.scrolly`-Element vorhanden |
| `assets/js/jquery.dropotron.min.js` | 5,0 KB | Keine Untermenüs vorhanden |
| `assets/js/breakpoints.min.js` | 2,4 KB | Initialisiert, aber nie abgefragt |
| ~75 % von `assets/css/main.css` | ~42 KB | 507 von 673 Selektoren treffen kein Element |
| letzte 158 Zeilen von `main.css` | ~4 KB | Werden vom Parser verworfen |

**Summe der ungenutzten Assets: rund 5,7 MB.**

### ⚠️ Zu klein / falsch dimensioniert

| Datei | Problem |
|---|---|
| `images/Mozarteum.jpg` | 750 × 480 px, angezeigt mit 832 × 250 px — **hochskaliert und im Seitenverhältnis verzerrt** |

### 🗑️ Systemmüll

`.DS_Store` liegt in `./`, `images/`, `downloads/`, `assets/`, `assets/css/` und sogar in
`.git/` — zusammen etwa 30 KB. Diese Dateien sind **nicht** in Git eingecheckt (die
`.gitignore` fängt sie ab), landen aber bei einem einfachen Upload per FTP oder rsync mit
auf dem Server, wo sie Verzeichnisstrukturen und Dateinamen preisgeben.

Ebenso: die `__MACOSX/._…`-Einträge in allen sechs Presse-ZIPs.

---

## 8. Das Git-Repository

| | |
|---|---|
| Arbeitsbaum | 71,9 MB |
| `.git` | **422 MB** |
| Verfolgte Dateien | 95 |
| Commits | 100 (2025-07-19 bis 2026-03-08) |

Das Repository ist **5,9-mal größer als der Arbeitsbaum**. Die Ursache sind frühere,
noch größere Fassungen der Pressefotos, die eingecheckt und später ersetzt wurden. Die
größten Objekte in der Historie:

```
33,44 MB   downloads/TCAKULOV-1-(c)IrèneZandel.jpg
33,41 MB   downloads/TCAKULOV-P1.zip
30,84 MB   downloads/TCAKULOV-6-(c)IrèneZandel.jpg
30,72 MB   downloads/TCAKULOV-P6.zip
17,34 MB   downloads/TCAKULOV-5-(c)IrèneZandel.jpg
17,29 MB   downloads/TCAKULOV-P5.zip
14,49 MB   images/german_tcakulov_07520_10_2023.jpg
13,56 MB   downloads/TCAKULOV-4-(c)IrèneZandel.jpg
12,75 MB   images/german_tcakulov_06670_1_10_2023.jpg
11,31 MB   images/german_tcakulov_07057_10_2023.jpg
10,72 MB   images/german_tcakulov_07520bw_10_2023.jpg
```

Die Dateinamen (`german_tcakulov_07520_10_2023.jpg`) belegen, dass die Bilder ursprünglich
unter ihren Kameranamen eingecheckt und erst später umbenannt wurden — jede Umbenennung
hat die Datei ein weiteres Mal in der Historie abgelegt.

**Für den Neubau:** Große Binärdateien gehören nicht in die Versionsverwaltung. Pressefotos
und Downloads sollten außerhalb liegen (Objektspeicher, oder wenigstens per Git LFS). Ein
frisches Repository für den Neubau — statt eines Weiterführens dieser Historie — spart
420 MB und macht jedes Klonen und jeden Deploy schnell.

---

## 9. Zusammenfassung

1. **Es gibt keine ungenutzten Bilder** — alle 11 JPG sind eingebunden, sieben davon sogar
   doppelt. Das Aufräumen betrifft nicht die Anzahl, sondern die Größe.
2. **Die Bilder sind durchweg 5- bis 25-fach zu groß** für den Platz, den sie einnehmen.
   Ein einziger Optimierungsdurchlauf (passende Auflösungen + WebP + `srcset`) senkt das
   Bildgewicht von 11,99 MB auf etwa 800 KB.
3. **`Media.jpg` ist der Extremfall:** 3,13 MB für ein Vorschaubild von 160 px Breite.
4. **`Mozarteum.jpg` ist der einzige umgekehrte Fall** — zu klein und dadurch unscharf und
   verzerrt.
5. **5,7 MB Assets werden nie geladen oder nie benutzt** — die gesamte `fonts/`-Sammlung,
   drei Viertel von FontAwesome, vier von sieben JS-Dateien, drei Viertel von `main.css`.
6. **Die sechs Presse-ZIPs bringen keinen Nutzen**: je eine JPG-Datei pro Archiv, 0,2 %
   Kompression, plus macOS-Müll. Direkt verlinkte JPGs wären für Redaktionen einfacher.
7. **Es gibt kein Video, kein Audio und kein PDF im Projekt.** Video und Audio kommen als
   Embed von YouTube und Spotify.
8. **Das Git-Repository ist mit 422 MB fast sechsmal so groß wie die Website selbst.**
