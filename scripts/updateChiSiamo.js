// Script per aggiornare la pagina "Chi Siamo" con il nuovo contenuto
// Esegui con: npx sanity exec scripts/updateChiSiamo.js --with-user-token

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const newSections = [
  // === SEZIONE 1: HERO ===
  {
    _type: 'heroSection',
    _key: 'chi-siamo-hero',
    eyebrow: {
      it: 'CHI SIAMO',
      en: 'ABOUT US',
      es: 'QUIÉNES SOMOS',
    },
    title: {
      it: 'GLOS: Ingegneria Meccanica e Innovazione Made in Italy.',
      en: 'GLOS: Mechanical Engineering and Innovation Made in Italy.',
      es: 'GLOS: Ingeniería mecánica e innovación Made in Italy.',
    },
    backgroundType: 'gradient',
    backgroundGradient: 'blue-dark',
    height: 'medium',
    contentPosition: 'center',
    textColor: 'white',
    animation: 'slide-up',
    parallax: true,
    parallaxIntensity: 'subtle',
    showFloatingParticles: true,
    particleCount: 5,
    showGlowLines: true,
    showScrollIndicator: true,
    scrollIndicatorText: {
      it: 'Scopri di più',
      en: 'Learn more',
      es: 'Descubre más',
    },
  },

  // === SEZIONE 2: LA VISIONE (Testo Libero) ===
  {
    _type: 'richTextSection',
    _key: 'chi-siamo-visione',
    title: {
      it: 'La Nostra Visione',
      en: 'Our Vision',
      es: 'Nuestra Visión',
    },
    content: {
      it: 'Fondata sulla solida tradizione metalmeccanica di Reggio Emilia, la Motor Valley italiana della precisione, GLOS Srl progetta e produce soluzioni meccaniche avanzate per l\'edilizia, l\'industria e il settore dei colorifici.\n\nDal 2005, la nostra missione è trasformare l\'esperienza sul campo in macchine ad alte prestazioni. Non ci limitiamo a costruire strumenti: progettiamo efficienza, rapidità e precisione per i professionisti più esigenti.',
      en: 'Founded on the solid metalworking tradition of Reggio Emilia, Italy\'s Motor Valley of precision, GLOS Ltd designs and manufactures advanced mechanical solutions for the construction, industrial and paint industries.\n\nSince 2005, our mission has been to transform field experience into high-performance machines. We don\'t just build tools: we design efficiency, speed and precision for the most demanding professionals.',
      es: 'Basada en la sólida tradición metalúrgica de Reggio Emilia, el Motor Valley italiano de la precisión, GLOS Srl diseña y produce soluciones mecánicas avanzadas para la construcción, la industria y el sector de las pinturas.\n\nDesde 2005, nuestra misión es transformar la experiencia sobre el terreno en máquinas de alto rendimiento. No nos limitamos a fabricar herramientas: diseñamos eficiencia, rapidez y precisión para los profesionales más exigentes.',
    },
    textAlign: 'left',
    contentWidth: 'normal',
    bodySize: 'lg',
    lineHeight: 'relaxed',
    backgroundColor: 'white',
    paddingTop: 'xl',
    paddingBottom: 'lg',
  },

  // === SEZIONE 3: LA FORZA DEI NUMERI (Stats con Counter) ===
  {
    _type: 'statsSection',
    _key: 'chi-siamo-numeri',
    title: {
      it: 'La Forza dei Numeri',
      en: 'The Power of Numbers',
      es: 'La Fuerza de los Números',
    },
    items: [
      {
        _key: 'stat-anni',
        number: '20',
        suffix: '+',
        label: {
          it: 'Anni di esperienza nel settore (2005-2026)',
          en: 'Years of experience in the industry (2005-2026)',
          es: 'Años de experiencia en el sector (2005-2026)',
        },
        icon: '📅',
        color: 'primary',
      },
      {
        _key: 'stat-policut',
        number: '18000',
        suffix: '+',
        label: {
          it: 'Taglierine a caldo Policut vendute in tutto il mondo',
          en: 'Policut hot cutters sold worldwide',
          es: 'Cortadoras en caliente Policut vendidas en todo el mundo',
        },
        icon: '✂️',
        color: 'secondary',
      },
      {
        _key: 'stat-blender',
        number: '250',
        suffix: '+',
        label: {
          it: 'Blender GL.OS (Miscelatori brevettati) installati',
          en: 'GL.OS Blenders (patented mixers) installed',
          es: 'Mezcladoras GL.OS (mezcladoras patentadas) instaladas',
        },
        icon: '🔧',
        color: 'green',
      },
      {
        _key: 'stat-italiano',
        number: '100',
        suffix: '%',
        label: {
          it: 'Progettazione Italiana nella provincia di Reggio Emilia',
          en: 'Italian design in the province of Reggio Emilia',
          es: 'Diseño italiano en la provincia de Reggio Emilia',
        },
        icon: '🇮🇹',
        color: 'orange',
      },
    ],
    layout: 'grid',
    columns: 4,
    alignment: 'center',
    backgroundColor: 'gradient-blue',
    textColor: 'white',
    countAnimation: true,
    countDuration: 2500,
    entranceAnimation: 'stagger',
    hoverAnimation: 'scale',
    showDecorations: true,
    paddingTop: 'xl',
    paddingBottom: 'xl',
  },

  // === SEZIONE 4: IL NOSTRO METODO (Testo Libero) ===
  {
    _type: 'richTextSection',
    _key: 'chi-siamo-metodo',
    title: {
      it: 'Il Nostro Metodo: Esperienza e Brevetti',
      en: 'Our Method: Experience and Patents',
      es: 'Nuestro Método: Experiencia y Patentes',
    },
    content: {
      it: 'Sotto la guida del titolare Leonardo Ceci, GLOS ha saputo innovare mercati consolidati grazie a soluzioni uniche. Il nostro fiore all\'occhiello, il Blender GL.OS, è un miscelatore professionale brevettato nato per risolvere le criticità della miscelazione di vernici ad acqua.\n\nOgni nostro prodotto è il risultato di un design intelligente e di una qualità costruttiva pensata per durare nel tempo, garantendo risultati costanti anche nelle condizioni di lavoro più gravose.',
      en: 'Under the guidance of owner Leonardo Ceci, GLOS has been able to innovate established markets thanks to unique solutions. Our flagship product, the GL.OS Blender, is a patented professional mixer designed to solve the critical issues of mixing water-based paints.\n\nEach of our products is the result of intelligent design and construction quality designed to last over time, guaranteeing consistent results even in the most demanding working conditions.',
      es: 'Bajo la dirección de su propietario, Leonardo Ceci, GLOS ha sabido innovar en mercados consolidados gracias a soluciones únicas. Nuestro producto estrella, el mezclador GL.OS, es un mezclador profesional patentado creado para resolver los problemas críticos de la mezcla de pinturas al agua.\n\nCada uno de nuestros productos es el resultado de un diseño inteligente y una calidad de construcción pensada para durar en el tiempo, garantizando resultados constantes incluso en las condiciones de trabajo más exigentes.',
    },
    textAlign: 'left',
    contentWidth: 'normal',
    bodySize: 'lg',
    lineHeight: 'relaxed',
    backgroundColor: 'gray-light',
    paddingTop: 'xl',
    paddingBottom: 'xl',
  },
]

async function updateChiSiamo() {
  console.log('Cercando la pagina "Chi Siamo"...')

  // Cerca la pagina chi-siamo
  const page = await client.fetch(`*[_type == "page" && slug.current == "chi-siamo"][0]`)

  if (!page) {
    console.log('Pagina "Chi Siamo" non trovata. Creando nuova pagina...')

    const newPage = await client.create({
      _id: 'page-chi-siamo',
      _type: 'page',
      title: {
        it: 'Chi Siamo',
        en: 'About Us',
        es: 'Quiénes Somos',
      },
      slug: { _type: 'slug', current: 'chi-siamo' },
      description: {
        it: 'Scopri la storia, la visione e i numeri di GLOS Italy - Ingegneria Meccanica Made in Italy dal 2005',
        en: 'Discover the story, vision and numbers of GLOS Italy - Mechanical Engineering Made in Italy since 2005',
        es: 'Descubre la historia, la visión y los números de GLOS Italy - Ingeniería Mecánica Made in Italy desde 2005',
      },
      isPublished: true,
      showInNavigation: true,
      sections: newSections,
    })

    console.log('Pagina "Chi Siamo" creata con ID:', newPage._id)
  } else {
    console.log('Pagina trovata con ID:', page._id)
    console.log('Sezioni attuali:', page.sections?.length || 0)
    console.log('Aggiornamento in corso...')

    await client
      .patch(page._id)
      .set({
        title: {
          it: 'Chi Siamo',
          en: 'About Us',
          es: 'Quiénes Somos',
        },
        description: {
          it: 'Scopri la storia, la visione e i numeri di GLOS Italy - Ingegneria Meccanica Made in Italy dal 2005',
          en: 'Discover the story, vision and numbers of GLOS Italy - Mechanical Engineering Made in Italy since 2005',
          es: 'Descubre la historia, la visión y los números de GLOS Italy - Ingeniería Mecánica Made in Italy desde 2005',
        },
        sections: newSections,
      })
      .commit()

    console.log('Pagina "Chi Siamo" aggiornata con successo!')
  }

  console.log('')
  console.log('Struttura della pagina:')
  console.log('  1. Hero: "GLOS: Ingegneria Meccanica e Innovazione Made in Italy."')
  console.log('  2. Testo: La Nostra Visione (fondazione, missione)')
  console.log('  3. Stats: 4 numeri con counter animato (20+, 18.000+, 250+, 100%)')
  console.log('  4. Testo: Il Nostro Metodo (Leonardo Ceci, brevetti)')
  console.log('')
  console.log('Fatto! Verifica su https://glositalystudio.vercel.app')
}

updateChiSiamo().catch(console.error)
