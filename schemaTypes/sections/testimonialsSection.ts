// Sezione: Testimonianze
import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonianze',
  type: 'object',
  icon: UsersIcon,
  description: 'Mostra le recensioni e testimonianze dei clienti',

  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'testimonials', title: 'Testimonianze' },
    { name: 'layout', title: 'Layout' },
    { name: 'style', title: 'Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta',
      type: 'localeString',
      description: 'Es: "COSA DICONO DI NOI"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
      group: 'content',
    }),

    // === TESTIMONIANZE ===
    defineField({
      name: 'testimonials',
      title: 'Testimonianze',
      type: 'array',
      group: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Citazione',
              type: 'localeText',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Nome Autore',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Ruolo/Azienda',
              type: 'string',
            }),
            defineField({
              name: 'avatar',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'rating',
              title: 'Valutazione (stelle)',
              type: 'number',
              options: {
                list: [
                  { title: '⭐⭐⭐⭐⭐ 5 stelle', value: 5 },
                  { title: '⭐⭐⭐⭐ 4 stelle', value: 4 },
                  { title: '⭐⭐⭐ 3 stelle', value: 3 },
                ],
              },
              initialValue: 5,
            }),
            defineField({
              name: 'featured',
              title: 'In Evidenza',
              type: 'boolean',
              description: 'Mostra questa testimonianza più grande',
              initialValue: false,
            }),
          ],
          preview: {
            select: { author: 'author', role: 'role', avatar: 'avatar', rating: 'rating' },
            prepare({ author, role, avatar, rating }) {
              const stars = '⭐'.repeat(rating || 5)
              return {
                title: author || 'Cliente',
                subtitle: `${role || ''} ${stars}`,
                media: avatar,
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
          { title: 'Carosello', value: 'carousel' },
          { title: 'Griglia (2 colonne)', value: 'grid-2' },
          { title: 'Griglia (3 colonne)', value: 'grid-3' },
          { title: 'Lista verticale', value: 'list' },
          { title: 'Masonry', value: 'masonry' },
        ],
      },
      initialValue: 'carousel',
    }),

    defineField({
      name: 'showRating',
      title: 'Mostra Stelle',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),

    defineField({
      name: 'showAvatar',
      title: 'Mostra Foto',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),

    defineField({
      name: 'autoplay',
      title: 'Autoplay Carosello',
      type: 'boolean',
      group: 'layout',
      hidden: ({ parent }) => parent?.layout !== 'carousel',
      initialValue: true,
    }),

    // === STILE ===
    defineField({
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Card con ombra', value: 'shadow' },
          { title: 'Card con bordo', value: 'border' },
          { title: 'Glassmorphism', value: 'glass' },
          { title: 'Colorato', value: 'colored' },
        ],
      },
      initialValue: 'shadow',
    }),

    defineField({
      name: 'quoteStyle',
      title: 'Stile Citazione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Normale', value: 'normal' },
          { title: 'Con virgolette grandi', value: 'quotes' },
          { title: 'Corsivo', value: 'italic' },
          { title: 'Con icona citazione', value: 'icon' },
        ],
      },
      initialValue: 'quotes',
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
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Gradiente', value: 'gradient' },
        ],
      },
      initialValue: 'gray-light',
    }),
  ],

  preview: {
    select: { title: 'title.it', testimonials: 'testimonials', layout: 'layout' },
    prepare({ title, testimonials, layout }) {
      const titleText = getPlainText(title)
      const count = testimonials?.length || 0
      return {
        title: `💬 ${titleText || 'Testimonianze'}`,
        subtitle: `${count} testimonianze - ${layout}`,
      }
    },
  },
})
