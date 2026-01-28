// Schema: Impostazioni Sito
// Configurazioni globali del sito

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    // Informazioni Azienda
    defineField({
      name: 'company',
      title: 'Informazioni Azienda',
      type: 'object',
      fields: [
        { name: 'name', title: 'Nome Azienda', type: 'string', initialValue: 'GLOS Italy' },
        { name: 'legalName', title: 'Ragione Sociale', type: 'string' },
        { name: 'vatNumber', title: 'Partita IVA', type: 'string' },
        { name: 'fiscalCode', title: 'Codice Fiscale', type: 'string' },
        {
          name: 'slogan',
          title: 'Slogan',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
      ],
    }),

    // Contatti
    defineField({
      name: 'contact',
      title: 'Contatti',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Telefono', type: 'string' },
        { name: 'fax', title: 'Fax', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
      ],
    }),

    // Indirizzo
    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'object',
      fields: [
        { name: 'street', title: 'Via', type: 'string' },
        { name: 'city', title: 'Città', type: 'string' },
        { name: 'province', title: 'Provincia', type: 'string' },
        { name: 'postalCode', title: 'CAP', type: 'string' },
        { name: 'country', title: 'Paese', type: 'string', initialValue: 'Italia' },
        { name: 'mapLat', title: 'Latitudine Mappa', type: 'number' },
        { name: 'mapLng', title: 'Longitudine Mappa', type: 'number' },
      ],
    }),

    // Orari
    defineField({
      name: 'businessHours',
      title: 'Orari',
      type: 'object',
      fields: [
        {
          name: 'it',
          title: '🇮🇹 Italiano',
          type: 'text',
          rows: 3,
          initialValue: 'Lun-Ven: 8:30-12:30, 14:00-18:00\nSabato: Chiuso\nDomenica: Chiuso',
        },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 3 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 3 },
      ],
    }),

    // Social Media
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
      ],
    }),

    // Logo e Immagini
    defineField({
      name: 'branding',
      title: 'Logo e Brand',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Logo Principale',
          type: 'image',
          description: 'Logo per header (sfondo chiaro)',
        },
        {
          name: 'logoLight',
          title: 'Logo Bianco',
          type: 'image',
          description: 'Logo per footer (sfondo scuro)',
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: 'Icona browser (512x512px)',
        },
        {
          name: 'ogImage',
          title: 'Immagine Social Default',
          type: 'image',
          description: 'Immagine default per social sharing (1200x630px)',
        },
      ],
    }),

    // SEO Default
    defineField({
      name: 'seo',
      title: 'SEO Default',
      type: 'object',
      fields: [
        {
          name: 'titleTemplate',
          title: 'Template Titolo',
          type: 'string',
          description: 'Usa %s per il titolo pagina. Es: "%s | GLOS Italy"',
          initialValue: '%s | GLOS Italy',
        },
        {
          name: 'defaultTitle',
          title: 'Titolo Default',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        {
          name: 'defaultDescription',
          title: 'Descrizione Default',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'text', rows: 3 },
            { name: 'en', title: '🇬🇧', type: 'text', rows: 3 },
            { name: 'es', title: '🇪🇸', type: 'text', rows: 3 },
          ],
        },
        {
          name: 'keywords',
          title: 'Keywords Default',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'array', of: [{ type: 'string' }] },
            { name: 'en', title: '🇬🇧', type: 'array', of: [{ type: 'string' }] },
            { name: 'es', title: '🇪🇸', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),

    // Analytics
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        { name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string', description: 'Es: G-XXXXXXXXXX' },
        { name: 'googleTagManagerId', title: 'Google Tag Manager ID', type: 'string', description: 'Es: GTM-XXXXXXX' },
        { name: 'facebookPixelId', title: 'Facebook Pixel ID', type: 'string' },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '⚙️ Impostazioni Sito',
        subtitle: 'Configurazioni globali',
      }
    },
  },
})
