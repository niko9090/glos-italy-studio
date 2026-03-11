// Schema: Video Community con Commenti
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'communityVideo',
  title: 'Video Community',
  type: 'document',
  icon: () => '🎬',

  groups: [
    { name: 'video', title: 'Video', default: true },
    { name: 'comments', title: 'Commenti' },
    { name: 'settings', title: 'Impostazioni' },
  ],

  fields: [
    // === VIDEO ===
    defineField({
      name: 'title',
      title: 'Titolo Video',
      type: 'string',
      group: 'video',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      group: 'video',
      rows: 3,
    }),

    defineField({
      name: 'videoType',
      title: 'Tipo Video',
      type: 'string',
      group: 'video',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'File caricato', value: 'file' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
    }),

    defineField({
      name: 'videoUrl',
      title: 'URL Video',
      type: 'url',
      group: 'video',
      description: 'URL di YouTube o Vimeo (es: https://www.youtube.com/watch?v=...)',
      hidden: ({ parent }) => parent?.videoType === 'file',
    }),

    defineField({
      name: 'videoFile',
      title: 'File Video',
      type: 'file',
      group: 'video',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.videoType !== 'file',
    }),

    defineField({
      name: 'thumbnail',
      title: 'Anteprima',
      type: 'image',
      group: 'video',
      description: 'Immagine di anteprima (opzionale, altrimenti usa quella del video)',
      options: { hotspot: true },
    }),

    defineField({
      name: 'duration',
      title: 'Durata',
      type: 'string',
      group: 'video',
      description: 'Es: 5:30, 12:45',
    }),

    defineField({
      name: 'author',
      title: 'Autore',
      type: 'string',
      group: 'video',
      description: 'Nome di chi ha caricato il video',
    }),

    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      group: 'video',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Parole chiave per la ricerca',
    }),

    defineField({
      name: 'linkedProduct',
      title: 'Prodotto Mostrato',
      type: 'reference',
      to: [{ type: 'product' }],
      group: 'video',
      description: 'Se il video mostra un prodotto specifico',
    }),

    // === COMMENTI ===
    defineField({
      name: 'comments',
      title: 'Commenti',
      type: 'array',
      group: 'comments',
      of: [
        {
          type: 'object',
          name: 'comment',
          title: 'Commento',
          fields: [
            {
              name: 'authorName',
              title: 'Nome Autore',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'authorEmail',
              title: 'Email Autore',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Testo Commento',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            },
            {
              name: 'rating',
              title: 'Valutazione',
              type: 'number',
              description: 'Da 1 a 5 stelle',
              options: {
                list: [
                  { title: '⭐', value: 1 },
                  { title: '⭐⭐', value: 2 },
                  { title: '⭐⭐⭐', value: 3 },
                  { title: '⭐⭐⭐⭐', value: 4 },
                  { title: '⭐⭐⭐⭐⭐', value: 5 },
                ],
              },
            },
            {
              name: 'createdAt',
              title: 'Data',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
            },
            {
              name: 'isApproved',
              title: 'Approvato',
              type: 'boolean',
              description: 'Il commento e visibile sul sito',
              initialValue: false,
            },
            {
              name: 'isHighlighted',
              title: 'In Evidenza',
              type: 'boolean',
              description: 'Mostra in primo piano',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              author: 'authorName',
              content: 'content',
              rating: 'rating',
              approved: 'isApproved',
              highlighted: 'isHighlighted',
            },
            prepare({ author, content, rating, approved, highlighted }) {
              const stars = rating ? '⭐'.repeat(rating) : ''
              const status = approved ? '✅' : '⏳'
              const highlight = highlighted ? '📌' : ''
              return {
                title: `${author} ${stars} ${highlight}`,
                subtitle: `${status} ${content?.substring(0, 50)}...`,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'allowComments',
      title: 'Permetti Commenti',
      type: 'boolean',
      group: 'comments',
      description: 'Se disabilitato, i visitatori non possono commentare',
      initialValue: true,
    }),

    // === IMPOSTAZIONI ===
    defineField({
      name: 'publishedAt',
      title: 'Data Pubblicazione',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'In Evidenza',
      type: 'boolean',
      group: 'settings',
      description: 'Mostra nella homepage community',
      initialValue: false,
    }),

    defineField({
      name: 'viewCount',
      title: 'Visualizzazioni',
      type: 'number',
      group: 'settings',
      description: 'Numero di visualizzazioni',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'sortOrder',
      title: 'Ordine',
      type: 'number',
      group: 'settings',
      description: 'Numero per ordinare (1 = primo)',
      initialValue: 99,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author',
      thumbnail: 'thumbnail',
      active: 'isActive',
      featured: 'isFeatured',
      comments: 'comments',
      videoType: 'videoType',
    },
    prepare({ title, author, thumbnail, active, featured, comments, videoType }) {
      const badges = []
      if (featured) badges.push('⭐')
      const commentCount = comments?.length || 0
      const approvedCount = comments?.filter((c: any) => c.isApproved)?.length || 0
      const typeIcon = videoType === 'youtube' ? '▶️' : videoType === 'vimeo' ? '🎥' : '📁'
      return {
        title: `${typeIcon} ${title}`,
        subtitle: `${author || 'Senza autore'} | 💬 ${approvedCount}/${commentCount} commenti ${active ? '✅' : '❌'} ${badges.join('')}`,
        media: thumbnail,
      }
    },
  },

  orderings: [
    {
      title: 'Data (recenti)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Titolo A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Piu visualizzati',
      name: 'viewCountDesc',
      by: [{ field: 'viewCount', direction: 'desc' }],
    },
    {
      title: 'In evidenza',
      name: 'featuredDesc',
      by: [{ field: 'isFeatured', direction: 'desc' }, { field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
