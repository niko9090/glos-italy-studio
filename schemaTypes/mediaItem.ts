// Schema: Media Item
// Libreria media centralizzata

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mediaItem',
  title: 'Libreria Media',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
    }),

    defineField({
      name: 'file',
      title: 'File',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
    }),

    defineField({
      name: 'alt',
      title: 'Testo Alternativo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    defineField({
      name: 'caption',
      title: 'Didascalia',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 2 },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'folder',
      title: 'Cartella',
      type: 'string',
      options: {
        list: [
          { title: 'Prodotti', value: 'products' },
          { title: 'Hero', value: 'hero' },
          { title: 'Galleria', value: 'gallery' },
          { title: 'Team', value: 'team' },
          { title: 'Blog', value: 'blog' },
          { title: 'Altro', value: 'other' },
        ],
      },
      initialValue: 'other',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      folder: 'folder',
      media: 'file',
    },
    prepare({ title, folder, media }) {
      return {
        title: title || 'Senza titolo',
        subtitle: folder,
        media,
      }
    },
  },
})
