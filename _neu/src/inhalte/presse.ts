import type { ImageMetadata } from 'astro';
import { pfad } from './pfad';
import eins from '../bilder/Eins.jpg';
import zwei from '../bilder/Zwei.jpg';
import bank from '../bilder/Media.jpg';
import vier from '../bilder/Vier.jpg';
import fuenf from '../bilder/Funf.jpg';
import sechs from '../bilder/Sechs.jpg';
import kurzbioDe from './texte/kurzbio-de.txt?raw';
import kurzbioEn from './texte/kurzbio-en.txt?raw';
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
  bild: ImageMetadata;
  archiv: string;
  nachweis: string;
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
  fotoformat: string;
  bioTitel: string;
  bioStand: string;
  kopieren: string;
  kopiert: string;
  kurzbio: string;
}

/** Absaetze einer Textdatei. */
const absaetze = (text: string) => text.trim().split(/\n+/).join('\n\n');

/** Reihenfolge und Dateien der Pressefotos – in beiden Sprachen gleich. */
export const pressefotos: Pressefoto[] = [
  { bild: eins, nachweis: '© Irène Zandel', archiv: pfad('/downloads/TCAKULOV-P1.zip'), groesse: '(9,9 MB)' },
  { bild: bank, nachweis: '© Irène Zandel', archiv: pfad('/downloads/TCAKULOV-P2.zip'), groesse: '(8,3 MB)' },
  { bild: zwei, nachweis: '© Irène Zandel', archiv: pfad('/downloads/TCAKULOV-P3.zip'), groesse: '(9,9 MB)' },
  { bild: fuenf, nachweis: '© Irène Zandel', archiv: pfad('/downloads/TCAKULOV-P4.zip'), groesse: '(10,0 MB)' },
  { bild: vier, nachweis: '© Irène Zandel', archiv: pfad('/downloads/TCAKULOV-P5.zip'), groesse: '(9,1 MB)' },
  { bild: sechs, nachweis: '© Irène Zandel', archiv: pfad('/downloads/TCAKULOV-P6.zip'), groesse: '(9,1 MB)' },
];

export const presse: Record<Sprache, Presseinhalt> = {
  de: {
    titel: 'Pressebereich',
    hinweis: 'Texte und Fotos dürfen für die Berichterstattung über German Tcakulov kostenlos verwendet werden, sofern der Bildnachweis genannt wird.',
    kacheltitel: 'Download Vita (DOCX)',
    ladetitel: 'Download',
    dokumente: [
      { datei: pfad('/downloads/Vita-TCAKULOV-Kurz.docx'),       zeile1: 'Deutsch',  zeile2: 'Profilvita Kurz' },
      { datei: pfad('/downloads/Vita-TCAKULOV-Lang.docx'),       zeile1: 'Deutsch',  zeile2: 'Profilvita Lang' },
      { datei: pfad('/downloads/biography-TCAKULOV-short.docx'), zeile1: 'Englisch', zeile2: 'Profilvita Kurz' },
      { datei: pfad('/downloads/biography-TCAKULOV-long.docx'),  zeile1: 'Englisch', zeile2: 'Profilvita Lang' },
    ],
    fototext: 'Porträtfoto – hochauflösend',
    fotoformat: 'JPG in ZIP',
    bioTitel: 'Kurzbiografie',
    bioStand: 'Stand: Juli 2025',
    kopieren: 'Text kopieren',
    kopiert: 'Kopiert',
    kurzbio: absaetze(kurzbioDe),
  },
  en: {
    titel: 'press area',
    hinweis: 'Texts and photos may be used free of charge for reporting on German Tcakulov, provided the photo credit is given.',
    kacheltitel: 'Download Vita (DOCX)',
    ladetitel: 'Download',
    dokumente: [
      { datei: pfad('/downloads/Vita-TCAKULOV-Kurz.docx'),       zeile1: 'GER', zeile2: 'biography short' },
      { datei: pfad('/downloads/Vita-TCAKULOV-Lang.docx'),       zeile1: 'GER', zeile2: 'biography long' },
      { datei: pfad('/downloads/biography-TCAKULOV-short.docx'), zeile1: 'EN',  zeile2: 'biography short' },
      { datei: pfad('/downloads/biography-TCAKULOV-long.docx'),  zeile1: 'EN',  zeile2: 'biography long' },
    ],
    fototext: 'portrait – high resolution',
    fotoformat: 'JPG in ZIP',
    bioTitel: 'Short biography',
    bioStand: 'As of July 2025',
    kopieren: 'Copy text',
    kopiert: 'Copied',
    kurzbio: absaetze(kurzbioEn),
  },
};
