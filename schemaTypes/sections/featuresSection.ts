// Sezione: Features/Caratteristiche
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featuresSection',
  title: 'Sezione Caratteristiche',
  type: 'object',
  icon: () => '✨',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Label Sezione',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'string' },
        { name: 'en', title: '🇬🇧', type: 'string' },
        { name: 'es', title: '🇪🇸', type: 'string' },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'string' },
        { name: 'en', title: '🇬🇧', type: 'string' },
        { name: 'es', title: '🇪🇸', type: 'string' },
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'text', rows: 2 },
        { name: 'en', title: '🇬🇧', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'items',
      title: 'Caratteristiche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icona', type: 'string', description: 'Nome icona (es: check, star, shield)' },
            {
              name: 'title',
              title: 'Titolo',
              type: 'object',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'object',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'text', rows: 2 },
                { name: 'en', title: '🇬🇧', type: 'text', rows: 2 },
                { name: 'es', title: '🇪🇸', type: 'text', rows: 2 },
              ],
            },
          ],
          preview: {
            select: { title: 'title.it' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.it', items: 'items' },
    prepare({ title, items }) {
      return { title: `✨ Caratteristiche: ${title || 'Senza titolo'} (${items?.length || 0})` }
    },
  },
})
