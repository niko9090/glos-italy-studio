// Sezione: Hero (Banner principale) - VERSIONE AVANZATA
import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { getPlainText, truncate } from '../../lib/previewHelpers'

export default defineType({
  name: 'heroSection',
  title: 'Banner Principale',
  type: 'object',
  icon: HomeIcon,
  description: 'Il grande banner in cima alla pagina con titolo, sottotitolo e immagine di sfondo',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'buttons', title: '🔘 Pulsanti' },
    { name: 'media', title: '🖼️ Media' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'advanced', title: '⚙️ Avanzato' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta Sopra Titolo',
      type: 'localeString',
      description: 'Piccolo testo sopra il titolo. Es: "BENVENUTI", "DAL 1980"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo Principale',
      type: 'localeRichText',
      description: 'Il grande titolo che appare nel banner',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Testo descrittivo sotto il titolo',
      group: 'content',
    }),

    // === PULSANTI ===
    defineField({
      name: 'buttons',
      title: 'Pulsanti',
      type: 'array',
      group: 'buttons',
      description: 'Aggiungi fino a 2 pulsanti',
      validation: Rule => Rule.max(2),
      of: [{
        type: 'object',
        name: 'button',
        fields: [
          defineField({
            name: 'text',
            title: 'Testo',
            type: 'localeString',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'variant',
            title: 'Stile Pulsante',
            type: 'string',
            options: {
              list: [
                { title: 'Primario (pieno)', value: 'primary' },
                { title: 'Secondario (outline)', value: 'secondary' },
                { title: 'Bianco', value: 'white' },
                { title: 'Trasparente', value: 'ghost' },
              ],
            },
            initialValue: 'primary',
          }),
          defineField({
            name: 'icon',
            title: 'Icona',
            type: 'string',
            description: 'Nome icona o emoji. Es: arrow-right, download, 🚀',
          }),
          defineField({
            name: 'iconPosition',
            title: 'Posizione Icona',
            type: 'string',
            options: {
              list: [
                { title: 'Prima del testo', value: 'left' },
                { title: 'Dopo il testo', value: 'right' },
              ],
            },
            initialValue: 'right',
            hidden: ({ parent }) => !parent?.icon,
          }),
        ],
        preview: {
          select: { text: 'text.it', variant: 'variant' },
          prepare({ text, variant }) {
            return { title: text || 'Pulsante', subtitle: variant }
          },
        },
      }],
    }),

    // Mantieni compatibilità con vecchio schema
    defineField({
      name: 'buttonText',
      title: 'Testo del Pulsante (Legacy)',
      type: 'localeString',
      group: 'buttons',
      hidden: ({ parent }) => parent?.buttons?.length > 0,
    }),

    defineField({
      name: 'buttonLink',
      title: 'Link del Pulsante (Legacy)',
      type: 'string',
      group: 'buttons',
      hidden: ({ parent }) => parent?.buttons?.length > 0,
    }),

    // === MEDIA ===
    defineField({
      name: 'backgroundType',
      title: 'Tipo Sfondo',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Immagine', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Colore Solido', value: 'solid' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),

    defineField({
      name: 'backgroundImage',
      title: 'Immagine di Sfondo',
      type: 'image',
      description: 'Consigliato: 1920x1080 px o più grande',
      options: { hotspot: true },
      group: 'media',
      hidden: ({ parent }) => parent?.backgroundType !== 'image' && parent?.backgroundType !== undefined,
    }),

    defineField({
      name: 'backgroundVideo',
      title: 'Video di Sfondo',
      type: 'file',
      description: 'Video MP4 (max 10MB per prestazioni)',
      options: { accept: 'video/mp4' },
      group: 'media',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),

    defineField({
      name: 'backgroundGradient',
      title: 'Gradiente Sfondo',
      type: 'string',
      description: 'Seleziona il tipo di gradiente per lo sfondo',
      group: 'media',
      options: {
        list: [
          { title: 'Blu → Blu Scuro', value: 'blue-dark' },
          { title: 'Blu → Viola', value: 'blue-purple' },
          { title: 'Verde → Blu', value: 'green-blue' },
          { title: 'Arancione → Rosa', value: 'orange-pink' },
          { title: 'Nero → Grigio', value: 'black-gray' },
          { title: 'Radiale Blu', value: 'radial-blue' },
        ],
        layout: 'radio',
      },
      initialValue: 'blue-dark',
      hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Blu Scuro', value: 'dark-blue' },
          { title: 'Nero', value: 'black' },
          { title: 'Grigio Scuro', value: 'gray-dark' },
        ],
      },
      hidden: ({ parent }) => parent?.backgroundType !== 'solid',
    }),

    defineField({
      name: 'overlayType',
      title: 'Tipo Overlay',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Scuro Uniforme', value: 'dark' },
          { title: 'Gradiente da Sinistra', value: 'gradient-left' },
          { title: 'Gradiente da Destra', value: 'gradient-right' },
          { title: 'Gradiente dal Basso', value: 'gradient-bottom' },
          { title: 'Vignetta', value: 'vignette' },
        ],
      },
      initialValue: 'gradient-left',
    }),

    defineField({
      name: 'overlayOpacity',
      title: 'Opacità Overlay',
      type: 'number',
      description: '0 = trasparente, 100 = completamente scuro',
      group: 'media',
      initialValue: 50,
      validation: Rule => Rule.min(0).max(100),
      hidden: ({ parent }) => parent?.overlayType === 'none',
    }),

    // === LAYOUT ===
    defineField({
      name: 'height',
      title: 'Altezza',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Automatica', value: 'auto' },
          { title: 'Media (70vh)', value: 'medium' },
          { title: 'Grande (85vh)', value: 'large' },
          { title: 'Schermo Intero', value: 'full' },
          { title: 'Personalizzata', value: 'custom' },
        ],
      },
      initialValue: 'large',
    }),

    defineField({
      name: 'customHeight',
      title: 'Altezza Personalizzata (px)',
      type: 'number',
      group: 'layout',
      hidden: ({ parent }) => parent?.height !== 'custom',
      validation: Rule => Rule.min(200).max(1200),
    }),

    defineField({
      name: 'contentPosition',
      title: 'Posizione Contenuto',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Centro', value: 'center' },
          { title: 'Sinistra', value: 'left' },
          { title: 'Destra', value: 'right' },
          { title: 'In Basso a Sinistra', value: 'bottom-left' },
          { title: 'In Basso Centro', value: 'bottom-center' },
          { title: 'In Basso a Destra', value: 'bottom-right' },
        ],
      },
      initialValue: 'left',
    }),

    defineField({
      name: 'textAlign',
      title: 'Allineamento Testo',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Sinistra', value: 'left' },
          { title: 'Centro', value: 'center' },
          { title: 'Destra', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    }),

    defineField({
      name: 'contentWidth',
      title: 'Larghezza Contenuto',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Stretta (40%)', value: 'narrow' },
          { title: 'Media (60%)', value: 'medium' },
          { title: 'Larga (80%)', value: 'wide' },
          { title: 'Piena', value: 'full' },
        ],
      },
      initialValue: 'medium',
    }),

    // === STILE ===
    defineField({
      name: 'titleSize',
      title: 'Dimensione Titolo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Normale', value: 'normal' },
          { title: 'Grande', value: 'large' },
          { title: 'Extra Grande', value: 'xl' },
          { title: 'Gigante', value: 'xxl' },
        ],
      },
      initialValue: 'large',
    }),

    defineField({
      name: 'textColor',
      title: 'Colore Testo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Nero', value: 'black' },
          { title: 'Automatico (su sfondo)', value: 'auto' },
        ],
      },
      initialValue: 'white',
    }),

    defineField({
      name: 'animation',
      title: 'Animazione Entrata',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade In', value: 'fade' },
          { title: 'Slide dal Basso', value: 'slide-up' },
          { title: 'Slide da Sinistra', value: 'slide-left' },
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Typewriter', value: 'typewriter' },
        ],
      },
      initialValue: 'slide-up',
    }),

    defineField({
      name: 'parallax',
      title: 'Effetto Parallax',
      type: 'boolean',
      group: 'style',
      description: 'Effetto di profondità durante lo scroll',
      initialValue: true,
    }),

    // === AVANZATO ===
    defineField({
      name: 'showScrollIndicator',
      title: 'Mostra Freccia Scroll',
      type: 'boolean',
      group: 'advanced',
      description: 'Freccia animata che invita a scorrere',
      initialValue: true,
    }),

    defineField({
      name: 'scrollIndicatorText',
      title: 'Testo Scroll',
      type: 'localeString',
      group: 'advanced',
      description: 'Es: "Scorri per scoprire"',
      hidden: ({ parent }) => !parent?.showScrollIndicator,
    }),

    defineField({
      name: 'badge',
      title: 'Badge/Etichetta',
      type: 'object',
      group: 'advanced',
      description: 'Badge evidenziato (es: "Novità", "Offerta")',
      fields: [
        defineField({
          name: 'text',
          title: 'Testo',
          type: 'localeString',
        }),
        defineField({
          name: 'color',
          title: 'Colore',
          type: 'string',
          options: {
            list: [
              { title: 'Rosso', value: 'red' },
              { title: 'Verde', value: 'green' },
              { title: 'Blu', value: 'blue' },
              { title: 'Giallo', value: 'yellow' },
              { title: 'Viola', value: 'purple' },
            ],
          },
        }),
      ],
    }),

    defineField({
      name: 'floatingElements',
      title: 'Elementi Decorativi',
      type: 'array',
      group: 'advanced',
      description: 'Elementi grafici fluttuanti (cerchi, forme)',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'type',
            title: 'Tipo',
            type: 'string',
            options: {
              list: [
                { title: 'Cerchio', value: 'circle' },
                { title: 'Quadrato', value: 'square' },
                { title: 'Blob', value: 'blob' },
                { title: 'Linea', value: 'line' },
              ],
            },
          }),
          defineField({
            name: 'size',
            title: 'Dimensione',
            type: 'string',
            options: {
              list: [
                { title: 'Piccolo', value: 'sm' },
                { title: 'Medio', value: 'md' },
                { title: 'Grande', value: 'lg' },
              ],
            },
          }),
          defineField({
            name: 'position',
            title: 'Posizione',
            type: 'string',
            options: {
              list: [
                { title: 'Alto Sinistra', value: 'top-left' },
                { title: 'Alto Destra', value: 'top-right' },
                { title: 'Basso Sinistra', value: 'bottom-left' },
                { title: 'Basso Destra', value: 'bottom-right' },
              ],
            },
          }),
          defineField({
            name: 'color',
            title: 'Colore',
            type: 'string',
            options: {
              list: [
                { title: 'Primario', value: 'primary' },
                { title: 'Secondario', value: 'secondary' },
                { title: 'Bianco', value: 'white' },
                { title: 'Nero', value: 'black' },
              ],
            },
          }),
          defineField({
            name: 'opacity',
            title: 'Opacità',
            type: 'number',
            validation: Rule => Rule.min(10).max(100),
            initialValue: 20,
          }),
          defineField({
            name: 'animated',
            title: 'Animato',
            type: 'boolean',
            initialValue: true,
          }),
        ],
      }],
    }),
  ],

  preview: {
    select: { title: 'title.it', subtitle: 'subtitle.it', media: 'backgroundImage' },
    prepare({ title, subtitle, media }) {
      const titleText = getPlainText(title)
      const subtitleText = getPlainText(subtitle)
      return {
        title: `🎯 ${titleText || 'Banner Principale'}`,
        subtitle: subtitleText ? truncate(subtitleText, 50) : 'Banner senza descrizione',
        media,
      }
    },
  },
})
