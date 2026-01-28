// Schema: Navigazione
// Menu principale del sito

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigazione',
  type: 'document',
  icon: () => '🧭',
  fields: [
    defineField({
      name: 'title',
      title: 'Identificativo Menu',
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
          title: 'Voce Menu',
          fields: [
            {
              name: 'label',
              title: 'Testo',
              type: 'object',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Es: /blender-glos o https://example.com',
            },
            {
              name: 'target',
              title: 'Apri in',
              type: 'string',
              options: {
                list: [
                  { title: 'Stessa finestra', value: '_self' },
                  { title: 'Nuova finestra', value: '_blank' },
                ],
              },
              initialValue: '_self',
            },
            {
              name: 'isActive',
              title: 'Visibile',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'children',
              title: 'Sottomenu',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Testo',
                      type: 'object',
                      fields: [
                        { name: 'it', title: '🇮🇹', type: 'string' },
                        { name: 'en', title: '🇬🇧', type: 'string' },
                        { name: 'es', title: '🇪🇸', type: 'string' },
                      ],
                    },
                    { name: 'href', title: 'Link', type: 'string' },
                    { name: 'isActive', title: 'Visibile', type: 'boolean', initialValue: true },
                  ],
                  preview: {
                    select: { title: 'label.it' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label.it',
              href: 'href',
              active: 'isActive',
            },
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
        title: '🧭 Menu Principale',
        subtitle: 'Gestione navigazione',
      }
    },
  },
})
