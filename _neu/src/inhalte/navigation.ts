/**
 * Navigationspunkte beider Sprachfassungen.
 * `ziel` ist die Seite, `marke` das Sprungziel, wenn der Punkt die
 * gerade geoeffnete Seite bezeichnet.
 */

export type Sprache = 'de' | 'en';

export interface Navigationspunkt {
  schluessel: Seitenschluessel;
  text: string;
  ziel: string;
}

export type Seitenschluessel =
  | 'vita' | 'termine' | 'lehre' | 'media' | 'kontakt'
  | 'presse' | 'impressum';

export const navigation: Record<Sprache, Navigationspunkt[]> = {
  de: [
    { schluessel: 'vita',    text: 'Vita',    ziel: '/index.html' },
    { schluessel: 'termine', text: 'Termine', ziel: '/Termine.html' },
    { schluessel: 'lehre',   text: 'Lehre',   ziel: '/Lehre.html' },
    { schluessel: 'media',   text: 'Media',   ziel: '/Media.html' },
    { schluessel: 'kontakt', text: 'Kontakt', ziel: '/Kontakt.html' },
  ],
  en: [
    { schluessel: 'vita',    text: 'Biography', ziel: '/index-en.html' },
    { schluessel: 'termine', text: 'Calendar',  ziel: '/Termine-en.html' },
    { schluessel: 'lehre',   text: 'Teaching',  ziel: '/Lehre-en.html' },
    { schluessel: 'media',   text: 'Media',     ziel: '/Media-en.html' },
    { schluessel: 'kontakt', text: 'Contact',   ziel: '/Kontakt-en.html' },
  ],
};

/** Gegenstueck derselben Seite in der jeweils anderen Sprache. */
export const sprachwechsel: Record<Sprache, Record<Seitenschluessel, string>> = {
  de: {
    vita: '/index-en.html',
    termine: '/Termine-en.html',
    lehre: '/Lehre-en.html',
    media: '/Media-en.html',
    kontakt: '/Kontakt-en.html',
    presse: '/Presse-en.html',
    impressum: '/Impressum_Datenschutz-en.html',
  },
  en: {
    vita: '/index.html',
    termine: '/Termine.html',
    lehre: '/Lehre.html',
    media: '/Media.html',
    kontakt: '/Kontakt.html',
    presse: '/Presse.html',
    impressum: '/Impressum_Datenschutz.html',
  },
};
