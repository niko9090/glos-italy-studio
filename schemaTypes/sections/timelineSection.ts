// Timeline Section - Storia aziendale, processi, step
import { defineType, defineField } from 'sanity'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'timelineSection',
  title: 'Timeline',
  type: 'object',
  icon: () => '📅',
  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'items', title: '📍 Eventi' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
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
              type: 'localeRichText',
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

    // === TIPOGRAFIA ===
    defineField({
      name: 'titleSize',
      title: 'Dimensione Titolo Sezione',
      type: 'string',
      group: 'typography',
      options: { list: titleSizeOptions },
      initialValue: 'lg',
    }),

    defineField({
      name: 'titleWeight',
      title: 'Peso Titolo',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    }),

    defineField({
      name: 'titleColor',
      title: 'Colore Titolo',
      type: 'string',
      group: 'typography',
      options: { list: textColorOptions },
    }),

    defineField({
      name: 'yearSize',
      title: 'Dimensione Anno/Data',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (14px)', value: 'sm' },
          { title: 'Normale (18px)', value: 'lg' },
          { title: 'Grande (24px)', value: 'xl' },
          { title: 'Extra Grande (32px)', value: '2xl' },
        ],
      },
      initialValue: 'xl',
    }),

    defineField({
      name: 'yearWeight',
      title: 'Peso Anno/Data',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    }),

    defineField({
      name: 'eventTitleSize',
      title: 'Dimensione Titolo Evento',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (16px)', value: 'base' },
          { title: 'Normale (18px)', value: 'lg' },
          { title: 'Grande (20px)', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'descriptionSize',
      title: 'Dimensione Descrizione',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (14px)', value: 'sm' },
          { title: 'Normale (16px)', value: 'base' },
          { title: 'Grande (18px)', value: 'lg' },
        ],
      },
      initialValue: 'base',
    }),

    // === STILE ===
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
    defineField({
      name: 'paddingTop',
      title: 'Spaziatura Sopra',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Spaziatura Sotto',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'marginTop',
      title: 'Margine Sopra',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
    }),
    defineField({
      name: 'marginBottom',
      title: 'Margine Sotto',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
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
