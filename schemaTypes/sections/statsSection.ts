// Sezione: Statistiche
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Sezione Statistiche',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'items',
      title: 'Statistiche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valore', type: 'string', description: 'Es: 40+, 1000, 99%' },
            { name: 'suffix', title: 'Suffisso', type: 'string', description: 'Es: +, %, K' },
            {
              name: 'label',
              title: 'Etichetta',
              type: 'object',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
          ],
          preview: {
            select: { value: 'value', label: 'label.it' },
            prepare({ value, label }) {
              return { title: `${value} - ${label}` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      return { title: `📊 Statistiche (${items?.length || 0} elementi)` }
    },
  },
})
