// Timeline Section - Storia aziendale, processi, step
import { defineType, defineField } from 'sanity'
import { iconOptions } from '../shared/iconOptions'

export default defineType({
  name: 'timelineSection',
  title: 'Timeline',
  type: 'object',
  icon: () => '📅',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'items', title: 'Eventi' },
    { name: 'style', title: 'Stile' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'items',
      title: 'Eventi Timeline',
      type: 'array',
      group: 'items',
      of: [
        {
          type: 'object',
          name: 'timelineItem',
          title: 'Evento',
          icon: () => '📍',
          fields: [
            defineField({
              name: 'year',
              title: 'Anno / Data',
              type: 'string',
              description: 'Es: 1990, Gennaio 2020, Fase 1',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Titolo',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'localeText',
            }),
            defineField({
              name: 'image',
              title: 'Immagine',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              options: {
                list: iconOptions,
              },
            }),
            defineField({
              name: 'highlighted',
              title: 'Evidenziato',
              type: 'boolean',
              initialValue: false,
              description: 'Rende questo evento più visibile',
            }),
          ],
          preview: {
            select: {
              year: 'year',
              title: 'title.it',
              media: 'image',
            },
            prepare({ year, title, media }) {
              return {
                title: `${year} - ${title || 'Evento'}`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).error('Aggiungi almeno 2 eventi'),
    }),
    // Style
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Verticale Alternato', value: 'vertical-alternate' },
          { title: 'Verticale Sinistra', value: 'vertical-left' },
          { title: 'Verticale Destra', value: 'vertical-right' },
          { title: 'Orizzontale', value: 'horizontal' },
        ],
      },
      initialValue: 'vertical-alternate',
    }),
    defineField({
      name: 'lineColor',
      title: 'Colore Linea',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Primario', value: 'primary' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Gradiente', value: 'gradient' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'showImages',
      title: 'Mostra Immagini',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'animated',
      title: 'Animazione Scroll',
      type: 'boolean',
      group: 'style',
      initialValue: true,
      description: 'Gli eventi appaiono animati durante lo scroll',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray' },
          { title: 'Scuro', value: 'dark' },
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      title: 'title.it',
      items: 'items',
    },
    prepare({ title, items }) {
      const count = items?.length || 0
      return {
        title: title || 'Timeline',
        subtitle: `📅 ${count} eventi`,
      }
    },
  },
})
