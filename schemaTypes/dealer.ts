// Schema: Rivenditore - VERSIONE COMPLETA
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dealer',
  title: 'Rivenditori',
  type: 'document',
  icon: () => '🏪',

  groups: [
    { name: 'info', title: '📋 Informazioni', default: true },
    { name: 'contact', title: '📞 Contatti' },
    { name: 'location', title: '📍 Sede' },
    { name: 'media', title: '🎬 Media' },
    { name: 'settings', title: '⚙️ Impostazioni' },
  ],

  fields: [
    // === INFORMAZIONI ===
    defineField({
      name: 'name',
      title: 'Nome Azienda',
      type: 'string',
      group: 'info',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: '🏪 Rivenditore', value: 'rivenditore' },
          { title: '🏭 Distributore', value: 'distributore' },
          { title: '👤 Agente', value: 'agente' },
        ],
        layout: 'radio',
      },
      initialValue: 'rivenditore',
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      group: 'info',
      rows: 3,
      description: 'Breve descrizione del rivenditore (opzionale)',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'info',
      options: { hotspot: true },
    }),

    defineField({
      name: 'certifications',
      title: 'Certificazioni',
      type: 'array',
      group: 'info',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '✅ Rivenditore Autorizzato', value: 'Autorizzato' },
          { title: '🔧 Centro Assistenza', value: 'Assistenza' },
          { title: '⭐ Premium Partner', value: 'Premium' },
        ],
      },
    }),

    // === CONTATTI ===
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: Rule => Rule.email(),
    }),

    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'website',
      title: 'Sito Web',
      type: 'url',
      group: 'contact',
      description: 'URL completo (es: https://www.esempio.it)',
    }),

    defineField({
      name: 'openingHours',
      title: 'Orari di Apertura',
      type: 'text',
      group: 'contact',
      rows: 4,
      description: 'Es: Lun-Ven: 9:00-18:00, Sab: 9:00-12:00',
    }),

    // === SEDE ===
    defineField({
      name: 'country',
      title: 'Paese',
      type: 'string',
      group: 'location',
      options: {
        list: [
          { title: '🇮🇹 Italia', value: 'Italia' },
          { title: '🇫🇷 Francia', value: 'Francia' },
          { title: '🇩🇪 Germania', value: 'Germania' },
          { title: '🇪🇸 Spagna', value: 'Spagna' },
          { title: '🇨🇭 Svizzera', value: 'Svizzera' },
          { title: '🇦🇹 Austria', value: 'Austria' },
          { title: '🇬🇧 Regno Unito', value: 'Regno Unito' },
          { title: '🇳🇱 Paesi Bassi', value: 'Paesi Bassi' },
          { title: '🇧🇪 Belgio', value: 'Belgio' },
          { title: '🇵🇱 Polonia', value: 'Polonia' },
          { title: '🇵🇹 Portogallo', value: 'Portogallo' },
          { title: '🇬🇷 Grecia', value: 'Grecia' },
          { title: '🌍 Altro', value: 'Altro' },
        ],
      },
      initialValue: 'Italia',
    }),

    defineField({
      name: 'city',
      title: 'Città',
      type: 'string',
      group: 'location',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'address',
      title: 'Indirizzo Completo',
      type: 'string',
      group: 'location',
      description: 'Via, numero civico, CAP',
    }),

    defineField({
      name: 'location',
      title: 'Coordinate Mappa (Opzionali)',
      type: 'object',
      group: 'location',
      description: '⚡ AUTOMATICO: Se compili Città + Indirizzo, la posizione viene calcolata automaticamente! Inserisci le coordinate solo se vuoi una posizione precisa diversa.',
      fields: [
        {
          name: 'lat',
          title: 'Latitudine',
          type: 'number',
          description: 'Lascia vuoto per geocoding automatico',
          validation: Rule => Rule.min(-90).max(90),
        },
        {
          name: 'lng',
          title: 'Longitudine',
          type: 'number',
          description: 'Lascia vuoto per geocoding automatico',
          validation: Rule => Rule.min(-180).max(180),
        },
      ],
    }),

    defineField({
      name: 'regions',
      title: 'Zone Coperte',
      type: 'array',
      group: 'location',
      of: [{ type: 'string' }],
      description: 'Regioni o province servite',
    }),

    // === MEDIA ===
    defineField({
      name: 'youtubeVideo',
      title: 'Video YouTube',
      type: 'url',
      group: 'media',
      description: 'Link al video YouTube del rivenditore (es: https://www.youtube.com/watch?v=xxxxx)',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https'],
      }),
    }),

    defineField({
      name: 'gallery',
      title: 'Galleria Foto',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Didascalia',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Foto del negozio, showroom, team',
    }),

    // === IMPOSTAZIONI ===
    defineField({
      name: 'isActive',
      title: 'Attivo',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Disattiva per nascondere dalla mappa e dalla lista',
    }),

    defineField({
      name: 'isFeatured',
      title: 'In Evidenza',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      description: 'Mostra in cima alla lista',
    }),

    defineField({
      name: 'internalNotes',
      title: 'Note Interne',
      type: 'text',
      group: 'settings',
      rows: 3,
      description: 'Note visibili solo agli admin (non pubblicate)',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      city: 'city',
      country: 'country',
      type: 'type',
      active: 'isActive',
      featured: 'isFeatured',
      media: 'logo',
    },
    prepare({ title, city, country, type, active, featured, media }) {
      const typeLabel = type === 'distributore' ? '🏭' : type === 'agente' ? '👤' : '🏪'
      const status = active ? (featured ? '⭐' : '✅') : '❌'
      const location = [city, country].filter(Boolean).join(', ')
      return {
        title: title || 'Rivenditore senza nome',
        subtitle: `${typeLabel} ${location} ${status}`,
        media,
      }
    },
  },
})
