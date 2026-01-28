// Schema: Prodotto
// Gestisce i prodotti (Blender, Taglierine, Accessori)

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  icon: () => '📦',

  // Raggruppamento campi
  groups: [
    { name: 'basic', title: '📋 Info Base', default: true },
    { name: 'content', title: '📝 Contenuti' },
    { name: 'specs', title: '🔧 Specifiche' },
    { name: 'media', title: '🖼️ Immagini' },
    { name: 'pricing', title: '💰 Prezzo' },
    { name: 'settings', title: '⚙️ Impostazioni' },
  ],

  fields: [
    // === INFO BASE ===
    defineField({
      name: 'code',
      title: 'Codice Prodotto',
      type: 'string',
      description: 'Codice univoco del prodotto usato internamente',
      placeholder: 'Es: GLOS-100, POLICUT-350',
      validation: Rule => Rule.required().error('Il codice prodotto è obbligatorio'),
      group: 'basic',
    }),

    defineField({
      name: 'slug',
      title: 'URL Prodotto',
      type: 'slug',
      description: 'Generato automaticamente dal codice. È l\'indirizzo web del prodotto.',
      options: {
        source: 'code',
        maxLength: 96,
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
      },
      validation: Rule => Rule.required().error('L\'URL è obbligatorio - clicca "Generate"'),
      group: 'basic',
    }),

    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'Seleziona la categoria del prodotto (Blender, Taglierine, Accessori...)',
      validation: Rule => Rule.required().error('Seleziona una categoria'),
      group: 'basic',
    }),

    // === CONTENUTI MULTILINGUA ===
    defineField({
      name: 'name',
      title: '🏷️ Nome Prodotto',
      type: 'object',
      description: 'Nome commerciale del prodotto nelle varie lingue',
      group: 'content',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Blender GLOS 100 Litri' },
        { name: 'en', title: '🇬🇧 English', type: 'string', placeholder: 'Es: GLOS 100 Liters Blender' },
        { name: 'es', title: '🇪🇸 Español', type: 'string', placeholder: 'Es: Mezclador GLOS 100 Litros' },
      ],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'shortDescription',
      title: '📄 Descrizione Breve',
      type: 'object',
      description: 'Breve descrizione per le anteprime (1-2 frasi)',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 2 },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'description',
      title: '📖 Descrizione Completa',
      type: 'object',
      description: 'Descrizione dettagliata del prodotto',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 6 },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 6 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 6 },
      ],
    }),

    defineField({
      name: 'tagline',
      title: '✨ Slogan/Tagline',
      type: 'object',
      description: 'Frase d\'effetto breve (opzionale)',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Potenza e precisione' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    // === CARATTERISTICHE ===
    defineField({
      name: 'features',
      title: '✅ Caratteristiche Principali',
      type: 'array',
      description: 'Lista dei punti di forza del prodotto (max 6-8 elementi)',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Vasca in acciaio inox AISI 304' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
          preview: {
            select: { title: 'it' },
            prepare({ title }) {
              return { title: `✓ ${title || 'Nuova caratteristica'}` }
            },
          },
        },
      ],
    }),

    // === SPECIFICHE TECNICHE ===
    defineField({
      name: 'specs',
      title: 'Specifiche Tecniche',
      type: 'object',
      description: 'Dati tecnici del prodotto. Compila solo i campi pertinenti.',
      group: 'specs',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'capacity', title: '📊 Capacità', type: 'string', description: 'Es: 100 litri, 50 kg' },
        { name: 'width', title: '📏 Larghezza Taglio', type: 'string', description: 'Per taglierine. Es: 350 mm' },
        { name: 'thickness', title: '📐 Spessore Taglio', type: 'string', description: 'Per taglierine. Es: 0.1-5 mm' },
        { name: 'weight', title: '⚖️ Peso', type: 'string', description: 'Es: 85 kg' },
        { name: 'power', title: '⚡ Potenza', type: 'string', description: 'Es: 750W, 1.5 kW' },
        { name: 'voltage', title: '🔌 Voltaggio', type: 'string', description: 'Es: 220V 50Hz, 380V trifase' },
        { name: 'dimensions', title: '📦 Dimensioni', type: 'string', description: 'LxPxH. Es: 60x80x120 cm' },
        { name: 'materials', title: '🏗️ Materiali', type: 'string', description: 'Es: Acciaio inox AISI 304' },
      ],
    }),

    // === IMMAGINI ===
    defineField({
      name: 'mainImage',
      title: 'Immagine Principale',
      type: 'image',
      description: 'Foto principale del prodotto. Consigliato: 800x600px, sfondo bianco',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Testo Alternativo (per SEO)',
          type: 'object',
          description: 'Descrivi brevemente l\'immagine',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Blender GLOS 100 litri vista frontale' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
      description: 'Foto aggiuntive del prodotto (dettagli, viste laterali, in uso)',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Testo Alternativo',
              type: 'object',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
            {
              name: 'caption',
              title: 'Didascalia',
              type: 'object',
              description: 'Descrizione visibile sotto l\'immagine',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),

    // === PREZZO ===
    defineField({
      name: 'price',
      title: 'Prezzo',
      type: 'object',
      description: 'Informazioni sul prezzo del prodotto',
      group: 'pricing',
      fields: [
        {
          name: 'isOnRequest',
          title: '📞 Prezzo su Richiesta',
          type: 'boolean',
          description: 'Attiva se il prezzo non è pubblico',
          initialValue: true,
        },
        {
          name: 'amount',
          title: '💰 Importo (€)',
          type: 'number',
          description: 'Prezzo in euro (senza simbolo). Visibile solo se "Prezzo su Richiesta" è disattivato',
          validation: Rule => Rule.min(0).error('Il prezzo non può essere negativo'),
          hidden: ({ parent }) => parent?.isOnRequest,
        },
        {
          name: 'displayText',
          title: '🏷️ Testo Visualizzato',
          type: 'string',
          description: 'Testo alternativo. Es: "A partire da € 1.200"',
          placeholder: 'Es: Su richiesta, A partire da € 1.200',
        },
      ],
    }),

    // === BADGE ===
    defineField({
      name: 'badge',
      title: 'Badge Promozionale',
      type: 'object',
      description: 'Etichetta visiva da mostrare sul prodotto',
      group: 'settings',
      fields: [
        { name: 'show', title: '🏷️ Mostra Badge', type: 'boolean', initialValue: false },
        {
          name: 'type',
          title: 'Tipo Badge',
          type: 'string',
          options: {
            list: [
              { title: '🔥 Più Venduto', value: 'bestseller' },
              { title: '🆕 Nuovo', value: 'new' },
              { title: '💥 Offerta', value: 'sale' },
              { title: '✏️ Personalizzato', value: 'custom' },
            ],
          },
          hidden: ({ parent }) => !parent?.show,
        },
        {
          name: 'customText',
          title: 'Testo Personalizzato',
          type: 'object',
          description: 'Solo se hai scelto "Personalizzato"',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
          hidden: ({ parent }) => parent?.type !== 'custom',
        },
      ],
    }),

    // === IMPOSTAZIONI ===
    defineField({
      name: 'isActive',
      title: '✅ Prodotto Attivo',
      type: 'boolean',
      description: 'Se disattivato, il prodotto non sarà visibile sul sito',
      initialValue: true,
      group: 'settings',
    }),

    defineField({
      name: 'isFeatured',
      title: '⭐ In Evidenza (Homepage)',
      type: 'boolean',
      description: 'Mostra questo prodotto nella sezione "In Evidenza" della homepage',
      initialValue: false,
      group: 'settings',
    }),

    defineField({
      name: 'isNew',
      title: '🆕 Nuovo Prodotto',
      type: 'boolean',
      description: 'Mostra il badge "Nuovo" sul prodotto',
      initialValue: false,
      group: 'settings',
    }),

    defineField({
      name: 'order',
      title: '🔢 Ordine di Visualizzazione',
      type: 'number',
      description: 'Numeri più bassi appaiono prima. Lascia 0 per ordine alfabetico.',
      initialValue: 0,
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'name.it',
      code: 'code',
      category: 'category.name.it',
      media: 'mainImage',
      active: 'isActive',
      featured: 'isFeatured',
      isNew: 'isNew',
    },
    prepare({ title, code, category, media, active, featured, isNew }) {
      const badges = []
      if (!active) badges.push('❌')
      else if (featured) badges.push('⭐')
      else badges.push('✅')
      if (isNew) badges.push('🆕')

      return {
        title: `${badges.join('')} ${title || code}`,
        subtitle: `${code} • ${category || 'Senza categoria'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Ordine Personalizzato',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Codice (A-Z)',
      name: 'codeAsc',
      by: [{ field: 'code', direction: 'asc' }],
    },
    {
      title: 'Nome (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name.it', direction: 'asc' }],
    },
  ],
})
