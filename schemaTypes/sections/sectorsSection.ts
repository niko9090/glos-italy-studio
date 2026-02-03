// Schema: Sezione Settori
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectorsSection',
  title: 'Sezione Settori',
  type: 'object',
  icon: () => '🏭',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
    }),
    defineField({
      name: 'sectors',
      title: 'Settori da Mostrare',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sector' }] }],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Griglia', value: 'grid' },
          { title: 'Carosello', value: 'carousel' },
          { title: 'Cards', value: 'cards' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'showAllLink',
      title: 'Mostra Link Vedi Tutti',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Scuro', value: 'dark' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title.it' },
    prepare: ({ title }) => ({
      title: title || 'Sezione Settori',
      subtitle: 'Settori Applicazione',
    }),
  },
})
