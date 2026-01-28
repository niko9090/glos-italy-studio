// Schema: FAQ
// Domande frequenti

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
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'answer',
      title: 'Risposta',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 4 },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 4 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 4 },
      ],
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
          { title: 'Ordini', value: 'orders' },
          { title: 'Spedizioni', value: 'shipping' },
          { title: 'Assistenza', value: 'support' },
        ],
      },
      initialValue: 'general',
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile',
      type: 'boolean',
      initialValue: true,
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
      title: 'question.it',
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
