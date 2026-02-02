// Icon Boxes Section - Griglia di box con icone
import { defineType, defineField } from 'sanity'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'iconBoxesSection',
  title: 'Box con Icone',
  type: 'object',
  icon: () => '🎯',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'boxes', title: 'Box' },
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
      name: 'boxes',
      title: 'Box',
      type: 'array',
      group: 'boxes',
      of: [
        {
          type: 'object',
          name: 'iconBox',
          title: 'Box',
          icon: () => '📦',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              options: {
                list: iconOptions,
              },
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
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL opzionale per rendere il box cliccabile',
            }),
            defineField({
              name: 'color',
              title: 'Colore Accento',
              type: 'string',
              options: {
                list: [
                  { title: 'Primario', value: 'primary' },
                  { title: 'Secondario', value: 'secondary' },
                  { title: 'Verde', value: 'green' },
                  { title: 'Blu', value: 'blue' },
                  { title: 'Viola', value: 'purple' },
                  { title: 'Arancione', value: 'orange' },
                  { title: 'Rosa', value: 'pink' },
                ],
              },
              initialValue: 'primary',
            }),
          ],
          preview: {
            select: {
              icon: 'icon',
              title: 'title.it',
            },
            prepare({ icon, title }) {
              return {
                title: `${icon || '📦'} ${title || 'Box'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).error('Aggiungi almeno 2 box'),
    }),
    // Style
    defineField({
      name: 'columns',
      title: 'Colonne',
      type: 'number',
      group: 'style',
      options: {
        list: [2, 3, 4, 6],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'boxStyle',
      title: 'Stile Box',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Semplice', value: 'simple' },
          { title: 'Card con Ombra', value: 'card' },
          { title: 'Bordo', value: 'bordered' },
          { title: 'Sfondo Colorato', value: 'filled' },
          { title: 'Icona Grande Centrata', value: 'icon-centered' },
        ],
      },
      initialValue: 'card',
    }),
    defineField({
      name: 'iconSize',
      title: 'Dimensione Icona',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Piccola', value: 'small' },
          { title: 'Media', value: 'medium' },
          { title: 'Grande', value: 'large' },
          { title: 'Extra Grande', value: 'xlarge' },
        ],
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'iconPosition',
      title: 'Posizione Icona',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Sopra', value: 'top' },
          { title: 'Sinistra', value: 'left' },
          { title: 'Centro', value: 'center' },
        ],
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'textAlign',
      title: 'Allineamento Testo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Sinistra', value: 'left' },
          { title: 'Centro', value: 'center' },
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Solleva', value: 'lift' },
          { title: 'Scala', value: 'scale' },
          { title: 'Bordo Colorato', value: 'border-color' },
          { title: 'Sfondo', value: 'background' },
        ],
      },
      initialValue: 'lift',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo Sezione',
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
      boxes: 'boxes',
    },
    prepare({ title, boxes }) {
      const count = boxes?.length || 0
      return {
        title: title || 'Box con Icone',
        subtitle: `🎯 ${count} box`,
      }
    },
  },
})
