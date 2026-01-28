// Schema: Rivenditore
// Gestione rete rivenditori

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dealer',
  title: 'Rivenditori',
  type: 'document',
  icon: () => '🏪',

  // Raggruppamento campi per una migliore organizzazione
  groups: [
    { name: 'info', title: '📋 Informazioni Base', default: true },
    { name: 'contact', title: '📞 Contatti' },
    { name: 'location', title: '📍 Posizione' },
    { name: 'settings', title: '⚙️ Impostazioni' },
  ],

  fields: [
    // === INFORMAZIONI BASE ===
    defineField({
      name: 'name',
      title: 'Nome Rivenditore',
      type: 'string',
      description: 'Il nome commerciale del rivenditore o azienda',
      placeholder: 'Es: Ferramenta Rossi Srl',
      validation: Rule => Rule.required().error('Il nome è obbligatorio'),
      group: 'info',
    }),

    defineField({
      name: 'type',
      title: 'Tipologia',
      type: 'string',
      description: 'Seleziona il tipo di collaborazione',
      options: {
        list: [
          { title: '🏪 Rivenditore', value: 'dealer' },
          { title: '📦 Distributore', value: 'distributor' },
          { title: '👤 Agente', value: 'agent' },
        ],
        layout: 'radio',
      },
      initialValue: 'dealer',
      group: 'info',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo del rivenditore (opzionale). Formato consigliato: PNG trasparente, max 500x500px',
      options: { hotspot: true },
      group: 'info',
    }),

    // === CONTATTI ===
    defineField({
      name: 'contact',
      title: 'Informazioni di Contatto',
      type: 'object',
      description: 'Recapiti del rivenditore',
      group: 'contact',
      fields: [
        {
          name: 'email',
          title: '📧 Email',
          type: 'string',
          placeholder: 'info@rivenditore.it',
          validation: Rule => Rule.email().error('Inserisci un indirizzo email valido'),
        },
        {
          name: 'phone',
          title: '📞 Telefono',
          type: 'string',
          placeholder: '+39 0123 456789',
          description: 'Numero principale del rivenditore',
        },
        {
          name: 'website',
          title: '🌐 Sito Web',
          type: 'url',
          placeholder: 'https://www.rivenditore.it',
          description: 'URL completo del sito web (opzionale)',
        },
      ],
    }),

    // === INDIRIZZO ===
    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'object',
      description: 'Indirizzo fisico del punto vendita',
      group: 'location',
      fields: [
        {
          name: 'street',
          title: 'Via/Piazza',
          type: 'string',
          placeholder: 'Via Roma 123',
        },
        {
          name: 'city',
          title: 'Città',
          type: 'string',
          placeholder: 'Milano',
          validation: Rule => Rule.required().error('La città è obbligatoria'),
        },
        {
          name: 'province',
          title: 'Provincia',
          type: 'string',
          placeholder: 'MI',
          description: 'Sigla provincia (2 lettere)',
          validation: Rule => Rule.max(2).warning('Usa la sigla a 2 lettere'),
        },
        {
          name: 'postalCode',
          title: 'CAP',
          type: 'string',
          placeholder: '20100',
          validation: Rule => Rule.regex(/^\d{5}$/).error('Il CAP deve essere di 5 cifre'),
        },
        {
          name: 'region',
          title: 'Regione',
          type: 'string',
          placeholder: 'Lombardia',
        },
        {
          name: 'country',
          title: 'Paese',
          type: 'string',
          placeholder: 'Italia',
          initialValue: 'Italia',
        },
      ],
    }),

    // === COORDINATE MAPPA ===
    defineField({
      name: 'location',
      title: 'Coordinate GPS',
      type: 'object',
      description: '📍 Come trovare le coordinate: apri Google Maps, cerca l\'indirizzo, clicca con il tasto destro sulla posizione esatta e seleziona "Cosa c\'è qui?". Appariranno le coordinate in basso.',
      group: 'location',
      fields: [
        {
          name: 'lat',
          title: 'Latitudine',
          type: 'number',
          description: 'Valore tra -90 e 90 (es: 45.4642)',
          placeholder: '45.4642',
          validation: Rule => Rule
            .min(-90).error('La latitudine deve essere tra -90 e 90')
            .max(90).error('La latitudine deve essere tra -90 e 90'),
        },
        {
          name: 'lng',
          title: 'Longitudine',
          type: 'number',
          description: 'Valore tra -180 e 180 (es: 9.1900)',
          placeholder: '9.1900',
          validation: Rule => Rule
            .min(-180).error('La longitudine deve essere tra -180 e 180')
            .max(180).error('La longitudine deve essere tra -180 e 180'),
        },
      ],
    }),

    // === IMPOSTAZIONI ===
    defineField({
      name: 'isActive',
      title: '✅ Attivo',
      type: 'boolean',
      description: 'Se disattivato, il rivenditore non apparirà sul sito',
      initialValue: true,
      group: 'settings',
    }),

    defineField({
      name: 'isFeatured',
      title: '⭐ In Evidenza',
      type: 'boolean',
      description: 'Mostra questo rivenditore in primo piano nella lista',
      initialValue: false,
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      city: 'address.city',
      province: 'address.province',
      type: 'type',
      active: 'isActive',
      featured: 'isFeatured',
      media: 'logo',
    },
    prepare({ title, city, province, type, active, featured, media }) {
      const typeLabels: Record<string, string> = {
        dealer: '🏪',
        distributor: '📦',
        agent: '👤',
      }
      const typeIcon = typeLabels[type] || '🏪'
      const status = active ? (featured ? '⭐' : '✅') : '❌'

      return {
        title: `${status} ${title}`,
        subtitle: `${typeIcon} ${city || ''}${province ? ` (${province})` : ''}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Nome (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Città (A-Z)',
      name: 'cityAsc',
      by: [{ field: 'address.city', direction: 'asc' }],
    },
  ],
})
