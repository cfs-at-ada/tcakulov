/**
 * Setzt den Grundpfad vor eine Adresse. Auf der echten Domain ist er leer,
 * auf einer Vorschau wie `nutzer.github.io/vorschau/` lautet er `/vorschau`.
 */
const basis = import.meta.env.BASE_URL.replace(/\/$/, '');

export const pfad = (adresse: string) => `${basis}${adresse}`;
