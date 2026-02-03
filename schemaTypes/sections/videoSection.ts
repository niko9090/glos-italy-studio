// Video Section - Embed video YouTube/Vimeo o self-hosted
import { defineType, defineField } from 'sanity'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'videoSection',
  title: 'Video',
  type: 'object',
  icon: () => '🎬',
  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'video', title: '🎬 Video' },
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
      description: 'Testo opzionale sotto il video',
    }),
    // Video
    defineField({
      name: 'videoType',
      title: 'Tipo Video',
      type: 'string',
      group: 'video',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'File Caricato', value: 'file' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'URL YouTube',
      type: 'url',
      group: 'video',
      description: 'Es: https://www.youtube.com/watch?v=xxxxx',
      hidden: ({ parent }) => parent?.videoType !== 'youtube',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string }
          if (parent?.videoType === 'youtube' && !value) {
            return 'Inserisci l\'URL del video YouTube'
          }
          return true
        }),
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'URL Vimeo',
      type: 'url',
      group: 'video',
      description: 'Es: https://vimeo.com/xxxxx',
      hidden: ({ parent }) => parent?.videoType !== 'vimeo',
    }),
    defineField({
      name: 'videoFile',
      title: 'File Video',
      type: 'file',
      group: 'video',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.videoType !== 'file',
    }),
    defineField({
      name: 'poster',
      title: 'Immagine di Anteprima',
      type: 'image',
      group: 'video',
      options: { hotspot: true },
      description: 'Immagine mostrata prima della riproduzione',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay (muto)',
      type: 'boolean',
      group: 'video',
      initialValue: false,
      description: 'Il video parte automaticamente (senza audio)',
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      group: 'video',
      initialValue: false,
    }),
    defineField({
      name: 'controls',
      title: 'Mostra Controlli',
      type: 'boolean',
      group: 'video',
      initialValue: true,
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
      name: 'subtitleSize',
      title: 'Dimensione Sottotitolo',
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

    defineField({
      name: 'descriptionSize',
      title: 'Dimensione Descrizione',
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
          { title: 'Centrato', value: 'centered' },
          { title: 'Piena Larghezza', value: 'full-width' },
          { title: 'Con Testo a Lato', value: 'side-text' },
        ],
      },
      initialValue: 'centered',
    }),
    defineField({
      name: 'textPosition',
      title: 'Posizione Testo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Sinistra', value: 'left' },
          { title: 'Destra', value: 'right' },
        ],
      },
      initialValue: 'left',
      hidden: ({ parent }) => parent?.layout !== 'side-text',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Proporzioni',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: '16:9 (Standard)', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '1:1 (Quadrato)', value: '1/1' },
          { title: '21:9 (Cinematico)', value: '21/9' },
        ],
      },
      initialValue: '16/9',
    }),
    defineField({
      name: 'rounded',
      title: 'Bordi Arrotondati',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'shadow',
      title: 'Ombra',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo Sezione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray' },
          { title: 'Scuro', value: 'dark' },
        ],
      },
      initialValue: 'white',
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
      videoType: 'videoType',
      poster: 'poster',
    },
    prepare({ title, videoType, poster }) {
      const typeLabels: Record<string, string> = {
        youtube: 'YouTube',
        vimeo: 'Vimeo',
        file: 'File',
      }
      return {
        title: title || 'Video',
        subtitle: `🎬 ${typeLabels[videoType] || 'Video'}`,
        media: poster,
      }
    },
  },
})
