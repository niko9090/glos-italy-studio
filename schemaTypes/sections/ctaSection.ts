// Sezione: Call to Action
// Banner con invito all'azione

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: '📢 Sezione CTA',
  type: 'object',
  icon: () => '📢',
  description: 'Banner con invito all\'azione - ideale per promuovere contatti o prodotti',

  fields: [
    defineField({
      name: 'title',
      title: '📌 Titolo',
      type: 'object',
      description: 'Titolo accattivante che cattura l\'attenzione',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Pronto a migliorare la tua produzione?' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    defineField({
      name: 'subtitle',
      title: '📝 Sottotitolo',
      type: 'object',
      description: 'Breve testo di supporto (1-2 frasi)',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 2, placeholder: 'Es: Contattaci per una consulenza gratuita e scopri le soluzioni più adatte alle tue esigenze.' },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'primaryButton',
      title: '🔵 Pulsante Primario',
      type: 'object',
      description: 'Pulsante principale dell\'azione',
      fields: [
        {
          name: 'text',
          title: 'Testo',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Richiedi Preventivo' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        {
          name: 'link',
          title: 'Destinazione',
          type: 'string',
          description: 'Pagina interna: /contatti | Pagina esterna: https://...',
          placeholder: '/contatti',
        },
      ],
    }),

    defineField({
      name: 'secondaryButton',
      title: '⚪ Pulsante Secondario (opzionale)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'text',
          title: 'Testo',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Scopri di Più' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        { name: 'link', title: 'Destinazione', type: 'string', placeholder: '/chi-siamo' },
      ],
    }),

    defineField({
      name: 'phone',
      title: '📞 Numero di Telefono',
      type: 'string',
      description: 'Mostra un numero di telefono cliccabile (opzionale)',
      placeholder: '+39 0123 456789',
    }),

    defineField({
      name: 'backgroundImage',
      title: '🖼️ Immagine di Sfondo',
      type: 'image',
      description: 'Immagine opzionale dietro il contenuto. Se non impostata, verrà usato il colore di sfondo.',
      options: { hotspot: true },
    }),

    defineField({
      name: 'backgroundColor',
      title: '🎨 Colore Sfondo',
      type: 'string',
      description: 'Colore di sfondo (usato solo se non c\'è immagine)',
      options: {
        list: [
          { title: '🔵 Blu GLOS (brand)', value: 'blue' },
          { title: '⚫ Scuro (elegante)', value: 'dark' },
          { title: '⚪ Chiaro (pulito)', value: 'light' },
          { title: '🌈 Gradiente (moderno)', value: 'gradient' },
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      bg: 'backgroundColor',
      media: 'backgroundImage',
    },
    prepare({ title, bg, media }) {
      const bgLabels: Record<string, string> = {
        blue: '🔵',
        dark: '⚫',
        light: '⚪',
        gradient: '🌈',
      }
      return {
        title: `📢 CTA: ${title || 'Senza titolo'}`,
        subtitle: `Sfondo: ${bgLabels[bg] || '🔵'} ${media ? '+ immagine' : ''}`,
        media,
      }
    },
  },
})
