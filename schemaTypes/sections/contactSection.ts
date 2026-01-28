// Sezione: Contatti
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Sezione Contatti',
  type: 'object',
  icon: () => '📞',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'string' },
        { name: 'en', title: '🇬🇧', type: 'string' },
        { name: 'es', title: '🇪🇸', type: 'string' },
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'object',
      fields: [
        { name: 'it', title: '🇮🇹', type: 'text', rows: 2 },
        { name: 'en', title: '🇬🇧', type: 'text', rows: 2 },
        { name: 'es', title: '🇪🇸', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'showForm',
      title: 'Mostra Form Contatto',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'formSettings',
      title: 'Impostazioni Form',
      type: 'object',
      fields: [
        {
          name: 'submitButtonText',
          title: 'Testo Pulsante',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'string' },
            { name: 'en', title: '🇬🇧', type: 'string' },
            { name: 'es', title: '🇪🇸', type: 'string' },
          ],
        },
        {
          name: 'successMessage',
          title: 'Messaggio Successo',
          type: 'object',
          fields: [
            { name: 'it', title: '🇮🇹', type: 'text', rows: 2 },
            { name: 'en', title: '🇬🇧', type: 'text', rows: 2 },
            { name: 'es', title: '🇪🇸', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'subjects',
          title: 'Oggetti Selezionabili',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Valore', type: 'string' },
                {
                  name: 'label',
                  title: 'Etichetta',
                  type: 'object',
                  fields: [
                    { name: 'it', title: '🇮🇹', type: 'string' },
                    { name: 'en', title: '🇬🇧', type: 'string' },
                    { name: 'es', title: '🇪🇸', type: 'string' },
                  ],
                },
              ],
              preview: {
                select: { title: 'label.it' },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'showMap',
      title: 'Mostra Mappa',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Mostra Info Contatto',
      type: 'boolean',
      initialValue: true,
      description: 'Mostra email, telefono, indirizzo dalle impostazioni sito',
    }),
  ],
  preview: {
    select: { title: 'title.it' },
    prepare({ title }) {
      return { title: `📞 Contatti: ${title || 'Senza titolo'}` }
    },
  },
})
