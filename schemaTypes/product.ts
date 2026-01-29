// Schema: Prodotto
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  icon: () => '📦',

  fields: [
    defineField({
      name: 'name',
      title: 'Nome Prodotto',
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
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),

    defineField({
      name: 'mainImage',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'shortDescription',
      title: 'Descrizione Breve',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'description',
      title: 'Descrizione Completa',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'specs',
      title: 'Specifiche Tecniche',
      type: 'text',
      rows: 5,
      description: 'Una specifica per riga',
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Mostra in Homepage',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isNew',
      title: 'Nuovo Prodotto',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category.name',
      media: 'mainImage',
      active: 'isActive',
    },
    prepare({ title, category, media, active }) {
      return {
        title: title,
        subtitle: `${category || 'Senza categoria'} ${active ? '✅' : '❌'}`,
        media,
      }
    },
  },
})
