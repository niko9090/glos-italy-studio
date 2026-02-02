// Before/After Section - Confronto immagini con slider
import { defineType, defineField } from 'sanity'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'beforeAfterSection',
  title: 'Prima/Dopo',
  type: 'object',
  icon: () => '🔄',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'images', title: 'Immagini' },
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
      name: 'description',
      title: 'Descrizione',
      type: 'localeRichText',
      group: 'content',
    }),
    // Images
    defineField({
      name: 'comparisons',
      title: 'Confronti',
      type: 'array',
      group: 'images',
      of: [
        {
          type: 'object',
          name: 'comparison',
          title: 'Confronto',
          icon: () => '↔️',
          fields: [
            defineField({
              name: 'beforeImage',
              title: 'Immagine PRIMA',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'beforeLabel',
              title: 'Etichetta Prima',
              type: 'string',
              initialValue: 'Prima',
            }),
            defineField({
              name: 'afterImage',
              title: 'Immagine DOPO',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'afterLabel',
              title: 'Etichetta Dopo',
              type: 'string',
              initialValue: 'Dopo',
            }),
            defineField({
              name: 'caption',
              title: 'Didascalia',
              type: 'localeString',
            }),
          ],
          preview: {
            select: {
              before: 'beforeImage',
              caption: 'caption.it',
            },
            prepare({ before, caption }) {
              return {
                title: caption || 'Confronto Prima/Dopo',
                media: before,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Aggiungi almeno un confronto'),
    }),
    // Style
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Slider Orizzontale', value: 'slider-horizontal' },
          { title: 'Slider Verticale', value: 'slider-vertical' },
          { title: 'Affiancate', value: 'side-by-side' },
          { title: 'Griglia', value: 'grid' },
        ],
      },
      initialValue: 'slider-horizontal',
    }),
    defineField({
      name: 'sliderPosition',
      title: 'Posizione Iniziale Slider',
      type: 'number',
      group: 'style',
      description: 'Percentuale (0-100)',
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(100),
      hidden: ({ parent }) => !parent?.layout?.startsWith('slider'),
    }),
    defineField({
      name: 'showLabels',
      title: 'Mostra Etichette',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Proporzioni',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: '16:9', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '1:1', value: '1/1' },
          { title: '3:2', value: '3/2' },
        ],
      },
      initialValue: '16/9',
    }),
    defineField({
      name: 'rounded',
      title: 'Bordi Arrotondati',
      type: 'boolean',
      group: 'style',
      initialValue: true,
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
      initialValue: 'gray',
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
      comparisons: 'comparisons',
    },
    prepare({ title, comparisons }) {
      const count = comparisons?.length || 0
      return {
        title: title || 'Prima/Dopo',
        subtitle: `🔄 ${count} confronti`,
      }
    },
  },
})
