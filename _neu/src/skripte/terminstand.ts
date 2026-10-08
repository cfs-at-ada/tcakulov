import { heute } from '../inhalte/terminformat';

/**
 * Die Seite wird gebaut, die Zeit laeuft weiter. Ist ein Termin seit dem
 * letzten Bau verstrichen, rueckt dieses Skript ihn ins Archiv und zeigt
 * auf der Startseite das naechste Konzert. Ohne Skript bleibt der Stand
 * des letzten Baus stehen – der taegliche Bau holt ihn ohnehin ein.
 */
export function terminstandAktualisieren(): void {
  const stichtag = heute();
  const vorbei = (el: HTMLElement) => (el.dataset.ende ?? '') < stichtag;
  // Abgesagte Termine verschwinden eine Woche nach der Absage.
  const verschwunden = (el: HTMLElement) => !!el.dataset.weg && stichtag >= el.dataset.weg;

  // Terminseite: kommende Liste
  const liste = document.querySelector<HTMLElement>('[data-kommend-liste]');
  if (liste) {
    liste.querySelectorAll<HTMLElement>(':scope > [data-ende]').forEach((el) => {
      if (vorbei(el) || verschwunden(el)) el.remove();
    });
    const leer = document.querySelector<HTMLElement>('[data-kommend-leer]');
    if (leer) leer.hidden = liste.children.length > 0;
  }

  // Terminseite: Archiv
  const archiv = document.querySelector<HTMLElement>('[data-archiv]');
  if (archiv) {
    let gesamt = 0;
    archiv.querySelectorAll<HTMLDetailsElement>('[data-archiv-jahr]').forEach((jahr) => {
      let anzahl = 0;
      jahr.querySelectorAll<HTMLElement>('[data-archiv-eintrag]').forEach((el) => {
        el.hidden = !vorbei(el);
        if (!el.hidden) anzahl++;
      });
      jahr.hidden = anzahl === 0;
      const zahl = jahr.querySelector('[data-jahr-anzahl]');
      if (zahl) zahl.textContent = String(anzahl);
      gesamt += anzahl;
    });
    archiv.hidden = gesamt === 0;

    const hinweis = archiv.querySelector<HTMLElement>('[data-archiv-anzahl]');
    if (hinweis) {
      const vorlage = gesamt === 1 ? hinweis.dataset.vorlageEins : hinweis.dataset.vorlageViele;
      if (vorlage) hinweis.textContent = vorlage.replace(/\d+/, String(gesamt));
    }

    // Immer das juengste sichtbare Jahr aufgeklappt
    const erstes = archiv.querySelector<HTMLDetailsElement>('[data-archiv-jahr]:not([hidden])');
    if (erstes && !archiv.querySelector('[data-archiv-jahr][open]:not([hidden])')) erstes.open = true;
  }

  // Startseite: naechstes Konzert
  const block = document.querySelector<HTMLElement>('[data-konzert-block]');
  if (block) {
    const offen = Array.from(block.querySelectorAll<HTMLElement>('[data-konzert]')).filter((el) => {
      if (vorbei(el)) { el.remove(); return false; }
      return true;
    });
    offen.forEach((el, i) => { el.hidden = i > 0; });
    block.hidden = offen.length === 0;
  }
}
