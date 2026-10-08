import type { APIRoute } from 'astro';

// Bewusst ohne Hinweis auf die Verwaltung – deren Adresse bleibt geheim.
// Die Vorschau (nicht germantcakulov.com) sperrt Suchmaschinen ganz aus.
export const GET: APIRoute = ({ site }) => {
  const vorschau = !site?.hostname.endsWith('germantcakulov.com');
  const text = vorschau
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap.xml`, site).href}\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
