// Schema: Categoria Prodotto
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Categorie',
  type: 'document',
  icon: () => '🏷️',

  fields: [
    defineField({
      name: 'name',
      title: 'Nome Categoria',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'Clicca "Generate" per creare automaticamente',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
