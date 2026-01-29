// Sezione: Call to Action
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Invito all\'Azione',
  type: 'object',
  icon: () => '📢',

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
      name: 'buttonText',
      title: 'Testo Pulsante',
      type: 'string',
    }),

    defineField({
      name: 'buttonLink',
      title: 'Link Pulsante',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Telefono (opzionale)',
      type: 'string',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      options: {
        list: [
          { title: 'Blu', value: 'blue' },
          { title: 'Scuro', value: 'dark' },
          { title: 'Chiaro', value: 'light' },
        ],
      },
      initialValue: 'blue',
    }),
  ],

  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `📢 ${title || 'CTA'}` }
    },
  },
})
