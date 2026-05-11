import { useLang } from '../lib/i18n.jsx';
import Header from '../components/Header.jsx';
import SeoMeta from '../components/SeoMeta.jsx';

export default function AboutPage() {
  const { t, lang } = useLang();
  const isPl = lang === 'pl';

  const content = isPl ? {
    title: "Czym są Kotwice Kariery?",
    subtitle: "Odkryj swój prawdziwy potencjał zawodowy",
    whatIs: {
      title: "Czym jest ankieta Kotwic Kariery?",
      p1: "Kotwice Kariery to koncepcja stworzona przez Edgara Scheina, legendarnego profesora z MIT, który od lat 60. badał, co naprawdę determinuje nasze wybory zawodowe. To nie jest zwykły test – to głęboka analiza Twojego wewnętrznego kompasu, który kieruje Twoją karierą.",
      p2: "Ankieta składa się z 40 stwierdzeń, które oceniasz w skali 1-6, a następnie wybierasz 3 najważniejsze. Na tej podstawie algorytm wyznacza Twoje dominanty – tzw. kotwice, które definiują Twoją tożsamość zawodową.",
      p3: "Osiem kotwic według Scheina: Kompetencje Techniczne, Kompetencje Zarządcze, Autonomia, Bezpieczeństwo, Kreatywność Przedsiębiorcza, Służba, Czyste Wyzwanie i Styl Życia."
    },
    anchors: {
      title: "8 Kotwic Kariery Scheina",
      items: [
        {
          name: "Kompetencje techniczne/funkcjonalne",
          desc: "Twój świat to ekspertyza i mistrzostwo w określonej dziedzinie. Jesteś dumny/dumna z bycia ekspertem, do którego inni przychodzą po radę."
        },
        {
          name: "Kompetencje zarządcze",
          desc: "Sukces oznacza dla Ciebie przywództwo, odpowiedzialność i wpływ na losy organizacji. Lubisz integrować zespoły i podejmować kluczowe decyzje."
        },
        {
          name: "Autonomia / Niezależność",
          desc: "Potrzebujesz swobody w określaniu jak i kiedy pracujesz. Organizacyjne zasady i sztywne godziny są dla Ciebie ograniczeniem."
        },
        {
          name: "Bezpieczeństwo / Stabilność",
          desc: "Cenisz przewidywalność, stabilność zatrudnienia i dobre świadczenia. Lojalność i długoterminowe zatrudnienie są dla Ciebie kluczowe."
        },
        {
          name: "Kreatywność przedsiębiorcza",
          desc: "Marzysz o tworzeniu czegoś nowego – produktu, usługi, firmy. Własność i twórczość są Twoim paliwem."
        },
        {
          name: "Służba / Oddanie sprawie",
          desc: "Twoja praca musi mieć sens. Chcesz wpływać na świat i pomagać innym zgodnie ze swoimi wartościami."
        },
        {
          name: "Czyste wyzwanie",
          desc: "Potrzebujesz nieustannych, trudnych wyzwań. Nudzisz się, gdy praca jest zbyt łatwa. Rywalizacja i niemożliwe problemy Cię napędzają."
        },
        {
          name: "Styl życia",
          desc: "Praca musi pasować do Twojego życia, nie odwrotnie. Rodzina, hobby i rozwój osobisty są tak samo ważne jak kariera."
        }
      ]
    },
    benefits: {
      title: "Korzyści z poznania swoich Kotwic Kariery",
      individual: {
        title: "Dla Ciebie",
        items: [
          "Podejmuj lepsze decyzje zawodowe na podstawie swoich prawdziwych motywacji",
          "Uniknij rozczarowania – wybieraj role, które pasują do Twojej natury",
          "Zrozum, dlaczego niektóre projekty lub stanowiska Cię przyciągają, a inne odpychają",
          "Planuj karierę świadomie, zgodnie z tym, co naprawdę Cię napędza",
          "Komunikuj swoje potrzeby pracodawcy w jasny sposób"
        ]
      },
      team: {
        title: "Dla Twojego zespołu",
        items: [
          "Zbuduj zespół o uzupełniających się kompetencjach i motywacjach",
          "Lepsze dopasowanie ról do osób – większa satysfakcja i produktywność",
          "Zrozumienie, dlaczego różni członkowie/członkinie zespołu reagują różnie na te same sytuacje",
          "Efektywniejsza komunikacja – różne kotwice wymagają różnych podejść",
          "Naturalna ścieżka rozwoju – każda kotwica ma inne wymagania"
        ]
      },
      company: {
        title: "Dla firmy",
        items: [
          "Lepszy recruitment – dopasowanie kandydatów/kandydatek do roli na poziomie wartości",
          "Strategiczne planowanie sukcesji – rozumienie, kto chce rozwijać się w jakim kierunku",
          "Efektywniejsze programy rozwoju pracowników/pracowniczek",
          "Niższa rotacja – ludzie na właściwych stanowiskach zostają dłużej",
          "Budowanie kultury organizacyjnej zrozumiałej dla różnych typów osób"
        ]
      }
    },
    howToUse: {
      title: "Jak wykorzystać ankietę w pracy?",
      employee: {
        title: "Jako pracownik/pracowniczka",
        items: [
          "Przed rozmową rekrutacyjną – sprawdź, czy firma oferuje to, czego naprawdę szukasz",
          "Przy planowaniu rozwoju – wybierz ścieżkę zgodną z Twoją kotwicą",
          "Negocjacje – wiedz, czego nie warto poświęcać (Twojej kotwicy nie oddasz łatwo)",
          "Zmiana pracy – niepowodzenia często wynikają z wyboru niezgodnego z kotwicą"
        ]
      },
      manager: {
        title: "Jako menedżer/ka lub lider/ka",
        items: [
          "Poznaj kotwice każdego członka zespołu – inaczej motywujesz eksperta/ ekspertkę, inaczej menedżera/kę",
          "Przydzielaj zadania zgodnie z kotwicami – Specjalista/specjalistka nie awansuje chętnie na menedżera/kę",
          "Buduj zespoły uzupełniające – brakujące kotwice uzupełniają inni",
          "Planuj ścieżki rozwoju – każda kotwica ma inne możliwości",
          "Rozmowy retencyjne – zrozum, co naprawdę trzyma (lub odpycha) daną osobę"
        ]
      },
      director: {
        title: "Jako dyrektor/ka lub lider/ka strategiczny/a",
        items: [
          "Mapuj kotwice kluczowych osób – wiedzy eksperckiej nie da się łatwo zastąpić",
          "Buduj pipeline – rozumiej, kto chce iść w górę, kto chce zostać ekspertem/ekspertką",
          "Strategiczna sukcesja – przygotuj różne ścieżki dla różnych typów",
          "Kształtuj kulturę – różne kotwice tworzą różne mikrokultury",
          "Fuzje i przejęcia – poznaj, kim naprawdę są ludzie, nie tylko ich CV"
        ]
      }
    },
    workshops: {
      title: "Warsztaty z Kotwic Kariery",
      intro: "Ankieta to dopiero początek. Warsztaty pozwalają głębiej zbadać dynamikę zespołu i wypracować konkretne działania.",
      contact: "Chcesz przeprowadzić warsztaty w swojej organizacji? ",
      contactLink: "Napisz do mnie – dopasuję format do Twoich potrzeb."
    },
    cta: {
      takeTest: "Rozpocznij ankietę",
      stats: "Zobacz statystyki",
      learnMore: "Dowiedz się więcej"
    }
  } : {
    title: "What Are Career Anchors?",
    subtitle: "Discover your true professional potential",
    whatIs: {
      title: "What is the Career Anchors assessment?",
      p1: "Career Anchors is a concept created by Edgar Schein, legendary MIT professor who since the 1960s has researched what truly drives our career choices. This is not a simple test – it's a deep analysis of your internal compass that guides your career.",
      p2: "The survey consists of 40 statements that you rate on a scale of 1-6, then choose the 3 most important. Based on this, the algorithm determines your dominants – the anchors that define your professional identity.",
      p3: "According to Schein, there are eight anchors: Technical/Functional Competence, General Managerial Competence, Autonomy, Security, Entrepreneurial Creativity, Service, Pure Challenge, and Lifestyle."
    },
    anchors: {
      title: "Schein's 8 Career Anchors",
      items: [
        {
          name: "Technical/Functional Competence",
          desc: "Your world is expertise and mastery in a specific field. You take pride in being the expert others come to for advice."
        },
        {
          name: "General Managerial Competence",
          desc: "Success means leadership, responsibility, and influence over the organization's fate. You enjoy integrating teams and making key decisions."
        },
        {
          name: "Autonomy/Independence",
          desc: "You need freedom in how and when you work. Organizational rules and fixed hours are a constraint for you."
        },
        {
          name: "Security/Stability",
          desc: "You value predictability, job stability, and good benefits. Loyalty and long-term employment are key for you."
        },
        {
          name: "Entrepreneurial Creativity",
          desc: "You dream of creating something new – a product, service, company. Ownership and creation are your fuel."
        },
        {
          name: "Service/Dedication to a Cause",
          desc: "Your work must have meaning. You want to impact the world and help others according to your values."
        },
        {
          name: "Pure Challenge",
          desc: "You need constant, difficult challenges. You get bored when work is too easy. Competition and unsolvable problems drive you."
        },
        {
          name: "Lifestyle",
          desc: "Work must fit your life, not the other way around. Family, hobbies, and personal growth are as important as career."
        }
      ]
    },
    benefits: {
      title: "Benefits of Knowing Your Career Anchors",
      individual: {
        title: "For You",
        items: [
          "Make better career decisions based on your true motivations",
          "Avoid disappointment – choose roles that fit your nature",
          "Understand why some projects or positions attract you while others repel you",
          "Plan your career consciously, aligned with what really drives you",
          "Communicate your needs to employers clearly"
        ]
      },
      team: {
        title: "For Your Team",
        items: [
          "Build teams with complementary competencies and motivations",
          "Better role-person fit – higher satisfaction and productivity",
          "Understand why team members react differently to the same situations",
          "More effective communication – different anchors require different approaches",
          "Natural growth path – each anchor has different requirements"
        ]
      },
      company: {
        title: "For the Company",
        items: [
          "Better recruitment – candidate-role fit at values level",
          "Strategic succession planning – understanding who wants to develop in which direction",
          "More effective employee development programs",
          "Lower turnover – people in right positions stay longer",
          "Building organizational culture understood by different types"
        ]
      }
    },
    howToUse: {
      title: "How to use the survey at work?",
      employee: {
        title: "As an employee",
        items: [
          "Before a job interview – check if the company offers what you're really looking for",
          "When planning development – choose a path aligned with your anchor",
          "Negotiations – know what not to sacrifice (you won't easily give up your anchor)",
          "Job change – failures often result from choices not aligned with your anchor"
        ]
      },
      manager: {
        title: "As a manager / leader",
        items: [
          "Know each team member's anchors – you motivate an expert differently than a manager",
          "Assign tasks according to anchors – a Specialist doesn't gladly advance to manager",
          "Build complementary teams – missing anchors are filled by others",
          "Plan development paths – each anchor has different opportunities",
          "Retention conversations – understand what really keeps (or repels) a person"
        ]
      },
      director: {
        title: "As a director / strategic leader",
        items: [
          "Map key people's anchors – expert knowledge can't be easily replaced",
          "Build pipeline – understand who wants to go up, who wants to stay expert",
          "Strategic succession – prepare different paths for different types",
          "Shape culture – different anchors create different micro-cultures",
          "M&A – really know people, not just their CVs"
        ]
      }
    },
    workshops: {
      title: "Career Anchors Workshops",
      intro: "The survey is just the beginning. Workshops allow for deeper exploration of team dynamics and developing concrete actions.",
      contact: "Interested in hosting workshops in your organization? ",
      contactLink: "Write to me – I'll adapt the format to your needs."
    },
    cta: {
      takeTest: "Start the survey",
      stats: "View statistics",
      learnMore: "Learn more"
    }
  };

  const skipToMain = () => {
    const main = document.getElementById('about-main');
    if (main) {
      main.focus();
      main.scrollIntoView();
    }
  };

  return (
    <>
      <SeoMeta />
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <a
          href="#about-main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          onClick={skipToMain}
        >
          {t('accessibility.skipToMain')}
        </a>
        <Header />
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">{content.title}</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">{content.subtitle}</p>
        </header>

        <main id="about-main" tabIndex={-1} className="focus:outline-none">
          <section className="mb-12" aria-labelledby="whatis-title">
            <h2 id="whatis-title" className="text-xl font-semibold text-slate-200 mb-4">{content.whatIs.title}</h2>
            <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
              <p className="text-slate-300 leading-relaxed">{content.whatIs.p1}</p>
              <p className="text-slate-300 leading-relaxed">{content.whatIs.p2}</p>
              <p className="text-slate-300 leading-relaxed">{content.whatIs.p3}</p>
            </div>
          </section>

          <section className="mb-12" aria-labelledby="anchors-title">
            <h2 id="anchors-title" className="text-xl font-semibold text-slate-200 mb-4">{content.anchors.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.anchors.items.map((anchor, idx) => (
                <article key={idx} className="glass rounded-xl p-5">
                  <h3 className="font-semibold text-indigo-400 mb-2">{anchor.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{anchor.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12" aria-labelledby="benefits-title">
            <h2 id="benefits-title" className="text-xl font-semibold text-slate-200 mb-4">{content.benefits.title}</h2>
            
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-cyan-400 mb-3">{content.benefits.individual.title}</h3>
                <ul className="space-y-2">
                  {content.benefits.individual.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-emerald-400 mb-3">{content.benefits.team.title}</h3>
                <ul className="space-y-2">
                  {content.benefits.team.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-amber-400 mb-3">{content.benefits.company.title}</h3>
                <ul className="space-y-2">
                  {content.benefits.company.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                      <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12" aria-labelledby="howtouse-title">
            <h2 id="howtouse-title" className="text-xl font-semibold text-slate-200 mb-4">{content.howToUse.title}</h2>
            
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-indigo-400 mb-3">{content.howToUse.employee.title}</h3>
                <ol className="space-y-2" start="1">
                  {content.howToUse.employee.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-indigo-400 font-semibold min-w-[1.5rem]">{idx + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-rose-400 mb-3">{content.howToUse.manager.title}</h3>
                <ol className="space-y-2" start="1">
                  {content.howToUse.manager.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-rose-400 font-semibold min-w-[1.5rem]">{idx + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-violet-400 mb-3">{content.howToUse.director.title}</h3>
                <ol className="space-y-2" start="1">
                  {content.howToUse.director.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-violet-400 font-semibold min-w-[1.5rem]">{idx + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className="mb-12" aria-labelledby="workshops-title">
            <h2 id="workshops-title" className="text-xl font-semibold text-slate-200 mb-4">{content.workshops.title}</h2>
            
            <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
              <p className="text-slate-300 leading-relaxed text-sm">{content.workshops.intro}</p>
              
              <p className="text-slate-400 text-sm">
                {content.workshops.contact}
                <a
                  href="https://www.linkedin.com/in/dominik-rolewski-01bba9155/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
                  aria-label={lang === 'pl' ? 'Napisz do mnie – otwiera się w nowej karcie' : 'Write to me – opens in new tab'}
                >
                  {content.workshops.contactLink}
                </a>
              </p>
            </div>
          </section>
        </main>

        <nav className="sticky bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-slate-800 via-slate-800/95 to-transparent pt-8 pb-4" aria-label={lang === 'pl' ? 'Działania na stronie' : 'Page actions'}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              target="_self"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              {content.cta.takeTest}
            </a>
            <a
              href="/stats"
              target="_self"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-indigo-400"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 012 2v2m-6 0h6" />
              </svg>
              {content.cta.stats}
            </a>
          </div>
        </nav>
          <footer className="text-center mt-12 mb-6 text-xs text-slate-600 space-y-2">
            <p>{t('app.footer')}</p>
            <p>
              {t('app.created')}
              <a
                  href="https://www.linkedin.com/in/dominik-rolewski-01bba9155/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2"
              >
                Dominik Rolewski
              </a>
            </p>
            <p>
              <a
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2"
              >
                {lang === 'pl' ? 'Dowiedz się więcej o Kotwicach Kariery' : 'Learn more about Career Anchors'}
              </a>
            </p>
            <p>
              <a
                  href="/privacy"
                  target="_self"
                  className="text-slate-600 hover:text-indigo-400 transition-colors underline underline-offset-2"
              >
                {lang === 'pl' ? 'Polityka prywatności' : 'Privacy Policy'}
              </a>
              {' · '}
              <a
                  href="/terms"
                  target="_self"
                  className="text-slate-600 hover:text-indigo-400 transition-colors underline underline-offset-2"
              >
                {lang === 'pl' ? 'Regulamin' : 'Terms of Service'}
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}