import { pfad } from './pfad';
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
    { schluessel: 'vita',    text: 'Vita',    ziel: pfad('/') },
    { schluessel: 'termine', text: 'Termine', ziel: pfad('/Termine') },
    { schluessel: 'lehre',   text: 'Lehre',   ziel: pfad('/Lehre') },
    { schluessel: 'media',   text: 'Media',   ziel: pfad('/Media') },
    { schluessel: 'kontakt', text: 'Kontakt', ziel: pfad('/Kontakt') },
  ],
  en: [
    { schluessel: 'vita',    text: 'Biography', ziel: pfad('/index-en') },
    { schluessel: 'termine', text: 'Calendar',  ziel: pfad('/Termine-en') },
    { schluessel: 'lehre',   text: 'Teaching',  ziel: pfad('/Lehre-en') },
    { schluessel: 'media',   text: 'Media',     ziel: pfad('/Media-en') },
    { schluessel: 'kontakt', text: 'Contact',   ziel: pfad('/Kontakt-en') },
  ],
};

/** Gegenstueck derselben Seite in der jeweils anderen Sprache. */
export const sprachwechsel: Record<Sprache, Record<Seitenschluessel, string>> = {
  de: {
    vita: pfad('/index-en'),
    termine: pfad('/Termine-en'),
    lehre: pfad('/Lehre-en'),
    media: pfad('/Media-en'),
    kontakt: pfad('/Kontakt-en'),
    presse: pfad('/Presse-en'),
    impressum: pfad('/Impressum_Datenschutz-en'),
  },
  en: {
    vita: pfad('/'),
    termine: pfad('/Termine'),
    lehre: pfad('/Lehre'),
    media: pfad('/Media'),
    kontakt: pfad('/Kontakt'),
    presse: pfad('/Presse'),
    impressum: pfad('/Impressum_Datenschutz'),
  },
};
