/**
 * Die Verwaltung spricht direkt mit GitHub: Sie liest `termine.json`,
 * schreibt sie zurueck und verfolgt den Bau, den das ausloest.
 * Ein Server dazwischen gibt es nicht.
 */

export interface Zugang {
  schluessel: string;
  /** `besitzer/repository` */
  repo: string;
  zweig: string;
  pfad: string;
}

export interface Dateistand {
  inhalt: string;
  sha: string;
}

export class GithubFehler extends Error {
  constructor(public status: number, nachricht: string) {
    super(nachricht);
  }
}

const API = 'https://api.github.com';

async function anfrage<T>(zugang: Zugang, pfad: string, init: RequestInit = {}): Promise<T> {
  const antwort = await fetch(`${API}${pfad}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${zugang.schluessel}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
    cache: 'no-store',
  });
  if (!antwort.ok) {
    let text = antwort.statusText;
    try { text = (await antwort.json()).message ?? text; } catch { /* leer */ }
    throw new GithubFehler(antwort.status, text);
  }
  return antwort.status === 204 ? (undefined as T) : antwort.json();
}

// GitHub liefert Base64. `atob` allein zerlegt Umlaute, daher ueber Bytes.
const ausBase64 = (b64: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, '')), (z) => z.charCodeAt(0)));

const zuBase64 = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  let binaer = '';
  bytes.forEach((b) => { binaer += String.fromCharCode(b); });
  return btoa(binaer);
};

/** Prueft den Schluessel und liefert, wer angemeldet ist. */
export async function anmelden(zugang: Zugang): Promise<{ name: string; bild: string }> {
  const repo = await anfrage<{ permissions?: { push?: boolean } }>(zugang, `/repos/${zugang.repo}`);
  if (repo.permissions && !repo.permissions.push) {
    throw new GithubFehler(403, 'Der Schlüssel darf dieses Repository nur lesen.');
  }
  try {
    const nutzer = await anfrage<{ login: string; avatar_url: string }>(zugang, '/user');
    return { name: nutzer.login, bild: nutzer.avatar_url };
  } catch {
    return { name: zugang.repo.split('/')[0], bild: '' };
  }
}

export async function lesen(zugang: Zugang): Promise<Dateistand> {
  const datei = await anfrage<{ content: string; sha: string }>(
    zugang,
    `/repos/${zugang.repo}/contents/${zugang.pfad}?ref=${encodeURIComponent(zugang.zweig)}`,
  );
  return { inhalt: ausBase64(datei.content), sha: datei.sha };
}

/** Schreibt die Datei. Liefert den neuen Dateistand und die Kennung des Commits. */
export async function schreiben(
  zugang: Zugang,
  inhalt: string,
  sha: string,
  nachricht: string,
): Promise<{ sha: string; commit: string }> {
  const antwort = await anfrage<{ content: { sha: string }; commit: { sha: string } }>(
    zugang,
    `/repos/${zugang.repo}/contents/${zugang.pfad}`,
    {
      method: 'PUT',
      body: JSON.stringify({ message: nachricht, content: zuBase64(inhalt), sha, branch: zugang.zweig }),
    },
  );
  return { sha: antwort.content.sha, commit: antwort.commit.sha };
}

export type Baustand = 'wartet' | 'laeuft' | 'fertig' | 'fehler' | 'unbekannt';

/** Wie weit ist der Bau, den ein Commit ausgeloest hat? */
export async function baustand(zugang: Zugang, commit: string): Promise<Baustand> {
  try {
    const { workflow_runs: laeufe } = await anfrage<{
      workflow_runs: { status: string; conclusion: string | null }[];
    }>(zugang, `/repos/${zugang.repo}/actions/runs?head_sha=${commit}&per_page=5`);
    if (!laeufe.length) return 'wartet';
    if (laeufe.some((l) => l.status !== 'completed')) return 'laeuft';
    return laeufe.every((l) => l.conclusion === 'success') ? 'fertig' : 'fehler';
  } catch {
    // Ohne Leserecht auf Actions laesst sich der Bau nicht verfolgen.
    return 'unbekannt';
  }
}
