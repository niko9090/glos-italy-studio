// Schema: Categoria Prodotto
// Categorie: Blender, Taglierine, Accessori

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Categorie Prodotti',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome Categoria',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name.it',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 3 },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 3 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 3 },
      ],
    }),

    defineField({
      name: 'image',
      title: 'Immagine Categoria',
      type: 'image',
      options: { hotspot: true },
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
      title: 'name.it',
      media: 'image',
    },
  },
})
