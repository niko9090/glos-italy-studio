// Sezione: Hero
// Banner principale che appare in cima alla pagina

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: '🎯 Sezione Hero',
  type: 'object',
  icon: () => '🎯',
  description: 'Banner principale con titolo, sottotitolo e pulsanti call-to-action',

  fields: [
    defineField({
      name: 'badge',
      title: '🏷️ Badge (opzionale)',
      type: 'object',
      description: 'Piccola etichetta sopra il titolo, es: "Nuovo!", "Leader del settore"',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Dal 1980' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    defineField({
      name: 'title',
      title: '📌 Titolo Principale',
      type: 'object',
      description: 'Il titolo grande e impattante dell\'hero',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Macchinari Industriali di Qualità' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    defineField({
      name: 'highlightedText',
      title: '✨ Testo Evidenziato',
      type: 'object',
      description: 'Parte del titolo da evidenziare con colore diverso (opzionale)',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: di Qualità' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    defineField({
      name: 'subtitle',
      title: '📝 Sottotitolo',
      type: 'object',
      description: 'Testo descrittivo sotto il titolo (1-2 frasi)',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 2, placeholder: 'Es: Leader nella produzione di blender e taglierine per l\'industria alimentare.' },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'primaryButton',
      title: '🔵 Pulsante Primario',
      type: 'object',
      description: 'Pulsante principale ben visibile (es: "Scopri i Prodotti", "Contattaci")',
      fields: [
        {
          name: 'text',
          title: 'Testo del Pulsante',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Scopri i Prodotti' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        {
          name: 'link',
          title: 'Destinazione',
          type: 'string',
          description: 'Pagina interna: /prodotti | Pagina esterna: https://...',
          placeholder: '/prodotti',
        },
      ],
    }),

    defineField({
      name: 'secondaryButton',
      title: '⚪ Pulsante Secondario',
      type: 'object',
      description: 'Pulsante alternativo meno evidente (opzionale)',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'text',
          title: 'Testo del Pulsante',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Chi Siamo' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        {
          name: 'link',
          title: 'Destinazione',
          type: 'string',
          placeholder: '/chi-siamo',
        },
      ],
    }),

    defineField({
      name: 'backgroundImage',
      title: '🖼️ Immagine di Sfondo',
      type: 'image',
      description: 'Immagine a tutto schermo dietro il contenuto. Consigliato: 1920x1080px, alta qualità',
      options: { hotspot: true },
    }),

    defineField({
      name: 'heroImage',
      title: '📷 Immagine Prodotto',
      type: 'image',
      description: 'Immagine laterale del prodotto (per layout split). Lascia vuoto per layout centrato.',
      options: { hotspot: true },
    }),

    defineField({
      name: 'layout',
      title: '📐 Layout',
      type: 'string',
      description: 'Come disporre il contenuto nell\'hero',
      options: {
        list: [
          { title: '↔️ Centrato - Tutto al centro', value: 'centered' },
          { title: '⬅️ Sinistra - Testo a sinistra', value: 'left' },
          { title: '↔️ Split - Testo + Immagine', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: `🎯 Hero: ${title || 'Senza titolo'}`,
        subtitle: 'Banner principale della pagina',
        media,
      }
    },
  },
})
