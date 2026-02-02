// Tabs Section - Contenuti a schede
import { defineType, defineField } from 'sanity'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'tabsSection',
  title: 'Schede (Tabs)',
  type: 'object',
  icon: () => '📑',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'tabs', title: 'Schede' },
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
      name: 'tabs',
      title: 'Schede',
      type: 'array',
      group: 'tabs',
      of: [
        {
          type: 'object',
          name: 'tab',
          title: 'Scheda',
          icon: () => '📄',
          fields: [
            defineField({
              name: 'label',
              title: 'Etichetta Tab',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
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
              name: 'content',
              title: 'Contenuto',
              type: 'localeRichText',
            }),
            defineField({
              name: 'image',
              title: 'Immagine',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'features',
              title: 'Lista Caratteristiche',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'text', title: 'Testo', type: 'localeString' },
                    { name: 'icon', title: 'Icona', type: 'string', options: { list: iconOptions } },
                  ],
                  preview: {
                    select: { text: 'text.it' },
                    prepare({ text }) {
                      return { title: text || 'Caratteristica' }
                    },
                  },
                },
              ],
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
          ],
          preview: {
            select: {
              label: 'label.it',
              icon: 'icon',
            },
            prepare({ label, icon }) {
              return {
                title: `${icon || '📄'} ${label || 'Scheda'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).error('Aggiungi almeno 2 schede'),
    }),
    // Style
    defineField({
      name: 'tabStyle',
      title: 'Stile Tabs',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Pill (arrotondati)', value: 'pills' },
          { title: 'Sottolineato', value: 'underlined' },
          { title: 'Boxed', value: 'boxed' },
          { title: 'Verticale', value: 'vertical' },
        ],
      },
      initialValue: 'pills',
    }),
    defineField({
      name: 'contentLayout',
      title: 'Layout Contenuto',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Solo Testo', value: 'text-only' },
          { title: 'Testo + Immagine', value: 'text-image' },
          { title: 'Immagine + Testo', value: 'image-text' },
        ],
      },
      initialValue: 'text-image',
    }),
    defineField({
      name: 'animated',
      title: 'Transizione Animata',
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
      tabs: 'tabs',
    },
    prepare({ title, tabs }) {
      const count = tabs?.length || 0
      return {
        title: title || 'Schede',
        subtitle: `📑 ${count} tabs`,
      }
    },
  },
})
