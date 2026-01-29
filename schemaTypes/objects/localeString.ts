// Tipo: Stringa Multilingua
import { defineType } from 'sanity'

// Lingue supportate
const supportedLanguages = [
  { id: 'it', title: 'Italiano', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Espanol' },
]

export default defineType({
  name: 'localeString',
  title: 'Testo Multilingua',
  type: 'object',
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
  })),
})
