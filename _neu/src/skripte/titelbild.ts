/** Blendet den Namenszug aus, sobald das Titelbild fortgescrollt ist. */
export function titelbildEinrichten(): void {
  const name = document.querySelector<HTMLElement>('.titelbild__name');
  const bild = document.querySelector<HTMLElement>('.titelbild');
  if (!name || !bild) return;

  window.addEventListener('scroll', () => {
    name.style.opacity = window.scrollY > bild.offsetHeight * 0.3 ? '0' : '1';
  }, { passive: true });
}
