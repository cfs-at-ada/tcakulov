/**
 * Ein Vorschlag fuer die englische Fassung, kein Uebersetzer: Laender,
 * Staedte und die paar Woerter, die in Terminen immer wiederkehren.
 * Eigennamen bleiben stehen. Was nicht passt, wird im Formular ueberschrieben.
 */

const WOERTER: Record<string, string> = {
  // Laender
  'Österreich': 'Austria', 'Deutschland': 'Germany', 'Schweiz': 'Switzerland',
  'Frankreich': 'France', 'Italien': 'Italy', 'Spanien': 'Spain', 'Ungarn': 'Hungary',
  'Niederlande': 'Netherlands', 'Belgien': 'Belgium', 'Polen': 'Poland',
  'Tschechien': 'Czech Republic', 'Dänemark': 'Denmark', 'Schweden': 'Sweden',
  'Norwegen': 'Norway', 'Finnland': 'Finland', 'Griechenland': 'Greece',
  'Kroatien': 'Croatia', 'Slowenien': 'Slovenia', 'Rumänien': 'Romania',
  'Russland': 'Russia', 'Türkei': 'Turkey', 'Japan': 'Japan', 'China': 'China',
  'Südkorea': 'South Korea', 'Großbritannien': 'United Kingdom', 'Irland': 'Ireland',
  'Portugal': 'Portugal', 'Luxemburg': 'Luxembourg', 'Litauen': 'Lithuania',
  // Staedte
  'Wien': 'Vienna', 'München': 'Munich', 'Köln': 'Cologne', 'Genf': 'Geneva',
  'Zürich': 'Zurich', 'Rom': 'Rome', 'Mailand': 'Milan', 'Florenz': 'Florence',
  'Venedig': 'Venice', 'Neapel': 'Naples', 'Prag': 'Prague', 'Warschau': 'Warsaw',
  'Brüssel': 'Brussels', 'Kopenhagen': 'Copenhagen', 'Lissabon': 'Lisbon',
  'Athen': 'Athens', 'Moskau': 'Moscow', 'Sankt Petersburg': 'Saint Petersburg',
  'St. Petersburg': 'St Petersburg', 'Nürnberg': 'Nuremberg', 'Hannover': 'Hanover',
  // Wiederkehrende Woerter
  'Konzert': 'Concert', 'Konzerte': 'Concerts', 'Eröffnungskonzert': 'Opening concert',
  'Abschlusskonzert': 'Closing concert', 'Kammerkonzert': 'Chamber concert',
  'Kammermusik': 'Chamber music', 'Rezital': 'Recital', 'Liederabend': 'Song recital',
  'Meisterkurs': 'Masterclass', 'Meisterkurse': 'Masterclasses',
  'Sommerakademie': 'Summer Academy', 'Internationale': 'International',
  'Akademie': 'Academy', 'Universität': 'University', 'Hochschule': 'University',
  'Musikhochschule': 'University of Music', 'Festival': 'Festival', 'Jury': 'Jury',
  'Mitglied': 'Member', 'Wettbewerb': 'Competition', 'Probe': 'Rehearsal',
  'Uraufführung': 'World premiere', 'Matinée': 'Matinee', 'Saal': 'Hall',
  'Großer': 'Main', 'Kleiner': 'Small',
  'mit': 'with', 'und': 'and', 'im': 'at the', 'in der': 'at the', 'an der': 'at the',
  'am': 'at the', 'bei': 'at', 'der': 'of the', 'in': 'in', 'Schloss': 'Castle',
};

// Laengere Wendungen zuerst, damit „an der" nicht als „an" + „der" endet.
const MUSTER = Object.keys(WOERTER)
  .sort((a, b) => b.length - a.length)
  .map((wort) => [new RegExp(`(^|[\\s,(/·-])${wort.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[\\s,)/·-])`, 'g'), WOERTER[wort]] as const);

export function vorschlagEnglisch(deutsch: string): string {
  let text = ` ${deutsch} `;
  for (const [muster, ersatz] of MUSTER) {
    text = text.replace(muster, (_, davor) => `${davor}\u0000${ersatz}\u0000`);
  }
  return text.replace(/\u0000/g, '').trim();
}
