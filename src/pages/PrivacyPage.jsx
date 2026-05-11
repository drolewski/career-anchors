import { useLang } from '../lib/i18n.jsx';
import Header from '../components/Header.jsx';
import SeoMeta from '../components/SeoMeta.jsx';

export default function PrivacyPage() {
  const { lang } = useLang();
  const isPl = lang === 'pl';

  const content = isPl ? {
    lastUpdated: 'Data ostatniej aktualizacji: 11 maja 2026',
    title: 'Polityka Prywatności',
    intro: 'Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników korzystających z serwisu career-anchors.pl.',
    
    section1: {
      title: 'Administrator danych',
      content: 'Administratorem danych osobowych jest Dominik Rolewski, zamieszkały w Polsce, dostępny pod adresem e-mail: drolewski@gmail.com. Kontakt możliwy jest również poprzez LinkedIn: linkedin.com/in/dominik-rolewski-01bba9155/'
    },
    
    section2: {
      title: 'Zakres przetwarzanych danych',
      content: 'Serwis career-anchors.pl nie zbiera danych osobowych w rozumieniu RODO. Użytkownicy podają jedynie:',
      items: [
        'Rok urodzenia (w celu określenia przynależności pokoleniowej)',
        'Stanowisko (kategorie ogólne, np. "Menedżer", "Specjalista")',
        'Branżę (kategorie ogólne, np. "IT", "Finanse")',
        'Oceny 40 stwierdzeń w skali 1-6',
        'Wybór 3 najważniejszych stwierdzeń'
      ],
      note: 'Powyższe dane nie pozwalają na identyfikację konkretnej osoby fizycznej.'
    },
    
    section3: {
      title: 'Cel i podstawa prawna przetwarzania',
      content: 'Dane zbierane w serwisie służą wyłącznie do:',
      items: [
        'Obliczenia wyniku testu Kotwic Kariery',
        'Generowania anonimowych statystyk zbiorowych',
        'Udoskonalania algorytmu analizy'
      ],
      legalBasis: 'Podstawą prawną przetwarzania jest art. 6 ust. 1 lit. a RODO (zgoda użytkownika). Użytkownik dobrowolnie podaje dane w celu otrzymania wyniku testu.'
    },
    
    section4: {
      title: 'Przechowywanie danych',
      content: 'Dane odpowiedzi przechowywane są w bazie danych Supabase. Dane nie są przekazywane osobom trzecim ani do krajów trzecich. Anonimowe dane statystyczne mogą być wykorzystywane do celów badawczych i edukacyjnych.'
    },
    
    section5: {
      title: 'Ciasteczka (Cookies)',
      content: 'Serwis nie wykorzystuje plików cookies do celów śledzenia użytkowników. Jedynymi przechowywanymi danymi lokalnymi są:',
      items: [
        'Postęp ankiety (localStorage) - umożliwia wznowienie wypełniania',
        'Preferencje języka (localStorage)',
        'Poprzednie wyniki (localStorage)'
      ],
      note: 'Dane te są przechowywane wyłącznie w przeglądarce użytkownika i nie są przesyłane na serwer.'
    },
    
    section6: {
      title: 'Prawa użytkownika',
      content: 'Ponieważ serwis nie przetwarza danych osobowych, prawa wynikające z art. 15-22 RODO (dostęp, sprostowanie, usunięcie, ograniczenie przetwarzania, przenoszenie, sprzeciw) nie mają zastosowania. W przypadku pytań prosimy o kontakt mailowy.'
    },
    
    section7: {
      title: 'Bezpieczeństwo',
      content: 'Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa przetwarzanych danych, w tym: szyfrowanie HTTPS, bezpieczne hasła do bazy danych, regularne aktualizacje oprogramowania.'
    },
    
    section8: {
      title: 'Zmiany polityki',
      content: 'Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. Wszelkie zmiany będą publikowane na tej stronie. Zachęcamy do regularnego sprawdzania treści Polityki.'
    },
    
    footer: {
      contact: 'Kontakt',
      contactText: 'W sprawach dotyczących polityki prywatności prosimy o kontakt:',
      email: 'drolewski@gmail.com',
      linkedin: 'LinkedIn Profile'
    }
  } : {
    lastUpdated: 'Last updated: May 11, 2026',
    title: 'Privacy Policy',
    intro: 'This Privacy Policy describes the principles of processing and protection of personal data of users using the career-anchors.pl service.',
    
    section1: {
      title: 'Data Controller',
      content: 'The data controller is Dominik Rolewski, based in Poland, accessible at: drolewski@gmail.com. Contact is also possible via LinkedIn: linkedin.com/in/dominik-rolewski-01bba9155/'
    },
    
    section2: {
      title: 'Scope of Processed Data',
      content: 'The career-anchors.pl service does not collect personal data as defined by GDPR. Users only provide:',
      items: [
        'Year of birth (to determine generational affiliation)',
        'Position (general categories, e.g., "Manager", "Specialist")',
        'Industry (general categories, e.g., "IT", "Finance")',
        'Ratings of 40 statements on a scale of 1-6',
        'Selection of 3 most important statements'
      ],
      note: 'The above data does not allow identification of a specific individual.'
    },
    
    section3: {
      title: 'Purpose and Legal Basis for Processing',
      content: 'Data collected in the service is used solely for:',
      items: [
        'Calculating the Career Anchors test result',
        'Generating anonymous collective statistics',
        'Improving the analysis algorithm'
      ],
      legalBasis: 'The legal basis for processing is Art. 6(1)(a) GDPR (user consent). The user voluntarily provides data to receive the test result.'
    },
    
    section4: {
      title: 'Data Storage',
      content: 'Response data is stored in a Supabase database. Data is not transferred to third parties or to third countries. Anonymous statistical data may be used for research and educational purposes.'
    },
    
    section5: {
      title: 'Cookies',
      content: 'The service does not use cookies for user tracking purposes. The only locally stored data are:',
      items: [
        'Survey progress (localStorage) - allows resuming the survey',
        'Language preferences (localStorage)',
        'Previous results (localStorage)'
      ],
      note: 'This data is stored only in the user\'s browser and is not sent to the server.'
    },
    
    section6: {
      title: 'User Rights',
      content: 'Since the service does not process personal data, rights resulting from Art. 15-22 GDPR (access, rectification, erasure, restriction, portability, objection) do not apply. For questions, please contact via email.'
    },
    
    section7: {
      title: 'Security',
      content: 'The administrator applies appropriate technical and organizational measures to ensure the security of processed data, including: HTTPS encryption, secure database passwords, regular software updates.'
    },
    
    section8: {
      title: 'Policy Changes',
      content: 'The administrator reserves the right to make changes to this Privacy Policy. Any changes will be published on this page. We encourage you to regularly check the Policy content.'
    },
    
    footer: {
      contact: 'Contact',
      contactText: 'For matters related to privacy policy, please contact:',
      email: 'drolewski@gmail.com',
      linkedin: 'LinkedIn Profile'
    }
  };

  return (
    <>
      <SeoMeta />
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <a
          href="#privacy-main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          {isPl ? 'Przejdź do treści' : 'Skip to content'}
        </a>
        
        <Header />
        
        <main id="privacy-main" className="max-w-3xl mx-auto">
        <p className="text-sm text-slate-500 mb-6">{content.lastUpdated}</p>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          <span className="gradient-text">{content.title}</span>
        </h1>
        
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
          <p className="text-slate-300 leading-relaxed mb-8">
            {content.intro}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section1.title}</h2>
            <p className="text-slate-300 leading-relaxed">{content.section1.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section2.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{content.section2.content}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              {content.section2.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-400 text-sm italic">{content.section2.note}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section3.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{content.section3.content}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              {content.section3.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-400 text-sm">{content.section3.legalBasis}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section4.title}</h2>
            <p className="text-slate-300 leading-relaxed">{content.section4.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section5.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{content.section5.content}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              {content.section5.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-400 text-sm italic">{content.section5.note}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section6.title}</h2>
            <p className="text-slate-300 leading-relaxed">{content.section6.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section7.title}</h2>
            <p className="text-slate-300 leading-relaxed">{content.section7.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section8.title}</h2>
            <p className="text-slate-300 leading-relaxed">{content.section8.content}</p>
          </section>

          <section className="border-t border-slate-700 pt-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.footer.contact}</h2>
            <p className="text-slate-300 mb-4">{content.footer.contactText}</p>
            <div className="space-y-2">
              <p>
                <span className="text-slate-400">Email:</span>{' '}
                <a href="mailto:drolewski@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                  {content.footer.email}
                </a>
              </p>
              <p>
                <span className="text-slate-400">LinkedIn:</span>{' '}
                <a 
                  href="https://www.linkedin.com/in/dominik-rolewski-01bba9155/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  {content.footer.linkedin}
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
    </>
  );
}