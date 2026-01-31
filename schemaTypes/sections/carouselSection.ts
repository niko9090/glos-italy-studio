// Carousel Section - Slider di immagini/contenuti
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'carouselSection',
  title: 'Carosello',
  type: 'object',
  icon: () => '🎠',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'slides', title: 'Slide' },
    { name: 'settings', title: 'Impostazioni' },
    { name: 'style', title: 'Stile' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      group: 'content',
      description: 'Titolo opzionale sopra il carosello',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'slides',
      title: 'Slide',
      type: 'array',
      group: 'slides',
      description: 'Aggiungi le slide del carosello',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          icon: () => '🖼️',
          fields: [
            defineField({
              name: 'image',
              title: 'Immagine',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Titolo',
              type: 'localeString',
              description: 'Titolo sovrapposto all\'immagine',
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
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
              name: 'overlay',
              title: 'Overlay Scuro',
              type: 'string',
              options: {
                list: [
                  { title: 'Nessuno', value: 'none' },
                  { title: 'Leggero (20%)', value: 'light' },
                  { title: 'Medio (40%)', value: 'medium' },
                  { title: 'Forte (60%)', value: 'heavy' },
                ],
              },
              initialValue: 'medium',
            }),
            defineField({
              name: 'textPosition',
              title: 'Posizione Testo',
              type: 'string',
              options: {
                list: [
                  { title: 'Centro', value: 'center' },
                  { title: 'Sinistra', value: 'left' },
                  { title: 'Destra', value: 'right' },
                  { title: 'In Basso a Sinistra', value: 'bottom-left' },
                  { title: 'In Basso a Destra', value: 'bottom-right' },
                ],
              },
              initialValue: 'center',
            }),
          ],
          preview: {
            select: {
              title: 'title.it',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Slide senza titolo',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Aggiungi almeno una slide'),
    }),
    // Settings
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Avanza automaticamente tra le slide',
    }),
    defineField({
      name: 'autoplaySpeed',
      title: 'Velocità Autoplay (secondi)',
      type: 'number',
      group: 'settings',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(20),
      hidden: ({ parent }) => !parent?.autoplay,
    }),
    defineField({
      name: 'showArrows',
      title: 'Mostra Frecce',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    defineField({
      name: 'showDots',
      title: 'Mostra Indicatori',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      title: 'Loop Infinito',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    defineField({
      name: 'pauseOnHover',
      title: 'Pausa al Passaggio Mouse',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    // Style
    defineField({
      name: 'height',
      title: 'Altezza',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Piccola (300px)', value: 'small' },
          { title: 'Media (500px)', value: 'medium' },
          { title: 'Grande (700px)', value: 'large' },
          { title: 'Schermo Intero', value: 'full' },
        ],
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'effect',
      title: 'Effetto Transizione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Slide', value: 'slide' },
          { title: 'Fade', value: 'fade' },
          { title: 'Zoom', value: 'zoom' },
        ],
      },
      initialValue: 'slide',
    }),
    defineField({
      name: 'rounded',
      title: 'Bordi Arrotondati',
      type: 'boolean',
      group: 'style',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.it',
      slides: 'slides',
    },
    prepare({ title, slides }) {
      const count = slides?.length || 0
      return {
        title: title || 'Carosello',
        subtitle: `🎠 ${count} slide`,
      }
    },
  },
})
