// Schema: Rivenditore
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dealer',
  title: 'Rivenditori',
  type: 'document',
  icon: () => '🏪',

  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Rivenditore', value: 'dealer' },
          { title: 'Distributore', value: 'distributor' },
          { title: 'Agente', value: 'agent' },
        ],
      },
      initialValue: 'dealer',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
    }),

    defineField({
      name: 'city',
      title: 'Città',
      type: 'string',
    }),

    defineField({
      name: 'address',
      title: 'Indirizzo Completo',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'isActive',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      city: 'city',
      active: 'isActive',
    },
    prepare({ title, city, active }) {
      return {
        title: title,
        subtitle: `${city || 'Senza città'} ${active ? '✅' : '❌'}`,
      }
    },
  },
})
