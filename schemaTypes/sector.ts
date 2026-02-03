// Schema: Settore Applicazione
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sector',
  title: 'Settore Applicazione',
  type: 'document',
  icon: () => '🏭',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.it' },
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeText',
    }),
    defineField({
      name: 'icon',
      title: 'Icona',
      type: 'string',
      description: 'Emoji o nome icona',
    }),
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'color',
      title: 'Colore Accento',
      type: 'string',
      options: {
        list: [
          { title: 'Blu', value: 'blue' },
          { title: 'Verde', value: 'green' },
          { title: 'Arancione', value: 'orange' },
          { title: 'Grigio', value: 'gray' },
        ],
      },
    }),
    defineField({
      name: 'products',
      title: 'Prodotti Correlati',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name.it', icon: 'icon' },
    prepare: ({ title, icon }) => ({
      title: title || 'Settore senza nome',
      subtitle: icon,
    }),
  },
  orderings: [
    {
      title: 'Ordine',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name.it', direction: 'asc' }],
    },
  ],
})
