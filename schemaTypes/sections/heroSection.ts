// Sezione: Hero (Banner principale) - VERSIONE AVANZATA
import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { getPlainText, truncate } from '../../lib/previewHelpers'
import { iconOptionsCompact } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { animationOptions, hoverEffectOptions, animationSpeedOptions } from '../shared/animationOptions'
import { gradientOptions } from '../shared/styleOptions'

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
    { name: 'layout', title: '📐 Layout', hidden: true },
    { name: 'style', title: '🎨 Stile', hidden: true },
    { name: 'effects', title: '✨ Effetti Moderni', hidden: true },
    { name: 'advanced', title: '⚙️ Avanzato', hidden: true },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta Sopra Titolo',
      type: 'localeRichText',
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
            type: 'localeRichText',
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
            options: {
              list: iconOptionsCompact,
            },
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
            const textValue = getPlainText(text)
            return { title: textValue || 'Pulsante', subtitle: variant }
          },
        },
      }],
    }),

    // Mantieni compatibilità con vecchio schema
    defineField({
      name: 'buttonText',
      title: 'Testo del Pulsante (Legacy)',
      type: 'localeRichText',
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
          // Blu
          { title: '🔵 Blu → Blu Scuro', value: 'blue-dark' },
          { title: '🔵 Blu → Viola', value: 'blue-purple' },
          { title: '🔵 Ciano → Blu', value: 'cyan-blue' },
          { title: '🔵 Indaco → Viola', value: 'indigo-purple' },
          { title: '🔵 Navy → Blu', value: 'navy-blue' },
          { title: '🔵 Radiale Blu', value: 'radial-blue' },
          // Verde
          { title: '🟢 Verde → Blu', value: 'green-blue' },
          { title: '🟢 Verde → Giallo', value: 'green-yellow' },
          { title: '🟢 Verde Acqua → Verde', value: 'teal-green' },
          { title: '🟢 Smeraldo → Ciano', value: 'emerald-cyan' },
          // Rosso/Arancione
          { title: '🔴 Rosso → Arancione', value: 'red-orange' },
          { title: '🔴 Rosso → Rosa', value: 'red-pink' },
          { title: '🟠 Arancione → Rosa', value: 'orange-pink' },
          { title: '🟠 Oro → Arancione', value: 'gold-orange' },
          { title: '🟠 Pesca → Rosa', value: 'peach-pink' },
          // Viola/Rosa
          { title: '🟣 Viola → Blu', value: 'purple-blue' },
          { title: '🟣 Rosa → Viola', value: 'pink-purple' },
          { title: '🟣 Magenta → Viola', value: 'magenta-purple' },
          { title: '🟣 Lavanda → Rosa', value: 'lavender-pink' },
          // Scuri
          { title: '⚫ Nero → Grigio', value: 'black-gray' },
          { title: '⚫ Nero → Blu', value: 'black-blue' },
          { title: '⚫ Nero → Viola', value: 'black-purple' },
          { title: '⚫ Carbone → Grigio', value: 'charcoal-gray' },
          // Temi speciali
          { title: '🌅 Tramonto', value: 'sunset' },
          { title: '🌊 Oceano', value: 'ocean' },
          { title: '🌲 Foresta', value: 'forest' },
          { title: '🔥 Fuoco', value: 'fire' },
          { title: '🌙 Notte Stellata', value: 'night' },
          { title: '🌈 Aurora Boreale', value: 'aurora' },
          { title: '☀️ Alba', value: 'dawn' },
          { title: '🍇 Uva', value: 'grape' },
        ],
        layout: 'dropdown',
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
          // Blu
          { title: '🔵 Blu GLOS', value: 'primary' },
          { title: '🔵 Blu Scuro', value: 'dark-blue' },
          { title: '🔵 Blu Navy', value: 'navy' },
          { title: '🔵 Blu Cielo', value: 'sky-blue' },
          { title: '🔵 Ciano', value: 'cyan' },
          { title: '🔵 Indaco', value: 'indigo' },
          // Verde
          { title: '🟢 Verde', value: 'green' },
          { title: '🟢 Verde Scuro', value: 'dark-green' },
          { title: '🟢 Verde Acqua', value: 'teal' },
          { title: '🟢 Smeraldo', value: 'emerald' },
          { title: '🟢 Lime', value: 'lime' },
          // Rosso/Arancione
          { title: '🔴 Rosso', value: 'red' },
          { title: '🔴 Rosso Scuro', value: 'dark-red' },
          { title: '🔴 Bordeaux', value: 'bordeaux' },
          { title: '🟠 Arancione', value: 'orange' },
          { title: '🟠 Ambra', value: 'amber' },
          // Viola/Rosa
          { title: '🟣 Viola', value: 'purple' },
          { title: '🟣 Viola Scuro', value: 'dark-purple' },
          { title: '💜 Magenta', value: 'magenta' },
          { title: '🩷 Rosa', value: 'pink' },
          { title: '🩷 Rosa Scuro', value: 'dark-pink' },
          { title: '🩷 Fucsia', value: 'fuchsia' },
          // Neutri
          { title: '⚫ Nero', value: 'black' },
          { title: '⚫ Grigio Scuro', value: 'gray-dark' },
          { title: '⚫ Grigio', value: 'gray' },
          { title: '⚫ Antracite', value: 'charcoal' },
          { title: '🟤 Marrone', value: 'brown' },
          { title: '🟤 Marrone Scuro', value: 'dark-brown' },
          // Altri
          { title: '🟡 Giallo', value: 'yellow' },
          { title: '🟡 Oro', value: 'gold' },
          { title: '⚪ Bianco', value: 'white' },
          { title: '⚪ Crema', value: 'cream' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'primary',
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

    defineField({
      name: 'paddingTop',
      title: 'Spaziatura Sopra',
      type: 'string',
      group: 'layout',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Spaziatura Sotto',
      type: 'string',
      group: 'layout',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'marginTop',
      title: 'Margine Sopra',
      type: 'string',
      group: 'layout',
      options: { list: marginOptions },
      initialValue: 'none',
    }),
    defineField({
      name: 'marginBottom',
      title: 'Margine Sotto',
      type: 'string',
      group: 'layout',
      options: { list: marginOptions },
      initialValue: 'none',
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

    defineField({
      name: 'parallaxIntensity',
      title: 'Intensità Parallax',
      type: 'string',
      group: 'style',
      description: 'Quanto è visibile l\'effetto parallax',
      options: {
        list: [
          { title: 'Sottile (15%)', value: 'subtle' },
          { title: 'Normale (20%)', value: 'normal' },
          { title: 'Forte (30%)', value: 'strong' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'subtle',
      hidden: ({ parent }) => !parent?.parallax,
    }),

    // === EFFETTI MODERNI ===
    defineField({
      name: 'showFloatingParticles',
      title: 'Particelle Fluttuanti',
      type: 'boolean',
      group: 'effects',
      description: 'Mostra particelle animate sullo sfondo (attivo di default)',
      initialValue: true,
    }),

    defineField({
      name: 'particleCount',
      title: 'Numero Particelle',
      type: 'number',
      group: 'effects',
      description: 'Quante particelle mostrare (3-10)',
      initialValue: 6,
      validation: Rule => Rule.min(3).max(10),
      hidden: ({ parent }) => !parent?.showFloatingParticles,
    }),

    defineField({
      name: 'showGlowLines',
      title: 'Linee Luminose',
      type: 'boolean',
      group: 'effects',
      description: 'Mostra linee decorative animate in basso',
      initialValue: true,
    }),

    defineField({
      name: 'buttonGlowOnHover',
      title: 'Glow sui Bottoni',
      type: 'boolean',
      group: 'effects',
      description: 'Effetto bagliore sui bottoni quando ci passi sopra',
      initialValue: true,
    }),

    defineField({
      name: 'titleTextShadow',
      title: 'Ombra sul Titolo',
      type: 'boolean',
      group: 'effects',
      description: 'Aggiunge ombra al titolo per maggiore impatto',
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
      type: 'localeRichText',
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
          type: 'localeRichText',
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
