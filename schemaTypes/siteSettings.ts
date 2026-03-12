// Schema: Impostazioni Sito - VERSIONE SEMPLIFICATA
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: () => '⚙️',

  groups: [
    { name: 'company', title: '🏢 Azienda', default: true },
    { name: 'contact', title: '📞 Contatti' },
    { name: 'social', title: '🌐 Social' },
  ],

  fields: [
    // ══════════════════════════════════════════════════════
    // AZIENDA
    // ══════════════════════════════════════════════════════
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

    // ══════════════════════════════════════════════════════
    // CONTATTI
    // ══════════════════════════════════════════════════════
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
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      group: 'contact',
      description: 'Numero con prefisso (es: +39 333 1234567)',
    }),

    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'text',
      group: 'contact',
      rows: 3,
    }),

    // ══════════════════════════════════════════════════════
    // SOCIAL
    // ══════════════════════════════════════════════════════
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

    // ══════════════════════════════════════════════════════
    // CAMPI NASCOSTI (mantenuti per compatibilita)
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      hidden: true,
    }),

    defineField({
      name: 'listinoPrezziPdfIt',
      title: 'Listino PDF IT',
      type: 'file',
      hidden: true,
    }),

    defineField({
      name: 'listinoPrezziPdfEn',
      title: 'Listino PDF EN',
      type: 'file',
      hidden: true,
    }),

    defineField({
      name: 'listinoPrezziPdfEs',
      title: 'Listino PDF ES',
      type: 'file',
      hidden: true,
    }),

    defineField({
      name: 'catalogoPdf',
      title: 'Catalogo PDF',
      type: 'file',
      hidden: true,
    }),

    defineField({
      name: 'headerLogoSize',
      title: 'Dimensione Logo Header',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'headerHeight',
      title: 'Altezza Header',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'headerStyle',
      title: 'Stile Header',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'headerCtaText',
      title: 'Testo CTA Header',
      type: 'localeString',
      hidden: true,
    }),

    defineField({
      name: 'headerCtaLink',
      title: 'Link CTA Header',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'headerShowLanguageSelector',
      title: 'Selettore Lingua',
      type: 'boolean',
      hidden: true,
    }),

    defineField({
      name: 'headerNavGap',
      title: 'Gap Nav',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'footerLogoSize',
      title: 'Logo Footer Size',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'footerStyle',
      title: 'Stile Footer',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'footerColumns',
      title: 'Colonne Footer',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'footerShowSocial',
      title: 'Social Footer',
      type: 'boolean',
      hidden: true,
    }),

    defineField({
      name: 'footerShowQuickLinks',
      title: 'Quick Links Footer',
      type: 'boolean',
      hidden: true,
    }),

    defineField({
      name: 'footerShowProducts',
      title: 'Prodotti Footer',
      type: 'boolean',
      hidden: true,
    }),

    defineField({
      name: 'footerShowContacts',
      title: 'Contatti Footer',
      type: 'boolean',
      hidden: true,
    }),

    defineField({
      name: 'footerPadding',
      title: 'Padding Footer',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'footerColumnsGap',
      title: 'Gap Colonne Footer',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'footerCopyrightText',
      title: 'Copyright Footer',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'footerBottomLinks',
      title: 'Link Footer',
      type: 'array',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'href', title: 'Link', type: 'string' },
        ],
      }],
    }),

    defineField({
      name: 'emailSupport',
      title: 'Email Supporto',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'mobile',
      title: 'Cellulare',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'whatsappMessage',
      title: 'Messaggio WhatsApp',
      type: 'text',
      hidden: true,
    }),

    defineField({
      name: 'tawkPropertyId',
      title: 'Tawk ID',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'tawkWidgetId',
      title: 'Tawk Widget',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'fax',
      title: 'Fax',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'contactFormRecipient',
      title: 'Email Form',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'contactFormSubject',
      title: 'Oggetto Form',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'addressOperational',
      title: 'Sede Operativa',
      type: 'text',
      hidden: true,
    }),

    defineField({
      name: 'mapEmbedUrl',
      title: 'URL Mappa',
      type: 'url',
      hidden: true,
    }),

    defineField({
      name: 'vatNumber',
      title: 'P.IVA',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'fiscalCode',
      title: 'Codice Fiscale',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'rea',
      title: 'REA',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'capitaleSociale',
      title: 'Capitale Sociale',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'pec',
      title: 'PEC',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'sdi',
      title: 'SDI',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
      hidden: true,
    }),

    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      hidden: true,
    }),

    defineField({
      name: 'openingHours',
      title: 'Orari',
      type: 'array',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          { name: 'days', title: 'Giorni', type: 'string' },
          { name: 'hours', title: 'Orari', type: 'string' },
        ],
      }],
    }),

    defineField({
      name: 'holidayNotice',
      title: 'Avviso Chiusura',
      type: 'text',
      hidden: true,
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '⚙️ Impostazioni Sito',
        subtitle: 'Dati aziendali e contatti',
      }
    },
  },
})
