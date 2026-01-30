// Sezione: Statistiche
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BarChartIcon } from '@sanity/icons'

export default defineType({
  name: 'statsSection',
  title: 'Statistiche',
  type: 'object',
  icon: BarChartIcon,
  description: 'Mostra numeri e statistiche aziendali (es: 40+ anni, 500+ clienti)',

  fields: [
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeString',
      description: 'Titolo opzionale sopra le statistiche',
    }),

    defineField({
      name: 'items',
      title: 'I Tuoi Numeri',
      type: 'array',
      description: 'Aggiungi le statistiche da mostrare (consigliato: 3-4 numeri)',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Statistica',
          fields: [
            defineField({
              name: 'number',
              title: 'Numero',
              type: 'string',
              description: 'Il valore numerico. Es: "40+", "500", "100%"',
              validation: Rule => Rule.required().error('Inserisci un numero'),
            }),
            defineField({
              name: 'label',
              title: 'Descrizione',
              type: 'localeString',
              description: 'Cosa rappresenta questo numero. Es: "Anni di Esperienza", "Clienti Soddisfatti"',
            }),
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              description: 'Emoji opzionale. Es: 📅, 👥, ✅, 🏆',
            }),
          ],
          preview: {
            select: { number: 'number', label: 'label.it', icon: 'icon' },
            prepare({ number, label, icon }) {
              return {
                title: `${icon || '📊'} ${number}`,
                subtitle: label || 'Senza etichetta',
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      description: 'Scegli un colore di sfondo per questa sezione',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray' },
          { title: 'Blu Scuro', value: 'dark' },
          { title: 'Blu GLOS', value: 'primary' },
        ],
      },
      initialValue: 'white',
    }),
  ],

  preview: {
    select: { items: 'items', title: 'title.it' },
    prepare({ items, title }) {
      const count = items?.length || 0
      return {
        title: `📊 ${title || 'Statistiche'}`,
        subtitle: `${count} ${count === 1 ? 'numero' : 'numeri'} da mostrare`,
      }
    },
  },
})
