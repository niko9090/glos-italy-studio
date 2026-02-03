// Tipo: Rich Text Multilingua - FIX con defineField
import { defineType, defineField, defineArrayMember } from 'sanity'

// ============================================
// EXPORT TIPO PRINCIPALE
// ============================================
export default defineType({
  name: 'localeRichText',
  title: 'Testo Formattato Multilingua',
  type: 'object',
  fields: [
    defineField({
      name: 'it',
      title: 'Italiano',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normale', value: 'normal' },
            { title: 'Titolo 1', value: 'h1' },
            { title: 'Titolo 2', value: 'h2' },
            { title: 'Titolo 3', value: 'h3' },
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
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
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
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'es',
      title: 'Español',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título 1', value: 'h1' },
            { title: 'Título 2', value: 'h2' },
            { title: 'Título 3', value: 'h3' },
          ],
          lists: [
            { title: 'Lista con viñetas', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Subrayado', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
})
