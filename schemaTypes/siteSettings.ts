// Schema: Impostazioni Sito - v2.0.0
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: () => '⚙️',

  groups: [
    { name: 'company', title: '🏢 Azienda', default: true },
    { name: 'header', title: '🔝 Header' },
    { name: 'footer', title: '🔻 Footer' },
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

    // === HEADER ===
    defineField({
      name: 'headerLogoSize',
      title: 'Dimensione Logo Header',
      type: 'string',
      group: 'header',
      description: 'Altezza del logo nella barra di navigazione',
      options: {
        list: [
          { title: 'Piccolo (32px)', value: 'sm' },
          { title: 'Medio (40px)', value: 'md' },
          { title: 'Normale (48px)', value: 'lg' },
          { title: 'Grande (56px)', value: 'xl' },
          { title: 'Extra Grande (64px)', value: '2xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'headerHeight',
      title: 'Altezza Header',
      type: 'string',
      group: 'header',
      options: {
        list: [
          { title: 'Compatta (64px)', value: 'sm' },
          { title: 'Normale (80px)', value: 'md' },
          { title: 'Alta (96px)', value: 'lg' },
        ],
      },
      initialValue: 'md',
    }),

    defineField({
      name: 'headerStyle',
      title: 'Stile Header',
      type: 'string',
      group: 'header',
      options: {
        list: [
          { title: 'Metallico (default)', value: 'metal' },
          { title: 'Bianco', value: 'white' },
          { title: 'Trasparente', value: 'transparent' },
          { title: 'Scuro', value: 'dark' },
        ],
      },
      initialValue: 'metal',
    }),

    defineField({
      name: 'headerCtaText',
      title: 'Testo Pulsante CTA',
      type: 'localeString',
      group: 'header',
      description: 'Testo del pulsante in alto a destra (es: "Contattaci")',
    }),

    defineField({
      name: 'headerCtaLink',
      title: 'Link Pulsante CTA',
      type: 'string',
      group: 'header',
      description: 'URL di destinazione (es: /contatti)',
      initialValue: '/contatti',
    }),

    defineField({
      name: 'headerShowLanguageSelector',
      title: 'Mostra Selettore Lingua',
      type: 'boolean',
      group: 'header',
      initialValue: true,
    }),

    defineField({
      name: 'headerNavGap',
      title: 'Distanza tra Voci Menu',
      type: 'string',
      group: 'header',
      options: {
        list: [
          { title: 'Compatto (16px)', value: '4' },
          { title: 'Normale (24px)', value: '6' },
          { title: 'Ampio (32px)', value: '8' },
          { title: 'Extra (40px)', value: '10' },
        ],
      },
      initialValue: '8',
    }),

    // === FOOTER ===
    defineField({
      name: 'footerLogoSize',
      title: 'Dimensione Logo Footer',
      type: 'string',
      group: 'footer',
      description: 'Altezza del logo nel footer',
      options: {
        list: [
          { title: 'Piccolo (32px)', value: 'sm' },
          { title: 'Medio (40px)', value: 'md' },
          { title: 'Normale (48px)', value: 'lg' },
          { title: 'Grande (56px)', value: 'xl' },
          { title: 'Extra Grande (64px)', value: '2xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'footerStyle',
      title: 'Stile Footer',
      type: 'string',
      group: 'footer',
      options: {
        list: [
          { title: 'Scuro Metallico (default)', value: 'metal-dark' },
          { title: 'Nero', value: 'black' },
          { title: 'Grigio Scuro', value: 'gray-dark' },
          { title: 'Blu GLOS', value: 'primary' },
        ],
      },
      initialValue: 'metal-dark',
    }),

    defineField({
      name: 'footerColumns',
      title: 'Numero Colonne',
      type: 'string',
      group: 'footer',
      options: {
        list: [
          { title: '2 Colonne', value: '2' },
          { title: '3 Colonne', value: '3' },
          { title: '4 Colonne (default)', value: '4' },
        ],
      },
      initialValue: '4',
    }),

    defineField({
      name: 'footerShowSocial',
      title: 'Mostra Social',
      type: 'boolean',
      group: 'footer',
      initialValue: true,
    }),

    defineField({
      name: 'footerShowQuickLinks',
      title: 'Mostra Link Rapidi',
      type: 'boolean',
      group: 'footer',
      initialValue: true,
    }),

    defineField({
      name: 'footerShowProducts',
      title: 'Mostra Sezione Prodotti',
      type: 'boolean',
      group: 'footer',
      initialValue: true,
    }),

    defineField({
      name: 'footerShowContacts',
      title: 'Mostra Contatti',
      type: 'boolean',
      group: 'footer',
      initialValue: true,
    }),

    defineField({
      name: 'footerPadding',
      title: 'Padding Footer',
      type: 'string',
      group: 'footer',
      options: {
        list: [
          { title: 'Piccolo (32px)', value: 'sm' },
          { title: 'Medio (48px)', value: 'md' },
          { title: 'Normale (64px)', value: 'lg' },
          { title: 'Grande (80px)', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'footerColumnsGap',
      title: 'Distanza tra Colonne',
      type: 'string',
      group: 'footer',
      options: {
        list: [
          { title: 'Compatto (24px)', value: '6' },
          { title: 'Normale (32px)', value: '8' },
          { title: 'Ampio (48px)', value: '12' },
        ],
      },
      initialValue: '12',
    }),

    defineField({
      name: 'footerCopyrightText',
      title: 'Testo Copyright',
      type: 'string',
      group: 'footer',
      description: 'Lascia vuoto per usare il default. Usa {year} per anno corrente.',
    }),

    defineField({
      name: 'footerBottomLinks',
      title: 'Link Bottom Bar',
      type: 'array',
      group: 'footer',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Etichetta', type: 'string' },
          { name: 'href', title: 'Link', type: 'string' },
        ],
        preview: {
          select: { label: 'label', href: 'href' },
          prepare({ label, href }) {
            return { title: label || 'Link', subtitle: href }
          },
        },
      }],
      initialValue: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookie' },
      ],
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
      name: 'whatsappMessage',
      title: 'Messaggio WhatsApp Predefinito',
      type: 'text',
      group: 'contact',
      rows: 2,
      description: 'Messaggio pre-compilato quando l\'utente clicca sul pulsante WhatsApp',
      initialValue: 'Ciao, vorrei informazioni sui vostri prodotti.',
    }),

    defineField({
      name: 'fax',
      title: 'Fax',
      type: 'string',
      group: 'contact',
    }),

    // === FORM CONTATTI ===
    defineField({
      name: 'contactFormRecipient',
      title: 'Email Destinatario Form Contatti',
      type: 'string',
      group: 'contact',
      description: 'Email a cui verranno inviate le richieste dal form di contatto del sito',
      validation: Rule => Rule.email(),
      initialValue: 'info@glositaly.it',
    }),

    defineField({
      name: 'contactFormSubject',
      title: 'Oggetto Email Form Contatti',
      type: 'string',
      group: 'contact',
      description: 'Oggetto predefinito delle email inviate dal form di contatto',
      initialValue: '[GLOS Italy] Nuova richiesta dal sito web',
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
