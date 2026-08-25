/** Ausfahrende Menuetafel der schmalen Ansicht. */

const VERZOEGERUNG = 510;

export function menueEinrichten(): void {
  const tafel = document.getElementById('menuetafel');
  const schalter = document.querySelector<HTMLAnchorElement>('#titelleiste .schalter');
  if (!tafel || !schalter) return;

  const setzen = (offen: boolean) => {
    document.body.classList.toggle('menue-offen', offen);
    schalter.setAttribute('aria-expanded', String(offen));
    if (!offen) window.setTimeout(() => { tafel.scrollTop = 0; }, VERZOEGERUNG);
  };

  const schliessen = () => {
    if (document.body.classList.contains('menue-offen')) setzen(false);
  };

  schalter.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setzen(!document.body.classList.contains('menue-offen'));
  });

  // Ein Verweis schliesst die Tafel erst und wechselt dann die Seite,
  // damit die Bewegung nicht abgeschnitten wird.
  tafel.addEventListener('click', (e) => {
    e.stopPropagation();
    const ziel = (e.target as HTMLElement).closest('a');
    if (!ziel) return;
    const adresse = ziel.getAttribute('href');
    if (!adresse || adresse === '#' || adresse === '#menuetafel') return;
    e.preventDefault();
    schliessen();
    window.setTimeout(() => { window.location.href = adresse; }, VERZOEGERUNG);
  });

  document.body.addEventListener('click', schliessen);
  document.body.addEventListener('touchend', schliessen);

  // Nach links wischen schliesst die Tafel.
  let startX: number | null = null;
  let startY: number | null = null;

  tafel.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  tafel.addEventListener('touchend', (e) => e.stopPropagation());

  tafel.addEventListener('touchmove', (e) => {
    e.stopPropagation();
    if (startX === null || startY === null) return;
    const dx = startX - e.touches[0].pageX;
    const dy = startY - e.touches[0].pageY;
    if (dy < 20 && dy > -20 && dx > 50) {
      startX = null;
      startY = null;
      schliessen();
    }
  });
}
