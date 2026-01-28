// Schema: Impostazioni Sito
// Configurazioni globali del sito

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: () => '⚙️',

  // Raggruppamento campi per una navigazione più intuitiva
  groups: [
    { name: 'company', title: '🏢 Azienda', default: true },
    { name: 'contact', title: '📞 Contatti' },
    { name: 'social', title: '📱 Social Media' },
    { name: 'branding', title: '🎨 Logo e Brand' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'analytics', title: '📊 Analytics' },
  ],

  fields: [
    // === INFORMAZIONI AZIENDA ===
    defineField({
      name: 'company',
      title: 'Informazioni Azienda',
      type: 'object',
      group: 'company',
      fields: [
        {
          name: 'name',
          title: '🏢 Nome Azienda',
          type: 'string',
          description: 'Nome commerciale visualizzato sul sito',
          initialValue: 'GLOS Italy',
        },
        {
          name: 'legalName',
          title: '📜 Ragione Sociale',
          type: 'string',
          description: 'Nome legale completo (per footer e documenti)',
          placeholder: 'Es: GLOS Italy S.r.l.',
        },
        {
          name: 'vatNumber',
          title: '🔢 Partita IVA',
          type: 'string',
          placeholder: 'Es: IT12345678901',
        },
        {
          name: 'fiscalCode',
          title: '🔢 Codice Fiscale',
          type: 'string',
          placeholder: 'Es: 12345678901',
        },
        {
          name: 'slogan',
          title: '✨ Slogan Aziendale',
          type: 'object',
          description: 'Frase breve che rappresenta l\'azienda',
          fields: [
            { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Qualità e innovazione dal 1980' },
            { name: 'en', title: '🇬🇧 English', type: 'string' },
            { name: 'es', title: '🇪🇸 Español', type: 'string' },
          ],
        },
      ],
    }),

    // === CONTATTI ===
    defineField({
      name: 'contact',
      title: 'Recapiti',
      type: 'object',
      group: 'contact',
      description: 'Informazioni di contatto principali',
      fields: [
        {
          name: 'email',
          title: '📧 Email Principale',
          type: 'string',
          placeholder: 'info@glositaly.it',
          validation: Rule => Rule.email().error('Inserisci un indirizzo email valido'),
        },
        {
          name: 'phone',
          title: '📞 Telefono',
          type: 'string',
          placeholder: '+39 0123 456789',
          description: 'Numero principale con prefisso',
        },
        {
          name: 'fax',
          title: '📠 Fax',
          type: 'string',
          placeholder: '+39 0123 456780',
        },
        {
          name: 'whatsapp',
          title: '💬 WhatsApp',
          type: 'string',
          placeholder: '+39 333 1234567',
          description: 'Numero per WhatsApp Business (opzionale)',
        },
      ],
    }),

    // === INDIRIZZO ===
    defineField({
      name: 'address',
      title: 'Sede Legale',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'street', title: '📍 Via', type: 'string', placeholder: 'Via Roma 123' },
        { name: 'city', title: '🏙️ Città', type: 'string', placeholder: 'Milano' },
        { name: 'province', title: 'Provincia', type: 'string', placeholder: 'MI' },
        { name: 'postalCode', title: '📮 CAP', type: 'string', placeholder: '20100' },
        { name: 'country', title: '🌍 Paese', type: 'string', initialValue: 'Italia' },
        {
          name: 'mapLat',
          title: '📍 Latitudine Mappa',
          type: 'number',
          description: 'Per Google Maps: cerca l\'indirizzo, tasto destro > "Cosa c\'è qui?" e copia il primo numero',
          placeholder: '45.4642',
        },
        {
          name: 'mapLng',
          title: '📍 Longitudine Mappa',
          type: 'number',
          description: 'Il secondo numero dalle coordinate di Google Maps',
          placeholder: '9.1900',
        },
      ],
    }),

    // === ORARI ===
    defineField({
      name: 'businessHours',
      title: '🕐 Orari di Apertura',
      type: 'object',
      group: 'contact',
      description: 'Orari visualizzati sul sito',
      fields: [
        {
          name: 'it',
          title: '🇮🇹 Italiano',
          type: 'text',
          rows: 3,
          initialValue: 'Lun-Ven: 8:30-12:30, 14:00-18:00\nSabato: Chiuso\nDomenica: Chiuso',
          placeholder: 'Lun-Ven: 8:30-12:30, 14:00-18:00',
        },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 3 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 3 },
      ],
    }),

    // === SOCIAL MEDIA ===
    defineField({
      name: 'social',
      title: 'Profili Social',
      type: 'object',
      group: 'social',
      description: 'Inserisci gli URL completi dei profili social. Lascia vuoto quelli non utilizzati.',
      fields: [
        {
          name: 'facebook',
          title: '📘 Facebook',
          type: 'url',
          placeholder: 'https://www.facebook.com/glositaly',
        },
        {
          name: 'instagram',
          title: '📸 Instagram',
          type: 'url',
          placeholder: 'https://www.instagram.com/glositaly',
        },
        {
          name: 'linkedin',
          title: '💼 LinkedIn',
          type: 'url',
          placeholder: 'https://www.linkedin.com/company/glositaly',
        },
        {
          name: 'youtube',
          title: '▶️ YouTube',
          type: 'url',
          placeholder: 'https://www.youtube.com/@glositaly',
        },
        {
          name: 'twitter',
          title: '🐦 Twitter/X',
          type: 'url',
          placeholder: 'https://twitter.com/glositaly',
        },
      ],
    }),

    // === LOGO E BRAND ===
    defineField({
      name: 'branding',
      title: 'Loghi e Immagini Brand',
      type: 'object',
      group: 'branding',
      fields: [
        {
          name: 'logo',
          title: '🎨 Logo Principale',
          type: 'image',
          description: 'Logo per l\'header (sfondo chiaro). Formato: PNG trasparente, altezza consigliata 60-80px',
        },
        {
          name: 'logoLight',
          title: '⬜ Logo Bianco',
          type: 'image',
          description: 'Logo per il footer e sfondi scuri. Formato: PNG bianco trasparente',
        },
        {
          name: 'favicon',
          title: '🔖 Favicon',
          type: 'image',
          description: 'Icona che appare nella scheda del browser. Formato: PNG quadrato 512x512px',
        },
        {
          name: 'ogImage',
          title: '🖼️ Immagine Social Default',
          type: 'image',
          description: 'Immagine mostrata quando qualcuno condivide il sito sui social. Formato: 1200x630px',
        },
      ],
    }),

    // === SEO ===
    defineField({
      name: 'seo',
      title: 'Impostazioni SEO',
      type: 'object',
      group: 'seo',
      description: 'Configurazioni per i motori di ricerca',
      fields: [
        {
          name: 'titleTemplate',
          title: '📝 Template Titolo',
          type: 'string',
          description: 'Usa %s per il titolo della pagina. Questo formato viene applicato a tutte le pagine.',
          initialValue: '%s | GLOS Italy',
          placeholder: '%s | GLOS Italy',
        },
        {
          name: 'defaultTitle',
          title: '🏠 Titolo Homepage',
          type: 'object',
          description: 'Titolo per la homepage (senza il template)',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Blender e Taglierine Industriali' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        {
          name: 'defaultDescription',
          title: '📄 Descrizione Default',
          type: 'object',
          description: 'Descrizione usata quando una pagina non ne ha una propria (max 160 caratteri)',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'text', rows: 3 },
            { name: 'en', title: '🇬🇧', type: 'text', rows: 3 },
            { name: 'es', title: '🇪🇸', type: 'text', rows: 3 },
          ],
        },
        {
          name: 'keywords',
          title: '🏷️ Parole Chiave',
          type: 'object',
          description: 'Keywords principali del sito (separate da virgola)',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'array', of: [{ type: 'string' }] },
            { name: 'en', title: '🇬🇧', type: 'array', of: [{ type: 'string' }] },
            { name: 'es', title: '🇪🇸', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),

    // === ANALYTICS ===
    defineField({
      name: 'analytics',
      title: 'Codici di Tracciamento',
      type: 'object',
      group: 'analytics',
      description: '⚠️ Questi codici vengono inseriti automaticamente nel sito. Modifica solo se sai cosa stai facendo.',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: '📊 Google Analytics',
          type: 'string',
          description: 'ID di Google Analytics 4',
          placeholder: 'G-XXXXXXXXXX',
        },
        {
          name: 'googleTagManagerId',
          title: '🏷️ Google Tag Manager',
          type: 'string',
          description: 'ID del container GTM',
          placeholder: 'GTM-XXXXXXX',
        },
        {
          name: 'facebookPixelId',
          title: '📘 Facebook Pixel',
          type: 'string',
          description: 'ID del pixel di Meta/Facebook',
          placeholder: '1234567890123456',
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '⚙️ Impostazioni Sito',
        subtitle: 'Clicca per modificare le configurazioni globali',
      }
    },
  },
})
