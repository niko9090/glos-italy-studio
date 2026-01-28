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
      description: 'Nome interno del menu (non modificabile)',
    }),

    defineField({
      name: 'items',
      title: '📋 Voci del Menu',
      type: 'array',
      description: 'Trascina le voci per riordinarle. Clicca su una voce per modificarla.',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Voce Menu',
          fields: [
            {
              name: 'label',
              title: '🏷️ Testo del Link',
              type: 'object',
              description: 'Il testo visibile nel menu',
              fields: [
                { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Prodotti' },
                { name: 'en', title: '🇬🇧 English', type: 'string' },
                { name: 'es', title: '🇪🇸 Español', type: 'string' },
              ],
            },
            {
              name: 'href',
              title: '🔗 Destinazione (URL)',
              type: 'string',
              description: 'Pagina interna: /prodotti, /contatti | Pagina esterna: https://...',
              placeholder: '/prodotti',
              validation: Rule => Rule.required().error('L\'URL è obbligatorio'),
            },
            {
              name: 'target',
              title: '🪟 Apertura',
              type: 'string',
              description: 'Come aprire il link quando cliccato',
              options: {
                list: [
                  { title: '📄 Stessa finestra (default)', value: '_self' },
                  { title: '🆕 Nuova finestra/scheda', value: '_blank' },
                ],
                layout: 'radio',
              },
              initialValue: '_self',
            },
            {
              name: 'isActive',
              title: '👁️ Visibile nel Menu',
              type: 'boolean',
              description: 'Disattiva per nascondere temporaneamente senza eliminare',
              initialValue: true,
            },
            {
              name: 'children',
              title: '📂 Sottomenu (dropdown)',
              type: 'array',
              description: 'Voci che appariranno nel menu a tendina sotto questa voce',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Testo',
                      type: 'object',
                      fields: [
                        { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Blender GLOS' },
                        { name: 'en', title: '🇬🇧', type: 'string' },
                        { name: 'es', title: '🇪🇸', type: 'string' },
                      ],
                    },
                    {
                      name: 'href',
                      title: 'Destinazione',
                      type: 'string',
                      placeholder: '/prodotti/blender',
                    },
                    {
                      name: 'isActive',
                      title: 'Visibile',
                      type: 'boolean',
                      initialValue: true,
                    },
                  ],
                  preview: {
                    select: { title: 'label.it', href: 'href', active: 'isActive' },
                    prepare({ title, href, active }) {
                      return {
                        title: `${active ? '✅' : '❌'} ${title || 'Senza nome'}`,
                        subtitle: href,
                      }
                    },
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
              childrenCount: 'children',
            },
            prepare({ title, href, active, childrenCount }) {
              const hasChildren = childrenCount?.length > 0
              const status = active ? '✅' : '❌'
              const dropdown = hasChildren ? ` (📂 ${childrenCount.length})` : ''

              return {
                title: `${status} ${title || 'Senza nome'}${dropdown}`,
                subtitle: href,
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      const count = items?.length || 0
      const activeCount = items?.filter((i: any) => i.isActive).length || 0
      return {
        title: '🧭 Menu Principale',
        subtitle: `${activeCount} di ${count} voci attive`,
      }
    },
  },
})
