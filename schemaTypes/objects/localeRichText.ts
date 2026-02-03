// Tipo: Rich Text Multilingua - Usa il tipo richText esistente
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localeRichText',
  title: 'Testo Formattato Multilingua',
  type: 'object',
  fields: [
    defineField({
      name: 'it',
      title: 'Italiano',
      type: 'richText',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'richText',
    }),
    defineField({
      name: 'es',
      title: 'Español',
      type: 'richText',
    }),
  ],
})
