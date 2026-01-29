// Schema: Testimonial
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Recensioni',
  type: 'document',
  icon: () => '💬',

  fields: [
    defineField({
      name: 'author',
      title: 'Nome Cliente',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'company',
      title: 'Azienda',
      type: 'string',
    }),

    defineField({
      name: 'role',
      title: 'Ruolo',
      type: 'string',
    }),

    defineField({
      name: 'avatar',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'quote',
      title: 'Recensione',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'rating',
      title: 'Stelle',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'author',
      company: 'company',
      rating: 'rating',
      media: 'avatar',
    },
    prepare({ title, company, rating, media }) {
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: title || 'Senza nome',
        subtitle: `${company || ''} ${stars}`,
        media,
      }
    },
  },
})
