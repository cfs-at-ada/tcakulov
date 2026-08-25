import type { Sprache } from './navigation';

export interface Pressedokument {
  /** Datei im Ordner /downloads. */
  datei: string;
  /** Erste Zeile der Beschriftung – die Sprache des Dokuments. */
  zeile1: string;
  /** Zweite Zeile – Art und Laenge. */
  zeile2: string;
}

export interface Pressefoto {
  bild: string;
  archiv: string;
  /** Dateigroesse, wird nicht umbrochen. */
  groesse: string;
}

export interface Presseinhalt {
  titel: string;
  hinweis: string;
  /** Hinweistext der Kachel beim Ueberfahren. */
  kacheltitel: string;
  ladetitel: string;
  dokumente: Pressedokument[];
  fototext: string;
}

/** Reihenfolge und Dateien der Pressefotos – in beiden Sprachen gleich. */
export const pressefotos: Pressefoto[] = [
  { bild: '/images/Eins.jpg',  archiv: '/downloads/TCAKULOV-P1.zip', groesse: '(9,9 MB)' },
  { bild: '/images/Media.jpg', archiv: '/downloads/TCAKULOV-P2.zip', groesse: '(8,3 MB)' },
  { bild: '/images/Zwei.jpg',  archiv: '/downloads/TCAKULOV-P3.zip', groesse: '(9,9 MB)' },
  { bild: '/images/Funf.jpg',  archiv: '/downloads/TCAKULOV-P4.zip', groesse: '(10,0 MB)' },
  { bild: '/images/Vier.jpg',  archiv: '/downloads/TCAKULOV-P5.zip', groesse: '(9,1 MB)' },
  { bild: '/images/Sechs.jpg', archiv: '/downloads/TCAKULOV-P6.zip', groesse: '(9,1 MB)' },
];

export const presse: Record<Sprache, Presseinhalt> = {
  de: {
    titel: 'Pressebereich',
    hinweis: 'Inhalte kostenlos verwendbar, sofern die Fotografin / der Fotograf genannt wird (© im Dateinamen).',
    kacheltitel: 'Download Vita (DOCX)',
    ladetitel: 'Download',
    dokumente: [
      { datei: '/downloads/Vita-TCAKULOV-Kurz.docx',       zeile1: 'Deutsch',  zeile2: 'Profilvita Kurz' },
      { datei: '/downloads/Vita-TCAKULOV-Lang.docx',       zeile1: 'Deutsch',  zeile2: 'Profilvita Lang' },
      { datei: '/downloads/biography-TCAKULOV-short.docx', zeile1: 'Englisch', zeile2: 'Profilvita Kurz' },
      { datei: '/downloads/biography-TCAKULOV-long.docx',  zeile1: 'Englisch', zeile2: 'Profilvita Lang' },
    ],
    fototext: 'Portraitfoto - hochauflösend',
  },
  en: {
    titel: 'press area',
    hinweis: 'Content may be used free of charge provided that the photographer is credited (© in the file name).',
    kacheltitel: 'Download Vita (DOCX)',
    ladetitel: 'Download',
    dokumente: [
      { datei: '/downloads/Vita-TCAKULOV-Kurz.docx',       zeile1: 'GER', zeile2: 'biography short' },
      { datei: '/downloads/Vita-TCAKULOV-Lang.docx',       zeile1: 'GER', zeile2: 'biography long' },
      { datei: '/downloads/biography-TCAKULOV-short.docx', zeile1: 'EN',  zeile2: 'biography short' },
      { datei: '/downloads/biography-TCAKULOV-long.docx',  zeile1: 'EN',  zeile2: 'biography long' },
    ],
    fototext: 'portrait - high resolution',
  },
};
