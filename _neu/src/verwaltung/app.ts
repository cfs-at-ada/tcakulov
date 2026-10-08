import { anmelden, lesen, schreiben, baustand, GithubFehler } from './github';
import type { Zugang, Baustand } from './github';
import { vorschlagEnglisch } from './uebersetzung';
import { tagZeile, jahr, istVergangen, istVerschwunden, absageEndet, heute, nachDatum, datumLang } from '../inhalte/terminformat';
import type { TerminDaten, Termintyp, Sprache } from '../inhalte/terminformat';
import probedaten from '../inhalte/termine.json';

/* ---------------------------------------------------------------------------
   Speicher: entweder GitHub oder – im Probelauf – nur der Arbeitsspeicher.
   --------------------------------------------------------------------------- */

interface Speicher {
  probe: boolean;
  lesen(): Promise<{ inhalt: string; sha: string }>;
  schreiben(inhalt: string, sha: string, nachricht: string): Promise<{ sha: string; commit: string }>;
  baustand(commit: string): Promise<Baustand>;
}

const githubSpeicher = (z: Zugang): Speicher => ({
  probe: false,
  lesen: () => lesen(z),
  schreiben: (inhalt, sha, nachricht) => schreiben(z, inhalt, sha, nachricht),
  baustand: (commit) => baustand(z, commit),
});

function probeSpeicher(): Speicher {
  let inhalt = JSON.stringify(probedaten, null, 2);
  let zaehler = 0;
  const gestartet = new Map<string, number>();
  return {
    probe: true,
    lesen: async () => ({ inhalt, sha: String(zaehler) }),
    schreiben: async (neu) => {
      await warten(500);
      inhalt = neu;
      zaehler++;
      gestartet.set(String(zaehler), Date.now());
      return { sha: String(zaehler), commit: String(zaehler) };
    },
    baustand: async (commit) => (Date.now() - (gestartet.get(commit) ?? 0) > 2500 ? 'fertig' : 'laeuft'),
  };
}

const warten = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ---------------------------------------------------------------------------
   Zustand
   --------------------------------------------------------------------------- */

const SPEICHERSCHLUESSEL = 'gt-terminverwaltung';
const body = document.body;
const einstellung = {
  repo: body.dataset.repo!,
  zweig: body.dataset.zweig!,
  pfad: body.dataset.pfad!,
  seite: body.dataset.seite!,
};

let speicher: Speicher;
let termine: TerminDaten[] = [];
let sha = '';
let reiter: 'kommend' | 'archiv' = 'kommend';
let suchtext = '';
let bearbeitet: TerminDaten | null = null;
let vorschauSprache: Sprache = 'de';
let ungespeichert = false;
let frisch: string | null = null;

const $ = <T extends Element = HTMLElement>(sel: string, wurzel: ParentNode = document) => wurzel.querySelector<T>(sel)!;
const $$ = <T extends Element = HTMLElement>(sel: string, wurzel: ParentNode = document) => Array.from(wurzel.querySelectorAll<T>(sel));

function zeigen(ansicht: 'laden' | 'anmeldung' | 'app') {
  body.dataset.ansicht = ansicht;
}

function zugangLesen(): Zugang | null {
  try {
    const roh = localStorage.getItem(SPEICHERSCHLUESSEL);
    if (!roh) return null;
    const gespeichert = JSON.parse(roh) as Partial<Zugang>;
    if (!gespeichert.schluessel) return null;
    return { ...einstellung, ...gespeichert, zweig: einstellung.zweig, pfad: einstellung.pfad } as Zugang;
  } catch {
    return null;
  }
}

function zugangMerken(z: Zugang | null) {
  try {
    if (z) localStorage.setItem(SPEICHERSCHLUESSEL, JSON.stringify({ schluessel: z.schluessel, repo: z.repo }));
    else localStorage.removeItem(SPEICHERSCHLUESSEL);
  } catch { /* privater Modus: dann eben nur fuer diese Sitzung */ }
}

/* ---------------------------------------------------------------------------
   Anmeldung
   --------------------------------------------------------------------------- */

const anmeldeformular = $<HTMLFormElement>('[data-anmeldeformular]');
const anmeldefehler = $('[data-anmeldefehler]');

$('[data-zeigen]').addEventListener('click', (e) => {
  const feld = anmeldeformular.elements.namedItem('schluessel') as HTMLInputElement;
  const verdeckt = feld.type === 'password';
  feld.type = verdeckt ? 'text' : 'password';
  (e.currentTarget as HTMLElement).textContent = verdeckt ? 'Verbergen' : 'Zeigen';
});

anmeldeformular.addEventListener('submit', async (e) => {
  e.preventDefault();
  const daten = new FormData(anmeldeformular);
  const zugang: Zugang = {
    ...einstellung,
    schluessel: String(daten.get('schluessel')).trim(),
    repo: String(daten.get('repo') || einstellung.repo).trim(),
  };
  const knopf = $<HTMLButtonElement>('button[type="submit"]', anmeldeformular);
  knopf.disabled = true;
  anmeldefehler.hidden = true;
  try {
    await starten(zugang);
    zugangMerken(zugang);
    anmeldeformular.reset();
  } catch (fehler) {
    anmeldefehler.textContent = fehlertext(fehler, 'anmelden');
    anmeldefehler.hidden = false;
    zeigen('anmeldung');
  } finally {
    knopf.disabled = false;
  }
});

// Probelauf: dieselbe Oberflaeche, nichts verlaesst den Browser.
const probeKnopf = document.createElement('button');
probeKnopf.type = 'button';
probeKnopf.className = 'knopf knopf--leise knopf--breit';
probeKnopf.textContent = 'Ohne Anmeldung ausprobieren';
anmeldeformular.after(probeKnopf);
probeKnopf.style.marginTop = '0.75rem';
probeKnopf.addEventListener('click', async () => {
  speicher = probeSpeicher();
  await datenLaden();
  $('[data-nutzerbild]').hidden = true;
  $('[data-abmelden]').textContent = 'Probelauf beenden';
  zeigen('app');
  status('fertig', 'Probelauf', 'Änderungen werden nicht gespeichert.', 4000);
});

async function starten(zugang: Zugang) {
  zeigen('laden');
  const nutzer = await anmelden(zugang);
  speicher = githubSpeicher(zugang);
  await datenLaden();
  const bild = $<HTMLImageElement>('[data-nutzerbild]');
  if (nutzer.bild) { bild.src = nutzer.bild; bild.alt = nutzer.name; bild.title = nutzer.name; bild.hidden = false; }
  $('[data-abmelden]').textContent = 'Abmelden';
  zeigen('app');
}

$('[data-abmelden]').addEventListener('click', () => {
  if (!speicher.probe) zugangMerken(null);
  termine = [];
  zeigen('anmeldung');
});

function fehlertext(fehler: unknown, wobei: 'anmelden' | 'laden' | 'speichern'): string {
  if (fehler instanceof GithubFehler) {
    if (fehler.status === 401) return 'Der Schlüssel ist ungültig oder abgelaufen.';
    if (fehler.status === 403) return fehler.message.includes('nur lesen') ? fehler.message : 'Dem Schlüssel fehlt die Berechtigung „Contents: Read and write“.';
    if (fehler.status === 404) return wobei === 'anmelden'
      ? 'Repository nicht gefunden – oder der Schlüssel hat keinen Zugriff darauf.'
      : 'Die Termindatei wurde im Repository nicht gefunden.';
    return `GitHub meldet: ${fehler.message}`;
  }
  if (fehler instanceof SyntaxError) return 'Die Termindatei ist beschädigt und lässt sich nicht lesen.';
  return 'Keine Verbindung. Bitte prüfe das Internet und versuche es erneut.';
}

/* ---------------------------------------------------------------------------
   Laden und Speichern
   --------------------------------------------------------------------------- */

async function datenLaden() {
  const datei = await speicher.lesen();
  termine = (JSON.parse(datei.inhalt) as TerminDaten[]).sort(nachDatum);
  sha = datei.sha;
  ortslisteFuellen();
  zeichnen();
}

type Aenderung = (liste: TerminDaten[]) => TerminDaten[];

/**
 * Wendet eine Aenderung an und schreibt sie. Hat sich die Datei inzwischen
 * geaendert (anderes Geraet), wird frisch gelesen und die Aenderung erneut
 * angewandt – so geht nichts verloren.
 */
async function aendern(aenderung: Aenderung, nachricht: string) {
  for (let versuch = 0; versuch < 2; versuch++) {
    // Abgesagte Termine verschwinden eine Woche nach der Absage endgueltig.
    const neu = aenderung(structuredClone(termine)).filter((t) => !istVerschwunden(t)).sort(nachDatum);
    try {
      const ergebnis = await speicher.schreiben(`${JSON.stringify(neu, null, 2)}\n`, sha, nachricht);
      termine = neu;
      sha = ergebnis.sha;
      ortslisteFuellen();
      zeichnen();
      bauVerfolgen(ergebnis.commit);
      return;
    } catch (fehler) {
      const konflikt = fehler instanceof GithubFehler && (fehler.status === 409 || fehler.status === 422);
      if (!konflikt || versuch > 0) throw fehler;
      const datei = await speicher.lesen();
      termine = JSON.parse(datei.inhalt);
      sha = datei.sha;
    }
  }
}

let verfolgung = 0;

async function bauVerfolgen(commit: string) {
  const meine = ++verfolgung;
  status('laeuft', 'Gespeichert', 'Die Website wird aktualisiert …');
  const ende = Date.now() + 8 * 60_000;
  await warten(speicher.probe ? 600 : 5000);
  while (meine === verfolgung && Date.now() < ende) {
    const stand = await speicher.baustand(commit);
    if (stand === 'fertig') {
      status('fertig', 'Online', 'Die Änderung ist auf der Website.', 9000, einstellung.seite);
      return;
    }
    if (stand === 'fehler') {
      status('fehler', 'Bau fehlgeschlagen', 'Gespeichert, aber die Website konnte nicht neu gebaut werden.', 0);
      return;
    }
    if (stand === 'unbekannt') {
      status('fertig', 'Gespeichert', 'In wenigen Minuten auf der Website.', 7000);
      return;
    }
    await warten(speicher.probe ? 800 : 5000);
  }
}

/* ---------------------------------------------------------------------------
   Statusmeldung
   --------------------------------------------------------------------------- */

let statusUhr = 0;

function status(art: 'laeuft' | 'fertig' | 'fehler', titel: string, text: string, dauer = 0, link?: string) {
  const feld = $('[data-status]');
  $('[data-status-zeichen]').dataset.art = art;
  $('[data-status-titel]').textContent = titel;
  $('[data-status-text]').textContent = text;
  const verweis = $<HTMLAnchorElement>('[data-status-link]');
  verweis.hidden = !link;
  if (link) verweis.href = link;
  feld.hidden = false;
  window.clearTimeout(statusUhr);
  if (dauer) statusUhr = window.setTimeout(() => { feld.hidden = true; }, dauer);
}

/* ---------------------------------------------------------------------------
   Liste
   --------------------------------------------------------------------------- */

const TYPNAME: Record<Termintyp, string> = { konzert: 'Konzert', meisterkurs: 'Meisterkurs', sonstiges: 'Sonstiges' };

$$('[data-reiter]').forEach((knopf) =>
  knopf.addEventListener('click', () => {
    reiter = knopf.dataset.reiter as typeof reiter;
    $$('[data-reiter]').forEach((k) => k.setAttribute('aria-selected', String(k === knopf)));
    zeichnen();
  }),
);

$<HTMLInputElement>('[data-suche]').addEventListener('input', (e) => {
  suchtext = (e.target as HTMLInputElement).value.trim().toLowerCase();
  zeichnen();
});

function passt(t: TerminDaten) {
  if (!suchtext) return true;
  return [t.ort.de, t.ort.en, t.titel.de, t.titel.en, t.zusatz.de, t.zusatz.en, t.start, tagZeile(t, 'de')]
    .join(' ').toLowerCase().includes(suchtext);
}

function zeichnen() {
  // Abgesagte Termine kommen nie ins Archiv.
  const kommend = termine.filter((t) => !istVergangen(t) && !istVerschwunden(t));
  const archiv = termine.filter((t) => istVergangen(t) && !t.abgesagt).reverse();
  $('[data-zahl="kommend"]').textContent = String(kommend.length);
  $('[data-zahl="archiv"]').textContent = String(archiv.length);

  const sichtbar = (reiter === 'kommend' ? kommend : archiv).filter(passt);
  const liste = $('[data-liste]');
  liste.replaceChildren();
  $('[data-ladeplatz]').hidden = true;

  let letztesJahr = '';
  for (const t of sichtbar) {
    if (reiter === 'archiv' && jahr(t) !== letztesJahr) {
      letztesJahr = jahr(t);
      const trenner = document.createElement('li');
      trenner.className = 'jahrtrenner';
      trenner.textContent = letztesJahr;
      trenner.setAttribute('aria-hidden', 'true');
      liste.append(trenner);
    }
    liste.append(karte(t));
  }

  const leer = $('[data-leer]');
  leer.hidden = sichtbar.length > 0;
  $('[data-leer-titel]').textContent = suchtext
    ? 'Nichts gefunden'
    : reiter === 'kommend' ? 'Keine kommenden Termine' : 'Noch keine vergangenen Termine';
  frisch = null;
}

function karte(t: TerminDaten): HTMLLIElement {
  const li = document.createElement('li');
  const knopf = document.createElement('button');
  knopf.type = 'button';
  knopf.className = 'karte' + (t.id === frisch ? ' karte--frisch' : '') + (t.abgesagt ? ' karte--abgesagt' : '');
  knopf.setAttribute('aria-label', `${datumLang(t, 'de')}, ${t.ort.de}, ${t.titel.de} – bearbeiten`);

  const fehlt = !t.link.de && !t.abgesagt;
  knopf.innerHTML = `
    <span class="karte__datum">
      <span class="karte__tag"></span>
      <span class="karte__jahr"></span>
    </span>
    <span class="karte__strich"></span>
    <span class="karte__text">
      <span class="karte__ort"></span>
      <span class="karte__titel"></span>
    </span>
    <span class="karte__seite">
      <span class="marker"></span>
      ${t.abgesagt ? '<span class="marker marker--warnung">abgesagt</span>' : ''}
      ${fehlt ? '<span class="marker marker--warnung">ohne Link</span>' : ''}
    </span>
    <span class="karte__pfeil" aria-hidden="true"></span>`;
  $('.karte__tag', knopf).textContent = tagZeile(t, 'de');
  $('.karte__jahr', knopf).textContent = jahr(t);
  $('.karte__ort', knopf).textContent = t.ort.de;
  $('.karte__titel', knopf).textContent = [t.titel.de, t.zusatz.de].filter(Boolean).join(' · ');
  $('.marker', knopf).textContent = TYPNAME[t.typ];
  knopf.addEventListener('click', () => oeffnen(t));
  li.append(knopf);
  return li;
}

/* ---------------------------------------------------------------------------
   Bearbeiten
   --------------------------------------------------------------------------- */

const tafel = $<HTMLDialogElement>('[data-tafel]');
const formular = $<HTMLFormElement>('[data-terminformular]');
const feld = <T extends HTMLInputElement = HTMLInputElement>(name: string) => formular.elements.namedItem(name) as T;
const formularfehler = $('[data-formularfehler]');

const PAARE = ['ort', 'titel', 'zusatz'] as const;
/** Englische Felder, die noch dem Vorschlag folgen. */
const automatisch: Record<(typeof PAARE)[number], boolean> = { ort: true, titel: true, zusatz: true };

const TYPHINWEIS: Record<Termintyp, string> = {
  konzert: 'Erscheint zusätzlich auf der Startseite als „Nächstes Konzert“.',
  meisterkurs: 'Erscheint zusätzlich auf der Lehre-Seite unter den Meisterkursen.',
  sonstiges: 'Erscheint nur auf der Terminseite.',
};

$('[data-neu]').addEventListener('click', () => oeffnen(null));

function ortslisteFuellen() {
  const orte = [...new Set(termine.map((t) => t.ort.de))].sort((a, b) => a.localeCompare(b, 'de'));
  $('[data-orte]').replaceChildren(...orte.map((o) => Object.assign(document.createElement('option'), { value: o })));
}

function englischVorschlag(paar: (typeof PAARE)[number], deutsch: string): string {
  if (!deutsch.trim()) return '';
  // Ein bekannter Ort wird so uebernommen, wie er schon einmal uebersetzt wurde.
  if (paar === 'ort') {
    const bekannt = termine.find((t) => t.ort.de === deutsch.trim());
    if (bekannt) return bekannt.ort.en;
  }
  return vorschlagEnglisch(deutsch);
}

function oeffnen(t: TerminDaten | null) {
  bearbeitet = t;
  formular.reset();
  formularfehler.hidden = true;
  $$('[aria-invalid]', formular).forEach((f) => f.removeAttribute('aria-invalid'));

  $('[data-tafel-titel]').textContent = t ? 'Termin bearbeiten' : 'Neuer Termin';
  $('[data-loeschen]').hidden = !t;

  const vorlage: TerminDaten = t ?? {
    id: '', start: '', ende: null, typ: 'konzert',
    ort: { de: '', en: '' }, titel: { de: '', en: '' }, zusatz: { de: '', en: '' }, link: { de: '', en: '' },
  };
  feld('uhrzeit').value = vorlage.uhrzeit ?? '';
  feld('programm_de').value = vorlage.programm?.de ?? '';
  feld('programm_en').value = vorlage.programm && vorlage.programm.en !== vorlage.programm.de ? vorlage.programm.en : '';
  feld('tickets').value = vorlage.tickets ?? '';
  feld('abgesagt').checked = Boolean(vorlage.abgesagt);

  (formular.querySelector(`input[name="typ"][value="${vorlage.typ}"]`) as HTMLInputElement).checked = true;
  feld('start').value = vorlage.start;
  feld('mehrtaegig').checked = Boolean(vorlage.ende && vorlage.ende !== vorlage.start);
  feld('ende').value = vorlage.ende ?? '';
  for (const paar of PAARE) {
    feld(`${paar}_de`).value = vorlage[paar].de;
    feld(`${paar}_en`).value = vorlage[paar].en;
    automatisch[paar] = !t || vorlage[paar].en === englischVorschlag(paar, vorlage[paar].de);
  }
  feld('link_de').value = vorlage.link.de;
  const eigenerLink = Boolean(vorlage.link.en && vorlage.link.en !== vorlage.link.de);
  feld('eigener_link_en').checked = eigenerLink;
  feld('link_en').value = eigenerLink ? vorlage.link.en : '';

  abhaengigeFelder();
  vorschauZeichnen();
  ungespeichert = false;
  tafel.showModal();
  $('.tafel__rumpf', tafel).scrollTop = 0;
  if (!t && window.matchMedia('(min-width: 561px)').matches) feld('start').focus();
}

function abhaengigeFelder() {
  const typ = (formular.querySelector('input[name="typ"]:checked') as HTMLInputElement).value as Termintyp;
  $('[data-typhinweis]').textContent = TYPHINWEIS[typ];

  const mehrtaegig = feld('mehrtaegig').checked;
  $('[data-endfeld]').hidden = !mehrtaegig;
  feld('ende').min = feld('start').value;
  if (mehrtaegig && !feld('ende').value) feld('ende').value = feld('start').value;

  $('[data-link-en]').hidden = !feld('eigener_link_en').checked;

  const absage = absageDatum();
  const endet = absage ? absageEndet({ abgesagt: absage })! : null;
  $('[data-absagehinweis]').textContent = endet
    ? `Wird ausgegraut mit „Abgesagt“ / „Cancelled“ angezeigt und verschwindet am ${datumLang({ start: endet, ende: null }, 'de')} von selbst – nicht im Archiv.`
    : 'Ein abgesagter Termin bleibt eine Woche lang ausgegraut mit dem Hinweis „Abgesagt“ sichtbar. Danach verschwindet er von selbst – auch aus dem Archiv.';

  for (const paar of PAARE) {
    $(`[data-auto-hinweis="${paar}_en"]`).hidden = !automatisch[paar] || !feld(`${paar}_en`).value;
  }
}

formular.addEventListener('input', (e) => {
  const ziel = e.target as HTMLInputElement;
  ungespeichert = true;
  ziel.removeAttribute('aria-invalid');

  const [paar, sprache] = ziel.name.split('_') as [(typeof PAARE)[number], string];
  if ((PAARE as readonly string[]).includes(paar)) {
    if (sprache === 'de' && automatisch[paar]) feld(`${paar}_en`).value = englischVorschlag(paar, ziel.value);
    if (sprache === 'en') automatisch[paar] = ziel.value.trim() === '';
  }
  abhaengigeFelder();
  vorschauZeichnen();
});

formular.addEventListener('change', () => { abhaengigeFelder(); vorschauZeichnen(); });

/** Datum der Absage: ein schon abgesagter Termin behaelt seines, sonst heute. */
function absageDatum(): string | undefined {
  if (!feld('abgesagt').checked) return undefined;
  return bearbeitet?.abgesagt ?? heute();
}

/** Ein Werk pro Zeile, leere Zeilen fallen weg. */
const zeilen = (text: string) => text.split('\n').map((z) => z.trim()).filter(Boolean).join('\n');

function ausFormular(): TerminDaten {
  const typ = (formular.querySelector('input[name="typ"]:checked') as HTMLInputElement).value as Termintyp;
  const wert = (name: string) => feld(name).value.trim();
  const start = wert('start');
  const ende = feld('mehrtaegig').checked && wert('ende') && wert('ende') !== start ? wert('ende') : null;
  const linkDe = wert('link_de');
  const linkEn = feld('eigener_link_en').checked ? wert('link_en') || linkDe : linkDe;
  const termin: TerminDaten = {
    id: bearbeitet?.id ?? '',
    start,
    ende,
    typ,
    ort: { de: wert('ort_de'), en: wert('ort_en') || wert('ort_de') },
    titel: { de: wert('titel_de'), en: wert('titel_en') || wert('titel_de') },
    zusatz: { de: wert('zusatz_de'), en: wert('zusatz_en') || wert('zusatz_de') },
    link: { de: linkDe, en: linkEn },
  };
  const uhrzeit = wert('uhrzeit');
  if (uhrzeit) termin.uhrzeit = uhrzeit.slice(0, 5);
  const programmDe = zeilen(feld('programm_de').value);
  const programmEn = zeilen(feld('programm_en').value);
  if (programmDe || programmEn) termin.programm = { de: programmDe || programmEn, en: programmEn || programmDe };
  const tickets = wert('tickets');
  if (tickets) termin.tickets = tickets;
  const abgesagt = absageDatum();
  if (abgesagt) termin.abgesagt = abgesagt;
  return termin;
}

/* Vorschau */

$$('[data-vorschau-sprache]').forEach((knopf) =>
  knopf.addEventListener('click', () => {
    vorschauSprache = knopf.dataset.vorschauSprache as Sprache;
    $$('[data-vorschau-sprache]').forEach((k) => k.setAttribute('aria-pressed', String(k === knopf)));
    vorschauZeichnen();
  }),
);

function vorschauZeichnen() {
  const t = ausFormular();
  const s = vorschauSprache;
  const kasten = $('[data-vorschau]');
  const platzhalter = (text: string, ersatz: string) => text || `<span class="vorschau-termin__leer">${ersatz}</span>`;
  const sicher = (text: string) => text.replace(/[&<>"]/g, (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]!);

  const uhr = t.uhrzeit ? (s === 'de' ? ` · ${t.uhrzeit} Uhr` : ` · ${t.uhrzeit}`) : '';
  const programm = t.programm?.[s] ? `<span class="vorschau-termin__programm">${sicher(t.programm[s])}</span>` : '';
  const vermerk = t.abgesagt ? `<span class="vorschau-termin__vermerk">${s === 'de' ? 'Abgesagt' : 'Cancelled'}</span>` : '';

  kasten.innerHTML = `
    <div class="vorschau-termin${t.abgesagt ? ' vorschau-termin--abgesagt' : ''}">
      <div class="vorschau-termin__datum">
        <span class="vorschau-termin__tag">${t.start ? tagZeile(t, s) : '<span class="vorschau-termin__leer">TT. MMM</span>'}</span>
        <span class="vorschau-termin__jahr">${t.start ? jahr(t) : '<span class="vorschau-termin__leer">JJJJ</span>'}</span>
      </div>
      <div class="vorschau-termin__strich"></div>
      <div class="vorschau-termin__text">
        <span class="vorschau-termin__ort">${platzhalter(sicher(t.ort[s]), s === 'de' ? 'Land, Stadt' : 'Country, City')}${uhr}</span>
        ${platzhalter(sicher(t.titel[s]), s === 'de' ? 'Erste Zeile' : 'First line')}
        ${t.zusatz[s] ? `<br>${sicher(t.zusatz[s])}` : ''}
        ${programm}
      </div>
      ${vermerk}
    </div>`;
}

/* Pruefen und Speichern */

function pruefen(t: TerminDaten): string | null {
  const markieren = (name: string) => feld(name).setAttribute('aria-invalid', 'true');
  const fehler: string[] = [];
  if (!t.start) { markieren('start'); fehler.push('ein Datum'); }
  if (!t.ort.de) { markieren('ort_de'); fehler.push('den Ort'); }
  if (!t.titel.de) { markieren('titel_de'); fehler.push('die erste Zeile'); }
  if (fehler.length) return `Es fehlt noch ${fehler.join(', ').replace(/, ([^,]*)$/, ' und $1')}.`;

  if (t.ende && t.ende < t.start) { markieren('ende'); return 'Das Ende liegt vor dem Beginn.'; }
  const istAdresse = (a: string) => { try { return /^https?:$/.test(new URL(a).protocol); } catch { return false; } };
  if (t.link.de && !istAdresse(t.link.de)) { markieren('link_de'); return 'Die Adresse muss mit https:// beginnen.'; }
  if (t.link.en && !istAdresse(t.link.en)) { markieren('link_en'); return 'Die englische Adresse muss mit https:// beginnen.'; }
  if (t.tickets && !istAdresse(t.tickets)) { markieren('tickets'); return 'Der Ticket-Link muss mit https:// beginnen.'; }
  return null;
}

function neueKennung(t: TerminDaten): string {
  const stadt = (t.ort.de.split(',').pop() ?? 'termin').trim().toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'termin';
  const basis = `${t.start}-${stadt}`;
  let kennung = basis;
  for (let i = 2; termine.some((x) => x.id === kennung); i++) kennung = `${basis}-${i}`;
  return kennung;
}

formular.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Ein Link ohne Schema ist fast immer gemeint: „www.…“ → „https://www.…“
  for (const name of ['link_de', 'link_en', 'tickets']) {
    const f = feld(name);
    if (f.value.trim() && !/^[a-z]+:\/\//i.test(f.value.trim())) f.value = `https://${f.value.trim()}`;
  }

  const t = ausFormular();
  const problem = pruefen(t);
  if (problem) {
    formularfehler.textContent = problem;
    formularfehler.hidden = false;
    formularfehler.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    $<HTMLInputElement>('[aria-invalid="true"]', formular)?.focus({ preventScroll: true });
    return;
  }

  const war = bearbeitet;
  if (!war) t.id = neueKennung(t);
  const knopf = $<HTMLButtonElement>('[data-speichern]');
  knopf.disabled = true;
  knopf.textContent = 'Speichert …';
  try {
    await aendern(
      (liste) => (war ? liste.map((x) => (x.id === war.id ? t : x)) : [...liste, t]),
      `${war ? 'Termin geändert' : 'Neuer Termin'}: ${datumLang(t, 'de')} ${t.ort.de}`,
    );
    ungespeichert = false;
    frisch = t.id;
    // Gleich dorthin, wo der Termin jetzt steht
    const neuerReiter = istVergangen(t) && !t.abgesagt ? 'archiv' : 'kommend';
    if (neuerReiter !== reiter) $(`[data-reiter="${neuerReiter}"]`).click();
    else zeichnen();
    tafel.close();
  } catch (fehler) {
    formularfehler.textContent = fehlertext(fehler, 'speichern');
    formularfehler.hidden = false;
  } finally {
    knopf.disabled = false;
    knopf.textContent = 'Speichern';
  }
});

/* Loeschen */

const rueckfrage = $<HTMLDialogElement>('[data-rueckfrage]');

$('[data-loeschen]').addEventListener('click', () => {
  if (!bearbeitet) return;
  $('[data-rueckfrage-text]').textContent =
    `„${bearbeitet.titel.de}“ am ${datumLang(bearbeitet, 'de')} verschwindet von der Website – auch aus dem Archiv.`;
  rueckfrage.returnValue = '';
  rueckfrage.showModal();
});

rueckfrage.addEventListener('close', async () => {
  if (rueckfrage.returnValue !== 'ja' || !bearbeitet) return;
  const weg = bearbeitet;
  const knopf = $<HTMLButtonElement>('[data-loeschen]');
  knopf.disabled = true;
  try {
    await aendern((liste) => liste.filter((x) => x.id !== weg.id), `Termin gelöscht: ${datumLang(weg, 'de')} ${weg.ort.de}`);
    ungespeichert = false;
    tafel.close();
  } catch (fehler) {
    formularfehler.textContent = fehlertext(fehler, 'speichern');
    formularfehler.hidden = false;
  } finally {
    knopf.disabled = false;
  }
});

/* Schliessen – mit Rueckfrage, wenn etwas ungespeichert ist */

function schliessenVersuchen() {
  if (ungespeichert && !window.confirm('Änderungen verwerfen?')) return;
  ungespeichert = false;
  tafel.close();
}

$$('[data-schliessen]').forEach((k) => k.addEventListener('click', schliessenVersuchen));
tafel.addEventListener('cancel', (e) => { e.preventDefault(); schliessenVersuchen(); });
tafel.addEventListener('click', (e) => { if (e.target === tafel) schliessenVersuchen(); });

window.addEventListener('beforeunload', (e) => {
  if (ungespeichert && tafel.open) e.preventDefault();
});

/* ---------------------------------------------------------------------------
   Start
   --------------------------------------------------------------------------- */

(async () => {
  const zugang = zugangLesen();
  if (!zugang) return zeigen('anmeldung');
  try {
    await starten(zugang);
  } catch (fehler) {
    anmeldefehler.textContent = fehlertext(fehler, 'anmelden');
    anmeldefehler.hidden = false;
    if (fehler instanceof GithubFehler && fehler.status === 401) zugangMerken(null);
    zeigen('anmeldung');
  }
})();
