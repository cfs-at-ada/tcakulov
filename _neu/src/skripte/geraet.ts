/**
 * Kennzeichnet Tablet und Telefon am <html>. Auf beiden traegt
 * `background-attachment: fixed` nicht, deshalb brauchen die Titelbilder
 * dort einen eigenen Ausschnitt.
 */
export function geraetKennzeichnen(): void {
  const wurzel = document.documentElement;

  const istTablet =
    /iPad/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (istTablet) wurzel.classList.add('is-ipad');

  if (/Mobi|Android|iPhone|iPod|IEMobile|Opera Mini|BlackBerry/.test(navigator.userAgent)) {
    wurzel.classList.add('is-mobile');
  }
}

/** Gibt Uebergaenge frei, sobald die Seite steht. */
export function uebergaengeFreigeben(): void {
  window.addEventListener('load', () => {
    window.setTimeout(() => document.body.classList.remove('is-preload'), 100);
  });
}

/**
 * Telefon hochkant: Safari zeigt Seiteninhalt hinter der Uhrzeit erst, wenn
 * die Seite ein Stueck gescrollt ist. Das Titelbild ragt darum um einen
 * Vorlauf nach oben (siehe `--vorlauf` im Titelbild), und die Seite startet
 * um genau diesen Vorlauf gescrollt. So laeuft das Foto bis unter die
 * Statusleiste, ohne einfarbigen Streifen.
 */
export function vorlaufEinrichten(): void {
  const wurzel = document.documentElement;
  if (!wurzel.classList.contains('is-mobile') || !document.querySelector('.titelbild')) return;
  // Sobald der Besucher selbst blaettert, wird nicht mehr nachgefasst.
  let beruehrt = false;
  for (const art of ['touchstart', 'wheel', 'keydown']) {
    window.addEventListener(art, () => { beruehrt = true; }, { once: true, passive: true });
  }
  const springen = () => {
    if (beruehrt || window.scrollY !== 0 || location.hash || !window.matchMedia('(orientation: portrait)').matches) return;
    const vorlauf = parseFloat(getComputedStyle(wurzel).getPropertyValue('--vorlauf')) || 0;
    // Sofort, nicht weich: `scroll-behavior: smooth` laesst den Sprung sonst
    // als Bewegung laufen, die abbrechen kann.
    if (vorlauf) window.scrollTo({ top: vorlauf, behavior: 'instant' });
  };
  // Sofort springen, nicht erst nach dem Laden der Bilder: sonst steht bis
  // dahin der einfarbige Streifen unter der Uhrzeit. Nach dem Laden noch
  // einige Bilder lang, falls Safari den Sprung verworfen hat.
  springen();
  window.addEventListener('load', () => {
    let bilder = 0;
    const nachfassen = () => {
      springen();
      if (window.scrollY === 0 && ++bilder < 20) requestAnimationFrame(nachfassen);
    };
    nachfassen();
  });
}

/**
 * Haelt die Hoehe des Titelbilds auf dem Telefon fest. Safari blendet beim
 * Blaettern Adress- und Werkzeugleiste ein und aus; haengt die Hoehe an der
 * Fenstergroesse, springt das Bild dabei und der Name wandert mit. Neu
 * gemessen wird auf Touch-Geraeten nur, wenn sich die Breite aendert
 * (Drehen des Geraets); am Rechner folgt die Hoehe dem Fenster.
 */
export function titelhoeheFestlegen(): void {
  const wurzel = document.documentElement;
  const touch = window.matchMedia('(pointer: coarse)').matches;
  let breite = 0;
  const messen = () => {
    if (touch && window.innerWidth === breite) return;
    breite = window.innerWidth;
    wurzel.style.setProperty('--titel-hoehe', `${window.innerHeight}px`);
  };
  messen();
  window.addEventListener('resize', messen);
}
