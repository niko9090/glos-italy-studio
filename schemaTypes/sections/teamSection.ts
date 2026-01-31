// Team Section - Membri del team
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamSection',
  title: 'Team',
  type: 'object',
  icon: () => '👥',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'members', title: 'Membri' },
    { name: 'style', title: 'Stile' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'members',
      title: 'Membri del Team',
      type: 'array',
      group: 'members',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Membro',
          icon: () => '👤',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Ruolo',
              type: 'localeString',
            }),
            defineField({
              name: 'photo',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'bio',
              title: 'Biografia',
              type: 'localeText',
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'email',
            }),
            defineField({
              name: 'phone',
              title: 'Telefono',
              type: 'string',
            }),
            defineField({
              name: 'linkedin',
              title: 'LinkedIn',
              type: 'url',
            }),
            defineField({
              name: 'twitter',
              title: 'Twitter/X',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              role: 'role.it',
              media: 'photo',
            },
            prepare({ name, role, media }) {
              return {
                title: name || 'Membro',
                subtitle: role,
                media,
              }
            },
          },
        },
      ],
    }),
    // Style
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Griglia', value: 'grid' },
          { title: 'Carosello', value: 'carousel' },
          { title: 'Lista', value: 'list' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'columns',
      title: 'Colonne',
      type: 'number',
      group: 'style',
      options: {
        list: [2, 3, 4],
      },
      initialValue: 3,
      hidden: ({ parent }) => parent?.layout !== 'grid',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Semplice', value: 'simple' },
          { title: 'Con Bordo', value: 'bordered' },
          { title: 'Con Ombra', value: 'shadow' },
          { title: 'Sfondo Colorato', value: 'colored' },
        ],
      },
      initialValue: 'shadow',
    }),
    defineField({
      name: 'photoShape',
      title: 'Forma Foto',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Cerchio', value: 'circle' },
          { title: 'Quadrato', value: 'square' },
          { title: 'Arrotondato', value: 'rounded' },
        ],
      },
      initialValue: 'circle',
    }),
    defineField({
      name: 'showSocial',
      title: 'Mostra Social',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'showBio',
      title: 'Mostra Biografia',
      type: 'boolean',
      group: 'style',
      initialValue: false,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray' },
          { title: 'Scuro', value: 'dark' },
        ],
      },
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      title: 'title.it',
      members: 'members',
    },
    prepare({ title, members }) {
      const count = members?.length || 0
      return {
        title: title || 'Team',
        subtitle: `👥 ${count} membri`,
      }
    },
  },
})
