import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

import vita from '../bilder/4.2.jpg';
import termine from '../bilder/Termine.jpg';
import lehre from '../bilder/Lehre.jpg';
import media from '../bilder/Media-spiegel.jpg';

/**
 * Alle Bilder liegen in `src/bilder/` und werden beim Bau verkleinert und
 * zusaetzlich als WebP ausgegeben. Die Originale bleiben unangetastet.
 * Die Breiten sind grosszuegig gewaehlt: Mehrere Titelbilder sind auf dem
 * Handy auf 200–250 % vergroessert, und Retina-Schirme verdoppeln den Bedarf.
 */

export const QUALITAET = 75;

export const titelbilder = { vita, termine, lehre, media, kontakt: vita } as const;
export type Titelseite = keyof typeof titelbilder;

/** Breiten der Titelbilder je Bildschirmklasse, nie groesser als das Original.
 *  Auf dem Telefon fuellt das Bild den ganzen Schirm, darum auch dort 2600. */
const TITELBREITEN = { klein: 2600, mittel: 3600, gross: 3600 } as const;

export async function titelbildFassungen(bild: ImageMetadata) {
  const fassungen: Record<string, string> = {};
  for (const [klasse, breite] of Object.entries(TITELBREITEN)) {
    const width = Math.min(breite, bild.width);
    const [webp, jpg] = await Promise.all([
      getImage({ src: bild, width, format: 'webp', quality: QUALITAET }),
      getImage({ src: bild, width, format: 'jpg', quality: QUALITAET }),
    ]);
    fassungen[`--titel-${klasse}`] =
      `image-set(url("${webp.src}") type("image/webp"), url("${jpg.src}") type("image/jpeg"))`;
    fassungen[`--titel-${klasse}-jpg`] = `url("${jpg.src}")`;
  }
  return fassungen;
}

/** Grosse Fassung fuer die Vollbildansicht. */
export async function grossansicht(bild: ImageMetadata) {
  const g = await getImage({ src: bild, width: Math.min(2400, bild.width), format: 'webp', quality: QUALITAET });
  return g.src;
}

/** Vorschaubild beim Teilen: 1200 x 630, wie es Messenger und Netzwerke erwarten. */
export function teilbild() {
  return getImage({ src: vita, width: 1200, height: 630, fit: 'cover', position: 'center', format: 'jpg', quality: QUALITAET });
}
