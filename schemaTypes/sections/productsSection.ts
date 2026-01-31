// Sezione: Prodotti
import { defineType, defineField } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
  name: 'productsSection',
  title: 'Sezione Prodotti',
  type: 'object',
  icon: PackageIcon,
  description: 'Griglia con i prodotti in evidenza del catalogo',

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'content',
      title: 'Testi',
      default: true,
    },
    {
      name: 'display',
      title: 'Visualizzazione',
    },
    {
      name: 'action',
      title: 'Pulsante',
    },
  ],

  fields: [
    // === GRUPPO TESTI ===
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      description: 'Es: "I Nostri Prodotti" - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Breve descrizione - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    // === GRUPPO VISUALIZZAZIONE ===
    defineField({
      name: 'showFeatured',
      title: 'Solo Prodotti in Evidenza',
      type: 'boolean',
      description: 'Mostra solo i prodotti marcati come "in evidenza" nel catalogo',
      group: 'display',
      initialValue: true,
    }),

    defineField({
      name: 'limit',
      title: 'Numero di Prodotti',
      type: 'number',
      description: 'Quanti prodotti mostrare (consigliato: 3, 4 o 6)',
      group: 'display',
      initialValue: 6,
      options: {
        list: [
          { title: '3 prodotti', value: 3 },
          { title: '4 prodotti', value: 4 },
          { title: '6 prodotti', value: 6 },
          { title: '8 prodotti', value: 8 },
          { title: 'Tutti', value: 99 },
        ],
      },
    }),

    defineField({
      name: 'layout',
      title: 'Disposizione',
      type: 'string',
      description: 'Come disporre i prodotti nella griglia',
      group: 'display',
      options: {
        list: [
          { title: 'Griglia (3 colonne)', value: 'grid' },
          { title: 'Lista', value: 'list' },
          { title: 'Carosello', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
    }),

    // === GRUPPO PULSANTE ===
    defineField({
      name: 'buttonText',
      title: 'Testo Pulsante',
      type: 'localeString',
      description: 'Es: "Vedi Tutti i Prodotti", "Scopri il Catalogo"',
      group: 'action',
    }),

    defineField({
      name: 'buttonLink',
      title: 'Link Pulsante',
      type: 'string',
      description: 'Dove porta il pulsante. Es: /prodotti, /catalogo',
      group: 'action',
    }),
  ],

  preview: {
    select: { title: 'title.it', limit: 'limit', featured: 'showFeatured' },
    prepare({ title, limit, featured }) {
      return {
        title: `📦 ${title || 'Prodotti'}`,
        subtitle: `${limit || 6} prodotti ${featured ? '(solo in evidenza)' : ''}`,
      }
    },
  },
})
