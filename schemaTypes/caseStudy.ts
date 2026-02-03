// Schema: Case Study
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: () => '📋',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.it' },
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'sector',
      title: 'Settore',
      type: 'reference',
      to: [{ type: 'sector' }],
    }),
    defineField({
      name: 'products',
      title: 'Prodotti Utilizzati',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'challenge',
      title: 'La Sfida',
      type: 'localeText',
    }),
    defineField({
      name: 'solution',
      title: 'La Soluzione',
      type: 'localeText',
    }),
    defineField({
      name: 'results',
      title: 'I Risultati',
      type: 'localeText',
    }),
    defineField({
      name: 'stats',
      title: 'Statistiche',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Statistica',
          fields: [
            {
              name: 'number',
              title: 'Numero',
              type: 'string',
            },
            {
              name: 'label',
              title: 'Etichetta',
              type: 'string',
            },
          ],
          preview: {
            select: { number: 'number', label: 'label' },
            prepare: ({ number, label }) => ({
              title: `${number || '?'} - ${label || 'Senza etichetta'}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galleria',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonianza',
      type: 'text',
    }),
    defineField({
      name: 'testimonialAuthor',
      title: 'Autore Testimonianza',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'In Evidenza',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data Pubblicazione',
      type: 'date',
    }),
  ],
  preview: {
    select: { title: 'title.it', client: 'client', featured: 'featured' },
    prepare: ({ title, client, featured }) => ({
      title: title || 'Case Study senza titolo',
      subtitle: `${client || 'Cliente N/D'}${featured ? ' ⭐' : ''}`,
    }),
  },
  orderings: [
    {
      title: 'Data pubblicazione',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Titolo A-Z',
      name: 'titleAsc',
      by: [{ field: 'title.it', direction: 'asc' }],
    },
  ],
})
