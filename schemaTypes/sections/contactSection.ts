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
      type: 'localeString',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
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
    select: { title: 'title.it' },
    prepare({ title }) {
      return { title: `📞 ${title || 'Contatti'}` }
    },
  },
})
