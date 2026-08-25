import type { Sprache } from './navigation';

export interface Rechtsabschnitt {
  titel: string;
  /** Fliesstext vor einer moeglichen Aufzaehlung. */
  text: string;
  /** Aufzaehlungspunkte, jeder in einer eigenen Zeile. */
  punkte?: string[];
  /** Fliesstext nach der Aufzaehlung. */
  schluss?: string;
  /** Der letzte Absatz schliesst enger ab. */
  eng?: boolean;
}

export interface Rechtsinhalt {
  /** Ueberschrift der Anschrift. */
  anschriftTitel: string;
  /** Vier Zeilen; die erste steht fett. */
  anschrift: string[];
  abschnitte: Rechtsabschnitt[];
}

export const recht: Record<Sprache, Rechtsinhalt> = {
  de: {
    anschriftTitel: 'IMPRESSUM GEMÄSS §5 TMG:',
    anschrift: ['Management German Tcakulov', 'Constantin Sold', 'Joseph-Haydn-Str. 53', 'D-67105 Schifferstadt'],
    abschnitte: [
      {
        titel: 'Haftungshinweis',
        text: 'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
      },
      {
        titel: 'Datenschutz',
        text: 'Folgend informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung dieser Website. Verantwortlich für die Datenverarbeitung ist gemäß Impressum Management German Tcakulov / Constantin Sold.',
      },
      {
        titel: 'Datenschutzbeauftragter',
        text: 'Der Datenschutzbeauftragte ist unter der Adresse des Impressums zu erreichen. Bitte ergänzen Sie die Adresse bei der Kontaktaufnahme per Post mit dem Hinweis “Datenschutzbeauftragter”. Gerne beantworten wir Ihre Anfrage auch per E-Mail.',
      },
      {
        titel: 'Personenbezogene Daten',
        text: 'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden “betroffene Person”) beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.',
      },
      {
        titel: 'Daten beim Websiteaufruf',
        text: 'Wenn Sie diese Website nur nutzen, um sich zu informieren und keine Daten angeben, dann verarbeiten wir nur die Daten, die zur Anzeige der Website auf dem von Ihnen verwendeten internetfähigen Gerät erforderlich sind. Das sind insbesondere:',
        punkte: [
          '• IP-Adresse',
          '• Datum und Uhrzeit der Anfrage',
          '• jeweils übertragene Datenmenge',
          '• die Website, von der die Anforderung kommt',
          '• Browsertyp und Browserversion',
          '• Betriebssystem',
        ],
        schluss:
          'Rechtsgrundlage für die Verarbeitung dieser Daten sind berechtigte Interessen gemäß Art. 6 Abs. 1 UAbs. 1 Buchstabe f) DSGVO, um die Darstellung der Website grundsätzlich zu ermöglichen. Darüber hinaus können Sie verschiedene Leistungen auf der Website nutzen, bei der weitere personenbezogene und nicht personenbezogene Daten verarbeitet werden.',
      },
      {
        titel: 'Ihre Rechte',
        text: 'Als betroffene Person haben Sie folgende Rechte:',
        eng: true,
        punkte: [
          '• Sie haben ein Auskunftsrecht bezüglich der Sie betreffenden personenbezogenen Daten, die der Verantwortliche verarbeitet (Art. 15 DSGVO),',
          '• Sie haben das Recht auf Berichtigung der Sie betreffenden Daten, wenn diese unrichtig oder unvollständig gespeichert werden (Art. 16 DSGVO),',
          '• Sie haben das Recht auf Löschung (Art. 17 DSGVO),',
          '• Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen (Art. 18 DSGVO),',
          '• Sie haben das Recht auf Datenübertragbarkeit (Art. 20 DSGVO),',
          '• Sie haben ein Widerspruchsrecht gegen die Verarbeitung Sie betreffender personenbezogener Daten (Art. 21 DSGVO),',
          '• Sie haben das Recht nicht einer ausschließlich auf einer automatisierten Verarbeitung – einschließlich Profiling – beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung entfaltet oder sie in ähnlicher Weise erheblich beeinträchtigt (Art. 22 DSGVO),',
          '• Sie haben das Recht, sich bei einem vermuteten Verstoß gegen das Datenschutzrecht bei der zuständigen Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig ist die Aufsichtsbehörde an Ihrem üblichen Aufenthaltsort, Arbeitsplatz oder am Ort des vermuteten Verstoßes.',
        ],
      },
    ],
  },
  en: {
    anschriftTitel: 'IMPRINT ACCORDING TO §5 TMG:',
    anschrift: ['Management German Tcakulov', 'Constantin Sold', 'Joseph-Haydn-Str. 53', 'D-67105 Schifferstadt'],
    abschnitte: [
      {
        titel: 'DISCLAIMER',
        text: 'Despite careful content checks, we assume no liability for the content of external links. The operators of linked sites are solely responsible for their content.',
      },
      {
        titel: 'DATA PROTECTION',
        text: 'Below, we provide information about the processing of personal data when using this website. According to the legal notice, Management German Tcakulov / Constantin Sold is responsible for data processing.',
      },
      {
        titel: 'DATA PROTECTION OFFICER',
        text: 'The data protection officer can be contacted at the address given in the legal notice. Please add the reference “Data Protection Officer” when contacting us by post. We will also be happy to answer your enquiry by email.',
      },
      {
        titel: 'PERSONAL DATA',
        text: 'Personal data is any information relating to an identified or identifiable natural person (hereinafter referred to as “data subject”). A natural person is considered identifiable if they can be identified, directly or indirectly, in particular by association with an identifier such as a name, an identification number, location data, an online identifier or one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.',
      },
      {
        titel: 'DATA WHEN VISITING THE WEBSITE',
        text: 'If you only use this website to obtain information and do not provide any data, we will only process the data that is necessary to display the website on the Internet-enabled device you are using. This includes, in particular:',
        punkte: [
          '• IP-address',
          '• date and time of the request',
          '• data volume transferred',
          '• the website from which the request originates',
          '• browser type and browser version',
          '• operating system',
        ],
        schluss:
          'The legal basis for processing this data is legitimate interests pursuant to Art. 6 para. 1 subpara. 1 letter f) GDPR in order to enable the website to be displayed. In addition, you can use various services on the website that process further personal and non-personal data.',
      },
      {
        titel: 'Your rights',
        text: 'As a data subject, you have the following rights:',
        eng: true,
        punkte: [
          '• You have the right to obtain information about the personal data concerning you that is processed by the controller (Art. 15 DSGVO),',
          '• You have the right to correct any data concerning you if it is incorrect or incomplete. (Art. 16 DSGVO),',
          '• You have the right to deletion (Art. 17 DSGVO),',
          '• You have the right to request the restriction of the processing of your personal data. (Art. 18 DSGVO),',
          '• You have the right to data portability (Art. 20 DSGVO),',
          '• You have the right to object to the processing of personal data concerning you. (Art. 21 DSGVO),',
          '• You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you. (Art. 22 DSGVO),',
          '• You have the right to complain to the competent supervisory authority if you suspect a violation of data protection law (Art. 77 DSGVO). The supervisory authority responsible is the one at your usual place of residence, place of work, or the place where the alleged infringement occurred.',
        ],
      },
    ],
  },
};
