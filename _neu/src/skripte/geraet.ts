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
