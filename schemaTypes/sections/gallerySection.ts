// Sezione: Galleria
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallerySection',
  title: 'Sezione Galleria',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'string' },
        { name: 'en', title: '🇬🇧', type: 'string' },
        { name: 'es', title: '🇪🇸', type: 'string' },
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'text', rows: 2 },
        { name: 'en', title: '🇬🇧', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Testo Alt',
              type: 'object',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
            {
              name: 'caption',
              title: 'Didascalia',
              type: 'object',
              fields: [
                { name: 'it', title: '🇮🇹', type: 'string' },
                { name: 'en', title: '🇬🇧', type: 'string' },
                { name: 'es', title: '🇪🇸', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Griglia', value: 'grid' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { images: 'images' },
    prepare({ images }) {
      return { title: `🖼️ Galleria (${images?.length || 0} immagini)` }
    },
  },
})
