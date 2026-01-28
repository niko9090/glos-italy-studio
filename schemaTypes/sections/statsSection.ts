// Sezione: Statistiche
// Numeri e metriche aziendali con animazione contatore

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'statsSection',
  title: '📊 Sezione Statistiche',
  type: 'object',
  icon: () => '📊',
  description: 'Mostra numeri e metriche aziendali con animazione contatore',

  fields: [
    defineField({
      name: 'items',
      title: '📈 Statistiche',
      type: 'array',
      description: 'Aggiungi le statistiche da mostrare (consigliato: 3-4 elementi)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: '🔢 Numero',
              type: 'string',
              description: 'Il valore numerico. Puoi aggiungere suffissi come +, %, K',
              placeholder: 'Es: 500+, 40, 99%, 1K',
              validation: Rule => Rule.required().error('Il numero è obbligatorio'),
            },
            {
              name: 'label',
              title: '🏷️ Etichetta',
              type: 'object',
              description: 'Breve descrizione del numero',
              fields: [
                { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Anni di Esperienza' },
                { name: 'en', title: '🇬🇧 English', type: 'string' },
                { name: 'es', title: '🇪🇸 Español', type: 'string' },
              ],
            },
            {
              name: 'description',
              title: '📝 Descrizione (opzionale)',
              type: 'object',
              description: 'Testo aggiuntivo sotto l\'etichetta',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Dal 1980 al vostro servizio' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
          ],
          preview: {
            select: { number: 'number', label: 'label.it' },
            prepare({ number, label }) {
              return {
                title: `${number || '0'} - ${label || 'Senza etichetta'}`,
              }
            },
          },
        },
      ],
      validation: Rule => Rule.max(6).warning('Si consiglia di non superare 6 statistiche'),
    }),

    defineField({
      name: 'backgroundColor',
      title: '🎨 Colore Sfondo',
      type: 'string',
      description: 'Scegli il colore di sfondo della sezione',
      options: {
        list: [
          { title: '⚪ Chiaro (grigio leggero)', value: 'light' },
          { title: '⚫ Scuro (testo bianco)', value: 'dark' },
          { title: '🔵 Blu GLOS (testo bianco)', value: 'blue' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],

  preview: {
    select: { items: 'items', bg: 'backgroundColor' },
    prepare({ items, bg }) {
      const count = items?.length || 0
      const bgLabels: Record<string, string> = {
        light: '⚪',
        dark: '⚫',
        blue: '🔵',
      }
      return {
        title: `📊 Statistiche (${count} elementi)`,
        subtitle: `Sfondo: ${bgLabels[bg] || '⚪'}`,
      }
    },
  },
})
