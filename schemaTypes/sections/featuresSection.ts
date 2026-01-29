// Sezione: Caratteristiche
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featuresSection',
  title: 'Caratteristiche',
  type: 'object',
  icon: () => '✨',

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
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'items',
      title: 'Lista Caratteristiche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titolo', type: 'string' },
            { name: 'description', title: 'Descrizione', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `✨ ${title || 'Caratteristiche'}` }
    },
  },
})
