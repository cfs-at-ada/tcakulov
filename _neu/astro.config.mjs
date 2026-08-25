// @ts-check
import { defineConfig } from 'astro/config';

// Die Seite wird als reines statisches Dateiwerk ausgeliefert.
// `format: 'file'` erzeugt `Termine.html` statt `Termine/index.html`,
// damit jede bestehende URL der alten Seite unveraendert weiterlebt.
export default defineConfig({
  site: 'https://germantcakulov.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
