// Sezione: Hero (Banner principale)
import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { getPlainText, truncate } from '../../lib/previewHelpers'

export default defineType({
  name: 'heroSection',
  title: 'Banner Principale',
  type: 'object',
  icon: HomeIcon,
  description: 'Il grande banner in cima alla pagina con titolo, sottotitolo e immagine di sfondo',

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'content',
      title: 'Testi',
      default: true,
    },
    {
      name: 'action',
      title: 'Pulsante',
    },
    {
      name: 'media',
      title: 'Immagine',
    },
  ],

  fields: [
    // === GRUPPO TESTI ===
    defineField({
      name: 'title',
      title: 'Titolo Principale',
      type: 'localeRichText',
      description: 'Il grande titolo che appare nel banner - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Testo descrittivo sotto il titolo - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    // === GRUPPO PULSANTE ===
    defineField({
      name: 'buttonText',
      title: 'Testo del Pulsante',
      type: 'localeString',
      description: 'Es: "Scopri di più", "Contattaci", "Vedi Catalogo"',
      group: 'action',
    }),

    defineField({
      name: 'buttonLink',
      title: 'Link del Pulsante',
      type: 'string',
      description: 'Dove porta il pulsante. Es: /contatti, /prodotti, /catalogo',
      group: 'action',
    }),

    // === GRUPPO IMMAGINE ===
    defineField({
      name: 'backgroundImage',
      title: 'Immagine di Sfondo',
      type: 'image',
      description: 'Immagine grande che appare dietro al testo. Consigliato: 1920x1080 px',
      options: { hotspot: true },
      group: 'media',
    }),

    defineField({
      name: 'overlayOpacity',
      title: 'Oscuramento Sfondo',
      type: 'number',
      description: 'Quanto scurire l\'immagine per rendere il testo più leggibile (0-100)',
      group: 'media',
      initialValue: 50,
      validation: Rule => Rule.min(0).max(100),
    }),
  ],

  preview: {
    select: { title: 'title.it', subtitle: 'subtitle.it' },
    prepare({ title, subtitle }) {
      const titleText = getPlainText(title)
      const subtitleText = getPlainText(subtitle)
      return {
        title: `🎯 ${titleText || 'Banner Principale'}`,
        subtitle: subtitleText ? truncate(subtitleText, 50) : 'Banner senza descrizione',
      }
    },
  },
})
