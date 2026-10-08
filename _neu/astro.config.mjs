// @ts-check
import { defineConfig } from 'astro/config';
import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Verlinkt wird ohne Endung (`/Termine`). Apache findet dazu `Termine.html`
 * ueber public/.htaccess. Fuer jeden anderen Server liegt dieselbe Seite
 * zusaetzlich als `Termine/index.html` bereit – so fuehrt `/Termine` ueberall
 * zum Ziel, auch ohne Zugriff auf die Servereinstellungen.
 * Alte Adressen wie `/Termine.html` gibt es weiterhin.
 */
const ordnerFassungen = {
  name: 'ordner-fassungen',
  hooks: {
    /** @param {{ dir: URL }} p */
    'astro:build:done': async ({ dir }) => {
      const ziel = fileURLToPath(dir);
      for (const datei of await readdir(ziel)) {
        if (!datei.endsWith('.html') || datei === 'index.html' || datei === '404.html') continue;
        const ordner = path.join(ziel, datei.slice(0, -'.html'.length));
        await mkdir(ordner, { recursive: true });
        await copyFile(path.join(ziel, datei), path.join(ordner, 'index.html'));
      }
    },
  },
};

export default defineConfig({
  site: process.env.SEITE_URL ?? 'https://germantcakulov.com',
  // Auf einer Vorschau wie nutzer.github.io/vorschau/ liegt die Seite in
  // einem Unterordner; auf der echten Domain bleibt der Grundpfad leer.
  base: process.env.SEITE_BASIS ?? '/',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [ordnerFassungen],
});
