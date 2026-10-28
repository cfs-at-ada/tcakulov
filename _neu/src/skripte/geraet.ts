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

  // Zieht der Besucher die Seite ganz nach oben (etwa zum Neuladen, ohne es
  // auszuloesen), steht sie bei 0 und Safari zeigt wieder den Streifen. Kommt
  // die Seite nach dem Loslassen innerhalb des Vorlaufs zur Ruhe, gleitet sie
  // zurueck auf den Vorlauf, und zwar gleich beim Loslassen. Die Bewegung
  // laeuft selbst gesteuert Bild fuer Bild (je ein Viertel des Restwegs):
  // Safaris weicher Bildlauf startet sonst immer wieder neu und kriecht.
  // Verwirft Safari einen Schritt, weil die Seite noch federt, greift der
  // naechste.
  let finger = false;
  let lauf = 0;
  const zurueck = () => {
    window.cancelAnimationFrame(lauf);
    const schluss = performance.now() + 2000;
    const schritt = () => {
      lauf = 0;
      if (finger || document.body.classList.contains('menue-offen')) return;
      if (!window.matchMedia('(orientation: portrait)').matches) return;
      const vorlauf = parseFloat(getComputedStyle(wurzel).getPropertyValue('--vorlauf')) || 0;
      const y = Math.max(0, window.scrollY);
      if (!vorlauf || y >= vorlauf - 1 || performance.now() > schluss) return;
      const ziel = Math.min(vorlauf, y + Math.max(3, (vorlauf - y) * 0.25));
      window.scrollTo({ top: ziel, behavior: 'instant' });
      lauf = window.requestAnimationFrame(schritt);
    };
    schritt();
  };
  window.addEventListener('touchstart', () => {
    finger = true;
    window.cancelAnimationFrame(lauf);
    lauf = 0;
  }, { passive: true });
  const loslassen = () => { finger = false; zurueck(); };
  window.addEventListener('touchend', loslassen, { passive: true });
  window.addEventListener('touchcancel', loslassen, { passive: true });
  // Schwung ohne Finger, der oben ankommt.
  window.addEventListener('scroll', () => { if (!finger && !lauf) zurueck(); }, { passive: true });
  // Zurueck aus dem Verlauf (Safari stellt die alte Position wieder her).
  window.addEventListener('pageshow', (e) => { if (e.persisted) zurueck(); });
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
