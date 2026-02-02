// Sezione: Galleria - VERSIONE AVANZATA
import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'gallerySection',
  title: 'Galleria Immagini',
  type: 'object',
  icon: ImagesIcon,
  description: 'Galleria fotografica con molteplici layout e effetti',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'images', title: '🖼️ Immagini' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'interaction', title: '✨ Interazioni' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'title',
      title: 'Titolo Galleria',
      type: 'localeRichText',
      description: 'Es: "La Nostra Galleria"',
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

    // === IMMAGINI ===
    defineField({
      name: 'images',
      title: 'Le Immagini',
      type: 'array',
      description: 'Carica le foto. Trascina per riordinare.',
      group: 'images',
      of: [
        {
          type: 'image',
          title: 'Foto',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Didascalia',
              type: 'localeString',
              description: 'Descrizione breve della foto',
            },
            {
              name: 'alt',
              title: 'Testo Alternativo',
              type: 'string',
              description: 'Per accessibilità e SEO',
            },
            {
              name: 'category',
              title: 'Categoria',
              type: 'string',
              description: 'Per filtrare le immagini (es: "Prodotti", "Eventi")',
            },
            {
              name: 'featured',
              title: 'In Evidenza',
              type: 'boolean',
              description: 'Immagine più grande nella griglia',
              initialValue: false,
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL opzionale al click',
            },
          ],
        },
      ],
      validation: Rule => Rule.min(1).error('Aggiungi almeno un\'immagine'),
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Tipo Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: '🔲 Griglia Uniforme', value: 'grid' },
          { title: '🧱 Masonry (altezze variabili)', value: 'masonry' },
          { title: '📱 Carousel Orizzontale', value: 'carousel' },
          { title: '🎴 Justified (righe piene)', value: 'justified' },
          { title: '🔳 Collage', value: 'collage' },
          { title: '📰 Featured + Grid', value: 'featured-grid' },
          { title: '🔘 Circular', value: 'circular' },
        ],
      },
      initialValue: 'grid',
    }),

    defineField({
      name: 'columns',
      title: 'Colonne (Desktop)',
      type: 'number',
      group: 'layout',
      options: {
        list: [
          { title: '2 colonne', value: 2 },
          { title: '3 colonne', value: 3 },
          { title: '4 colonne', value: 4 },
          { title: '5 colonne', value: 5 },
          { title: '6 colonne', value: 6 },
        ],
      },
      initialValue: 4,
      hidden: ({ parent }) => parent?.layout === 'carousel',
    }),

    defineField({
      name: 'columnsMobile',
      title: 'Colonne (Mobile)',
      type: 'number',
      group: 'layout',
      options: {
        list: [
          { title: '1 colonna', value: 1 },
          { title: '2 colonne', value: 2 },
          { title: '3 colonne', value: 3 },
        ],
      },
      initialValue: 2,
      hidden: ({ parent }) => parent?.layout === 'carousel',
    }),

    defineField({
      name: 'gap',
      title: 'Spazio tra Immagini',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo (4px)', value: 'xs' },
          { title: 'Normale (8px)', value: 'sm' },
          { title: 'Medio (16px)', value: 'md' },
          { title: 'Grande (24px)', value: 'lg' },
          { title: 'Extra Grande (32px)', value: 'xl' },
        ],
      },
      initialValue: 'md',
    }),

    defineField({
      name: 'aspectRatio',
      title: 'Proporzioni Immagini',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Originale', value: 'original' },
          { title: 'Quadrato (1:1)', value: 'square' },
          { title: 'Landscape (16:9)', value: 'landscape' },
          { title: 'Landscape (4:3)', value: 'landscape-4-3' },
          { title: 'Portrait (3:4)', value: 'portrait' },
          { title: 'Portrait (9:16)', value: 'portrait-tall' },
        ],
      },
      initialValue: 'square',
      hidden: ({ parent }) => ['masonry', 'justified'].includes(parent?.layout || ''),
    }),

    defineField({
      name: 'maxImages',
      title: 'Max Immagini Visibili',
      type: 'number',
      group: 'layout',
      description: 'Limita il numero di immagini mostrate (0 = tutte)',
      initialValue: 0,
    }),

    defineField({
      name: 'showMoreButton',
      title: 'Mostra Pulsante "Vedi Tutto"',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
      hidden: ({ parent }) => !parent?.maxImages || parent?.maxImages === 0,
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
          { title: 'Cerchio (per quadrati)', value: 'full' },
        ],
      },
      initialValue: 'md',
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
      name: 'border',
      title: 'Bordo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Sottile', value: 'thin' },
          { title: 'Normale', value: 'normal' },
          { title: 'Decorativo', value: 'decorative' },
        ],
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'imageFilter',
      title: 'Filtro Immagini',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Bianco e Nero', value: 'grayscale' },
          { title: 'Seppia', value: 'sepia' },
          { title: 'Saturazione Alta', value: 'saturate' },
          { title: 'Contrasto Alto', value: 'contrast' },
        ],
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo Sezione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Nero', value: 'black' },
          { title: 'Blu GLOS', value: 'primary' },
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

    defineField({
      name: 'showCaptions',
      title: 'Mostra Didascalie',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Mai', value: 'never' },
          { title: 'Sempre (sotto)', value: 'always' },
          { title: 'Al Hover (overlay)', value: 'hover' },
          { title: 'Al Hover (slide up)', value: 'hover-slide' },
        ],
      },
      initialValue: 'hover',
    }),

    // === INTERAZIONI ===
    defineField({
      name: 'enableLightbox',
      title: 'Abilita Lightbox',
      type: 'boolean',
      description: 'Clicca per ingrandire le immagini',
      group: 'interaction',
      initialValue: true,
    }),

    defineField({
      name: 'lightboxStyle',
      title: 'Stile Lightbox',
      type: 'string',
      group: 'interaction',
      options: {
        list: [
          { title: 'Classico', value: 'classic' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Con Miniature', value: 'thumbnails' },
          { title: 'Fullscreen', value: 'fullscreen' },
        ],
      },
      initialValue: 'classic',
      hidden: ({ parent }) => !parent?.enableLightbox,
    }),

    defineField({
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      group: 'interaction',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Zoom + Brighten', value: 'zoom-bright' },
          { title: 'Lift (sollevamento)', value: 'lift' },
          { title: 'Overlay Scuro', value: 'overlay' },
          { title: 'Overlay Colorato', value: 'overlay-color' },
          { title: 'Tilt 3D', value: 'tilt' },
          { title: 'Glitch', value: 'glitch' },
        ],
      },
      initialValue: 'zoom',
    }),

    defineField({
      name: 'animation',
      title: 'Animazione Entrata',
      type: 'string',
      group: 'interaction',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade In', value: 'fade' },
          { title: 'Fade In Staggered', value: 'fade-stagger' },
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Slide Up', value: 'slide-up' },
          { title: 'Scale Rotate', value: 'scale-rotate' },
        ],
      },
      initialValue: 'fade-stagger',
    }),

    defineField({
      name: 'enableFilters',
      title: 'Abilita Filtri per Categoria',
      type: 'boolean',
      group: 'interaction',
      description: 'Mostra pulsanti per filtrare per categoria',
      initialValue: false,
    }),

    defineField({
      name: 'filterStyle',
      title: 'Stile Filtri',
      type: 'string',
      group: 'interaction',
      options: {
        list: [
          { title: 'Pulsanti', value: 'buttons' },
          { title: 'Pills', value: 'pills' },
          { title: 'Tabs', value: 'tabs' },
          { title: 'Dropdown', value: 'dropdown' },
        ],
      },
      initialValue: 'pills',
      hidden: ({ parent }) => !parent?.enableFilters,
    }),

    defineField({
      name: 'enableSearch',
      title: 'Abilita Ricerca',
      type: 'boolean',
      group: 'interaction',
      description: 'Cerca nelle didascalie',
      initialValue: false,
    }),
  ],

  preview: {
    select: { title: 'title.it', images: 'images', layout: 'layout' },
    prepare({ title, images, layout }) {
      const titleText = getPlainText(title)
      const count = images?.length || 0
      const layoutLabels: Record<string, string> = {
        grid: 'Griglia',
        masonry: 'Masonry',
        carousel: 'Carousel',
        justified: 'Justified',
        collage: 'Collage',
        'featured-grid': 'Featured',
        circular: 'Circular',
      }
      return {
        title: `🖼️ ${titleText || 'Galleria'}`,
        subtitle: `${count} foto • ${layoutLabels[layout] || 'Griglia'}`,
      }
    },
  },
})
