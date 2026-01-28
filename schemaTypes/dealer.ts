// Schema: Rivenditore
// Gestione rete rivenditori

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dealer',
  title: 'Rivenditori',
  type: 'document',
  icon: () => '🏪',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome Rivenditore',
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
      name: 'contact',
      title: 'Contatti',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Telefono', type: 'string' },
        { name: 'website', title: 'Sito Web', type: 'url' },
      ],
    }),

    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'object',
      fields: [
        { name: 'street', title: 'Via', type: 'string' },
        { name: 'city', title: 'Città', type: 'string' },
        { name: 'province', title: 'Provincia', type: 'string' },
        { name: 'postalCode', title: 'CAP', type: 'string' },
        { name: 'country', title: 'Paese', type: 'string' },
        { name: 'region', title: 'Regione', type: 'string' },
      ],
    }),

    defineField({
      name: 'location',
      title: 'Coordinate Mappa',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitudine', type: 'number' },
        { name: 'lng', title: 'Longitudine', type: 'number' },
      ],
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'isActive',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'In Evidenza',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      city: 'address.city',
      country: 'address.country',
      active: 'isActive',
      media: 'logo',
    },
    prepare({ title, city, country, active, media }) {
      return {
        title: `${active ? '✅' : '❌'} ${title}`,
        subtitle: `${city || ''}, ${country || ''}`,
        media,
      }
    },
  },
})
