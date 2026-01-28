// Schema: Prodotto
// Gestisce i prodotti (Blender, Taglierine, Accessori)

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  icon: () => '📦',
  fields: [
    // Codice prodotto
    defineField({
      name: 'code',
      title: 'Codice Prodotto',
      type: 'string',
      description: 'Es: GLOS-100, POLICUT-350',
      validation: Rule => Rule.required(),
    }),

    // Categoria
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: Rule => Rule.required(),
    }),

    // Nome multilingua
    defineField({
      name: 'name',
      title: 'Nome Prodotto',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    // Tagline/Slogan
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    // Descrizione
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 4 },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 4 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 4 },
      ],
    }),

    // Caratteristiche tecniche
    defineField({
      name: 'specs',
      title: 'Specifiche Tecniche',
      type: 'object',
      fields: [
        { name: 'capacity', title: 'Capacità', type: 'string', description: 'Es: 100 litri' },
        { name: 'width', title: 'Larghezza', type: 'string', description: 'Es: 350 mm' },
        { name: 'thickness', title: 'Spessore Taglio', type: 'string', description: 'Es: 0.1-5 mm' },
        { name: 'weight', title: 'Peso', type: 'string', description: 'Es: 85 kg' },
        { name: 'power', title: 'Potenza', type: 'string', description: 'Es: 750W' },
        { name: 'voltage', title: 'Voltaggio', type: 'string', description: 'Es: 220V 50Hz' },
        { name: 'dimensions', title: 'Dimensioni', type: 'string', description: 'Es: 60x80x120 cm' },
      ],
    }),

    // Caratteristiche/Features
    defineField({
      name: 'features',
      title: 'Caratteristiche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹 Italiano', type: 'string' },
            { name: 'en', title: '🇬🇧 English', type: 'string' },
            { name: 'es', title: '🇪🇸 Español', type: 'string' },
          ],
          preview: {
            select: { title: 'it' },
          },
        },
      ],
    }),

    // Prezzo
    defineField({
      name: 'price',
      title: 'Prezzo',
      type: 'object',
      fields: [
        { name: 'amount', title: 'Importo (€)', type: 'number' },
        { name: 'displayText', title: 'Testo Visualizzato', type: 'string', description: 'Es: "€ 1.200,00" o "Su richiesta"' },
        { name: 'isOnRequest', title: 'Prezzo su Richiesta', type: 'boolean', initialValue: false },
      ],
    }),

    // Immagine principale
    defineField({
      name: 'mainImage',
      title: 'Immagine Principale',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      ],
    }),

    // Galleria immagini
    defineField({
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
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

    // Badge (Più Venduto, Nuovo, etc.)
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'object',
      fields: [
        { name: 'show', title: 'Mostra Badge', type: 'boolean', initialValue: false },
        {
          name: 'type',
          title: 'Tipo',
          type: 'string',
          options: {
            list: [
              { title: 'Più Venduto', value: 'bestseller' },
              { title: 'Nuovo', value: 'new' },
              { title: 'Offerta', value: 'sale' },
              { title: 'Personalizzato', value: 'custom' },
            ],
          },
        },
        {
          name: 'customText',
          title: 'Testo Personalizzato',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
      ],
    }),

    // Stato
    defineField({
      name: 'isActive',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
    }),

    // In evidenza
    defineField({
      name: 'isFeatured',
      title: 'In Evidenza (Homepage)',
      type: 'boolean',
      initialValue: false,
    }),

    // Ordine
    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'name.it',
      code: 'code',
      category: 'category.name.it',
      media: 'mainImage',
      active: 'isActive',
    },
    prepare({ title, code, category, media, active }) {
      return {
        title: `${active ? '✅' : '❌'} ${title || code}`,
        subtitle: `${code} • ${category || 'Senza categoria'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Ordine',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Codice',
      name: 'codeAsc',
      by: [{ field: 'code', direction: 'asc' }],
    },
  ],
})
