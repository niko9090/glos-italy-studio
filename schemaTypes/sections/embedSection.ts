// Embed Section - Contenuti esterni (mappe, form, widget)
import { defineType, defineField } from 'sanity'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'embedSection',
  title: 'Embed Esterno',
  type: 'object',
  icon: () => '🔗',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'embed', title: 'Embed' },
    { name: 'style', title: 'Stile' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeRichText',
      group: 'content',
    }),
    // Embed
    defineField({
      name: 'embedType',
      title: 'Tipo Embed',
      type: 'string',
      group: 'embed',
      options: {
        list: [
          { title: 'Google Maps', value: 'google-maps' },
          { title: 'Google Form', value: 'google-form' },
          { title: 'Calendly', value: 'calendly' },
          { title: 'Typeform', value: 'typeform' },
          { title: 'Codice HTML Personalizzato', value: 'custom' },
          { title: 'iFrame URL', value: 'iframe' },
        ],
        layout: 'radio',
      },
      initialValue: 'google-maps',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'URL Google Maps Embed',
      type: 'url',
      group: 'embed',
      description: 'Copia l\'URL di incorporamento da Google Maps',
      hidden: ({ parent }) => parent?.embedType !== 'google-maps',
    }),
    defineField({
      name: 'googleMapsAddress',
      title: 'Oppure Inserisci Indirizzo',
      type: 'string',
      group: 'embed',
      description: 'Indirizzo da mostrare sulla mappa',
      hidden: ({ parent }) => parent?.embedType !== 'google-maps',
    }),
    defineField({
      name: 'googleFormUrl',
      title: 'URL Google Form',
      type: 'url',
      group: 'embed',
      hidden: ({ parent }) => parent?.embedType !== 'google-form',
    }),
    defineField({
      name: 'calendlyUrl',
      title: 'URL Calendly',
      type: 'url',
      group: 'embed',
      hidden: ({ parent }) => parent?.embedType !== 'calendly',
    }),
    defineField({
      name: 'typeformUrl',
      title: 'URL Typeform',
      type: 'url',
      group: 'embed',
      hidden: ({ parent }) => parent?.embedType !== 'typeform',
    }),
    defineField({
      name: 'customHtml',
      title: 'Codice HTML',
      type: 'text',
      group: 'embed',
      description: 'Incolla qui il codice embed HTML',
      hidden: ({ parent }) => parent?.embedType !== 'custom',
    }),
    defineField({
      name: 'iframeUrl',
      title: 'URL iFrame',
      type: 'url',
      group: 'embed',
      hidden: ({ parent }) => parent?.embedType !== 'iframe',
    }),
    // Style
    defineField({
      name: 'height',
      title: 'Altezza',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Piccola (300px)', value: '300' },
          { title: 'Media (450px)', value: '450' },
          { title: 'Grande (600px)', value: '600' },
          { title: 'Extra Grande (800px)', value: '800' },
        ],
      },
      initialValue: '450',
    }),
    defineField({
      name: 'width',
      title: 'Larghezza',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Contenuto', value: 'container' },
          { title: 'Piena Larghezza', value: 'full' },
        ],
      },
      initialValue: 'container',
    }),
    defineField({
      name: 'rounded',
      title: 'Bordi Arrotondati',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'shadow',
      title: 'Ombra',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray' },
          { title: 'Scuro', value: 'dark' },
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'paddingTop',
      title: 'Spaziatura Sopra',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Spaziatura Sotto',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'marginTop',
      title: 'Margine Sopra',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
    }),
    defineField({
      name: 'marginBottom',
      title: 'Margine Sotto',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
    }),
  ],
  preview: {
    select: {
      title: 'title.it',
      embedType: 'embedType',
    },
    prepare({ title, embedType }) {
      const typeLabels: Record<string, string> = {
        'google-maps': '🗺️ Google Maps',
        'google-form': '📝 Google Form',
        calendly: '📅 Calendly',
        typeform: '📋 Typeform',
        custom: '💻 HTML Custom',
        iframe: '🖼️ iFrame',
      }
      return {
        title: title || 'Embed',
        subtitle: `🔗 ${typeLabels[embedType] || 'Embed'}`,
      }
    },
  },
})
