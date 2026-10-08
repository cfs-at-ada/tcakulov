import type { ImageMetadata } from 'astro';
import type { Sprache } from './navigation';

import eins from '../bilder/Eins.jpg';
import zwei from '../bilder/Zwei.jpg';
import bank from '../bilder/Media.jpg';
import vier from '../bilder/Vier.jpg';
import fuenf from '../bilder/Funf.jpg';
import sechs from '../bilder/Sechs.jpg';
import schumann from '../bilder/videos/TYMRjLTMA64.jpg';
import enescu from '../bilder/videos/L2hm253HdQc.jpg';
import albumcover from '../bilder/videos/spotify-album.jpg';

export interface Galeriebild {
  bild: ImageMetadata;
  nachweis: string;
  alt: Record<Sprache, string>;
}

/** Die Bildergalerie der Medienseite. */
export const galerie: Galeriebild[] = [
  { bild: eins, nachweis: '© Irène Zandel', alt: {
    de: 'German Tcakulov hält seine Bratsche, Porträt zwischen Säulen',
    en: 'German Tcakulov holding his viola, portrait between columns' } },
  { bild: zwei, nachweis: '© Irène Zandel', alt: {
    de: 'German Tcakulov mit Bratsche in einem Säulengang',
    en: 'German Tcakulov with his viola in a colonnade' } },
  { bild: bank, nachweis: '© Irène Zandel', alt: {
    de: 'German Tcakulov sitzt mit Bratsche auf einer Steinbank zwischen hellen Pfeilern',
    en: 'German Tcakulov seated with his viola on a stone bench between pale pillars' } },
  { bild: vier, nachweis: '© Irène Zandel', alt: {
    de: 'German Tcakulov lehnt mit Bratsche an einer Säule in einer langen Kolonnade',
    en: 'German Tcakulov leaning against a column in a long colonnade, holding his viola' } },
  { bild: fuenf, nachweis: '© Irène Zandel', alt: {
    de: 'German Tcakulov mit Bratsche vor einer dunklen Wand mit einer Reihe von Lichtern',
    en: 'German Tcakulov with his viola in front of a dark wall with a row of lights' } },
  { bild: sechs, nachweis: '© Irène Zandel', alt: {
    de: 'German Tcakulov mit Bratsche in einem Arkadengang',
    en: 'German Tcakulov with his viola in an arcade' } },
];

export interface Einbettung {
  art: 'youtube' | 'spotify';
  quelle: string;
  titel: string;
  vorschau: ImageMetadata;
}

/**
 * Aufnahmen von YouTube und Spotify. Sie laden erst nach einem Klick –
 * vorher fliessen keine Daten zu Google oder Spotify. Die Vorschaubilder
 * liegen auf dem eigenen Server.
 */
export const videos: Einbettung[] = [
  {
    art: 'youtube',
    quelle: 'https://www.youtube-nocookie.com/embed/TYMRjLTMA64',
    titel: 'Robert Schumann: Fantasiestücke op. 73 – German Tcakulov, Nikita Volov',
    vorschau: schumann,
  },
  {
    art: 'youtube',
    quelle: 'https://www.youtube-nocookie.com/embed/L2hm253HdQc',
    titel: 'George Enescu: Konzertstück für Viola und Klavier – German Tcakulov, Nikita Volov',
    vorschau: enescu,
  },
];

export const spotifyAlbum: Einbettung = {
  art: 'spotify',
  quelle: 'https://open.spotify.com/embed/album/2YSu8lSscziK7Jr5bgTyYl',
  titel: 'Pettersson: Concerto No. 1 for Violin & String Quartet, 2 Elegies for Violin & Piano & Other Chamber Works',
  vorschau: albumcover,
};

export const medienTexte: Record<Sprache, {
  titel: string;
  presse: string;
  abspielen: string;
  hoeren: string;
  hinweis: (dienst: string) => string;
  datenschutz: string;
  grossansicht: string;
}> = {
  de: {
    titel: 'Media',
    presse: 'Pressebereich',
    abspielen: 'Video abspielen',
    hoeren: 'Album anhören',
    hinweis: (dienst) => `Erst mit dem Klick wird ${dienst} geladen; dabei werden Daten an ${dienst} übertragen.`,
    datenschutz: 'Datenschutz',
    grossansicht: 'Bild vergrößern',
  },
  en: {
    titel: 'Media',
    presse: 'press area',
    abspielen: 'Play video',
    hoeren: 'Listen to the album',
    hinweis: (dienst) => `${dienst} only loads when you click; data is then transferred to ${dienst}.`,
    datenschutz: 'Privacy',
    grossansicht: 'Enlarge image',
  },
};
