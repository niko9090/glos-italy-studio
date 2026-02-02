// Sezione: Caratteristiche - VERSIONE AVANZATA
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'featuresSection',
  title: 'Caratteristiche',
  type: 'object',
  icon: BulbOutlineIcon,
  description: 'Lista di caratteristiche o punti di forza con molteplici layout e stili',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'features', title: '✨ Caratteristiche' },
    { name: 'media', title: '🖼️ Media' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'animation', title: '✨ Animazioni' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta Sopra Titolo',
      type: 'localeString',
      description: 'Piccolo testo sopra il titolo. Es: "PERCHÉ SCEGLIERCI", "I NOSTRI PUNTI DI FORZA"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      description: 'Es: "Perché Scegliere GLOS" - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Breve introduzione - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeRichText',
      description: 'Testo più lungo (opzionale)',
      group: 'content',
    }),

    // === CARATTERISTICHE ===
    defineField({
      name: 'items',
      title: 'Le Caratteristiche',
      type: 'array',
      description: 'Aggiungi i punti di forza o le caratteristiche (consigliato: 3-6 punti)',
      group: 'features',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Caratteristica',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              options: {
                list: iconOptions,
              },
            }),
            defineField({
              name: 'iconImage',
              title: 'Icona (Immagine)',
              type: 'image',
              description: 'In alternativa all\'emoji, carica un\'icona personalizzata',
            }),
            defineField({
              name: 'title',
              title: 'Titolo',
              type: 'localeString',
              description: 'Nome della caratteristica. Es: "Qualità Garantita"',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'localeText',
              description: 'Spiega questa caratteristica in 1-2 frasi',
            }),
            defineField({
              name: 'link',
              title: 'Link (opzionale)',
              type: 'string',
              description: 'URL per approfondire questa caratteristica',
            }),
            defineField({
              name: 'color',
              title: 'Colore Accento',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Blu', value: 'blue' },
                  { title: 'Verde', value: 'green' },
                  { title: 'Viola', value: 'purple' },
                  { title: 'Arancione', value: 'orange' },
                  { title: 'Rosso', value: 'red' },
                  { title: 'Ciano', value: 'cyan' },
                ],
              },
              initialValue: 'default',
            }),
            defineField({
              name: 'badge',
              title: 'Badge',
              type: 'localeString',
              description: 'Etichetta piccola (es: "NUOVO", "POPOLARE")',
            }),
          ],
          preview: {
            select: { title: 'title.it', icon: 'icon', iconImage: 'iconImage' },
            prepare({ title, icon, iconImage }) {
              return {
                title: `${icon || '✨'} ${title || 'Caratteristica'}`,
                media: iconImage,
              }
            },
          },
        }),
      ],
    }),

    // === MEDIA ===
    defineField({
      name: 'showImage',
      title: 'Mostra Immagine Laterale',
      type: 'boolean',
      group: 'media',
      initialValue: false,
    }),

    defineField({
      name: 'image',
      title: 'Immagine Laterale',
      type: 'image',
      description: 'Immagine che appare a fianco della lista. Consigliato: 800x600 px',
      options: { hotspot: true },
      group: 'media',
      hidden: ({ parent }) => !parent?.showImage,
    }),

    defineField({
      name: 'imagePosition',
      title: 'Posizione Immagine',
      type: 'string',
      description: 'Dove posizionare l\'immagine rispetto ai punti',
      group: 'media',
      options: {
        list: [
          { title: 'A sinistra', value: 'left' },
          { title: 'A destra', value: 'right' },
          { title: 'In alto (centrata)', value: 'top' },
          { title: 'In basso (centrata)', value: 'bottom' },
          { title: 'Sfondo', value: 'background' },
        ],
      },
      initialValue: 'right',
      hidden: ({ parent }) => !parent?.showImage,
    }),

    defineField({
      name: 'imageStyle',
      title: 'Stile Immagine',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Normale', value: 'normal' },
          { title: 'Arrotondata', value: 'rounded' },
          { title: 'Cerchio', value: 'circle' },
          { title: 'Con ombra', value: 'shadow' },
          { title: 'Con bordo', value: 'border' },
          { title: 'Float (sovrapposta)', value: 'float' },
        ],
      },
      initialValue: 'rounded',
      hidden: ({ parent }) => !parent?.showImage,
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Tipo Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: '📋 Lista Verticale', value: 'list' },
          { title: '🔲 Griglia (2 colonne)', value: 'grid-2' },
          { title: '🔲 Griglia (3 colonne)', value: 'grid-3' },
          { title: '🔲 Griglia (4 colonne)', value: 'grid-4' },
          { title: '📱 Cards', value: 'cards' },
          { title: '🎴 Cards con Icone Grandi', value: 'cards-icons' },
          { title: '🔄 Alternato (zig-zag)', value: 'alternating' },
          { title: '⭕ Centrato', value: 'centered' },
          { title: '📰 Sidebar + Lista', value: 'sidebar' },
          { title: '🎯 Icone Inline', value: 'inline' },
          { title: '📊 Timeline Verticale', value: 'timeline' },
          { title: '🔘 Tabs', value: 'tabs' },
        ],
      },
      initialValue: 'grid-3',
    }),

    defineField({
      name: 'iconPosition',
      title: 'Posizione Icona',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Sopra Titolo', value: 'top' },
          { title: 'A Sinistra', value: 'left' },
          { title: 'A Destra', value: 'right' },
          { title: 'Di Sfondo', value: 'background' },
          { title: 'Nascosta', value: 'hidden' },
        ],
      },
      initialValue: 'top',
    }),

    defineField({
      name: 'iconSize',
      title: 'Dimensione Icona',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Piccola', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
        ],
      },
      initialValue: 'lg',
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
      },
      initialValue: 'center',
    }),

    defineField({
      name: 'contentWidth',
      title: 'Larghezza Contenuto',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Stretta', value: 'narrow' },
          { title: 'Normale', value: 'normal' },
          { title: 'Larga', value: 'wide' },
          { title: 'Piena', value: 'full' },
        ],
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'gap',
      title: 'Spazio tra Elementi',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),

    // === STILE ===
    defineField({
      name: 'iconStyle',
      title: 'Stile Icona',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Semplice', value: 'simple' },
          { title: 'Con Sfondo', value: 'filled' },
          { title: 'Con Bordo', value: 'outlined' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Cerchio Pieno', value: 'circle-filled' },
          { title: 'Cerchio Outline', value: 'circle-outlined' },
          { title: 'Quadrato Arrotondato', value: 'rounded-square' },
        ],
      },
      initialValue: 'circle-filled',
    }),

    defineField({
      name: 'cardStyle',
      title: 'Stile Cards',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Bordo', value: 'border' },
          { title: 'Ombra Leggera', value: 'shadow-sm' },
          { title: 'Ombra Media', value: 'shadow-md' },
          { title: 'Ombra Forte', value: 'shadow-lg' },
          { title: 'Glassmorphism', value: 'glass' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Sfondo Colorato', value: 'colored' },
        ],
      },
      initialValue: 'none',
      hidden: ({ parent }) => !['cards', 'cards-icons', 'grid-2', 'grid-3', 'grid-4'].includes(parent?.layout || ''),
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Nero', value: 'black' },
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Blu Chiaro', value: 'primary-light' },
          { title: 'Gradiente Blu', value: 'gradient-blue' },
          { title: 'Gradiente Scuro', value: 'gradient-dark' },
        ],
      },
      initialValue: 'white',
    }),

    defineField({
      name: 'textColor',
      title: 'Colore Testo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Automatico', value: 'auto' },
          { title: 'Scuro', value: 'dark' },
          { title: 'Chiaro', value: 'light' },
        ],
      },
      initialValue: 'auto',
    }),

    defineField({
      name: 'accentColor',
      title: 'Colore Accento',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Verde', value: 'green' },
          { title: 'Viola', value: 'purple' },
          { title: 'Arancione', value: 'orange' },
          { title: 'Rosso', value: 'red' },
          { title: 'Gradiente', value: 'gradient' },
        ],
      },
      initialValue: 'primary',
    }),

    defineField({
      name: 'dividers',
      title: 'Mostra Divisori',
      type: 'boolean',
      group: 'style',
      description: 'Linee di separazione tra le caratteristiche',
      initialValue: false,
    }),

    defineField({
      name: 'paddingY',
      title: 'Spaziatura Verticale (Legacy)',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Piccola', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
        ],
      },
      initialValue: 'lg',
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

    // === ANIMAZIONI ===
    defineField({
      name: 'animation',
      title: 'Animazione Entrata',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade In', value: 'fade' },
          { title: 'Fade Up', value: 'fade-up' },
          { title: 'Stagger (uno alla volta)', value: 'stagger' },
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Slide da Sinistra', value: 'slide-left' },
          { title: 'Slide da Destra', value: 'slide-right' },
          { title: 'Flip', value: 'flip' },
        ],
      },
      initialValue: 'stagger',
    }),

    defineField({
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Scale (ingrandimento)', value: 'scale' },
          { title: 'Lift (sollevamento)', value: 'lift' },
          { title: 'Glow (bagliore)', value: 'glow' },
          { title: 'Bordo Colorato', value: 'border-color' },
          { title: 'Sfondo Colorato', value: 'bg-color' },
          { title: 'Icona Bounce', value: 'icon-bounce' },
        ],
      },
      initialValue: 'lift',
    }),

    defineField({
      name: 'iconAnimation',
      title: 'Animazione Icona',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Pulse (pulsante)', value: 'pulse' },
          { title: 'Bounce (rimbalzo)', value: 'bounce' },
          { title: 'Spin (rotazione)', value: 'spin' },
          { title: 'Shake (scuotimento)', value: 'shake' },
        ],
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'parallax',
      title: 'Effetto Parallax',
      type: 'boolean',
      group: 'animation',
      description: 'Effetto di profondità durante lo scroll',
      initialValue: false,
    }),

    // === CTA FINALE ===
    defineField({
      name: 'showCta',
      title: 'Mostra Pulsante Finale',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),

    defineField({
      name: 'ctaText',
      title: 'Testo Pulsante',
      type: 'localeString',
      group: 'content',
      hidden: ({ parent }) => !parent?.showCta,
    }),

    defineField({
      name: 'ctaLink',
      title: 'Link Pulsante',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => !parent?.showCta,
    }),

    defineField({
      name: 'ctaVariant',
      title: 'Stile Pulsante',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Primario', value: 'primary' },
          { title: 'Secondario', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) => !parent?.showCta,
    }),
  ],

  preview: {
    select: { title: 'title.it', items: 'items', layout: 'layout' },
    prepare({ title, items, layout }) {
      const titleText = getPlainText(title)
      const count = items?.length || 0
      const layoutLabels: Record<string, string> = {
        'list': 'Lista',
        'grid-2': 'Griglia 2 col',
        'grid-3': 'Griglia 3 col',
        'grid-4': 'Griglia 4 col',
        'cards': 'Cards',
        'cards-icons': 'Cards Icone',
        'alternating': 'Zig-zag',
        'centered': 'Centrato',
        'sidebar': 'Sidebar',
        'inline': 'Inline',
        'timeline': 'Timeline',
        'tabs': 'Tabs',
      }
      return {
        title: `✨ ${titleText || 'Caratteristiche'}`,
        subtitle: `${count} punti • ${layoutLabels[layout] || 'Griglia'}`,
      }
    },
  },
})
