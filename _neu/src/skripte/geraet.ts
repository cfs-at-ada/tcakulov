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
  // zurueck auf den Vorlauf. Safari verwirft Bildlaufbefehle, solange der
  // Finger liegt oder die Seite noch federt; darum wird erst auf das Ende der
  // Bewegung gewartet (`scrollend`, sonst eine kurze Ruhepause) und danach
  // geprueft, ob der Befehl angekommen ist.
  let finger = false;
  let ruhe = 0;
  let pruefen = 0;
  let gleitet = false;
  const zurueck = (versuch = 0) => {
    if (finger || document.body.classList.contains('menue-offen')) return;
    if (!window.matchMedia('(orientation: portrait)').matches) return;
    const vorlauf = parseFloat(getComputedStyle(wurzel).getPropertyValue('--vorlauf')) || 0;
    if (!vorlauf || window.scrollY >= vorlauf - 1 || (gleitet && versuch === 0)) return;
    gleitet = true;
    window.scrollTo({ top: vorlauf, behavior: 'smooth' });
    window.clearTimeout(pruefen);
    pruefen = window.setTimeout(() => {
      gleitet = false;
      if (versuch < 3) zurueck(versuch + 1);
    }, 450);
  };
  const abwarten = (pause: number) => {
    window.clearTimeout(ruhe);
    ruhe = window.setTimeout(() => zurueck(), pause);
  };
  const mitEnde = 'onscrollend' in window;
  window.addEventListener('touchstart', () => {
    finger = true;
    gleitet = false;
    window.clearTimeout(ruhe);
    window.clearTimeout(pruefen);
  }, { passive: true });
  const loslassen = () => { finger = false; abwarten(mitEnde ? 300 : 150); };
  window.addEventListener('touchend', loslassen, { passive: true });
  window.addEventListener('touchcancel', loslassen, { passive: true });
  // Ruhepause nur als Rueckfall; mit `scrollend` meldet Safari das Ende selbst.
  window.addEventListener('scroll', () => { if (!finger) abwarten(mitEnde ? 300 : 150); }, { passive: true });
  if (mitEnde) window.addEventListener('scrollend', () => { if (!finger) zurueck(); });
  // Zurueck aus dem Verlauf (Safari stellt die alte Position wieder her).
  window.addEventListener('pageshow', (e) => { if (e.persisted) zurueck(); });

  // Ganz oben nimmt Safari fuer den Streifen die Grundfarbe der Seite. Steht
  // die Seite oberhalb des Vorlaufs, traegt sie darum den Ton des oberen
  // Bildrands (siehe Titelbild); dort deckt das Titelbild den ganzen Schirm.
  const anfang = () => {
    const vorlauf = parseFloat(getComputedStyle(wurzel).getPropertyValue('--vorlauf')) || 0;
    wurzel.classList.toggle('am-anfang', window.scrollY < vorlauf - 1);
  };
  anfang();
  window.addEventListener('scroll', anfang, { passive: true });
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
