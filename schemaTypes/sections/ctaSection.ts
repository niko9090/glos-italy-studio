// Sezione: Call to Action - VERSIONE AVANZATA
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BellIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { iconOptionsCompact } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { animationOptions } from '../shared/animationOptions'
import { gradientOptions, backgroundColorOptions } from '../shared/styleOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'ctaSection',
  title: 'Invito all\'Azione',
  type: 'object',
  icon: BellIcon,
  description: 'Banner per invitare i visitatori a compiere un\'azione specifica',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'buttons', title: '🔘 Pulsanti' },
    { name: 'media', title: '🖼️ Media' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
    { name: 'animation', title: '✨ Animazioni' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta Sopra Titolo',
      type: 'localeRichText',
      description: 'Piccolo testo sopra il titolo. Es: "INIZIA ORA", "OFFERTA SPECIALE"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      description: 'Frase d\'impatto - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Testo di supporto - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeText',
      description: 'Testo più lungo (opzionale)',
      group: 'content',
    }),

    defineField({
      name: 'highlights',
      title: 'Punti Chiave',
      type: 'array',
      description: 'Lista di benefici o punti chiave',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Icona',
            type: 'string',
            options: {
              list: iconOptionsCompact,
            },
          }),
          defineField({
            name: 'text',
            title: 'Testo',
            type: 'localeRichText',
          }),
        ],
        preview: {
          select: { icon: 'icon', text: 'text.it' },
          prepare({ icon, text }) {
            const textValue = getPlainText(text)
            return { title: `${icon || '✓'} ${textValue || 'Punto'}` }
          },
        },
      }],
    }),

    // === PULSANTI ===
    defineField({
      name: 'buttons',
      title: 'Pulsanti',
      type: 'array',
      group: 'buttons',
      description: 'Aggiungi uno o più pulsanti',
      validation: Rule => Rule.max(3),
      of: [
        defineArrayMember({
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
              title: 'Stile',
              type: 'string',
              options: {
                list: [
                  { title: 'Primario (pieno)', value: 'primary' },
                  { title: 'Secondario (outline)', value: 'secondary' },
                  { title: 'Bianco', value: 'white' },
                  { title: 'Scuro', value: 'dark' },
                  { title: 'Ghost (trasparente)', value: 'ghost' },
                  { title: 'Gradiente', value: 'gradient' },
                ],
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'size',
              title: 'Dimensione',
              type: 'string',
              options: {
                list: [
                  { title: 'Piccolo', value: 'sm' },
                  { title: 'Normale', value: 'md' },
                  { title: 'Grande', value: 'lg' },
                  { title: 'Extra Grande', value: 'xl' },
                ],
              },
              initialValue: 'lg',
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
        }),
      ],
    }),

    // Legacy fields per compatibilità
    defineField({
      name: 'buttonText',
      title: 'Testo Pulsante (Legacy)',
      type: 'localeRichText',
      group: 'buttons',
      hidden: ({ parent }) => (parent?.buttons?.length || 0) > 0,
    }),

    defineField({
      name: 'buttonLink',
      title: 'Link Pulsante (Legacy)',
      type: 'string',
      group: 'buttons',
      hidden: ({ parent }) => (parent?.buttons?.length || 0) > 0,
    }),

    // === CONTATTI RAPIDI ===
    defineField({
      name: 'showContactInfo',
      title: 'Mostra Info Contatto',
      type: 'boolean',
      group: 'buttons',
      initialValue: false,
    }),

    defineField({
      name: 'phone',
      title: 'Numero di Telefono',
      type: 'string',
      description: 'Es: +39 0523 123456',
      group: 'buttons',
      hidden: ({ parent }) => !parent?.showContactInfo,
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Es: info@glositaly.com',
      group: 'buttons',
      hidden: ({ parent }) => !parent?.showContactInfo,
    }),

    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Numero WhatsApp (con prefisso internazionale)',
      group: 'buttons',
      hidden: ({ parent }) => !parent?.showContactInfo,
    }),

    // === MEDIA ===
    defineField({
      name: 'backgroundType',
      title: 'Tipo Sfondo',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Colore Solido', value: 'solid' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Immagine', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Pattern', value: 'pattern' },
        ],
      },
      initialValue: 'gradient',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Blu Scuro', value: 'primary-dark' },
          { title: 'Nero', value: 'black' },
          { title: 'Grigio Scuro', value: 'gray-dark' },
          { title: 'Bianco', value: 'white' },
          { title: 'Verde', value: 'green' },
          { title: 'Rosso', value: 'red' },
          { title: 'Viola', value: 'purple' },
          { title: 'Arancione', value: 'orange' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) => parent?.backgroundType !== 'solid',
    }),

    defineField({
      name: 'gradient',
      title: 'Gradiente',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Blu → Blu Scuro', value: 'blue-dark' },
          { title: 'Blu → Viola', value: 'blue-purple' },
          { title: 'Verde → Blu', value: 'green-blue' },
          { title: 'Arancione → Rosa', value: 'orange-pink' },
          { title: 'Viola → Rosa', value: 'purple-pink' },
          { title: 'Nero → Blu', value: 'black-blue' },
          { title: 'Nero → Grigio', value: 'black-gray' },
          { title: 'Radiale Blu', value: 'radial-blue' },
          { title: 'Radiale Viola', value: 'radial-purple' },
        ],
      },
      initialValue: 'blue-dark',
      hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
    }),

    defineField({
      name: 'gradientDirection',
      title: 'Direzione Gradiente',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Da sinistra a destra', value: 'to-r' },
          { title: 'Da destra a sinistra', value: 'to-l' },
          { title: 'Dall\'alto in basso', value: 'to-b' },
          { title: 'Dal basso in alto', value: 'to-t' },
          { title: 'Diagonale ↘', value: 'to-br' },
          { title: 'Diagonale ↙', value: 'to-bl' },
          { title: 'Radiale', value: 'radial' },
        ],
      },
      initialValue: 'to-r',
      hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
    }),

    defineField({
      name: 'backgroundImage',
      title: 'Immagine Sfondo',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),

    defineField({
      name: 'backgroundVideo',
      title: 'Video Sfondo',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'media',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),

    defineField({
      name: 'pattern',
      title: 'Pattern',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Puntini', value: 'dots' },
          { title: 'Griglia', value: 'grid' },
          { title: 'Linee Diagonali', value: 'diagonal' },
          { title: 'Onde', value: 'waves' },
          { title: 'Geometrico', value: 'geometric' },
        ],
      },
      hidden: ({ parent }) => parent?.backgroundType !== 'pattern',
    }),

    defineField({
      name: 'overlayOpacity',
      title: 'Opacità Overlay',
      type: 'number',
      description: '0 = trasparente, 100 = completamente scuro',
      group: 'media',
      initialValue: 50,
      validation: Rule => Rule.min(0).max(100),
      hidden: ({ parent }) => !['image', 'video'].includes(parent?.backgroundType || ''),
    }),

    defineField({
      name: 'decorativeImage',
      title: 'Immagine Decorativa',
      type: 'image',
      description: 'Immagine laterale (es: mockup, prodotto)',
      group: 'media',
    }),

    defineField({
      name: 'decorativeImagePosition',
      title: 'Posizione Immagine Decorativa',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Sinistra', value: 'left' },
          { title: 'Destra', value: 'right' },
          { title: 'Sfondo (centrata)', value: 'background' },
        ],
      },
      initialValue: 'right',
      hidden: ({ parent }) => !parent?.decorativeImage,
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Tipo Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Centrato', value: 'centered' },
          { title: 'Testo a Sinistra', value: 'left' },
          { title: 'Testo a Destra', value: 'right' },
          { title: 'Split (50/50)', value: 'split' },
          { title: 'Con Immagine Laterale', value: 'with-image' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Card Flottante', value: 'floating-card' },
        ],
      },
      initialValue: 'centered',
    }),

    defineField({
      name: 'size',
      title: 'Dimensione Sezione',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Piccola', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
          { title: 'Schermo Intero', value: 'full' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'fullWidth',
      title: 'Larghezza Piena',
      type: 'boolean',
      description: 'Se attivo, il banner occupa tutta la larghezza dello schermo',
      group: 'layout',
      initialValue: true,
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
        ],
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'paddingY',
      title: 'Spaziatura Verticale (Legacy)',
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

    // === TIPOGRAFIA ===
    defineField({
      name: 'titleSize',
      title: 'Dimensione Titolo',
      type: 'string',
      group: 'typography',
      options: { list: titleSizeOptions },
      initialValue: 'xl',
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
      description: 'Lascia vuoto per bianco automatico',
    }),

    defineField({
      name: 'subtitleSize',
      title: 'Dimensione Sottotitolo',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (16px)', value: 'sm' },
          { title: 'Normale (18px)', value: 'base' },
          { title: 'Grande (20px)', value: 'lg' },
          { title: 'Extra Large (24px)', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'eyebrowStyle',
      title: 'Stile Eyebrow',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Normale', value: 'normal' },
          { title: 'MAIUSCOLO', value: 'uppercase' },
          { title: 'Con Bordo', value: 'bordered' },
          { title: 'Badge Colorato', value: 'badge' },
        ],
      },
      initialValue: 'uppercase',
    }),

    // === STILE ===
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
        ],
      },
      initialValue: 'auto',
    }),

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
      name: 'borderRadius',
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
      name: 'showDecorations',
      title: 'Elementi Decorativi',
      type: 'boolean',
      group: 'style',
      description: 'Mostra elementi grafici decorativi',
      initialValue: false,
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
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Slide da Sinistra', value: 'slide-left' },
          { title: 'Slide da Destra', value: 'slide-right' },
        ],
      },
      initialValue: 'fade-up',
    }),

    defineField({
      name: 'backgroundAnimation',
      title: 'Animazione Sfondo',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Gradiente Animato', value: 'gradient' },
          { title: 'Pulse', value: 'pulse' },
          { title: 'Parallax', value: 'parallax' },
          { title: 'Particelle', value: 'particles' },
        ],
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'buttonAnimation',
      title: 'Animazione Pulsanti',
      type: 'string',
      group: 'animation',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Pulse', value: 'pulse' },
          { title: 'Bounce', value: 'bounce' },
          { title: 'Glow', value: 'glow' },
          { title: 'Shake', value: 'shake' },
        ],
      },
      initialValue: 'pulse',
    }),

    // === URGENZA ===
    defineField({
      name: 'showCountdown',
      title: 'Mostra Countdown',
      type: 'boolean',
      group: 'content',
      description: 'Mostra un timer per offerte a tempo',
      initialValue: false,
    }),

    defineField({
      name: 'countdownDate',
      title: 'Data Scadenza',
      type: 'datetime',
      group: 'content',
      hidden: ({ parent }) => !parent?.showCountdown,
    }),

    defineField({
      name: 'countdownLabel',
      title: 'Etichetta Countdown',
      type: 'localeRichText',
      description: 'Es: "Offerta valida fino a:"',
      group: 'content',
      hidden: ({ parent }) => !parent?.showCountdown,
    }),

    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'object',
      group: 'content',
      description: 'Badge evidenziato (es: "NUOVO", "-20%")',
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
              { title: 'Giallo', value: 'yellow' },
              { title: 'Blu', value: 'blue' },
              { title: 'Viola', value: 'purple' },
            ],
          },
        }),
      ],
    }),
  ],

  preview: {
    select: { title: 'title.it', layout: 'layout', backgroundType: 'backgroundType' },
    prepare({ title, layout, backgroundType }) {
      const titleText = getPlainText(title)
      const layoutLabels: Record<string, string> = {
        centered: 'Centrato',
        left: 'Sinistra',
        right: 'Destra',
        split: 'Split',
        'with-image': 'Con Immagine',
        minimal: 'Minimal',
        'floating-card': 'Card',
      }
      return {
        title: `📢 ${titleText || 'Call to Action'}`,
        subtitle: `${layoutLabels[layout] || 'Centrato'} • ${backgroundType || 'gradient'}`,
      }
    },
  },
})
