/**
 * Setzt den Player erst nach dem Klick ein. Vorher hat der Browser keinen
 * Kontakt zu YouTube oder Spotify.
 */
export function einbettungenEinrichten(): void {
  document.querySelectorAll<HTMLElement>('[data-einbettung]').forEach((feld) => {
    const knopf = feld.querySelector<HTMLAnchorElement>('[data-einbettung-start]');
    knopf?.addEventListener('click', (ereignis) => {
      ereignis.preventDefault();
      const rahmen = document.createElement('iframe');
      rahmen.src = feld.dataset.einbettung!;
      rahmen.title = feld.dataset.titel ?? '';
      rahmen.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share';
      rahmen.allowFullscreen = true;
      feld.replaceChildren(rahmen);
      feld.classList.add('ist-geladen');
      rahmen.focus();
    });
  });
}
