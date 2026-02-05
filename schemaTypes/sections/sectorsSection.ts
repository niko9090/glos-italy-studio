// Schema: Sezione Settori - v3.1.0 (expanded to match component)
import { defineType, defineField, defineArrayMember } from 'sanity'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'sectorsSection',
  title: 'Sezione Settori',
  type: 'object',
  icon: () => '🏭',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'items', title: '🏭 Settori' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'cta', title: '🔗 CTA' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta',
      type: 'localeRichText',
      group: 'content',
    }),
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

    // === SETTORI (inline items) ===
    defineField({
      name: 'items',
      title: 'Settori',
      type: 'array',
      group: 'items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sectorItem',
          fields: [
            defineField({ name: 'icon', title: 'Icona (Emoji)', type: 'string' }),
            defineField({ name: 'iconImage', title: 'Icona (Immagine)', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'title', title: 'Titolo', type: 'localeString' }),
            defineField({ name: 'description', title: 'Descrizione', type: 'localeText' }),
            defineField({
              name: 'slug',
              title: 'Slug Pagina',
              type: 'slug',
              description: 'Per link alla pagina settore',
            }),
            defineField({ name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'color',
              title: 'Colore Accento',
              type: 'string',
              options: {
                list: [
                  { title: 'Default (Blu)', value: 'default' },
                  { title: 'Blu', value: 'blue' },
                  { title: 'Verde', value: 'green' },
                  { title: 'Viola', value: 'purple' },
                  { title: 'Arancione', value: 'orange' },
                  { title: 'Rosso', value: 'red' },
                  { title: 'Ciano', value: 'cyan' },
                  { title: 'Oro', value: 'gold' },
                ],
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: { title: 'title.it', icon: 'icon', image: 'image' },
            prepare({ title, icon, image }) {
              return {
                title: `${icon || '🏭'} ${title || 'Settore'}`,
                media: image,
              }
            },
          },
        }),
      ],
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Griglia 2 colonne', value: 'grid-2' },
          { title: 'Griglia 3 colonne', value: 'grid-3' },
          { title: 'Griglia 4 colonne', value: 'grid-4' },
          { title: 'Cards', value: 'cards' },
          { title: 'Featured', value: 'featured' },
        ],
      },
      initialValue: 'grid-3',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Default (Shadow)', value: 'default' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Elevato', value: 'elevated' },
          { title: 'Glass', value: 'glass' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Bordato', value: 'bordered' },
        ],
      },
    }),
    defineField({
      name: 'iconSize',
      title: 'Dimensione Icone',
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
      name: 'showImage',
      title: 'Mostra Immagini',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),
    defineField({
      name: 'showDescription',
      title: 'Mostra Descrizione',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
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

    // === STILE ===
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Primario', value: 'primary' },
          { title: 'Gradiente Blu', value: 'gradient-blue' },
          { title: 'Gradiente Scuro', value: 'gradient-dark' },
        ],
      },
      initialValue: 'gray-light',
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
      name: 'animation',
      title: 'Animazione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade', value: 'fade' },
          { title: 'Fade Up', value: 'fade-up' },
          { title: 'Stagger', value: 'stagger' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Slide', value: 'slide' },
        ],
      },
      initialValue: 'stagger',
    }),
    defineField({
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Scala', value: 'scale' },
          { title: 'Sollevamento', value: 'lift' },
          { title: 'Glow', value: 'glow' },
          { title: 'Tilt', value: 'tilt' },
        ],
      },
      initialValue: 'lift',
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

    // === CTA ===
    defineField({
      name: 'showCta',
      title: 'Mostra Pulsante CTA',
      type: 'boolean',
      group: 'cta',
      initialValue: false,
    }),
    defineField({
      name: 'ctaText',
      title: 'Testo CTA',
      type: 'localeString',
      group: 'cta',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link CTA',
      type: 'string',
      group: 'cta',
    }),
  ],
  preview: {
    select: { title: 'title.it', items: 'items' },
    prepare: ({ title, items }) => ({
      title: `🏭 ${title || 'Sezione Settori'}`,
      subtitle: `${items?.length || 0} settori`,
    }),
  },
})
