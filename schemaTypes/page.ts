// Schema: Pagina
import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Pagine',
  type: 'document',
  icon: DocumentIcon,

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'content',
      title: 'Contenuto',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Impostazioni',
    },
  ],

  fields: [
    // === GRUPPO CONTENUTO ===
    defineField({
      name: 'title',
      title: 'Nome Pagina',
      type: 'string',
      description: 'Il nome della pagina (visibile nel browser e nel menu)',
      group: 'content',
      validation: Rule => Rule.required().error('Il nome della pagina è obbligatorio'),
    }),

    defineField({
      name: 'description',
      title: 'Descrizione Pagina',
      type: 'localeText',
      description: 'Breve descrizione della pagina (opzionale)',
      group: 'content',
    }),

    defineField({
      name: 'sections',
      title: 'Sezioni della Pagina',
      type: 'array',
      description: '🔄 Trascina le sezioni per riordinarle. Clicca per modificare.',
      group: 'content',
      options: {
        sortable: true,
      },
      of: [
        { type: 'heroSection', title: '🎯 Banner Principale' },
        { type: 'statsSection', title: '📊 Statistiche' },
        { type: 'productsSection', title: '📦 Prodotti' },
        { type: 'featuresSection', title: '✨ Caratteristiche' },
        { type: 'gallerySection', title: '🖼️ Galleria' },
        { type: 'ctaSection', title: '📢 Invito all\'Azione' },
        { type: 'contactSection', title: '📞 Contatti' },
      ],
    }),

    // === GRUPPO SEO ===
    defineField({
      name: 'slug',
      title: 'URL della Pagina',
      type: 'slug',
      description: 'L\'indirizzo web della pagina. Clicca "Generate" per crearlo automaticamente dal nome.',
      group: 'seo',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .slice(0, 96),
      },
      validation: Rule => Rule.required().error('L\'URL è obbligatorio'),
    }),

    defineField({
      name: 'seoTitle',
      title: 'Titolo SEO',
      type: 'string',
      description: 'Titolo per i motori di ricerca (Google). Se vuoto, usa il nome pagina.',
      group: 'seo',
    }),

    defineField({
      name: 'seoDescription',
      title: 'Descrizione SEO',
      type: 'text',
      description: 'Descrizione che appare nei risultati di Google (max 160 caratteri)',
      group: 'seo',
      rows: 3,
      validation: Rule => Rule.max(160).warning('La descrizione SEO dovrebbe essere max 160 caratteri'),
    }),

    // === GRUPPO IMPOSTAZIONI ===
    defineField({
      name: 'isPublished',
      title: 'Pagina Attiva',
      type: 'boolean',
      description: 'Se disattivata, la pagina non sarà visibile sul sito',
      group: 'settings',
      initialValue: true,
    }),

    defineField({
      name: 'showInNavigation',
      title: 'Mostra nel Menu',
      type: 'boolean',
      description: 'Se attivo, la pagina apparirà nel menu di navigazione',
      group: 'settings',
      initialValue: false,
    }),

    defineField({
      name: 'navigationOrder',
      title: 'Ordine nel Menu',
      type: 'number',
      description: 'Numero per ordinare la pagina nel menu (1 = primo)',
      group: 'settings',
      initialValue: 99,
      hidden: ({ parent }) => !parent?.showInNavigation,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      published: 'isPublished',
      sections: 'sections',
    },
    prepare({ title, slug, published, sections }) {
      const sectionCount = sections?.length || 0
      return {
        title: title || 'Pagina senza nome',
        subtitle: `/${slug || ''} • ${sectionCount} sezioni ${published ? '✅' : '❌ Bozza'}`,
      }
    },
  },

  // Ordine dei campi nel pannello laterale
  orderings: [
    {
      title: 'Nome A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Ultima modifica',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
})
