// Sezione: Call to Action
import { defineType, defineField } from 'sanity'
import { BellIcon } from '@sanity/icons'

export default defineType({
  name: 'ctaSection',
  title: 'Invito all\'Azione',
  type: 'object',
  icon: BellIcon,
  description: 'Banner colorato con pulsante per invitare il visitatore a contattarti',

  // Gruppi per organizzare i campi
  groups: [
    {
      name: 'content',
      title: 'Testi',
      default: true,
    },
    {
      name: 'action',
      title: 'Azioni',
    },
    {
      name: 'style',
      title: 'Aspetto',
    },
  ],

  fields: [
    // === GRUPPO TESTI ===
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeString',
      description: 'Frase d\'impatto. Es: "Pronto a migliorare la tua produzione?"',
      group: 'content',
      validation: Rule => Rule.required().error('Il titolo è obbligatorio'),
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
      description: 'Testo di supporto. Es: "Contattaci oggi per una consulenza gratuita"',
      group: 'content',
    }),

    // === GRUPPO AZIONI ===
    defineField({
      name: 'buttonText',
      title: 'Testo Pulsante Principale',
      type: 'localeString',
      description: 'Es: "Contattaci", "Richiedi Preventivo", "Scopri di Più"',
      group: 'action',
    }),

    defineField({
      name: 'buttonLink',
      title: 'Link Pulsante',
      type: 'string',
      description: 'Dove porta il pulsante. Es: /contatti',
      group: 'action',
    }),

    defineField({
      name: 'phone',
      title: 'Numero di Telefono',
      type: 'string',
      description: 'Se inserito, appare come link cliccabile. Es: +39 0523 123456',
      group: 'action',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Se inserita, appare come link cliccabile. Es: info@glositaly.com',
      group: 'action',
    }),

    // === GRUPPO ASPETTO ===
    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      description: 'Il colore del banner',
      group: 'style',
      options: {
        list: [
          { title: 'Blu GLOS', value: 'blue' },
          { title: 'Scuro (Nero)', value: 'dark' },
          { title: 'Chiaro (Bianco)', value: 'light' },
          { title: 'Verde', value: 'green' },
          { title: 'Rosso', value: 'red' },
        ],
      },
      initialValue: 'blue',
    }),

    defineField({
      name: 'fullWidth',
      title: 'Larghezza Piena',
      type: 'boolean',
      description: 'Se attivo, il banner occupa tutta la larghezza dello schermo',
      group: 'style',
      initialValue: true,
    }),
  ],

  preview: {
    select: { title: 'title.it', buttonText: 'buttonText.it', bg: 'backgroundColor' },
    prepare({ title, buttonText, bg }) {
      const bgEmoji: Record<string, string> = {
        blue: '🔵',
        dark: '⚫',
        light: '⚪',
        green: '🟢',
        red: '🔴',
      }
      return {
        title: `📢 ${title || 'CTA'}`,
        subtitle: `${bgEmoji[bg] || '🔵'} Pulsante: "${buttonText || 'Contattaci'}"`,
      }
    },
  },
})
