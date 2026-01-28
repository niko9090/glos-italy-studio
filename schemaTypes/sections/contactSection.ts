// Sezione: Contatti
// Form di contatto e informazioni

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: '📞 Sezione Contatti',
  type: 'object',
  icon: () => '📞',
  description: 'Sezione con form di contatto, mappa e informazioni aziendali',

  fields: [
    defineField({
      name: 'title',
      title: '📌 Titolo',
      type: 'object',
      description: 'Titolo della sezione contatti',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'string', placeholder: 'Es: Contattaci' },
        { name: 'en', title: '🇬🇧 English', type: 'string' },
        { name: 'es', title: '🇪🇸 Español', type: 'string' },
      ],
    }),

    defineField({
      name: 'subtitle',
      title: '📝 Sottotitolo',
      type: 'object',
      description: 'Breve descrizione introduttiva',
      fields: [
        { name: 'it', title: '🇮🇹 Italiano', type: 'text', rows: 2, placeholder: 'Es: Siamo a tua disposizione per qualsiasi informazione.' },
        { name: 'en', title: '🇬🇧 English', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸 Español', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'showForm',
      title: '📋 Mostra Form di Contatto',
      type: 'boolean',
      description: 'Attiva per mostrare il modulo di contatto',
      initialValue: true,
    }),

    defineField({
      name: 'formSettings',
      title: '⚙️ Impostazioni Form',
      type: 'object',
      description: 'Personalizza il comportamento del form',
      hidden: ({ parent }) => !parent?.showForm,
      fields: [
        {
          name: 'submitButtonText',
          title: '🔵 Testo Pulsante Invio',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Invia Messaggio', initialValue: 'Invia Messaggio' },
            { name: 'en', title: '🇬🇧', type: 'string', placeholder: 'Send Message' },
            { name: 'es', title: '🇪🇸', type: 'string', placeholder: 'Enviar Mensaje' },
          ],
        },
        {
          name: 'successMessage',
          title: '✅ Messaggio di Successo',
          type: 'object',
          description: 'Messaggio mostrato dopo l\'invio del form',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'text', rows: 2, placeholder: 'Es: Grazie! Ti risponderemo al più presto.' },
            { name: 'en', title: '🇬🇧', type: 'text', rows: 2 },
            { name: 'es', title: '🇪🇸', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'subjects',
          title: '📋 Oggetti Selezionabili',
          type: 'array',
          description: 'Lista di opzioni per il campo "Oggetto" del form. Se vuoto, il campo non viene mostrato.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'ID Interno',
                  type: 'string',
                  description: 'Valore tecnico (senza spazi o caratteri speciali)',
                  placeholder: 'Es: info-prodotti',
                },
                {
                  name: 'label',
                  title: 'Testo Visibile',
                  type: 'object',
                  fields: [
                    { name: 'it', title: '🇮🇹', type: 'string', placeholder: 'Es: Informazioni sui prodotti' },
                    { name: 'en', title: '🇬🇧', type: 'string' },
                    { name: 'es', title: '🇪🇸', type: 'string' },
                  ],
                },
              ],
              preview: {
                select: { title: 'label.it', value: 'value' },
                prepare({ title, value }) {
                  return {
                    title: title || 'Nuovo oggetto',
                    subtitle: value,
                  }
                },
              },
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'showMap',
      title: '🗺️ Mostra Mappa',
      type: 'boolean',
      description: 'Attiva per mostrare la mappa Google Maps (richiede coordinate nelle Impostazioni Sito)',
      initialValue: true,
    }),

    defineField({
      name: 'showContactInfo',
      title: '📍 Mostra Informazioni Contatto',
      type: 'boolean',
      description: 'Mostra email, telefono e indirizzo (presi dalle Impostazioni Sito)',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      showForm: 'showForm',
      showMap: 'showMap',
      showInfo: 'showContactInfo',
    },
    prepare({ title, showForm, showMap, showInfo }) {
      const features = []
      if (showForm) features.push('📋 Form')
      if (showMap) features.push('🗺️ Mappa')
      if (showInfo) features.push('📍 Info')

      return {
        title: `📞 Contatti: ${title || 'Senza titolo'}`,
        subtitle: features.join(' • ') || 'Nessun elemento attivo',
      }
    },
  },
})
