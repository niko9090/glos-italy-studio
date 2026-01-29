// Sezione: Galleria
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallerySection',
  title: 'Galleria Immagini',
  type: 'object',
  icon: () => '🖼️',
  description: 'Galleria fotografica con lightbox per vedere le immagini ingrandite',

  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeString',
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
            { name: 'caption', title: 'Didascalia', type: 'localeString' },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'title.it', images: 'images' },
    prepare({ title, images }) {
      return { title: `🖼️ ${title || 'Galleria'} (${images?.length || 0})` }
    },
  },
})
