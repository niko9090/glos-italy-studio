// Schema: Testimonial
// Recensioni e testimonianze clienti

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'author',
      title: 'Autore',
      type: 'object',
      fields: [
        { name: 'name', title: 'Nome', type: 'string' },
        { name: 'role', title: 'Ruolo', type: 'string' },
        { name: 'company', title: 'Azienda', type: 'string' },
        { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } },
      ],
    }),

    defineField({
      name: 'content',
      title: 'Testimonianza',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 4 },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 4 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 4 },
      ],
    }),

    defineField({
      name: 'rating',
      title: 'Valutazione',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      name: 'author.name',
      company: 'author.company',
      rating: 'rating',
      media: 'author.image',
    },
    prepare({ name, company, rating, media }) {
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: name || 'Senza nome',
        subtitle: `${company || ''} ${stars}`,
        media,
      }
    },
  },
})
