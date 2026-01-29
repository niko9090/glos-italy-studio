// Schema: Navigazione
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Menu',
  type: 'document',
  icon: () => '🧭',

  fields: [
    defineField({
      name: 'title',
      title: 'Nome Menu',
      type: 'string',
      initialValue: 'Menu Principale',
      readOnly: true,
    }),

    defineField({
      name: 'items',
      title: 'Voci Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            { name: 'label', title: 'Testo', type: 'string' },
            { name: 'href', title: 'Link', type: 'string', description: 'Es: /prodotti' },
            { name: 'isActive', title: 'Visibile', type: 'boolean', initialValue: true },
          ],
          preview: {
            select: { title: 'label', href: 'href', active: 'isActive' },
            prepare({ title, href, active }) {
              return {
                title: `${active ? '✅' : '❌'} ${title}`,
                subtitle: href,
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Menu Principale',
      }
    },
  },
})
