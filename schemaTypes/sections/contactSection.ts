// Sezione: Contatti - VERSIONE AVANZATA v1.5.0
import { defineType, defineField, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions, containerWidthOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'contactSection',
  title: 'Sezione Contatti',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'Form di contatto con mappa, info e social',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'form', title: '📝 Form' },
    { name: 'info', title: '📍 Info Contatto' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta Sopra Titolo',
      type: 'localeRichText',
      description: 'Es: "CONTATTACI", "PARLIAMO"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      description: 'Es: "Contattaci" - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Testo introduttivo - puoi usare grassetto, colori, ecc.',
      group: 'content',
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeText',
      group: 'content',
    }),

    // === ELEMENTI DA MOSTRARE ===
    defineField({
      name: 'showForm',
      title: 'Mostra Form Contatti',
      type: 'boolean',
      description: 'Visualizza il modulo per inviare messaggi',
      group: 'content',
      initialValue: true,
    }),

    defineField({
      name: 'showMap',
      title: 'Mostra Mappa',
      type: 'boolean',
      description: 'Visualizza la mappa con la posizione dell\'azienda',
      group: 'content',
      initialValue: true,
    }),

    defineField({
      name: 'showContactInfo',
      title: 'Mostra Dati di Contatto',
      type: 'boolean',
      description: 'Visualizza telefono, email e indirizzo',
      group: 'content',
      initialValue: true,
    }),

    defineField({
      name: 'showSocialLinks',
      title: 'Mostra Social',
      type: 'boolean',
      description: 'Visualizza i link ai profili social',
      group: 'content',
      initialValue: false,
    }),

    defineField({
      name: 'showOpeningHours',
      title: 'Mostra Orari',
      type: 'boolean',
      description: 'Visualizza gli orari di apertura',
      group: 'content',
      initialValue: false,
    }),

    // === FORM ===
    defineField({
      name: 'formTitle',
      title: 'Titolo Form',
      type: 'localeRichText',
      description: 'Es: "Inviaci un messaggio"',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'formSubtitle',
      title: 'Sottotitolo Form',
      type: 'localeRichText',
      description: 'Breve descrizione sotto il titolo',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'formFields',
      title: 'Campi del Form',
      type: 'array',
      group: 'form',
      description: 'Personalizza i campi del form',
      hidden: ({ parent }) => !parent?.showForm,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'formField',
          fields: [
            defineField({
              name: 'type',
              title: 'Tipo Campo',
              type: 'string',
              options: {
                list: [
                  { title: 'Testo (una riga)', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Telefono', value: 'tel' },
                  { title: 'Area Testo (più righe)', value: 'textarea' },
                  { title: 'Selezione', value: 'select' },
                  { title: 'Checkbox', value: 'checkbox' },
                  { title: 'Data', value: 'date' },
                  { title: 'File Upload', value: 'file' },
                ],
              },
              initialValue: 'text',
            }),
            defineField({
              name: 'name',
              title: 'Nome Campo',
              type: 'string',
              description: 'Nome tecnico del campo',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Etichetta',
              type: 'localeRichText',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'localeRichText',
            }),
            defineField({
              name: 'required',
              title: 'Obbligatorio',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'options',
              title: 'Opzioni (per selezione)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => parent?.type !== 'select',
            }),
            defineField({
              name: 'width',
              title: 'Larghezza',
              type: 'string',
              options: {
                list: [
                  { title: 'Piena', value: 'full' },
                  { title: 'Metà', value: 'half' },
                ],
              },
              initialValue: 'full',
            }),
          ],
          preview: {
            select: { label: 'label.it', type: 'type', required: 'required' },
            prepare({ label, type, required }) {
              const labelText = getPlainText(label)
              return {
                title: `${labelText || 'Campo'} ${required ? '*' : ''}`,
                subtitle: type,
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'submitButtonText',
      title: 'Testo Pulsante Invio',
      type: 'localeRichText',
      description: 'Es: "Invia Messaggio"',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'submitButtonIcon',
      title: 'Icona Pulsante',
      type: 'string',
      description: 'Es: →, ✉️, 📤',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'formSuccessMessage',
      title: 'Messaggio di Successo',
      type: 'localeRichText',
      description: 'Cosa mostrare dopo l\'invio. Es: "Grazie! Ti risponderemo presto."',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'formErrorMessage',
      title: 'Messaggio di Errore',
      type: 'localeRichText',
      description: 'Es: "Si è verificato un errore. Riprova."',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'privacyText',
      title: 'Testo Privacy',
      type: 'localeRichText',
      description: 'Checkbox privacy con link alla privacy policy',
      group: 'form',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    defineField({
      name: 'formStyle',
      title: 'Stile Form',
      type: 'string',
      group: 'form',
      options: {
        list: [
          { title: 'Classico', value: 'classic' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Floating Labels', value: 'floating' },
          { title: 'Card', value: 'card' },
        ],
      },
      initialValue: 'classic',
      hidden: ({ parent }) => !parent?.showForm,
    }),

    // === INFO CONTATTO ===
    defineField({
      name: 'contactInfoTitle',
      title: 'Titolo Info Contatto',
      type: 'localeRichText',
      description: 'Es: "I Nostri Recapiti"',
      group: 'info',
      hidden: ({ parent }) => !parent?.showContactInfo,
    }),

    defineField({
      name: 'contactItems',
      title: 'Informazioni di Contatto',
      type: 'array',
      group: 'info',
      hidden: ({ parent }) => !parent?.showContactInfo,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactItem',
          fields: [
            defineField({
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: '📍 Indirizzo', value: 'address' },
                  { title: '📞 Telefono', value: 'phone' },
                  { title: '📱 Cellulare', value: 'mobile' },
                  { title: '✉️ Email', value: 'email' },
                  { title: '💬 WhatsApp', value: 'whatsapp' },
                  { title: '📠 Fax', value: 'fax' },
                  { title: '🏢 P.IVA', value: 'vat' },
                  { title: '🔗 Altro', value: 'other' },
                ],
              },
            }),
            defineField({
              name: 'label',
              title: 'Etichetta',
              type: 'localeRichText',
            }),
            defineField({
              name: 'value',
              title: 'Valore',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL per rendere cliccabile (tel:, mailto:, etc)',
            }),
            defineField({
              name: 'icon',
              title: 'Icona Custom',
              type: 'string',
              options: {
                list: iconOptions,
              },
            }),
          ],
          preview: {
            select: { type: 'type', value: 'value' },
            prepare({ type, value }) {
              const icons: Record<string, string> = {
                address: '📍',
                phone: '📞',
                mobile: '📱',
                email: '✉️',
                whatsapp: '💬',
                fax: '📠',
                vat: '🏢',
                other: '🔗',
              }
              return {
                title: `${icons[type] || '📌'} ${value || 'Info'}`,
              }
            },
          },
        }),
      ],
    }),

    // Orari
    defineField({
      name: 'openingHoursTitle',
      title: 'Titolo Orari',
      type: 'localeRichText',
      group: 'info',
      hidden: ({ parent }) => !parent?.showOpeningHours,
    }),

    defineField({
      name: 'openingHours',
      title: 'Orari di Apertura',
      type: 'array',
      group: 'info',
      hidden: ({ parent }) => !parent?.showOpeningHours,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'hours',
          fields: [
            defineField({
              name: 'days',
              title: 'Giorni',
              type: 'localeRichText',
              description: 'Es: "Lunedì - Venerdì"',
            }),
            defineField({
              name: 'hours',
              title: 'Orari',
              type: 'string',
              description: 'Es: "9:00 - 18:00"',
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'localeRichText',
              description: 'Es: "Pausa pranzo: 12:30 - 14:00"',
            }),
          ],
          preview: {
            select: { days: 'days.it', hours: 'hours' },
            prepare({ days, hours }) {
              const daysText = getPlainText(days)
              return { title: daysText || 'Giorno', subtitle: hours }
            },
          },
        }),
      ],
    }),

    // Social
    defineField({
      name: 'socialTitle',
      title: 'Titolo Social',
      type: 'localeRichText',
      group: 'info',
      hidden: ({ parent }) => !parent?.showSocialLinks,
    }),

    defineField({
      name: 'socialLinks',
      title: 'Link Social',
      type: 'array',
      group: 'info',
      hidden: ({ parent }) => !parent?.showSocialLinks,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'social',
          fields: [
            defineField({
              name: 'platform',
              title: 'Piattaforma',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Telegram', value: 'telegram' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
            defineField({
              name: 'label',
              title: 'Etichetta (opzionale)',
              type: 'string',
            }),
          ],
          preview: {
            select: { platform: 'platform', url: 'url' },
            prepare({ platform }) {
              return { title: platform || 'Social' }
            },
          },
        }),
      ],
    }),

    // Mappa
    defineField({
      name: 'mapType',
      title: 'Tipo Mappa',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Google Maps Embed', value: 'google' },
          { title: 'OpenStreetMap', value: 'openstreet' },
          { title: 'Immagine Statica', value: 'image' },
        ],
      },
      initialValue: 'google',
      hidden: ({ parent }) => !parent?.showMap,
    }),

    defineField({
      name: 'mapEmbedUrl',
      title: 'URL Embed Mappa',
      type: 'url',
      description: 'URL di embed da Google Maps',
      group: 'info',
      hidden: ({ parent }) => !parent?.showMap || parent?.mapType !== 'google',
    }),

    defineField({
      name: 'mapImage',
      title: 'Immagine Mappa',
      type: 'image',
      group: 'info',
      hidden: ({ parent }) => !parent?.showMap || parent?.mapType !== 'image',
    }),

    defineField({
      name: 'mapZoom',
      title: 'Zoom Mappa',
      type: 'number',
      description: '1-20',
      group: 'info',
      validation: Rule => Rule.min(1).max(20),
      initialValue: 15,
      hidden: ({ parent }) => !parent?.showMap,
    }),

    defineField({
      name: 'mapHeight',
      title: 'Altezza Mappa',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Piccola (200px)', value: 'sm' },
          { title: 'Media (300px)', value: 'md' },
          { title: 'Grande (400px)', value: 'lg' },
          { title: 'Extra Grande (500px)', value: 'xl' },
        ],
      },
      initialValue: 'md',
      hidden: ({ parent }) => !parent?.showMap,
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Tipo Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Form a Sinistra, Info a Destra', value: 'form-left' },
          { title: 'Form a Destra, Info a Sinistra', value: 'form-right' },
          { title: 'Form Sopra, Mappa Sotto', value: 'stacked' },
          { title: 'Mappa Sopra, Form Sotto', value: 'map-first' },
          { title: 'Solo Form (centrato)', value: 'form-only' },
          { title: 'Solo Info (centrato)', value: 'info-only' },
          { title: 'Grid (3 colonne)', value: 'grid' },
          { title: 'Mappa Full Width + Form Overlay', value: 'map-overlay' },
        ],
      },
      initialValue: 'form-left',
    }),

    defineField({
      name: 'formWidth',
      title: 'Larghezza Form',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Stretta', value: 'narrow' },
          { title: 'Normale', value: 'normal' },
          { title: 'Larga', value: 'wide' },
        ],
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'contentWidth',
      title: 'Larghezza Contenuto',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Stretta', value: 'narrow' },
          { title: 'Normale', value: 'normal' },
          { title: 'Larga', value: 'wide' },
          { title: 'Piena', value: 'full' },
        ],
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'paddingY',
      title: 'Spaziatura Verticale (Legacy)',
      type: 'string',
      group: 'layout',
      description: 'Usa Padding Top/Bottom per controllo più preciso',
      options: {
        list: paddingOptions,
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'paddingTop',
      title: 'Spaziatura Sopra',
      type: 'string',
      group: 'layout',
      description: 'Spazio sopra la sezione',
      options: {
        list: paddingOptions,
      },
    }),

    defineField({
      name: 'paddingBottom',
      title: 'Spaziatura Sotto',
      type: 'string',
      group: 'layout',
      description: 'Spazio sotto la sezione',
      options: {
        list: paddingOptions,
      },
    }),

    defineField({
      name: 'marginTop',
      title: 'Margine Sopra',
      type: 'string',
      group: 'layout',
      description: 'Distanza dalla sezione precedente',
      options: {
        list: marginOptions,
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'marginBottom',
      title: 'Margine Sotto',
      type: 'string',
      group: 'layout',
      description: 'Distanza dalla sezione successiva',
      options: {
        list: marginOptions,
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'containerMaxWidth',
      title: 'Larghezza Massima Sezione',
      type: 'string',
      group: 'layout',
      description: 'Controlla la larghezza del contenitore',
      options: {
        list: containerWidthOptions,
      },
      initialValue: 'normal',
    }),

    // === TIPOGRAFIA ===
    defineField({
      name: 'titleSize',
      title: 'Dimensione Titolo',
      type: 'string',
      group: 'typography',
      options: { list: titleSizeOptions },
      initialValue: 'lg',
    }),

    defineField({
      name: 'titleWeight',
      title: 'Peso Titolo',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    }),

    defineField({
      name: 'titleColor',
      title: 'Colore Titolo',
      type: 'string',
      group: 'typography',
      options: { list: textColorOptions },
    }),

    defineField({
      name: 'subtitleSize',
      title: 'Dimensione Sottotitolo',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (14px)', value: 'sm' },
          { title: 'Normale (16px)', value: 'base' },
          { title: 'Grande (18px)', value: 'lg' },
          { title: 'Extra Grande (20px)', value: 'xl' },
        ],
      },
      initialValue: 'base',
    }),

    defineField({
      name: 'labelSize',
      title: 'Dimensione Etichette Form',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (12px)', value: 'xs' },
          { title: 'Normale (14px)', value: 'sm' },
          { title: 'Grande (16px)', value: 'base' },
        ],
      },
      initialValue: 'sm',
    }),

    defineField({
      name: 'infoTitleSize',
      title: 'Dimensione Titoli Info',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (14px)', value: 'sm' },
          { title: 'Normale (16px)', value: 'base' },
          { title: 'Grande (18px)', value: 'lg' },
        ],
      },
      initialValue: 'base',
    }),

    // === STILE ===
    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Blu Chiaro', value: 'primary-light' },
          { title: 'Nero', value: 'black' },
          { title: 'Gradiente', value: 'gradient' },
        ],
      },
      initialValue: 'white',
    }),

    defineField({
      name: 'textColor',
      title: 'Colore Testo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Automatico', value: 'auto' },
          { title: 'Scuro', value: 'dark' },
          { title: 'Chiaro', value: 'light' },
        ],
      },
      initialValue: 'auto',
    }),

    defineField({
      name: 'cardStyle',
      title: 'Stile Card Info',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Bordo', value: 'border' },
          { title: 'Ombra', value: 'shadow' },
          { title: 'Glass', value: 'glass' },
          { title: 'Colored', value: 'colored' },
        ],
      },
      initialValue: 'shadow',
    }),

    defineField({
      name: 'iconStyle',
      title: 'Stile Icone',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Semplice', value: 'simple' },
          { title: 'Cerchio Pieno', value: 'circle-filled' },
          { title: 'Cerchio Outline', value: 'circle-outlined' },
          { title: 'Quadrato', value: 'square' },
        ],
      },
      initialValue: 'circle-filled',
    }),

    defineField({
      name: 'animation',
      title: 'Animazione Entrata',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade In', value: 'fade' },
          { title: 'Fade Up', value: 'fade-up' },
          { title: 'Slide da Sinistra', value: 'slide-left' },
          { title: 'Slide da Destra', value: 'slide-right' },
        ],
      },
      initialValue: 'fade-up',
    }),

    // === DECORAZIONI ===
    defineField({
      name: 'showDecorations',
      title: 'Elementi Decorativi',
      type: 'boolean',
      group: 'style',
      description: 'Mostra elementi grafici decorativi',
      initialValue: false,
    }),

    defineField({
      name: 'decorativeImage',
      title: 'Immagine Decorativa',
      type: 'image',
      group: 'style',
      description: 'Immagine di sfondo o laterale',
      hidden: ({ parent }) => !parent?.showDecorations,
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      showForm: 'showForm',
      showMap: 'showMap',
      showInfo: 'showContactInfo',
      layout: 'layout',
    },
    prepare({ title, showForm, showMap, showInfo, layout }) {
      const titleText = getPlainText(title)
      const elements = []
      if (showForm) elements.push('Form')
      if (showMap) elements.push('Mappa')
      if (showInfo) elements.push('Info')

      return {
        title: `📞 ${titleText || 'Contatti'}`,
        subtitle: elements.length > 0 ? `${elements.join(' + ')} • ${layout || 'form-left'}` : 'Nessun elemento',
      }
    },
  },
})
