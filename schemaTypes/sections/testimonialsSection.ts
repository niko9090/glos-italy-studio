// Sezione: Testimonianze - VERSIONE AVANZATA
import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonianze',
  type: 'object',
  icon: UsersIcon,
  description: 'Mostra le recensioni e testimonianze dei clienti con molteplici layout',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'testimonials', title: '💬 Testimonianze' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'animation', title: '✨ Animazioni' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta',
      type: 'localeString',
      description: 'Es: "COSA DICONO DI NOI", "TESTIMONIANZE"',
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
      type: 'localeText',
      group: 'content',
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeRichText',
      group: 'content',
    }),

    // === TESTIMONIANZE ===
    defineField({
      name: 'testimonials',
      title: 'Testimonianze',
      type: 'array',
      group: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Citazione',
              type: 'localeText',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Nome Autore',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Ruolo/Posizione',
              type: 'string',
            }),
            defineField({
              name: 'company',
              title: 'Azienda',
              type: 'string',
            }),
            defineField({
              name: 'companyLogo',
              title: 'Logo Azienda',
              type: 'image',
            }),
            defineField({
              name: 'avatar',
              title: 'Foto Autore',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'rating',
              title: 'Valutazione (stelle)',
              type: 'number',
              options: {
                list: [
                  { title: '⭐⭐⭐⭐⭐ 5 stelle', value: 5 },
                  { title: '⭐⭐⭐⭐ 4 stelle', value: 4 },
                  { title: '⭐⭐⭐ 3 stelle', value: 3 },
                  { title: '⭐⭐ 2 stelle', value: 2 },
                  { title: '⭐ 1 stella', value: 1 },
                ],
              },
              initialValue: 5,
            }),
            defineField({
              name: 'featured',
              title: 'In Evidenza',
              type: 'boolean',
              description: 'Mostra questa testimonianza più grande',
              initialValue: false,
            }),
            defineField({
              name: 'date',
              title: 'Data',
              type: 'date',
              description: 'Data della testimonianza',
            }),
            defineField({
              name: 'source',
              title: 'Fonte',
              type: 'string',
              description: 'Es: "Google Reviews", "Trustpilot", "LinkedIn"',
            }),
            defineField({
              name: 'sourceUrl',
              title: 'Link alla Fonte',
              type: 'url',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video Testimonianza',
              type: 'url',
              description: 'URL YouTube o Vimeo per testimonianza video',
            }),
          ],
          preview: {
            select: { author: 'author', role: 'role', company: 'company', avatar: 'avatar', rating: 'rating' },
            prepare({ author, role, company, avatar, rating }) {
              const stars = '⭐'.repeat(rating || 5)
              return {
                title: author || 'Cliente',
                subtitle: `${role || ''}${company ? ` @ ${company}` : ''} ${stars}`,
                media: avatar,
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
          { title: '🎠 Carosello', value: 'carousel' },
          { title: '🔲 Griglia (2 colonne)', value: 'grid-2' },
          { title: '🔲 Griglia (3 colonne)', value: 'grid-3' },
          { title: '📋 Lista verticale', value: 'list' },
          { title: '🧱 Masonry', value: 'masonry' },
          { title: '🎴 Cards Impilate', value: 'stacked' },
          { title: '🔘 Slider con Thumbnail', value: 'slider-thumb' },
          { title: '📰 Featured + Lista', value: 'featured-list' },
          { title: '🎡 Marquee (scrolling)', value: 'marquee' },
          { title: '💬 Bubble Chat', value: 'bubble' },
        ],
      },
      initialValue: 'carousel',
    }),

    defineField({
      name: 'itemsPerView',
      title: 'Testimonianze Visibili',
      type: 'number',
      group: 'layout',
      options: {
        list: [
          { title: '1', value: 1 },
          { title: '2', value: 2 },
          { title: '3', value: 3 },
          { title: 'Auto', value: 0 },
        ],
      },
      initialValue: 1,
      hidden: ({ parent }) => !['carousel', 'slider-thumb'].includes(parent?.layout || ''),
    }),

    defineField({
      name: 'showRating',
      title: 'Mostra Stelle',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),

    defineField({
      name: 'showAvatar',
      title: 'Mostra Foto',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),

    defineField({
      name: 'showCompany',
      title: 'Mostra Azienda',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
    }),

    defineField({
      name: 'showDate',
      title: 'Mostra Data',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),

    defineField({
      name: 'showSource',
      title: 'Mostra Fonte',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),

    defineField({
      name: 'avatarPosition',
      title: 'Posizione Avatar',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Sopra la citazione', value: 'top' },
          { title: 'Sotto la citazione', value: 'bottom' },
          { title: 'A sinistra', value: 'left' },
          { title: 'A destra', value: 'right' },
        ],
      },
      initialValue: 'bottom',
      hidden: ({ parent }) => !parent?.showAvatar,
    }),

    defineField({
      name: 'avatarSize',
      title: 'Dimensione Avatar',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
        ],
      },
      initialValue: 'md',
      hidden: ({ parent }) => !parent?.showAvatar,
    }),

    defineField({
      name: 'maxQuoteLength',
      title: 'Max Caratteri Citazione',
      type: 'number',
      group: 'layout',
      description: 'Tronca citazioni lunghe (0 = nessun limite)',
      initialValue: 0,
    }),

    // === CAROUSEL OPTIONS ===
    defineField({
      name: 'autoplay',
      title: 'Autoplay Carosello',
      type: 'boolean',
      group: 'layout',
      hidden: ({ parent }) => !['carousel', 'slider-thumb', 'marquee'].includes(parent?.layout || ''),
      initialValue: true,
    }),

    defineField({
      name: 'autoplaySpeed',
      title: 'Velocità Autoplay (ms)',
      type: 'number',
      group: 'layout',
      hidden: ({ parent }) => !parent?.autoplay,
      initialValue: 5000,
      validation: Rule => Rule.min(2000).max(15000),
    }),

    defineField({
      name: 'showArrows',
      title: 'Mostra Frecce',
      type: 'boolean',
      group: 'layout',
      hidden: ({ parent }) => !['carousel', 'slider-thumb'].includes(parent?.layout || ''),
      initialValue: true,
    }),

    defineField({
      name: 'showDots',
      title: 'Mostra Indicatori',
      type: 'boolean',
      group: 'layout',
      hidden: ({ parent }) => !['carousel', 'slider-thumb'].includes(parent?.layout || ''),
      initialValue: true,
    }),

    defineField({
      name: 'loop',
      title: 'Loop Infinito',
      type: 'boolean',
      group: 'layout',
      hidden: ({ parent }) => !['carousel', 'slider-thumb', 'marquee'].includes(parent?.layout || ''),
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
          { title: 'Extra Grande (20px)', value: 'xl' },
        ],
      },
      initialValue: 'base',
    }),

    defineField({
      name: 'quoteFontSize',
      title: 'Dimensione Citazione',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (14px)', value: 'sm' },
          { title: 'Normale (16px)', value: 'base' },
          { title: 'Grande (18px)', value: 'lg' },
          { title: 'Extra Grande (20px)', value: 'xl' },
          { title: 'XXL (24px)', value: '2xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'quoteWeight',
      title: 'Peso Citazione',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'normal',
    }),

    defineField({
      name: 'authorSize',
      title: 'Dimensione Nome Autore',
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
      name: 'authorWeight',
      title: 'Peso Nome Autore',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'semibold',
    }),

    defineField({
      name: 'roleSize',
      title: 'Dimensione Ruolo/Azienda',
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
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Card con ombra', value: 'shadow' },
          { title: 'Card con bordo', value: 'border' },
          { title: 'Glassmorphism', value: 'glass' },
          { title: 'Colorato', value: 'colored' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Elevated', value: 'elevated' },
        ],
      },
      initialValue: 'shadow',
    }),

    defineField({
      name: 'quoteStyle',
      title: 'Stile Citazione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Normale', value: 'normal' },
          { title: 'Con virgolette grandi', value: 'quotes' },
          { title: 'Corsivo', value: 'italic' },
          { title: 'Con icona citazione', value: 'icon' },
          { title: 'Highlight', value: 'highlight' },
          { title: 'Bordato a sinistra', value: 'left-border' },
        ],
      },
      initialValue: 'quotes',
    }),

    defineField({
      name: 'quoteSize',
      title: 'Dimensione Citazione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Piccola', value: 'sm' },
          { title: 'Normale', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
        ],
      },
      initialValue: 'md',
    }),

    defineField({
      name: 'ratingStyle',
      title: 'Stile Stelle',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Stelle Gialle', value: 'yellow' },
          { title: 'Stelle Blu', value: 'blue' },
          { title: 'Stelle Colorate', value: 'colored' },
          { title: 'Numerico (4.5/5)', value: 'numeric' },
        ],
      },
      initialValue: 'yellow',
      hidden: ({ parent }) => !parent?.showRating,
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Sfondo Sezione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Blu Chiaro', value: 'primary-light' },
          { title: 'Nero', value: 'black' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Pattern', value: 'pattern' },
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
      name: 'accentColor',
      title: 'Colore Accento',
      type: 'string',
      group: 'style',
      description: 'Colore per virgolette e dettagli',
      options: {
        list: [
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Verde', value: 'green' },
          { title: 'Viola', value: 'purple' },
          { title: 'Arancione', value: 'orange' },
          { title: 'Rosso', value: 'red' },
          { title: 'Oro', value: 'gold' },
        ],
      },
      initialValue: 'primary',
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
          { title: 'Stagger', value: 'stagger' },
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Slide', value: 'slide' },
          { title: 'Flip', value: 'flip' },
        ],
      },
      initialValue: 'fade-up',
    }),

    defineField({
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Scale', value: 'scale' },
          { title: 'Lift', value: 'lift' },
          { title: 'Glow', value: 'glow' },
          { title: 'Tilt 3D', value: 'tilt' },
        ],
      },
      initialValue: 'lift',
    }),

    defineField({
      name: 'transitionEffect',
      title: 'Effetto Transizione (Carousel)',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Slide', value: 'slide' },
          { title: 'Fade', value: 'fade' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Flip', value: 'flip' },
          { title: 'Cards', value: 'cards' },
          { title: 'Creative', value: 'creative' },
        ],
      },
      initialValue: 'slide',
      hidden: ({ parent }) => !['carousel', 'slider-thumb'].includes(parent?.layout || ''),
    }),

    // === AGGREGATED RATING ===
    defineField({
      name: 'showAggregateRating',
      title: 'Mostra Rating Aggregato',
      type: 'boolean',
      group: 'content',
      description: 'Mostra il rating medio sopra le testimonianze',
      initialValue: false,
    }),

    defineField({
      name: 'aggregateRatingTitle',
      title: 'Titolo Rating',
      type: 'localeString',
      group: 'content',
      description: 'Es: "Valutazione media dei nostri clienti"',
      hidden: ({ parent }) => !parent?.showAggregateRating,
    }),

    defineField({
      name: 'totalReviews',
      title: 'Numero Totale Recensioni',
      type: 'number',
      group: 'content',
      description: 'Es: 150 (mostrerà "su 150 recensioni")',
      hidden: ({ parent }) => !parent?.showAggregateRating,
    }),

    // === CTA ===
    defineField({
      name: 'showCta',
      title: 'Mostra CTA Finale',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),

    defineField({
      name: 'ctaText',
      title: 'Testo CTA',
      type: 'localeString',
      description: 'Es: "Lascia anche tu una recensione"',
      group: 'content',
      hidden: ({ parent }) => !parent?.showCta,
    }),

    defineField({
      name: 'ctaLink',
      title: 'Link CTA',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => !parent?.showCta,
    }),
  ],

  preview: {
    select: { title: 'title.it', testimonials: 'testimonials', layout: 'layout' },
    prepare({ title, testimonials, layout }) {
      const titleText = getPlainText(title)
      const count = testimonials?.length || 0
      const layoutLabels: Record<string, string> = {
        carousel: 'Carosello',
        'grid-2': 'Griglia 2',
        'grid-3': 'Griglia 3',
        list: 'Lista',
        masonry: 'Masonry',
        stacked: 'Impilate',
        'slider-thumb': 'Slider',
        'featured-list': 'Featured',
        marquee: 'Marquee',
        bubble: 'Bubble',
      }
      return {
        title: `💬 ${titleText || 'Testimonianze'}`,
        subtitle: `${count} testimonianze • ${layoutLabels[layout] || 'Carosello'}`,
      }
    },
  },
})
