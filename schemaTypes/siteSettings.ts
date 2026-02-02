// Schema: Impostazioni Sito - v1.5.0
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: () => '⚙️',

  groups: [
    { name: 'company', title: '🏢 Azienda', default: true },
    { name: 'contact', title: '📞 Contatti' },
    { name: 'legal', title: '📋 Dati Legali' },
    { name: 'social', title: '🌐 Social' },
    { name: 'hours', title: '🕐 Orari' },
  ],

  fields: [
    // === AZIENDA ===
    defineField({
      name: 'companyName',
      title: 'Nome Azienda',
      type: 'string',
      group: 'company',
      initialValue: 'GLOS Italy',
    }),

    defineField({
      name: 'legalName',
      title: 'Ragione Sociale',
      type: 'string',
      group: 'company',
      description: 'Nome legale completo (es: GLOS Italy S.r.l.)',
      initialValue: 'GLOS Italy S.r.l.',
    }),

    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      group: 'company',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'company',
      options: { hotspot: true },
    }),

    defineField({
      name: 'logoWhite',
      title: 'Logo (versione bianca)',
      type: 'image',
      group: 'company',
      description: 'Per sfondi scuri',
      options: { hotspot: true },
    }),

    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'company',
      description: 'Icona per la tab del browser (32x32 o 64x64 px)',
    }),

    // === CONTATTI ===
    defineField({
      name: 'email',
      title: 'Email Principale',
      type: 'string',
      group: 'contact',
      initialValue: 'info@glositaly.com',
      validation: Rule => Rule.email(),
    }),

    defineField({
      name: 'emailSupport',
      title: 'Email Supporto',
      type: 'string',
      group: 'contact',
      validation: Rule => Rule.email(),
    }),

    defineField({
      name: 'phone',
      title: 'Telefono Fisso',
      type: 'string',
      group: 'contact',
      initialValue: '+39 06 4182 0359',
    }),

    defineField({
      name: 'mobile',
      title: 'Cellulare',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      group: 'contact',
      description: 'Numero con prefisso internazionale (es: +39 333 1234567)',
    }),

    defineField({
      name: 'fax',
      title: 'Fax',
      type: 'string',
      group: 'contact',
    }),

    // === INDIRIZZI ===
    defineField({
      name: 'address',
      title: 'Sede Legale',
      type: 'text',
      group: 'contact',
      rows: 3,
      initialValue: 'Via Zoe Fontana 220\n00131 Roma (RM)\nItalia',
    }),

    defineField({
      name: 'addressOperational',
      title: 'Sede Operativa',
      type: 'text',
      group: 'contact',
      rows: 3,
      description: 'Se diversa dalla sede legale',
    }),

    defineField({
      name: 'mapEmbedUrl',
      title: 'URL Embed Google Maps',
      type: 'url',
      group: 'contact',
      description: 'URL di embed per mostrare la mappa della sede',
    }),

    // === DATI LEGALI ===
    defineField({
      name: 'vatNumber',
      title: 'Partita IVA',
      type: 'string',
      group: 'legal',
      initialValue: 'IT12345678901',
    }),

    defineField({
      name: 'fiscalCode',
      title: 'Codice Fiscale',
      type: 'string',
      group: 'legal',
    }),

    defineField({
      name: 'rea',
      title: 'REA',
      type: 'string',
      group: 'legal',
      description: 'Numero iscrizione REA (es: RM-123456)',
    }),

    defineField({
      name: 'capitaleSociale',
      title: 'Capitale Sociale',
      type: 'string',
      group: 'legal',
      description: 'Es: € 10.000,00 i.v.',
    }),

    defineField({
      name: 'pec',
      title: 'PEC',
      type: 'string',
      group: 'legal',
      description: 'Posta Elettronica Certificata',
    }),

    defineField({
      name: 'sdi',
      title: 'Codice SDI',
      type: 'string',
      group: 'legal',
      description: 'Codice destinatario fatturazione elettronica',
    }),

    // === SOCIAL ===
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      group: 'social',
    }),

    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: 'social',
    }),

    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      group: 'social',
    }),

    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      group: 'social',
    }),

    defineField({
      name: 'twitter',
      title: 'Twitter/X',
      type: 'url',
      group: 'social',
    }),

    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      group: 'social',
    }),

    // === ORARI ===
    defineField({
      name: 'openingHours',
      title: 'Orari di Apertura',
      type: 'array',
      group: 'hours',
      of: [{
        type: 'object',
        fields: [
          { name: 'days', title: 'Giorni', type: 'string', description: 'Es: Lunedì - Venerdì' },
          { name: 'hours', title: 'Orari', type: 'string', description: 'Es: 9:00 - 18:00' },
          { name: 'note', title: 'Note', type: 'string', description: 'Es: Pausa pranzo 12:30-14:00' },
        ],
        preview: {
          select: { days: 'days', hours: 'hours' },
          prepare({ days, hours }) {
            return { title: days || 'Giorno', subtitle: hours }
          },
        },
      }],
    }),

    defineField({
      name: 'holidayNotice',
      title: 'Avviso Festività/Chiusura',
      type: 'text',
      group: 'hours',
      rows: 2,
      description: 'Es: Chiusi dal 24 dicembre al 6 gennaio',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '⚙️ Impostazioni Sito',
        subtitle: 'Dati aziendali, contatti e social',
      }
    },
  },
})
