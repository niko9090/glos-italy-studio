// Schema: Impostazioni Sito
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: () => '⚙️',

  fields: [
    // VERSIONE
    defineField({
      name: 'siteVersion',
      title: '📦 Versione Sito',
      type: 'string',
      description: 'Inserisci la versione attuale del sito (es. "1.0.5" o l\'hash Vercel "5Sw9kvVZn")',
      validation: Rule => Rule.required().error('Inserisci la versione del sito'),
    }),

    defineField({
      name: 'lastUpdateNote',
      title: '📝 Note Ultimo Aggiornamento',
      type: 'text',
      description: 'Descrivi brevemente cosa è stato modificato in questa versione',
      rows: 2,
    }),

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
    select: {
      version: 'siteVersion',
      note: 'lastUpdateNote',
    },
    prepare({ version, note }) {
      return {
        title: 'Impostazioni Sito',
        subtitle: version ? `Versione: ${version}${note ? ' • ' + note.substring(0, 30) + '...' : ''}` : 'Clicca per configurare',
      }
    },
  },
})
