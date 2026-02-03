// Tipo: Rich Text con formattazione BASE
// SEMPLIFICATO per debug SchemaError
import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Testo Formattato',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normale', value: 'normal' },
        { title: 'Titolo 1', value: 'h1' },
        { title: 'Titolo 2', value: 'h2' },
        { title: 'Titolo 3', value: 'h3' },
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
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Apri in nuova scheda',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
  ],
})
