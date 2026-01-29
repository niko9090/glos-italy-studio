// Sezione: Statistiche
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Statistiche',
  type: 'object',
  icon: () => '📊',
  description: 'Mostra numeri e statistiche aziendali (es: 40+ anni, 500+ clienti)',

  fields: [
    defineField({
      name: 'items',
      title: 'Numeri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Numero', type: 'string', description: 'Es: 40+' },
            { name: 'label', title: 'Etichetta', type: 'string', description: 'Es: Anni di Esperienza' },
          ],
          preview: {
            select: { number: 'number', label: 'label' },
            prepare({ number, label }) {
              return { title: `${number} - ${label}` }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      return { title: `📊 Statistiche (${items?.length || 0})` }
    },
  },
})
