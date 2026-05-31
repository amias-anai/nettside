import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Database,
  Eye,
  FileText,
  GitBranch,
  LockKeyhole,
  MapPin,
  Mail,
  Menu,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import './styles.css';

const serviceCards = [
  {
    title: 'AI-kartlegging',
    body: 'For selskaper som vet at AI kan spare tid, men trenger å finne riktig startpunkt først.',
    action: 'Finn riktig pilot',
    icon: CircleDot,
  },
  {
    title: 'AI-opplæring',
    body: 'For team som vil bruke Copilot, ChatGPT og andre AI-verktøy praktisk, trygt og likt i hverdagen.',
    action: 'Lær trygg bruk',
    icon: Users,
  },
  {
    title: 'AI-arbeidsflyter',
    body: 'For bedrifter som vil automatisere konkrete prosesser med klare roller, dataflyt og godkjenning.',
    action: 'Bygg kontrollert flyt',
    icon: GitBranch,
  },
];

const workAreas = [
  ['Kundeservice', 'Svarutkast, oppsummering og oppfølging.'],
  ['Saksbehandling', 'Klassifisering, saksnotat og neste steg.'],
  ['Administrasjon', 'Notater, referater, rapporter og oppgaver.'],
  ['Økonomi og regnskap', 'Bilag, avvik, purring og rapportutkast.'],
  ['Salg', 'Tilbud, CRM-notater og oppfølging.'],
  ['Intern kunnskap', 'Søk, kilder, rutiner og maler.'],
  ['AI-automatisering', 'Flyt mellom e-post, skjema, CRM og oppgaver.'],
  ['Skreddersydd løsning', 'Når arbeidsflyten trenger en egen assistent.'],
];

const principles = [
  ['Praktisk før imponerende', 'AI skal løse faktiske arbeidsoppgaver, ikke bare se avansert ut i en demo.', Rocket],
  ['Trygt før autonomt', 'Vi starter med kontroll, godkjenning og lav risiko før noe skaleres videre.', ShieldCheck],
  ['Eksisterende systemer først', 'Vi bygger rundt verktøyene dere allerede bruker, ikke unødvendige nye plattformer.', GitBranch],
  ['Opplæring er en del av løsningen', 'En AI-løsning fungerer først når teamet forstår når og hvordan den skal brukes.', Users],
];

const processSteps = [
  ['Kartlegg arbeidsflyten', 'Vi finner hvor tid faktisk forsvinner.'],
  ['Vurder risiko og data', 'Vi ser på personvern, systemtilganger og hvor AI passer inn.'],
  ['Velg riktig verktøy', 'Copilot, ChatGPT, Azure, Gemini, automasjon, lokal modell eller noe annet.'],
  ['Test én konkret pilot', 'Vi starter lite, måler verdi og holder mennesker i kontroll.'],
  ['Tren teamet', 'Ansatte må forstå løsningen, ikke bare få et nytt verktøy.'],
  ['Forbedre', 'Vi justerer kvalitet, rutiner og neste mulige arbeidsflyt.'],
];

const safetyItems = [
  'Lavrisiko pilot først',
  'Minst mulig persondata',
  'Menneskelig godkjenning ved viktige handlinger',
  'Leverandører og API-er avklares per prosjekt',
  'Ingen tilfeldig bruk av forbruker-AI med bedriftsdata',
];

const heroWords = [
  'Regnskap',
  'Eposter',
  'Avstemming',
  'Lønnskjøring',
  'Oversikt',
  'Bilag',
  'Kundeoppfølging',
  'Møtebooking',
  'Rapportering',
  'Kontroll',
];

const menuLinks = [
  ['Tjenester', '/tjenester'],
  ['Trygg AI', '/trygg-ai'],
  ['Implementering', '/implementering'],
  ['Om oss', '/om-oss'],
  ['Kontakt', '/kontakt'],
];

const safetyPhilosophy = [
  ['AI hjelper mennesker', 'AI kan forberede, sortere og foreslå. Viktige valg tas av mennesker.'],
  ['Kontrollerbare arbeidsflyter', 'Løsningen bygges slik at steg kan sjekkes, godkjennes og stoppes.'],
  ['Trygghet fra start', 'Sikkerhet, personvern og åpenhet er krav i løsningen, ikke ekstra pynt.'],
  ['Menneskelig godkjenning', 'Når noe er viktig, skal en ansvarlig person kunne se og godkjenne før det skjer.'],
];

const aiBoundaries = {
  does: [
    'lager forslag og utkast',
    'klassifiserer saker og e-poster',
    'henter frem relevant kontekst',
    'oppsummerer informasjon',
    'viser hvorfor noe ble foreslått',
  ],
  doesNot: [
    'ta viktige beslutninger alene',
    'sende sensitive svar uten godkjenning',
    'endre systemer uten avklart tilgang',
    'bruke mer data enn arbeidsflyten trenger',
    'skjule hva som har skjedd',
  ],
};

const privacyPoints = [
  ['Minst mulig data', 'Vi starter med dataen arbeidsflyten faktisk trenger. Ikke mer.'],
  ['Sensitive felt beskyttes', 'Navn, e-post, telefonnummer og andre felt kan skjermes før AI brukes.'],
  ['Pseudonymisering i Python', 'Et eget lag kan bytte sensitive verdier med nøkler. AI ser nøklene, ikke originalverdiene.'],
  ['Verdier settes tilbake riktig', 'Når svaret er klart, kan systemet koble nøklene tilbake internt der det trengs.'],
];

const residencyPoints = [
  ['Europeisk databehandling', 'Vi prioriterer databehandling i Europa når løsningen settes opp.'],
  ['Modeller som kjører i Europa', 'Der det passer, bruker vi AI-modeller og leverandører med europeisk hosting.'],
  ['Avklart leverandørvalg', 'Før pilot avklarer vi hvilke tjenester som brukes, og hvor data behandles.'],
];

const rolloutSteps = [
  ['Velg én arbeidsflyt', 'Vi starter med prosessen dere vil forbedre først.'],
  ['Test med realistiske testdata', 'Før ekte data brukes, tester vi flyten med trygg mock-data.'],
  ['Pilot med lav tilgang', 'Piloten får bare den datatilgangen den trenger for å fungere.'],
  ['Forbedre og utvide', 'Når kvaliteten er god, kan løsningen justeres, utvides og kobles på mer.'],
];

const auditPoints = [
  ['Logger', 'Hendelser lagres slik at man kan se hva som skjedde.'],
  ['Korte begrunnelser', 'AI kan vise hvorfor en sak ble sortert eller foreslått på en bestemt måte.'],
  ['Statushistorikk', 'Dere kan se hvor en sak er i arbeidsflyten.'],
  ['Review-status', 'Det er tydelig hva som er utkast, hva som er sjekket, og hva som er godkjent.'],
];

const aboutPrinciples = [
  ['Praktisk før imponerende', 'AI skal løse faktiske arbeidsoppgaver, ikke bare se avansert ut i en demo.'],
  ['Trygt før autonomt', 'Vi starter med kontroll, godkjenning og lav risiko før noe skaleres videre.'],
  ['Mennesker i kontroll', 'AI skal støtte teamet. Ansvar og vurderinger skal fortsatt ligge hos mennesker.'],
  ['Eksisterende systemer først', 'Vi bygger rundt verktøyene dere allerede bruker, ikke unødvendige nye plattformer.'],
  ['Små piloter før store løfter', 'Vi starter konkret, måler verdi og bygger videre når løsningen fungerer.'],
];

const aboutReasons = [
  'Vi bygger rundt verktøyene dere allerede bruker',
  'Vi starter med én arbeidsflyt',
  'Vi vurderer data, risiko og personvern tidlig',
  'Vi forklarer løsningen for hvert steg',
  'Vi sørger for menneskelig godkjenning der det trengs',
];

const contactServices = [
  'AI-kartlegging',
  'AI-opplæring',
  'AI-arbeidsflyt',
  'Trygg AI',
  'Annet',
];

const implementationDeepSteps = [
  {
    title: 'Velg én arbeidsflyt',
    body: 'Vi starter med én konkret prosess der tid forsvinner, kvalitet varierer eller oppfølging ofte glipper.',
    points: ['hva som skjer i dag', 'hvilke systemer som brukes', 'hvor mennesker må godkjenne', 'hvilke data som trengs'],
  },
  {
    title: 'Test med realistiske testdata',
    body: 'Før ekte data brukes, tester vi løsningen med realistiske eksempler som ikke inneholder sensitiv informasjon.',
    points: ['svarutkast', 'klassifisering', 'feil og unntak', 'kvalitet på forslagene'],
  },
  {
    title: 'Pilot med lav tilgang',
    body: 'Når testen fungerer, kjører vi en liten pilot med minst mulig tilgang og tydelige kontrollpunkter.',
    points: ['begrenset datatilgang', 'menneskelig review', 'logging', 'klar rollefordeling'],
  },
  {
    title: 'Forbedre og utvide',
    body: 'Når piloten er nyttig og trygg, forbedrer vi kvaliteten og vurderer om flere steg kan kobles på.',
    points: ['måle tid spart', 'justere prompt og regler', 'legge til datakilder', 'utvide til neste arbeidsflyt'],
  },
];

const implementationChecks = [
  'Hva er målet med arbeidsflyten?',
  'Hvilke data er nødvendige?',
  'Hvor må mennesker godkjenne?',
  'Hva skal logges?',
  'Når skal AI stoppe og spørre?',
];

const implementationOutcomes = [
  ['En testet arbeidsflyt', 'En konkret flyt som er prøvd med realistiske eksempler før den slippes løs.'],
  ['Tydelige kontrollpunkter', 'Klare steder der mennesker kan sjekke, godkjenne eller stoppe prosessen.'],
  ['Bedre grunnlag for videre arbeid', 'Et praktisk bevis på hva som virker, hva som bør justeres og hva som kan utvides.'],
];

const businessTypes = [
  ['Regnskaps- og økonomimiljøer', 'Bilag, avstemming, purring, rapportutkast og kontrollpunkter.'],
  ['Kundeservice og support', 'Innsortering, oppsummering, svarutkast og oppfølging.'],
  ['Administrasjon og drift', 'Møtereferater, oppgaver, dokumentflyt og intern koordinering.'],
  ['Salg og kundeoppfølging', 'CRM-notater, tilbudsutkast, møtebooking og neste steg.'],
  ['Fagteam med mye dokumentasjon', 'Søk, kilder, rutiner, maler og kunnskapsstøtte.'],
  ['Små og mellomstore bedrifter', 'Praktiske løsninger rundt systemene dere allerede bruker.'],
];

const agentTypes = [
  ['E-postagent', 'Kan sortere e-post, oppsummere innhold og lage svarutkast.'],
  ['Dokumentagent', 'Kan hente ut informasjon, oppsummere og foreslå neste steg.'],
  ['Regnskapsagent', 'Kan forberede bilag, avvik, purringer og rapportutkast.'],
  ['CRM-agent', 'Kan foreslå notater, oppdateringer og oppfølging etter møter.'],
  ['Kunnskapsagent', 'Kan svare med støtte i rutiner, dokumenter og avklarte kilder.'],
  ['Kontrollagent', 'Kan sjekke mangler, status og om riktige steg er fulgt.'],
];

const workflowHelp = [
  ['Innboks til svarutkast', 'Fra henvendelse til strukturert forslag med kontekst.'],
  ['Bilag til kontroll', 'Fra dokument til forslag, avvik og videre oppfølging.'],
  ['Møte til oppgaver', 'Fra referat til ansvar, frister og neste steg.'],
  ['CRM til oppfølging', 'Fra kundedata til notater, forslag og påminnelser.'],
  ['Dokumenter til innsikt', 'Fra lange dokumenter til korte sammendrag og kilder.'],
  ['Rapportering', 'Fra spredt informasjon til første utkast og kontrollpunkter.'],
];

const helpModes = [
  ['AI-kartlegging', 'Vi finner hvor AI kan gi mest verdi, hva som er trygt å starte med, og hvilken pilot som gir mening.'],
  ['AI-opplæring', 'Teamet lærer å bruke AI praktisk, likt og trygt i hverdagen.'],
  ['AI-arbeidsflyter', 'Vi bygger konkrete flyter med roller, datatilgang, godkjenning og logging.'],
  ['Skreddersydd AI-assistent', 'Når arbeidsflyten trenger en egen assistent rundt deres systemer og regler.'],
];

function getWordSize(word) {
  if (word.length >= 13) {
    return 'xlong';
  }

  if (word.length >= 11) {
    return 'long';
  }

  if (word.length >= 9) {
    return 'medium';
  }

  return 'short';
}

function useReducedMotionVideo(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMotionPreference = () => {
      if (!video) {
        return;
      }

      if (motionQuery.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    syncMotionPreference();
    motionQuery.addEventListener('change', syncMotionPreference);
    video?.addEventListener('loadeddata', syncMotionPreference);
    video?.addEventListener('canplay', syncMotionPreference);
    document.addEventListener('visibilitychange', syncMotionPreference);

    return () => {
      motionQuery.removeEventListener('change', syncMotionPreference);
      video?.removeEventListener('loadeddata', syncMotionPreference);
      video?.removeEventListener('canplay', syncMotionPreference);
      document.removeEventListener('visibilitychange', syncMotionPreference);
    };
  }, [videoRef]);
}

function useRevealMotion(pageRef) {
  useEffect(() => {
    const page = pageRef.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!page || motionQuery.matches) {
      return undefined;
    }

    const motionItems = page.querySelectorAll(
      [
        '.editorial-section',
        '.navy-band',
        '.section-intro',
        '.lead-copy',
        '.trust-statement',
        '.trust-word',
        '.platform-panel',
        '.service-card',
        '.comparison-stack > div',
        '.workflow-board',
        '.area-item',
        '.principle-card',
        '.process-step',
        '.safety-list',
        '.safety-list > div',
        '.final-cta',
        '.trust-page-hero__content',
        '.trust-page-hero__badges span',
        '.residency-card',
        '.contact-hero__content',
        '.contact-info',
        '.contact-form',
        '.deep-card',
        '.detail-card',
        '.site-footer .footer-grid > div',
      ].join(',')
    );

    page.classList.add('motion-enabled');
    motionItems.forEach((item) => item.classList.add('motion-item'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      }
    );

    motionItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      page.classList.remove('motion-enabled');
      motionItems.forEach((item) => item.classList.remove('motion-item', 'is-visible'));
    };
  }, [pageRef]);
}

function SiteNavigation() {
  const menuPanelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuPanelRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const menuOverlay = (
      <div
        className={`menu-overlay${isMenuOpen ? ' menu-overlay--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          className="menu-overlay__scrim"
          type="button"
          aria-label="Lukk meny"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={() => setIsMenuOpen(false)}
        />
        <aside
          id="site-menu"
          ref={menuPanelRef}
          className="menu-panel"
          aria-label="Navigasjon"
          tabIndex={isMenuOpen ? -1 : undefined}
        >
          <div className="menu-panel__top">
            <img src="/assets/anai-logo-wordmark.png" alt="ANAi" />
            <button type="button" aria-label="Lukk meny" onClick={() => setIsMenuOpen(false)}>
              <X size={24} strokeWidth={1.6} />
            </button>
          </div>
          <nav className="menu-panel__links" aria-label="Sidemenu">
            {menuLinks.map(([label, href], index) => (
              <a
                href={href}
                key={label}
                style={{ '--link-index': index }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {label}
              </a>
            ))}
          </nav>
          <div className="menu-panel__bottom">
            <p>Praktiske AI-løsninger for norske bedrifter, bygget med trygghet og mennesker i kontroll.</p>
            <a href="/kontakt" onClick={() => setIsMenuOpen(false)}>
              Book AI-kartlegging
              <ArrowUpRight size={17} />
            </a>
          </div>
        </aside>
      </div>
  );

  return (
    <>
      <header className="hero__nav">
        <a className="brand brand--mark" href="/" aria-label="ANAi hjem">
          <img src="/assets/anai-logo-mark.png" alt="ANAi" />
        </a>
        <nav className="nav-actions" aria-label="Hovedmeny">
          <a href="/" className="nav-actions__word" aria-label="ANAi hjem">
            <img src="/assets/anai-logo-wordmark.png" alt="ANAi" />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-label={isMenuOpen ? 'Lukk meny' : 'Åpne meny'}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Menu size={32} strokeWidth={1.45} />
          </button>
        </nav>
      </header>
      {createPortal(menuOverlay, document.body)}
    </>
  );
}

function Hero() {
  const videoRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const heroWord = heroWords[wordIndex];

  useReducedMotionVideo(videoRef);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (motionQuery.matches) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % heroWords.length);
    }, 2600);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="hero" aria-label="ANAi hero">
      <video
        ref={videoRef}
        className="hero__media"
        poster="/assets/hero-background-poster.jpg"
        autoPlay
        muted
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
      >
        <source src="/assets/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="hero__shade" aria-hidden="true" />

      <SiteNavigation />

      <p className="side-copy side-copy--left">AI agenter for norske små og mellomstore bedrifter</p>
      <p className="side-copy side-copy--right">Teknologi skreddersydd for deg</p>

      <section className="hero__content" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__title">
          <span>An AI</span>
          <span className="hero__title-line hero__title-line--dynamic">
            for{' '}
            <em
              key={heroWord}
              className={`rotating-word rotating-word--${getWordSize(heroWord)}`}
              aria-live="polite"
            >
              {heroWord}
            </em>
          </span>
        </h1>
      </section>

      <p className="coordinates">
        60.3888° N
        <br />
        5.3239° E
      </p>

    </section>
  );
}

function Eyebrow({ children }) {
  return <p className="section-eyebrow">{children}</p>;
}

function SectionIntro({ eyebrow, title, children, dark = false }) {
  return (
    <div className={`section-intro${dark ? ' section-intro--dark' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function FullFrontpage() {
  const pageRef = useRef(null);

  useRevealMotion(pageRef);

  return (
    <main className="frontpage" ref={pageRef}>
      <Hero />

      <section className="editorial-section trust-section" id="trygg-ai">
        <div className="site-shell trust-statement">
          <h2>Trygg AI. Full kontroll.</h2>
          <div className="trust-words" aria-label="Tillitsprinsipper">
            <span className="trust-word">GDPR-bevisst</span>
            <span className="trust-word">Menneskelig godkjenning</span>
            <span className="trust-word">Data i Europa</span>
          </div>
        </div>
      </section>

      <section className="navy-band">
        <div className="site-shell platform-grid">
          <SectionIntro
            dark
            eyebrow="Ikke enda en plattform"
            title="Vi bygger ikke enda en plattform dere må bytte til"
          >
            Vi hjelper dere å bruke AI sammen med systemene dere allerede har: e-post,
            dokumenter, CRM, Microsoft 365, Copilot, ChatGPT, Google Workspace, regneark
            og interne verktøy.
          </SectionIntro>
          <div className="platform-panel">
            <h3>
              Noen ganger er riktig løsning opplæring. Andre ganger er det en automasjon,
              en Copilot-flyt, en API-integrasjon eller en skreddersydd AI-assistent.
            </h3>
            <div className="platform-tags">
              {['Opplæring', 'Automasjon', 'AI-assistent', 'Integrasjon'].map((item) => (
                <span key={item}>
                  <CheckCircle2 size={17} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section" id="tjenester">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Tre måter vi hjelper på"
            title="Fra usikker start til AI som faktisk brukes"
          />
          <div className="service-grid">
            {serviceCards.map(({ title, body, action, icon: Icon }) => (
              <article className="service-card" key={title}>
                <span className="card-icon">
                  <Icon size={19} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
                <a href="#kontakt">
                  {action}
                  <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-band workflow-section">
        <div className="site-shell workflow-grid">
          <div>
            <SectionIntro
              dark
              eyebrow="Arbeidsflyt i praksis"
              title="Fra kundehenvendelse til klart svarutkast"
            >
              Poenget er ikke at AI overtar kundedialogen. Poenget er at teamet får ferdig
              struktur, relevant kontekst og et godt utkast før en ansvarlig person vurderer
              og godkjenner.
            </SectionIntro>
            <div className="comparison-stack">
              <div>
                <h3>Før ANAi</h3>
                <ul>
                  <li>Kunde sender e-post eller skjema</li>
                  <li>Ansatt tolker innholdet manuelt</li>
                  <li>Informasjon letes frem i e-post, CRM og dokumenter</li>
                  <li>Svar og oppfølging skrives for hånd</li>
                </ul>
              </div>
              <div>
                <h3>Med ANAi</h3>
                <ul>
                  <li>AI klassifiserer henvendelsen</li>
                  <li>Nøkkelinfo og relevant kontekst hentes ut</li>
                  <li>Svarutkast og CRM-oppdatering forberedes</li>
                  <li>Menneske godkjenner og oppfølging logges</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="workflow-board" aria-label="Eksempel på arbeidsflyt">
            <div className="board-header">
              <span>KUNDEHENVENDELSE</span>
              <strong>Svar, godkjenning og oppfølging</strong>
            </div>
            <div className="flow-row">
              {[
                ['Innboks', Mail],
                ['ANAi', Sparkles],
                ['Ansatt', Users],
                ['CRM', FileText],
              ].map(([label, Icon]) => (
                <div className="flow-node" key={label}>
                  <Icon size={20} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="board-columns">
              <div className="mini-panel">
                <h4>Manuell flyt</h4>
                <p>Leser e-post</p>
                <p>Leter etter kontekst</p>
                <p>Skriver svar manuelt</p>
                <p>Husker oppfølging</p>
              </div>
              <div className="mini-panel mini-panel--light">
                <h4>AI-støttet flyt</h4>
                <strong>Svarutkast klart</strong>
                <p>Henvendelsen er klassifisert, relevante kilder er funnet, og et svarutkast med neste steg ligger klart.</p>
              </div>
            </div>
            <div className="board-footer">
              <span>Utkast</span>
              <span>Menneskelig godkjenning</span>
              <span>Oppfølging</span>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell areas-grid">
          <SectionIntro
            eyebrow="Hva vi hjelper med"
            title="Arbeidsområdene vi ofte starter med"
          >
            Finn riktig inngang basert på hvor tiden forsvinner, hvilke systemer dere bruker
            og hvor kontrollpunktene bør ligge.
          </SectionIntro>
          <div className="area-list">
            {workAreas.map(([title, body]) => (
              <a href="#kontakt" className="area-item" key={title}>
                <span>
                  <strong>{title}</strong>
                  <small>{body}</small>
                </span>
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--tint">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Hva vi står for"
            title="AI-innføring med tydelige prinsipper"
          />
          <div className="principle-grid">
            {principles.map(([title, body, Icon]) => (
              <article className="principle-card" key={title}>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section" id="implementering">
        <div className="site-shell process-grid">
          <SectionIntro
            eyebrow="Slik innfører vi AI"
            title="Uten å gjøre det unødvendig komplisert"
          >
            Vi starter i én arbeidsflyt, vurderer data og risiko, velger riktig verktøy og
            tester med teamet før løsningen forbedres eller skaleres.
          </SectionIntro>
          <div className="process-list">
            {processSteps.map(([title, body], index) => (
              <article className="process-step" key={title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-band safety-section">
        <div className="site-shell safety-grid">
          <SectionIntro
            dark
            eyebrow="Personvern og kontroll"
            title="Trygg AI-innføring, ikke fri autonomi"
          >
            Vi vurderer datatyper, tilganger, leverandører, lagring og menneskelig kontroll
            før en løsning settes i drift. Målet er arbeidsflyter ansatte kan forstå, bruke
            og kontrollere.
          </SectionIntro>
          <div className="safety-list">
            {safetyItems.map((item) => (
              <div key={item}>
                <LockKeyhole size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section cta-section" id="kontakt">
        <div className="site-shell">
          <div className="final-cta">
            <span className="final-cta__icon">
              <Rocket size={30} />
            </span>
            <div>
              <h2>Start med én arbeidsflyt</h2>
              <p>
                Vi kartlegger hvor AI kan spare tid, hvilke data og risikoer som må vurderes,
                og hvilken løsning som passer best for systemene dere allerede bruker.
              </p>
            </div>
            <a href="mailto:system@anai.no">
              Book gratis AI-kartlegging
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function TryggAIPage() {
  const pageRef = useRef(null);
  const videoRef = useRef(null);

  useReducedMotionVideo(videoRef);
  useRevealMotion(pageRef);

  useEffect(() => {
    document.title = 'Trygg AI — ANAi';
  }, []);

  return (
    <main className="trust-page" ref={pageRef}>
      <section className="trust-page-hero" aria-label="Trygg AI hero">
        <video
          ref={videoRef}
          className="trust-page-hero__media"
          poster="/assets/trygg-ai-header-poster.jpg"
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
          aria-hidden="true"
        >
          <source src="/assets/trygg-ai-header-clean.mp4" type="video/mp4" />
        </video>
        <div className="trust-page-hero__shade" aria-hidden="true" />
        <SiteNavigation />

        <div className="site-shell trust-page-hero__content">
          <h1>AI med fokus på trygghet</h1>
          <div className="trust-page-hero__badges" aria-label="Nøkkelprinsipper">
            <span>GDPR-bevisst</span>
            <span>Menneskelig godkjenning</span>
            <span>Data i Europa</span>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Sikkerhetsfilosofi"
            title="AI skal støtte vurderinger, ikke erstatte dem"
          >
            Trygg AI handler om tydelige rammer. Løsningen skal hjelpe folk å jobbe bedre,
            samtidig som ansvar, kontroll og innsyn beholdes hos virksomheten.
          </SectionIntro>
          <div className="principle-grid trust-principle-grid">
            {safetyPhilosophy.map(([title, body]) => (
              <article className="principle-card" key={title}>
                <ShieldCheck size={22} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-band">
        <div className="site-shell workflow-grid">
          <SectionIntro
            dark
            eyebrow="Hva AI gjør"
            title="Tydelige grenser gjør løsningen tryggere"
          >
            Før vi bygger, avklarer vi hva AI skal få gjøre, hva den bare skal foreslå,
            og hva som alltid må godkjennes av mennesker.
          </SectionIntro>
          <div className="comparison-stack trust-boundary-stack">
            <div>
              <h3>AI kan</h3>
              <ul>
                {aiBoundaries.does.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>AI skal ikke</h3>
              <ul>
                {aiBoundaries.doesNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--tint">
        <div className="site-shell safety-grid">
          <SectionIntro
            eyebrow="Personvern"
            title="Sensitive data skal behandles forsiktig"
          >
            Vi bygger løsninger med minst mulig data. Når arbeidsflyten trenger ekstra
            beskyttelse, kan sensitive felt skjermes før AI-modellen brukes.
          </SectionIntro>
          <div className="process-list">
            {privacyPoints.map(([title, body], index) => (
              <article className="process-step" key={title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Data og infrastruktur"
            title="Dataflyt skal være avklart før pilot"
          >
            Dere skal vite hvilke systemer som brukes, hvor data behandles, og hvilke
            leverandører som er involvert.
          </SectionIntro>
          <div className="residency-grid">
            {residencyPoints.map(([title, body], index) => {
              const icons = [Database, Server, ClipboardCheck];
              const Icon = icons[index];
              return (
                <article className="residency-card" key={title}>
                  <Icon size={22} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="navy-band">
        <div className="site-shell process-grid">
          <SectionIntro
            dark
            eyebrow="Innføring"
            title="Start lite, test trygt, utvid når det fungerer"
          >
            Vi begynner med én konkret arbeidsflyt. Da blir risikoen lavere, læringen raskere
            og verdien enklere å måle.
          </SectionIntro>
          <div className="process-list process-list--dark">
            {rolloutSteps.map(([title, body], index) => (
              <article className="process-step process-step--dark" key={title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell areas-grid">
          <SectionIntro
            eyebrow="Sporbarhet"
            title="Det skal være mulig å se hva som har skjedd"
          >
            En trygg AI-løsning bør ikke være en svart boks. Den bør vise status, historikk
            og grunnlaget for viktige forslag.
          </SectionIntro>
          <div className="area-list audit-list">
            {auditPoints.map(([title, body]) => (
              <article className="area-item audit-item" key={title}>
                <span>
                  <strong>{title}</strong>
                  <small>{body}</small>
                </span>
                <Eye size={17} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section cta-section" id="kontakt">
        <div className="site-shell">
          <div className="final-cta">
            <span className="final-cta__icon">
              <Mail size={28} />
            </span>
            <div>
              <h2>Spør om trygghet før vi bygger</h2>
              <p>
                Har dere krav til GDPR, leverandører, logging eller databehandling? Send
                spørsmålet, så avklarer vi det før en pilot settes opp.
              </p>
            </div>
            <a href="mailto:system@anai.no">
              Kontakt ANAi
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function OmOssPage() {
  const pageRef = useRef(null);
  const videoRef = useRef(null);

  useReducedMotionVideo(videoRef);
  useRevealMotion(pageRef);

  useEffect(() => {
    document.title = 'Om ANAi — ANAi';
  }, []);

  return (
    <main className="about-page" ref={pageRef}>
      <section className="trust-page-hero about-page-hero" aria-label="Om ANAi hero">
        <video
          ref={videoRef}
          className="trust-page-hero__media about-page-hero__media"
          poster="/assets/om-oss-hero-poster.jpg"
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
          aria-hidden="true"
        >
          <source src="/assets/om-oss-hero.mp4" type="video/mp4" />
        </video>
        <div className="trust-page-hero__shade about-page-hero__shade" aria-hidden="true" />
        <SiteNavigation />

        <div className="site-shell trust-page-hero__content">
          <h1>Om ANAi</h1>
          <span>
            ANAi hjelper små og mellomstore bedrifter med å ta i bruk AI på en trygg,
            konkret og nyttig måte.
          </span>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell split-intro">
          <SectionIntro
            eyebrow="Kort om ANAi"
            title="Vi bygger ikke AI for å imponere. Vi bygger AI for å spare tid."
          />
          <p className="lead-copy">
            ANAi ble startet for å gjøre AI mer konkret for norske bedrifter. Mange vet at
            AI kan skape verdi, men er usikre på hvor de skal begynne, hva som er trygt,
            og hvordan det passer inn i eksisterende systemer. Der hjelper vi.
          </p>
        </div>
      </section>

      <section className="navy-band">
        <div className="site-shell">
          <SectionIntro
            dark
            eyebrow="Hva vi tror på"
            title="AI skal være nyttig, forståelig og kontrollert"
          />
          <div className="about-principles">
            {aboutPrinciples.map(([title, body]) => (
              <article className="principle-card principle-card--dark" key={title}>
                <Sparkles size={21} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--tint">
        <div className="site-shell about-founder">
          <SectionIntro
            eyebrow="Grunnlegger"
            title="Startet av Amias Nasser Aspenes"
          >
            ANAi er startet av Amias Nasser Aspenes i Bergen. Arbeidet kombinerer praktisk
            AI-implementering, automatisering og forståelse for hvordan små og mellomstore
            bedrifter faktisk jobber i hverdagen.
          </SectionIntro>
          <div className="platform-panel about-founder__panel">
            <h3>
              Målet er ikke å selge enda et system. Målet er å finne én arbeidsflyt der AI
              kan gi tydelig verdi, og bygge trygt videre derfra.
            </h3>
            <div className="platform-tags">
              {['Bergen', 'Trygg AI', 'Automatisering', 'Norske bedrifter'].map((item) => (
                <span key={item}>
                  <CheckCircle2 size={17} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell safety-grid">
          <SectionIntro
            eyebrow="Hvorfor ANAi"
            title="Nært, konkret og ansvarlig"
          >
            Vi jobber tett på arbeidsflyten, ikke langt unna i en strategi-presentasjon.
            Først finner vi hva som faktisk bør forbedres. Så bygger vi kontrollert.
          </SectionIntro>
          <div className="safety-list safety-list--light">
            {aboutReasons.map((item) => (
              <div key={item}>
                <LockKeyhole size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section cta-section" id="kontakt">
        <div className="site-shell">
          <div className="final-cta">
            <span className="final-cta__icon">
              <Rocket size={30} />
            </span>
            <div>
              <h2>La oss starte med én arbeidsflyt</h2>
              <p>
                Hvis dere lurer på hvor AI kan gi verdi uten å skape unødvendig risiko, kan
                vi starte med en enkel kartlegging.
              </p>
            </div>
            <a href="mailto:system@anai.no">
              Book AI-kartlegging
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContactPage() {
  const pageRef = useRef(null);

  useRevealMotion(pageRef);

  useEffect(() => {
    document.title = 'Kontakt ANAi — ANAi';
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const subject = `Henvendelse fra ${formData.get('name') || 'nettsiden'}`;
    const body = [
      `Navn: ${formData.get('name') || ''}`,
      `E-post: ${formData.get('email') || ''}`,
      `Bedrift: ${formData.get('company') || ''}`,
      `Telefon: ${formData.get('phone') || ''}`,
      `Gjelder: ${formData.get('service') || ''}`,
      '',
      'Melding:',
      formData.get('message') || '',
    ].join('\n');

    window.location.href = `mailto:system@anai.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="contact-page" ref={pageRef}>
      <section className="contact-hero" aria-label="Kontakt ANAi">
        <SiteNavigation />
        <div className="site-shell contact-hero__content">
          <p>Kontakt</p>
          <h1>Kontakt ANAi</h1>
          <span>
            Har du en arbeidsflyt du vil forbedre med AI, eller lurer du på hvor det er
            trygt å starte? Send en melding, så finner vi et konkret neste steg.
          </span>
          <div className="contact-hero__actions">
            <a href="#melding">Send melding</a>
            <a href="mailto:system@anai.no">Book AI-kartlegging</a>
          </div>
        </div>
      </section>

      <section className="editorial-section contact-section">
        <div className="site-shell contact-grid">
          <aside className="contact-info" aria-label="Kontaktinformasjon">
            <SectionIntro eyebrow="Kontaktinformasjon" title="Direkte og enkelt" />
            <div className="contact-info__items">
              <div>
                <span>E-post</span>
                <a href="mailto:system@anai.no">system@anai.no</a>
              </div>
              <div>
                <span>Telefon</span>
                <a href="tel:+4741409753">+47 41 40 97 53</a>
              </div>
              <div>
                <span>Sted</span>
                <strong>Bergen, Norge</strong>
              </div>
            </div>
            <p>Jeg svarer vanligvis innen 24 timer på hverdager.</p>
          </aside>

          <form className="contact-form" id="melding" onSubmit={handleSubmit}>
            <div className="contact-form__header">
              <Eyebrow>Send oss en melding</Eyebrow>
              <h2>Fortell kort hva dere trenger hjelp med</h2>
            </div>

            <div className="contact-form__grid">
              <label>
                Navn *
                <input name="name" type="text" autoComplete="name" placeholder="Ditt fulle navn" required />
              </label>
              <label>
                E-post *
                <input name="email" type="email" autoComplete="email" placeholder="din@epost.no" required />
              </label>
              <label>
                Bedrift
                <input name="company" type="text" autoComplete="organization" placeholder="Bedriftsnavn" />
              </label>
              <label>
                Telefon
                <input name="phone" type="tel" autoComplete="tel" placeholder="+47 000 00 000" />
              </label>
            </div>

            <label>
              Hva gjelder det?
              <select name="service" defaultValue="">
                <option value="" disabled>Velg tema</option>
                {contactServices.map((service) => (
                  <option value={service} key={service}>{service}</option>
                ))}
              </select>
            </label>

            <label>
              Melding
              <textarea
                name="message"
                rows="6"
                placeholder="Beskriv arbeidsflyten, utfordringen eller spørsmålet kort."
              />
            </label>

            <button type="submit">
              Send henvendelse
              <ArrowUpRight size={17} />
            </button>

            <p className="contact-form__note">
              Du trenger ikke ha en ferdig plan. Det holder å beskrive hva som tar tid,
              hvor data ligger, eller hva dere er usikre på.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="om-oss">
      <div className="site-shell footer-grid">
        <div>
          <a className="footer-brand" href="/" aria-label="ANAi forside">
            <img className="footer-brand__mark" src="/assets/anai-logo-mark.png" alt="" aria-hidden="true" />
            <img className="footer-brand__word" src="/assets/anai-logo-wordmark.png" alt="ANAi" />
          </a>
          <p>Praktiske AI-løsninger for norske bedrifter som vil spare tid, forbedre arbeidsflyten og beholde mennesker i kontroll.</p>
          <div className="footer-meta">
            <strong>Utviklet i Norge</strong>
            <span>Grunnlegger: Amias Nasser Aspenes</span>
            <span>Basert i Bergen, Norge</span>
            <span>Org.nr: 937 738 366</span>
          </div>
          <small>© 2026 ANAi. Alle rettigheter reservert.</small>
        </div>
        <div>
          <h3>Sider</h3>
          <a href="/tjenester">Tjenester</a>
          <a href="/implementering">Implementering</a>
          <a href="/trygg-ai">Trygg AI</a>
        </div>
        <div>
          <h3>Selskap</h3>
          <a href="/">Forside</a>
          <a href="/om-oss">Om oss</a>
          <a href="/kontakt">Kontakt</a>
        </div>
        <div>
          <h3>Kontakt</h3>
          <div className="footer-contact">
            <a href="tel:+4741409753">
              <Phone size={16} />
              +47 41 40 97 53
            </a>
            <a href="mailto:system@anai.no">
              <Mail size={16} />
              system@anai.no
            </a>
            <p>
              <MapPin size={16} />
              Bergen, Norge
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ImplementeringPage() {
  const pageRef = useRef(null);

  useRevealMotion(pageRef);

  useEffect(() => {
    document.title = 'Implementering — ANAi';
  }, []);

  return (
    <main className="detail-page" ref={pageRef}>
      <section className="contact-hero detail-hero implementation-hero" aria-label="Implementering">
        <SiteNavigation />
        <div className="site-shell contact-hero__content">
          <p>Implementering</p>
          <h1>Start smått. Skaler videre.</h1>
          <span>
            Vi starter smått, tester kontrollert og bygger videre
            <br />
            når løsningen faktisk fungerer for teamet.
          </span>
          <div className="contact-hero__actions">
            <a href="/kontakt">Start en pilot</a>
            <a href="/trygg-ai">Se trygg AI</a>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Prosessen"
            title="Fire steg som gjør AI tryggere å innføre"
          >
            Målet er ikke å bygge mest mulig på én gang. Målet er å bevise verdi i én
            arbeidsflyt, med tydelig databruk og menneskelig godkjenning.
          </SectionIntro>
          <div className="deep-grid">
            {implementationDeepSteps.map(({ title, body, points }, index) => (
              <article className="deep-card" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <ul>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-band">
        <div className="site-shell safety-grid">
          <SectionIntro
            dark
            eyebrow="Før pilot"
            title="Dette avklarer vi før løsningen får tilgang"
          >
            En pilot skal være nyttig, men begrenset. Derfor avklarer vi mål, data,
            ansvar og stoppunkter før løsningen brukes i praksis.
          </SectionIntro>
          <div className="safety-list">
            {implementationChecks.map((item) => (
              <div key={item}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--tint">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Resultat"
            title="Hva dere sitter igjen med"
          />
          <div className="residency-grid">
            {implementationOutcomes.map(([title, body], index) => {
              const icons = [GitBranch, ShieldCheck, Rocket];
              const Icon = icons[index];

              return (
                <article className="residency-card detail-card" key={title}>
                  <Icon size={22} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="editorial-section cta-section">
        <div className="site-shell">
          <div className="final-cta">
            <span className="final-cta__icon">
              <Rocket size={30} />
            </span>
            <div>
              <h2>Start med arbeidsflyten som tar mest tid</h2>
              <p>
                Vi kan kartlegge én prosess, teste med trygge eksempler og finne ut om den
                egner seg for en liten AI-pilot.
              </p>
            </div>
            <a href="/kontakt">
              Snakk om implementering
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function TjenesterPage() {
  const pageRef = useRef(null);

  useRevealMotion(pageRef);

  useEffect(() => {
    document.title = 'Tjenester — ANAi';
  }, []);

  return (
    <main className="detail-page" ref={pageRef}>
      <section className="contact-hero detail-hero tjenester-hero" aria-label="Tjenester">
        <SiteNavigation />
        <div className="site-shell contact-hero__content">
          <p>Tjenester</p>
          <h1>AI som jobber for deg</h1>
          <span>
            ANAi hjelper norske bedrifter med kartlegging, opplæring og konkrete
            AI-arbeidsflyter som kan brukes trygt i hverdagen.
          </span>
          <div className="contact-hero__actions">
            <a href="/kontakt">Book kartlegging</a>
            <a href="/implementering">Se prosessen</a>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Hvem ANAi kan hjelpe"
            title="For bedrifter med tidkrevende arbeid mellom systemer"
          >
            Det passer spesielt godt når teamet bruker e-post, dokumenter, regneark, CRM,
            økonomisystemer eller interne rutiner som fortsatt krever mye manuelt arbeid.
          </SectionIntro>
          <div className="detail-grid">
            {businessTypes.map(([title, body]) => (
              <article className="detail-card" key={title}>
                <Users size={21} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-band">
        <div className="site-shell">
          <SectionIntro
            dark
            eyebrow="AI-agenter"
            title="Eksempler på AI-agenter"
          >
            Dette er ikke en fast liste. Riktig agent bygges rundt arbeidsflyten deres,
            systemene dere bruker og kontrollen dere trenger.
          </SectionIntro>
          <div className="detail-grid detail-grid--dark">
            {agentTypes.map(([title, body]) => (
              <article className="detail-card detail-card--dark" key={title}>
                <Sparkles size={21} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--tint">
        <div className="site-shell areas-grid">
          <SectionIntro
            eyebrow="Arbeidsflyter"
            title="Konkrete flyter jeg kan hjelpe med"
          >
            Vi starter der verdien er tydelig og risikoen kan kontrolleres.
          </SectionIntro>
          <div className="area-list">
            {workflowHelp.map(([title, body]) => (
              <a href="/kontakt" className="area-item" key={title}>
                <span>
                  <strong>{title}</strong>
                  <small>{body}</small>
                </span>
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-shell">
          <SectionIntro
            eyebrow="Måter å hjelpe på"
            title="Fra kartlegging til ferdig arbeidsflyt"
          />
          <div className="service-grid">
            {helpModes.map(([title, body]) => (
              <article className="service-card" key={title}>
                <span className="card-icon">
                  <CircleDot size={19} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
                <a href="/kontakt">
                  Snakk om dette
                  <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section cta-section">
        <div className="site-shell">
          <div className="final-cta">
            <span className="final-cta__icon">
              <Mail size={28} />
            </span>
            <div>
              <h2>Usikker på hvilken tjeneste som passer?</h2>
              <p>
                Det er helt normalt. Send en kort melding om hva som tar tid, så finner vi
                riktig startpunkt sammen.
              </p>
            </div>
            <a href="/kontakt">
              Kontakt ANAi
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  if (path === '/trygg-ai') {
    return <TryggAIPage />;
  }

  if (path === '/om-oss') {
    return <OmOssPage />;
  }

  if (path === '/kontakt') {
    return <ContactPage />;
  }

  if (path === '/implementering') {
    return <ImplementeringPage />;
  }

  if (path === '/tjenester') {
    return <TjenesterPage />;
  }

  return <FullFrontpage />;
}

createRoot(document.getElementById('root')).render(<App />);
