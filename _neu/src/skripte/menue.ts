/** Vollbild-Menue der schmalen Ansicht. */

const VERZOEGERUNG = 300;

export function menueEinrichten(): void {
  const tafel = document.getElementById('menuetafel');
  const knopf = document.querySelector<HTMLAnchorElement>('.menueknopf');
  if (!tafel || !knopf) return;

  const istOffen = () => document.body.classList.contains('menue-offen');

  let wegnehmen = 0;
  tafel.classList.add('weg');

  const setzen = (offen: boolean) => {
    window.clearTimeout(wegnehmen);
    if (offen) {
      // Erst einhaengen, dann im naechsten Bild einblenden, damit der Uebergang laeuft.
      tafel.classList.remove('weg');
      void tafel.offsetHeight;
    } else {
      wegnehmen = window.setTimeout(() => tafel.classList.add('weg'), 400);
    }
    document.body.classList.toggle('menue-offen', offen);
    knopf.setAttribute('aria-expanded', String(offen));
    knopf.textContent = (offen ? knopf.dataset.offen : knopf.dataset.zu) ?? '';
    if (!offen) window.setTimeout(() => { tafel.scrollTop = 0; }, VERZOEGERUNG);
  };

  knopf.addEventListener('click', (e) => {
    e.preventDefault();
    setzen(!istOffen());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && istOffen()) {
      setzen(false);
      knopf.focus();
    }
  });

  // Ein Verweis zu einer anderen Seite laesst die Tafel stehen: Das Nachtblau
  // geht direkt in die neue Seite ueber, statt kurz die alte zu zeigen.
  // Nur eine Sprungmarke auf derselben Seite schliesst die Tafel erst.
  tafel.addEventListener('click', (e) => {
    const ziel = (e.target as HTMLElement).closest('a');
    if (!ziel) return;
    const adresse = ziel.getAttribute('href');
    if (!adresse) return;
    const neu = new URL(adresse, location.href);
    if (neu.pathname !== location.pathname) return;
    e.preventDefault();
    setzen(false);
    window.setTimeout(() => { window.location.href = adresse; }, VERZOEGERUNG);
  });

  // Beim Verlassen die Tafel sofort schliessen, damit die Seite beim
  // Zurueckblaettern aus dem Zwischenspeicher sauber dasteht.
  const sofortZu = () => {
    if (!istOffen()) return;
    tafel.style.transition = 'none';
    setzen(false);
    window.clearTimeout(wegnehmen);
    tafel.classList.add('weg');
    requestAnimationFrame(() => { tafel.style.transition = ''; });
  };
  window.addEventListener('pagehide', sofortZu);
  window.addEventListener('pageshow', (e) => { if (e.persisted) sofortZu(); });

  // Sobald der Knopf ueber dem Text statt ueber dem Bild steht, bekommt
  // er einen Grund, damit er lesbar bleibt.
  const bild = document.querySelector<HTMLElement>('.titelbild');
  const pruefen = () => {
    const grenze = bild ? bild.offsetHeight - 60 : 10;
    document.body.classList.toggle('ueber-inhalt', window.scrollY > grenze);
  };
  window.addEventListener('scroll', pruefen, { passive: true });
  window.addEventListener('resize', pruefen);
  pruefen();
}
