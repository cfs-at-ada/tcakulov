import type { Sprache } from './navigation';

/**
 * Impressum und Datenschutzerklaerung.
 *
 * ENTWURF, Stand Oktober 2026 – vor dem Livegang anwaltlich pruefen lassen.
 * Grundlage: § 5 DDG, § 18 Abs. 2 MStV, DSGVO, § 25 TDDDG; Wortlaut nach
 * IHK-, WKO- und e-recht24-Hinweisen, umformuliert. Offene Punkte stehen
 * in eckigen Klammern und in _neu/README.md.
 */

export interface Rechtsabschnitt {
  titel: string;
  text: string;
  /** Aufzaehlung, jeder Punkt eine Zeile. */
  punkte?: string[];
  /** Fliesstext nach der Aufzaehlung. */
  schluss?: string;
}

export interface Rechtsinhalt {
  seitentitel: string;
  impressum: {
    titel: string;
    grundlage: string;
    anschrift: string[];
    kontakt: string[];
    verantwortlichTitel: string;
    verantwortlich: string[];
    hinweis?: string;
    abschnitte: Rechtsabschnitt[];
  };
  datenschutz: {
    titel: string;
    abschnitte: Rechtsabschnitt[];
    stand: string;
  };
}

const ANSCHRIFT = ['Management German Tcakulov', 'Constantin Sold', 'Joseph-Haydn-Str. 53', '67105 Schifferstadt'];
const TELEFON = '+49 151 29540528';
const MAIL = 'office@germantcakulov.com';

export const recht: Record<Sprache, Rechtsinhalt> = {
  de: {
    seitentitel: 'Impressum & Datenschutz',
    impressum: {
      titel: 'Impressum',
      grundlage: 'Angaben gemäß § 5 DDG',
      anschrift: [...ANSCHRIFT, 'Deutschland'],
      kontakt: [`Telefon: ${TELEFON}`, `E-Mail: ${MAIL}`],
      verantwortlichTitel: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      verantwortlich: ['Constantin Sold, Anschrift wie oben'],
      abschnitte: [
        {
          titel: 'Zweck dieser Website',
          text: 'Diese Website informiert über die künstlerische Tätigkeit des Bratschisten German Tcakulov, insbesondere über Konzerte, Aufnahmen, Lehrtätigkeit und Presse. Sie wird von seinem Management betrieben.',
        },
        {
          titel: 'Verbraucherstreitbeilegung',
          text: 'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
        },
        {
          titel: 'Haftung für Links',
          text: 'Diese Website enthält Links zu Websites Dritter, etwa zu Veranstaltern, Ticketanbietern oder Instagram. Auf deren Inhalte haben wir keinen Einfluss; verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen wir den betreffenden Link umgehend.',
        },
        {
          titel: 'Urheberrecht und Bildnachweise',
          text: 'Die Inhalte dieser Website, insbesondere Texte, Fotos und Aufnahmen, sind urheberrechtlich geschützt. Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers. Die Materialien im Pressebereich dürfen für die Berichterstattung über German Tcakulov unter Angabe des Bildnachweises verwendet werden.',
          punkte: [
            'Porträtfotos: Irène Zandel',
            'Foto Universität Mozarteum: Christian Schneider / Universität Mozarteum Salzburg',
            'Weitere Bildnachweise stehen jeweils beim Bild.',
          ],
        },
      ],
    },
    datenschutz: {
      titel: 'Datenschutzerklärung',
      stand: 'Stand: Oktober 2026',
      abschnitte: [
        {
          titel: 'Verantwortlicher',
          text: 'Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:',
          punkte: ['Management German Tcakulov, Constantin Sold', 'Joseph-Haydn-Str. 53, 67105 Schifferstadt, Deutschland', `Telefon: ${TELEFON}`, `E-Mail: ${MAIL}`],
          schluss: 'Ein Datenschutzbeauftragter ist nicht benannt, da hierzu keine gesetzliche Pflicht besteht.',
        },
        {
          titel: 'Das Wichtigste in Kürze',
          text: 'Diese Website ist bewusst sparsam gebaut:',
          punkte: [
            'Wir setzen keine Cookies und keine Analyse- oder Tracking-Werkzeuge ein.',
            'Es gibt kein Kontaktformular, keinen Newsletter und keine Social-Media-Plugins.',
            'Schriften und Symbole werden von unserem eigenen Server geladen; eine Verbindung zu Google Fonts oder anderen Schriftanbietern findet nicht statt.',
            'Videos von YouTube und der Spotify-Player werden erst geladen, wenn Sie dies durch einen Klick ausdrücklich wünschen (siehe unten).',
          ],
        },
        {
          titel: 'Hosting und Server-Logfiles',
          text: 'Diese Website wird bei der dataforest GmbH, Taunusstraße 52, 65830 Kriftel, Deutschland, gehostet. Bei jedem Aufruf einer Seite oder Datei speichert der Server automatisch Informationen, die Ihr Browser übermittelt (Server-Logfiles):',
          punkte: [
            'IP-Adresse des anfragenden Geräts',
            'Datum und Uhrzeit des Zugriffs',
            'aufgerufene Seite oder Datei (URL)',
            'Referrer-URL (die zuvor besuchte Seite)',
            'verwendeter Browser und Betriebssystem',
            'HTTP-Statuscode und übertragene Datenmenge',
          ],
          schluss: 'Diese Daten sind technisch erforderlich, um die Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten, etwa um Angriffe zu erkennen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren und fehlerfreien Betrieb der Website. Die Logfiles werden in der Regel nach [X] Tagen gelöscht, sofern sie nicht zur Aufklärung eines konkreten Sicherheitsvorfalls länger benötigt werden. Mit dem Hoster besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO. Die Website wird verschlüsselt (HTTPS) übertragen.',
        },
        {
          titel: 'Kontakt per E-Mail oder Telefon',
          text: 'Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten (z. B. Name, E-Mail-Adresse, Telefonnummer, Inhalt der Anfrage), um Ihr Anliegen zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage mit einem Vertrag oder dessen Anbahnung zusammenhängt (z. B. Konzert- oder Unterrichtsanfragen), im Übrigen Art. 6 Abs. 1 lit. f DSGVO, gestützt auf unser berechtigtes Interesse an der Beantwortung von Anfragen.',
          schluss: 'Wir löschen Ihre Daten, sobald sie für die Bearbeitung nicht mehr erforderlich sind, es sei denn, gesetzliche Aufbewahrungspflichten stehen dem entgegen. E-Mails werden über die Server von [E-Mail-Anbieter] verarbeitet.',
        },
        {
          titel: 'YouTube-Videos (Zwei-Klick-Lösung)',
          text: 'Auf der Seite „Media“ können Videos der Plattform YouTube abgespielt werden. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Aufruf der Seite wird zunächst nur ein Vorschaubild von unserem eigenen Server angezeigt; dabei wird keine Verbindung zu YouTube aufgebaut. Erst wenn Sie auf „Video abspielen“ klicken, wird das Video im erweiterten Datenschutzmodus (youtube-nocookie.com) geladen. Ab diesem Zeitpunkt werden Daten an YouTube/Google übermittelt, insbesondere Ihre IP-Adresse, die aufgerufene Seite sowie Browser- und Geräteinformationen. YouTube kann dabei Informationen auf Ihrem Endgerät speichern oder auslesen (z. B. Cookies oder Local Storage). Auf diese Verarbeitung haben wir keinen Einfluss.',
          schluss: 'Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, die Sie durch den Klick erteilen. Ihre Entscheidung wird nicht gespeichert: Bei jedem neuen Seitenaufruf bleibt das Video blockiert, bis Sie erneut klicken. Weitere Informationen: https://policies.google.com/privacy',
        },
        {
          titel: 'Spotify-Player (Zwei-Klick-Lösung)',
          text: 'Auf der Seite „Media“ kann ein Player des Musikdienstes Spotify geladen werden. Anbieter ist die Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Schweden. Auch hier wird zunächst nur ein Vorschaubild von unserem eigenen Server angezeigt, ohne Verbindung zu Spotify. Erst wenn Sie auf „Album anhören“ klicken, wird der Player von den Servern von Spotify geladen. Dabei werden insbesondere Ihre IP-Adresse, die aufgerufene Seite sowie Browser- und Geräteinformationen an Spotify übermittelt. Spotify kann Informationen auf Ihrem Endgerät speichern oder auslesen. Sind Sie bei Spotify angemeldet, kann Spotify den Abruf Ihrem Konto zuordnen.',
          schluss: 'Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ihre Entscheidung wird nicht gespeichert; bei jedem neuen Seitenaufruf bleibt der Player blockiert. Weitere Informationen: https://www.spotify.com/de/legal/privacy-policy/',
        },
        {
          titel: 'Übermittlung in Drittländer',
          text: 'Nach dem Laden von YouTube-Videos oder des Spotify-Players ist nicht auszuschließen, dass Daten auch in die USA übermittelt werden. Für die USA besteht ein Angemessenheitsbeschluss der EU-Kommission (EU-US Data Privacy Framework) für Unternehmen, die danach zertifiziert sind, etwa die Google LLC. Soweit keine Zertifizierung besteht, stützen die Anbieter die Übermittlung nach eigenen Angaben auf EU-Standardvertragsklauseln (Art. 46 DSGVO).',
        },
        {
          titel: 'Widerruf Ihrer Einwilligung',
          text: 'Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Da Ihre Einwilligung nicht gespeichert wird, genügt es, die Seite neu zu laden oder zu verlassen; danach werden YouTube und Spotify nicht mehr geladen. Von diesen Diensten gesetzte Cookies können Sie in Ihren Browsereinstellungen löschen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.',
        },
        {
          titel: 'Externe Links',
          text: 'Diese Website enthält einfache Links zu anderen Websites, etwa zu Ticketanbietern, Konzertveranstaltern und zum Instagram-Profil von German Tcakulov. Es handelt sich nicht um eingebundene Plugins: Erst wenn Sie einen Link anklicken, verlassen Sie unsere Website. Für die Datenverarbeitung auf der verlinkten Seite ist deren Betreiber verantwortlich.',
        },
        {
          titel: 'Pressematerial und Kalenderdateien',
          text: 'Pressetexte, Fotos und Kalendereinträge zu Terminen werden direkt von unserem eigenen Server zum Download angeboten. Dabei werden nur die oben beschriebenen Server-Logfiles erfasst.',
        },
        {
          titel: 'Ihre Rechte',
          text: 'Soweit die gesetzlichen Voraussetzungen vorliegen, haben Sie uns gegenüber folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:',
          punkte: [
            'Auskunft (Art. 15 DSGVO)',
            'Berichtigung (Art. 16 DSGVO)',
            'Löschung (Art. 17 DSGVO)',
            'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
            'Datenübertragbarkeit (Art. 20 DSGVO)',
            'Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
          ],
          schluss: `Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an ${MAIL}.`,
        },
        {
          titel: 'Widerspruchsrecht',
          text: 'Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung einlegen (Art. 21 DSGVO). Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
        },
        {
          titel: 'Beschwerderecht bei einer Aufsichtsbehörde',
          text: 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts. Für uns zuständig ist:',
          punkte: [
            'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz',
            'Hintere Bleiche 34, 55116 Mainz',
            'E-Mail: poststelle@datenschutz.rlp.de',
            'https://www.datenschutz.rlp.de',
          ],
        },
        {
          titel: 'Weitere Hinweise',
          text: 'Sie sind weder gesetzlich noch vertraglich verpflichtet, uns personenbezogene Daten bereitzustellen; ohne die technisch notwendigen Verbindungsdaten kann die Website jedoch nicht angezeigt werden. Eine automatisierte Entscheidungsfindung einschließlich Profiling (Art. 22 DSGVO) findet nicht statt.',
        },
      ],
    },
  },
  en: {
    seitentitel: 'Legal Notice & Privacy',
    impressum: {
      titel: 'Legal notice',
      grundlage: 'Information pursuant to Section 5 of the German Digital Services Act (DDG)',
      anschrift: [...ANSCHRIFT, 'Germany'],
      kontakt: [`Phone: ${TELEFON}`, `Email: ${MAIL}`],
      verantwortlichTitel: 'Responsible for content pursuant to Section 18(2) of the German Interstate Media Treaty (MStV)',
      verantwortlich: ['Constantin Sold, address as above'],
      hinweis: 'This English version is provided for convenience. In case of doubt, the German version prevails.',
      abschnitte: [
        {
          titel: 'Purpose of this website',
          text: 'This website provides information about the artistic work of violist German Tcakulov, in particular concerts, recordings, teaching and press. It is operated by his management.',
        },
        {
          titel: 'Consumer dispute resolution',
          text: 'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
        },
        {
          titel: 'Liability for links',
          text: 'This website contains links to third-party websites, such as concert organisers, ticket sellers or Instagram. We have no influence on their content; the respective provider is always responsible for it. No legal violations were apparent at the time of linking. If we become aware of any infringement, we will remove the link without delay.',
        },
        {
          titel: 'Copyright and photo credits',
          text: 'The content of this website, in particular texts, photographs and recordings, is protected by copyright. Any use beyond the limits of copyright law requires the prior written consent of the respective rights holder. Material in the press section may be used for reporting on German Tcakulov, provided the photo credit is given.',
          punkte: [
            'Portrait photos: Irène Zandel',
            'Photo of the Mozarteum University: Christian Schneider / Mozarteum University Salzburg',
            'Further credits are given next to each image.',
          ],
        },
      ],
    },
    datenschutz: {
      titel: 'Privacy policy',
      stand: 'Last updated: October 2026',
      abschnitte: [
        {
          titel: 'Controller',
          text: 'The controller responsible for data processing on this website within the meaning of the General Data Protection Regulation (GDPR) is:',
          punkte: ['Management German Tcakulov, Constantin Sold', 'Joseph-Haydn-Str. 53, 67105 Schifferstadt, Germany', `Phone: ${TELEFON}`, `Email: ${MAIL}`],
          schluss: 'No data protection officer has been appointed, as there is no legal obligation to do so.',
        },
        {
          titel: 'At a glance',
          text: 'This website is deliberately built to collect as little data as possible:',
          punkte: [
            'We do not use cookies or any analytics or tracking tools.',
            'There is no contact form, no newsletter and no social media plugins.',
            'Fonts and icons are loaded from our own server; no connection is made to Google Fonts or other font providers.',
            'YouTube videos and the Spotify player are only loaded if you explicitly request this with a click (see below).',
          ],
        },
        {
          titel: 'Hosting and server log files',
          text: 'This website is hosted by dataforest GmbH, Taunusstraße 52, 65830 Kriftel, Germany. Each time a page or file is requested, the server automatically stores information transmitted by your browser (server log files):',
          punkte: [
            'IP address of the requesting device',
            'date and time of access',
            'page or file requested (URL)',
            'referrer URL (the previously visited page)',
            'browser and operating system used',
            'HTTP status code and amount of data transferred',
          ],
          schluss: 'This data is technically necessary to deliver the website and to ensure its security and stability, for example to detect attacks. The legal basis is Art. 6(1)(f) GDPR; our legitimate interest lies in the secure and error-free operation of the website. Log files are generally deleted after [X] days, unless they are needed for longer to investigate a specific security incident. We have concluded a data processing agreement with the host pursuant to Art. 28 GDPR. The website is transmitted in encrypted form (HTTPS).',
        },
        {
          titel: 'Contact by email or phone',
          text: 'If you contact us by email or phone, we process the data you provide (e.g. name, email address, phone number, content of your enquiry) in order to handle your request. The legal basis is Art. 6(1)(b) GDPR where your enquiry relates to a contract or its preparation (e.g. concert or teaching enquiries), otherwise Art. 6(1)(f) GDPR, based on our legitimate interest in responding to enquiries.',
          schluss: 'We delete your data once it is no longer required for handling your request, unless statutory retention obligations apply. Emails are processed on the servers of [email provider].',
        },
        {
          titel: 'YouTube videos (two-click solution)',
          text: 'On the “Media” page you can play videos from YouTube. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. When you open the page, only a preview image served from our own server is shown; no connection to YouTube is made. Only when you click “Play video” is the video loaded in privacy-enhanced mode (youtube-nocookie.com). From that moment on, data is transmitted to YouTube/Google, in particular your IP address, the page visited, and browser and device information. YouTube may store or read information on your device (e.g. cookies or local storage). We have no influence on this processing.',
          schluss: 'The legal basis is your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) of the German Telecommunications Digital Services Data Protection Act (TDDDG), which you give by clicking. Your choice is not stored: each time you open a page, the video stays blocked until you click again. More information: https://policies.google.com/privacy',
        },
        {
          titel: 'Spotify player (two-click solution)',
          text: 'On the “Media” page a player from the music service Spotify can be loaded. The provider is Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Sweden. Here too, only a preview image from our own server is shown at first, with no connection to Spotify. Only when you click “Listen to the album” is the player loaded from Spotify’s servers. This transmits in particular your IP address, the page visited, and browser and device information to Spotify. Spotify may store or read information on your device. If you are logged in to Spotify, Spotify may associate the request with your account.',
          schluss: 'The legal basis is your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Your choice is not stored; each time you open a page, the player stays blocked. More information: https://www.spotify.com/legal/privacy-policy/',
        },
        {
          titel: 'Transfers to third countries',
          text: 'Once YouTube videos or the Spotify player have been loaded, data may also be transferred to the USA. For the USA, there is an adequacy decision of the European Commission (EU-US Data Privacy Framework) covering companies certified under it, such as Google LLC. Where no certification exists, the providers state that they rely on EU Standard Contractual Clauses (Art. 46 GDPR).',
        },
        {
          titel: 'Withdrawing your consent',
          text: 'You can withdraw your consent at any time with effect for the future. Since your consent is not stored, it is sufficient to reload or leave the page; YouTube and Spotify will then no longer be loaded. You can delete cookies set by these services in your browser settings. Withdrawal does not affect the lawfulness of processing carried out before it.',
        },
        {
          titel: 'External links',
          text: 'This website contains plain links to other websites, such as ticket sellers, concert venues and German Tcakulov’s Instagram profile. These are not embedded plugins: you only leave our website when you click a link. The operator of the linked website is responsible for data processing there.',
        },
        {
          titel: 'Press material and calendar files',
          text: 'Press texts, photos and calendar entries for events are offered for download directly from our own server. Only the server log files described above are recorded.',
        },
        {
          titel: 'Your rights',
          text: 'Where the legal requirements are met, you have the following rights regarding your personal data:',
          punkte: [
            'access (Art. 15 GDPR)',
            'rectification (Art. 16 GDPR)',
            'erasure (Art. 17 GDPR)',
            'restriction of processing (Art. 18 GDPR)',
            'data portability (Art. 20 GDPR)',
            'withdrawal of consent with effect for the future (Art. 7(3) GDPR)',
          ],
          schluss: `To exercise your rights, an informal message to ${MAIL} is sufficient.`,
        },
        {
          titel: 'Right to object',
          text: 'Where we process data on the basis of Art. 6(1)(f) GDPR, you may object to this processing at any time on grounds relating to your particular situation (Art. 21 GDPR). We will then no longer process the data unless we can demonstrate compelling legitimate grounds, or the processing serves the establishment, exercise or defence of legal claims.',
        },
        {
          titel: 'Right to lodge a complaint',
          text: 'You have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), in particular in the member state of your habitual residence. The authority responsible for us is:',
          punkte: [
            'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz',
            'Hintere Bleiche 34, 55116 Mainz, Germany',
            'Email: poststelle@datenschutz.rlp.de',
            'https://www.datenschutz.rlp.de',
          ],
        },
        {
          titel: 'Further information',
          text: 'You are not legally or contractually obliged to provide personal data; however, the website cannot be displayed without the technically necessary connection data. No automated decision-making, including profiling (Art. 22 GDPR), takes place.',
        },
      ],
    },
  },
};
