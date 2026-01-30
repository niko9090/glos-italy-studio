// Sezione: Contatti
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Sezione Contatti',
  type: 'object',
  icon: () => '📞',
  description: 'Form di contatto con email, telefono e mappa',

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'content',
      title: 'Testi',
      default: true,
    },
    {
      name: 'elements',
      title: 'Elementi',
    },
    {
      name: 'form',
      title: 'Form',
    },
  ],

  fields: [
    // === GRUPPO TESTI ===
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeString',
      description: 'Es: "Contattaci", "Parliamo del tuo progetto"',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
      description: 'Testo introduttivo. Es: "Siamo a disposizione per qualsiasi domanda"',
      group: 'content',
    }),

    // === GRUPPO ELEMENTI ===
    defineField({
      name: 'showForm',
      title: 'Mostra Form Contatti',
      type: 'boolean',
      description: 'Visualizza il modulo per inviare messaggi',
      group: 'elements',
      initialValue: true,
    }),

    defineField({
      name: 'showMap',
      title: 'Mostra Mappa',
      type: 'boolean',
      description: 'Visualizza la mappa con la posizione dell\'azienda',
      group: 'elements',
      initialValue: true,
    }),

    defineField({
      name: 'showContactInfo',
      title: 'Mostra Dati di Contatto',
      type: 'boolean',
      description: 'Visualizza telefono, email e indirizzo',
      group: 'elements',
      initialValue: true,
    }),

    defineField({
      name: 'showSocialLinks',
      title: 'Mostra Social',
      type: 'boolean',
      description: 'Visualizza i link ai profili social',
      group: 'elements',
      initialValue: false,
    }),

    // === GRUPPO FORM ===
    defineField({
      name: 'formTitle',
      title: 'Titolo Form',
      type: 'localeString',
      description: 'Es: "Inviaci un messaggio"',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'formSuccessMessage',
      title: 'Messaggio di Successo',
      type: 'localeString',
      description: 'Cosa mostrare dopo l\'invio. Es: "Grazie! Ti risponderemo presto."',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'requiredFields',
      title: 'Campi Obbligatori',
      type: 'array',
      description: 'Seleziona quali campi sono obbligatori nel form',
      group: 'form',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Nome', value: 'name' },
          { title: 'Email', value: 'email' },
          { title: 'Telefono', value: 'phone' },
          { title: 'Messaggio', value: 'message' },
          { title: 'Azienda', value: 'company' },
        ],
      },
      initialValue: ['name', 'email', 'message'],
      hidden: ({ parent }) => !parent?.showForm,
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      showForm: 'showForm',
      showMap: 'showMap',
      showInfo: 'showContactInfo'
    },
    prepare({ title, showForm, showMap, showInfo }) {
      const elements = []
      if (showForm) elements.push('Form')
      if (showMap) elements.push('Mappa')
      if (showInfo) elements.push('Info')

      return {
        title: `📞 ${title || 'Contatti'}`,
        subtitle: elements.length > 0 ? elements.join(' + ') : 'Nessun elemento attivo',
      }
    },
  },
})
