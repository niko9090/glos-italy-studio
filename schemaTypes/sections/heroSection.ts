// Sezione: Hero
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Sezione Hero',
  type: 'object',
  icon: () => '🎯',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'string' },
        { name: 'en', title: '🇬🇧', type: 'string' },
        { name: 'es', title: '🇪🇸', type: 'string' },
      ],
    }),
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
      name: 'highlightedText',
      title: 'Testo Evidenziato',
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
      name: 'primaryButton',
      title: 'Pulsante Primario',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Testo',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        { name: 'link', title: 'Link', type: 'string' },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Pulsante Secondario',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Testo',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        { name: 'link', title: 'Link', type: 'string' },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Immagine Sfondo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Immagine Hero',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title.it' },
    prepare({ title }) {
      return { title: `🎯 Hero: ${title || 'Senza titolo'}` }
    },
  },
})
