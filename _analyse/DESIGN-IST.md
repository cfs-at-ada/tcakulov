# DESIGN-IST — Visuelle Bestandsaufnahme

Alle Werte in diesem Dokument sind **im Browser gemessen**, nicht aus dem CSS-Quelltext
abgelesen: Chrome (Playwright), `getComputedStyle` über jedes sichtbare Element aller 14 Seiten,
je einmal bei **1440 × 900** und **390 × 844** Pixeln. Wo Quelltext und gerenderter Wert
auseinandergehen, gilt der gerenderte Wert — und genau diese Fälle sind die interessanten.

---

## 0. Vorbemerkung: Was man auf dieser Website sieht, ist nicht das, was im CSS steht

Zwei Befunde bestimmen die gesamte visuelle Bestandsaufnahme und müssen vorweg stehen:

### 0.1 Die vorgesehene Schrift wird auf keiner Seite geladen

`assets/css/main.css` deklariert `Source Sans 3` mit relativen Pfaden:

```css
@font-face { font-family: 'Source Sans 3';
             src: url('fonts/SourceSans3-Regular.woff2') format('woff2'),
                  url('fonts/SourceSans3-Regular.woff')  format('woff'); … }
```

`@font-face`-URLs lösen **relativ zum Stylesheet** auf, nicht zum Dokument. Die Datei liegt in
`assets/css/`, gesucht wird also `assets/css/fonts/SourceSans3-Regular.woff2`. Dieses
Verzeichnis existiert nicht — die Schriften liegen unter `/fonts/`.

Gemessen über `document.fonts`, auf **allen 14 Seiten identisch**:

```
Source Sans 3  400 normal  →  error
Source Sans 3  700 normal  →  error
Source Sans 3  400 italic  →  error
Font Awesome 5 Brands 400  →  loaded
Font Awesome 5 Free   900  →  loaded   (auf Presse; sonst unloaded)
Font Awesome 5 Free   400  →  unloaded (wird nirgends gebraucht)
```

Pro Seitenaufruf entstehen 4–6 HTTP-404. **Die gesamte Website wird im System-Fallback
gerendert** — `sans-serif`, auf macOS also Helvetica, auf Windows Arial, auf Android Roboto.
Jede Angabe zu Schriftgrößen und Zeilenhöhen weiter unten beschreibt daher, wie die Seite
**heute tatsächlich aussieht**, nicht wie sie gemeint war.

Zusätzlich liegt unter `fonts/stylesheet.css` ein vollständiges, korrektes `@font-face`-Set für
**alle 16 Schnitte** — es ist in keiner HTML-Datei eingebunden.

### 0.2 Die letzten 158 Zeilen des Stylesheets werden nie geparst

In Zeile 3541 von `main.css` steht `@media screen and (max-width: 1080)` — **ohne `px`**. Die
Angabe ist ungültig, der Block wird nicht geschlossen, und der CSS-Parser verwirft alles ab
Zeile 3535 bis zum Dateiende. Nachgewiesen über `document.styleSheets`: `main.css` liefert 287
Regeln auf oberster Ebene, die letzte ist genau dieser kaputte Block.

Betroffen sind unter anderem der komplette mobile Feinschliff des Terminkalenders,
`br { display: block !important }`, `.lightbox-overlay`, `.galerie-bild` und die
iPad-Sonderbehandlung des Hero-Bilds. Deshalb wiederholen die HTML-Seiten diese Regeln in
eigenen `<style>`-Blöcken und deshalb tragen über 40 `<br>` im Fließtext ein eigenes
`style="display: block;"`.

**Für den Neubau heißt das: Der CSS-Quelltext ist als Design-Referenz unbrauchbar.** Was gilt,
steht in diesem Dokument.

---

## 1. Farben

Gemessen als Anzahl der Elemente, die den Wert tatsächlich gerendert tragen, summiert über alle
14 Seiten.

### 1.1 Die tatsächliche Palette — fünf Farben

| Hex | Muster | Verwendung | Treffer (1440) | auf Seiten |
|---|---|---|---|---|
| **`#A78768`** | Warmes Bronze / Altgold | **Akzentfarbe.** Alle `<h2>`/`<h3>`-Überschriften, Navigation, Footer-Text, Telefonnummer und Mail-Link, alle `<hr>`-Linien, Instagram-Handle, „Mehr anzeigen"-Link | **166** | 14/14 |
| **`#FEF1D5`** | Sehr helles Creme | **Fließtextfarbe.** Alle `<p>`, alle Links im Text, Zitate, Downloadbeschriftungen | **150** | 14/14 |
| **`#003049`** | Dunkles Petrolblau | **Hintergrund der gesamten Seite** (`#main`, `#footer`, `#titleBar`, `#navPanel`) — und zugleich Farbe des Hero-Schriftzugs `.name` | 28 (BG) + 10 | 14/14 |
| **`#E3C29E`** | Helles Sandbeige | **Zweite Akzentfarbe, nur im Kalender.** Jeder zweite Termineintrag (`.tag`, `.jahr`, `.kursname`, `.kurs-trenner-light`) | **74** | 6/14 |
| **`#1A1A1A`** | Fast Schwarz | Lightbox-Overlay und Bild-Container auf den Media-Seiten | 8 | 2/14 |

### 1.2 Zwei Farben aus dem Template, die niemand entfernt hat

| Hex | Wo | Sichtbar? |
|---|---|---|
| `#006376` | Petrol-Türkis. Standard-Linkfarbe des HTML5-UP-Templates (`main.css:182`). Sie überlebt auf den 6 Links im mobilen Menü-Panel — auf dem Desktop, wo das Panel `display:none` ist. | **nein**, nie sichtbar |
| `#6B7770` | Graugrün. Hintergrund der Template-Titelleiste (`main.css:2477`), Farbe von `span.title` auf dem Desktop. | **nein**, nie sichtbar |

Auf Mobil werden beide korrekt mit `#E3C29E` überschrieben — dort trägt `span.title` und
`a.link.depth-0` Sandbeige (172 Treffer). Die Template-Farben sind also **tote Reste**, die nur
in der DOM-Messung auftauchen.

### 1.3 Eine Farbe, die aus dem Rahmen fällt

`#ccc` — ein neutrales Grau, das in der Palette sonst nirgends vorkommt. Es steht in
`toggleVita()` in **12 der 14 HTML-Dateien** (`link.style.color = "#ccc"`). Nur `index.html`
und `index-en.html` — die einzigen Seiten, auf denen die Funktion überhaupt ein Ziel hat —
wurden auf `#A78768` nachgezogen. Es ist der Rest einer früheren Farbfassung.

### 1.4 Bewertung

Die Palette ist **klein, warm und konsistent** — fünf Farben für eine ganze Website ist wenig
und wirkt bewusst gewählt. Das ist die stärkste Seite des aktuellen Designs.

Zwei Schwächen:

- **`#A78768` auf `#003049` erreicht ein Kontrastverhältnis von etwa 4,4 : 1.** Das reicht für
  großen Text (ab 24 px), aber **nicht** für die 14,4 px große Footer-Schrift mit
  `font-weight: 100` — dort liegt der Fußzeilentext (Management, Telefonnummer, E-Mail) unter
  dem WCAG-AA-Minimum von 4,5 : 1. Genau die Kontaktdaten sind also am schlechtesten lesbar.
- **`#E3C29E` und `#FEF1D5` sind so ähnlich**, dass die Hell/Dunkel-Alternanz im Terminkalender
  eher wie ein Fehler als wie ein Rhythmus wirkt. Sie unterscheiden sich vor allem in der
  Sättigung, kaum in der Helligkeit.

---

## 2. Typografie

### 2.1 Woher die Schriften kommen

| | |
|---|---|
| Vorgesehen | **Source Sans 3**, selbst gehostet in `fonts/` — 16 Schnitte, je `.woff` + `.woff2`, zusammen **3,4 MB** |
| Tatsächlich geladen | **keine** (siehe 0.1) |
| Tatsächlich gerendert | System-`sans-serif` |
| `font-family` global | `* { font-family: 'Source Sans 3', sans-serif; letter-spacing: -0.015em; }` — der Universalselektor setzt Schrift **und** Laufweite auf jedes Element |
| Icons | **FontAwesome 5**, lokal in `assets/webfonts/` (2,8 MB in 5 Formaten). Genutzt werden **drei** Glyphen: `fa-download` (20×), `fa-instagram` (14×), `fa-file-word` (8×). `fa-regular-400.*` wird **nie** verwendet. |
| Kein Google Fonts, kein CDN | — |

### 2.2 Schnitte

| Wert | Treffer (1440) | Wo | Bewertung |
|---|---|---|---|
| **100** | **304** | Fließtext, Navigation, Footer, Kalender | **Das ist der Standardschnitt der Website.** |
| **400** | 144 | Überschriften, Hero-Name, Zitate | |
| **700** | 46 | Ortsangaben im Kalender, einzelne Hervorhebungen | |
| 300 | 4 | `a.mail-link` | Einzelfall |

**Der wichtigste Befund der Typografie:** `font-weight: 100` (Thin) ist der meistverwendete
Wert, aber **es ist nirgends ein Thin-Schnitt deklariert.** `main.css` kennt nur die Gewichte
400, 700 und Italic. Selbst wenn die Pfade repariert wären, würde `font-weight: 100` auf
Regular 400 zurückfallen. Da die Schrift überhaupt nicht lädt, rendert der Browser derzeit die
**Systemschrift** in einem synthetisch verdünnten oder schlicht regulären Schnitt — je nach
Plattform unterschiedlich. Die Website sieht auf macOS, Windows und Android messbar
verschieden aus.

Zum Vergleich: In `fonts/` liegen `SourceSans3-ExtraLight` und `SourceSans3-Light` bereit. Sie
werden von keinem `@font-face` in `main.css` angesprochen.

### 2.3 Schriftgrößen — Desktop (1440 px)

| Größe | Zeilenhöhe | Verhältnis | Treffer | Verwendung |
|---|---|---|---|---|
| **80 px** | 72 px | 0,90 | 8 | `.name` — Hero-Schriftzug (5 em) |
| **48 px** | 28 px / 48 px | 0,58 / 1,00 | 26 | `<h2>` Seitenüberschriften; `.jahr` im Kalender |
| 40,8 px | 28 px | 0,69 | 5 | `h3.kurse-titel` („MEISTERKURSE") |
| 40 px | 28 px | 0,70 | 1 | `h3.kurse-titel-en` („MASTERCLASSES") — **0,8 px kleiner als die deutsche Fassung** |
| 24 px | 28 px | 1,17 | 2 | einzelnes `<h3>` |
| 22,4 px | 28 px | 1,25 | 2 | einzelnes `<h3>` |
| **20,8 px** | 12,48 px | **0,60** | 84 | Navigationseinträge |
| 20 px | 28 px | 1,40 | 28 | `<h3>` („NÄCHSTES KONZERT") |
| 19,2 px | 22,4–23 px | 1,17 | 20 | `.tag` — Datum im Kalender |
| 18 px | 28 px | 1,56 | 14 | `@tcakulov` im Footer |
| **16 px** | **28 px** | **1,75** | **204** | **Fließtext — der Grundwert** |
| 15,2 px | 28 px | 1,84 | 32 | Downloadbeschriftungen auf Presse |
| 14,4 px | 18 px / 28 px | 1,25 / 1,94 | 56 | Footer-Kontaktblock, Copyright |
| 12,8 px | 12,8 px | 1,00 | 12 | kleine Beschriftungen auf Media |
| 8 px | 8 px | 1,00 | 2 | Media |

**14 verschiedene Schriftgrößen** auf einer Website mit 14 Seiten.

### 2.4 Schriftgrößen — Mobil (390 px)

Die Basis-Schriftgröße sinkt von 16 px auf **14,667 px** (`html { font-size: 11pt }` unter
736 px). Alles skaliert dadurch proportional mit — es gibt fast keine eigenen mobilen
Größenangaben, sondern nur diese eine Umstellung der Wurzelgröße.

| Desktop | Mobil | Faktor | Element |
|---|---|---|---|
| 16 px | **14,667 px** | 0,917 | Fließtext |
| 48 px | 44 px | 0,917 | `<h2>` |
| 20,8 px | 19,067 px | 0,917 | Navigation (unsichtbar auf Mobil) |
| 14,4 px | 13,2 px | 0,917 | Footer |
| 80 px | — | — | `.name` ist auf Mobil `display: none` |
| — | **23,833 px** | — | `a.link.depth-0` — nur mobil: Einträge im Menü-Panel |
| — | **25,667 px** | — | `span.title` — nur mobil: „GERMAN TCAKULOV" in der Titelleiste |

**Das ist kein responsives Typografie-System, sondern eine einzige globale Verkleinerung um
8,3 %.** Konsequenz: Die `<h2>`-Überschriften bleiben mit 44 px auf einem 390 px breiten Display
sehr groß, während der Fließtext mit 14,667 px unter dem für Mobilgeräte üblichen Wert von 16 px
liegt. Das Verhältnis Überschrift zu Fließtext beträgt auf beiden Viewports 3 : 1 — auf dem
Handy wirkt das deutlich wuchtiger als auf dem Desktop.

### 2.5 Zeilenhöhen — das größte typografische Problem

Die Zeilenhöhe ist an vielen Stellen **absolut** gesetzt (`line-height: 1.75em` auf `body`
vererbt sich als **fester Pixelwert**, nicht als Faktor), statt als einheitenlose Zahl.

| Größe / Zeilenhöhe | Verhältnis | Element | Bewertung |
|---|---|---|---|
| 16 / 28 px | 1,75 | Fließtext | in Ordnung, für 16 px sogar großzügig |
| 48 / 28 px | **0,58** | `<h2>` | **Die Zeilenhöhe ist kleiner als die Schrift.** Eine zweizeilige `<h2>` würde sich selbst überlappen. |
| 40,8 / 28 px | 0,69 | „MEISTERKURSE" | dito |
| 20,8 / 12,48 px | 0,60 | Navigation | funktioniert nur, weil jeder Eintrag einzeilig ist |
| 18 / 28 px | 1,56 | Instagram-Handle | |
| 14,4 / 28 px | **1,94** | Footer-Kontaktblock | fast doppelter Durchschuss |
| 15,2 / 28 px | 1,84 | Presse-Beschriftungen | |

Der Wert **28 px** taucht in 6 verschiedenen Kombinationen auf: Er ist die geerbte
`line-height` von `body` (16 px × 1,75), die nie überschrieben wurde. Ergebnis: Bei kleinen
Schriften ist der Durchschuss zu groß, bei großen zu klein. Das ist auf den Screenshots
`1440-Presse-full.png` (Footer sehr luftig) und `1440-Lehre-viewport.png` (Überschrift eng)
gut zu sehen.

### 2.6 Laufweite (`letter-spacing`)

| Wert | Element | Herkunft |
|---|---|---|
| −0,015 em | **alles** | `* { letter-spacing: -0.015em }` — global |
| −0,24 px | Fließtext (16 px) | = −0,015 em |
| −0,72 px | `<h2>` (48 px) | = −0,015 em |
| **−4 px** | `.name` (80 px) | eigener Wert: `letter-spacing: -0.05em` |

Die globale negative Laufweite auf dem Universalselektor betrifft auch die Icon-Schrift
FontAwesome und die Navigation. Für eine sehr dünne Schrift in kleinen Größen verschlechtert
negative Laufweite die Lesbarkeit zusätzlich.

### 2.7 Weitere typografische Eigenheiten

- **`h1…h6 { text-transform: uppercase }`** global. Jede Überschrift erscheint in
  Großbuchstaben — auch die 60 Zeichen lange Portrait-Überschrift „ALLES IN BEWEGUNG UND IM
  FLUSS - EIN PORTRAIT VON FLORIAN OLTERS". Über Versalien lässt sich streiten, aber es gibt
  keine Möglichkeit, im Einzelfall davon abzuweichen.
- **`<h1>` existiert auf keiner der 14 Seiten.** Die Hierarchie beginnt auf `index.html` mit
  einem `<h3>`, danach folgt ein `<h2>`.
- **Der gesamte Fließtext ist `text-align: justify`, ohne `hyphens`.** Auf 390 px Breite bleiben
  etwa 350 px Textspalte; bei langen deutschen Komposita entstehen dadurch sehr große
  Wortabstände und einzelne fast leere Zeilen (siehe `screenshots/390-index-full.png`).
- **Absätze werden mit `<br>` gemacht, nicht mit `<p>`.** Der über 190 Zeilen lange
  Portraittext besteht aus einem einzigen Textblock mit `<br style="display: block;">`
  dazwischen — die Folge des CSS-Parse-Abbruchs aus 0.2.

---

## 3. Abstände

### 3.1 Gibt es ein System? — Nein

Gemessen über alle 14 Seiten bei 1440 px, jeder gerenderte Wert ungleich 0:

| | |
|---|---|
| **Verschiedene Margin-Werte** | **56** |
| **Verschiedene Padding-Werte** | **18** |
| Verschiedene Gap-Werte | 7 |

Die vollständige Liste der gemessenen Margins, aufsteigend:

```
-50   -48   -28,8  -20   -16   -14,4  -7,2  -4,8  -1,6
 3,2   4,8   5,12   6     6,4   8      8,8   10    10,08  10,2  10,4  10,64
11,2  14,4  16     16,8  24    26,4   30    30,4  32     34,4  34,8  35,2  37,6
39,52 42,4  43,2   45    45,36 48     50,4  53,6  56,8   60    61,6  62    63,6
64    68    70,4   74,4  80    255,625  297,734  304
```

Es gibt **kein Raster**. Kein 4er-, kein 8er-Schritt. Zwischen 30 px und 35,2 px liegen fünf
verschiedene Werte (30 / 30,4 / 32 / 34,4 / 34,8 / 35,2). Die Werte mit drei Nachkommastellen
(255,625 px, 297,734 px) sind das Ergebnis von em-Angaben auf verschachtelten Elementen mit
unterschiedlicher Schriftgröße.

### 3.2 Woher die krummen Zahlen kommen

Fast alle Abstände sind in `em` notiert (`margin-top: 2.65em`, `margin-bottom: 4.65em`,
`margin-top: 0.21em`) und beziehen sich damit auf die jeweilige lokale Schriftgröße. Weil die
Schriftgröße von Element zu Element wechselt, ergibt derselbe em-Wert an verschiedenen Stellen
verschiedene Pixel. Der Autor hat daraufhin die em-Werte einzeln nachjustiert, bis es optisch
passte — daher `2.65`, `3.15`, `3.35`, `3.75`, `3.85`, `4.65`.

**Das klarste Beispiel** ist die Trennlinie über dem Footer. Sie steht in allen 14 Dateien in
byteidentischem Markup — bis auf eine Zahl:

```
index      margin-top: 2.65em    Termine    margin-top: 1.9em
Kontakt    margin-top: 3.15em    Impressum  margin-top: 3.35em
Lehre      margin-top: 3.75em    Presse     margin-top: 3.85em
Media      margin-top: 4.65em
```

Sieben von Hand gesuchte Werte für dieselbe Linie.

### 3.3 Die Werte, die tatsächlich wiederkehren

Trotz des Wildwuchses gibt es einen kleinen Kern, der aus dem Template stammt und konsistent ist:

| Wert | Treffer | Bedeutung |
|---|---|---|
| **304 px** | 112 | Seitenrand links/rechts von `.container` → **Inhaltsbreite 832 px bei 1440 px Viewport** (= 52 em, gesetzt im `@media (max-width: 1680px)`-Block; darüber 64 em = 1024 px) |
| 31,2 px | 168 | horizontales Padding der Navigationseinträge (1,5 em) |
| 50 px | 48 | Padding der Grid-Spalten (`.col-*`) |
| 32 px | 30 | Abstand zwischen den Kalendereinträgen, `gap` im Footer |
| −50 px | 32 | negativer Margin von `.row` (Standard-Grid-Technik des Templates) |
| 24 px | 20 | Abstand unter `<h3>` |
| 16 px | 32 | Trenner im Kalender, Downloadzeilen |

### 3.4 Negative Margins als Layoutwerkzeug

19 der 56 Margin-Werte sind negativ. Zwei fallen auf:

- **`.kursname { margin-right: -3em }`** auf Termine und Lehre. Damit ragt der Kurstext über
  den Container hinaus. Auf 390 px Viewport verursacht das **horizontales Überlaufen: die
  `Lehre.html` ist 414 px breit statt 390 px** — die Seite lässt sich seitlich schieben.
- **`#platzhalter20 { margin-top: -20em !important }`** auf Termine — ein Korrekturwert von
  −320 px, der ein anderes, nicht mehr existierendes Layoutproblem ausgleichen sollte. Er
  steht in dem Block, der wegen 0.2 gar nicht mehr geparst wird.

### 3.5 Die Platzhalter-IDs

Das Layout wird an rund 25 Stellen über bedeutungslose IDs feinjustiert:
`#platzhalter1` bis `#platzhalter21`, `#kursplatzhalter1`, dazu `#help`, `#ciao`, `#handle`,
`#Fußzeile` (mit Umlaut in der ID). Sie tragen keine semantische Bedeutung — sie existieren
ausschließlich als Angriffspunkt für einen einzelnen `margin`-Wert. Ein Teil davon ist durch
den CSS-Parse-Abbruch wirkungslos, was den Zusammenhang zwischen ID und Wirkung endgültig
unauffindbar macht.

---

## 4. Rahmen, Radien, Schatten

### 4.1 Border-Radius

| Wert | Treffer | Element |
|---|---|---|
| `0 0 6px 6px` | 84 | Navigationseinträge — **untere** Ecken abgerundet. Rest der Tab-Optik des Ursprungstemplates; da die Navigation heute unten rechts schwebt, sind die Rundungen an der falschen Seite. |
| `8px` | 20 | Bilder und Container auf den Media-Seiten |

Sonst nichts. **Buttons, Karten und Downloadkacheln haben keinen Radius.**

### 4.2 Rahmen

| Wert | Treffer | Element |
|---|---|---|
| `border-top: 2px solid #A78768` | 18 | **alle `<hr>`** — die einzige Trennlinie der Website |
| `border: 1px solid #A78768` | 8 | Container auf den Media-Seiten |

### 4.3 Schatten

**Keine.** Über alle 14 Seiten und beide Viewports wurde **kein einziger `box-shadow` und kein
`text-shadow`** gemessen. Das Design arbeitet ausschließlich flächig — konsequent und stimmig
zum reduzierten Charakter der Seite.

---

## 5. Animationen und Übergänge

Vollständige Liste aller gerenderten `transition`-Werte:

| Übergang | Dauer | Timing | Treffer | Element | Wirksam? |
|---|---|---|---|---|---|
| `top` | **0,15 s** | `ease-in-out` | 84 | `li` in der Navigation — der Eintrag rutscht bei Hover um 9 px nach unten (`top: -6px` → `3px`) | ja |
| `background-color, color` | **0,075 s** | `ease-in-out` | 84 | Navigationslinks | ja, aber sehr kurz |
| `color` | **0,2 s** | `ease` | 46 | `a.mail-link`, `@tcakulov` im Footer | ja |
| `transform, color` | **0,3 s** | `ease` | 20 | `i.icon.solid` — die Download-Icons auf Presse | ja |
| `opacity` | **0,75 s** | `ease` | 10 | `.name` — Hero-Schriftzug beim Scrollen | ja |
| `max-height` | **0,6 s** | `ease` | 2 | `#vita-wrapper` — Aufklappen des Portraits | **nur teilweise** |

Es gibt **keine `@keyframes`**, keine Scroll-Animationen, kein Parallax (außer
`background-attachment: fixed`), keine Einblendeffekte beim Scrollen.

### 5.1 Vier verschiedene Dauern für dieselbe Art von Interaktion

0,075 s / 0,15 s / 0,2 s / 0,3 s — vier Werte für „Farbe oder Position ändert sich beim Hover".
0,075 s ist so kurz, dass der Übergang nicht wahrnehmbar ist; 0,3 s ist viermal so lang. Die
Timing-Funktionen wechseln zwischen `ease` und `ease-in-out` ohne erkennbares Muster.

### 5.2 Die Vita-Animation funktioniert nicht wie beabsichtigt

```css
#vita-wrapper           { max-height: 0;      transition: max-height 0.6s ease; }
#vita-wrapper.vita-expanded { max-height: 30000px; }
```

Die tatsächliche Höhe des Portraits beträgt rund 3.900 px. Der Browser animiert aber die
deklarierten 0 → 30.000 px in 600 ms. Die sichtbaren 3.900 px sind nach etwa **78 ms**
durchlaufen — die restlichen 522 ms animiert der Browser leeren Raum. Sichtbar ist ein
abruptes Aufspringen, keine Bewegung. (Gemessene Dokumenthöhe: zugeklappt 2.290 px, aufgeklappt
6.177 px.)

### 5.3 `is-preload`

`main.js` entfernt 100 ms nach `load` die Klasse `is-preload` vom `<body>`. Solange sie gesetzt
ist, gilt `body.is-preload *, body.is-preload *:before, body.is-preload *:after
{ animation: none !important; transition: none !important; }`. Das verhindert, dass Übergänge
beim Seitenaufbau aufblitzen. **Sinnvoll und funktioniert.**

---

## 6. Breakpoints

### 6.1 Alle gefundenen Grenzwerte

Aus `main.css` **und** aus den 20 `<style>`-Blöcken in den HTML-Dateien:

```
360   550   551   560   580   700   736   737   768   800
980   1000  1080  1081  1180  1280  1680
```

**17 verschiedene Pixelgrenzen.**

### 6.2 Wie sie sich verteilen

| Grenzwert | in `main.css` | in HTML-`<style>` | Bemerkung |
|---|---|---|---|
| 360 px | 3× | — | Template-Breakpoint `xsmall` |
| 550 / 551 px | — | 2× / 2× | zwei Breakpoints, die sich um 1 px unterscheiden |
| 560 px | — | 2× | |
| 580 px | — | 4× | |
| 700 px | 2× | — | |
| **736 / 737 px** | **7× / 3×** | **14× / 8×** | der meistgenutzte Umschaltpunkt (Template `small`) |
| 768 px | 1× | 3× | zusätzlich zu 736 — zwei Punkte für dieselbe Geräteklasse |
| 800 px | — | 2× | nur für die versteckten Presse-Kacheln |
| 980 px | 3× | — | Template `medium`; hier schaltet die Navigation um |
| 1000 px | — | 4× | |
| **1080 / 1081 px** | 3× | **12× / 2×** | zweiter großer Umschaltpunkt, nur in den HTML-Dateien |
| 1180 px | — | 4× | |
| 1280 px | 4× | — | Template `large` |
| 1680 px | 3× | — | Template `xlarge`; hier schaltet die Containerbreite von 64 em auf 52 em |

Zusätzlich **18 Media Queries auf `orientation: landscape`** und 2 auf `orientation: portrait`,
ausschließlich in den HTML-`<style>`-Blöcken, für die Positionierung des Hero-Bilds.

### 6.3 Die konkreten Probleme

- **Die Template-Breakpoints (360/736/980/1280/1680) und die selbst hinzugefügten
  (550/551/560/580/700/768/800/1000/1080/1081/1180) folgen zwei verschiedenen Logiken** und
  wurden nie zusammengeführt.
- **Off-by-one-Paare:** `550` **und** `551`, `736` **und** `737`, `1080` **und** `1081`. Solche
  Paare entstehen beim händischen Nachjustieren und erzeugen 1 px breite Zonen mit
  undefiniertem Verhalten.
- **Widersprüchliche Überlappung:** Es existieren gleichzeitig
  `(min-width: 736px) and (max-width: 1080px)` und
  `(min-width: 737px) and (max-width: 1080px)` sowie `(max-width: 736px)`. Bei **genau 736 px**
  greifen die `max-width: 736px`-Regeln **und** die `min-width: 736px`-Regel. Was gewinnt,
  entscheidet die Reihenfolge im Dokument.
- **Die JavaScript-Breakpoints sind eine dritte, unabhängige Definition.** `main.js` registriert
  `xsmall ≤360`, `small 361–736`, `medium 737–980`, `large 981–1280`, `xlarge 1281–1680` — und
  fragt das Ergebnis nie ab.
- `@media screen and (max-width: 1080)` in `main.css:3541` ist syntaktisch ungültig (fehlende
  Einheit) und legt die letzten 158 Zeilen der Datei still (siehe 0.2).

---

## 7. Layout-Prinzip pro Seitentyp

### Typ A — Hero + Inhalt

**Seiten:** `index`, `Termine`, `Lehre`, `Media`, `Kontakt` (je DE + EN) = 10 von 14

```
┌──────────────────────────────────────────┐
│  .bild — 100 vh                          │
│  background-image, background-size cover │
│  background-attachment: fixed            │   ← Parallax-Effekt beim Scrollen
│  ::before mit halbtransparentem Overlay  │
│                                          │
│                       GERMAN     ┐       │   .name, position: fixed
│                       TCAKULOV   ┘       │   80px, #003049, blendet bei 30 % aus
├──────────────────────────────────────────┤
│         ┌─── .container 832 px ───┐      │   Rand je 304 px
│         │                         │      │
│         │  Inhalt                 │      │
│         │                         │      │
│         └─────────────────────────┘      │
├──────────────────────────────────────────┤
│  hr (2 px #A78768)                       │
│  Instagram ◄─────────► Management-Block  │   .footer-flex, gap 32 px
│  © 2025 · Impressum & Datenschutz        │   zentriert, 14,4 px
└──────────────────────────────────────────┘
                                 ┌────────┐
                                 │  NAV   │  position: fixed, bottom 2,75 vh, right 1 vw
                                 └────────┘  liegt über allem, auch über dem Footer
```

- Der Inhaltsbereich nutzt das 12-Spalten-Grid des Templates. Tatsächlich verwendet werden nur
  `col-12`, `col-7`, `col-5`, `col-12-small`.
- Die Navigation schwebt **dauerhaft unten rechts**. Auf hellen Hero-Bildern (Termine, Lehre)
  steht cremefarbener Text auf hellem Foto — schlecht lesbar, siehe
  `screenshots/1440-Termine-viewport.png`.

### Typ B — Nur Inhalt, kein Hero

**Seiten:** `Presse`, `Impressum_Datenschutz` (je DE + EN) = 4 von 14

Der Inhalt beginnt direkt am oberen Seitenrand, ohne Bild und ohne Kopfzeile. Die schwebende
Navigation liegt über der leeren Fläche oben rechts. Dadurch wirken diese Seiten wie ein
anderer Auftritt.

### Mobil (≤ 980 px) — für beide Typen gleich

```
┌───────────────────────┐
│ ☰   GERMAN TCAKULOV   │  #titleBar, 44 px hoch, #003049
├───────────────────────┤     von main.js erzeugt aus dem versteckten #logo-Div
│  Hero (100 vh)        │
│  (kein .name)         │     .name ist display: none
├───────────────────────┤
│  Inhalt, volle Breite │     .container ohne feste Breite,
│  Padding ~24 px       │     Grid bricht auf col-12-small um
├───────────────────────┤
│  Footer, zentriert    │     .footer-flex bricht auf eine Spalte um
└───────────────────────┘
Menü:  Off-Canvas-Panel von links, 275 px breit,
       Links 23,8 px in #E3C29E, schließt bei Klick und Swipe
```

### Besonderheiten einzelner Seiten

| Seite | Layout |
|---|---|
| `Termine` / `Lehre` | Kalenderliste: `.kurs-eintrag` als Flexzeile — Datumsblock (Tag über Jahr) · 2 px Trennlinie · Kursname. `gap: 16 px`, Abstand zwischen Einträgen 32 px. |
| `Media` | Zwei Flexbox-Bereiche direkt im `style`-Attribut: 6 Galeriebilder (`flex: 1 1 30%`) und 3 Embeds (`flex: 1 1 45%`). Das Grid wird hier nicht benutzt. |
| `Presse` | Flexbox-Kacheln mit `fa-file-word`-Icon; darunter 6 Fotozeilen mit `fa-download`-Icon. Zwei visuell unterschiedliche Downloadmuster auf einer Seite. |
| `Kontakt` | Zwischen Hero und Footer stehen nur ein `<h2>` und ein Link. Kürzeste Seite: 1.333 px (Desktop), 1.041 px (Mobil). |

### Gemessene Seitenhöhen

| Seite | 1440 px | 390 px | Δ |
|---|---|---|---|
| index | 2.290 | 2.668 | +17 % |
| index-en | 2.290 | 2.616 | +14 % |
| Termine | 1.909 | **1.679** | **−12 %** |
| Termine-en | 1.909 | 1.662 | −13 % |
| Lehre | 2.342 | 2.450 | +5 % |
| Lehre-en | 2.314 | 2.398 | +4 % |
| Media | 2.852 | 3.608 | +27 % |
| Presse | 1.943 | 1.987 | +2 % |
| Kontakt | 1.333 | **1.041** | **−22 %** |
| Impressum | 2.378 | 2.990 | +26 % |
| Impressum-en | 2.126 | 2.707 | +27 % |

Auffällig sind die beiden **negativen** Werte: Auf einem 390 px breiten Display ist die Seite
**kürzer** als auf dem Desktop, obwohl der Text mehr Zeilen braucht. Bei `Kontakt` liegt das an
der kürzeren Hero-Höhe; bei `Termine` daran, dass die für Mobil gedachten Abstände im nicht
geparsten CSS-Bereich stehen — die Einträge rücken enger zusammen, als vorgesehen war.

---

## 8. Zusammenfassung: Was das aktuelle Design ausmacht

### Die Substanz

- **Fünf Farben, warm und konsistent.** `#003049` Petrolblau als Grund, `#A78768` Bronze als
  Akzent, `#FEF1D5` Creme als Text. Auf 14 Seiten durchgehalten.
- **Keine Schatten, keine Verläufe, kaum Radien.** Flächig und ruhig.
- **Große Bildflächen (100 vh) mit fixiertem Hintergrund.** Das trägt den Auftritt.
- **Sehr leichte Schrift, weiter Durchschuss im Fließtext, viel Weißraum.** Passt zum Sujet.
- **Sparsame Übergänge.** Nichts blinkt, nichts bewegt sich beim Scrollen.

### Die Widersprüche

| | |
|---|---|
| Die Hauptschrift lädt auf **keiner** Seite | Alles rendert im System-Fallback |
| `font-weight: 100` wird **304×** benutzt | Ein Thin-Schnitt ist nirgends deklariert |
| **56** verschiedene Margin-Werte | Kein Raster, kein Schritt, kein System |
| **17** Breakpoints, davon 3 Off-by-one-Paare | Zwei unvereinbare Logiken übereinander |
| **14** Schriftgrößen | Keine Skala erkennbar |
| `line-height` von `<h2>` = **0,58** | Zweizeilige Überschriften überlappen |
| **4** Übergangsdauern für dieselbe Interaktion | 0,075 s bis 0,3 s |
| Der Footer-`<hr>` hat **7** verschiedene Abstände | In sonst byteidentischem Markup |
| **158** Zeilen `main.css` werden nie geparst | Fehlendes `px` in einer Media Query |
| **507 von 673** Selektoren treffen kein Element | 75 % ungenutztes Template-CSS |
| ~**730** Inline-`style`-Attribute, ~**292** `!important` | Folge der beiden vorigen Punkte |

Das Design selbst ist nicht das Problem. Das Problem ist, dass es nirgends als System
niedergeschrieben ist: Es existiert nur als Summe von rund 730 einzelnen Entscheidungen,
verstreut über 14 Dateien.

---

## 9. Vorschlag: die Design-Tokens, die dabei herauskommen

Aus den gemessenen Werten lässt sich ein sehr kompaktes System ableiten. Es hält sich an das,
was heute schon da ist, und ersetzt nur die Zufälligkeiten:

```css
:root {
  /* Farben — unverändert übernommen */
  --grund:      #003049;   /* Hintergrund */
  --akzent:     #A78768;   /* Überschriften, Navigation, Linien */
  --akzent-2:   #E3C29E;   /* Kalender, mobile Navigation */
  --text:       #FEF1D5;   /* Fließtext */

  /* Abstände — 8er-Raster statt 56 Einzelwerten */
  --s-1: 0.5rem;  --s-2: 1rem;   --s-3: 1.5rem;  --s-4: 2rem;
  --s-6: 3rem;    --s-8: 4rem;   --s-12: 6rem;

  /* Schrift — 6 Stufen statt 14 */
  --t-xs:  0.875rem;  /* Footer, Beschriftungen */
  --t-s:   1rem;      /* Fließtext */
  --t-m:   1.25rem;   /* Navigation, h3 */
  --t-l:   2rem;      /* h2 mobil */
  --t-xl:  3rem;      /* h2 desktop */
  --t-hero: clamp(3rem, 8vw, 5rem);

  /* Zeilenhöhen — als Faktor, nicht als Pixelwert */
  --lh-eng:   1.15;   /* Überschriften */
  --lh-text:  1.65;   /* Fließtext */

  /* Übergänge — eine Dauer */
  --anim: 0.2s ease;
}
```

**Breakpoints:** zwei statt siebzehn — `48rem` (768 px, Tablet) und `64rem` (1024 px, Desktop).
Alle 17 gemessenen Grenzwerte liegen so, dass sie sich auf diese beiden abbilden lassen; die
Sonderfälle (550/551, 1080/1081, `orientation: landscape`) entstehen ausschließlich aus dem
handjustierten Hero-Bild und entfallen mit einer sauberen `object-fit`-Lösung.
