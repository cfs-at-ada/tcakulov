# germantcakulov.com – Neubau

Statische Website, gebaut mit [Astro](https://astro.build). Der Bau erzeugt
reine HTML-Dateien ohne Laufzeitgeruest; JavaScript laeuft nur dort, wo es
etwas zu bedienen gibt (Menue, Vitatafel, Grossansicht).

## Arbeiten

```bash
npm install
npm run dev       # Entwicklungsserver auf http://localhost:4321
npm run build     # Erzeugt ./dist
npm run preview   # Zeigt ./dist an
```

## Aufbau

```
public/            Dateien, die unveraendert ausgeliefert werden
  assets/css/      Font Awesome (nur die Stilvorlage)
  assets/webfonts/ Font Awesome, woff und woff2
  fonts/           Source Sans 3 – Regular, Bold, Italic
  images/          Bilder
  downloads/       Pressedateien
src/
  inhalte/         Alle Texte und Daten, nach Seiten getrennt
  styles/          tokens · schriften · basis · layout · elemente
  components/      Wiederverwendbare Bausteine
  layouts/         Grundgeruest – Kopf, Navigation, Fusszeile
  seiten/          Der Rumpf je Seite, zweisprachig ueber eine Eigenschaft
  pages/           Die 14 Adressen; jede reicht nur die Sprache weiter
  skripte/         Verhalten, gebuendelt und einmal im Grundgeruest geladen
```

## Adressen

`astro.config.mjs` setzt `build.format: 'file'`. Dadurch entsteht
`Termine.html` statt `Termine/index.html`, und jede bisherige Adresse der
Website bleibt unveraendert gueltig.

## Sprachen

Jede Seite besteht aus einem Rumpf in `src/seiten/` und zwei duennen
Dateien in `src/pages/`, die nur `sprache="de"` beziehungsweise
`sprache="en"` weiterreichen. Die Texte stehen in `src/inhalte/`.

## Stand

Der Neubau ist eine massgetreue Nachbildung der bisherigen Website. Einziger
gewollter Unterschied: Source Sans 3 wird tatsaechlich geladen – in der alten
Fassung zeigten die `@font-face`-Regeln ins Leere. Die im Konzept
beschriebenen Verbesserungen sind noch nicht umgesetzt.
