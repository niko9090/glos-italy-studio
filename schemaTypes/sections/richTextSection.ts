// Sezione: Testo Ricco Libero
import { defineType, defineField } from 'sanity'
import { TextIcon } from '@sanity/icons'
import { getPlainText, truncate } from '../../lib/previewHelpers'

export default defineType({
  name: 'richTextSection',
  title: 'Testo Libero',
  type: 'object',
  icon: TextIcon,
  description: 'Sezione con testo formattato libero, ideale per contenuti editoriali',

  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'layout', title: 'Layout' },
    { name: 'style', title: 'Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'title',
      title: 'Titolo (opzionale)',
      type: 'localeRichText',
      group: 'content',
    }),

    defineField({
      name: 'content',
      title: 'Contenuto',
      type: 'localeRichText',
      description: 'Scrivi liberamente usando tutte le opzioni di formattazione',
      group: 'content',
    }),

    // === LAYOUT ===
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
          { title: 'Giustificato', value: 'justify' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    }),

    defineField({
      name: 'contentWidth',
      title: 'Larghezza Contenuto',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Stretta (legge meglio)', value: 'narrow' },
          { title: 'Normale', value: 'normal' },
          { title: 'Larga', value: 'wide' },
          { title: 'Piena', value: 'full' },
        ],
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'columns',
      title: 'Numero Colonne',
      type: 'number',
      group: 'layout',
      description: 'Dividi il testo in colonne (solo per testi lunghi)',
      options: {
        list: [
          { title: '1 colonna', value: 1 },
          { title: '2 colonne', value: 2 },
          { title: '3 colonne', value: 3 },
        ],
      },
      initialValue: 1,
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
          { title: 'Crema', value: 'cream' },
          { title: 'Blu Chiaro', value: 'primary-light' },
          { title: 'Nero', value: 'black' },
          { title: 'Gradiente', value: 'gradient' },
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
          { title: 'Nessuna', value: 'none' },
          { title: 'Piccola', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'dropCap',
      title: 'Capolettera',
      type: 'boolean',
      description: 'Prima lettera grande in stile editoriale',
      group: 'style',
      initialValue: false,
    }),

    defineField({
      name: 'dividers',
      title: 'Separatori',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Linea sopra', value: 'top' },
          { title: 'Linea sotto', value: 'bottom' },
          { title: 'Entrambi', value: 'both' },
        ],
      },
      initialValue: 'none',
    }),
  ],

  preview: {
    select: { title: 'title.it', content: 'content.it' },
    prepare({ title, content }) {
      const titleText = getPlainText(title)
      const contentText = getPlainText(content)
      return {
        title: `📝 ${titleText || 'Testo Libero'}`,
        subtitle: truncate(contentText, 60) || 'Sezione testo',
      }
    },
  },
})
