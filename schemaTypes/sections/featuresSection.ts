// Sezione: Caratteristiche
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'featuresSection',
  title: 'Caratteristiche',
  type: 'object',
  icon: BulbOutlineIcon,
  description: 'Lista di caratteristiche o punti di forza con immagine laterale',

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'content',
      title: 'Testi',
      default: true,
    },
    {
      name: 'features',
      title: 'Lista Punti',
    },
    {
      name: 'media',
      title: 'Immagine',
    },
  ],

  fields: [
    // === GRUPPO TESTI ===
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      description: 'Es: "Perche Scegliere GLOS" - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Breve introduzione - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    // === GRUPPO LISTA PUNTI ===
    defineField({
      name: 'items',
      title: 'Le Caratteristiche',
      type: 'array',
      description: 'Aggiungi i punti di forza o le caratteristiche (consigliato: 3-6 punti)',
      group: 'features',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Caratteristica',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              description: 'Emoji per questa caratteristica. Es: ✅, 🛡️, ⚡, 🎯',
            }),
            defineField({
              name: 'title',
              title: 'Titolo',
              type: 'localeString',
              description: 'Nome della caratteristica. Es: "Qualita Garantita"',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'localeText',
              description: 'Spiega questa caratteristica in 1-2 frasi',
            }),
          ],
          preview: {
            select: { title: 'title.it', icon: 'icon' },
            prepare({ title, icon }) {
              return {
                title: `${icon || '✨'} ${title || 'Caratteristica'}`,
              }
            },
          },
        }),
      ],
    }),

    // === GRUPPO IMMAGINE ===
    defineField({
      name: 'image',
      title: 'Immagine Laterale',
      type: 'image',
      description: 'Immagine che appare a fianco della lista. Consigliato: 800x600 px',
      options: { hotspot: true },
      group: 'media',
    }),

    defineField({
      name: 'imagePosition',
      title: 'Posizione Immagine',
      type: 'string',
      description: 'Dove posizionare l\'immagine rispetto al testo',
      group: 'media',
      options: {
        list: [
          { title: 'A sinistra', value: 'left' },
          { title: 'A destra', value: 'right' },
        ],
      },
      initialValue: 'right',
    }),
  ],

  preview: {
    select: { title: 'title.it', items: 'items' },
    prepare({ title, items }) {
      const count = items?.length || 0
      return {
        title: `✨ ${title || 'Caratteristiche'}`,
        subtitle: `${count} ${count === 1 ? 'punto' : 'punti'} di forza`,
      }
    },
  },
})
