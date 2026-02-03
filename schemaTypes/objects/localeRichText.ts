// Tipo: Rich Text Multilingua - VERSIONE SEMPLIFICATA
// Risolve SchemaError causato dalla complessità eccessiva
import { defineType, defineArrayMember } from 'sanity'

// Lingue supportate
const supportedLanguages = [
  { id: 'it', title: 'Italiano', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Español' },
]

// ============================================
// COLORI TESTO - Palette base
// ============================================
const textColors = [
  { title: '⬛ Nero', value: 'black' },
  { title: '⬜ Bianco', value: 'white' },
  { title: '🔘 Grigio', value: 'gray' },
  { title: '🔵 Blu GLOS', value: 'primary' },
  { title: '🔴 Rosso', value: 'red' },
  { title: '🟢 Verde', value: 'green' },
  { title: '🟠 Arancione', value: 'orange' },
  { title: '🟣 Viola', value: 'purple' },
]

// ============================================
// COLORI EVIDENZIAZIONE
// ============================================
const highlightColors = [
  { title: '🟡 Giallo', value: 'yellow' },
  { title: '🟢 Verde Chiaro', value: 'lightgreen' },
  { title: '🔵 Azzurro', value: 'lightblue' },
  { title: '🩷 Rosa', value: 'pink' },
]

// ============================================
// DIMENSIONI FONT
// ============================================
const fontSizes = [
  { title: '12px - Piccolo', value: 'sm' },
  { title: '16px - Normale', value: 'base' },
  { title: '20px - Grande', value: 'lg' },
  { title: '24px - Molto Grande', value: 'xl' },
  { title: '32px - Extra Grande', value: '2xl' },
  { title: '48px - Gigante', value: '3xl' },
]

// ============================================
// BLOCK CONTENT SEMPLIFICATO
// ============================================
const simpleRichTextBlock = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Normale', value: 'normal' },
    { title: 'Titolo 1', value: 'h1' },
    { title: 'Titolo 2', value: 'h2' },
    { title: 'Titolo 3', value: 'h3' },
    { title: 'Titolo 4', value: 'h4' },
    { title: 'Citazione', value: 'blockquote' },
  ],
  lists: [
    { title: 'Elenco Puntato', value: 'bullet' },
    { title: 'Elenco Numerato', value: 'number' },
  ],
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
      // Colore Testo
      {
        name: 'textColor',
        type: 'object',
        title: 'Colore Testo',
        fields: [
          {
            name: 'color',
            type: 'string',
            title: 'Colore',
            options: { list: textColors },
          },
        ],
      },
      // Evidenziazione
      {
        name: 'highlight',
        type: 'object',
        title: 'Evidenzia',
        fields: [
          {
            name: 'color',
            type: 'string',
            title: 'Colore',
            options: { list: highlightColors },
            initialValue: 'yellow',
          },
        ],
      },
      // Dimensione Font
      {
        name: 'fontSize',
        type: 'object',
        title: 'Dimensione',
        fields: [
          {
            name: 'size',
            type: 'string',
            title: 'Dimensione',
            options: { list: fontSizes },
          },
        ],
      },
    ],
  },
})

// ============================================
// EXPORT TIPO PRINCIPALE
// ============================================
export default defineType({
  name: 'localeRichText',
  title: 'Testo Formattato Multilingua',
  type: 'object',
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: [simpleRichTextBlock],
  })),
})
