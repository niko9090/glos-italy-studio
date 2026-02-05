// Schema: Sezione Case Studies - v3.1.0 (expanded to match component)
import { defineType, defineField, defineArrayMember } from 'sanity'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'caseStudiesSection',
  title: 'Sezione Case Studies',
  type: 'object',
  icon: () => '📋',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'items', title: '📋 Case Studies' },
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

    // === CASE STUDIES (inline items) ===
    defineField({
      name: 'items',
      title: 'Case Studies',
      type: 'array',
      group: 'items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'caseStudyItem',
          fields: [
            defineField({ name: 'title', title: 'Titolo', type: 'localeString' }),
            defineField({ name: 'client', title: 'Cliente', type: 'string' }),
            defineField({ name: 'sector', title: 'Settore', type: 'string' }),
            defineField({ name: 'excerpt', title: 'Estratto', type: 'localeText' }),
            defineField({ name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'logo', title: 'Logo Cliente', type: 'image' }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Per link alla pagina case study',
            }),
            defineField({
              name: 'stats',
              title: 'Statistiche',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'number', title: 'Numero', type: 'string' },
                  { name: 'label', title: 'Etichetta', type: 'string' },
                ],
              }],
            }),
            defineField({ name: 'featured', title: 'In Evidenza', type: 'boolean', initialValue: false }),
            defineField({ name: 'testimonialQuote', title: 'Citazione', type: 'text', rows: 3 }),
            defineField({ name: 'testimonialAuthor', title: 'Autore Citazione', type: 'string' }),
          ],
          preview: {
            select: { title: 'title.it', client: 'client', image: 'image' },
            prepare({ title, client, image }) {
              return {
                title: title || 'Case Study',
                subtitle: client || '',
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
          { title: 'Cards', value: 'cards' },
          { title: 'Griglia', value: 'grid' },
          { title: 'Lista Orizzontale', value: 'horizontal' },
          { title: 'Overlay', value: 'overlay' },
        ],
      },
      initialValue: 'cards',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Elevato', value: 'elevated' },
          { title: 'Glass', value: 'glass' },
        ],
      },
    }),
    defineField({
      name: 'showStats',
      title: 'Mostra Statistiche',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),
    defineField({
      name: 'showSector',
      title: 'Mostra Settore',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),
    defineField({
      name: 'showClient',
      title: 'Mostra Cliente',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),
    defineField({
      name: 'showTestimonial',
      title: 'Mostra Citazione',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
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
        ],
      },
      initialValue: 'left',
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
      name: 'animation',
      title: 'Animazione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade Up', value: 'fade-up' },
          { title: 'Stagger', value: 'stagger' },
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
      title: `📋 ${title || 'Case Studies'}`,
      subtitle: `${items?.length || 0} case studies`,
    }),
  },
})
