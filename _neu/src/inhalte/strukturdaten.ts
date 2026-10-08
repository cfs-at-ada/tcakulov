import type { Sprache } from './navigation';
import type { TerminDaten } from './terminformat';
import { person } from './seo';

/**
 * Strukturierte Daten nach schema.org. Suchmaschinen lesen daraus, wer
 * German Tcakulov ist und wann er wo auftritt.
 */

export function personDaten(sprache: Sprache, adresse: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: adresse,
    jobTitle: person.stelle[sprache],
    description: person.beruf[sprache],
    knowsAbout: sprache === 'de' ? ['Viola', 'Kammermusik'] : ['Viola', 'Chamber music'],
    worksFor: { '@type': 'CollegeOrUniversity', name: person.arbeitgeber.name, url: person.arbeitgeber.url },
    sameAs: person.profile,
  };
}

export function terminDaten(termine: TerminDaten[], sprache: Sprache, adresse: string) {
  const kuenstler = { '@type': 'Person', name: person.name };
  return {
    '@context': 'https://schema.org',
    '@graph': termine.map((t) => {
      const beginn = t.uhrzeit ? `${t.start}T${t.uhrzeit}` : t.start;
      const link = t.link[sprache] || adresse;
      return {
        '@type': t.typ === 'konzert' ? 'MusicEvent' : t.typ === 'meisterkurs' ? 'EducationEvent' : 'Event',
        name: [t.titel[sprache], t.zusatz[sprache]].filter(Boolean).join(' – '),
        startDate: beginn,
        ...(t.ende ? { endDate: t.ende } : {}),
        eventStatus: t.abgesagt ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: t.ort[sprache], address: t.ort[sprache] },
        performer: kuenstler,
        url: link,
        ...(t.tickets && !t.abgesagt ? { offers: { '@type': 'Offer', url: t.tickets } } : {}),
      };
    }),
  };
}
