// Sezione: Testo + Immagine (layout flessibile)
import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { getPlainText, truncate } from '../../lib/previewHelpers'
import { iconOptionsCompact } from '../shared/iconOptions'

export default defineType({
  name: 'textImageSection',
  title: 'Testo + Immagine',
  type: 'object',
  icon: ImageIcon,
  description: 'Sezione con testo formattato e immagine affiancati',

  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'media', title: 'Immagine' },
    { name: 'layout', title: 'Layout' },
    { name: 'style', title: 'Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta Sopra Titolo',
      type: 'localeString',
      description: 'Piccolo testo sopra il titolo. Es: "CHI SIAMO", "I NOSTRI VALORI"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      description: 'Titolo principale della sezione',
      group: 'content',
    }),

    defineField({
      name: 'content',
      title: 'Contenuto',
      type: 'localeRichText',
      description: 'Testo principale con formattazione completa',
      group: 'content',
    }),

    defineField({
      name: 'buttons',
      title: 'Pulsanti',
      type: 'array',
      description: 'Aggiungi uno o più pulsanti',
      group: 'content',
      of: [{
        type: 'object',
        name: 'button',
        fields: [
          defineField({
            name: 'text',
            title: 'Testo',
            type: 'localeString',
          }),
          defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
          }),
          defineField({
            name: 'variant',
            title: 'Stile',
            type: 'string',
            options: {
              list: [
                { title: 'Primario (pieno)', value: 'primary' },
                { title: 'Secondario (outline)', value: 'secondary' },
                { title: 'Ghost (trasparente)', value: 'ghost' },
                { title: 'Link (solo testo)', value: 'link' },
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
        ],
        preview: {
          select: { text: 'text.it', variant: 'variant' },
          prepare({ text, variant }) {
            return { title: text || 'Pulsante', subtitle: variant }
          },
        },
      }],
    }),

    // === IMMAGINE ===
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      fields: [
        defineField({
          name: 'alt',
          title: 'Testo Alternativo',
          type: 'string',
          description: 'Descrizione per accessibilità e SEO',
        }),
      ],
    }),

    defineField({
      name: 'imageShape',
      title: 'Forma Immagine',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Rettangolare', value: 'rectangle' },
          { title: 'Quadrata', value: 'square' },
          { title: 'Arrotondata', value: 'rounded' },
          { title: 'Cerchio', value: 'circle' },
          { title: 'Blob (organica)', value: 'blob' },
        ],
      },
      initialValue: 'rectangle',
    }),

    defineField({
      name: 'imageShadow',
      title: 'Ombra Immagine',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Leggera', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Forte', value: 'lg' },
          { title: 'Extra Forte', value: 'xl' },
        ],
      },
      initialValue: 'md',
    }),

    defineField({
      name: 'imageBorder',
      title: 'Bordo Immagine',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Sottile', value: 'thin' },
          { title: 'Medio', value: 'medium' },
          { title: 'Decorativo', value: 'decorative' },
        ],
      },
      initialValue: 'none',
    }),

    // === LAYOUT ===
    defineField({
      name: 'imagePosition',
      title: 'Posizione Immagine',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Sinistra', value: 'left' },
          { title: 'Destra', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
    }),

    defineField({
      name: 'imageSize',
      title: 'Dimensione Immagine',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Piccola (30%)', value: 'small' },
          { title: 'Media (40%)', value: 'medium' },
          { title: 'Grande (50%)', value: 'large' },
          { title: 'Molto Grande (60%)', value: 'xlarge' },
        ],
      },
      initialValue: 'medium',
    }),

    defineField({
      name: 'verticalAlign',
      title: 'Allineamento Verticale',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Alto', value: 'top' },
          { title: 'Centro', value: 'center' },
          { title: 'Basso', value: 'bottom' },
        ],
      },
      initialValue: 'center',
    }),

    defineField({
      name: 'contentWidth',
      title: 'Larghezza Contenitore',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Normale', value: 'normal' },
          { title: 'Largo', value: 'wide' },
          { title: 'Piena Larghezza', value: 'full' },
        ],
      },
      initialValue: 'normal',
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
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Blu Chiaro', value: 'primary-light' },
          { title: 'Nero', value: 'black' },
          { title: 'Gradiente Blu', value: 'gradient-blue' },
        ],
      },
      initialValue: 'white',
    }),

    defineField({
      name: 'paddingY',
      title: 'Spaziatura Verticale',
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
      name: 'animation',
      title: 'Animazione Entrata',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade In', value: 'fade' },
          { title: 'Slide da sinistra', value: 'slide-left' },
          { title: 'Slide da destra', value: 'slide-right' },
          { title: 'Zoom In', value: 'zoom' },
        ],
      },
      initialValue: 'fade',
    }),
  ],

  preview: {
    select: { title: 'title.it', image: 'image', position: 'imagePosition' },
    prepare({ title, image, position }) {
      const titleText = getPlainText(title)
      return {
        title: `📝 ${titleText || 'Testo + Immagine'}`,
        subtitle: `Immagine ${position === 'left' ? 'a sinistra' : 'a destra'}`,
        media: image,
      }
    },
  },
})
