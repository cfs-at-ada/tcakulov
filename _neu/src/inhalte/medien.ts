import type { Sprache } from './navigation';

export interface Galeriebild {
  datei: string;
  nachweis: string;
}

/** Die Bildergalerie der Medienseite – in beiden Sprachen gleich. */
export const galerie: Galeriebild[] = [
  { datei: '/images/Eins.jpg',  nachweis: '© Irène Zandel' },
  { datei: '/images/Zwei.jpg',  nachweis: '© Irène Zandel' },
  { datei: '/images/Media.jpg', nachweis: '© Irène Zandel' },
  { datei: '/images/Vier.jpg',  nachweis: '© Irène Zandel' },
  { datei: '/images/Funf.jpg',  nachweis: '© Irène Zandel' },
  { datei: '/images/Sechs.jpg', nachweis: '© Irène Zandel' },
];

/** Eingebettete Aufnahmen. */
export const videos = [
  'https://www.youtube-nocookie.com/embed/TYMRjLTMA64',
  'https://www.youtube-nocookie.com/embed/L2hm253HdQc',
];

export const spotifyAlbum = 'https://open.spotify.com/embed/album/2YSu8lSscziK7Jr5bgTyYl';

export const medienTexte: Record<Sprache, { titel: string; presse: string }> = {
  de: { titel: 'Media', presse: 'Pressebereich' },
  en: { titel: 'Media', presse: 'press area' },
};
