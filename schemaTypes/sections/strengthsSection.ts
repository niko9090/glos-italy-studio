// Schema: Sezione Punti di Forza
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'strengthsSection',
  title: 'Sezione Punti di Forza',
  type: 'object',
  icon: () => '💪',
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
      name: 'items',
      title: 'Punti di Forza',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'strengthItem',
          title: 'Punto di Forza',
          fields: [
            {
              name: 'icon',
              title: 'Icona',
              type: 'string',
              description: 'Emoji o nome icona',
            },
            {
              name: 'title',
              title: 'Titolo',
              type: 'localeString',
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'localeText',
            },
          ],
          preview: {
            select: { title: 'title.it', icon: 'icon' },
            prepare: ({ title, icon }) => ({
              title: title || 'Punto di forza',
              media: () => icon || '💪',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Griglia', value: 'grid' },
          { title: 'Lista', value: 'list' },
          { title: 'Solo Icone', value: 'icons' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Primario', value: 'primary' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title.it' },
    prepare: ({ title }) => ({
      title: title || 'Punti di Forza',
      subtitle: 'Sezione Punti di Forza',
    }),
  },
})
