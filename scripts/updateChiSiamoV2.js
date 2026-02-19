// Script per aggiornare la pagina Chi Siamo con spaziatura e sezioni migliorate
const projectId = '97oreljh';
const dataset = 'production';
const apiVersion = '2024-01-01';
const token = 'skSRLZrhXNGeVTZelxihjut0SUUTYqwDtRkH04A2xOOT93oH5odgsQOqe70xlFvp9UXsncnDhIeGy15OwBWkKcYcb534rFlu78WEogLgtNSfDHtBeuGYibk909UYDyShTfrAuThGg4guo8pI4xaeY0kxgsHDFZdlagKLVxDoc4Hq4EOcusel';

const IMG_FIERA = 'image-e5c7641a2a0081c9a05c85b40796ef756e3ca7d9-1080x720-jpg';
const IMG_BLENDER = 'image-0a90ffe3111753873b528cb1cc0aa61023d6c104-1920x1280-png';

const mutations = [{
  createOrReplace: {
    _id: 'page-chi-siamo',
    _type: 'page',
    title: { it: 'Chi Siamo', en: 'About Us', es: 'Quiénes Somos' },
    slug: { _type: 'slug', current: 'chi-siamo' },
    description: {
      it: 'Scopri la storia, la visione e i numeri di GLOS Italy - Ingegneria Meccanica Made in Italy dal 2005',
      en: 'Discover the story, vision and numbers of GLOS Italy - Made in Italy since 2005',
      es: 'Descubre la historia de GLOS Italy - Made in Italy desde 2005',
    },
    isPublished: true,
    showInNavigation: true,
    sections: [

      // ═══════════════════════════════════════════
      // 1. HERO
      // ═══════════════════════════════════════════
      {
        _type: 'heroSection',
        _key: 'chi-siamo-hero',
        eyebrow: { it: 'CHI SIAMO', en: 'ABOUT US', es: 'QUIÉNES SOMOS' },
        title: {
          it: 'Ingegneria Meccanica e Innovazione Made in Italy.',
          en: 'Mechanical Engineering and Innovation Made in Italy.',
          es: 'Ingeniería Mecánica e Innovación Made in Italy.',
        },
        subtitle: {
          it: 'Dal 2005, progettiamo efficienza, rapidità e precisione per i professionisti più esigenti.',
          en: 'Since 2005, we design efficiency, speed and precision for the most demanding professionals.',
          es: 'Desde 2005, diseñamos eficiencia, rapidez y precisión para los profesionales más exigentes.',
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
        scrollIndicatorText: { it: 'Scopri di più', en: 'Learn more', es: 'Descubre más' },
      },

      // ═══════════════════════════════════════════
      // 2. LA NOSTRA VISIONE (testo centrato, ampio respiro)
      // ═══════════════════════════════════════════
      {
        _type: 'richTextSection',
        _key: 'chi-siamo-visione',
        title: { it: 'La Nostra Visione', en: 'Our Vision', es: 'Nuestra Visión' },
        content: {
          it: "Fondata sulla solida tradizione metalmeccanica di Reggio Emilia, la Motor Valley italiana della precisione, GLOS Srl progetta e produce soluzioni meccaniche avanzate per l'edilizia, l'industria e il settore dei colorifici.\n\nDal 2005, la nostra missione è trasformare l'esperienza sul campo in macchine ad alte prestazioni. Non ci limitiamo a costruire strumenti: progettiamo efficienza, rapidità e precisione per i professionisti più esigenti.",
          en: "Founded on the solid metalworking tradition of Reggio Emilia, Italy's Motor Valley of precision, GLOS Ltd designs and manufactures advanced mechanical solutions for the construction, industrial and paint industries.\n\nSince 2005, our mission has been to transform field experience into high-performance machines. We don't just build tools: we design efficiency, speed and precision for the most demanding professionals.",
          es: "Basada en la sólida tradición metalúrgica de Reggio Emilia, el Motor Valley italiano de la precisión, GLOS Srl diseña y produce soluciones mecánicas avanzadas para la construcción, la industria y el sector de las pinturas.\n\nDesde 2005, nuestra misión es transformar la experiencia sobre el terreno en máquinas de alto rendimiento.",
        },
        textAlign: 'center',
        contentWidth: 'normal',
        backgroundColor: 'white',
        paddingTop: '2xl',
        paddingBottom: 'xl',
        dividers: 'none',
      },

      // ═══════════════════════════════════════════
      // 3. PRODOTTI NEL MONDO (immagine + testo)
      // ═══════════════════════════════════════════
      {
        _type: 'textImageSection',
        _key: 'chi-siamo-azione',
        title: {
          it: 'I Nostri Prodotti nel Mondo',
          en: 'Our Products Worldwide',
          es: 'Nuestros Productos en el Mundo',
        },
        content: {
          it: "Dalla fiera di Milano ai centri del colore di tutta Europa, le soluzioni GLOS sono presenti ovunque ci sia bisogno di precisione e affidabilità.\n\nIl nostro Blender GL.OS brevettato ha rivoluzionato la miscelazione delle vernici ad acqua, mentre la linea Policut è diventata sinonimo di taglio professionale del polistirene con oltre 18.000 unità vendute nel mondo.",
          en: "From the Milan trade fair to paint centers across Europe, GLOS solutions are present wherever precision and reliability are needed.\n\nOur patented GL.OS Blender has revolutionized water-based paint mixing, while the Policut line has become synonymous with professional polystyrene cutting with over 18,000 units sold worldwide.",
          es: "Desde la feria de Milán hasta los centros de pintura de toda Europa, las soluciones GLOS están presentes donde se necesita precisión y fiabilidad.",
        },
        image: { _type: 'image', asset: { _type: 'reference', _ref: IMG_FIERA } },
        imagePosition: 'right',
        imageSize: 'large',
        imageShape: 'rounded',
        imageShadow: 'lg',
        verticalAlign: 'center',
        backgroundColor: 'gray-light',
        paddingTop: 'xl',
        paddingBottom: 'xl',
        animation: 'slide-up',
      },

      // ═══════════════════════════════════════════
      // 4. LA FORZA DEI NUMERI (stats con counter)
      // ═══════════════════════════════════════════
      {
        _type: 'statsSection',
        _key: 'chi-siamo-numeri',
        title: { it: 'La Forza dei Numeri', en: 'The Power of Numbers', es: 'La Fuerza de los Números' },
        items: [
          { _key: 'stat-anni', number: '20', suffix: '+', label: { it: 'Anni di esperienza nel settore', en: 'Years of industry experience', es: 'Años de experiencia' }, color: 'primary' },
          { _key: 'stat-policut', number: '18000', suffix: '+', label: { it: 'Taglierine Policut vendute nel mondo', en: 'Policut cutters sold worldwide', es: 'Cortadoras Policut vendidas' }, color: 'secondary' },
          { _key: 'stat-blender', number: '250', suffix: '+', label: { it: 'Blender GL.OS installati', en: 'GL.OS Blenders installed', es: 'Mezcladoras GL.OS instaladas' }, color: 'green' },
          { _key: 'stat-italiano', number: '100', suffix: '%', label: { it: 'Progettazione Made in Italy', en: 'Made in Italy Design', es: 'Diseño Made in Italy' }, color: 'orange' },
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
        paddingTop: '2xl',
        paddingBottom: '2xl',
      },

      // ═══════════════════════════════════════════
      // 5. IL NOSTRO METODO (testo centrato)
      // ═══════════════════════════════════════════
      {
        _type: 'richTextSection',
        _key: 'chi-siamo-metodo',
        title: {
          it: 'Il Nostro Metodo: Esperienza e Brevetti',
          en: 'Our Method: Experience and Patents',
          es: 'Nuestro Método: Experiencia y Patentes',
        },
        content: {
          it: "Sotto la guida del titolare Leonardo Ceci, GLOS ha saputo innovare mercati consolidati grazie a soluzioni uniche. Il nostro fiore all'occhiello, il Blender GL.OS, è un miscelatore professionale brevettato nato per risolvere le criticità della miscelazione di vernici ad acqua.\n\nOgni nostro prodotto è il risultato di un design intelligente e di una qualità costruttiva pensata per durare nel tempo, garantendo risultati costanti anche nelle condizioni di lavoro più gravose.",
          en: "Under the guidance of owner Leonardo Ceci, GLOS has been able to innovate established markets thanks to unique solutions. Our flagship product, the GL.OS Blender, is a patented professional mixer designed to solve the critical issues of mixing water-based paints.\n\nEach of our products is the result of intelligent design and construction quality designed to last over time, guaranteeing consistent results even in the most demanding working conditions.",
          es: "Bajo la dirección de su propietario, Leonardo Ceci, GLOS ha sabido innovar en mercados consolidados gracias a soluciones únicas.",
        },
        textAlign: 'center',
        contentWidth: 'normal',
        backgroundColor: 'white',
        paddingTop: '2xl',
        paddingBottom: 'xl',
        dividers: 'none',
      },

      // ═══════════════════════════════════════════
      // 6. BLENDER GL.OS (immagine + testo)
      // ═══════════════════════════════════════════
      {
        _type: 'textImageSection',
        _key: 'chi-siamo-blender',
        title: {
          it: 'Blender GL.OS: Il Cuore della Nostra Innovazione',
          en: 'GL.OS Blender: The Heart of Our Innovation',
          es: 'Blender GL.OS: El Corazón de Nuestra Innovación',
        },
        content: {
          it: "Il Blender GL.OS è molto più di un miscelatore: è la sintesi di 20 anni di esperienza nella meccanica di precisione. Brevettato e costruito interamente in acciaio inox nella nostra sede di Reggio Emilia, rappresenta lo standard di riferimento per i colorifici professionali di tutta Europa.\n\nCon il suo sistema di miscelazione unico, garantisce risultati perfettamente omogenei su ogni tipo di vernice ad acqua, riducendo i tempi di lavorazione e eliminando gli sprechi.",
          en: "The GL.OS Blender is much more than a mixer: it is the synthesis of 20 years of experience in precision mechanics. Patented and built entirely in stainless steel at our headquarters in Reggio Emilia, it represents the benchmark for professional paint centers throughout Europe.",
          es: "El Blender GL.OS es mucho más que un mezclador: es la síntesis de 20 años de experiencia en mecánica de precisión.",
        },
        image: { _type: 'image', asset: { _type: 'reference', _ref: IMG_BLENDER } },
        imagePosition: 'left',
        imageSize: 'large',
        imageShape: 'rounded',
        imageShadow: 'lg',
        verticalAlign: 'center',
        backgroundColor: 'gray-light',
        paddingTop: 'xl',
        paddingBottom: 'xl',
        animation: 'slide-up',
      },

      // ═══════════════════════════════════════════
      // 7. CTA FINALE
      // ═══════════════════════════════════════════
      {
        _type: 'ctaSection',
        _key: 'chi-siamo-cta',
        title: {
          it: 'Scopri i Nostri Prodotti',
          en: 'Discover Our Products',
          es: 'Descubre Nuestros Productos',
        },
        description: {
          it: 'Esplora la gamma completa di miscelatori, taglierine a caldo e accessori professionali GLOS. Qualità Made in Italy dal 2005.',
          en: 'Explore the full range of GLOS professional mixers, hot cutters and accessories. Made in Italy quality since 2005.',
          es: 'Explora la gama completa de mezcladores, cortadoras y accesorios profesionales GLOS.',
        },
        buttonText: { it: 'Vedi Tutti i Prodotti', en: 'View All Products', es: 'Ver Todos los Productos' },
        buttonLink: '/prodotti',
        buttonVariant: 'primary',
        secondaryButtonText: { it: 'Contattaci', en: 'Contact Us', es: 'Contáctanos' },
        secondaryButtonLink: '/contatti',
        backgroundColor: 'dark',
        textColor: 'white',
        alignment: 'center',
        paddingTop: '2xl',
        paddingBottom: '2xl',
        animation: 'scale',
      },
    ],
  },
}];

async function run() {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations }),
  });
  const result = await res.json();
  if (res.ok) {
    console.log('Chi Siamo aggiornata: 7 sezioni (era 4)');
    console.log('  1. Hero con subtitle');
    console.log('  2. La Nostra Visione (padding 2xl, centrato)');
    console.log('  3. NUOVO: Prodotti nel Mondo (immagine fiera Milano)');
    console.log('  4. Stats con padding 2xl');
    console.log('  5. Il Nostro Metodo (padding 2xl, centrato)');
    console.log('  6. NUOVO: Blender GL.OS (immagine prodotto)');
    console.log('  7. NUOVO: CTA Scopri i Prodotti');
  } else {
    console.error('Errore:', JSON.stringify(result, null, 2));
  }
}
run();
