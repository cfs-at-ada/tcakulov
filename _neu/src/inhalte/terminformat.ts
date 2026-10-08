/**
 * Alles, was aus einem Termin abgeleitet wird: Datumszeile, Jahr,
 * vergangen oder kommend. Ohne Abhaengigkeiten, damit dieselben Regeln
 * beim Bau der Seite, im Browser und in der Verwaltung gelten.
 */

export type Sprache = 'de' | 'en';
export type Termintyp = 'konzert' | 'meisterkurs' | 'sonstiges';
export type Zweisprachig = Record<Sprache, string>;

export interface TerminDaten {
  id: string;
  /** ISO-Datum, `2026-10-16` */
  start: string;
  /** ISO-Datum bei mehrtaegigen Terminen, sonst `null` */
  ende: string | null;
  typ: Termintyp;
  ort: Zweisprachig;
  titel: Zweisprachig;
  zusatz: Zweisprachig;
  link: Zweisprachig;
  /** Beginn, `19:30`; leer, wenn unbekannt oder ganztaegig. */
  uhrzeit?: string;
  /** Programm, eine Zeile je Werk. */
  programm?: Zweisprachig;
  /** Direkter Link zum Kartenkauf fuer genau diesen Termin. */
  tickets?: string;
  /**
   * Tag der Absage, `2026-10-08`. Ein abgesagter Termin bleibt eine Woche
   * ausgegraut sichtbar, verschwindet dann und kommt nie ins Archiv.
   */
  abgesagt?: string;
}

const MONATE: Record<Sprache, string[]> = {
  de: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
  en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
};

const teile = (iso: string) => iso.split('-').map(Number) as [number, number, number];
const zwei = (n: number) => String(n).padStart(2, '0');

/**
 * Die Datumszeile ueber dem Jahr, so wie die Seite sie immer gesetzt hat:
 * einzelner Tag `16. OKT` / `16 OCT`, Zeitraum `20.07-25.07` / `20/07-25/07`.
 */
export function tagZeile(t: Pick<TerminDaten, 'start' | 'ende'>, sprache: Sprache): string {
  const [, m1, d1] = teile(t.start);
  if (!t.ende || t.ende === t.start) {
    return sprache === 'de' ? `${zwei(d1)}. ${MONATE.de[m1 - 1]}` : `${zwei(d1)} ${MONATE.en[m1 - 1]}`;
  }
  const [, m2, d2] = teile(t.ende);
  const trenner = sprache === 'de' ? '.' : '/';
  return `${zwei(d1)}${trenner}${zwei(m1)}-${zwei(d2)}${trenner}${zwei(m2)}`;
}

export function jahr(t: Pick<TerminDaten, 'start'>): string {
  return t.start.slice(0, 4);
}

/** Ausgeschriebenes Datum fuer Fliesstext: `16.10.2026` / `16/10/2026`. */
export function datumLang(t: Pick<TerminDaten, 'start' | 'ende'>, sprache: Sprache): string {
  const format = (iso: string) => {
    const [y, m, d] = teile(iso);
    return sprache === 'de' ? `${zwei(d)}.${zwei(m)}.${y}` : `${zwei(d)}/${zwei(m)}/${y}`;
  };
  return t.ende && t.ende !== t.start ? `${format(t.start)} – ${format(t.ende)}` : format(t.start);
}

/** Der letzte Tag eines Termins. */
export function letzterTag(t: Pick<TerminDaten, 'start' | 'ende'>): string {
  return t.ende ?? t.start;
}

/** Heutiges Datum als ISO-Zeichenkette, gerechnet in Wien – nicht in UTC. */
export function heute(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Vienna' }).format(new Date());
}

/** Ein Termin gilt bis einschliesslich seines letzten Tages als kommend. */
export function istVergangen(t: Pick<TerminDaten, 'start' | 'ende'>, stichtag = heute()): boolean {
  return letzterTag(t) < stichtag;
}

/** Wie lange eine Absage sichtbar bleibt. */
export const ABSAGE_TAGE = 7;

function tagePlus(iso: string, tage: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + tage);
  return d.toISOString().slice(0, 10);
}

/** Erster Tag, an dem eine Absage nicht mehr gezeigt wird. */
export function absageEndet(t: Pick<TerminDaten, 'abgesagt'>): string | null {
  return t.abgesagt ? tagePlus(t.abgesagt, ABSAGE_TAGE) : null;
}

/** Abgesagt und seit einer Woche bekannt – oder abgesagt und vorbei: weg damit. */
export function istVerschwunden(t: Pick<TerminDaten, 'start' | 'ende' | 'abgesagt'>, stichtag = heute()): boolean {
  if (!t.abgesagt) return false;
  return stichtag >= absageEndet(t)! || istVergangen(t, stichtag);
}

export const nachDatum = (a: TerminDaten, b: TerminDaten) =>
  a.start.localeCompare(b.start) || letzterTag(a).localeCompare(letzterTag(b));
