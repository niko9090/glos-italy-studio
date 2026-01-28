// Sezione: Prodotti
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productsSection',
  title: 'Sezione Prodotti',
  type: 'object',
  icon: () => '📦',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Label Sezione',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'string' },
        { name: 'en', title: '🇬🇧', type: 'string' },
        { name: 'es', title: '🇪🇸', type: 'string' },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'string' },
        { name: 'en', title: '🇬🇧', type: 'string' },
        { name: 'es', title: '🇪🇸', type: 'string' },
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'text', rows: 2 },
        { name: 'en', title: '🇬🇧', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'products',
      title: 'Prodotti',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'showAll',
      title: 'Mostra Tutti',
      type: 'boolean',
      description: 'Se attivo, mostra tutti i prodotti invece della selezione',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title.it', products: 'products' },
    prepare({ title, products }) {
      return { title: `📦 Prodotti: ${title || 'Senza titolo'} (${products?.length || 0})` }
    },
  },
})
