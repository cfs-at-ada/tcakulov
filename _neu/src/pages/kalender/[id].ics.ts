import type { APIRoute, GetStaticPaths } from 'astro';
import { kommende } from '../../inhalte/termine';
import type { TerminDaten } from '../../inhalte/terminformat';

/**
 * Ein Kalendereintrag (.ics) je kommendem Termin – fuer Outlook, Apple-
 * und Google-Kalender. Mit Uhrzeit zwei Stunden lang, sonst ganztaegig.
 */

export const getStaticPaths = (() =>
  kommende.filter((t) => !t.abgesagt).map((t) => ({ params: { id: t.id }, props: { t } }))
) satisfies GetStaticPaths;

const ohneStriche = (iso: string) => iso.replaceAll('-', '');

/** Der Tag nach `iso` – das Ende ganztaegiger Eintraege ist exklusiv. */
function folgetag(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** Wiener Ortszeit in UTC umrechnen, Sommerzeit inbegriffen. */
function wienNachUtc(iso: string, zeit: string): Date {
  const [h, m] = zeit.split(':').map(Number);
  const geraten = new Date(`${iso}T${zeit}:00Z`);
  const wien = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Vienna', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(geraten).split(':').map(Number);
  const abstand = (wien[0] * 60 + wien[1]) - (h * 60 + m);
  return new Date(geraten.getTime() - abstand * 60_000);
}

const utc = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** Zeichen maskieren und lange Zeilen nach RFC 5545 falten. */
const wert = (text: string) => text.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
function falten(zeile: string): string {
  const bytes = new TextEncoder().encode(zeile);
  if (bytes.length <= 74) return zeile;
  const teile: string[] = [];
  let aktuell = '';
  for (const zeichen of zeile) {
    if (new TextEncoder().encode(aktuell + zeichen).length > 73) { teile.push(aktuell); aktuell = ''; }
    aktuell += zeichen;
  }
  teile.push(aktuell);
  return teile.join('\r\n ');
}

function kalender(t: TerminDaten): string {
  const titel = [t.titel.de, t.zusatz.de].filter(Boolean).join(' – ');
  const beschreibung = [t.zusatz.de, t.programm?.de, t.tickets && `Tickets: ${t.tickets}`, t.link.de]
    .filter(Boolean).join('\n');
  const zeit = t.uhrzeit
    ? (() => {
        const beginn = wienNachUtc(t.start, t.uhrzeit);
        return [`DTSTART:${utc(beginn)}`, `DTEND:${utc(new Date(beginn.getTime() + 2 * 3600_000))}`];
      })()
    : [`DTSTART;VALUE=DATE:${ohneStriche(t.start)}`, `DTEND;VALUE=DATE:${ohneStriche(folgetag(t.ende ?? t.start))}`];

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//germantcakulov.com//Termine//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${t.id}@germantcakulov.com`,
    // Fest aus den Daten statt der Bauzeit: sonst aendert jeder naechtliche Bau die Datei.
    `DTSTAMP:${ohneStriche(t.abgesagt ?? t.start)}T000000Z`,
    ...zeit,
    `SUMMARY:${wert(`German Tcakulov: ${titel}`)}`,
    `LOCATION:${wert(t.ort.de)}`,
    beschreibung && `DESCRIPTION:${wert(beschreibung)}`,
    (t.link.de || t.tickets) && `URL:${t.link.de || t.tickets}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).map((z) => falten(z as string)).join('\r\n') + '\r\n';
}

export const GET: APIRoute = ({ props }) =>
  new Response(kalender((props as { t: TerminDaten }).t), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
