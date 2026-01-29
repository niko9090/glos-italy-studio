// Schema: Pagina
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pagine',
  type: 'document',
  icon: () => '📄',

  fields: [
    defineField({
      name: 'title',
      title: 'Nome Pagina',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'Clicca "Generate" per creare automaticamente',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'sections',
      title: 'Sezioni della Pagina',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'statsSection' },
        { type: 'productsSection' },
        { type: 'featuresSection' },
        { type: 'gallerySection' },
        { type: 'ctaSection' },
        { type: 'contactSection' },
      ],
    }),

    defineField({
      name: 'isPublished',
      title: 'Pagina Attiva',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      published: 'isPublished',
    },
    prepare({ title, slug, published }) {
      return {
        title: title,
        subtitle: `/${slug || ''} ${published ? '✅' : '❌'}`,
      }
    },
  },
})
