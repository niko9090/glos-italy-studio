// Sezione: Prezzi - Tabelle di comparazione piani
import { defineType, defineField, defineArrayMember } from 'sanity'
import { CreditCardIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'pricingSection',
  title: 'Prezzi',
  type: 'object',
  icon: CreditCardIcon,
  description: 'Mostra i piani tariffari con tabella di comparazione',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'plans', title: '💰 Piani' },
    { name: 'layout', title: '📐 Layout' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      description: 'Es: "I Nostri Piani", "Scegli il Piano Giusto per Te"',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Breve descrizione della sezione prezzi',
      group: 'content',
    }),

    // === PIANI ===
    defineField({
      name: 'plans',
      title: 'Piani Tariffari',
      type: 'array',
      group: 'plans',
      description: 'Aggiungi i piani da mostrare (consigliato: 2-4 piani)',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Piano',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome Piano',
              type: 'localeRichText',
              description: 'Es: "Base", "Pro", "Enterprise"',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Prezzo',
              type: 'string',
              description: 'Es: "€29", "€99", "Contattaci" - può includere simbolo valuta',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'period',
              title: 'Periodo',
              type: 'localeRichText',
              description: 'Es: "/mese", "/anno", "una tantum"',
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'localeRichText',
              description: 'Breve descrizione del piano',
            }),
            defineField({
              name: 'features',
              title: 'Caratteristiche',
              type: 'array',
              description: 'Lista delle funzionalita incluse/escluse',
              of: [
                defineArrayMember({
                  type: 'object',
                  title: 'Caratteristica',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Testo',
                      type: 'localeRichText',
                      description: 'Es: "Supporto email", "Storage 10GB"',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'included',
                      title: 'Incluso',
                      type: 'boolean',
                      description: 'La caratteristica e inclusa in questo piano?',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: { text: 'text.it', included: 'included' },
                    prepare({ text, included }) {
                      const textValue = getPlainText(text)
                      return {
                        title: `${included ? '✓' : '✗'} ${textValue || 'Caratteristica'}`,
                      }
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: 'ctaText',
              title: 'Testo Pulsante',
              type: 'localeRichText',
              description: 'Es: "Inizia Ora", "Contattaci", "Prova Gratis"',
            }),
            defineField({
              name: 'ctaLink',
              title: 'Link Pulsante',
              type: 'string',
              description: 'URL di destinazione del pulsante',
            }),
            defineField({
              name: 'highlighted',
              title: 'In Evidenza',
              type: 'boolean',
              description: 'Evidenzia questo piano come consigliato',
              initialValue: false,
            }),
            defineField({
              name: 'badge',
              title: 'Badge',
              type: 'localeRichText',
              description: 'Etichetta sopra il piano. Es: "Piu popolare", "Migliore Offerta"',
            }),
          ],
          preview: {
            select: { name: 'name.it', price: 'price', highlighted: 'highlighted', badge: 'badge.it' },
            prepare({ name, price, highlighted, badge }) {
              const nameText = getPlainText(name)
              const badgeValue = getPlainText(badge)
              const prefix = highlighted ? '⭐ ' : ''
              const badgeText = badgeValue ? ` [${badgeValue}]` : ''
              return {
                title: `${prefix}${nameText || 'Piano'}${badgeText}`,
                subtitle: price || 'Prezzo non definito',
              }
            },
          },
        }),
      ],
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Tipo Layout',
      type: 'string',
      group: 'layout',
      description: 'Come disporre i piani nella pagina',
      options: {
        list: [
          { title: '📏 Riga (affiancati)', value: 'row' },
          { title: '🔲 Griglia (responsive)', value: 'grid' },
        ],
      },
      initialValue: 'row',
    }),

    defineField({
      name: 'showComparison',
      title: 'Mostra Tabella Comparativa',
      type: 'boolean',
      group: 'layout',
      description: 'Visualizza una tabella per confrontare le caratteristiche tra i piani',
      initialValue: false,
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
      name: 'priceSize',
      title: 'Dimensione Prezzi',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Normale (32px)', value: 'lg' },
          { title: 'Grande (40px)', value: 'xl' },
          { title: 'Extra Grande (48px)', value: '2xl' },
          { title: 'Gigante (56px)', value: '3xl' },
        ],
      },
      initialValue: 'xl',
    }),

    defineField({
      name: 'planNameSize',
      title: 'Dimensione Nomi Piani',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (18px)', value: 'lg' },
          { title: 'Normale (20px)', value: 'xl' },
          { title: 'Grande (24px)', value: '2xl' },
        ],
      },
      initialValue: 'xl',
    }),

    // === STILE ===
    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo',
      type: 'string',
      group: 'style',
      description: 'Colore di sfondo della sezione',
    }),

    defineField({
      name: 'paddingY',
      title: 'Spaziatura Verticale (Legacy)',
      type: 'string',
      group: 'style',
      description: 'Padding sopra e sotto la sezione',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Piccola', value: 'small' },
          { title: 'Media', value: 'medium' },
          { title: 'Grande', value: 'large' },
        ],
      },
      initialValue: 'medium',
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
    select: { title: 'title.it', plans: 'plans', layout: 'layout' },
    prepare({ title, plans, layout }) {
      const titleText = getPlainText(title) || 'Prezzi'
      const count = plans?.length || 0
      const layoutLabels: Record<string, string> = {
        row: 'Riga',
        grid: 'Griglia',
      }
      return {
        title: `💰 ${titleText}`,
        subtitle: `${count} piani • ${layoutLabels[layout] || 'Riga'}`,
      }
    },
  },
})
