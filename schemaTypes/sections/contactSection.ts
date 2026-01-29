// Sezione: Contatti
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Sezione Contatti',
  type: 'object',
  icon: () => '📞',
  description: 'Form di contatto con email, telefono e mappa',

  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      initialValue: 'Contattaci',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'showForm',
      title: 'Mostra Form',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'showMap',
      title: 'Mostra Mappa',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'showContactInfo',
      title: 'Mostra Info Contatto',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `📞 ${title || 'Contatti'}` }
    },
  },
})
