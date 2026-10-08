import type { Seitenschluessel, Sprache } from './navigation';

/**
 * Titel und Kurzbeschreibung je Seite und Sprache – fuer Suchmaschinen
 * und die Vorschau beim Teilen (WhatsApp, Mail, soziale Netzwerke).
 */
export interface Seitenangaben {
  titel: string;
  beschreibung: string;
}

const NAME = 'German Tcakulov';

export const seo: Record<Sprache, Record<Seitenschluessel, Seitenangaben>> = {
  de: {
    vita: {
      titel: `${NAME} – Bratschist`,
      beschreibung: 'German Tcakulov, Bratschist und Professor für Viola an der Universität Mozarteum Salzburg: Vita, Konzerte, Lehre und Aufnahmen.',
    },
    termine: {
      titel: `Termine – ${NAME}`,
      beschreibung: 'Konzerte, Meisterkurse und weitere Termine des Bratschisten German Tcakulov – mit Archiv vergangener Auftritte.',
    },
    lehre: {
      titel: `Lehre – ${NAME}`,
      beschreibung: 'German Tcakulov unterrichtet als Professor für Viola an der Universität Mozarteum Salzburg. Informationen zu Studium und Meisterkursen.',
    },
    media: {
      titel: `Media – ${NAME}`,
      beschreibung: 'Fotos, Videos und Aufnahmen des Bratschisten German Tcakulov.',
    },
    kontakt: {
      titel: `Kontakt – ${NAME}`,
      beschreibung: 'Kontakt zu German Tcakulov für Konzertanfragen, Unterricht und Presse.',
    },
    presse: {
      titel: `Presse – ${NAME}`,
      beschreibung: 'Pressefotos in Druckqualität und Biografien des Bratschisten German Tcakulov zum Herunterladen.',
    },
    impressum: {
      titel: `Impressum & Datenschutz – ${NAME}`,
      beschreibung: 'Impressum und Datenschutzerklärung der Website von German Tcakulov.',
    },
  },
  en: {
    vita: {
      titel: `${NAME} – Violist`,
      beschreibung: 'German Tcakulov, violist and professor of viola at the Mozarteum University Salzburg: biography, concerts, teaching and recordings.',
    },
    termine: {
      titel: `Calendar – ${NAME}`,
      beschreibung: 'Concerts, masterclasses and other dates of violist German Tcakulov – with an archive of past performances.',
    },
    lehre: {
      titel: `Teaching – ${NAME}`,
      beschreibung: 'German Tcakulov teaches as professor of viola at the Mozarteum University Salzburg. Information on studying and masterclasses.',
    },
    media: {
      titel: `Media – ${NAME}`,
      beschreibung: 'Photos, videos and recordings of violist German Tcakulov.',
    },
    kontakt: {
      titel: `Contact – ${NAME}`,
      beschreibung: 'Contact German Tcakulov for concert enquiries, teaching and press.',
    },
    presse: {
      titel: `Press – ${NAME}`,
      beschreibung: 'Print-quality press photos and biographies of violist German Tcakulov to download.',
    },
    impressum: {
      titel: `Legal Notice & Privacy – ${NAME}`,
      beschreibung: 'Legal notice and privacy policy of the website of German Tcakulov.',
    },
  },
};

/** Angaben fuer strukturierte Daten (schema.org). */
export const person = {
  name: NAME,
  beruf: { de: 'Bratschist', en: 'Violist' },
  stelle: { de: 'Professor für Viola', en: 'Professor of Viola' },
  arbeitgeber: { name: 'Universität Mozarteum Salzburg', url: 'https://www.moz.ac.at' },
  profile: [
    'https://www.instagram.com/tcakulov/',
    'https://www.moz.ac.at/en/people/string-studies/german-tcakulov',
  ],
};
