// Schema: Prodotto - VERSIONE SEMPLIFICATA (compatibile con dati multilingua)
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  icon: () => '📦',

  groups: [
    { name: 'info', title: '📝 Informazioni', default: true },
    { name: 'media', title: '📷 Foto' },
    { name: 'specs', title: '📋 Specifiche' },
  ],

  fields: [
    // ══════════════════════════════════════════════════════
    // INFORMAZIONI BASE
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'name',
      title: 'Nome Prodotto',
      type: 'localeString',
      group: 'info',
      description: 'Il nome del prodotto',
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'info',
      description: 'Clicca "Generate" per creare automaticamente',
      options: {
        source: 'name.it',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('URL obbligatorio'),
    }),

    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      group: 'info',
      description: 'Seleziona la categoria del prodotto',
    }),

    defineField({
      name: 'shortDescription',
      title: 'Descrizione Breve',
      type: 'localeText',
      group: 'info',
      description: 'Breve descrizione (1-2 frasi)',
    }),

    defineField({
      name: 'fullDescription',
      title: 'Descrizione Completa',
      type: 'localeText',
      group: 'info',
      description: 'Descrizione dettagliata del prodotto',
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile sul sito',
      type: 'boolean',
      group: 'info',
      description: 'Se disattivato, il prodotto non sara visibile',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Mostra in Homepage',
      type: 'boolean',
      group: 'info',
      description: 'Mostra questo prodotto nella homepage',
      initialValue: false,
    }),

    defineField({
      name: 'isNew',
      title: 'Nuovo Prodotto',
      type: 'boolean',
      group: 'info',
      description: 'Mostra badge "Nuovo" sul prodotto',
      initialValue: false,
    }),

    // ══════════════════════════════════════════════════════
    // FOTO
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'mainImage',
      title: 'Foto Principale',
      type: 'image',
      group: 'media',
      description: 'La foto principale del prodotto',
      options: { hotspot: true },
    }),

    defineField({
      name: 'gallery',
      title: 'Altre Foto',
      type: 'array',
      group: 'media',
      description: 'Aggiungi altre foto del prodotto',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Descrizione',
              type: 'string',
            },
          ],
        },
      ],
    }),

    // ══════════════════════════════════════════════════════
    // SPECIFICHE
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'specifications',
      title: 'Specifiche Tecniche',
      type: 'array',
      group: 'specs',
      description: 'Aggiungi le specifiche (es: Peso: 500g)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Nome',
              type: 'string',
              description: 'Es: Peso, Dimensioni',
            },
            {
              name: 'value',
              title: 'Valore',
              type: 'string',
              description: 'Es: 500g, 30x20cm',
            },
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare({ label, value }) {
              return { title: `${label || ''}: ${value || ''}` }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'documents',
      title: 'Documenti PDF',
      type: 'array',
      group: 'specs',
      description: 'Schede tecniche, manuali, ecc.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Nome Documento',
              type: 'string',
            },
            {
              name: 'file',
              title: 'File PDF',
              type: 'file',
              options: {
                accept: '.pdf',
              },
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: `📄 ${title || 'Documento'}` }
            },
          },
        },
      ],
    }),

    // ══════════════════════════════════════════════════════
    // CAMPI NASCOSTI (mantenuti per compatibilita)
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'sortOrder',
      title: 'Ordine',
      type: 'number',
      hidden: true,
      initialValue: 99,
    }),

    defineField({
      name: 'relatedProducts',
      title: 'Prodotti Correlati',
      type: 'array',
      hidden: true,
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),

    defineField({
      name: 'features',
      title: 'Caratteristiche',
      type: 'array',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icona', type: 'string' },
          { name: 'title', title: 'Titolo', type: 'string' },
          { name: 'description', title: 'Descrizione', type: 'text' },
        ],
      }],
    }),

    defineField({
      name: 'badges',
      title: 'Badge',
      type: 'array',
      hidden: true,
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'customBadge',
      title: 'Badge Personalizzato',
      type: 'object',
      hidden: true,
      fields: [
        { name: 'text', title: 'Testo', type: 'string' },
        { name: 'color', title: 'Colore', type: 'string' },
      ],
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
      // Gestisce sia string che localeString
      const titleStr = typeof title === 'object' ? (title?.it || title?.en || 'Senza nome') : (title || 'Senza nome')
      const badges = []
      if (featured) badges.push('⭐')
      if (isNew) badges.push('🆕')
      const badgeStr = badges.length > 0 ? ` ${badges.join('')}` : ''
      return {
        title: `${titleStr}${badgeStr}`,
        subtitle: `${category || 'Senza categoria'} ${active ? '✅' : '❌'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name.it', direction: 'asc' }],
    },
    {
      title: 'Ultima modifica',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
})
