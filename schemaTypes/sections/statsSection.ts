// Sezione: Statistiche - VERSIONE AVANZATA
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BarChartIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'statsSection',
  title: 'Statistiche',
  type: 'object',
  icon: BarChartIcon,
  description: 'Mostra numeri e statistiche aziendali con animazioni',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'items', title: '📊 Numeri' },
    { name: 'layout', title: '📐 Layout' },
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

    // === NUMERI ===
    defineField({
      name: 'items',
      title: 'I Tuoi Numeri',
      type: 'array',
      group: 'items',
      description: 'Aggiungi le statistiche da mostrare',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Statistica',
          fields: [
            defineField({
              name: 'number',
              title: 'Numero',
              type: 'string',
              description: 'Es: "40+", "500", "100%", "€1M"',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'prefix',
              title: 'Prefisso',
              type: 'string',
              description: 'Simbolo prima del numero (es: €, $, +)',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffisso',
              type: 'string',
              description: 'Simbolo dopo il numero (es: +, %, K, M)',
            }),
            defineField({
              name: 'label',
              title: 'Etichetta',
              type: 'localeString',
              description: 'Es: "Anni di Esperienza"',
            }),
            defineField({
              name: 'description',
              title: 'Descrizione (opzionale)',
              type: 'localeText',
            }),
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
              title: 'Icona Immagine',
              type: 'image',
              description: 'In alternativa all\'emoji',
            }),
            defineField({
              name: 'color',
              title: 'Colore Accento',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Primario', value: 'primary' },
                  { title: 'Secondario', value: 'secondary' },
                  { title: 'Verde', value: 'green' },
                  { title: 'Arancione', value: 'orange' },
                  { title: 'Rosso', value: 'red' },
                ],
              },
              initialValue: 'default',
            }),
            defineField({
              name: 'link',
              title: 'Link (opzionale)',
              type: 'string',
            }),
          ],
          preview: {
            select: { number: 'number', label: 'label.it', icon: 'icon' },
            prepare({ number, label, icon }) {
              return {
                title: `${icon || '📊'} ${number}`,
                subtitle: label || 'Senza etichetta',
              }
            },
          },
        }),
      ],
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Tipo Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Griglia', value: 'grid' },
          { title: 'Riga Orizzontale', value: 'row' },
          { title: 'Con Icone Grandi', value: 'icons' },
          { title: 'Cards', value: 'cards' },
          { title: 'Circular Progress', value: 'circular' },
          { title: 'Vertical Stack', value: 'vertical' },
          { title: 'Timeline', value: 'timeline' },
        ],
      },
      initialValue: 'grid',
    }),

    defineField({
      name: 'columns',
      title: 'Colonne',
      type: 'number',
      group: 'layout',
      options: {
        list: [
          { title: '2', value: 2 },
          { title: '3', value: 3 },
          { title: '4', value: 4 },
          { title: '5', value: 5 },
          { title: 'Auto', value: 0 },
        ],
      },
      initialValue: 4,
      hidden: ({ parent }) => ['row', 'vertical', 'timeline'].includes(parent?.layout || ''),
    }),

    defineField({
      name: 'alignment',
      title: 'Allineamento',
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
      name: 'iconPosition',
      title: 'Posizione Icona',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Sopra Numero', value: 'top' },
          { title: 'Sinistra', value: 'left' },
          { title: 'Destra', value: 'right' },
          { title: 'Sfondo', value: 'background' },
          { title: 'Nascosta', value: 'hidden' },
        ],
      },
      initialValue: 'top',
    }),

    defineField({
      name: 'dividers',
      title: 'Separatori',
      type: 'boolean',
      group: 'layout',
      description: 'Mostra linee verticali tra le statistiche',
      initialValue: false,
    }),

    // === STILE ===
    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray' },
          { title: 'Grigio Scuro', value: 'dark' },
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Gradiente Blu', value: 'gradient-blue' },
          { title: 'Gradiente Scuro', value: 'gradient-dark' },
          { title: 'Immagine', value: 'image' },
        ],
      },
      initialValue: 'primary',
    }),

    defineField({
      name: 'backgroundImage',
      title: 'Immagine Sfondo',
      type: 'image',
      group: 'style',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.backgroundColor !== 'image',
    }),

    defineField({
      name: 'backgroundOverlay',
      title: 'Overlay Sfondo',
      type: 'number',
      group: 'style',
      description: '0-100% oscuramento',
      initialValue: 70,
      validation: Rule => Rule.min(0).max(100),
      hidden: ({ parent }) => parent?.backgroundColor !== 'image',
    }),

    defineField({
      name: 'textColor',
      title: 'Colore Testo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Automatico', value: 'auto' },
          { title: 'Bianco', value: 'white' },
          { title: 'Nero', value: 'black' },
          { title: 'Primario', value: 'primary' },
        ],
      },
      initialValue: 'auto',
    }),

    defineField({
      name: 'numberSize',
      title: 'Dimensione Numeri',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Piccola', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
          { title: 'Gigante', value: 'xxl' },
        ],
      },
      initialValue: 'xl',
    }),

    defineField({
      name: 'numberWeight',
      title: 'Peso Numeri',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Normale', value: 'normal' },
          { title: 'Medium', value: 'medium' },
          { title: 'Bold', value: 'bold' },
          { title: 'Extra Bold', value: 'extrabold' },
        ],
      },
      initialValue: 'bold',
    }),

    defineField({
      name: 'cardStyle',
      title: 'Stile Cards',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Elevato', value: 'elevated' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Glass', value: 'glass' },
          { title: 'Gradient', value: 'gradient' },
        ],
      },
      initialValue: 'none',
      hidden: ({ parent }) => parent?.layout !== 'cards',
    }),

    defineField({
      name: 'paddingY',
      title: 'Padding Verticale (Legacy)',
      type: 'string',
      group: 'style',
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
      name: 'countAnimation',
      title: 'Animazione Contatore',
      type: 'boolean',
      group: 'animation',
      description: 'I numeri si animano da 0 al valore finale',
      initialValue: true,
    }),

    defineField({
      name: 'countDuration',
      title: 'Durata Animazione (ms)',
      type: 'number',
      group: 'animation',
      initialValue: 2000,
      validation: Rule => Rule.min(500).max(5000),
      hidden: ({ parent }) => !parent?.countAnimation,
    }),

    defineField({
      name: 'entranceAnimation',
      title: 'Animazione Entrata',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade In', value: 'fade' },
          { title: 'Fade Up', value: 'fade-up' },
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Stagger', value: 'stagger' },
          { title: 'Bounce', value: 'bounce' },
        ],
      },
      initialValue: 'stagger',
    }),

    defineField({
      name: 'hoverAnimation',
      title: 'Animazione Hover',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Scale', value: 'scale' },
          { title: 'Glow', value: 'glow' },
          { title: 'Lift', value: 'lift' },
          { title: 'Color', value: 'color' },
        ],
      },
      initialValue: 'scale',
    }),

    defineField({
      name: 'showDecorations',
      title: 'Mostra Decorazioni',
      type: 'boolean',
      group: 'animation',
      description: 'Elementi decorativi animati',
      initialValue: false,
    }),
  ],

  preview: {
    select: { items: 'items', title: 'title.it', layout: 'layout' },
    prepare({ items, title, layout }) {
      const titleText = getPlainText(title)
      const count = items?.length || 0
      const layoutLabels: Record<string, string> = {
        grid: 'Griglia',
        row: 'Riga',
        icons: 'Icone',
        cards: 'Cards',
        circular: 'Circular',
        vertical: 'Verticale',
        timeline: 'Timeline',
      }
      return {
        title: `📊 ${titleText || 'Statistiche'}`,
        subtitle: `${count} numeri • ${layoutLabels[layout] || 'Griglia'}`,
      }
    },
  },
})
