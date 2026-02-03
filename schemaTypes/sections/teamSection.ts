// Team Section - Membri del team
import { defineType, defineField } from 'sanity'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { animationOptions, hoverEffectOptions } from '../shared/animationOptions'
import { cardStyleOptions } from '../shared/styleOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'teamSection',
  title: 'Team',
  type: 'object',
  icon: () => '👥',
  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'members', title: '👥 Membri' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
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
              type: 'localeRichText',
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
    // === TIPOGRAFIA ===
    defineField({
      name: 'titleSize',
      title: 'Dimensione Titolo',
      type: 'string',
      group: 'typography',
      options: { list: titleSizeOptions },
      initialValue: 'lg',
    }),

    defineField({
      name: 'titleWeight',
      title: 'Peso Titolo',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    }),

    defineField({
      name: 'titleColor',
      title: 'Colore Titolo',
      type: 'string',
      group: 'typography',
      options: { list: textColorOptions },
    }),

    defineField({
      name: 'nameSize',
      title: 'Dimensione Nomi',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (16px)', value: 'sm' },
          { title: 'Normale (18px)', value: 'base' },
          { title: 'Grande (20px)', value: 'lg' },
          { title: 'Extra Large (24px)', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'roleSize',
      title: 'Dimensione Ruoli',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (12px)', value: 'xs' },
          { title: 'Normale (14px)', value: 'sm' },
          { title: 'Grande (16px)', value: 'base' },
        ],
      },
      initialValue: 'sm',
    }),

    // === STILE ===
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
    defineField({
      name: 'paddingTop',
      title: 'Spaziatura Sopra',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Spaziatura Sotto',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'marginTop',
      title: 'Margine Sopra',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
    }),
    defineField({
      name: 'marginBottom',
      title: 'Margine Sotto',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
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
