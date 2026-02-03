// Download Section - Risorse scaricabili (cataloghi, PDF, etc.)
import { defineType, defineField } from 'sanity'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'downloadSection',
  title: 'Download',
  type: 'object',
  icon: () => '📥',
  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'files', title: '📁 File' },
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
      name: 'description',
      title: 'Descrizione',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'files',
      title: 'File Scaricabili',
      type: 'array',
      group: 'files',
      of: [
        {
          type: 'object',
          name: 'downloadItem',
          title: 'File',
          icon: () => '📄',
          fields: [
            defineField({
              name: 'title',
              title: 'Nome File',
              type: 'localeRichText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'localeText',
            }),
            defineField({
              name: 'file',
              title: 'File',
              type: 'file',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'thumbnail',
              title: 'Anteprima',
              type: 'image',
              description: 'Immagine di anteprima (opzionale)',
            }),
            defineField({
              name: 'fileType',
              title: 'Tipo File',
              type: 'string',
              options: {
                list: [
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Word', value: 'doc' },
                  { title: 'Excel', value: 'xls' },
                  { title: 'Immagine', value: 'image' },
                  { title: 'Video', value: 'video' },
                  { title: 'Archivio ZIP', value: 'zip' },
                  { title: 'Altro', value: 'other' },
                ],
              },
              initialValue: 'pdf',
            }),
            defineField({
              name: 'fileSize',
              title: 'Dimensione File',
              type: 'string',
              description: 'Es: 2.5 MB',
            }),
            defineField({
              name: 'category',
              title: 'Categoria',
              type: 'string',
              description: 'Per raggruppare i file',
            }),
          ],
          preview: {
            select: {
              title: 'title.it',
              fileType: 'fileType',
              thumbnail: 'thumbnail',
            },
            prepare({ title, fileType, thumbnail }) {
              const typeIcons: Record<string, string> = {
                pdf: '📕',
                doc: '📘',
                xls: '📗',
                image: '🖼️',
                video: '🎬',
                zip: '📦',
                other: '📄',
              }
              return {
                title: `${typeIcons[fileType] || '📄'} ${title || 'File'}`,
                media: thumbnail,
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
      name: 'fileNameSize',
      title: 'Dimensione Nomi File',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (14px)', value: 'sm' },
          { title: 'Normale (16px)', value: 'base' },
          { title: 'Grande (18px)', value: 'lg' },
        ],
      },
      initialValue: 'base',
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
          { title: 'Lista', value: 'list' },
          { title: 'Card Compatte', value: 'compact' },
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
      hidden: ({ parent }) => parent?.layout === 'list',
    }),
    defineField({
      name: 'showThumbnails',
      title: 'Mostra Anteprime',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'showFileSize',
      title: 'Mostra Dimensione',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'groupByCategory',
      title: 'Raggruppa per Categoria',
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
      files: 'files',
    },
    prepare({ title, files }) {
      const count = files?.length || 0
      return {
        title: title || 'Download',
        subtitle: `📥 ${count} file`,
      }
    },
  },
})
