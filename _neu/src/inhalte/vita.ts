import type { Sprache } from './navigation';

/** Ein Abschnitt des ausklappbaren Portraits. */
export interface Portraitabschnitt {
  titel?: string;
  /** Jeder Absatz ist eine Folge von Zeilen; die Zeilen trennt ein Umbruch. */
  absaetze: string[][];
}

export interface Vitainhalt {
  konzertTitel: string;
  konzertOrt: string;
  konzertZeilen: { text: string; ziel: string }[];
  zitat: string[];
  ueberschrift: string;
  kurz: string[];
  portraitTitel: string;
  mehr: string;
  weniger: string;
  abschnitte: Portraitabschnitt[];
}

export const vita: Record<Sprache, Vitainhalt> = {
  de: {
    konzertTitel: "NÄCHSTES KONZERT",
    konzertOrt: "Österreich, Wien, 16.10.2026",
    konzertZeilen: [
      { text: "Konzert im Bechstein Centrum Wien", ziel: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/" },
      { text: "mit Elena Nemtsova", ziel: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/" },
    ],
    zitat: [
      "„Musik existiert als Ziel.",
      "Erst dann komme ich selbst als Person.“",
    ],
    ueberschrift: "VITA",
    kurz: [
      "Nur selten bilden Klang und künstlerisches Sein und Wollen eine deckungsgleiche Einheit. Bei German Tcakulov ist das der Fall. Sein großherziger und großzügiger, überaus seelenvoller, warmer, erdiger, farbenreicher Bratschen-Klang spiegelt zugleich eine unerhört vielfältige Geisteshaltung wider. Dieses breite Profil lebt German Tcakulov nicht nur als Musiker auf der Bühne, sondern vermittelt es genauso als Bratschen-Professor am Salzburger Mozarteum.",
      "Ob Orchester, Kammermusik oder Solo, Barock, Klassik und Romantik, zeitgenössische Musik oder andere Künste: Für German Tcakulov gehört das alles ganz organisch zusammen. Als Künstler lebt er den Dialog zwischen Zeiten, Stilen und Genres. Dieses Sein und Wollen bestimmt von Anfang an seinen Werdegang. In Wladikawkas/Russland geboren, setzt er mit 15 Jahren das Viola-Studium an der Musik-Spezialschule des Konservatoriums bei Wladimir Stopitschew fort.",
      "Bei ihm studiert German Tcakulov anschließend am Petersburger Konservatorium, um mit 21 Jahren nach Deutschland überzusiedeln. Sein Bachelor- und Master-Studium schließt er bei Tabea Zimmerman an der Hochschule für Musik „Hanns Eisler“ in Berlin ab. Er ist Stipendiat der Lucia-Loeser-Stiftung, gewinnt zudem Preise bei internationalen Wettbewerben und wird zu renommierten Festivals eingeladen. Von 2018 bis 2022 wirkt er als festes Mitglied beim Symphonieorchester des Bayerischen Rundfunks (BR).",
      "Dort arbeitet er mit Dirigenten wie Mariss Jansons, Simon Rattle, Bernard Haitink oder Herbert Blomstedt. Zu seinen Kammermusik-Partner:innen zählen Stephan Forck, Ulf Wallin, Tabea Zimmermann, Claudio Bohórquez, Stephan Pickard, Boris Garlitsky, Wen-Sinn Young, Ingolf Turban, Thomas Hoppe und Frank van de Laar. Zwischen 2017 und 2022 unterrichtet German Tcakulov an den Musikhochschulen in München sowie „Hanns Eisler“ in Berlin und ist zudem Assistent von Tabea Zimmermann. Im Sommer 2022 wird er als Professor an die Musikhochschule in Karlsruhe berufen. Seit Oktober 2024 ist er Professor für Viola am Mozarteum in Salzburg.",
    ],
    portraitTitel: "Alles in Bewegung und im Fluss - ein Portrait von Florian Olters",
    mehr: "Mehr anzeigen",
    weniger: "Weniger anzeigen",
    abschnitte: [
      {
        absaetze: [
          [
            "Ein seelenvoller Klang, erdig und warm grundiert, auch geheimnisvoll und dunkel, weit und tief, überaus farbenreich: Das zeichnet den Bratschenklang von German Tcakulov in ganz besonderer, ureigener Weise aus. Er scheint mit der und durch die Viola buchstäblich zu singen und zu sprechen. In seinem Spiel herrschen Farbgebungen vor, tannengrün oder braun, die in seiner Heimat vorherrschen: im Kaukasus. Er stammt aus Wladikawkas in Nordossetien-Alanien. Laut Namen beherrscht diese Großstadt den Kaukasus.",
          ],
        ],
      },
      {
        titel: "Ursprung Kaukasus",
        absaetze: [
          [
            "Der Kaukasus, das ist ein Hochgebirge zwischen Europa und Asien mit gewaltigen Berggipfeln, unendlichen Weiten und dichten Wäldern, überreich zudem an Sprachen und Kulturen. Hier wächst German auf und findet auf Umwegen zu seinem Instrument: die Bratsche. Wie so oft verläuft dieser Weg auch bei ihm über die Geige, aber: „Eigentlich wollte ich schon sehr früh Bratsche spielen“, verrät German. „In Russland gibt es jedoch keinen Bratschenunterricht für Kinder wie in Westeuropa, jedenfalls nicht an öffentlichen Musikschulen.“",
            "Ganz am Anfang ist indessen das Klavier. „Wir hatten ein Klavier zu Hause, und meine Mutter spielte immer gerne Musik. Mit sieben Jahren habe bei ihrer früheren Lehrerin Klavierunterricht genommen. Ich fand das Instrument aber bald ziemlich langweilig, zu mechanisch. Es hat mir keinen Spaß gemacht.“ Mit seiner Mutter besucht German gleichzeitig Konzerte in der Philharmonie von Wladikawkas. Für die Philharmonie schwärmt German noch heute.",
            "„Das war eine alte deutsch-lutherische Kirche, die zu Sowjetzeiten umgebaut wurde zu einem Konzertsaal. Ihre Akustik zählt zu den besten in ganz Russland.“ In diesem Rahmen lauscht German als Kind den Philharmonikern von Wladikawkas. Eines Tages erklingt die Fünfte Sinfonie von Ludwig van Beethoven. „Als das Fugato im ersten Satz einsetzte, konnte ich spüren, wie die Stühle vibrierten. Ich war vor allem fasziniert von den tieferen Klängen, den Vibrationen und Schwingungen.“",
            "Auch rein optisch findet German die Streichinstrumente wunderschön. „Es war mir absolut egal, ob Geige, Bratsche, Cello oder Kontrabass, Hauptsache Streicher. Die Bögen auf den Saiten: Das hat mich sofort beeindruckt. Ich war acht Jahre alt, und von da an habe ich davon geträumt, selbst ein Streichinstrument zu spielen.“ Schon bald erfährt German, dass sein Großvater mehrere Instrumente gespielt hat. „Meine Mutter erzählte mir, dass wir auch eine Geige zu Hause hätten. Die habe ich irgendwo entdeckt und an mich genommen.“",
            "Die Violine hatte keine Saiten, keinen Steg, nichts, nur der Korpus und ein Bogen. „Ich fand sie aber wunderschön, ein altes deutsches Instrument aus Sachsen. Ich stand vor dem Spiegel und habe so getan, als ob ich spielte. Es kam kein Ton, aber ich habe den Bogen hin und her in der Luft gestrichen. Ich war so fanatisch, dass ich unbedingt Geige spielen wollte. Ich habe meine Eltern total genervt und immer und immer wieder gesagt, dass ich Geige spielen möchte. Aber ich hatte ja schon mit Klavier angefangen und nach zwei, drei Monaten wieder aufgehört.“",
          ],
        ],
      },
      {
        titel: "Klavier – Violine – Bratsche",
        absaetze: [
          [
            "Seine Mutter wartet also ab und rechnet damit, dass ihr Sohn die Geige wieder vergisst – wie zuvor das Klavier. Doch wenig später mischt sich der Vater ein, weil sich sein Sohn so intensiv und fortwährend mit der Geige beschäftigt. „In meiner freien Zeit habe ich Geigen aus Papier gebastelt, auch Celli, verschiedene Instrumente – ein kleines Orchester aus Papier.“ Privatunterricht? Daran ist gar nicht zu denken, viel zu teuer für die Familie. Die Mutter geht kurzerhand mit ihrem Sohn zur staatlichen und damit kostenfreien Musikschule Nr. 1 in Wladikawkas. Sie selbst hatte diese Schule besucht.",
            "„Die Direktorin stellte mir ein paar Fragen: was ich möchte und warum ich das möchte. Ich habe ihr vom Konzert und der Geige ohne Saiten erzählt.“ Die Direktorin ist baff. „Wissen Sie, ich habe in vierzig Jahren Berufserfahrung noch kein Kind erlebt, das freiwillig Geige spielen will“, sagt sie zu Germans Mutter. „Sie müssen mit der Abteilungsleiterin sprechen. Sie ist die beste Geigenlehrerin im Kaukasus.“ Gesagt, getan, nach zwei Tagen geht es zu einer älteren Dame. Eigentlich nimmt sie keine Schüler mehr auf, sagt aber zu German: „Gib mir deine Pfötchen.“",
            "Sie prüft die Hände, spielt Töne und klopft Rhythmen, die der kleine German nachmachen soll. „Meine Mutter sagte, ich hätte unfassbar unsauber gesungen. Richtig schrecklich.“ Sie entschuldigt sich sogar für Germans Gesang, aber die Lehrerin erwidert kurz und knapp: „Ach, die Jungs sind immer langsamer in der Entwicklung.“ Also geht es mit der Geige los, doch von Anfang an ist die Lehrerin davon überzeugt, dass German zur Bratsche wechseln wird: irgendwann. Sie spricht das immer wieder an.",
            "„Sie war sehr pragmatisch“, sagt German heute. „Ein guter Bratschist wird immer einen guten Job finden, sagte sie. Gute Geiger gebe es viele. Sie sagte mir, dass ich bei jeder Gelegenheit die Bratsche wählen sollte. Vielleicht bin ich auch deswegen Bratschist geworden, weil sie es unentwegt gesagt hat.“ Und dann kommt der Schlüsselmoment: Bei einem Konzert während der Pause sieht German erstmals hautnah eine Viola. „Ich habe heimlich die leeren Saiten angezupft, und seitdem wollte ich nur noch Bratsche spielen.“",
            "Um den Violaklang genauer kennenzulernen, schenkt die Lehrerin ihm Schallplatten mit dem Bratschisten Yuri Bashmet. Von einer Einspielung ist German sofort gefesselt, nämlich das Violakonzert von Alfred Schnittke. „Dieser Eindruck hat mich sofort umgehauen und ist mir bis heute im Gedächtnis geblieben.“ Die Tiefe, das Klangvolumen, die Wärme, das Sonore: „Als ich diesen Klang hörte, war ich total fasziniert. Wie die menschliche Stimme. Das hat mich direkt angesprochen. Mit der Geige hatte ich das nie so gefühlt.“",
            "Der junge German stimmt prompt die Geigensaiten herunter, um die Stimmung der Bratsche zu erreichen. „Seitdem habe ich die Hälfte der Zeit mit tieferer Stimmung geübt. Das war für mich ein Traum.“ Mit zwölf Jahren möchte German schließlich ganz zur Viola wechseln, aber: Der Bratschenlehrer am College von Wladikawkas, eine Institution zwischen Musikschule und Konservatorium, möchte das nicht wahrhaben. „Es gab damals dieses Klischee, dass schlechte Geiger zur Bratsche wechseln. Er fand aber, dass ich sehr gut Geige spiele. Er konnte nicht verstehen, dass ich den Klang schöner fand.“",
            "Auf den schlussendlichen Schritt zur Bratsche muss der junge German noch eine Weile warten, bis zur Musik-Spezialschule des Konservatoriums in St. Petersburg. „Als Kind war ich total fasziniert von dem Wort Konservatorium. Schon nach dem ersten Musikunterricht war mir eigentlich sofort klar, dass ich Musiker werden würde. Es kamen zu uns nach Wladikawkas immer wieder Studierende aus den Konservatorien in Petersburg und Moskau, um uns zu unterrichten. Ich wollte auch an einem solchen Konservatorium studieren.“",
          ],
        ],
      },
      {
        titel: "Von Wladikawkas nach St. Petersburg",
        absaetze: [
          [
            "Mit 13 Jahren denkt German erstmals darüber nach, nach Petersburg zu gehen. Er kennt die Stadt gut, zumal dort Verwandte der Familie leben. „Natürlich kam mir auch die Musik-Spezialschule des Petersburger Konservatoriums in den Sinn, aber ich dachte, dass ich nicht gut genug dafür sei.“ Immerhin ist es eine Schule für Hochbegabte. Hier lernten auch Mariss Jansons, Grigori Sokolov oder Mischa Maisky. „Wir hatten das gar nicht auf dem Schirm. Mit meiner Mutter bin ich nach Petersburg gefahren, zu einem College, da war ich 14 Jahre. Wir haben einen Antrag gestellt für die Aufnahmeprüfung und haben auch mit dem Direktor gesprochen.“",
            "Aber German ist noch zu jung für das College. Er braucht noch eine Betreuung, so wie an der Spezial-Musikschule nebenan, zu der ein Internat gehört. Die Tante von German in Petersburg kennt eine Lehrerin an der Spezial-Musikschule und schaltet sich ein. Die Aufnahmeprüfungen für die Spezial-Musikschule sind eigentlich schon vorüber, aber: German spielt mit der Geige einer Lehrerin vor. Ihre Geigenklasse sei bereits voll, sagt sie. „Eigentlich möchte ich Bratsche spielen“, schießt es aus German heraus.",
            "Die Lehrerin ist erstaunt und begeistert. „Wir haben den besten Professor für Bratsche hier, vom Petersburger Konservatorium“, sagt sie und spricht mit Wladimir Stopitschew. German spielt ihm vor, seine Mutter ist dabei. Er sagt nichts, reagiert nicht, was seiner zurückhaltenden Art geschuldet ist. Die Mutter ruft den Professor abends an, spricht mit ihm, bittet ihn. Er nimmt German auf, wollte wohl auch prüfen, wie wichtig German das ist und wie sehr die Familie dahinter steht. Das Leben in Petersburg kann beginnen.",
            "Für German und seine Familie ist schon sehr früh klar, dass Wladikawkas nicht mehr reichen würde – dass er in eine andere Stadt gehen muss, um sich weiterzubilden. „Das haben auch Lehrer gesagt, aber es war ein Prozess. Ich musste niemanden groß überzeugen, auch meine Mutter nicht. Ihr war jedoch wichtig, dass ich unter Kontrolle bin – deswegen St. Petersburg, wo wir Verwandte hatten.“ Die ersten Jahren an der Spezial-Musikschule war German regelmäßig zu Gast bei Tante und Onkel, Cousin und Cousine.",
            "„Natürlich hatte ich anfangs viel Heimweh, aber als ich mich erst eingelebt hatte im Internat, wollte ich gar nicht mehr weg.“ German geht auf, ist ganz in seinem Element – die Musik. Er spielt und übt, und wenn alle Probezimmer in der Spezial-Musikschule belegt sind, spielt er kurzerhand in der Waschküche – stundenlang, mitten im Trubel des Internats, den er komplett ausblendet. Die Spezial-Musikschule besucht German von 14 bis 19 Jahre, um danach direkt zum Konservatorium zu wechseln – in die Klasse seines Lehrers Wladimir Stopitschew. Er möchte German als Student weiter ausbilden, hat ihn schon zuvor zu Wettbewerben mitgenommen.",
          ],
        ],
      },
      {
        titel: "Von Petersburg nach Deutschland und Österreich",
        absaetze: [
          [
            "Das Studium am Petersburger Konservatorium beginnt 2009, und schon 2011 wagt German den Sprung nach Berlin, wo Tabea Zimmermann an der Musikhochschule „Hanns Eisler“ lehrt. Durch Aufnahmen im Internet und CDs entdeckt er für sich Tabea Zimmermann. „Ihre Perfektion und Klanggestaltung haben mich total fasziniert. Ich wollte nach Berlin.“ Seine Mutter kann das zunächst nicht verstehen. „Sie sagte mir, dass sie mir nicht helfen könne. Meine Eltern sind nicht reich. Sie konnte mich finanziell nicht mehr unterstützen, als sie es bereits taten.“",
            "Aber: „Ich war davon überzeugt, dass ich es irgendwie schaffen würde. Ich wusste nicht, dass man sich in Deutschland für mehrere Musikhochschulen gleichzeitig bewerben kann – zur Sicherheit. Ich habe nur in Berlin an der ‚Hanns Eisler‛ vorgespielt.“ Es klappt auf Anhieb. Erst später begreift German, wie viel Glück er hatte. In Berlin verdient er sich zusätzlich Geld mit Straßenmusik. Bei Tabea Zimmermann schließt er sein Bachelor- und Masterstudium ab, wird überdies ihr Assistent.",
            "Als Lehrbeauftragter unterrichtet er nicht nur an der Musikhochschule „Hanns Eisler“, sondern auch an der Musikhochschule in München. An der Isar wirkt German zudem für einige Jahre als festes Bratschenmitglied im Symphonieorchester des Bayerischen Rundfunks (BR), bevor er als Bratschenprofessor an die Musikhochschule in Karlsruhe berufen wird. Seit Oktober 2024 lehrt German als Bratschenprofessor an der Universität Mozarteum in Salzburg.",
            "Auch mit dem Unterrichten hat German schon frühzeitig begonnen. Es ist ihm gewissermaßen in die Wiege gelegt, denn: Seine Großeltern mütterlicherseits und Tanten waren selber Pädagogen. „Schon mit 10 Jahren wusste ich, dass ich auch musikpädagogisch tätig sein wollte – also von Anfang an“, verrät German. Bereits mit 10 Jahren unterrichtet er in Wladikawkas Kinder, damals noch an der Geige. An der Petersburger Spezial-Musikschule kommen alle möglichen Instrumente hinzu, auch Flöte, Posaune, Klavier oder Cello.",
          ],
        ],
      },
      {
        titel: "Work in progress",
        absaetze: [
          [
            "„Das Schöne am Unterrichten ist, dass man selbst sehr viel für sich dabei lernt. Die Kombination aus Unterrichten und Spielen ist sehr interessant, zumal das eine Vielseitigkeit in der Musik widerspiegelt. Orchester, Kammermusik oder Solo, Barock, Klassik, zeitgenössische Musik, andere Künste: Das alles in Verbindung mit der Bratsche ist großartig. Meine Aufgabe als Professor sehe ich darin, den Horizont der Studierenden zu erweitern. Es kann nicht das einzige Ziel sein, eine feste Stelle in einem Orchester zu erhalten.“",
            "Natürlich sei das eine „schöne Sicherheit“, aber: „Es gibt so viel mehr! Die Lehrtätigkeit und pädagogische Verantwortung für den Nachwuchs empfinde ich als größte Bereicherung in meinem beruflichen, künstlerischen Leben. Es erfüllt mich mit größter Freude, die Kenntnisse und das Wissen wie auch die Leidenschaft für die Musik, die mir selber durch große, fantastische Persönlichkeiten stets vermittelt wurden, nun selbst an die jungen Generationen weiterzugeben. Es ist ein Prozess des Suchens, des kontinuierlichen Lernens. Man bleibt nie stehen, ein ständiger Wandel – alles in Bewegung, im Fluss.“",
          ],
        ],
      },
    ],
  },
  en: {
    konzertTitel: "upcoming concert",
    konzertOrt: "Austria, Vienna, 16/10/2026",
    konzertZeilen: [
      { text: "Concert at Bechstein Centrum Wien", ziel: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/" },
      { text: "with Elena Nemtsova", ziel: "https://www.bechstein.com/centren/wien/veranstaltungen/konzert/duo-klavier-bratsche/" },
    ],
    zitat: [
      "„Music exists as a destination.",
      "Only then do I come as a person.“",
    ],
    ueberschrift: "VITA",
    kurz: [
      "It is rare for sound and artistic being and intention to form a perfectly congruent whole. This is the case with German Tcakulov. His generous and expansive, deeply soulful, warm, earthy, and colorful viola sound reflects an incredibly diverse mindset. German Tcakulov not only embodies this broad profile as a musician on stage but also conveys it as a viola professor at the Mozarteum in Salzburg.",
      "Whether orchestra, chamber music or solo, Baroque, Classical and Romantic, contemporary music or other arts: for German Tcakulov, it all fits together organically. As an artist, he lives the dialogue between eras, styles and genres. This being and wanting has determined his career from the very beginning. Born in Vladikavkaz, Russia, he began studying the viola at the age of 15 at the Special Music School of the Conservatory with Vladimir Stopitschew.",
      "German Tcakulov then studied with him at the St. Petersburg Conservatory before moving to Germany at the age of 21. He completed his bachelor's and master's degrees with Tabea Zimmerman at the Hanns Eisler Academy of Music in Berlin. He is a scholarship holder of the Lucia Loeser Foundation, has won prizes at international competitions, and has been invited to renowned festivals. From 2018 to 2022, he was a permanent member of the Bavarian Radio Symphony Orchestra (BR).",
      "There, he works with conductors such as Mariss Jansons, Simon Rattle, Bernard Haitink, and Herbert Blomstedt. His chamber music partners include Stephan Forck, Ulf Wallin, Tabea Zimmermann, Claudio Bohórquez, Stephan Pickard, Boris Garlitsky, Wen-Sinn Young, Ingolf Turban, Thomas Hoppe und Frank van de Laar. Between 2017 and 2022, German Tcakulov teaches at the music universities in Munich and \"Hanns Eisler\" in Berlin and is also assistant to Tabea Zimmermann. In the summer of 2022, he is appointed professor at the University of Music in Karlsruhe. Since October 2024, he has been professor of viola at the Mozarteum in Salzburg.",
    ],
    portraitTitel: "Everything in motion and in flow - a portrait by Florian Olters",
    mehr: "read more",
    weniger: "show less",
    abschnitte: [
      {
        absaetze: [
          [
            "A soulful sound, earthy and warmly grounded, yet mysterious and dark, expansive and profound, extraordinarily rich in color: this describes the viola tone of German Tcakulov in a most distinctive and uniquely personal way. He seems to literally sing and speak with and through the viola. In his playing, certain colorations predominate fir green or brown colors that prevail in his homeland: the Caucasus. He comes from Vladikavkaz in North Ossetia-Alania. True to its name, this major city rules over the Caucasus.",
          ],
        ],
      },
      {
        titel: "Origin: the Caucasus",
        absaetze: [
          [
            "The Caucasus - that dramatic mountain range stretching between Europe and Asia, with its towering peaks, endless expanses, and dense forests, extraordinarily rich in languages and cultures - this is where German grows up and finds his way, through various paths, to his instrument: the viola. As so often happens, this journey leads through the violin first. \"Actually, I wanted to play viola from very early on,\" German confides, \"but in Russia, there's no viola instruction for children like there is in Western Europe, at least not at public music schools.\"",
            "At the very beginning, though, there is the piano. \"We had a piano at home, and my mother always enjoyed making music. At seven years old, I took piano lessons with her former teacher. But I soon found the instrument rather boring, too mechanical. It didn't bring me joy.\"",
            "Alongside these lessons, German attends concerts with his mother at the Vladikavkaz Philharmonic-a venue he still raves about today. \"It was an old German Lutheran church that had been converted into a concert hall during Soviet times. Its acoustics are among the best in all of Russia.\" In this remarkable setting, young German listens to the Vladikavkaz Philharmonic perform. One day, Beethoven's Fifth Symphony rings out. \"When the fugato began in the first movement, I could feel the chairs vibrating beneath me. I was especially fascinated by the deeper sounds, the vibrations and resonances.\"",
            "Visually, too, German finds the string instruments captivating. \"I absolutely didn't care whether it was violin, viola, cello, or double bass - as long as it had strings. The sight of bows moving across strings impressed me immediately. I was eight years old, and from then on I dreamed of playing a stringed instrument myself.\"",
            "Soon German learns that his grandfather had played several instruments. \"My mother told me that we also had a violin at home. I discovered it somewhere and claimed it for myself.\" The violin had no strings, no bridge, nothing - just the body and a bow. \"But I found it beautiful, an old German instrument from Saxony. I would stand in front of the mirror and pretend to play. No sound came out, but I moved the bow back and forth through the air. I became so obsessed that I desperately wanted to play violin. I completely wore down my parents, saying over and over again that I wanted to play violin. But I had already started piano and quit after two or three months.\"",
          ],
        ],
      },
      {
        titel: "Piano – Violin – Viola",
        absaetze: [
          [
            "So, his mother waits, expecting her son to forget the violin - just as he had the piano before. But shortly after, his father intervenes because his son engages so intensively and continuously with the violin. \"In my free time, I crafted violins from paper, also cellos, various instruments - a small orchestra made entirely of paper.\" Private lessons? Not even to be considered, far too expensive for the family.",
            "His mother promptly takes her son to the state - funded and therefore free Music School No. 1 in Vladikavkaz - the same school she herself had attended. \"The director asked me a few questions: what I wanted and why I wanted it. I told her about the concert and the violin without strings.\" The director is astounded. \"You know, in forty years of professional experience I've never encountered a child who voluntarily wants to play violin,\" she tells German's mother. \"You must speak with the department head. She's the best violin teacher in the Caucasus.\"",
            "Two days later, they visit an elderly lady who, though she no longer typically takes new students, says to German: \"Give me your little hands.\" She examines his hands, plays notes and taps rhythms that little German should imitate. \"My mother said I sang incredibly off-key. Really terrible.\" She even apologizes for German's singing, but the teacher replies curtly: \"Oh, boys are always slower in development.\"",
            "So, violin lessons begin, but from the start the teacher is convinced that German will eventually switch to viola. She brings this up repeatedly. \"She was very pragmatic,\" German reflects today. \"A good violist will always find employment, she would say. There are many good violinists. She told me that I should choose viola at every opportunity. Perhaps I became a violist partly because she said it so persistently.\"",
            "And then comes the pivotal moment: At a concert during intermission, German sees a viola up close for the first time. \"I secretly plucked the open strings, and from that moment on I only wanted to play viola.\" To help him become better acquainted with the viola's voice, his teacher gives him recordings of violist Yuri Bashmet. German is immediately captivated by one recording: Alfred Schnittke's Viola Concerto. \"This impression completely overwhelmed me and has remained in my memory to this day.\" The depth, the sound volume, the warmth, the sonority: \"When I heard this sound, I was totally fascinated. Like the human voice. It spoke to me directly. I had never felt that way with the violin.\"",
            "Young German promptly tunes down his violin strings to achieve the viola's tuning. \"From then on, I practiced half the time with the lower tuning. That was pure joy for me.\" At twelve years old, German finally wants to switch completely to viola, but the viola teacher at the Vladikavkaz College - an institution between music school and conservatory - resists this decision. \"There was this cliché then that poor violinists switch to viola. But he thought I played violin very well. He couldn't understand that I simply found the viola's sound more beautiful.\"",
            "For the final step to viola, young German must wait a while longer, until he reaches the Music Special School of the Conservatory in St. Petersburg. \"As a child, I was totally fascinated by the word 'conservatory.' Right after my first music lesson, it became immediately clear to me that I would become a musician. Students from the conservatories in Petersburg and Moscow would regularly come to us in Vladikavkaz to teach masterclasses. I also wanted to study at such a conservatory.\"",
          ],
        ],
      },
      {
        titel: "From Vladikavkaz to St. Petersburg",
        absaetze: [
          [
            "At thirteen, German first seriously considers going to Petersburg. He knows the city well, especially since family relatives live there. \"Of course, the Music Special School of the Petersburg Conservatory came to mind, but I thought I wasn't good enough for it.\" After all, it's a school for the highly gifted - Mariss Jansons, Grigori Sokolov, and Mischa Maisky all studied there. \"We hadn't even considered it initially. I traveled to Petersburg with my mother to audition at a college when I was fourteen. We submitted an application for the entrance exam and spoke with the director.\"",
            "But German is still too young for the college - he still needs supervision, like what's available at the Special Music School next door, which has boarding facilities. German's aunt in Petersburg knows a teacher at the Special Music School and intervenes on his behalf. The entrance exams for the Special Music School are technically over, but German auditions anyway, borrowing a teacher's violin. Her violin class is already full, she explains. \"Actually, I want to play viola,\" bursts out of German.",
            "The teacher is both astonished and delighted. \"We have the best professor for viola here, from the Petersburg Conservatory,\" she says, and arranges for German to meet Vladimir Stopichev. German auditions for him while his mother watches. Stopichev says nothing, doesn't react - a reserve typical of his nature. That evening, German's mother calls the professor, speaks with him, pleads with him. He accepts German, apparently wanting to test how important this opportunity is to both German and his family. Life in Petersburg can begin.",
            "For German and his family, it becomes clear very early that Vladikavkaz would no longer suffice - that he must go to another city to continue his musical education. \"Teachers had said this too, but it was a gradual process. I didn't have to convince anyone, not even my mother. However, it was important to her that I be properly supervised - that's why St. Petersburg made sense, where we had relatives.\"",
            "During his first years at the Special Music School, German regularly stays with his aunt and uncle and their children. \"Of course, I was very homesick at first, but once I had settled into the boarding school routine, I didn't want to leave anymore.\" German flourishes, completely in his element - music becomes his world. He plays and practices constantly, and when all the practice rooms in the Special Music School are occupied, he simply plays in the laundry room - for hours, in the middle of the boarding school's hustle and bustle, which he completely blocks out. German attends the Special Music School from ages fourteen to nineteen, then transitions directly to the conservatory - into the class of his teacher Vladimir Stopichev, who wants to continue training German as a student, having already taken him to competitions.",
          ],
        ],
      },
      {
        titel: "From Petersburg to Germany and Austria",
        absaetze: [
          [
            "His studies at the Petersburg Conservatory begin in 2009, and already in 2011 German takes the bold leap to Berlin, where Tabea Zimmermann teaches at the \"Hanns Eisler\" University of Music. Through internet recordings and CDs, he discovers Tabea Zimmermann's artistry. \"Her perfection and sound shaping totally fascinated me. I was determined to study in Berlin.\" His mother cannot understand this decision at first. \"She told me she couldn't help me financially. My parents aren't wealthy. She couldn't support me more than she already was.\"",
            "But German remains undeterred: \"I was convinced that I would somehow make it work. I didn't realize that in Germany you can apply to several music universities simultaneously for safety. I only auditioned in Berlin at 'Hanns Eisler.'\" It works on the first try - only later does German realize how fortunate he was. In Berlin, he earns additional money busking on the streets. With Tabea Zimmermann, he completes both his bachelor's and master's degrees and eventually becomes her assistant.",
            "As a lecturer, he teaches not only at the \"Hanns Eisler\" University of Music but also at the Music University in Munich. In Munich, German also serves for several years as a permanent viola member of the Bavarian Radio Symphony Orchestra before being appointed as viola professor at the Music University in Karlsruhe. Since October 2024, German has been teaching as viola professor at the University Mozarteum in Salzburg.",
            "German began teaching early as well - it was, in a sense, part of his heritage, since his maternal grandparents and aunts were themselves educators. \"Already at ten years old, I knew I wanted to be active in music education - from the very beginning,\" German reveals. At ten, he was already teaching children in Vladikavkaz, initially on violin. At the Petersburg Special Music School, he expanded to teaching all kinds of instruments - flute, trombone, piano, cello.",
          ],
        ],
      },
      {
        titel: "Work in progress",
        absaetze: [
          [
            "\"The beautiful thing about teaching is that you learn so much for yourself in the process. The combination of teaching and performing is fascinating, especially as it reflects the versatility inherent in music itself. Orchestra, chamber music, solo work, Baroque, Classical, contemporary music, connections to other arts - all of this in relation to the viola is magnificent. I see my role as a professor in expanding my students' horizons. It cannot be the sole goal to obtain a permanent position in an orchestra.\"",
            "Of course, that represents \"wonderful security,\" but as German emphasizes: \"There's so much more! I experience the teaching activity and pedagogical responsibility for the next generation as the greatest enrichment in my professional, artistic life. It fills me with the greatest joy to pass on the knowledge and understanding as well as the passion for music that was always conveyed to me by great, fantastic personalities - now to share this with young generations myself. It's a process of searching, of continuous learning. One never stands still - everything is in constant change, everything in motion, in flow.\"",
          ],
        ],
      },
    ],
  },
};
