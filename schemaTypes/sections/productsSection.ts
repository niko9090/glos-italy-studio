// Sezione: Prodotti
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productsSection',
  title: 'Sezione Prodotti',
  type: 'object',
  icon: () => '📦',
  description: 'Griglia con i prodotti in evidenza del catalogo',

  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'showFeatured',
      title: 'Mostra solo In Evidenza',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'limit',
      title: 'Numero Prodotti',
      type: 'number',
      initialValue: 6,
    }),

    defineField({
      name: 'buttonText',
      title: 'Testo Pulsante',
      type: 'string',
    }),

    defineField({
      name: 'buttonLink',
      title: 'Link Pulsante',
      type: 'string',
    }),
  ],

  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `📦 ${title || 'Prodotti'}` }
    },
  },
})
