import type { APIRoute } from 'astro';
import { sprachwechsel, type Seitenschluessel } from '../inhalte/navigation';

/** Alle oeffentlichen Seiten mit ihrem Gegenstueck in der anderen Sprache. */
export const GET: APIRoute = ({ site }) => {
  const adresse = (ziel: string) => new URL(ziel, site).href;
  const seiten = Object.keys(sprachwechsel.de) as Seitenschluessel[];
  const eintraege = seiten.flatMap((seite) => {
    const de = adresse(sprachwechsel.en[seite]);
    const en = adresse(sprachwechsel.de[seite]);
    const verweise = `<xhtml:link rel="alternate" hreflang="de" href="${de}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${de}"/>`;
    return [de, en].map((loc) => `  <url><loc>${loc}</loc>${verweise}</url>`);
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${eintraege.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
