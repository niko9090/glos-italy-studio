// Schema: Impostazioni Sito
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: () => '⚙️',

  fields: [
    // AZIENDA
    defineField({
      name: 'companyName',
      title: 'Nome Azienda',
      type: 'string',
      initialValue: 'GLOS Italy',
    }),

    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),

    // CONTATTI
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
      name: 'address',
      title: 'Indirizzo',
      type: 'text',
      rows: 3,
    }),

    // SOCIAL
    defineField({
      name: 'facebook',
      title: 'Facebook (URL)',
      type: 'url',
    }),

    defineField({
      name: 'instagram',
      title: 'Instagram (URL)',
      type: 'url',
    }),

    defineField({
      name: 'linkedin',
      title: 'LinkedIn (URL)',
      type: 'url',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Impostazioni Sito',
        subtitle: 'Clicca per modificare',
      }
    },
  },
})
