// Sezione: Contatori Animati
// Mostra statistiche che si animano da 0 al valore target quando la sezione entra in vista
import { defineType, defineField, defineArrayMember } from 'sanity'
import { ActivityIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'counterSection',
  title: 'Contatori Animati',
  type: 'object',
  icon: ActivityIcon,
  description: 'Sezione con numeri animati che contano verso il valore target',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'counters', title: '🔢 Contatori' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'animation', title: '✨ Animazione' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeString',
      description: 'Titolo opzionale sopra i contatori',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeString',
      description: 'Breve descrizione sotto il titolo',
      group: 'content',
    }),

    // === CONTATORI ===
    defineField({
      name: 'counters',
      title: 'I Tuoi Contatori',
      type: 'array',
      group: 'counters',
      description: 'Aggiungi i numeri/statistiche da mostrare con animazione',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Contatore',
          fields: [
            defineField({
              name: 'number',
              title: 'Numero Target',
              type: 'number',
              description: 'Il valore finale a cui il contatore arriverà (es: 500, 100, 25)',
              validation: Rule => Rule.required().min(0),
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
              description: 'Descrizione sotto il numero (es: "Clienti Soddisfatti")',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              description: 'Icona opzionale sopra o accanto al numero',
              options: {
                list: iconOptions,
              },
            }),
            defineField({
              name: 'color',
              title: 'Colore Accento',
              type: 'string',
              description: 'Colore personalizzato per questo contatore',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Primario', value: 'primary' },
                  { title: 'Secondario', value: 'secondary' },
                  { title: 'Verde', value: 'green' },
                  { title: 'Blu', value: 'blue' },
                  { title: 'Viola', value: 'purple' },
                  { title: 'Arancione', value: 'orange' },
                  { title: 'Rosso', value: 'red' },
                ],
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: {
              number: 'number',
              prefix: 'prefix',
              suffix: 'suffix',
              label: 'label.it',
              icon: 'icon',
            },
            prepare({ number, prefix, suffix, label, icon }) {
              const displayNumber = `${prefix || ''}${number || 0}${suffix || ''}`
              return {
                title: `${icon || '🔢'} ${displayNumber}`,
                subtitle: label || 'Senza etichetta',
              }
            },
          },
        }),
      ],
      validation: Rule => Rule.min(1).error('Aggiungi almeno un contatore'),
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Disposizione',
      type: 'string',
      group: 'layout',
      description: 'Come disporre i contatori nella sezione',
      options: {
        list: [
          { title: 'Riga Orizzontale', value: 'row' },
          { title: 'Griglia 2 Colonne', value: 'grid-2' },
          { title: 'Griglia 3 Colonne', value: 'grid-3' },
          { title: 'Griglia 4 Colonne', value: 'grid-4' },
        ],
      },
      initialValue: 'row',
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
      name: 'numberSize',
      title: 'Dimensione Numeri',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Normale (36px)', value: '4xl' },
          { title: 'Grande (48px)', value: '5xl' },
          { title: 'Extra Grande (60px)', value: '6xl' },
          { title: 'Gigante (72px)', value: '7xl' },
        ],
      },
      initialValue: '5xl',
    }),

    defineField({
      name: 'numberWeight',
      title: 'Peso Numeri',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    }),

    defineField({
      name: 'labelSize',
      title: 'Dimensione Etichette',
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
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      group: 'style',
      description: 'Colore di sfondo della sezione',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Scuro', value: 'dark' },
          { title: 'Blu GLOS', value: 'primary' },
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
      description: 'Colore del testo e dei numeri',
      options: {
        list: [
          { title: 'Chiaro (per sfondi scuri)', value: 'light' },
          { title: 'Scuro (per sfondi chiari)', value: 'dark' },
        ],
      },
      initialValue: 'dark',
    }),

    defineField({
      name: 'paddingY',
      title: 'Spaziatura Verticale (Legacy)',
      type: 'string',
      group: 'style',
      description: 'Padding sopra e sotto la sezione',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo', value: 'small' },
          { title: 'Medio', value: 'medium' },
          { title: 'Grande', value: 'large' },
        ],
      },
      initialValue: 'medium',
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

    // === ANIMAZIONE ===
    defineField({
      name: 'animationDuration',
      title: 'Durata Animazione (secondi)',
      type: 'number',
      group: 'animation',
      description: 'Tempo impiegato dal contatore per raggiungere il valore target',
      initialValue: 2,
      validation: Rule => Rule.min(0.5).max(10),
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      counters: 'counters',
      layout: 'layout',
    },
    prepare({ title, counters, layout }) {
      const count = counters?.length || 0
      const layoutLabels: Record<string, string> = {
        'row': 'Riga',
        'grid-2': 'Griglia 2 col',
        'grid-3': 'Griglia 3 col',
        'grid-4': 'Griglia 4 col',
      }
      return {
        title: `🔢 ${title || 'Contatori Animati'}`,
        subtitle: `${count} contator${count === 1 ? 'e' : 'i'} • ${layoutLabels[layout] || 'Riga'}`,
      }
    },
  },
})
