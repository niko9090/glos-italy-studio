/**
 * Script per popolare Sanity con tutti i prodotti del listino GLOS
 *
 * Esegui con: npx sanity exec scripts/seedProducts.js --with-user-token
 */

import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

// ===========================================
// CATEGORIE
// ===========================================

const categories = [
  {
    _type: 'productCategory',
    name: { it: 'Policut Twin', en: 'Policut Twin' },
    slug: { current: 'policut-twin' },
    description: { it: 'Serie Gamma - Taglierine autoportanti professionali', en: 'Gamma Series - Professional self-supporting cutters' },
    sortOrder: 1,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Policut Easy', en: 'Policut Easy' },
    slug: { current: 'policut-easy' },
    description: { it: 'Serie Gamma - Taglierine da ponteggio professionali', en: 'Gamma Series - Professional scaffolding cutters' },
    sortOrder: 2,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Policut Basic', en: 'Policut Basic' },
    slug: { current: 'policut-basic' },
    description: { it: 'Serie Basic - Taglierine autoportanti con trasformatore a bordo', en: 'Basic Series - Self-supporting cutters with onboard transformer' },
    sortOrder: 3,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Taglierine Manuali', en: 'Manual Cutters' },
    slug: { current: 'taglierine-manuali' },
    description: { it: 'Minicut e Hot Knife - Per tagli di precisione e lavori speciali', en: 'Minicut and Hot Knife - For precision cuts and special jobs' },
    sortOrder: 4,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Fiber Cut', en: 'Fiber Cut' },
    slug: { current: 'fiber-cut' },
    description: { it: 'Taglierina professionale per fibre minerali e lane di vetro', en: 'Professional cutter for mineral fibers and glass wool' },
    sortOrder: 5,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Termolight', en: 'Termolight' },
    slug: { current: 'termolight' },
    description: { it: 'Termoventilatore professionale per imbianchini e decoratori', en: 'Professional fan heater for painters and decorators' },
    sortOrder: 6,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Blender GLOS', en: 'Blender GLOS' },
    slug: { current: 'blender-glos' },
    description: { it: 'Miscelatore professionale brevettato per vernici ad acqua', en: 'Patented professional mixer for water-based paints' },
    sortOrder: 7,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Wash Station', en: 'Wash Station' },
    slug: { current: 'wash-station' },
    description: { it: 'Stazione di lavaggio eco-compatibile per materiali ad acqua', en: 'Eco-friendly washing station for water-based materials' },
    sortOrder: 8,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Accessori e Ricambi', en: 'Accessories and Spare Parts' },
    slug: { current: 'accessori-ricambi' },
    description: { it: 'Componenti, ricambi e accessori per tutti i prodotti GLOS', en: 'Components, spare parts and accessories for all GLOS products' },
    sortOrder: 9,
    isActive: true,
  },
  {
    _type: 'productCategory',
    name: { it: 'Filo di Ricambio', en: 'Replacement Wire' },
    slug: { current: 'filo-ricambio' },
    description: { it: 'Filo di ricambio per tutte le taglierine Policut', en: 'Replacement wire for all Policut cutters' },
    sortOrder: 10,
    isActive: true,
  },
]

// ===========================================
// PRODOTTI
// ===========================================

const products = [
  // POLICUT TWIN
  {
    name: { it: 'Policut Twin 120/20', en: 'Policut Twin 120/20' },
    slug: { current: 'policut-twin-120-20' },
    categorySlug: 'policut-twin',
    shortDescription: { it: 'Taglierina autoportante professionale in alluminio e inox, taglio a 45° sx/dx, scanalature, diagonale. Profondità 20cm.', en: 'Professional self-supporting cutter in aluminum and stainless steel, 45° cut left/right, grooves, diagonal. Depth 20cm.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TWIN 120-20', en: 'TWIN 120-20' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1320 mm', en: '1320 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '210 mm', en: '210 mm' } },
      { label: { it: 'Macchina chiusa', en: 'Closed machine' }, value: { it: '1570x600x205 mm', en: '1570x600x205 mm' } },
      { label: { it: 'Peso', en: 'Weight' }, value: { it: '14 kg', en: '14 kg' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 1.299,00', en: '€ 1,299.00' } },
    ],
    badges: ['madeInItaly'],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: { it: 'Policut Twin 120/30', en: 'Policut Twin 120/30' },
    slug: { current: 'policut-twin-120-30' },
    categorySlug: 'policut-twin',
    shortDescription: { it: 'Taglierina autoportante professionale in alluminio e inox, taglio a 45° sx/dx, scanalature, diagonale. Profondità 30cm.', en: 'Professional self-supporting cutter in aluminum and stainless steel, 45° cut left/right, grooves, diagonal. Depth 30cm.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TWIN 120-30', en: 'TWIN 120-30' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1320 mm', en: '1320 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '310 mm', en: '310 mm' } },
      { label: { it: 'Macchina chiusa', en: 'Closed machine' }, value: { it: '1570x700x205 mm', en: '1570x700x205 mm' } },
      { label: { it: 'Peso', en: 'Weight' }, value: { it: '14 kg', en: '14 kg' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 1.299,00', en: '€ 1,299.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 2,
  },

  // POLICUT EASY
  {
    name: { it: 'Policut Easy 1200/20', en: 'Policut Easy 1200/20' },
    slug: { current: 'policut-easy-1200-20' },
    categorySlug: 'policut-easy',
    shortDescription: { it: 'Top di gamma: produttività e tagli di grande dimensione. Sostegno autoportante, utilizzo anche in appoggio.', en: 'Top of the range: productivity and large cuts. Self-supporting stand, also usable resting.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASY 120-20', en: 'EASY 120-20' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1320 mm', en: '1320 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '210 mm', en: '210 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 995,00', en: '€ 995.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 1,
  },
  {
    name: { it: 'Policut Easy 1200/30', en: 'Policut Easy 1200/30' },
    slug: { current: 'policut-easy-1200-30' },
    categorySlug: 'policut-easy',
    shortDescription: { it: 'Top di gamma: produttività e tagli di grande dimensione. Profondità 30cm.', en: 'Top of the range: productivity and large cuts. Depth 30cm.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASY 120-30', en: 'EASY 120-30' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1320 mm', en: '1320 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '310 mm', en: '310 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 995,00', en: '€ 995.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 2,
  },
  {
    name: { it: 'Policut Easy 1000/20', en: 'Policut Easy 1000/20' },
    slug: { current: 'policut-easy-1000-20' },
    categorySlug: 'policut-easy',
    shortDescription: { it: 'Il giusto compromesso in cantiere: leggerezza e produttività. Tagli perfetti su pannelli grandi.', en: 'The right compromise on site: lightness and productivity. Perfect cuts on large panels.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASY 100-20', en: 'EASY 100-20' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1110 mm', en: '1110 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '210 mm', en: '210 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 975,00', en: '€ 975.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 3,
  },
  {
    name: { it: 'Policut Easy 1000/30', en: 'Policut Easy 1000/30' },
    slug: { current: 'policut-easy-1000-30' },
    categorySlug: 'policut-easy',
    shortDescription: { it: 'Il giusto compromesso in cantiere: leggerezza e produttività. Profondità 30cm.', en: 'The right compromise on site: lightness and productivity. Depth 30cm.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASY 100-30', en: 'EASY 100-30' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1110 mm', en: '1110 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '310 mm', en: '310 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 975,00', en: '€ 975.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 4,
  },
  {
    name: { it: 'Policut Easy 700/20', en: 'Policut Easy 700/20' },
    slug: { current: 'policut-easy-700-20' },
    categorySlug: 'policut-easy',
    shortDescription: { it: 'La più compatta e leggera della gamma Easy. Ideale per ponteggi alti o luoghi scomodi.', en: 'The most compact and light in the Easy range. Ideal for high scaffolding or awkward places.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASY 70-20', en: 'EASY 70-20' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '645 mm', en: '645 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '210 mm', en: '210 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 945,00', en: '€ 945.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 5,
  },
  {
    name: { it: 'Policut Easy 700/30', en: 'Policut Easy 700/30' },
    slug: { current: 'policut-easy-700-30' },
    categorySlug: 'policut-easy',
    shortDescription: { it: 'La più compatta e leggera della gamma Easy. Profondità 30cm.', en: 'The most compact and light in the Easy range. Depth 30cm.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASY 70-30', en: 'EASY 70-30' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '645 mm', en: '645 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '310 mm', en: '310 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 945,00', en: '€ 945.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 6,
  },

  // POLICUT BASIC
  {
    name: { it: 'Twin Basic 1200 SCC', en: 'Twin Basic 1200 SCC' },
    slug: { current: 'twin-basic-1200-scc' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Taglierina autoportante con trasformatore a bordo a servizio continuo. Cavalletto regolabile, goniometri di precisione.', en: 'Self-supporting cutter with continuous service onboard transformer. Adjustable stand, precision goniometers.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TWINBASIC 120SCC', en: 'TWINBASIC 120SCC' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1320 mm', en: '1320 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '330 mm', en: '330 mm' } },
      { label: { it: 'Macchina chiusa', en: 'Closed machine' }, value: { it: '1660x635x200 mm', en: '1660x635x200 mm' } },
      { label: { it: 'Peso', en: 'Weight' }, value: { it: '15,5 kg', en: '15.5 kg' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 998,00', en: '€ 998.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 1,
  },
  {
    name: { it: 'Twin Basic 1200 S', en: 'Twin Basic 1200 S' },
    slug: { current: 'twin-basic-1200-s' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Taglierina autoportante serie Basic 1200mm.', en: 'Self-supporting cutter Basic series 1200mm.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TWINBASIC 120S', en: 'TWINBASIC 120S' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1320 mm', en: '1320 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '330 mm', en: '330 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 880,00', en: '€ 880.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 2,
  },
  {
    name: { it: 'Twin Basic 1000 SCC', en: 'Twin Basic 1000 SCC' },
    slug: { current: 'twin-basic-1000-scc' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Taglierina autoportante con trasformatore a bordo a servizio continuo, formato 1000mm.', en: 'Self-supporting cutter with continuous service onboard transformer, 1000mm format.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TWINBASIC 100SCC', en: 'TWINBASIC 100SCC' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1095 mm', en: '1095 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '330 mm', en: '330 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 928,00', en: '€ 928.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 3,
  },
  {
    name: { it: 'Twin Basic 1000 S', en: 'Twin Basic 1000 S' },
    slug: { current: 'twin-basic-1000-s' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Taglierina autoportante serie Basic 1000mm.', en: 'Self-supporting cutter Basic series 1000mm.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TWINBASIC 100S', en: 'TWINBASIC 100S' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 803,00', en: '€ 803.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 4,
  },
  {
    name: { it: 'Easy Basic 1200 CC', en: 'Easy Basic 1200 CC' },
    slug: { current: 'easy-basic-1200-cc' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Il giusto compromesso in cantiere: leggerezza e produttività. Con cavo continuo.', en: 'The right compromise on site: lightness and productivity. With continuous cable.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASYBASIC 120CC', en: 'EASYBASIC 120CC' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1110 mm', en: '1110 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '210-310 mm', en: '210-310 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 888,00', en: '€ 888.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 5,
  },
  {
    name: { it: 'Easy Basic 1200', en: 'Easy Basic 1200' },
    slug: { current: 'easy-basic-1200' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Macchina professionale facile da trasportare, tutti i tipi di taglio.', en: 'Professional machine easy to transport, all types of cuts.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASYBASIC 120', en: 'EASYBASIC 120' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 763,00', en: '€ 763.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 6,
  },
  {
    name: { it: 'Easy Basic 1000 CC', en: 'Easy Basic 1000 CC' },
    slug: { current: 'easy-basic-1000-cc' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Macchina professionale compatta con cavo continuo. Ideale per ponteggio.', en: 'Compact professional machine with continuous cable. Ideal for scaffolding.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASYBASIC 100CC', en: 'EASYBASIC 100CC' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1095 mm', en: '1095 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '330 mm', en: '330 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 844,00', en: '€ 844.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 7,
  },
  {
    name: { it: 'Easy Basic 1000', en: 'Easy Basic 1000' },
    slug: { current: 'easy-basic-1000' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'Macchina professionale compatta per ponteggio.', en: 'Compact professional machine for scaffolding.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASYBASIC 100', en: 'EASYBASIC 100' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 719,00', en: '€ 719.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 8,
  },
  {
    name: { it: 'Easy Basic 700', en: 'Easy Basic 700' },
    slug: { current: 'easy-basic-700' },
    categorySlug: 'policut-basic',
    shortDescription: { it: 'La soluzione più compatta per tagli seriali su ponteggi.', en: 'The most compact solution for serial cuts on scaffolding.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'EASYBASIC 70', en: 'EASYBASIC 70' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '640 mm', en: '640 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '330 mm', en: '330 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 695,00', en: '€ 695.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 9,
  },

  // TAGLIERINE MANUALI
  {
    name: { it: 'Minicut (con trasformatore)', en: 'Minicut (with transformer)' },
    slug: { current: 'minicut-con-trasformatore' },
    categorySlug: 'taglierine-manuali',
    shortDescription: { it: 'Taglierina manuale per tagli di precisione. Ideale per sottotrave, spallette e piccoli lavori. Impugnatura ergonomica, appoggio in plexiglass.', en: 'Manual cutter for precision cuts. Ideal for under-beam, shoulders and small jobs. Ergonomic grip, plexiglass support.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'MINICUT', en: 'MINICUT' } },
      { label: { it: 'Spessore di taglio', en: 'Cutting thickness' }, value: { it: '200/360 mm', en: '200/360 mm' } },
      { label: { it: 'Profondità', en: 'Depth' }, value: { it: '400 mm', en: '400 mm' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 336,00', en: '€ 336.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 1,
  },
  {
    name: { it: 'Minicut (senza trasformatore)', en: 'Minicut (without transformer)' },
    slug: { current: 'minicut-senza-trasformatore' },
    categorySlug: 'taglierine-manuali',
    shortDescription: { it: 'Taglierina manuale senza trasformatore. Compatibile con trasformatore universale GLOS.', en: 'Manual cutter without transformer. Compatible with GLOS universal transformer.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'MINICUT S/T', en: 'MINICUT S/T' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 260,00', en: '€ 260.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 2,
  },
  {
    name: { it: 'Hot Knife - Coltello a Caldo', en: 'Hot Knife' },
    slug: { current: 'hot-knife' },
    categorySlug: 'taglierine-manuali',
    shortDescription: { it: 'Coltello a caldo ad intermittenza (30s ON / 50s OFF). Con valigetta, lame, slitta inox. Per tagli da 0° a 90°.', en: 'Intermittent hot knife (30s ON / 50s OFF). With case, blades, stainless steel slide. For cuts from 0° to 90°.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'BISELLATRICE', en: 'BISELLATRICE' } },
      { label: { it: 'Alimentazione', en: 'Power supply' }, value: { it: '230V - 50/60Hz', en: '230V - 50/60Hz' } },
      { label: { it: 'Potenza', en: 'Power' }, value: { it: '130W', en: '130W' } },
      { label: { it: 'Lama', en: 'Blade' }, value: { it: '150 mm (taglio utile)', en: '150 mm (useful cut)' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 209,00', en: '€ 209.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 3,
  },

  // FIBER CUT
  {
    name: { it: 'Fiber Cut 1200/20', en: 'Fiber Cut 1200/20' },
    slug: { current: 'fiber-cut-1200-20' },
    categorySlug: 'fiber-cut',
    shortDescription: { it: 'Taglierina innovativa per pannelli in fibre minerali, lane di vetro ed espansi. Sistema a ganascia, barra bloccalastra, arco di taglio.', en: 'Innovative cutter for mineral fiber panels, glass wool and expanded materials. Jaw system, plate locking bar, cutting arc.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'FIBERCUT 120-20', en: 'FIBERCUT 120-20' } },
      { label: { it: 'Misura max. taglio', en: 'Max cut size' }, value: { it: '1280 mm', en: '1280 mm' } },
      { label: { it: 'Profondità taglio', en: 'Cut depth' }, value: { it: '235 mm', en: '235 mm' } },
      { label: { it: 'Dimensioni', en: 'Dimensions' }, value: { it: '1750x416x200 mm', en: '1750x416x200 mm' } },
      { label: { it: 'Peso', en: 'Weight' }, value: { it: '21 kg', en: '21 kg' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 1.299,00', en: '€ 1,299.00' } },
    ],
    badges: ['new', 'madeInItaly'],
    isNew: true,
    isFeatured: true,
    sortOrder: 1,
  },

  // TERMOLIGHT
  {
    name: { it: 'Termolight (con cavalletto)', en: 'Termolight (with stand)' },
    slug: { current: 'termolight-con-cavalletto' },
    categorySlug: 'termolight',
    shortDescription: { it: 'Termoventilatore professionale per asciugatura rapida. 1600 m³/h, ricicla aria 22 volte/ora. 2 lampade professionali, centralina umidità.', en: 'Professional fan heater for quick drying. 1600 m³/h, recycles air 22 times/hour. 2 professional lamps, humidity control unit.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TMLIGHT', en: 'TMLIGHT' } },
      { label: { it: 'Potenza', en: 'Power' }, value: { it: '2025 W', en: '2025 W' } },
      { label: { it: 'Metri cubi/h', en: 'Cubic meters/h' }, value: { it: '1600', en: '1600' } },
      { label: { it: 'Kilo calorie', en: 'Kilocalories' }, value: { it: '1800', en: '1800' } },
      { label: { it: 'Alimentazione', en: 'Power supply' }, value: { it: '220/230V 50Hz', en: '220/230V 50Hz' } },
      { label: { it: 'Peso', en: 'Weight' }, value: { it: '5 kg', en: '5 kg' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 495,00', en: '€ 495.00' } },
    ],
    badges: ['madeInItaly'],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: { it: 'Termolight (senza cavalletto)', en: 'Termolight (without stand)' },
    slug: { current: 'termolight-senza-cavalletto' },
    categorySlug: 'termolight',
    shortDescription: { it: 'Termoventilatore professionale senza cavalletto di sostegno.', en: 'Professional fan heater without support stand.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TMLIGHT S/C', en: 'TMLIGHT S/C' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 410,00', en: '€ 410.00' } },
    ],
    badges: ['madeInItaly'],
    sortOrder: 2,
  },

  // BLENDER GLOS
  {
    name: { it: 'Blender GLOS BG2', en: 'Blender GLOS BG2' },
    slug: { current: 'blender-glos-bg2' },
    categorySlug: 'blender-glos',
    shortDescription: { it: 'Miscelatore professionale a colonna con tecnologia brevettata Mix Glos System. Rotazione alternata a velocità variabile. Non ingloba aria. Fino a 150 secchi/giorno.', en: 'Professional column mixer with patented Mix Glos System technology. Alternating rotation at variable speed. Does not incorporate air. Up to 150 buckets/day.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'BLENDER GLOS', en: 'BLENDER GLOS' } },
      { label: { it: 'Alimentazione', en: 'Power supply' }, value: { it: '230V / 50-60Hz', en: '230V / 50-60Hz' } },
      { label: { it: 'Aria compressa', en: 'Compressed air' }, value: { it: '350 L/min', en: '350 L/min' } },
      { label: { it: 'Potenza standard', en: 'Standard power' }, value: { it: '0,55 kW (1400 rpm)', en: '0.55 kW (1400 rpm)' } },
      { label: { it: 'Potenza ovali', en: 'Oval power' }, value: { it: '0,75 kW (2800 rpm)', en: '0.75 kW (2800 rpm)' } },
      { label: { it: 'Dimensioni', en: 'Dimensions' }, value: { it: '1750x500x1000 mm', en: '1750x500x1000 mm' } },
      { label: { it: 'Peso', en: 'Weight' }, value: { it: '120 kg', en: '120 kg' } },
      { label: { it: 'Contenitori', en: 'Containers' }, value: { it: 'Plastica / Metallo / Tondi / Ovali', en: 'Plastic / Metal / Round / Oval' } },
      { label: { it: 'Capacità max', en: 'Max capacity' }, value: { it: '14 L / 25 kg', en: '14 L / 25 kg' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: 'Su richiesta', en: 'On request' } },
    ],
    badges: ['patented', 'madeInItaly'],
    isFeatured: true,
    sortOrder: 1,
  },

  // WASH STATION
  {
    name: { it: 'GLOS Wash Station', en: 'GLOS Wash Station' },
    slug: { current: 'glos-wash-station' },
    categorySlug: 'wash-station',
    shortDescription: { it: 'Stazione di lavaggio rapida, sicura e facile da usare. Eco-compatibile, ideale per pulitura di oggetti a contatto con materiali a base acquosa.', en: 'Fast, safe and easy to use washing station. Eco-friendly, ideal for cleaning objects in contact with water-based materials.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'WASH STATION', en: 'WASH STATION' } },
      { label: { it: 'Ingombro', en: 'Footprint' }, value: { it: 'H.1460 - Ø570 - P 415 mm', en: 'H.1460 - Ø570 - D 415 mm' } },
      { label: { it: 'Peso', en: 'Weight' }, value: { it: '35 kg', en: '35 kg' } },
      { label: { it: 'Capienza H2O', en: 'Water capacity' }, value: { it: '30 litri', en: '30 liters' } },
      { label: { it: 'Funzionamento', en: 'Operation' }, value: { it: 'Manuale', en: 'Manual' } },
      { label: { it: 'Alimentazione', en: 'Power supply' }, value: { it: 'Aria compressa 350 L/min', en: 'Compressed air 350 L/min' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: 'Su richiesta', en: 'On request' } },
    ],
    badges: ['ecoFriendly', 'madeInItaly'],
    isFeatured: true,
    sortOrder: 1,
  },

  // ACCESSORI
  {
    name: { it: 'Trasformatore universale', en: 'Universal transformer' },
    slug: { current: 'trasformatore-universale' },
    categorySlug: 'accessori-ricambi',
    shortDescription: { it: 'Trasformatore universale per taglierine Policut.', en: 'Universal transformer for Policut cutters.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'TRASFORMATORE', en: 'TRASFORMATORE' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 143,00', en: '€ 143.00' } },
    ],
    sortOrder: 1,
  },
  {
    name: { it: 'Cavalletto Serie Basic', en: 'Basic Series Stand' },
    slug: { current: 'cavalletto-serie-basic' },
    categorySlug: 'accessori-ricambi',
    shortDescription: { it: 'Cavalletto smontabile per taglierine Serie Basic.', en: 'Dismountable stand for Basic Series cutters.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'CAVABASIC', en: 'CAVABASIC' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 179,00', en: '€ 179.00' } },
    ],
    sortOrder: 2,
  },
  {
    name: { it: 'Cavalletto Termolight', en: 'Termolight Stand' },
    slug: { current: 'cavalletto-termolight' },
    categorySlug: 'accessori-ricambi',
    shortDescription: { it: 'Cavalletto di sostegno per termolampada Termolight.', en: 'Support stand for Termolight heat lamp.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'CAVALLETTO', en: 'CAVALLETTO' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 159,00', en: '€ 159.00' } },
    ],
    sortOrder: 3,
  },

  // FILO DI RICAMBIO
  {
    name: { it: 'Filo per Policut 1200 e 1000 (prima serie)', en: 'Wire for Policut 1200 and 1000 (first series)' },
    slug: { current: 'filo-policut-prima-serie' },
    categorySlug: 'filo-ricambio',
    shortDescription: { it: 'Filo di ricambio per Policut 1200 e 1000 prima serie.', en: 'Replacement wire for Policut 1200 and 1000 first series.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'FILO 1200 / FILO 1000', en: 'FILO 1200 / FILO 1000' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 12,10', en: '€ 12.10' } },
    ],
    sortOrder: 1,
  },
  {
    name: { it: 'Filo per Twin Gamma / Easy 1000/1200', en: 'Wire for Twin Gamma / Easy 1000/1200' },
    slug: { current: 'filo-twin-gamma-easy' },
    categorySlug: 'filo-ricambio',
    shortDescription: { it: 'Filo di ricambio per Twin Gamma, Gamma Easy 1000 e 1200.', en: 'Replacement wire for Twin Gamma, Gamma Easy 1000 and 1200.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'FILO 1200 GAMMA', en: 'FILO 1200 GAMMA' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 12,10', en: '€ 12.10' } },
    ],
    sortOrder: 2,
  },
  {
    name: { it: 'Bobina filo 20 metri', en: 'Wire spool 20 meters' },
    slug: { current: 'bobina-filo-20-metri' },
    categorySlug: 'filo-ricambio',
    shortDescription: { it: 'Bobina filo di ricambio diam. 0,8 e 0,6 per taglierine, 20 metri.', en: 'Replacement wire spool diam. 0.8 and 0.6 for cutters, 20 meters.' },
    specifications: [
      { label: { it: 'Codice', en: 'Code' }, value: { it: 'BOB FIL.08MT20', en: 'BOB FIL.08MT20' } },
      { label: { it: 'Prezzo', en: 'Price' }, value: { it: '€ 66,00', en: '€ 66.00' } },
    ],
    sortOrder: 3,
  },
]

// ===========================================
// SEEDING FUNCTIONS
// ===========================================

async function seedCategories() {
  console.log('🏷️  Seeding categories...')

  const results = []
  for (const category of categories) {
    try {
      // Check if exists
      const existing = await client.fetch(
        `*[_type == "productCategory" && slug.current == $slug][0]`,
        { slug: category.slug.current }
      )

      if (existing) {
        console.log(`  ⏭️  Category "${category.name.it}" already exists, skipping`)
        results.push({ slug: category.slug.current, _id: existing._id })
        continue
      }

      const result = await client.create(category)
      console.log(`  ✅ Created category: ${category.name.it}`)
      results.push({ slug: category.slug.current, _id: result._id })
    } catch (error) {
      console.error(`  ❌ Error creating category ${category.name.it}:`, error.message)
    }
  }

  return results
}

async function seedProducts(categoryMap) {
  console.log('\n📦 Seeding products...')

  for (const product of products) {
    try {
      // Check if exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug: product.slug.current }
      )

      if (existing) {
        console.log(`  ⏭️  Product "${product.name.it}" already exists, skipping`)
        continue
      }

      // Find category ID
      const categoryId = categoryMap.find(c => c.slug === product.categorySlug)?._id

      const productDoc = {
        _type: 'product',
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        specifications: product.specifications?.map((spec, index) => ({
          _key: `spec-${index}`,
          label: spec.label,
          value: spec.value,
        })),
        badges: product.badges || [],
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        isActive: true,
        sortOrder: product.sortOrder || 99,
        ...(categoryId && {
          category: {
            _type: 'reference',
            _ref: categoryId,
          },
        }),
      }

      await client.create(productDoc)
      console.log(`  ✅ Created product: ${product.name.it}`)
    } catch (error) {
      console.error(`  ❌ Error creating product ${product.name.it}:`, error.message)
    }
  }
}

async function main() {
  console.log('🚀 Starting GLOS product seeding...\n')

  try {
    const categoryMap = await seedCategories()
    await seedProducts(categoryMap)

    console.log('\n✨ Seeding completed!')
    console.log(`   Categories: ${categories.length}`)
    console.log(`   Products: ${products.length}`)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

main()
