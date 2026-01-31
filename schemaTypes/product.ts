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
      type: 'richText',
      description: 'Breve descrizione - puoi usare grassetto, colori, ecc.',
    }),

    defineField({
      name: 'fullDescription',
      title: 'Descrizione Completa',
      type: 'richText',
      description: 'Descrizione dettagliata - puoi usare grassetto, colori, ecc.',
    }),

    defineField({
      name: 'specifications',
      title: 'Specifiche Tecniche',
      type: 'array',
      description: 'Aggiungi le specifiche del prodotto',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Nome',
              type: 'string',
              description: 'Es: Peso, Dimensioni, Materiale',
            },
            {
              name: 'value',
              title: 'Valore',
              type: 'string',
              description: 'Es: 500g, 30x20cm, Acciaio inox',
            },
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare({ label, value }) {
              return { title: `${label}: ${value}` }
            },
          },
        },
      ],
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
