/** Klappt das lange Portrait auf der Startseite auf und zu. */
export function portraitEinrichten(): void {
  const tafel = document.getElementById('portrait');
  const schalter = Array.from(document.querySelectorAll<HTMLAnchorElement>('.portrait__schalter'));
  const oben = schalter[0];
  if (!tafel || !oben) return;

  const umschalten = (ereignis: Event) => {
    ereignis.preventDefault();
    const offen = tafel.classList.toggle('portrait__tafel--offen');
    oben.textContent = offen ? oben.dataset.weniger! : oben.dataset.mehr!;
    oben.setAttribute('aria-expanded', String(offen));

    if (!offen) {
      // Beim Zuklappen zurueck zur Ueberschrift, damit der Blick
      // nicht ins Leere faellt.
      const ziel = document.getElementById('vita');
      if (ziel) {
        window.scrollTo({
          top: ziel.getBoundingClientRect().top + window.scrollY - 73,
          behavior: 'smooth',
        });
      }
    }
  };

  schalter.forEach((s) => s.addEventListener('click', umschalten));
}
