// Sezione: Call to Action
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Invito all\'Azione',
  type: 'object',
  icon: () => '📢',
  description: 'Banner colorato con pulsante per invitare il visitatore a contattarti',

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
      name: 'buttonText',
      title: 'Testo Pulsante',
      type: 'localeString',
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
    select: { title: 'title.it' },
    prepare({ title }) {
      return { title: `📢 ${title || 'CTA'}` }
    },
  },
})
