/** Vergroessert ein Galeriebild ueber der Seite. */
export function bildschauEinrichten(): void {
  const kacheln = document.querySelectorAll<HTMLElement>('.galerie__kachel[data-gross]');
  if (kacheln.length === 0) return;

  kacheln.forEach((kachel) => {
    kachel.addEventListener('click', () => {
      const quelle = kachel.dataset.gross!;
      const schicht = document.createElement('div');
      schicht.className = 'bildschau';
      const bild = document.createElement('img');
      bild.src = quelle;
      bild.alt = '';
      schicht.appendChild(bild);
      schicht.addEventListener('click', () => schicht.remove());
      document.body.appendChild(schicht);
    });
  });
}
