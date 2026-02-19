// Script per aggiornare prodotti, categorie e navigazione
// Esegui con: node scripts/updateProductsAndNav.js

const projectId = '97oreljh';
const dataset = 'production';
const apiVersion = '2024-01-01';
const token = 'skSRLZrhXNGeVTZelxihjut0SUUTYqwDtRkH04A2xOOT93oH5odgsQOqe70xlFvp9UXsncnDhIeGy15OwBWkKcYcb534rFlu78WEogLgtNSfDHtBeuGYibk909UYDyShTfrAuThGg4guo8pI4xaeY0kxgsHDFZdlagKLVxDoc4Hq4EOcusel';

// ============================================================
// HELPER: crea riferimento immagine Sanity
// ============================================================
function imgRef(id) {
  return { _type: 'image', asset: { _type: 'reference', _ref: id } };
}
function galleryImg(id, key, alt) {
  return { _type: 'image', _key: key, asset: { _type: 'reference', _ref: id }, alt };
}
function docRef(title, fileId, fileType) {
  return {
    _key: fileType + '-' + title.toLowerCase().replace(/\s+/g, '-').slice(0, 20),
    title,
    fileType,
    file: { _type: 'file', asset: { _type: 'reference', _ref: fileId } },
  };
}

// ============================================================
// IMAGE ASSET IDs (from Sanity CDN)
// ============================================================
const IMG = {
  // Blender GLOS
  blenderSolo: 'image-0a90ffe3111753873b528cb1cc0aa61023d6c104-1920x1280-png',
  blenderSoloJpg: 'image-fac63e1ff55a986ba37c8e798eae6e691b979d32-1920x1280-jpg',
  blenderCombo: 'image-bdaa451df9056969ee5d082f871af6389733706e-1920x1280-png',
  blenderWork: 'image-11520b276244ad53dbe62cf253b95306d787c8ae-703x488-jpg',
  blenderConsole: 'image-2179414c16866b2cfc98fa602d86f5fd8a899221-756x436-jpg',
  blenderCentro: 'image-4df780748972e36a2fe382aafcca021db6a0634f-1080x720-jpg',
  blenderGeneral: 'image-4558e0501cd1ed094d955da74738f19e5113d997-848x600-jpg',
  blenderChain: 'image-36db767479aacbd9616ad74b982cb462f4c4e15d-665x490-jpg',
  blenderMixer: 'image-9bab2a2ef8813462386ebfd8966e2f7a913f807e-860x1020-jpg',
  mixSystem: 'image-95f1e21fbaa32ed6f105fa5b391bf968e9693b4e-712x540-jpg',
  blenderComboJpg: 'image-118ba36c6eabf8b0f627d16dcaeadbd2e6317a56-1080x720-jpg',

  // Policut Twin
  policutTwin: 'image-194773b4ae87508073a9818fc4bc7524fffebd5a-1920x1280-png',
  policutTwinJpg: 'image-2ff64fd23e4baed03c3a21050548af8e78480470-1920x1280-jpg',
  policutTwinBasic1200: 'image-49d84c900f4ebed666f416fe6878061b47eb6f0b-920x790-jpg',
  policutTwinBasic1000: 'image-bee808167113f2cf8cd5b1a088f6c95aed156b67-860x1020-jpg',

  // Policut Easy
  policutEasy1000: 'image-5cece2be587cc0db3a2b4ce1b2291f0f5b2938f0-1920x1280-png',
  policutEasy1000Jpg: 'image-b965833d567ee14a6f04336f087ca5c170874e7c-1920x1280-jpg',
  policutEasyBasic1200: 'image-4d1834a73709494d1ca33d89795db67459480262-1920x1280-png',
  policutEasyBasic1200Jpg: 'image-6d00f5e35c6b3788c15ee639089f5a0d79867c87-1920x1280-jpg',
  policutEasyLight1200: 'image-92a261936da119895d3bc31918d3ecf8b675ce1c-1920x1280-png',
  policutEasyLight1200Jpg: 'image-c00c6ac49ab56167d4d8640d00e2c5fe009bd1a2-1920x1280-jpg',
  policutGeneral: 'image-e806c74e38f44fd2252597362f602887622d87eb-860x1020-jpg',

  // Accessori
  washStation: 'image-7201df21cc6d6d81f81689414c2a179e75f5afc2-1920x1280-png',
  washStationJpg: 'image-30f3ae24ff863cf2d97004c5d971ee2721a7c9a0-1920x1280-jpg',
  termolight: 'image-01a679aa063d9a807842f7243fd6818259e352ed-1920x1280-png',
  termolightJpg: 'image-d8b06aa2772e51e1c5ca1afaf1978524cf6526bc-1920x1280-jpg',
};

// FILE ASSET IDs
const FILES = {
  schedaTecnicaIT: 'file-ce5cdd4f27e6265fb8f62bbe7a5bd9871b8f19f9-pdf',
  brochureIT: 'file-528b69abda524e5eff56a8bb35cd8d14d87e48e9-pdf',
  opuscoloIT: 'file-5a652826e597b2c407ac9dfd8ffbd13a8de1c61b-pdf',
  techDatasheetEN: 'file-915e8606c006d96b3032f25b71384939098e190d-pdf',
  fichaTecnicaES: 'file-81fb86aeb5f14a6d2f04f34e258f5a7486c5769f-pdf',
  catalogoIT: 'file-f1d1af1b72bdca71368e44112db0a4e615d51af3-pdf',
  catalogEN: 'file-d051a40b10387579f094aac311db39d04c9264e9-pdf',
  catalogoES: 'file-15f4fa27b78fc54fd903deff26ba80e37fb2cebe-pdf',
};

// ============================================================
// MUTATIONS
// ============================================================
const mutations = [

  // ========== CATEGORIE ==========
  {
    createOrReplace: {
      _id: 'category-sistemi',
      _type: 'productCategory',
      name: 'Miscelatori',
      slug: { _type: 'slug', current: 'miscelatori' },
      description: 'Miscelatori professionali brevettati per vernici ad acqua e solvente. Progettati per colorifici, ferramenta e centri del colore.',
      image: imgRef(IMG.blenderMixer),
      isActive: true,
    },
  },
  {
    createOrReplace: {
      _id: 'category-componenti',
      _type: 'productCategory',
      name: 'Taglierine a Caldo',
      slug: { _type: 'slug', current: 'taglierine-a-caldo' },
      description: 'Taglierine a filo caldo professionali per polistirene, polistirolo e materiali isolanti. Linea Policut con oltre 18.000 unità vendute.',
      image: imgRef(IMG.policutGeneral),
      isActive: true,
    },
  },
  {
    createOrReplace: {
      _id: 'category-accessori',
      _type: 'productCategory',
      name: 'Accessori e Stazioni',
      slug: { _type: 'slug', current: 'accessori-e-stazioni' },
      description: 'Stazioni di lavaggio, termolight e accessori complementari per il settore delle vernici e dell\'edilizia.',
      image: imgRef(IMG.washStation),
      isActive: true,
    },
  },

  // ========== PRODOTTO 1: BLENDER GL.OS ==========
  {
    createOrReplace: {
      _id: 'product-1',
      _type: 'product',
      name: 'Blender GL.OS',
      slug: { _type: 'slug', current: 'blender-glos' },
      category: { _ref: 'category-sistemi', _type: 'reference' },
      shortDescription: 'Miscelatore professionale brevettato per vernici ad acqua. Il sistema di miscelazione più avanzato sul mercato, progettato per colorifici e centri del colore.',
      fullDescription: 'Il Blender GL.OS è il prodotto di punta di GLOS, un miscelatore professionale brevettato nato per risolvere le criticità della miscelazione di vernici ad acqua. Grazie al suo design intelligente e alla qualità costruttiva Made in Italy, garantisce risultati costanti anche nelle condizioni di lavoro più gravose.\n\nCon oltre 250 unità installate in tutto il mondo, il Blender GL.OS è diventato il punto di riferimento per i professionisti del colore che cercano efficienza, rapidità e precisione.\n\nCaratteristiche principali:\n- Sistema di miscelazione brevettato\n- Costruzione interamente in acciaio inox\n- Pannello di controllo digitale intuitivo\n- Manutenzione ridotta al minimo\n- Compatibile con vernici ad acqua e solvente\n- Design modulare per configurazioni personalizzate',
      mainImage: imgRef(IMG.blenderSolo),
      gallery: [
        galleryImg(IMG.blenderCombo, 'gal-combo', 'Blender GL.OS - configurazione completa'),
        galleryImg(IMG.blenderGeneral, 'gal-general', 'Blender GL.OS - vista frontale'),
        galleryImg(IMG.blenderWork, 'gal-work', 'Blender GL.OS - lavorazione in corso'),
        galleryImg(IMG.blenderConsole, 'gal-console', 'Blender GL.OS - pannello di controllo'),
        galleryImg(IMG.blenderCentro, 'gal-centro', 'Blender GL.OS installato in un centro del colore'),
        galleryImg(IMG.blenderChain, 'gal-chain', 'Blender GL.OS - dettaglio catena di trasmissione'),
        galleryImg(IMG.mixSystem, 'gal-system', 'Sistema completo Mix GLOS'),
      ],
      specifications: [
        { _key: 'spec-mat', label: 'Materiale', value: 'Acciaio Inox AISI 304' },
        { _key: 'spec-ali', label: 'Alimentazione', value: '220V / 380V trifase' },
        { _key: 'spec-cap', label: 'Capacità', value: 'Fino a 40 litri per ciclo' },
        { _key: 'spec-vel', label: 'Velocità miscelazione', value: 'Variabile 0-1500 rpm' },
        { _key: 'spec-pes', label: 'Peso', value: '85 kg' },
        { _key: 'spec-dim', label: 'Dimensioni (LxPxH)', value: '600 x 500 x 1200 mm' },
        { _key: 'spec-gar', label: 'Garanzia', value: '24 mesi' },
        { _key: 'spec-bre', label: 'Brevetto', value: 'Brevetto Europeo depositato' },
      ],
      features: [
        { _key: 'feat-1', icon: 'shield', title: 'Brevettato', description: 'Sistema di miscelazione con brevetto europeo depositato' },
        { _key: 'feat-2', icon: 'gear', title: 'Acciaio Inox', description: 'Costruzione interamente in acciaio AISI 304 per massima durata' },
        { _key: 'feat-3', icon: 'lightning', title: 'Alta velocità', description: 'Miscelazione rapida con velocità variabile fino a 1500 rpm' },
        { _key: 'feat-4', icon: 'target', title: 'Precisione', description: 'Risultati costanti e ripetibili su ogni ciclo di lavoro' },
      ],
      documents: [
        docRef('Scheda Tecnica (IT)', FILES.schedaTecnicaIT, 'pdf'),
        docRef('Technical Datasheet (EN)', FILES.techDatasheetEN, 'pdf'),
        docRef('Ficha Técnica (ES)', FILES.fichaTecnicaES, 'pdf'),
        docRef('Brochure (IT)', FILES.brochureIT, 'pdf'),
        docRef('Opuscolo (IT)', FILES.opuscoloIT, 'pdf'),
      ],
      sortOrder: 1,
      isActive: true,
      isFeatured: true,
      isNew: false,
      badges: ['bestseller', 'made-italy', 'consigliato'],
    },
  },

  // ========== PRODOTTO 2: POLICUT TWIN 20/30 ==========
  {
    createOrReplace: {
      _id: 'product-2',
      _type: 'product',
      name: 'Policut Twin 20/30',
      slug: { _type: 'slug', current: 'policut-twin-20-30' },
      category: { _ref: 'category-componenti', _type: 'reference' },
      shortDescription: 'Taglierina professionale a doppio filo caldo per polistirene e materiali isolanti. Modello di punta della gamma Policut con testine da 20 e 30 mm.',
      fullDescription: 'La Policut Twin 20/30 è la taglierina a filo caldo di punta della gamma GLOS, progettata per il taglio professionale di polistirene, polistirolo espanso e materiali isolanti.\n\nDotata di doppia testina intercambiabile (20 mm e 30 mm), offre la massima versatilità per affrontare qualsiasi esigenza di taglio in cantiere. La struttura robusta e il design ergonomico la rendono lo strumento ideale per i professionisti dell\'edilizia e dell\'isolamento termico.\n\nCon oltre 18.000 unità della linea Policut vendute in tutto il mondo, è il punto di riferimento del settore.',
      mainImage: imgRef(IMG.policutTwin),
      gallery: [
        galleryImg(IMG.policutTwinJpg, 'gal-twin-jpg', 'Policut Twin 20/30 - vista laterale'),
        galleryImg(IMG.policutTwinBasic1200, 'gal-twin-1200', 'Policut Twin Basic 1200 - versione base'),
        galleryImg(IMG.policutTwinBasic1000, 'gal-twin-1000', 'Policut Twin Basic 1000 - versione compatta'),
        galleryImg(IMG.policutGeneral, 'gal-policut', 'Gamma taglierine Policut GLOS'),
      ],
      specifications: [
        { _key: 'spec-tipo', label: 'Tipo', value: 'Taglierina a doppio filo caldo' },
        { _key: 'spec-testa', label: 'Testine', value: '20 mm e 30 mm intercambiabili' },
        { _key: 'spec-temp', label: 'Temperatura max', value: '500°C' },
        { _key: 'spec-ali', label: 'Alimentazione', value: '220V' },
        { _key: 'spec-lung', label: 'Lunghezza taglio', value: 'Fino a 1200 mm' },
        { _key: 'spec-pes', label: 'Peso', value: '3.2 kg' },
        { _key: 'spec-gar', label: 'Garanzia', value: '24 mesi' },
      ],
      features: [
        { _key: 'feat-1', icon: 'lightning', title: 'Doppia testina', description: 'Due testine intercambiabili da 20 e 30 mm per massima versatilità' },
        { _key: 'feat-2', icon: 'target', title: 'Taglio preciso', description: 'Filo caldo per tagli netti e puliti senza residui' },
        { _key: 'feat-3', icon: 'gear', title: 'Robusta', description: 'Struttura rinforzata per uso intensivo in cantiere' },
        { _key: 'feat-4', icon: 'trophy', title: 'N.1 al mondo', description: 'Oltre 18.000 unità Policut vendute globalmente' },
      ],
      documents: [
        docRef('Catalogo GLOS (IT)', FILES.catalogoIT, 'pdf'),
        docRef('GLOS Catalog (EN)', FILES.catalogEN, 'pdf'),
        docRef('Catálogo GLOS (ES)', FILES.catalogoES, 'pdf'),
      ],
      sortOrder: 2,
      isActive: true,
      isFeatured: true,
      isNew: false,
      badges: ['bestseller', 'made-italy'],
    },
  },

  // ========== PRODOTTO 3: POLICUT EASY 1000 ==========
  {
    createOrReplace: {
      _id: 'product-3',
      _type: 'product',
      name: 'Policut Easy 1000',
      slug: { _type: 'slug', current: 'policut-easy-1000' },
      category: { _ref: 'category-componenti', _type: 'reference' },
      shortDescription: 'Taglierina a filo caldo compatta con taglio da 1000 mm. Versatile e maneggevole, ideale per cantiere e laboratorio.',
      fullDescription: 'La Policut Easy 1000 è la taglierina a filo caldo versatile della gamma GLOS, con lunghezza di taglio da 1000 mm e compatibilità con testine da 20 e 30 mm.\n\nCompatta e maneggevole, è progettata per offrire prestazioni professionali in uno strumento facile da trasportare e utilizzare. Perfetta per lavori di isolamento termico, decorazione e modellismo su larga scala.',
      mainImage: imgRef(IMG.policutEasy1000),
      gallery: [
        galleryImg(IMG.policutEasy1000Jpg, 'gal-easy1000', 'Policut Easy 1000 - vista completa'),
        galleryImg(IMG.policutGeneral, 'gal-policut', 'Gamma taglierine Policut GLOS'),
      ],
      specifications: [
        { _key: 'spec-tipo', label: 'Tipo', value: 'Taglierina a filo caldo singola' },
        { _key: 'spec-testa', label: 'Testine compatibili', value: '20 mm e 30 mm' },
        { _key: 'spec-lung', label: 'Lunghezza taglio', value: '1000 mm' },
        { _key: 'spec-temp', label: 'Temperatura max', value: '500°C' },
        { _key: 'spec-ali', label: 'Alimentazione', value: '220V' },
        { _key: 'spec-pes', label: 'Peso', value: '2.5 kg' },
        { _key: 'spec-gar', label: 'Garanzia', value: '24 mesi' },
      ],
      features: [
        { _key: 'feat-1', icon: 'rocket', title: 'Compatta', description: 'Design compatto per facile trasporto e utilizzo' },
        { _key: 'feat-2', icon: 'target', title: 'Taglio 1 metro', description: 'Lunghezza di taglio da 1000 mm per la maggior parte delle applicazioni' },
        { _key: 'feat-3', icon: 'gear', title: 'Compatibile', description: 'Testine da 20 e 30 mm intercambiabili' },
      ],
      documents: [
        docRef('Catalogo GLOS (IT)', FILES.catalogoIT, 'pdf'),
        docRef('GLOS Catalog (EN)', FILES.catalogEN, 'pdf'),
      ],
      sortOrder: 3,
      isActive: true,
      isFeatured: false,
      isNew: false,
      badges: ['made-italy'],
    },
  },

  // ========== PRODOTTO 4: POLICUT EASY BASIC 1200 (NUOVO) ==========
  {
    createOrReplace: {
      _id: 'product-policut-easy-basic-1200',
      _type: 'product',
      name: 'Policut Easy Basic 1200',
      slug: { _type: 'slug', current: 'policut-easy-basic-1200' },
      category: { _ref: 'category-componenti', _type: 'reference' },
      shortDescription: 'Taglierina a filo caldo economica con taglio da 1200 mm. Il miglior rapporto qualità-prezzo della gamma Policut.',
      fullDescription: 'La Policut Easy Basic 1200 è la soluzione ideale per chi cerca una taglierina a filo caldo affidabile con un ottimo rapporto qualità-prezzo.\n\nCon una lunghezza di taglio da 1200 mm e testina da 30 mm, offre prestazioni professionali a un prezzo accessibile. Perfetta per artigiani, piccole imprese edili e laboratori di isolamento termico.',
      mainImage: imgRef(IMG.policutEasyBasic1200),
      gallery: [
        galleryImg(IMG.policutEasyBasic1200Jpg, 'gal-basic1200', 'Policut Easy Basic 1200 - vista laterale'),
        galleryImg(IMG.policutGeneral, 'gal-policut', 'Gamma taglierine Policut GLOS'),
      ],
      specifications: [
        { _key: 'spec-tipo', label: 'Tipo', value: 'Taglierina a filo caldo singola' },
        { _key: 'spec-testa', label: 'Testina', value: '30 mm' },
        { _key: 'spec-lung', label: 'Lunghezza taglio', value: '1200 mm' },
        { _key: 'spec-temp', label: 'Temperatura max', value: '500°C' },
        { _key: 'spec-ali', label: 'Alimentazione', value: '220V' },
        { _key: 'spec-gar', label: 'Garanzia', value: '24 mesi' },
      ],
      features: [
        { _key: 'feat-1', icon: 'star', title: 'Miglior prezzo', description: 'Il miglior rapporto qualità-prezzo della gamma' },
        { _key: 'feat-2', icon: 'target', title: 'Taglio 1.2 metri', description: 'Lunghezza di taglio extra da 1200 mm' },
      ],
      documents: [
        docRef('Catalogo GLOS (IT)', FILES.catalogoIT, 'pdf'),
      ],
      sortOrder: 4,
      isActive: true,
      isFeatured: false,
      isNew: false,
      badges: ['made-italy'],
    },
  },

  // ========== PRODOTTO 5: POLICUT EASY LIGHT 1200 (NUOVO) ==========
  {
    createOrReplace: {
      _id: 'product-policut-easy-light-1200',
      _type: 'product',
      name: 'Policut Easy Light 1200',
      slug: { _type: 'slug', current: 'policut-easy-light-1200' },
      category: { _ref: 'category-componenti', _type: 'reference' },
      shortDescription: 'Taglierina a filo caldo ultraleggera con taglio da 1200 mm. La più maneggevole della gamma per lavori prolungati.',
      fullDescription: 'La Policut Easy Light 1200 è la versione ultraleggera della gamma Policut, progettata per i professionisti che lavorano per lunghe ore e necessitano di uno strumento maneggevole senza rinunciare alle prestazioni.\n\nCon 1200 mm di lunghezza di taglio e un peso ridotto al minimo, è perfetta per lavori in quota, su ponteggi e in condizioni dove ogni grammo conta.',
      mainImage: imgRef(IMG.policutEasyLight1200),
      gallery: [
        galleryImg(IMG.policutEasyLight1200Jpg, 'gal-light1200', 'Policut Easy Light 1200 - vista completa'),
        galleryImg(IMG.policutGeneral, 'gal-policut', 'Gamma taglierine Policut GLOS'),
      ],
      specifications: [
        { _key: 'spec-tipo', label: 'Tipo', value: 'Taglierina a filo caldo ultraleggera' },
        { _key: 'spec-testa', label: 'Testina', value: '20 mm' },
        { _key: 'spec-lung', label: 'Lunghezza taglio', value: '1200 mm' },
        { _key: 'spec-temp', label: 'Temperatura max', value: '450°C' },
        { _key: 'spec-ali', label: 'Alimentazione', value: '220V' },
        { _key: 'spec-pes', label: 'Peso', value: '1.8 kg' },
        { _key: 'spec-gar', label: 'Garanzia', value: '24 mesi' },
      ],
      features: [
        { _key: 'feat-1', icon: 'rocket', title: 'Ultraleggera', description: 'Solo 1.8 kg per massima maneggevolezza' },
        { _key: 'feat-2', icon: 'target', title: 'Taglio 1.2 metri', description: '1200 mm di taglio in un corpo ultracompatto' },
        { _key: 'feat-3', icon: 'lightning', title: 'Riscaldamento rapido', description: 'Pronta all\'uso in pochi secondi' },
      ],
      documents: [
        docRef('Catalogo GLOS (IT)', FILES.catalogoIT, 'pdf'),
      ],
      sortOrder: 5,
      isActive: true,
      isFeatured: false,
      isNew: true,
      badges: ['made-italy'],
    },
  },

  // ========== PRODOTTO 6: WASH STATION (NUOVO) ==========
  {
    createOrReplace: {
      _id: 'product-wash-station',
      _type: 'product',
      name: 'Wash Station',
      slug: { _type: 'slug', current: 'wash-station' },
      category: { _ref: 'category-accessori', _type: 'reference' },
      shortDescription: 'Stazione di lavaggio professionale per attrezzature da verniciatura. Pulizia rapida e completa di rulli, pennelli e strumenti.',
      fullDescription: 'La Wash Station GLOS è una stazione di lavaggio professionale progettata per la pulizia rapida e completa di tutti gli strumenti da verniciatura: rulli, pennelli, pistole e accessori.\n\nGrazie al sistema di ricircolo dell\'acqua e ai filtri integrati, riduce lo spreco d\'acqua e garantisce una pulizia efficace nel rispetto dell\'ambiente. Indispensabile per colorifici, ferramenta e professionisti della verniciatura.',
      mainImage: imgRef(IMG.washStation),
      gallery: [
        galleryImg(IMG.washStationJpg, 'gal-wash', 'Wash Station - vista completa'),
      ],
      specifications: [
        { _key: 'spec-tipo', label: 'Tipo', value: 'Stazione di lavaggio professionale' },
        { _key: 'spec-mat', label: 'Materiale', value: 'Acciaio Inox / Polipropilene' },
        { _key: 'spec-ali', label: 'Alimentazione', value: '220V' },
        { _key: 'spec-gar', label: 'Garanzia', value: '12 mesi' },
      ],
      features: [
        { _key: 'feat-1', icon: 'bulb', title: 'Ecologica', description: 'Sistema di ricircolo acqua con filtri integrati' },
        { _key: 'feat-2', icon: 'lightning', title: 'Rapida', description: 'Pulizia completa degli strumenti in pochi minuti' },
      ],
      sortOrder: 6,
      isActive: true,
      isFeatured: false,
      isNew: false,
      badges: ['made-italy', 'eco'],
    },
  },

  // ========== PRODOTTO 7: TERMOLIGHT (NUOVO) ==========
  {
    createOrReplace: {
      _id: 'product-termolight',
      _type: 'product',
      name: 'Termolight',
      slug: { _type: 'slug', current: 'termolight' },
      category: { _ref: 'category-accessori', _type: 'reference' },
      shortDescription: 'Termosoffiatore professionale per edilizia e industria. Potenza e precisione per rimozione vernici, saldatura e termoretrazione.',
      fullDescription: 'Il Termolight GLOS è un termosoffiatore professionale ad alte prestazioni, progettato per le esigenze più gravose dell\'edilizia e dell\'industria.\n\nIdeale per la rimozione di vernici vecchie, la termoretrazione di guaine e film, la saldatura di teli impermeabilizzanti e molte altre applicazioni che richiedono calore controllato e potenza costante.',
      mainImage: imgRef(IMG.termolight),
      gallery: [
        galleryImg(IMG.termolightJpg, 'gal-termolight', 'Termolight - vista completa'),
      ],
      specifications: [
        { _key: 'spec-tipo', label: 'Tipo', value: 'Termosoffiatore professionale' },
        { _key: 'spec-temp', label: 'Temperatura max', value: '650°C' },
        { _key: 'spec-pot', label: 'Potenza', value: '2000W' },
        { _key: 'spec-ali', label: 'Alimentazione', value: '220V' },
        { _key: 'spec-gar', label: 'Garanzia', value: '24 mesi' },
      ],
      features: [
        { _key: 'feat-1', icon: 'lightning', title: 'Potente', description: '2000W di potenza per risultati professionali' },
        { _key: 'feat-2', icon: 'target', title: 'Temperatura regolabile', description: 'Controllo preciso della temperatura fino a 650°C' },
        { _key: 'feat-3', icon: 'shield', title: 'Sicurezza', description: 'Protezione termica integrata e impugnatura ergonomica' },
      ],
      sortOrder: 7,
      isActive: true,
      isFeatured: false,
      isNew: true,
      badges: ['made-italy'],
    },
  },

  // ========== NAVIGAZIONE: AGGIUNGI RIVENDITORI ==========
  {
    patch: {
      id: 'mainNavigation',
      set: {
        items: [
          { _key: 'dc05bed49510', label: 'Home', href: '/', isActive: true },
          { _key: 'ceebf4ff7588', label: 'Prodotti', href: '/prodotti', isActive: true },
          { _key: '5a384b223ee4', label: 'Chi siamo', href: '/chi-siamo', isActive: true },
          { _key: 'nav-rivenditori', label: 'Rivenditori', href: '/rivenditori', isActive: true },
          { _key: '7cd351cd94b32', label: 'Contatti', href: '/contatti', isActive: true },
        ],
      },
    },
  },
];

// ============================================================
// ESECUZIONE
// ============================================================
async function runMutations() {
  console.log('Aggiornamento prodotti, categorie e navigazione...\n');

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log('Aggiornamento completato con successo!\n');
    console.log('CATEGORIE aggiornate:');
    console.log('  1. Miscelatori (Blender)');
    console.log('  2. Taglierine a Caldo (Policut)');
    console.log('  3. Accessori e Stazioni\n');
    console.log('PRODOTTI creati/aggiornati:');
    console.log('  1. Blender GL.OS (flagship, featured, 7 foto galleria, 5 documenti PDF)');
    console.log('  2. Policut Twin 20/30 (featured, 4 foto galleria)');
    console.log('  3. Policut Easy 1000 (2 foto galleria)');
    console.log('  4. Policut Easy Basic 1200 (NUOVO)');
    console.log('  5. Policut Easy Light 1200 (NUOVO)');
    console.log('  6. Wash Station (NUOVO)');
    console.log('  7. Termolight (NUOVO)\n');
    console.log('NAVIGAZIONE aggiornata:');
    console.log('  + Aggiunto "Rivenditori" (/rivenditori) nel menu\n');
    console.log('Verifica su:');
    console.log('  Studio:   https://glositalystudio.vercel.app');
    console.log('  Prodotti: https://glositaly.vercel.app/prodotti');
    console.log('  Menu:     https://glositaly.vercel.app (navbar)');
  } else {
    console.error('Errore:', JSON.stringify(result, null, 2));
  }
}

runMutations();
