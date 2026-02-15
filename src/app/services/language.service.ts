import { Injectable, signal } from '@angular/core';

export type Lang = 'de' | 'en';

type TranslationLeaf = string | Record<Lang, string> | TranslationTree;
type TranslationTree = { [key: string]: TranslationLeaf };

const translations: TranslationTree = {
  hero: {
    title:        { de: 'Jannik Hoff', en: 'Jannik Hoff' },
    subtitle:     { de: 'Frontendentwickler', en: 'Frontend Developer' },
    workbtn:      { de: 'Meine Projekte', en: 'Check my work' },
    contactbtn:   { de: 'Kontaktier mich', en: 'Contact Me' },
    bannerone:    { de: 'Verfügbar für Remote-Arbeit', en: 'Available for remote work' },
    bannertwo:    { de: 'Frontendentwickler', en: 'Frontend Developer' },
    bannerthree:  { de: 'Ansässig in Saarlouis', en: 'Based in Saarlouis' },
  },
  header: {
    about:        { de: 'Über mich', en: 'About me' },
    skills:       { de: 'Fähigkeiten', en: 'Skills' },
    projects:     { de: 'Projekte', en: 'Projects' },
  },
  about: {
    whoiam:       { de: 'Wer ich bin', en: 'Who I Am' },
    title:        { de: 'Über mich', en: 'About Me' },
    p1:           {
      de: 'Hey, ich bin Jannik – leidenschaftlicher Softwareentwickler mit starkem Interesse an modernen Frontend- und Backend-Technologien. Mich motiviert, reale, funktionale Projekte von Grund auf zu bauen und sie kontinuierlich zu verbessern – Ideen in laufende Anwendungen zu verwandeln treibt mich an.',
      en: "Hey, I'm Jannik — a passionate software developer with a strong interest in modern frontend and backend technologies. Building real, functional projects from scratch and improving them continuously motivates me to turn ideas into working applications.",
    },
    location:     {
      de: 'Ansässig in Deutschland; offen für Remote-Arbeit und bei der passenden Gelegenheit auch für einen Umzug. Ich arbeite gern eigenständig und ebenso gern in strukturierten Umgebungen mit klarer Kommunikation und Zusammenarbeit.',
      en: 'Based in Germany; open to remote work and relocation for the right opportunity. I enjoy working independently as well as in structured environments where clear communication and collaboration matter.',
    },
    cognition:    {
      de: 'Offen und lernbereit: Ich probiere neue Tools und Frameworks aus, verbessere kontinuierlich meinen Workflow und die Codequalität und sehe Lernen als festen Bestandteil meiner Entwicklung.',
      en: 'Open-minded and eager to learn: I explore new tools and frameworks, keep refining my workflow and code quality, and treat continuous learning as core to my growth.',
    },
    releases:     {
      de: 'Probleme löse ich strukturiert und analytisch: Ich zerlege komplexe Aufgaben, experimentiere mit Lösungen und verbessere sie schrittweise. Beharrlichkeit, Kreativität und Zusammenarbeit prägen meinen Ansatz.',
      en: 'I tackle problems in a structured, analytical way: breaking challenges down, experimenting with solutions, and refining them step by step. Persistence, creativity, and collaboration shape how I work.',
    },
    new_releases: {
      de: 'Ich baue aktiv an eigenen Projekten, erkunde neue Werkzeuge und erweitere mein Portfolio laufend – immer mit dem Ziel, sauberer, wartbarer und effizienter zu entwickeln.',
      en: 'I actively work on personal projects, explore new tools, and keep expanding my portfolio — always aiming to build cleaner, more maintainable, and more efficient software.',
    },
  },
  skills: {
    label:        { de: 'Technologien', en: 'Technologies' },
    title:        { de: 'Skill Set', en: 'Skill Set' },
    intro:        {
      de: 'Hands-on Erfahrung mit modernen Webtechnologien, vor allem JavaScript, HTML und CSS. Ich baue interaktive, responsive UIs und verbinde sie mit klarer, strukturierter Logik. Über persönliche Projekte vertiefe ich laufend mein Verständnis für Frontend-Entwicklung und Anwendungsfluss. Ich bin offen für neue Frameworks, Tools und Best Practices und passe mich aktiv an, wenn sich Webentwicklung weiterentwickelt – durch Experimentieren, Refactoring und Verbesserungen halte ich meinen Stack aktuell.',
      en: 'I have hands-on experience with modern web technologies, primarily focusing on JavaScript, HTML, and CSS. I enjoy building interactive, responsive user interfaces and connecting them with clean, structured logic. Through personal projects, I continuously strengthen my understanding of frontend development and application flow. I am open to learning new frameworks, tools, and best practices, and I actively adapt to new technologies as web development evolves — regularly experimenting, refactoring, and improving existing projects to keep my stack current.',
    },
    prompt:       { de: 'Sie brauchen eine andere Technologie?', en: 'Need another technology?' },
    outro:        {
      de: 'Wenn Sie einen Entwickler suchen, der motiviert ist zu wachsen, sich anzupassen und neue Skills aufzubauen, melden Sie sich gern.',
      en: 'If you are looking for a developer who is motivated to grow, adapt, and learn new skills, feel free to reach out.',
    },
    cta:          { de: "Let's Talk", en: "Let's Talk" },
  },
  projects: {
    label:        { de: 'Portfolio', en: 'Portfolio' },
    title:        { de: 'Ausgewählte Projekte', en: 'Featured Projects' },
    intro:        {
      de: 'Hier findest du eine Auswahl meiner Arbeiten – interagiere mit den Projekten, um meine Skills im Einsatz zu sehen.',
      en: 'Explore a selection of my work — interact with projects to see my skills in action.',
    },
    liveDemo: { de: 'Live Demo', en: 'Live Demo' },
    github: { de: 'GitHub', en: 'GitHub' },
    nextLabel: { de: 'Nächstes Projekt', en: 'Next project' },
  },
  projectDetails: {
    p1: {
      title: { de: 'Join', en: 'Join' },
      question: { de: 'Worum geht es in diesem Projekt?', en: 'What is this project about?' },
      description: {
        de: 'Task-Manager, inspiriert vom Kanban-System. Erstelle und organisiere Aufgaben per Drag-and-Drop und weise Benutzer sowie Kategorien zu.',
        en: 'Task manager inspired by the Kanban system. Create and organize tasks using drag-and-drop functions, assign users and categories.',
      },
    },
    p2: {
      title: { de: 'El Pollo Loco', en: 'El Pollo Loco' },
      question: { de: 'Worum geht es in diesem Projekt?', en: 'What is this project about?' },
      description: {
        de: 'Jump-, Run- und Throw-Spiel auf objektorientierter Basis. Hilf Pepe, Münzen und Tabasco zu finden, um gegen die verrückte Henne zu kämpfen.',
        en: 'Jump, run and throw game based on an object-oriented approach. Help Pepe to find coins and Tabasco to fight the crazy hen.',
      },
    },
    p3: {
      title: { de: 'Pokédex', en: 'Pokedex' },
      question: { de: 'Worum geht es in diesem Projekt?', en: 'What is this project about?' },
      description: {
        de: 'Single-Page-Anwendung mit React, React Router und Tailwind, die per PokéAPI dynamische Daten lädt, zwischenspeichert und gefiltert darstellt. Fokus auf performantes Fetching, zustandsbasierte UI-Updates und mobile-responsive Komponenten.',
        en: 'Single-page app built with React, React Router, and Tailwind that consumes the PokéAPI, caches responses, and renders filterable data views. Emphasis on performant fetching, state-driven UI updates, and mobile-responsive components.',
      },
    },
  },
  gallery: {
    card1: {
      title:  { de: '', en: '' },
      text:   {
        de: 'Klarer Code, gute Tests und sinnvolle Komponenten. Jannik Hoff\'s Frontend‑Workflows sind effizient und professionell.',
        en: 'Clear code, solid tests, and well‑structured components. Jannik Hoff’s frontend workflows are efficient and professional.',
      },
      sender: { de: 'GitHub Copilot', en: 'GitHub Copilot' },
    },
  card2: {
      title:  { de: '', en: '' },
      text:   {
        de: 'Strukturiert, präzise und lösungsorientiert. Jannik Hoff kombiniert saubere Architektur mit solider UX und sorgt für wartbaren Code.',
        en: 'Structured, precise, and solution‑oriented. Jannik Hoff combines clean architecture with solid UX and delivers maintainable code.',
      },
      sender: { de: 'ChatGPT', en: 'ChatGPT' },
      
    },
     card3: {
      title:  { de: '', en: '' },
      text:   {
        de: 'Zuverlässig, performant und gut gepflegt. Jannik Hoff hält sein Entwicklungs‑Setup schlank und sorgt für reibungslose Workflows.',
        en: 'Reliable, performant, and well maintained. Jannik Hoff keeps his development setup lean and ensures smooth workflows.',
      },
      sender: { de: 'Alexander Schulz - Fullstack Dev.', en: 'Alexander Schulz - Fullstack Dev.' },
    },
    card4: {
      title:  { de: '', en: '' },
      text:   {
        de: 'Jannik Hoff kombiniert eine steile Lernkurve mit einer beneidenswerten Zielstrebigkeit. Im Web Development wartet er nicht auf Lösungen, er erarbeitet sie sich proaktiv selbst. Ein Entwickler mit dem richtigen Mindset, der sich schnell in neue Technologien einarbeitet und Ergebnisse liefert.',
        en: 'Jannik Hoff combines a steep learning curve with admirable determination. In web development he never waits for solutions—he proactively creates them. A developer with the right mindset who ramps up on new technologies quickly and delivers results.',
      },
      sender: { de: 'Nicolas Tran - IT Security Specialist', en: 'Nicolas Tran - IT Security Specialist' },
    },
    card5: {
      title:  { de: '', en: '' },
      text:   {
        de: 'Produktiv, fokussiert und schnell. Er nutzt das Tooling sinnvoll (Terminal, Tasks, Debugging) und hält das Projekt sauber.',
        en: 'Productive, focused, and fast. He uses the tooling effectively (terminal, tasks, debugging) and keeps the project clean.',
      },
      sender: { de: 'Mein PC', en: 'My PC' },
    },
  },
  contact: {
    label:        { de: 'Kontaktiere mich', en: 'Contact me' },
    title:        { de: 'Lass uns zusammenarbeiten', en: "Let's work together" },
    question:     { de: 'Welche Herausforderung lösen wir gemeinsam?', en: 'Which challenge can we solve together?' },
    blurb:        {
      de: 'Beschreibe kurz dein Projekt oder die Rolle. Ich bringe mich pragmatisch ein, liefere zuverlässig und arbeite professionell, strukturiert und kollaborativ in Entwicklerteams.',
      en: 'Describe your project or the role. I contribute pragmatically, deliver reliably, and work professionally, with structure and collaboration in  developer teams.',
    },
    needdev:      { de: 'Sie suchen einen Softwareentwickler?', en: 'Looking for a software developer?' },
    needdev_cta:  { de: 'Lass uns reden!', en: 'Let’s talk!' },
    form: {
      name_label:     { de: 'Wie heißt du?', en: "What's your name?" },
      name_ph:        { de: 'Dein Name', en: 'Your name' },
      name_helper:    {
        de: 'Wie darf ich dich oder dein Team ansprechen?',
        en: 'Let me know how I should address you or your team.',
      },
      email_label:    { de: 'Wie lautet deine E‑Mail?', en: "What's your email?" },
      email_ph:       { de: 'deine@email.de', en: 'youremail@email.com' },
      email_helper:   {
        de: 'Ich antworte dir direkt – bitte prüfe die Schreibweise.',
        en: 'I will reply straight away — double-check the spelling.',
      },
      message_label:  { de: 'Wobei kann ich helfen?', en: 'How can I help you?' },
      message_ph:     { de: 'Hallo Jannik, ich interessiere mich für…', en: 'Hello Jannik, I’m interested in…' },
      message_helper: {
        de: 'Projekt, Ziele oder Timeline? Ein paar Stichpunkte helfen mir bei der Vorbereitung.',
        en: 'A few notes on scope, goals, or timeline help me prepare.',
      },
      name_required:  { de: 'Bitte gib deinen Namen ein.', en: 'Please enter your name.' },
      email_required: { de: 'Bitte gib deine E-Mail-Adresse ein.', en: 'Please enter your email address.' },
      email_invalid:  { de: 'Bitte gib eine gültige E-Mail-Adresse ein.', en: 'Please enter a valid email address.' },
      message_required: {
        de: 'Bitte beschreibe kurz dein Anliegen.',
        en: 'Please describe your request.',
      },
      privacy_required: {
        de: 'Bitte bestätige die Datenschutzrichtlinie.',
        en: 'Please confirm the privacy policy.',
      },
      form_invalid: {
        de: 'Bitte prüfe die markierten Felder, bevor du die Nachricht sendest.',
        en: 'Please review the highlighted fields before sending your message.',
      },
      privacy_text:   {
        de: 'Ich habe die Datenschutzrichtlinie gelesen und stimme der Verarbeitung meiner Daten zu.',
        en: 'I have read the privacy policy and agree to the processing of my data as outlined.',
      },
      privacy_link:   { de: 'Datenschutzrichtlinie', en: 'privacy policy' },
      submit:         { de: 'Sag Hallo :)', en: 'Say Hello :)' },
      sending:        { de: 'Sende...', en: 'Sending...' },
      success:        {
        de: 'Danke für deine Nachricht! Ich melde mich innerhalb von 24 Stunden mit einer Antwort.',
        en: 'Thanks for your message! I will get back to you within 24 hours.',
      },
      error:          {
        de: 'Da ist etwas schiefgelaufen. Versuch es gleich noch einmal oder kontaktiere mich direkt per E-Mail.',
        en: 'Something went wrong. Please try again shortly or reach out via email directly.',
      },
      status_success: { de: 'Nachricht gesendet', en: 'Message sent' },
      status_error:   { de: 'Versand fehlgeschlagen', en: 'Delivery failed' },
      dismiss:        { de: 'Hinweis schließen', en: 'Dismiss notification' },
    },
  },
  legalNotice: {
    title:        { de: 'Rechtliche Hinweise', en: 'Legal Notice' },
    imprintTitle: { de: 'Impressum', en: 'Imprint' },
    imprint: {
      name:      { de: 'Jannik Hoff', en: 'Jannik Hoff' },
      street:    { de: 'Im Vogelsang 9', en: 'Im Vogelsang 9' },
      city:      { de: '66740 Saarlouis', en: '66740 Saarlouis' },
      country:   { de: 'Deutschland', en: 'Germany' },
      emailLabel:{ de: 'E-Mail', en: 'Email' },
      phoneLabel:{ de: 'Telefon', en: 'Phone' },
    },
    sections: {
      acceptance: {
        title: { de: 'Akzeptanz der Bedingungen', en: 'Acceptance of Terms' },
        body: {
          de: 'Mit dem Zugriff auf dieses Portfolio erklärst du dich mit den hier beschriebenen Bedingungen einverstanden. Die Hinweise können jederzeit ohne Vorankündigung aktualisiert werden.',
          en: 'By accessing and using this portfolio website, you acknowledge and agree to the terms outlined in this Legal Notice. These terms may be updated or modified at any time without prior notice.',
        },
      },
      scope: {
        title: { de: 'Geltungsbereich und Zweck', en: 'Scope and Purpose of the Website' },
        body: {
          de: 'Die Website ist ein nichtkommerzielles Portfolio, das Projekte, Fähigkeiten und Arbeitsproben zeigt. Es werden keine kostenpflichtigen Dienstleistungen direkt über die Seite angeboten.',
          en: 'This website is a private, non-commercial portfolio that showcases personal projects, skills, and development work. No commercial services or paid offerings are provided.',
        },
      },
      ownership: {
        title: { de: 'Urheberrecht und Eigentum', en: 'Ownership and Intellectual Property' },
        body: {
          de: 'Alle Inhalte wie Texte, Code, Designs und Grafiken unterliegen dem Urheberrecht von Jannik Hoff, sofern nicht anders angegeben. Eine Nutzung außerhalb der gesetzlichen Schranken ist untersagt.',
          en: 'All content on this website, including text, code, design, and graphics, is the intellectual property of the website owner unless otherwise stated. Unauthorized use, reproduction, or distribution is prohibited.',
        },
      },
      usage: {
        title: { de: 'Zulässige Nutzung', en: 'Use of the Website' },
        body: {
          de: 'Die Nutzung der Website ist nur zu rechtmäßigen Zwecken gestattet. Manipulationen, Angriffe auf die Infrastruktur oder missbräuchliche Nutzung des Kontaktformulars sind untersagt.',
          en: 'This website may only be used for lawful purposes. Any misuse, including attempts to disrupt functionality, gain unauthorized access, or abuse contact services, is strictly prohibited.',
        },
      },
      external: {
        title: { de: 'Eingesetzte Dienste', en: 'External Services' },
        body: {
          de: 'Für Typografie werden Google Fonts verwendet; das Kontaktformular sendet Anfragen an einen FastAPI-Dienst. Es werden keine Tracking- oder Marketing-Cookies eingesetzt.',
          en: 'This website uses Google Fonts for typography and a FastAPI-based backend service to process contact form submissions. No tracking or analytics services are used for marketing or profiling.',
        },
      },
      disclaimer: {
        title: { de: 'Haftungsausschluss', en: 'Disclaimer and Limitation of Liability' },
        body: {
          de: 'Alle Inhalte werden ohne Gewähr bereitgestellt. Es wird keine Haftung für Aktualität, Vollständigkeit oder Schäden übernommen, die aus der Nutzung oder Nichtverfügbarkeit der Website entstehen.',
          en: 'All content is provided "as is" without warranties of any kind. The website owner assumes no liability for the accuracy, completeness, or reliability of the information, nor for damages resulting from the use or inability to use this website.',
        },
      },
    },
    lastUpdated: { de: 'Zuletzt aktualisiert:', en: 'Last updated:' },
  },
  privacyPolicy: {
    title: { de: 'Datenschutzerklärung', en: 'Privacy Policy' },
    lastUpdated: { de: 'Stand:', en: 'Last updated:' },
    sections: {
      responsible: {
        title: { de: '1. Verantwortlicher', en: '1. Responsible Party' },
        body: {
          de: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist:\n\nJannik Hoff\nIm Vogelsang 9\n66740 Saarlouis\nDeutschland\nE-Mail: hoffjannik95@gmail.com\nTelefon: 015774478954',
          en: 'The responsible party for data processing on this website is:\n\nJannik Hoff\nIm Vogelsang 9\n66740 Saarlouis\nGermany\nEmail: hoffjannik95@gmail.com\nPhone: 015774478954',
        },
      },
      general: {
        title: { de: '2. Allgemeine Hinweise zur Datenverarbeitung', en: '2. General Information on Data Processing' },
        body: {
          de: 'Der Schutz Ihrer persönlichen Daten ist mir ein wichtiges Anliegen. Personenbezogene Daten werden auf dieser Website nur im technisch notwendigen Umfang sowie zur Bearbeitung von Anfragen verarbeitet.\n\nPersonenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können (z. B. Name, E-Mail-Adresse, IP-Adresse).',
          en: 'The protection of your personal data is very important to me. Personal data is only processed on this website to the extent technically necessary and to handle inquiries.\n\nPersonal data includes any information that can personally identify you (e.g., name, email address, IP address).',
        },
      },
      hosting: {
        title: { de: '3. Hosting', en: '3. Hosting' },
        body: {
          de: 'Diese Website wird auf einem virtuellen Server (VPS) bei IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland gehostet.\n\nBeim Aufruf der Website werden automatisch Server-Log-Dateien gespeichert. Diese enthalten:\n• IP-Adresse\n• Datum und Uhrzeit der Anfrage\n• aufgerufene Seite/Datei\n• Browsertyp und -version\n• Betriebssystem\n• Referrer-URL\n\nDie Verarbeitung dieser Daten erfolgt zur Sicherstellung des technischen Betriebs, zur Fehleranalyse sowie zur Abwehr von Angriffsversuchen.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem und stabilem Betrieb der Website).',
          en: 'This website is hosted on a virtual private server (VPS) at IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Germany.\n\nWhen accessing the website, server log files are automatically stored containing:\n• IP address\n• Date and time of request\n• Page/file accessed\n• Browser type and version\n• Operating system\n• Referrer URL\n\nThis data is processed to ensure technical operation, error analysis, and defense against attacks.\n\nLegal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest in secure and stable website operation).',
        },
      },
      contact: {
        title: { de: '4. Kontaktaufnahme und Kontaktformular', en: '4. Contact and Contact Form' },
        body: {
          de: 'Wenn Sie mich per Kontaktformular oder per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten (z. B. Name, E-Mail-Adresse, Nachricht) verarbeitet, um Ihre Anfrage zu bearbeiten.\n\nFür das Kontaktformular wird ein selbst betriebenes Backend (FastAPI-Mailservice) verwendet. Die übermittelten Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage genutzt und nicht an Dritte weitergegeben.\n\nDie Daten werden nur so lange gespeichert, wie dies zur Bearbeitung der Anfrage erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung einer Anfrage / Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation).',
          en: 'When you contact me via the contact form or email, the data you provide (e.g., name, email address, message) will be processed to handle your inquiry.\n\nThe contact form uses a self-hosted backend (FastAPI mail service). The transmitted data is used exclusively to process your inquiry and is not shared with third parties.\n\nData is stored only as long as necessary to process the inquiry or as required by legal retention obligations.\n\nLegal basis: Art. 6 para. 1 lit. b GDPR (processing an inquiry/contract initiation) and Art. 6 para. 1 lit. f GDPR (legitimate interest in efficient communication).',
        },
      },
      googleFonts: {
        title: { de: '5. Google Fonts', en: '5. Google Fonts' },
        body: {
          de: 'Diese Website nutzt Google Fonts zur einheitlichen Darstellung von Schriftarten. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.\n\nBeim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftarten direkt von Servern von Google, damit Texte und Schriftarten korrekt angezeigt werden können. Dabei wird Ihre IP-Adresse an Google übertragen. Eine Speicherung von Cookies durch diese Website findet in diesem Zusammenhang nicht statt.\n\nDie Nutzung von Google Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung meiner Website.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).\n\nWeitere Informationen finden Sie in der Datenschutzerklärung von Google.',
          en: 'This website uses Google Fonts for uniform font display. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.\n\nWhen accessing a page, your browser loads the required fonts directly from Google servers so that text and fonts are displayed correctly. Your IP address is transmitted to Google in this process. No cookies are stored by this website in this context.\n\nGoogle Fonts is used in the interest of a uniform and appealing presentation of my website.\n\nLegal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest).\n\nFurther information can be found in Google\'s privacy policy.',
        },
      },
      cookies: {
        title: { de: '6. Cookies', en: '6. Cookies' },
        body: {
          de: 'Diese Website verwendet keine Cookies.',
          en: 'This website does not use cookies.',
        },
      },
      rights: {
        title: { de: '7. Ihre Rechte', en: '7. Your Rights' },
        body: {
          de: 'Sie haben im Rahmen der DSGVO folgende Rechte:\n• Recht auf Auskunft (Art. 15 DSGVO)\n• Recht auf Berichtigung (Art. 16 DSGVO)\n• Recht auf Löschung (Art. 17 DSGVO)\n• Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n• Recht auf Widerspruch (Art. 21 DSGVO)\n\nZur Ausübung Ihrer Rechte genügt eine formlose Mitteilung per E-Mail an mich.',
          en: 'Under the GDPR, you have the following rights:\n• Right to access (Art. 15 GDPR)\n• Right to rectification (Art. 16 GDPR)\n• Right to erasure (Art. 17 GDPR)\n• Right to restriction of processing (Art. 18 GDPR)\n• Right to data portability (Art. 20 GDPR)\n• Right to object (Art. 21 GDPR)\n\nTo exercise your rights, simply send an informal message via email to me.',
        },
      },
      ssl: {
        title: { de: '8. SSL- bzw. TLS-Verschlüsselung', en: '8. SSL/TLS Encryption' },
        body: {
          de: 'Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Sie erkennen eine verschlüsselte Verbindung an „https://" in der Adresszeile Ihres Browsers.',
          en: 'This website uses SSL/TLS encryption for security reasons and to protect the transmission of confidential content. You can recognize an encrypted connection by "https://" in your browser\'s address bar.',
        },
      },
      updated: {
        title: { de: '9. Aktualität', en: '9. Last Updated' },
        body: {
          de: 'Diese Datenschutzerklärung hat den Stand: 12.02.2026',
          en: 'This privacy policy is dated: 12.02.2026',
        },
      },
    },
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'app-language';
  private readonly lang = signal<Lang>(this.getInitialLang());

  private getInitialLang(): Lang {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'de' || stored === 'en') {
        return stored;
      }
    }
    return 'de';
  }

  current(): Lang {
    return this.lang();
  }

  setLang(next: Lang): void {
    this.lang.set(next);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, next);
    }
  }

  toggle(): void {
    const nextLang = this.lang() === 'en' ? 'de' : 'en';
    this.lang.set(nextLang);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, nextLang);
    }
  }

  t(key: string): string {
    const parts = key.split('.');
    let node: TranslationLeaf | null = translations;
    for (const part of parts) {
      if (node && typeof node === 'object' && part in node) {
        node = (node as TranslationTree)[part];
      } else {
        return key;
      }
    }

    if (node == null) return key;
    if (typeof node === 'string') return node;

    const lang = this.lang();
    const candidate = (node as Record<string, string>)[lang];
    return candidate ?? key;
  }
}
