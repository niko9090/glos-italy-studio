// Tipo: Rich Text Multilingua - TEMPORANEO: alias per localeString per debug
import { defineType } from 'sanity'

// Lingue supportate
const supportedLanguages = [
  { id: 'it', title: 'Italiano', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Español' },
]

// TEMPORANEO: usa string semplice come localeString per isolare il problema
export default defineType({
  name: 'localeRichText',
  title: 'Testo Formattato Multilingua',
  type: 'object',
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
  })),
})
