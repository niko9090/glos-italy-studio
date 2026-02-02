// Carousel Section - VERSIONE AVANZATA con layout multipli
import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'carouselSection',
  title: 'Carosello',
  type: 'object',
  icon: PlayIcon,
  description: 'Slider di immagini/contenuti con molteplici layout e stili',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'slides', title: '🖼️ Slide' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'navigation', title: '🎮 Navigazione' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'animation', title: '✨ Animazioni' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      group: 'content',
      description: 'Titolo opzionale sopra il carosello',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      group: 'content',
    }),

    // === SLIDE ===
    defineField({
      name: 'slides',
      title: 'Slide',
      type: 'array',
      group: 'slides',
      description: 'Aggiungi le slide del carosello',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          icon: () => '🖼️',
          groups: [
            { name: 'media', title: 'Media', default: true },
            { name: 'content', title: 'Contenuto' },
            { name: 'style', title: 'Stile' },
          ],
          fields: [
            defineField({
              name: 'image',
              title: 'Immagine',
              type: 'image',
              options: { hotspot: true },
              group: 'media',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'video',
              title: 'Video (alternativo)',
              type: 'string',
              group: 'media',
              description: 'URL YouTube o Vimeo (opzionale, sostituisce immagine)',
            }),
            defineField({
              name: 'title',
              title: 'Titolo',
              type: 'localeString',
              description: 'Titolo sovrapposto all\'immagine',
              group: 'content',
            }),
            defineField({
              name: 'subtitle',
              title: 'Sottotitolo',
              type: 'localeString',
              group: 'content',
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'localeText',
              group: 'content',
            }),
            defineField({
              name: 'buttonText',
              title: 'Testo Pulsante',
              type: 'localeString',
              group: 'content',
            }),
            defineField({
              name: 'buttonLink',
              title: 'Link Pulsante',
              type: 'string',
              group: 'content',
            }),
            defineField({
              name: 'buttonVariant',
              title: 'Stile Pulsante',
              type: 'string',
              group: 'content',
              options: {
                list: [
                  { title: 'Primario', value: 'primary' },
                  { title: 'Secondario', value: 'secondary' },
                  { title: 'Bianco', value: 'white' },
                  { title: 'Ghost', value: 'ghost' },
                ],
              },
              initialValue: 'primary',
              hidden: ({ parent }) => !parent?.buttonText,
            }),
            defineField({
              name: 'secondButtonText',
              title: 'Secondo Pulsante (Testo)',
              type: 'localeString',
              group: 'content',
            }),
            defineField({
              name: 'secondButtonLink',
              title: 'Secondo Pulsante (Link)',
              type: 'string',
              group: 'content',
              hidden: ({ parent }) => !parent?.secondButtonText,
            }),
            defineField({
              name: 'overlay',
              title: 'Overlay Scuro',
              type: 'string',
              group: 'style',
              options: {
                list: [
                  { title: 'Nessuno', value: 'none' },
                  { title: 'Leggero (20%)', value: 'light' },
                  { title: 'Medio (40%)', value: 'medium' },
                  { title: 'Forte (60%)', value: 'heavy' },
                  { title: 'Molto Forte (80%)', value: 'very-heavy' },
                  { title: 'Gradiente Basso', value: 'gradient-bottom' },
                  { title: 'Gradiente Sinistra', value: 'gradient-left' },
                ],
              },
              initialValue: 'medium',
            }),
            defineField({
              name: 'textPosition',
              title: 'Posizione Testo',
              type: 'string',
              group: 'style',
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
              initialValue: 'center',
            }),
            defineField({
              name: 'textAlign',
              title: 'Allineamento Testo',
              type: 'string',
              group: 'style',
              options: {
                list: [
                  { title: 'Sinistra', value: 'left' },
                  { title: 'Centro', value: 'center' },
                  { title: 'Destra', value: 'right' },
                ],
              },
              initialValue: 'center',
            }),
            defineField({
              name: 'badge',
              title: 'Badge',
              type: 'object',
              group: 'style',
              fields: [
                { name: 'text', title: 'Testo', type: 'string' },
                {
                  name: 'color',
                  title: 'Colore',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Rosso', value: 'red' },
                      { title: 'Verde', value: 'green' },
                      { title: 'Blu', value: 'blue' },
                      { title: 'Giallo', value: 'yellow' },
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title.it', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Slide senza titolo', media }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Aggiungi almeno una slide'),
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Tipo Layout',
      type: 'string',
      group: 'layout',
      description: 'Come visualizzare le slide',
      options: {
        list: [
          { title: '🖼️ Fullscreen (una slide alla volta)', value: 'fullscreen' },
          { title: '📱 Cards (più slide visibili)', value: 'cards' },
          { title: '🎴 Cards Orizzontali', value: 'horizontal-cards' },
          { title: '📰 Miniature + Grande', value: 'thumbnails' },
          { title: '🔲 Griglia Animata', value: 'animated-grid' },
          { title: '📚 Stack (impilate)', value: 'stack' },
          { title: '🎡 Coverflow 3D', value: 'coverflow' },
        ],
      },
      initialValue: 'fullscreen',
    }),

    defineField({
      name: 'slidesPerView',
      title: 'Slide Visibili',
      type: 'number',
      group: 'layout',
      description: 'Quante slide mostrare contemporaneamente',
      initialValue: 1,
      validation: Rule => Rule.min(1).max(6),
      hidden: ({ parent }) => parent?.layout === 'fullscreen' || parent?.layout === 'stack',
    }),

    defineField({
      name: 'slidesPerViewMobile',
      title: 'Slide Visibili (Mobile)',
      type: 'number',
      group: 'layout',
      initialValue: 1,
      validation: Rule => Rule.min(1).max(3),
      hidden: ({ parent }) => parent?.layout === 'fullscreen' || parent?.layout === 'stack',
    }),

    defineField({
      name: 'gap',
      title: 'Spazio tra Slide',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo (8px)', value: 'sm' },
          { title: 'Medio (16px)', value: 'md' },
          { title: 'Grande (24px)', value: 'lg' },
          { title: 'Extra Grande (32px)', value: 'xl' },
        ],
      },
      initialValue: 'md',
      hidden: ({ parent }) => parent?.layout === 'fullscreen',
    }),

    defineField({
      name: 'height',
      title: 'Altezza',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Piccola (300px)', value: 'small' },
          { title: 'Media (500px)', value: 'medium' },
          { title: 'Grande (700px)', value: 'large' },
          { title: 'Schermo Intero', value: 'full' },
          { title: 'Aspect Ratio 16:9', value: 'ratio-16-9' },
          { title: 'Aspect Ratio 4:3', value: 'ratio-4-3' },
          { title: 'Aspect Ratio 1:1', value: 'ratio-1-1' },
          { title: 'Automatica', value: 'auto' },
        ],
      },
      initialValue: 'large',
    }),

    defineField({
      name: 'contentPosition',
      title: 'Posizione Contenuti Default',
      type: 'string',
      group: 'layout',
      description: 'Posizione predefinita per tutte le slide (sovrascrivibile)',
      options: {
        list: [
          { title: 'Sopra Immagine (overlay)', value: 'overlay' },
          { title: 'Sotto Immagine', value: 'below' },
          { title: 'Card con Immagine', value: 'card' },
        ],
      },
      initialValue: 'overlay',
    }),

    // === NAVIGAZIONE ===
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
      description: 'Avanza automaticamente tra le slide',
    }),

    defineField({
      name: 'autoplaySpeed',
      title: 'Velocità Autoplay (secondi)',
      type: 'number',
      group: 'navigation',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(30),
      hidden: ({ parent }) => !parent?.autoplay,
    }),

    defineField({
      name: 'showArrows',
      title: 'Mostra Frecce',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
    }),

    defineField({
      name: 'arrowStyle',
      title: 'Stile Frecce',
      type: 'string',
      group: 'navigation',
      options: {
        list: [
          { title: 'Default (cerchio)', value: 'circle' },
          { title: 'Quadrate', value: 'square' },
          { title: 'Solo Icona', value: 'icon-only' },
          { title: 'Con Sfondo', value: 'background' },
          { title: 'Laterali Esterne', value: 'outside' },
        ],
      },
      initialValue: 'circle',
      hidden: ({ parent }) => !parent?.showArrows,
    }),

    defineField({
      name: 'showDots',
      title: 'Mostra Indicatori',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
    }),

    defineField({
      name: 'dotsStyle',
      title: 'Stile Indicatori',
      type: 'string',
      group: 'navigation',
      options: {
        list: [
          { title: 'Punti', value: 'dots' },
          { title: 'Linee', value: 'lines' },
          { title: 'Numeri', value: 'numbers' },
          { title: 'Miniature', value: 'thumbnails' },
          { title: 'Progress Bar', value: 'progress' },
        ],
      },
      initialValue: 'dots',
      hidden: ({ parent }) => !parent?.showDots,
    }),

    defineField({
      name: 'dotsPosition',
      title: 'Posizione Indicatori',
      type: 'string',
      group: 'navigation',
      options: {
        list: [
          { title: 'Sotto', value: 'bottom' },
          { title: 'Sopra', value: 'top' },
          { title: 'Sinistra (verticale)', value: 'left' },
          { title: 'Destra (verticale)', value: 'right' },
        ],
      },
      initialValue: 'bottom',
      hidden: ({ parent }) => !parent?.showDots,
    }),

    defineField({
      name: 'loop',
      title: 'Loop Infinito',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
    }),

    defineField({
      name: 'pauseOnHover',
      title: 'Pausa al Passaggio Mouse',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
    }),

    defineField({
      name: 'draggable',
      title: 'Trascinabile (Swipe)',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
    }),

    defineField({
      name: 'keyboard',
      title: 'Navigazione Tastiera',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
    }),

    // === STILE ===
    defineField({
      name: 'rounded',
      title: 'Bordi Arrotondati',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
        ],
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'shadow',
      title: 'Ombra',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Leggera', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Forte', value: 'lg' },
        ],
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'containerPadding',
      title: 'Margini Container',
      type: 'boolean',
      group: 'style',
      description: 'Aggiungi margini laterali al carosello',
      initialValue: false,
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo Sezione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Trasparente', value: 'transparent' },
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio Scuro', value: 'gray-dark' },
          { title: 'Nero', value: 'black' },
          { title: 'Blu GLOS', value: 'primary' },
        ],
      },
      initialValue: 'transparent',
    }),

    defineField({
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      group: 'style',
      description: 'Per layout cards/horizontal-cards',
      options: {
        list: [
          { title: 'Flat', value: 'flat' },
          { title: 'Elevato', value: 'elevated' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Glass', value: 'glass' },
        ],
      },
      initialValue: 'elevated',
      hidden: ({ parent }) => !['cards', 'horizontal-cards'].includes(parent?.layout || ''),
    }),

    // === ANIMAZIONI ===
    defineField({
      name: 'effect',
      title: 'Effetto Transizione',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Slide', value: 'slide' },
          { title: 'Fade', value: 'fade' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Flip', value: 'flip' },
          { title: 'Cube', value: 'cube' },
          { title: 'Cards', value: 'cards' },
          { title: 'Creative', value: 'creative' },
        ],
      },
      initialValue: 'slide',
    }),

    defineField({
      name: 'transitionSpeed',
      title: 'Velocità Transizione (ms)',
      type: 'number',
      group: 'animation',
      initialValue: 500,
      validation: Rule => Rule.min(100).max(2000),
    }),

    defineField({
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Brightness', value: 'brightness' },
          { title: 'Overlay', value: 'overlay' },
          { title: 'Lift', value: 'lift' },
        ],
      },
      initialValue: 'zoom',
    }),

    defineField({
      name: 'parallax',
      title: 'Effetto Parallax',
      type: 'boolean',
      group: 'animation',
      description: 'Movimento parallasse degli elementi',
      initialValue: false,
    }),

    defineField({
      name: 'kenBurns',
      title: 'Effetto Ken Burns',
      type: 'boolean',
      group: 'animation',
      description: 'Zoom lento sulle immagini (effetto cinema)',
      initialValue: false,
    }),

    // === SPAZIATURA ===
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
    select: { title: 'title.it', slides: 'slides', layout: 'layout' },
    prepare({ title, slides, layout }) {
      const titleText = getPlainText(title)
      const count = slides?.length || 0
      const layoutLabel = {
        fullscreen: 'Fullscreen',
        cards: 'Cards',
        'horizontal-cards': 'Cards Orizzontali',
        thumbnails: 'Miniature',
        'animated-grid': 'Griglia',
        stack: 'Stack',
        coverflow: 'Coverflow',
      }[layout] || 'Fullscreen'
      return {
        title: `🎠 ${titleText || 'Carosello'}`,
        subtitle: `${count} slide • ${layoutLabel}`,
      }
    },
  },
})
