import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';

const pageMeta = {
  '/': {
    pl: {
      title: 'Kotwice Kariery Scheina | Bezpłatny Test Kariery Online',
      description: 'Odkryj swoje Kotwice Kariery wiodące w karierze. Bezpłatny test oparty na badaniach Edgara Scheina z MIT. Poznaj 8 kotwic i podejmuj lepsze decyzje zawodowe.',
    },
    en: {
      title: 'Schein Career Anchors | Free Career Assessment Online',
      description: 'Discover your Career Anchors that drive your career. Free assessment based on Edgar Schein\'s research from MIT. Learn about 8 anchors and make better career decisions.',
    }
  },
  '/stats': {
    pl: {
      title: 'Statystyki Kotwic Kariery | career-anchors.pl',
      description: 'Zobacz anonimowe statystyki z odpowiedzi na ankietę Kotwic Kariery. Analiza według pokoleń, branż i stanowisk. Bezpłatne dane dla wszystkich.',
    },
    en: {
      title: 'Career Anchors Statistics | career-anchors.pl',
      description: 'View anonymous statistics from Career Anchors survey responses. Analysis by generation, industry, and position. Free data for everyone.',
    }
  },
  '/about': {
    pl: {
      title: 'O Kotwicach Kariery | career-anchors.pl',
      description: 'Dowiedz się więcej o koncepcji Kotwic Kariery Edgara Scheina. 8 kotwic: Kompetencje Techniczne, Zarządcze, Autonomia, Bezpieczeństwo, Kreatywność, Służba, Wyzwanie, Styl Życia.',
    },
    en: {
      title: 'About Career Anchors | career-anchors.pl',
      description: 'Learn more about Edgar Schein\'s Career Anchors concept. 8 anchors: Technical, Managerial, Autonomy, Security, Entrepreneurship, Service, Challenge, Lifestyle.',
    }
  },
  '/privacy': {
    pl: {
      title: 'Polityka Prywatności | career-anchors.pl',
      description: 'Polityka prywatności serwisu career-anchors.pl. Informacje o przetwarzaniu danych, cookies i prawach użytkownika zgodnie z RODO.',
    },
    en: {
      title: 'Privacy Policy | career-anchors.pl',
      description: 'Privacy policy of career-anchors.pl service. Information about data processing, cookies and user rights according to GDPR.',
    }
  },
  '/terms': {
    pl: {
      title: 'Regulamin | career-anchors.pl',
      description: 'Regulamin korzystania z serwisu career-anchors.pl. Zasady, warunki i ograniczenia korzystania z bezpłatnego testu Kotwic Kariery.',
    },
    en: {
      title: 'Terms of Service | career-anchors.pl',
      description: 'Terms of service for career-anchors.pl. Rules, conditions and limitations for using the free Career Anchors assessment.',
    }
  }
};

export default function SeoMeta({ customMeta }) {
  const location = useLocation();
  const { lang } = useLang();
  
  const path = location.pathname.replace(/^\/(en|pl)\//, '/').replace(/\/$/, '') || '/';
  const pageKey = Object.keys(pageMeta).find(key => key === path) || '/';
  const meta = pageMeta[pageKey]?.[lang] || pageMeta['/'][lang];
  
  const title = customMeta?.title || meta.title;
  const description = customMeta?.description || meta.description;
  
  const baseUrl = 'https://www.career-anchors.pl';
  const canonicalUrl = lang === 'en' && path !== '/' 
    ? `${baseUrl}/en${path}` 
    : `${baseUrl}${path}`;
  
  const ogImage = `${baseUrl}/og-image.svg`;
  
  const alternateUrls = {
    pl: lang === 'pl' ? canonicalUrl : `${baseUrl}/pl${path}`,
    en: lang === 'en' ? canonicalUrl : `${baseUrl}/en${path}`,
    xDefault: `${baseUrl}${path}`
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="dc.identifier" content={canonicalUrl} />
      
      {path !== '/' && (
        <>
          <meta property="og:url" content={canonicalUrl} />
          <meta name="twitter:url" content={canonicalUrl} />
        </>
      )}
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      <link rel="alternate" hreflang="pl" href={alternateUrls.pl} />
      <link rel="alternate" hreflang="en" href={alternateUrls.en} />
      <link rel="alternate" hreflang="x-default" href={alternateUrls.xDefault} />
      
      {customMeta?.noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}