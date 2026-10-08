/** Vergroessert ein Galeriebild ueber der Seite. */
export function bildschauEinrichten(): void {
  const kacheln = document.querySelectorAll<HTMLElement>('.galerie__kachel[data-gross]');
  if (kacheln.length === 0) return;

  kacheln.forEach((kachel) => {
    const ausloeser = kachel.querySelector<HTMLElement>('button') ?? kachel;
    ausloeser.addEventListener('click', () => {
      const schicht = document.createElement('div');
      schicht.className = 'bildschau';
      schicht.setAttribute('role', 'dialog');
      schicht.setAttribute('aria-modal', 'true');
      schicht.tabIndex = -1;
      const bild = document.createElement('img');
      bild.src = kachel.dataset.gross!;
      bild.alt = kachel.dataset.alt ?? '';
      schicht.appendChild(bild);

      const schliessen = () => {
        schicht.remove();
        document.removeEventListener('keydown', taste);
        ausloeser.focus();
      };
      const taste = (e: KeyboardEvent) => { if (e.key === 'Escape') schliessen(); };
      schicht.addEventListener('click', schliessen);
      document.addEventListener('keydown', taste);
      document.body.appendChild(schicht);
      schicht.focus();
    });
  });
}
