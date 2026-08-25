import type { Sprache } from './navigation';

export interface Lehrinhalt {
  ueberschrift: string;
  /** Der eingerueckte Ausspruch; die Zeichen davor und danach stehen im Markup. */
  zitat: string;
  zitatEnde: string;
  fliesstext: string;
  kurseTitel: string;
  bildnachweis: string;
}

export const lehre: Record<Sprache, Lehrinhalt> = {
  de: {
    ueberschrift: "Lehre",
    zitat: ">> Als größte Bereicherung in meinem beruflichen, künstlerischen Leben empfinde ich die Lehrtätigkeit und pädagogische Verantwortung für den Nachwuchs. Es erfüllt mich mit größter Freude, die Kenntnisse und das Wissen wie auch die Leidenschaft für die Musik, welche mir durch meine fantastischen Professor*innen stets vermittelt wurden, nun selber an die jungen Generationen weiterzugeben.",
    zitatEnde: "<<",
    fliesstext: "German Tcakulov ist ein renommierter Bratschist mit einer tiefen Hingabe zur Lehre und seit Oktober 2024 Professor für Bratsche an der Universität Mozarteum in Salzburg. Diese neue Position markiert einen bedeutenden Meilenstein in seiner pädagogischen Laufbahn. Zuvor war er ab 2022 Professor an der Hochschule für Musik in Karlsruhe und leitete bis 2023 seine eigene Bratschenklasse an der Hochschule für Musik und Theater in München. Von 2017 bis 2022 wirkte er als Lehrbeauftragter an der Hochschule für Musik Hanns Eisler in Berlin und war Assistent von Tabea Zimmermann. Darüber hinaus vermittelt er sein Wissen und seine Expertise an der Scuola di Musica di Fiesole/Florenz. Das Engagement Tcakulovs für die Förderung der nächsten Musiker-Generationen zeigt sich in seiner herausragenden Lehrtätigkeit in ganz Europa und in seinen weltweiten Meisterkursen.",
    kurseTitel: "MEISTERKURSE",
    bildnachweis: "© Mozarteum Salzburg",
  },
  en: {
    ueberschrift: "Lehre",
    zitat: ">> I consider teaching and taking responsibility for the next generation to be the greatest enrichment in my professional and artistic life. It fills me with immense joy to now pass on to younger generations the knowledge, expertise, and passion for music that my fantastic professors always instilled in me.",
    zitatEnde: "<<",
    fliesstext: "German Tcakulov is a distinguished violist with a profound commitment to teaching and, since October 2024, has been a professor of viola at the Mozarteum University Salzburg. This new appointment represents a significant milestone in his pedagogical journey. Previously, in 2022, he was appointed as a professor at the Hochschule für Musik in Karlsruhe, where he served until 2023 while leading his own viola class at the Hochschule für Musik und Theater in Munich. From 2017 to 2022, he held a teaching position at the Hochschule für Musik Hanns Eisler in Berlin and served as an assistant to Tabea Zimmermann. Additionally, he imparts his knowledge and expertise at the Scuola di Musica di Fiesole/Florence. Tcakulov’s dedication to nurturing the next generations of musicians is evident in his impactful teaching roles across Europe and in his worldwide masterclasses.",
    kurseTitel: "MASTERCLASSES",
    bildnachweis: "© Mozarteum Salzburg",
  },
};
