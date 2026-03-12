// Schema: Video Community - VERSIONE SEMPLIFICATA
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'communityVideo',
  title: 'Video Community',
  type: 'document',
  icon: () => '🎬',

  groups: [
    { name: 'video', title: '🎬 Video', default: true },
    { name: 'comments', title: '💬 Commenti' },
  ],

  fields: [
    // ══════════════════════════════════════════════════════
    // VIDEO
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Titolo Video',
      type: 'string',
      group: 'video',
      description: 'Il titolo del video',
      validation: Rule => Rule.required().error('Il titolo e obbligatorio'),
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      group: 'video',
      rows: 3,
      description: 'Descrizione del contenuto del video',
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
      title: 'Link Video',
      type: 'url',
      group: 'video',
      description: 'Incolla il link di YouTube o Vimeo',
      hidden: ({ parent }) => parent?.videoType === 'file',
    }),

    defineField({
      name: 'videoFile',
      title: 'Carica Video',
      type: 'file',
      group: 'video',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.videoType !== 'file',
    }),

    defineField({
      name: 'thumbnail',
      title: 'Immagine Anteprima',
      type: 'image',
      group: 'video',
      description: 'Immagine che appare prima di riprodurre il video',
      options: { hotspot: true },
    }),

    defineField({
      name: 'author',
      title: 'Autore',
      type: 'string',
      group: 'video',
      description: 'Chi ha creato il video',
    }),

    defineField({
      name: 'duration',
      title: 'Durata',
      type: 'string',
      group: 'video',
      description: 'Es: 5:30',
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile',
      type: 'boolean',
      group: 'video',
      description: 'Il video e visibile sul sito',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'In Evidenza',
      type: 'boolean',
      group: 'video',
      description: 'Mostra in primo piano',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Data Pubblicazione',
      type: 'datetime',
      group: 'video',
      initialValue: () => new Date().toISOString(),
    }),

    // ══════════════════════════════════════════════════════
    // COMMENTI
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'allowComments',
      title: 'Permetti Commenti',
      type: 'boolean',
      group: 'comments',
      description: 'I visitatori possono commentare',
      initialValue: true,
    }),

    defineField({
      name: 'comments',
      title: 'Commenti',
      type: 'array',
      group: 'comments',
      description: 'Gestisci i commenti al video',
      of: [
        {
          type: 'object',
          name: 'comment',
          title: 'Commento',
          fields: [
            {
              name: 'authorName',
              title: 'Nome',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'content',
              title: 'Commento',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.required(),
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
              description: 'Visibile sul sito',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              author: 'authorName',
              content: 'content',
              approved: 'isApproved',
            },
            prepare({ author, content, approved }) {
              return {
                title: `${approved ? '✅' : '⏳'} ${author || 'Anonimo'}`,
                subtitle: content?.substring(0, 60) + '...',
              }
            },
          },
        },
      ],
    }),

    // ══════════════════════════════════════════════════════
    // CAMPI NASCOSTI (mantenuti per compatibilita)
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'linkedProduct',
      title: 'Prodotto Collegato',
      type: 'reference',
      to: [{ type: 'product' }],
      hidden: true,
    }),

    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      hidden: true,
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'viewCount',
      title: 'Visualizzazioni',
      type: 'number',
      hidden: true,
      initialValue: 0,
    }),

    defineField({
      name: 'sortOrder',
      title: 'Ordine',
      type: 'number',
      hidden: true,
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
      const typeIcon = videoType === 'youtube' ? '▶️' : videoType === 'vimeo' ? '🎥' : '📁'
      const commentCount = comments?.length || 0
      const approvedCount = comments?.filter((c: any) => c.isApproved)?.length || 0

      return {
        title: `${typeIcon} ${title || 'Senza titolo'} ${featured ? '⭐' : ''}`,
        subtitle: `${author || '-'} | 💬 ${approvedCount}/${commentCount} ${active ? '✅' : '❌'}`,
        media: thumbnail,
      }
    },
  },

  orderings: [
    {
      title: 'Piu recenti',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Titolo A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'In evidenza',
      name: 'featuredDesc',
      by: [{ field: 'isFeatured', direction: 'desc' }, { field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
