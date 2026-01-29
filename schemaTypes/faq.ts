// Schema: FAQ
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: () => '❓',

  fields: [
    defineField({
      name: 'question',
      title: 'Domanda',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'answer',
      title: 'Risposta',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Generale', value: 'general' },
          { title: 'Prodotti', value: 'products' },
          { title: 'Spedizioni', value: 'shipping' },
        ],
      },
      initialValue: 'general',
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
      title: 'question',
      category: 'category',
      active: 'isActive',
    },
    prepare({ title, category, active }) {
      return {
        title: `${active ? '✅' : '❌'} ${title}`,
        subtitle: category,
      }
    },
  },
})
