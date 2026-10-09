/** Vollbild-Menue der schmalen Ansicht. */

const VERZOEGERUNG = 300;

export function menueEinrichten(): void {
  const tafel = document.getElementById('menuetafel');
  const knopf = document.querySelector<HTMLAnchorElement>('.menueknopf');
  if (!tafel || !knopf) return;

  const istOffen = () => document.body.classList.contains('menue-offen');

  const setzen = (offen: boolean) => {
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

  // Ein Verweis schliesst die Tafel erst und wechselt dann die Seite,
  // damit die Bewegung nicht abgeschnitten wird.
  tafel.addEventListener('click', (e) => {
    const ziel = (e.target as HTMLElement).closest('a');
    if (!ziel) return;
    const adresse = ziel.getAttribute('href');
    if (!adresse) return;
    e.preventDefault();
    setzen(false);
    window.setTimeout(() => { window.location.href = adresse; }, VERZOEGERUNG);
  });

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
