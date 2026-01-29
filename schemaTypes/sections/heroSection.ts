// Sezione: Hero (Banner principale)
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Banner Principale',
  type: 'object',
  icon: () => '🎯',
  description: 'Il grande banner in cima alla pagina con titolo, sottotitolo e immagine di sfondo',

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
      description: 'Es: /contatti',
    }),

    defineField({
      name: 'backgroundImage',
      title: 'Immagine Sfondo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: { title: 'title.it' },
    prepare({ title }) {
      return { title: `🎯 ${title || 'Banner'}` }
    },
  },
})
