// Sezione: Call to Action
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Sezione CTA',
  type: 'object',
  icon: () => '📢',
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
      name: 'phone',
      title: 'Telefono',
      type: 'string',
      description: 'Numero da mostrare (es: +39 0123 456789)',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Immagine Sfondo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      options: {
        list: [
          { title: 'Blu GLOS', value: 'blue' },
          { title: 'Scuro', value: 'dark' },
          { title: 'Chiaro', value: 'light' },
          { title: 'Gradiente', value: 'gradient' },
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: {
    select: { title: 'title.it' },
    prepare({ title }) {
      return { title: `📢 CTA: ${title || 'Senza titolo'}` }
    },
  },
})
