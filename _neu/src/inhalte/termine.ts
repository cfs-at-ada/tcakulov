import type { Sprache } from './navigation';

export type Ton = 'sand' | 'creme' | 'kupfer';

export interface Termin {
  tag: string;
  jahr: string;
  ton: Ton;
  ort: string;
  ziel: string;
  /** Zeilen des Verweistextes; getrennt durch einen Umbruch. */
  zeilen: string[];
}

/** Die Termine der Terminseite. */
export const termine: Record<Sprache, Termin[]> = {
  de: [
    { tag: "20.07-25.07", jahr: "2026", ton: "sand",
      ort: "Österreich, Salzburg", ziel: "https://www.moz.ac.at/de/internationale-sommerakademie#viola",
      zeilen: ["Internationale Sommerakademie", "Mozarteum Salzburg"] },
    { tag: "27.09-04.10", jahr: "2026", ton: "creme",
      ort: "England, Prussia Cove", ziel: "https://www.i-m-s.org.uk",
      zeilen: ["International Musicians Seminar", "Meisterkurs"] },
    { tag: "16. OKT", jahr: "2026", ton: "sand",
      ort: "Österreich, Wien", ziel: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/",
      zeilen: ["Konzert im Bechstein Centrum Wien", "mit Elena Nemtsova"] },
    { tag: "19. OKT", jahr: "2026", ton: "creme",
      ort: "Ungarn, Györ", ziel: "https://admissions.sze.hu/welcome",
      zeilen: ["Konzert an der SZE Universität", "mit Domonkos Csabay"] },
    { tag: "11. DEZ", jahr: "2026", ton: "sand",
      ort: "Österreich, Graz", ziel: "https://www.kug.ac.at/veranstaltungen",
      zeilen: ["Konzert an der Kunstuniversität Graz", "mit Elena Nemtsova & Stefan Schilling"] },
  ],
  en: [
    { tag: "20/07-25/07", jahr: "2026", ton: "sand",
      ort: "Austria, Salzburg", ziel: "https://www.moz.ac.at/de/internationale-sommerakademie#viola",
      zeilen: ["International Summer Academy", "Mozarteum Salzburg"] },
    { tag: "27/09-04/10", jahr: "2026", ton: "creme",
      ort: "England, Prussia Cove", ziel: "https://www.i-m-s.org.uk",
      zeilen: ["International Musicians Seminar", "Masterclass"] },
    { tag: "16 OKT", jahr: "2026", ton: "sand",
      ort: "Austria, Vienna", ziel: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/",
      zeilen: ["Concert at Bechstein Centrum Vienna", "with Elena Nemtsova"] },
    { tag: "19 OKT", jahr: "2026", ton: "creme",
      ort: "Hungary, Györ", ziel: "https://admissions.sze.hu/welcome",
      zeilen: ["Concert at SZE University", "with Domonkos Csabay"] },
    { tag: "11 DEZ", jahr: "2026", ton: "sand",
      ort: "Austria, Graz", ziel: "https://www.kug.ac.at/veranstaltungen",
      zeilen: ["Concert at Kunstuniversität Graz", "with Elena Nemtsova & Stefan Schilling"] },
  ],
};

/** Die Meisterkurse der Lehrseite. */
export const kurse: Record<Sprache, Termin[]> = {
  de: [
    { tag: "20.07-25.07", jahr: "2026", ton: "kupfer",
      ort: "Österreich, Salzburg", ziel: "https://www.moz.ac.at/de/internationale-sommerakademie#viola",
      zeilen: ["Meisterkurs am", "Mozarteum Salzburg"] },
    { tag: "27.09-04.10", jahr: "2026", ton: "kupfer",
      ort: "England, Prussia Cove", ziel: "https://www.i-m-s.org.uk",
      zeilen: ["Meisterkurs bei", "IMS Prussia Cove"] },
  ],
  en: [
    { tag: "20/07-25/07", jahr: "2026", ton: "kupfer",
      ort: "Austria, Salzburg", ziel: "https://www.moz.ac.at/en/summeracademy#viola",
      zeilen: ["Masterclass at", "Mozarteum"] },
    { tag: "27/09-04/10", jahr: "2026", ton: "kupfer",
      ort: "England, Prussia Cove", ziel: "https://www.i-m-s.org.uk",
      zeilen: ["Masterclass at", "IMS Prussia Cove"] },
  ],
};

/** Ueberschrift der Terminseite. */
export const terminTitel: Record<Sprache, string> = {
  de: "Termine",
  en: "Calendar",
};
