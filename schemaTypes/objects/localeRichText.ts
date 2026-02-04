// Tipo: Rich Text Multilingua
import { defineType } from 'sanity'

// Lingue supportate
const supportedLanguages = [
  { id: 'it', title: 'Italiano', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Espanol' },
]

export default defineType({
  name: 'localeRichText',
  title: 'Testo Formattato Multilingua',
  type: 'object',
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'richText',
  })),
})
