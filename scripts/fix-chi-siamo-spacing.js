// Script per fixare lo spacing della pagina "Chi Siamo"
const https = require('https');

const PROJECT_ID = '97oreljh';
const DATASET = 'production';
const API_TOKEN = process.env.SANITY_API_TOKEN;

if (!API_TOKEN) {
  console.log('Usa: SANITY_API_TOKEN=sk... node scripts/fix-chi-siamo-spacing.js');
  process.exit(1);
}

// Sezioni con spacing generoso e background alternati
const sections = [
  // 1. HERO SECTION - Full screen, no padding needed
  {
    _type: 'heroSection',
    _key: 'hero-about',
    title: { it: 'Chi Siamo', en: 'About Us' },
    subtitle: {
      it: 'Da oltre 30 anni leader nella produzione di macchinari di precisione per vernici',
      en: 'Over 30 years as a leader in precision paint machinery manufacturing'
    },
    layout: 'center',
    height: 'large',
    overlayOpacity: 60,
    textColor: 'white',
    showScrollIndicator: true,
    // Hero non ha padding - è full screen
  },

  // 2. TEXT + IMAGE - La Nostra Storia (sfondo bianco)
  {
    _type: 'textImageSection',
    _key: 'story-section',
    eyebrow: { it: 'La Nostra Storia', en: 'Our Story' },
    title: { it: 'Una Tradizione di Eccellenza', en: 'A Tradition of Excellence' },
    content: {
      it: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'GLOS Italy nasce dalla passione per l\'innovazione e dalla profonda conoscenza del settore delle vernici. Fondata nel 1990, l\'azienda si è affermata come punto di riferimento per la produzione di macchinari di precisione destinati all\'industria dei rivestimenti.' }],
        },
        {
          _type: 'block',
          _key: 'p2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Nel corso degli anni, abbiamo sviluppato una gamma completa di soluzioni tecnologiche, dai miscelatori alle taglierine, sempre con un occhio attento alla qualità e all\'efficienza energetica. La nostra sede a Roma rappresenta il cuore pulsante di un\'attività che oggi serve clienti in oltre 50 paesi.' }],
        },
      ],
    },
    imagePosition: 'right',
    backgroundColor: 'white',
    paddingTop: '2xl',
    paddingBottom: '2xl',
  },

  // 3. STATS - Sfondo grigio chiaro
  {
    _type: 'statsSection',
    _key: 'stats-about',
    eyebrow: { it: 'I Numeri', en: 'The Numbers' },
    title: { it: 'I Numeri che Contano', en: 'Numbers That Matter' },
    subtitle: { it: 'La nostra crescita parla da sé', en: 'Our growth speaks for itself' },
    stats: [
      { _key: 's1', value: '30+', label: { it: 'Anni di Esperienza', en: 'Years of Experience' }, icon: '📅' },
      { _key: 's2', value: '500+', label: { it: 'Clienti Soddisfatti', en: 'Satisfied Clients' }, icon: '👥' },
      { _key: 's3', value: '50+', label: { it: 'Paesi Serviti', en: 'Countries Served' }, icon: '🌍' },
      { _key: 's4', value: '1000+', label: { it: 'Macchinari Installati', en: 'Machines Installed' }, icon: '⚙️' },
    ],
    layout: 'grid',
    columns: 4,
    animated: true,
    backgroundColor: 'gray',
    paddingTop: '2xl',
    paddingBottom: '2xl',
  },

  // 4. FEATURES - I Nostri Valori (sfondo bianco)
  {
    _type: 'featuresSection',
    _key: 'values-about',
    eyebrow: { it: 'I Nostri Valori', en: 'Our Values' },
    title: { it: 'Cosa Ci Guida', en: 'What Drives Us' },
    subtitle: { it: 'I principi fondamentali che ispirano ogni nostra azione', en: 'The core principles that inspire everything we do' },
    features: [
      {
        _key: 'f1',
        icon: '✨',
        title: { it: 'Qualità', en: 'Quality' },
        description: { it: 'Ogni prodotto è realizzato con i massimi standard qualitativi e sottoposto a rigorosi controlli.', en: 'Every product is made with the highest quality standards.' },
      },
      {
        _key: 'f2',
        icon: '💡',
        title: { it: 'Innovazione', en: 'Innovation' },
        description: { it: 'Investiamo costantemente in ricerca e sviluppo per offrire soluzioni all\'avanguardia.', en: 'We constantly invest in R&D for cutting-edge solutions.' },
      },
      {
        _key: 'f3',
        icon: '🤝',
        title: { it: 'Affidabilità', en: 'Reliability' },
        description: { it: 'Siamo al fianco dei nostri clienti con assistenza tecnica dedicata e ricambi garantiti.', en: 'We support our customers with dedicated technical assistance.' },
      },
      {
        _key: 'f4',
        icon: '🌱',
        title: { it: 'Sostenibilità', en: 'Sustainability' },
        description: { it: 'Progettiamo macchinari a basso impatto ambientale e promuoviamo pratiche eco-sostenibili.', en: 'We design eco-friendly machinery.' },
      },
    ],
    layout: 'grid',
    columns: 4,
    backgroundColor: 'white',
    paddingTop: '2xl',
    paddingBottom: '2xl',
  },

  // 5. TIMELINE - Storia Aziendale (sfondo grigio)
  {
    _type: 'timelineSection',
    _key: 'timeline-about',
    eyebrow: { it: 'La Nostra Evoluzione', en: 'Our Evolution' },
    title: { it: 'Tappe Fondamentali', en: 'Key Milestones' },
    items: [
      {
        _key: 't1',
        year: '1990',
        title: { it: 'Fondazione', en: 'Foundation' },
        description: { it: 'GLOS Italy viene fondata a Roma con la missione di innovare il settore dei macchinari per vernici.', en: 'GLOS Italy is founded in Rome.' },
      },
      {
        _key: 't2',
        year: '2000',
        title: { it: 'Espansione Europea', en: 'European Expansion' },
        description: { it: 'Apertura delle prime filiali commerciali in Francia, Germania e Spagna.', en: 'Opening branches in France, Germany, and Spain.' },
      },
      {
        _key: 't3',
        year: '2010',
        title: { it: 'Nuova Sede', en: 'New Headquarters' },
        description: { it: 'Inaugurazione del nuovo stabilimento produttivo con tecnologie all\'avanguardia.', en: 'New production facility inauguration.' },
      },
      {
        _key: 't4',
        year: '2020',
        title: { it: 'Trasformazione Digitale', en: 'Digital Transformation' },
        description: { it: 'Lancio della piattaforma IoT per il monitoraggio remoto dei macchinari.', en: 'Launch of IoT platform.' },
      },
    ],
    layout: 'alternating',
    backgroundColor: 'gray',
    paddingTop: '2xl',
    paddingBottom: '2xl',
  },

  // 6. TEAM SECTION (sfondo bianco)
  {
    _type: 'teamSection',
    _key: 'team-about',
    eyebrow: { it: 'Il Team', en: 'The Team' },
    title: { it: 'Le Persone Dietro GLOS', en: 'The People Behind GLOS' },
    subtitle: { it: 'Un team di professionisti appassionati e competenti', en: 'A team of passionate professionals' },
    members: [
      {
        _key: 'm1',
        name: 'Mario Rossi',
        role: { it: 'CEO & Fondatore', en: 'CEO & Founder' },
        bio: { it: 'Con oltre 35 anni di esperienza nel settore, guida l\'azienda verso nuove sfide.', en: 'Over 35 years of experience.' },
      },
      {
        _key: 'm2',
        name: 'Laura Bianchi',
        role: { it: 'Direttore Commerciale', en: 'Commercial Director' },
        bio: { it: 'Responsabile delle strategie di vendita e delle relazioni con i clienti internazionali.', en: 'Responsible for sales strategies.' },
      },
      {
        _key: 'm3',
        name: 'Giuseppe Verdi',
        role: { it: 'Direttore Tecnico', en: 'Technical Director' },
        bio: { it: 'Ingegnere meccanico con 20 anni di esperienza nella progettazione di macchinari industriali.', en: '20 years of experience in industrial machinery.' },
      },
    ],
    layout: 'grid',
    columns: 3,
    backgroundColor: 'white',
    paddingTop: '2xl',
    paddingBottom: '2xl',
  },

  // 7. TESTIMONIALS (sfondo grigio)
  {
    _type: 'testimonialsSection',
    _key: 'testimonials-about',
    eyebrow: { it: 'Testimonianze', en: 'Testimonials' },
    title: { it: 'Cosa Dicono i Nostri Clienti', en: 'What Our Clients Say' },
    testimonials: [
      {
        _key: 'test1',
        quote: { it: 'GLOS Italy ci ha fornito macchinari di altissima qualità. Il supporto tecnico è sempre stato impeccabile e tempestivo.', en: 'GLOS Italy provided us with top quality machinery.' },
        author: 'Marco Colombo',
        company: 'ColorTech S.r.l.',
        rating: 5,
      },
      {
        _key: 'test2',
        quote: { it: 'Collaboriamo con GLOS da oltre 10 anni. Affidabilità e innovazione sono le loro parole chiave. Li consiglio vivamente.', en: 'We have been working with GLOS for over 10 years.' },
        author: 'Sophie Dupont',
        company: 'Peintures France SA',
        rating: 5,
      },
    ],
    layout: 'carousel',
    backgroundColor: 'gray',
    paddingTop: '2xl',
    paddingBottom: '2xl',
  },

  // 8. CTA SECTION (sfondo blu/primary)
  {
    _type: 'ctaSection',
    _key: 'cta-about',
    eyebrow: { it: 'Inizia Oggi', en: 'Start Today' },
    title: { it: 'Vuoi Saperne di Più?', en: 'Want to Know More?' },
    subtitle: { it: 'Contattaci per una consulenza gratuita e scopri come possiamo aiutare la tua azienda a crescere.', en: 'Contact us for a free consultation.' },
    buttons: [
      {
        _key: 'btn1',
        text: { it: 'Contattaci Ora', en: 'Contact Us Now' },
        link: '/contatti',
        variant: 'primary',
      },
      {
        _key: 'btn2',
        text: { it: 'Scopri i Prodotti', en: 'Discover Products' },
        link: '/prodotti',
        variant: 'secondary',
      },
    ],
    layout: 'center',
    backgroundColor: 'primary',
    textColor: 'white',
    paddingTop: '2xl',
    paddingBottom: '2xl',
  },
];

// Esegui la patch
const patchData = {
  mutations: [
    {
      patch: {
        id: 'page-chi-siamo',
        set: { sections: sections },
      },
    },
  ],
};

const options = {
  hostname: `${PROJECT_ID}.api.sanity.io`,
  port: 443,
  path: `/v2024-01-01/data/mutate/${DATASET}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  },
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Pagina "Chi Siamo" aggiornata con spacing migliorato!');
      console.log('');
      console.log('Modifiche applicate:');
      console.log('  ✓ Padding aumentato a "2xl" (96-128px) per tutte le sezioni');
      console.log('  ✓ Background alternati: bianco → grigio → bianco → grigio');
      console.log('  ✓ CTA finale con sfondo colorato (primary)');
      console.log('');
      console.log('Ora ricarica la pagina nel browser per vedere il risultato!');
    } else {
      console.log('❌ Errore:', res.statusCode);
      console.log(data);
    }
  });
});

req.on('error', (err) => console.error('Errore:', err.message));
req.write(JSON.stringify(patchData));
req.end();
