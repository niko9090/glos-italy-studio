// Sezione: Caratteristiche
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featuresSection',
  title: 'Caratteristiche',
  type: 'object',
  icon: () => '✨',
  description: 'Lista di caratteristiche o punti di forza con immagine laterale',

  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeString',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
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
            { name: 'title', title: 'Titolo', type: 'localeString' },
            { name: 'description', title: 'Descrizione', type: 'localeText' },
          ],
          preview: {
            select: { title: 'title.it' },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'title.it' },
    prepare({ title }) {
      return { title: `✨ ${title || 'Caratteristiche'}` }
    },
  },
})
