// Script per popolare la pagina "Chi Siamo" con contenuti di esempio
// Esegui con: node scripts/setup-chi-siamo.js

const https = require('https');

const PROJECT_ID = '97oreljh';
const DATASET = 'production';

// Token API - leggi da .env.local o inserisci qui temporaneamente
// NOTA: Questo script richiede un token con permessi di scrittura
// Ottieni il token da: https://www.sanity.io/manage/project/97oreljh/api

const API_TOKEN = process.env.SANITY_API_TOKEN || '';

if (!API_TOKEN) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║  ISTRUZIONI PER AGGIUNGERE SEZIONI A "CHI SIAMO"               ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Questo script richiede un token API con permessi di scrittura.║
║                                                                 ║
║  OPZIONE 1: Esegui con token                                   ║
║  SANITY_API_TOKEN=sk... node scripts/setup-chi-siamo.js        ║
║                                                                 ║
║  OPZIONE 2: Aggiungi manualmente le sezioni nello Studio       ║
║  Segui le istruzioni qui sotto.                                ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝

SEZIONI CONSIGLIATE PER "CHI SIAMO":

1. HERO SECTION
   - Titolo: "Chi Siamo"
   - Sottotitolo: "Da oltre 30 anni leader nella produzione di macchinari per vernici"
   - Immagine di sfondo: foto azienda o team

2. TEXT + IMAGE SECTION (La Nostra Storia)
   - Titolo: "La Nostra Storia"
   - Testo: Storia dell'azienda, fondazione, crescita
   - Immagine: foto storica o del fondatore
   - Layout: Immagine a sinistra

3. STATS SECTION (Numeri che Contano) - GIA' PRESENTE
   - Stat 1: "30+" / "Anni di Esperienza"
   - Stat 2: "500+" / "Clienti Soddisfatti"
   - Stat 3: "50+" / "Paesi Serviti"
   - Stat 4: "1000+" / "Macchinari Installati"

4. FEATURES SECTION (I Nostri Valori) - GIA' PRESENTE
   - Feature 1: "Qualità" / "Prodotti certificati e testati"
   - Feature 2: "Innovazione" / "Ricerca continua di soluzioni"
   - Feature 3: "Affidabilità" / "Assistenza garantita"
   - Feature 4: "Sostenibilità" / "Rispetto per l'ambiente"

5. TEAM SECTION (Il Nostro Team)
   - Membro 1: Nome, Ruolo, Foto, Bio breve
   - Membro 2: Nome, Ruolo, Foto, Bio breve
   - Membro 3: Nome, Ruolo, Foto, Bio breve

6. TIMELINE SECTION (La Nostra Storia)
   - 1990: Fondazione dell'azienda
   - 2000: Espansione internazionale
   - 2010: Nuova sede produttiva
   - 2020: Innovazione digitale

7. TESTIMONIALS SECTION (Cosa Dicono i Clienti)
   - Testimonianza 1: "Ottimi prodotti..." - Cliente 1
   - Testimonianza 2: "Servizio eccellente..." - Cliente 2

8. CTA SECTION (Chiamata all'Azione)
   - Titolo: "Vuoi saperne di più?"
   - Sottotitolo: "Contattaci per una consulenza gratuita"
   - Pulsante: "Contattaci" -> /contatti

───────────────────────────────────────────────────────────────────

Per aggiungere queste sezioni:
1. Vai a https://glositalystudio.vercel.app
2. Apri "Gestione Contenuti" -> "Pagine" -> "Chi Siamo"
3. Nella sezione "Sezioni", clicca "+ Aggiungi"
4. Scegli il tipo di sezione e compila i campi

`);
  process.exit(0);
}

// Se abbiamo il token, procedi con l'aggiornamento
const sections = [
  // 1. HERO SECTION
  {
    _type: 'heroSection',
    _key: 'hero-about',
    title: { it: 'Chi Siamo', en: 'About Us' },
    subtitle: {
      it: 'Da oltre 30 anni leader nella produzione di macchinari di precisione per vernici',
      en: 'Over 30 years as a leader in precision paint machinery manufacturing'
    },
    layout: 'center',
    overlayOpacity: 50,
    textColor: 'white',
    showScrollIndicator: true,
    paddingTop: 'xl',
    paddingBottom: 'xl',
  },

  // 2. TEXT + IMAGE - La Nostra Storia
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
          children: [
            {
              _type: 'span',
              text: 'GLOS Italy nasce dalla passione per l\'innovazione e dalla profonda conoscenza del settore delle vernici. Fondata nel 1990, l\'azienda si è affermata come punto di riferimento per la produzione di macchinari di precisione destinati all\'industria dei rivestimenti.',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'p2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Nel corso degli anni, abbiamo sviluppato una gamma completa di soluzioni tecnologiche, dai miscelatori alle taglierine, sempre con un occhio attento alla qualità e all\'efficienza energetica.',
            },
          ],
        },
      ],
    },
    imagePosition: 'left',
    paddingTop: 'lg',
    paddingBottom: 'lg',
  },

  // 3. STATS - già presente, ma aggiungiamo valori di esempio
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
    paddingTop: 'lg',
    paddingBottom: 'lg',
  },

  // 4. FEATURES - I Nostri Valori
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
        description: { it: 'Ogni prodotto è realizzato con i massimi standard qualitativi e sottoposto a rigorosi controlli.', en: 'Every product is made with the highest quality standards and undergoes rigorous testing.' },
      },
      {
        _key: 'f2',
        icon: '💡',
        title: { it: 'Innovazione', en: 'Innovation' },
        description: { it: 'Investiamo costantemente in ricerca e sviluppo per offrire soluzioni all\'avanguardia.', en: 'We constantly invest in R&D to offer cutting-edge solutions.' },
      },
      {
        _key: 'f3',
        icon: '🤝',
        title: { it: 'Affidabilità', en: 'Reliability' },
        description: { it: 'Siamo al fianco dei nostri clienti con assistenza tecnica dedicata e ricambi garantiti.', en: 'We stand by our customers with dedicated technical support and guaranteed spare parts.' },
      },
      {
        _key: 'f4',
        icon: '🌱',
        title: { it: 'Sostenibilità', en: 'Sustainability' },
        description: { it: 'Progettiamo macchinari a basso impatto ambientale e promuoviamo pratiche eco-sostenibili.', en: 'We design low environmental impact machinery and promote eco-friendly practices.' },
      },
    ],
    layout: 'grid',
    columns: 4,
    paddingTop: 'lg',
    paddingBottom: 'lg',
  },

  // 5. TIMELINE - Storia Aziendale
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
        description: { it: 'GLOS Italy viene fondata a Roma con la missione di innovare il settore dei macchinari per vernici.', en: 'GLOS Italy is founded in Rome with the mission to innovate the paint machinery sector.' },
      },
      {
        _key: 't2',
        year: '2000',
        title: { it: 'Espansione Europea', en: 'European Expansion' },
        description: { it: 'Apertura delle prime filiali commerciali in Francia, Germania e Spagna.', en: 'Opening of first commercial branches in France, Germany, and Spain.' },
      },
      {
        _key: 't3',
        year: '2010',
        title: { it: 'Nuova Sede', en: 'New Headquarters' },
        description: { it: 'Inaugurazione del nuovo stabilimento produttivo con tecnologie all\'avanguardia.', en: 'Inauguration of the new production facility with cutting-edge technology.' },
      },
      {
        _key: 't4',
        year: '2020',
        title: { it: 'Trasformazione Digitale', en: 'Digital Transformation' },
        description: { it: 'Lancio della piattaforma IoT per il monitoraggio remoto dei macchinari.', en: 'Launch of IoT platform for remote machinery monitoring.' },
      },
    ],
    layout: 'alternating',
    paddingTop: 'lg',
    paddingBottom: 'lg',
  },

  // 6. TEAM SECTION
  {
    _type: 'teamSection',
    _key: 'team-about',
    eyebrow: { it: 'Il Team', en: 'The Team' },
    title: { it: 'Le Persone Dietro GLOS', en: 'The People Behind GLOS' },
    subtitle: { it: 'Un team di professionisti appassionati e competenti', en: 'A team of passionate and skilled professionals' },
    members: [
      {
        _key: 'm1',
        name: 'Mario Rossi',
        role: { it: 'CEO & Fondatore', en: 'CEO & Founder' },
        bio: { it: 'Con oltre 35 anni di esperienza nel settore, guida l\'azienda verso nuove sfide.', en: 'With over 35 years of experience, he leads the company towards new challenges.' },
      },
      {
        _key: 'm2',
        name: 'Laura Bianchi',
        role: { it: 'Direttore Commerciale', en: 'Commercial Director' },
        bio: { it: 'Responsabile delle strategie di vendita e delle relazioni con i clienti internazionali.', en: 'Responsible for sales strategies and international customer relations.' },
      },
      {
        _key: 'm3',
        name: 'Giuseppe Verdi',
        role: { it: 'Direttore Tecnico', en: 'Technical Director' },
        bio: { it: 'Ingegnere meccanico con 20 anni di esperienza nella progettazione di macchinari industriali.', en: 'Mechanical engineer with 20 years of experience in industrial machinery design.' },
      },
    ],
    layout: 'grid',
    columns: 3,
    paddingTop: 'lg',
    paddingBottom: 'lg',
  },

  // 7. TESTIMONIALS
  {
    _type: 'testimonialsSection',
    _key: 'testimonials-about',
    eyebrow: { it: 'Testimonianze', en: 'Testimonials' },
    title: { it: 'Cosa Dicono i Nostri Clienti', en: 'What Our Clients Say' },
    testimonials: [
      {
        _key: 'test1',
        quote: { it: 'GLOS Italy ci ha fornito macchinari di altissima qualità. Il supporto tecnico è sempre stato impeccabile.', en: 'GLOS Italy provided us with top quality machinery. Technical support has always been impeccable.' },
        author: 'Marco Colombo',
        company: 'ColorTech S.r.l.',
        rating: 5,
      },
      {
        _key: 'test2',
        quote: { it: 'Collaboriamo con GLOS da oltre 10 anni. Affidabilità e innovazione sono le loro parole chiave.', en: 'We have been working with GLOS for over 10 years. Reliability and innovation are their keywords.' },
        author: 'Sophie Dupont',
        company: 'Peintures France SA',
        rating: 5,
      },
    ],
    layout: 'carousel',
    paddingTop: 'lg',
    paddingBottom: 'lg',
  },

  // 8. CTA SECTION
  {
    _type: 'ctaSection',
    _key: 'cta-about',
    eyebrow: { it: 'Inizia Oggi', en: 'Start Today' },
    title: { it: 'Vuoi Saperne di Più?', en: 'Want to Know More?' },
    subtitle: { it: 'Contattaci per una consulenza gratuita e scopri come possiamo aiutarti.', en: 'Contact us for a free consultation and discover how we can help you.' },
    buttons: [
      {
        _key: 'btn1',
        text: { it: 'Contattaci', en: 'Contact Us' },
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
    paddingTop: 'xl',
    paddingBottom: 'xl',
  },
];

// Esegui la patch
const patchData = {
  mutations: [
    {
      patch: {
        id: 'page-chi-siamo',
        set: {
          sections: sections,
        },
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
      console.log('✅ Pagina "Chi Siamo" aggiornata con successo!');
      console.log('Sezioni aggiunte:');
      console.log('  1. Hero Section');
      console.log('  2. Text + Image (La Nostra Storia)');
      console.log('  3. Stats Section');
      console.log('  4. Features Section (Valori)');
      console.log('  5. Timeline Section');
      console.log('  6. Team Section');
      console.log('  7. Testimonials Section');
      console.log('  8. CTA Section');
      console.log('\nOra vai nello Studio e personalizza i contenuti!');
    } else {
      console.log('❌ Errore:', res.statusCode);
      console.log(data);
    }
  });
});

req.on('error', (err) => {
  console.error('Errore:', err.message);
});

req.write(JSON.stringify(patchData));
req.end();
