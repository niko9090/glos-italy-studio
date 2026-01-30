// Sezione: Galleria
import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export default defineType({
  name: 'gallerySection',
  title: 'Galleria Immagini',
  type: 'object',
  icon: ImagesIcon,
  description: 'Galleria fotografica con lightbox per vedere le immagini ingrandite',

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'content',
      title: 'Testi',
      default: true,
    },
    {
      name: 'images',
      title: 'Immagini',
    },
    {
      name: 'display',
      title: 'Visualizzazione',
    },
  ],

  fields: [
    // === GRUPPO TESTI ===
    defineField({
      name: 'title',
      title: 'Titolo Galleria',
      type: 'localeString',
      description: 'Es: "La Nostra Galleria", "I Nostri Lavori", "Foto Prodotti"',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
      description: 'Breve descrizione della galleria',
      group: 'content',
    }),

    // === GRUPPO IMMAGINI ===
    defineField({
      name: 'images',
      title: 'Le Immagini',
      type: 'array',
      description: 'Carica le foto. Trascina per riordinare. Consigliato: 6-12 immagini',
      group: 'images',
      of: [
        {
          type: 'image',
          title: 'Foto',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Didascalia',
              type: 'localeString',
              description: 'Descrizione breve della foto (opzionale)',
            },
            {
              name: 'alt',
              title: 'Testo Alternativo',
              type: 'string',
              description: 'Descrizione per accessibilità e SEO',
            },
          ],
        },
      ],
      validation: Rule => Rule.min(1).error('Aggiungi almeno un\'immagine'),
    }),

    // === GRUPPO VISUALIZZAZIONE ===
    defineField({
      name: 'columns',
      title: 'Colonne',
      type: 'number',
      description: 'Quante immagini per riga (su desktop)',
      group: 'display',
      options: {
        list: [
          { title: '2 colonne', value: 2 },
          { title: '3 colonne', value: 3 },
          { title: '4 colonne', value: 4 },
        ],
      },
      initialValue: 3,
    }),

    defineField({
      name: 'showCaptions',
      title: 'Mostra Didascalie',
      type: 'boolean',
      description: 'Visualizza le didascalie sotto ogni immagine',
      group: 'display',
      initialValue: true,
    }),

    defineField({
      name: 'enableLightbox',
      title: 'Abilita Ingrandimento',
      type: 'boolean',
      description: 'Permette di cliccare sulle immagini per vederle a schermo intero',
      group: 'display',
      initialValue: true,
    }),
  ],

  preview: {
    select: { title: 'title.it', images: 'images' },
    prepare({ title, images }) {
      const count = images?.length || 0
      return {
        title: `🖼️ ${title || 'Galleria'}`,
        subtitle: `${count} ${count === 1 ? 'immagine' : 'immagini'}`,
      }
    },
  },
})
