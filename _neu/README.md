# germantcakulov.com – Neubau

Statische Website, gebaut mit [Astro](https://astro.build). Der Bau erzeugt
reine HTML-Dateien ohne Laufzeitgeruest; JavaScript laeuft nur dort, wo es
etwas zu bedienen gibt (Menue, Vitatafel, Grossansicht, Terminstand, Verwaltung).

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
`Termine.html` statt `Termine/index.html`. Verlinkt wird aber ohne Endung:
`/Termine`, `/Termine-en`, die Startseite ist `/`.

Damit der Server `/Termine` als `Termine.html` ausliefert, liegt
`public/.htaccess` bei (Apache, wie unter Plesk). Sie leitet ausserdem alte
Adressen wie `/Termine.html` oder `/index.html` dauerhaft (301) auf die neue
Form um – bestehende Links und Suchmaschinen-Eintraege bleiben gueltig.
GitHub Pages loest `/Termine` von sich aus auf. Jede Seite traegt
`rel="canonical"` und `hreflang` mit der Adresse ohne Endung.

## Sprachen

Jede Seite besteht aus einem Rumpf in `src/seiten/` und zwei duennen
Dateien in `src/pages/`, die nur `sprache="de"` beziehungsweise
`sprache="en"` weiterreichen. Die Texte stehen in `src/inhalte/`.

## Stand

Der Neubau ist eine massgetreue Nachbildung der bisherigen Website. Einziger
gewollter Unterschied: Source Sans 3 wird tatsaechlich geladen – in der alten
Fassung zeigten die `@font-face`-Regeln ins Leere. Die im Konzept
beschriebenen Verbesserungen sind noch nicht umgesetzt.

## Termine und Archiv

Alle Termine stehen in `src/inhalte/termine.json`, je Eintrag zweisprachig
(`ort`, `titel`, `zusatz`, `link` jeweils mit `de` und `en`). `termine.ts`
prueft die Datei beim Bau und teilt sie auf: Was noch kommt, steht oben auf
der Terminseite, was vorbei ist, wandert nach Jahren gruppiert ins Archiv.
Massgeblich ist der letzte Tag eines Termins nach Wiener Zeit.

Weil die Seite statisch ist, sortiert zusaetzlich `skripte/terminstand.ts`
im Browser nach – so stimmt die Seite auch dann, wenn seit dem letzten Bau
ein Termin vergangen ist. Der taegliche Bau (siehe unten) holt das ohnehin nach.

## Verwaltung

`/x3afb3gg5taarxg2dvn6` ist die Eingabemaske fuer die Termine
(`src/pages/x3afb3gg5taarxg2dvn6.astro`). Die zufaellige Adresse sorgt dafuer,
dass niemand zufaellig darauf stoesst; sie ist nirgends verlinkt, steht auf
`noindex` und gibt sich ueber `no-referrer` nicht an verlinkte Seiten weiter.
Soll die Adresse wechseln, genuegt es, die Datei umzubenennen.

Der eigentliche Schutz liegt bei GitHub: Angemeldet wird mit einem
fine-grained Personal Access Token von GitHub, der nur fuer dieses eine
Repository gilt (Contents: Read and write, Actions: Read). Die Maske liest
und schreibt `termine.json` direkt ueber die GitHub-API; jeder gespeicherte
Termin ist ein Commit und loest den Bau aus, dessen Fortschritt die Maske
anzeigt. Der Schluessel bleibt nur im Browser (localStorage).

Ohne Anmeldung laesst sich alles ausprobieren; dann wird nichts gespeichert.

Repository, Zweig und Pfad kommen aus `PUBLIC_TERMINE_REPO`,
`PUBLIC_TERMINE_ZWEIG` und `PUBLIC_TERMINE_PFAD`.

## Veroeffentlichen

`.github/workflows/seite.yml` baut `_neu/` bei jeder Aenderung (also auch,
wenn die Verwaltung speichert), jede Nacht um 02:15 UTC (damit vergangene
Termine ins Archiv wandern) und auf Knopfdruck (Actions → „Seite bauen“).
Wohin das Ergebnis geht, steuern Repository-Variablen
(Settings → Secrets and variables → Actions → Variables):

- `VORSCHAU=ja` – GitHub Pages unter `<name>.github.io/<repo>/`. Der
  Grundpfad `/<repo>` wird automatisch gesetzt; `src/inhalte/pfad.ts`
  stellt ihn vor jede interne Adresse. So laeuft das Arbeits-Repository
  `cfs-at-ada/germantcakulov-neu`.
- `IN_WURZEL=ja` (ohne `VORSCHAU`) – die fertige Seite wird in die Wurzel
  des Hauptzweigs eingecheckt; von dort holt der Webserver der echten Domain
  sie ab. Es wird nur ueberschrieben und ergaenzt, nie geloescht, und nur
  eingecheckt, wenn sich etwas geaendert hat.

Ohne Variable prueft der Lauf nur, ob sich die Seite bauen laesst.

Die Verwaltung schreibt immer in das Repository, aus dem die Seite gebaut
wurde. Im Arbeits-Repository lassen sich Termine also gefahrlos testen.
