// Schema: Pagina
// Gestisce le pagine del sito (Home, Blender, Taglierine, etc.)

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pagine',
  type: 'document',
  icon: () => '📄',

  // Raggruppamento campi
  groups: [
    { name: 'info', title: '📋 Informazioni', default: true },
    { name: 'content', title: '📝 Contenuti' },
    { name: 'sections', title: '🧱 Sezioni' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'settings', title: '⚙️ Impostazioni' },
  ],

  fields: [
    // === IDENTIFICAZIONE ===
    defineField({
      name: 'title',
      title: 'Nome Pagina',
      type: 'string',
      description: 'Nome interno per identificare la pagina (visibile solo nel CMS)',
      placeholder: 'Es: Homepage, Chi Siamo, Contatti',
      validation: Rule => Rule.required().error('Il nome della pagina è obbligatorio'),
      group: 'info',
    }),

    defineField({
      name: 'slug',
      title: 'URL della Pagina',
      type: 'slug',
      description: 'L\'indirizzo web della pagina. Viene generato automaticamente dal nome. Per la homepage usa "home".',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[àáâãäå]/g, 'a')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/[òóôõö]/g, 'o')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[^a-z0-9\-]/g, ''),
      },
      validation: Rule => Rule.required().error('L\'URL è obbligatorio - clicca "Generate"'),
      group: 'info',
    }),

    // === CONTENUTO MULTILINGUA ===
    defineField({
      name: 'content',
      title: 'Contenuti della Pagina',
      type: 'object',
      description: 'Titoli e sottotitoli visibili sul sito',
      group: 'content',
      fields: [
        // Italiano
        defineField({
          name: 'it',
          title: '🇮🇹 Italiano',
          type: 'object',
          options: { collapsible: true, collapsed: false },
          fields: [
            {
              name: 'pageTitle',
              title: 'Titolo Pagina',
              type: 'string',
              description: 'Il titolo principale visibile sulla pagina',
              placeholder: 'Es: Benvenuti in GLOS Italy',
            },
            {
              name: 'pageSubtitle',
              title: 'Sottotitolo',
              type: 'text',
              rows: 2,
              description: 'Testo introduttivo sotto il titolo',
            },
            {
              name: 'metaTitle',
              title: 'SEO: Titolo Browser',
              type: 'string',
              description: 'Titolo che appare nella scheda del browser (max 60 caratteri)',
              validation: Rule => Rule.max(60).warning('Il titolo SEO dovrebbe essere massimo 60 caratteri'),
            },
            {
              name: 'metaDescription',
              title: 'SEO: Descrizione',
              type: 'text',
              rows: 3,
              description: 'Descrizione per i motori di ricerca (max 160 caratteri)',
              validation: Rule => Rule.max(160).warning('La descrizione SEO dovrebbe essere massimo 160 caratteri'),
            },
          ],
        }),
        // Inglese
        defineField({
          name: 'en',
          title: '🇬🇧 English',
          type: 'object',
          options: { collapsible: true, collapsed: true },
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
          options: { collapsible: true, collapsed: true },
          fields: [
            { name: 'pageTitle', title: 'Título Página', type: 'string' },
            { name: 'pageSubtitle', title: 'Subtítulo', type: 'text', rows: 2 },
            { name: 'metaTitle', title: 'SEO: Meta Title', type: 'string' },
            { name: 'metaDescription', title: 'SEO: Meta Description', type: 'text', rows: 3 },
          ],
        }),
      ],
    }),

    // === SEZIONI DELLA PAGINA ===
    defineField({
      name: 'sections',
      title: 'Sezioni della Pagina',
      type: 'array',
      description: 'Trascina le sezioni per riordinarle. Clicca "Add item" per aggiungere una nuova sezione.',
      group: 'sections',
      of: [
        { type: 'heroSection' },
        { type: 'statsSection' },
        { type: 'productsSection' },
        { type: 'featuresSection' },
        { type: 'gallerySection' },
        { type: 'ctaSection' },
        { type: 'contactSection' },
        { type: 'testimonialsSection' },
      ],
    }),

    // === SEO E SOCIAL ===
    defineField({
      name: 'ogImage',
      title: 'Immagine per Social Media',
      type: 'image',
      description: 'Immagine mostrata quando condividi la pagina su Facebook, LinkedIn, WhatsApp, ecc. Dimensioni consigliate: 1200x630 pixel',
      options: {
        hotspot: true,
      },
      group: 'seo',
    }),

    // === IMPOSTAZIONI ===
    defineField({
      name: 'isPublished',
      title: '✅ Pagina Visibile',
      type: 'boolean',
      description: 'Se disattivato, la pagina non sarà accessibile sul sito',
      initialValue: true,
      group: 'settings',
    }),

    defineField({
      name: 'menuOrder',
      title: '🔢 Ordine nel Menu',
      type: 'number',
      description: 'Posizione della pagina nel menu di navigazione. Numeri più bassi appaiono prima.',
      initialValue: 0,
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      published: 'isPublished',
      sectionsCount: 'sections',
      media: 'ogImage',
    },
    prepare({ title, slug, published, sectionsCount, media }) {
      const status = published ? '✅' : '⏸️'
      const sections = sectionsCount?.length || 0

      return {
        title: `${status} ${title}`,
        subtitle: `/${slug} • ${sections} sezioni`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Ordine Menu',
      name: 'menuOrderAsc',
      by: [{ field: 'menuOrder', direction: 'asc' }],
    },
    {
      title: 'Nome (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
