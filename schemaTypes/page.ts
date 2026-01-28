// Schema: Pagina
// Gestisce le pagine del sito (Home, Blender, Taglierine, etc.)

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pagine',
  type: 'document',
  icon: () => '📄',
  fields: [
    // Identificazione
    defineField({
      name: 'title',
      title: 'Titolo Interno',
      type: 'string',
      description: 'Nome per identificare la pagina (non visibile sul sito)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    // Contenuto multilingua
    defineField({
      name: 'content',
      title: 'Contenuto',
      type: 'object',
      fields: [
        // Italiano
        defineField({
          name: 'it',
          title: '🇮🇹 Italiano',
          type: 'object',
          fields: [
            { name: 'pageTitle', title: 'Titolo Pagina', type: 'string' },
            { name: 'pageSubtitle', title: 'Sottotitolo', type: 'text', rows: 2 },
            { name: 'metaTitle', title: 'SEO: Meta Title', type: 'string' },
            { name: 'metaDescription', title: 'SEO: Meta Description', type: 'text', rows: 3 },
          ],
        }),
        // Inglese
        defineField({
          name: 'en',
          title: '🇬🇧 English',
          type: 'object',
          fields: [
            { name: 'pageTitle', title: 'Page Title', type: 'string' },
            { name: 'pageSubtitle', title: 'Subtitle', type: 'text', rows: 2 },
            { name: 'metaTitle', title: 'SEO: Meta Title', type: 'string' },
            { name: 'metaDescription', title: 'SEO: Meta Description', type: 'text', rows: 3 },
          ],
        }),
        // Spagnolo
        defineField({
          name: 'es',
          title: '🇪🇸 Español',
          type: 'object',
          fields: [
            { name: 'pageTitle', title: 'Título Página', type: 'string' },
            { name: 'pageSubtitle', title: 'Subtítulo', type: 'text', rows: 2 },
            { name: 'metaTitle', title: 'SEO: Meta Title', type: 'string' },
            { name: 'metaDescription', title: 'SEO: Meta Description', type: 'text', rows: 3 },
          ],
        }),
      ],
    }),

    // Sezioni della pagina
    defineField({
      name: 'sections',
      title: 'Sezioni',
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

    // Immagine OG per social
    defineField({
      name: 'ogImage',
      title: 'Immagine Social (OG Image)',
      type: 'image',
      description: 'Immagine mostrata quando condividi su Facebook, LinkedIn, etc. (1200x630px)',
      options: {
        hotspot: true,
      },
    }),

    // Stato pubblicazione
    defineField({
      name: 'isPublished',
      title: 'Pubblicata',
      type: 'boolean',
      initialValue: true,
    }),

    // Ordine nel menu
    defineField({
      name: 'menuOrder',
      title: 'Ordine nel Menu',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      published: 'isPublished',
    },
    prepare({ title, subtitle, published }) {
      return {
        title: `${published ? '✅' : '⏸️'} ${title}`,
        subtitle: `/${subtitle}`,
      }
    },
  },

  orderings: [
    {
      title: 'Ordine Menu',
      name: 'menuOrderAsc',
      by: [{ field: 'menuOrder', direction: 'asc' }],
    },
  ],
})
