/** Knoepfe, die einen Textblock in die Zwischenablage legen. */
export function kopierenEinrichten(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-kopieren]').forEach((knopf) => {
    const ursprung = knopf.textContent;
    knopf.addEventListener('click', async () => {
      const quelle = document.querySelector<HTMLElement>(knopf.dataset.kopieren!);
      if (!quelle) return;
      const text = [...quelle.querySelectorAll('p')].map((p) => p.textContent?.trim()).join('\n\n');
      try {
        await navigator.clipboard.writeText(text);
        knopf.textContent = knopf.dataset.fertig ?? ursprung;
        setTimeout(() => { knopf.textContent = ursprung; }, 2000);
      } catch {
        // Ohne Zugriff auf die Zwischenablage: Text markieren, damit man ihn selbst kopiert.
        const auswahl = getSelection();
        const bereich = document.createRange();
        bereich.selectNodeContents(quelle);
        auswahl?.removeAllRanges();
        auswahl?.addRange(bereich);
      }
    });
  });
}
