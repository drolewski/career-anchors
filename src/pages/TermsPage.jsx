import { useLang } from '../lib/i18n.jsx';
import Header from '../components/Header.jsx';
import SeoMeta from '../components/SeoMeta.jsx';

export default function TermsPage() {
  const { lang } = useLang();
  const isPl = lang === 'pl';

  const content = isPl ? {
    lastUpdated: 'Data ostatniej aktualizacji: 11 maja 2026',
    title: 'Regulamin Serwisu',
    intro: 'Niniejszy Regulamin określa zasady korzystania z serwisu internetowego career-anchors.pl.',
    
    section1: {
      title: 'Postanowienia ogólne',
      items: [
        'Serwis career-anchors.pl (zwany dalej "Serwisem") jest platformą internetową umożliwiającą użytkownikom bezpłatne wypełnienie ankiety Kotwic Kariery Scheina.',
        'Właścicielem Serwisu jest Dominik Rolewski (zwany dalej "Właścicielem").',
        'Korzystanie z Serwisu jest dobrowolne i nie wymaga rejestracji.',
        'Użytkownik potwierdza zapoznanie się z niniejszym Regulaminem przed rozpoczęciem korzystania z Serwisu.'
      ]
    },
    
    section2: {
      title: 'Zakres usługi',
      items: [
        'Serwis oferuje bezpłatny test Kotwic Kariery składający się z 40 stwierdzeń do oceny w skali 1-6 oraz wyboru 3 najważniejszych.',
        'Na podstawie odpowiedzi Serwis generuje wynik wskazujący dominujące Kotwice Kariery użytkownika.',
        'Serwis udostępnia również anonimowe statystyki zbiorcze z odpowiedzi wszystkich użytkowników.',
        'Serwis nie gwarantuje określonych wyników ani nie udziela porad zawodowych.'
      ]
    },
    
    section3: {
      title: 'Warunki korzystania',
      items: [
        'Użytkownik może korzystać z Serwisu wielokrotnie.',
        'Zabronione jest wykorzystywanie Serwisu w sposób naruszający prawo lub postanowienia niniejszego Regulaminu.',
        'Użytkownik ponosi odpowiedzialność za wszelkie działania podejmowane w ramach korzystania z Serwisu.',
        'Serwis jest przeznaczony dla osób pełnoletnich. Osoby niepełnoletnie mogą korzystać z Serwisu za zgodą rodziców lub opiekunów prawnych.'
      ]
    },
    
    section4: {
      title: 'Własność intelektualna',
      items: [
        'Wszelkie prawa do treści, designu, oprogramowania i marki Serwisu należą do Właściciela.',
        'Koncepcja Kotwic Kariery została opracowana przez Edgara Scheina z MIT i jest wykorzystywana w Serwisie na podstawie publicznie dostępnych informacji.',
        'Kopiowanie, modyfikowanie lub dystrybucja treści Serwisu bez zgody Właściciela jest zabronione.'
      ]
    },
    
    section5: {
      title: 'Ograniczenie odpowiedzialności',
      items: [
        'Właściciel nie ponosi odpowiedzialności za szkody wynikające z korzystania lub niemożności korzystania z Serwisu.',
        'Serwis nie zastępuje profesjonalnej porady zawodowej, psychologicznej ani terapeutycznej.',
        'Właściciel nie gwarantuje ciągłej dostępności Serwisu ani nieprzerwanego działania.',
        'Właściciel nie odpowiada za treści ani politykę prywatności stron trzecich, do których prowadzą linki zamieszczone w Serwisie.'
      ]
    },
    
    section6: {
      title: 'Dane i statystyki',
      items: [
        'Dane wprowadzane przez użytkowników są wykorzystywane do generowania wyników testu oraz anonimowych statystyk.',
        'Anonimowe dane statystyczne mogą być publikowane przez Właściciela.',
        'Użytkownik zachowuje prawo do swoich odpowiedzi, ale przekazując je akceptuje ich wykorzystanie zgodnie z Polityką Prywatności.'
      ]
    },
    
    section7: {
      title: 'Zmiany Regulaminu',
      items: [
        'Właściciel zastrzega sobie prawo do wprowadzania zmian w Regulaminie w dowolnym czasie.',
        'O zmianach Regulaminu użytkownicy zostaną poinformowani poprzez publikację nowej wersji na tej stronie.',
        'Kontynuacja korzystania z Serwisu po wprowadzeniu zmian oznacza akceptację nowego Regulaminu.'
      ]
    },
    
    section8: {
      title: 'Postanowienia końcowe',
      items: [
        'W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie przepisy prawa polskiego.',
        'Właściciel dąży do rozwiązywania sporów polubownie. W przypadku braku porozumienia, właściwym sądem jest sąd właściwy dla miejsca zamieszkania Właściciela.',
        'Niniejszy Regulamin wchodzi w życie z dniem publikacji na stronie Serwisu.'
      ]
    },
    
    footer: {
      contact: 'Kontakt',
      contactText: 'W sprawach dotyczących Regulaminu prosimy o kontakt:',
      email: 'drolewski@gmail.com'
    }
  } : {
    lastUpdated: 'Last updated: May 11, 2026',
    title: 'Terms of Service',
    intro: 'These Terms of Service (hereinafter "Terms") define the rules for using the career-anchors.pl website.',
    
    section1: {
      title: 'General Provisions',
      items: [
        'The career-anchors.pl website (hereinafter "Service") is an internet platform enabling users to complete the Schein Career Anchors questionnaire free of charge.',
        'The owner of the Service is Dominik Rolewski (hereinafter "Owner").',
        'Use of the Service is voluntary and does not require registration.',
        'The user confirms having read these Terms before starting to use the Service.'
      ]
    },
    
    section2: {
      title: 'Scope of Service',
      items: [
        'The Service offers a free Career Anchors test consisting of 40 statements to rate on a scale of 1-6 and selection of 3 most important.',
        'Based on responses, the Service generates results indicating the user\'s dominant Career Anchors.',
        'The Service also provides anonymous aggregate statistics from all users\' responses.',
        'The Service does not guarantee specific results or provide career advice.'
      ]
    },
    
    section3: {
      title: 'Terms of Use',
      items: [
        'The user may use the Service multiple times.',
        'It is prohibited to use the Service in a manner that violates the law or these Terms.',
        'The user is responsible for all actions taken while using the Service.',
        'The Service is intended for adults. Minors may use the Service with consent of parents or legal guardians.'
      ]
    },
    
    section4: {
      title: 'Intellectual Property',
      items: [
        'All rights to content, design, software, and the Service brand belong to the Owner.',
        'The Career Anchors concept was developed by Edgar Schein from MIT and is used in the Service based on publicly available information.',
        'Copying, modifying, or distributing Service content without the Owner\'s consent is prohibited.'
      ]
    },
    
    section5: {
      title: 'Limitation of Liability',
      items: [
        'The Owner is not liable for damages resulting from using or being unable to use the Service.',
        'The Service does not replace professional career, psychological, or therapeutic advice.',
        'The Owner does not guarantee continuous availability or uninterrupted operation of the Service.',
        'The Owner is not responsible for content or privacy policies of third-party sites linked from the Service.'
      ]
    },
    
    section6: {
      title: 'Data and Statistics',
      items: [
        'Data entered by users is used to generate test results and anonymous statistics.',
        'Anonymous statistical data may be published by the Owner.',
        'By submitting responses, the user accepts their use according to the Privacy Policy.'
      ]
    },
    
    section7: {
      title: 'Changes to Terms',
      items: [
        'The Owner reserves the right to make changes to these Terms at any time.',
        'Users will be informed of changes by publishing the new version on this page.',
        'Continuing to use the Service after changes implies acceptance of the new Terms.'
      ]
    },
    
    section8: {
      title: 'Final Provisions',
      items: [
        'Matters not regulated in these Terms are governed by Polish law.',
        'The Owner strives to resolve disputes amicably. If no agreement is reached, the competent court is the court for the Owner\'s place of residence.',
        'These Terms come into force on the date of publication on the Service website.'
      ]
    },
    
    footer: {
      contact: 'Contact',
      contactText: 'For matters related to Terms of Service, please contact:',
      email: 'drolewski@gmail.com'
    }
  };

  return (
    <>
      <SeoMeta />
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <a
          href="#terms-main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          {isPl ? 'Przejdź do treści' : 'Skip to content'}
        </a>
        
        <Header />
        
        <main id="terms-main" className="max-w-3xl mx-auto">
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
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section1.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section2.title}</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section2.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section3.title}</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section3.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section4.title}</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section4.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section5.title}</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section5.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section6.title}</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section6.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section7.title}</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section7.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.section8.title}</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {content.section8.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="border-t border-slate-700 pt-8">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">{content.footer.contact}</h2>
            <p className="text-slate-300 mb-4">{content.footer.contactText}</p>
            <p>
              <span className="text-slate-400">Email:</span>{' '}
              <a href="mailto:drolewski@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                {content.footer.email}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
    </>
  );
}