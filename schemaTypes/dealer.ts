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
          { title: 'Rivenditore', value: 'rivenditore' },
          { title: 'Distributore', value: 'distributore' },
          { title: 'Agente', value: 'agente' },
        ],
      },
      initialValue: 'rivenditore',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
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
      title: 'Citta',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'address',
      title: 'Indirizzo Completo',
      type: 'string',
      description: 'Via, numero civico, CAP',
    }),

    defineField({
      name: 'location',
      title: 'Posizione sulla Mappa',
      type: 'object',
      description: 'Coordinate GPS. Cerca su Google Maps, clicca destro e copia le coordinate.',
      fields: [
        {
          name: 'lat',
          title: 'Latitudine',
          type: 'number',
          validation: Rule => Rule.min(-90).max(90),
        },
        {
          name: 'lng',
          title: 'Longitudine',
          type: 'number',
          validation: Rule => Rule.min(-180).max(180),
        },
      ],
    }),

    defineField({
      name: 'regions',
      title: 'Zone Coperte',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Regioni o province servite',
    }),

    defineField({
      name: 'certifications',
      title: 'Certificazioni',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Rivenditore Autorizzato', value: 'Autorizzato' },
          { title: 'Centro Assistenza', value: 'Assistenza' },
          { title: 'Premium Partner', value: 'Premium' },
        ],
      },
    }),

    defineField({
      name: 'isActive',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
      description: 'Disattiva per nascondere dalla mappa',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      city: 'city',
      type: 'type',
      active: 'isActive',
      media: 'logo',
    },
    prepare({ title, city, type, active, media }) {
      const typeLabel = type === 'distributore' ? '🏭' : type === 'agente' ? '👤' : '🏪'
      return {
        title: title,
        subtitle: `${typeLabel} ${city || ''} ${active ? '✅' : '❌'}`,
        media,
      }
    },
  },
})
