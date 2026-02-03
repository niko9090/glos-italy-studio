// Schema: Prodotto
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  icon: () => '📦',

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'basic',
      title: 'Info Base',
      default: true,
    },
    {
      name: 'media',
      title: 'Immagini',
    },
    {
      name: 'details',
      title: 'Dettagli',
    },
    {
      name: 'files',
      title: 'Documenti',
    },
    {
      name: 'relations',
      title: 'Correlati',
    },
    {
      name: 'settings',
      title: 'Impostazioni',
    },
  ],

  fields: [
    // === INFO BASE ===
    defineField({
      name: 'name',
      title: 'Nome Prodotto',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'Clicca "Generate" per creare automaticamente',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      group: 'basic',
    }),

    defineField({
      name: 'shortDescription',
      title: 'Descrizione Breve',
      type: 'richText',
      description: 'Breve descrizione - puoi usare grassetto, colori, ecc.',
      group: 'basic',
    }),

    defineField({
      name: 'fullDescription',
      title: 'Descrizione Completa',
      type: 'richText',
      description: 'Descrizione dettagliata - puoi usare grassetto, colori, ecc.',
      group: 'basic',
    }),

    // === IMMAGINI ===
    defineField({
      name: 'mainImage',
      title: 'Foto Principale',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),

    defineField({
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
      group: 'media',
      description: 'Aggiungi altre foto del prodotto per la galleria',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Testo Alternativo',
              type: 'string',
              description: 'Descrizione immagine per accessibilita',
            },
            {
              name: 'caption',
              title: 'Didascalia',
              type: 'string',
            },
          ],
        },
      ],
    }),

    // === DETTAGLI ===
    defineField({
      name: 'specifications',
      title: 'Specifiche Tecniche',
      type: 'array',
      description: 'Aggiungi le specifiche del prodotto',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Nome',
              type: 'string',
              description: 'Es: Peso, Dimensioni, Materiale',
            },
            {
              name: 'value',
              title: 'Valore',
              type: 'string',
              description: 'Es: 500g, 30x20cm, Acciaio inox',
            },
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare({ label, value }) {
              return { title: `${label}: ${value}` }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'features',
      title: 'Caratteristiche Principali',
      type: 'array',
      group: 'details',
      description: 'Lista delle caratteristiche chiave del prodotto',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icona',
              type: 'string',
              options: {
                list: [
                  { title: 'Ingranaggio', value: 'gear' },
                  { title: 'Fulmine', value: 'lightning' },
                  { title: 'Lucchetto', value: 'lock' },
                  { title: 'Lampadina', value: 'bulb' },
                  { title: 'Target', value: 'target' },
                  { title: 'Trofeo', value: 'trophy' },
                  { title: 'Razzo', value: 'rocket' },
                  { title: 'Check', value: 'check' },
                  { title: 'Stella', value: 'star' },
                  { title: 'Scudo', value: 'shield' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Titolo',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              const icons: Record<string, string> = {
                gear: '⚙️', lightning: '⚡', lock: '🔒', bulb: '💡',
                target: '🎯', trophy: '🏆', rocket: '🚀', check: '✓',
                star: '★', shield: '🛡️',
              }
              return { title: `${icons[icon] || '•'} ${title}` }
            },
          },
        },
      ],
    }),

    // === DOCUMENTI ===
    defineField({
      name: 'documents',
      title: 'Documenti Scaricabili',
      type: 'array',
      group: 'files',
      description: 'Schede tecniche, manuali, cataloghi, ecc.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Nome Documento',
              type: 'string',
              description: 'Es: Scheda Tecnica, Manuale Utente, Catalogo',
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.xls,.xlsx,.zip',
              },
            },
            {
              name: 'fileType',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Word', value: 'doc' },
                  { title: 'Excel', value: 'xls' },
                  { title: 'ZIP', value: 'zip' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title', type: 'fileType' },
            prepare({ title, type }) {
              const icons: Record<string, string> = {
                pdf: '📄', doc: '📝', xls: '📊', zip: '📦',
              }
              return { title: `${icons[type] || '📎'} ${title}` }
            },
          },
        },
      ],
    }),

    // === PRODOTTI CORRELATI ===
    defineField({
      name: 'relatedProducts',
      title: 'Prodotti Correlati',
      type: 'array',
      group: 'relations',
      description: 'Seleziona i prodotti da mostrare nella sezione "Ti potrebbe interessare"',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      validation: Rule => Rule.max(4).warning('Consigliato massimo 4 prodotti correlati'),
    }),

    // === IMPOSTAZIONI ===
    defineField({
      name: 'sortOrder',
      title: 'Ordine',
      type: 'number',
      group: 'settings',
      description: 'Numero per ordinare i prodotti (1 = primo)',
      initialValue: 99,
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile sul sito',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Mostra in Homepage',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),

    defineField({
      name: 'isNew',
      title: 'Nuovo Prodotto',
      type: 'boolean',
      group: 'settings',
      description: 'Mostra badge "Nuovo" sul prodotto',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category.name',
      media: 'mainImage',
      active: 'isActive',
      featured: 'isFeatured',
      isNew: 'isNew',
    },
    prepare({ title, category, media, active, featured, isNew }) {
      const badges = []
      if (featured) badges.push('⭐')
      if (isNew) badges.push('🆕')
      const badgeStr = badges.length > 0 ? ` ${badges.join(' ')}` : ''
      return {
        title: title,
        subtitle: `${category || 'Senza categoria'} ${active ? '✅' : '❌'}${badgeStr}`,
        media,
      }
    },
  },
})
