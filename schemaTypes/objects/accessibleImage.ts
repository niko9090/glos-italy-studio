// Tipo Immagine Accessibile - Con alt text obbligatorio per SEO e accessibilità
import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'accessibleImage',
  title: 'Immagine Accessibile',
  type: 'object',
  icon: ImageIcon,
  description: 'Immagine con testo alternativo per accessibilità',

  fields: [
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error('L\'immagine è obbligatoria'),
    }),

    defineField({
      name: 'alt',
      title: 'Testo Alternativo (Alt)',
      type: 'localeString',
      description: 'Descrivi l\'immagine per chi non può vederla. Importante per SEO e accessibilità.',
      validation: Rule => Rule.required().error('Il testo alternativo è obbligatorio per l\'accessibilità'),
    }),

    defineField({
      name: 'caption',
      title: 'Didascalia',
      type: 'localeString',
      description: 'Testo opzionale mostrato sotto l\'immagine',
    }),
  ],

  preview: {
    select: {
      media: 'image',
      alt: 'alt.it',
    },
    prepare({ media, alt }) {
      return {
        title: alt || 'Immagine senza alt text',
        media,
        subtitle: alt ? '✅ Alt text presente' : '⚠️ Alt text mancante',
      }
    },
  },
})
