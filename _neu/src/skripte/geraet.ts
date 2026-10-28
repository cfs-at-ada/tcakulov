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

  // Oben ist beim Vorlauf Schluss, nicht bei 0: Bei 0 zeigt Safari wieder
  // den Streifen unter der Uhrzeit. Zieht der Finger an dieser Grenze nach
  // unten, wird die Geste gar nicht erst zum Bildlauf (so entscheidet iOS
  // beim ersten Zug). Das Federn an der echten Oberkante ist per CSS aus
  // (`overscroll-behavior`, siehe Titelbild); Safari verwirft sonst
  // Bildlaufbefehle, solange die Seite federt, und das Zurueckgleiten ruckelt.
  const vorlaufLesen = () => parseFloat(getComputedStyle(wurzel).getPropertyValue('--vorlauf')) || 0;
  const zustaendig = () =>
    window.matchMedia('(orientation: portrait)').matches && !document.body.classList.contains('menue-offen');
  let finger = false;
  let startY = 0;
  let gesperrt: boolean | null = null;
  window.addEventListener('touchstart', (e) => {
    finger = true;
    startY = e.touches[0]?.clientY ?? 0;
    gesperrt = e.touches.length === 1 ? null : false;
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (gesperrt === null) {
      const zug = (e.touches[0]?.clientY ?? startY) - startY;
      if (Math.abs(zug) < 2) return;
      const vorlauf = vorlaufLesen();
      gesperrt = zug > 0 && !!vorlauf && window.scrollY <= vorlauf + 1 && zustaendig();
    }
    if (gesperrt && e.cancelable) e.preventDefault();
  }, { passive: false });

  // Kommt die Seite trotzdem oberhalb des Vorlaufs an (Schwung von weiter
  // unten, Zug, der knapp unterhalb der Grenze begann), gleitet sie nach dem
  // Ende der Bewegung zurueck. Das ist selbst gesteuert und folgt einer
  // auslaufenden Kurve wie das Zurueckfedern in iOS (rund 0,55 s): erst
  // zuegig, dann weich. Weil oben nichts federt, nimmt Safari die Schritte
  // an; verwirft es doch einen, setzt der naechste Schritt erneut. Ganze
  // Pixel, aufgerundet: Safari kappt Bruchteile, sonst kaeme die Seite nicht
  // voran. Der Lauf endet erst am Vorlauf oder bei erneuter Beruehrung.
  // Kurzer Weg 0,55 s, voller Weg (Seite ganz oben) bis 0,9 s: Je weiter
  // sie hinausgeschossen ist, desto gedaempfter kommt sie zurueck.
  const DAUER = 550;
  const DAUER_VOLL = 900;
  const kurve = (t: number) => 1 - Math.pow(1 - t, 3);
  const RUHE = 250;
  let waechter = 0;
  let beendet = false;
  const zurueck = () => {
    if (waechter) return;
    beendet = false;
    let von = NaN;
    let beginn = 0;
    let vorher = NaN;
    let ruhigSeit = 0;
    let dauer = DAUER;
    const schritt = (jetzt: number) => {
      waechter = 0;
      if (finger || !zustaendig()) return;
      const vorlauf = vorlaufLesen();
      const y = Math.max(0, window.scrollY);
      if (!vorlauf || y >= vorlauf - 0.5) return;
      // Erst wenn die Bewegung ganz zu Ende ist, wird zurueckgeglitten:
      // Safari meldet `scrollend`, oder die Seite steht eine Viertelsekunde still
      // (der Schwung laeuft zum Schluss sehr langsam aus),
      // oder sie ist oben angekommen. Gegen auslaufenden Schwung
      // anzuschieben zittert, deshalb geschieht bis dahin nichts.
      if (isNaN(von)) {
        if (y !== vorher) { vorher = y; ruhigSeit = jetzt; }
        if (!beendet && y > 0 && jetzt - ruhigSeit < RUHE) {
          waechter = window.requestAnimationFrame(schritt);
          return;
        }
        von = y;
        beginn = jetzt;
        dauer = DAUER + (DAUER_VOLL - DAUER) * (1 - y / vorlauf);
      }
      const t = Math.min(1, (jetzt - beginn) / dauer);
      const ziel = Math.min(vorlauf, Math.max(Math.ceil(von + (vorlauf - von) * kurve(t)), Math.floor(y) + 1));
      window.scrollTo({ top: ziel, behavior: 'instant' });
      waechter = window.requestAnimationFrame(schritt);
    };
    waechter = window.requestAnimationFrame(schritt);
  };
  const loslassen = (e: TouchEvent) => { finger = e.touches.length > 0; zurueck(); };
  const zuEnde = () => { if (finger) return; zurueck(); beendet = true; };
  window.addEventListener('touchend', loslassen, { passive: true });
  window.addEventListener('touchcancel', loslassen, { passive: true });
  window.addEventListener('scroll', () => { if (!finger) zurueck(); }, { passive: true });
  window.addEventListener('scrollend', zuEnde);
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
