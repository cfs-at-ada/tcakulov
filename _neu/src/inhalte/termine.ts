import { z } from 'astro/zod';
import rohdaten from './termine.json';
import { heute, istVergangen, istVerschwunden, nachDatum } from './terminformat';
import type { TerminDaten } from './terminformat';
import type { Sprache } from './navigation';

/**
 * Die Termine stehen in `termine.json`. Die Verwaltung schreibt diese Datei,
 * der Bau prueft sie hier: Ein fehlendes Feld, ein unmoegliches Datum oder
 * eine kaputte Adresse bricht den Bau ab, statt online aufzufallen.
 */

const iso = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Datum im Format JJJJ-MM-TT');
const text = z.object({ de: z.string().min(1), en: z.string().min(1) });
const leer = z.object({ de: z.string(), en: z.string() });
const adresse = z.string().url().or(z.literal(''));

const schema = z
  .object({
    id: z.string().min(1),
    start: iso,
    ende: iso.nullable(),
    typ: z.enum(['konzert', 'meisterkurs', 'sonstiges']),
    ort: text,
    titel: text,
    zusatz: leer,
    link: z.object({ de: adresse, en: adresse }),
    uhrzeit: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Uhrzeit im Format HH:MM').or(z.literal('')).optional(),
    programm: leer.optional(),
    tickets: adresse.optional(),
    abgesagt: iso.optional(),
  })
  .refine((t) => !t.ende || t.ende >= t.start, 'Das Ende liegt vor dem Beginn');

const geprueft = z.array(schema).parse(rohdaten) as TerminDaten[];

const doppelt = geprueft.map((t) => t.id).filter((id, i, alle) => alle.indexOf(id) !== i);
if (doppelt.length) throw new Error(`Termin-Kennung doppelt vergeben: ${doppelt.join(', ')}`);

/** Stichtag des Baus. Im Browser rueckt ein kleines Skript nach, falls die Seite aelter ist. */
export const stichtag = heute();

export const alleTermine = [...geprueft].sort(nachDatum);
/** Kommend: noch nicht vorbei; Abgesagtes nur in seiner Woche. */
export const kommende = alleTermine.filter((t) => !istVergangen(t, stichtag) && !istVerschwunden(t, stichtag));
/** Was ins Archiv darf: alles Stattgefundene, nie Abgesagtes. */
export const archivfaehig = alleTermine.filter((t) => !t.abgesagt);
/** Das Archiv, das juengste zuerst. */
export const vergangene = archivfaehig.filter((t) => istVergangen(t, stichtag)).reverse();

/** Vergangene Termine nach Jahr, das juengste Jahr zuerst. */
export const archivNachJahr = Object.entries(
  vergangene.reduce<Record<string, TerminDaten[]>>((gruppen, t) => {
    (gruppen[t.start.slice(0, 4)] ??= []).push(t);
    return gruppen;
  }, {}),
).sort(([a], [b]) => b.localeCompare(a));

/** Das naechste Konzert fuer die Startseite – samt der folgenden, falls es verstreicht. */
export const naechsteKonzerte = kommende.filter((t) => t.typ === 'konzert' && !t.abgesagt);

/**
 * Meisterkurse fuer die Lehrseite. Stehen keine kommenden an, bleiben die
 * beiden juengsten stehen, damit die Spalte nicht leer laeuft.
 */
const kommendeKurse = kommende.filter((t) => t.typ === 'meisterkurs' && !t.abgesagt);
export const kurse = kommendeKurse.length
  ? kommendeKurse
  : vergangene.filter((t) => t.typ === 'meisterkurs').slice(0, 2).reverse();

/** Texte rund um die Terminseite. */
export const terminTexte: Record<Sprache, {
  titel: string;
  archiv: string;
  archivHinweis: (anzahl: number) => string;
  keine: string;
  naechstes: string;
  uhr: (zeit: string) => string;
  tickets: string;
  kalender: string;
  kalenderTitel: string;
  abgesagt: string;
  programm: string;
}> = {
  de: {
    titel: 'Termine',
    archiv: 'Archiv',
    archivHinweis: (n) => `${n} vergangene ${n === 1 ? 'Termin' : 'Termine'}`,
    keine: 'Neue Termine folgen in Kürze.',
    naechstes: 'NÄCHSTES KONZERT',
    uhr: (zeit) => `${zeit} Uhr`,
    tickets: 'Tickets',
    kalender: 'In den Kalender',
    kalenderTitel: 'In den eigenen Kalender eintragen (.ics)',
    abgesagt: 'Abgesagt',
    programm: 'Programm',
  },
  en: {
    titel: 'Calendar',
    archiv: 'Archive',
    archivHinweis: (n) => `${n} past ${n === 1 ? 'event' : 'events'}`,
    keine: 'New dates will be announced soon.',
    naechstes: 'upcoming concert',
    uhr: (zeit) => zeit,
    tickets: 'Tickets',
    kalender: 'Add to calendar',
    kalenderTitel: 'Add to your calendar (.ics)',
    abgesagt: 'Cancelled',
    programm: 'Programme',
  },
};
