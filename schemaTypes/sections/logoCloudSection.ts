// Sezione: Logo Cloud (Partner/Clienti)
import { defineType, defineField, defineArrayMember } from 'sanity'
import { StackCompactIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'

export default defineType({
  name: 'logoCloudSection',
  title: 'Loghi Partner/Clienti',
  type: 'object',
  icon: StackCompactIcon,
  description: 'Mostra i loghi dei partner, clienti o certificazioni',

  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'logos', title: 'Loghi' },
    { name: 'layout', title: 'Layout' },
    { name: 'style', title: 'Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta',
      type: 'localeString',
      description: 'Es: "I NOSTRI PARTNER", "CLIENTI CHE CI HANNO SCELTO"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      group: 'content',
    }),

    // === LOGHI ===
    defineField({
      name: 'logos',
      title: 'Loghi',
      type: 'array',
      group: 'logos',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'logo',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Nome Azienda',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link (opzionale)',
              type: 'url',
            }),
          ],
          preview: {
            select: { name: 'name', image: 'image' },
            prepare({ name, image }) {
              return {
                title: name || 'Logo',
                media: image,
              }
            },
          },
        }),
      ],
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Griglia fissa', value: 'grid' },
          { title: 'Fila scorrevole', value: 'marquee' },
          { title: 'Fila scorrevole infinita', value: 'marquee-infinite' },
          { title: 'Carosello', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
    }),

    defineField({
      name: 'columns',
      title: 'Numero Colonne',
      type: 'number',
      group: 'layout',
      hidden: ({ parent }) => parent?.layout !== 'grid',
      options: {
        list: [
          { title: '3 colonne', value: 3 },
          { title: '4 colonne', value: 4 },
          { title: '5 colonne', value: 5 },
          { title: '6 colonne', value: 6 },
        ],
      },
      initialValue: 5,
    }),

    defineField({
      name: 'speed',
      title: 'Velocità Scorrimento',
      type: 'string',
      group: 'layout',
      hidden: ({ parent }) => !parent?.layout?.includes('marquee'),
      options: {
        list: [
          { title: 'Lenta', value: 'slow' },
          { title: 'Normale', value: 'normal' },
          { title: 'Veloce', value: 'fast' },
        ],
      },
      initialValue: 'normal',
    }),

    // === STILE ===
    defineField({
      name: 'logoSize',
      title: 'Dimensione Loghi',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Piccoli', value: 'small' },
          { title: 'Medi', value: 'medium' },
          { title: 'Grandi', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),

    defineField({
      name: 'grayscale',
      title: 'Bianco e Nero',
      type: 'boolean',
      description: 'Mostra i loghi in bianco e nero (colore al hover)',
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
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Trasparente', value: 'transparent' },
        ],
      },
      initialValue: 'white',
    }),

    defineField({
      name: 'showBorder',
      title: 'Bordo Sopra/Sotto',
      type: 'boolean',
      group: 'style',
      initialValue: false,
    }),
  ],

  preview: {
    select: { title: 'title.it', logos: 'logos', layout: 'layout' },
    prepare({ title, logos, layout }) {
      const titleText = getPlainText(title)
      const count = logos?.length || 0
      return {
        title: `🏢 ${titleText || 'Loghi Partner'}`,
        subtitle: `${count} loghi - ${layout}`,
      }
    },
  },
})
