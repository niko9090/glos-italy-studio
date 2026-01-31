// Tipo: Rich Text con formattazione completa (singola lingua)
import { defineType, defineArrayMember } from 'sanity'

// Colori disponibili per il testo
const textColors = [
  { title: 'Nero', value: 'black' },
  { title: 'Bianco', value: 'white' },
  { title: 'Grigio', value: 'gray' },
  { title: 'Blu GLOS', value: 'primary' },
  { title: 'Verde', value: 'green' },
  { title: 'Rosso', value: 'red' },
  { title: 'Arancione', value: 'orange' },
  { title: 'Viola', value: 'purple' },
]

// Colori per evidenziazione
const highlightColors = [
  { title: 'Giallo', value: 'yellow' },
  { title: 'Verde chiaro', value: 'lightgreen' },
  { title: 'Azzurro', value: 'lightblue' },
  { title: 'Rosa', value: 'pink' },
  { title: 'Grigio chiaro', value: 'lightgray' },
]

// Dimensioni font
const fontSizes = [
  { title: 'Piccolo', value: 'small' },
  { title: 'Normale', value: 'normal' },
  { title: 'Grande', value: 'large' },
  { title: 'Extra Grande', value: 'xlarge' },
  { title: 'Enorme', value: 'xxlarge' },
]

export default defineType({
  name: 'richText',
  title: 'Testo Formattato',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Stili di paragrafo
      styles: [
        { title: 'Normale', value: 'normal' },
        { title: 'Titolo 1', value: 'h1' },
        { title: 'Titolo 2', value: 'h2' },
        { title: 'Titolo 3', value: 'h3' },
        { title: 'Titolo 4', value: 'h4' },
        { title: 'Citazione', value: 'blockquote' },
      ],
      // Liste
      lists: [
        { title: 'Elenco puntato', value: 'bullet' },
        { title: 'Elenco numerato', value: 'number' },
      ],
      // Decoratori e annotazioni
      marks: {
        decorators: [
          { title: 'Grassetto', value: 'strong' },
          { title: 'Corsivo', value: 'em' },
          { title: 'Sottolineato', value: 'underline' },
          { title: 'Barrato', value: 'strike-through' },
          { title: 'Codice', value: 'code' },
        ],
        annotations: [
          // Link
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule: any) => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                  allowRelative: true,
                }),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Apri in nuova scheda',
                initialValue: false,
              },
            ],
          },
          // Colore testo
          {
            name: 'textColor',
            type: 'object',
            title: 'Colore Testo',
            icon: () => '🎨',
            fields: [
              {
                name: 'color',
                type: 'string',
                title: 'Colore',
                options: {
                  list: textColors,
                },
              },
            ],
          },
          // Evidenziazione
          {
            name: 'highlight',
            type: 'object',
            title: 'Evidenzia',
            icon: () => '🖍️',
            fields: [
              {
                name: 'color',
                type: 'string',
                title: 'Colore Evidenziatore',
                options: {
                  list: highlightColors,
                },
                initialValue: 'yellow',
              },
            ],
          },
          // Dimensione font
          {
            name: 'fontSize',
            type: 'object',
            title: 'Dimensione',
            icon: () => '📏',
            fields: [
              {
                name: 'size',
                type: 'string',
                title: 'Dimensione',
                options: {
                  list: fontSizes,
                },
              },
            ],
          },
        ],
      },
    }),
  ],
})
