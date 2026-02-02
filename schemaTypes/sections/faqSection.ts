// Sezione: FAQ (Domande Frequenti) - v1.5.0
import { defineType, defineField, defineArrayMember } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { iconOptions } from '../shared/iconOptions'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'

export default defineType({
  name: 'faqSection',
  title: 'FAQ - Domande Frequenti',
  type: 'object',
  icon: HelpCircleIcon,
  description: 'Sezione con domande e risposte espandibili',

  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'questions', title: 'Domande' },
    { name: 'layout', title: 'Layout' },
    { name: 'style', title: 'Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta',
      type: 'localeString',
      description: 'Es: "DOMANDE FREQUENTI"',
      group: 'content',
    }),

    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeRichText',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
      group: 'content',
    }),

    // === DOMANDE ===
    defineField({
      name: 'categories',
      title: 'Categorie FAQ',
      type: 'array',
      group: 'questions',
      description: 'Organizza le FAQ in categorie (opzionale)',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'category',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome Categoria',
              type: 'localeString',
            }),
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              options: {
                list: iconOptions,
              },
            }),
            defineField({
              name: 'questions',
              title: 'Domande',
              type: 'array',
              of: [{
                type: 'object',
                name: 'faqItem',
                fields: [
                  defineField({
                    name: 'question',
                    title: 'Domanda',
                    type: 'localeString',
                    validation: Rule => Rule.required(),
                  }),
                  defineField({
                    name: 'answer',
                    title: 'Risposta',
                    type: 'localeRichText',
                    validation: Rule => Rule.required(),
                  }),
                ],
                preview: {
                  select: { question: 'question.it' },
                  prepare({ question }) {
                    return { title: question || 'Domanda' }
                  },
                },
              }],
            }),
          ],
          preview: {
            select: { name: 'name.it', questions: 'questions' },
            prepare({ name, questions }) {
              return {
                title: name || 'Categoria',
                subtitle: `${questions?.length || 0} domande`,
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'questions',
      title: 'Domande (senza categorie)',
      type: 'array',
      group: 'questions',
      description: 'Aggiungi domande singole senza categorie',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({
            name: 'question',
            title: 'Domanda',
            type: 'localeString',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'answer',
            title: 'Risposta',
            type: 'localeRichText',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'icon',
            title: 'Icona',
            type: 'string',
          }),
        ],
        preview: {
          select: { question: 'question.it' },
          prepare({ question }) {
            return { title: `❓ ${question || 'Domanda'}` }
          },
        },
      }],
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Accordion (espandibile)', value: 'accordion' },
          { title: 'Lista aperta', value: 'list' },
          { title: '2 Colonne', value: 'two-columns' },
          { title: 'Con sidebar categorie', value: 'sidebar' },
        ],
      },
      initialValue: 'accordion',
    }),

    defineField({
      name: 'allowMultiple',
      title: 'Permetti più aperti',
      type: 'boolean',
      description: 'Permetti di aprire più domande contemporaneamente',
      group: 'layout',
      hidden: ({ parent }) => parent?.layout !== 'accordion',
      initialValue: false,
    }),

    defineField({
      name: 'showSearch',
      title: 'Mostra Ricerca',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),

    defineField({
      name: 'showNumbers',
      title: 'Mostra Numeri',
      type: 'boolean',
      description: 'Numera le domande (1, 2, 3...)',
      group: 'layout',
      initialValue: false,
    }),

    // === SPAZIATURA ===
    defineField({
      name: 'paddingTop',
      title: 'Spaziatura Sopra',
      type: 'string',
      group: 'layout',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),

    defineField({
      name: 'paddingBottom',
      title: 'Spaziatura Sotto',
      type: 'string',
      group: 'layout',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),

    defineField({
      name: 'marginTop',
      title: 'Margine Sopra',
      type: 'string',
      group: 'layout',
      options: { list: marginOptions },
      initialValue: 'none',
    }),

    defineField({
      name: 'marginBottom',
      title: 'Margine Sotto',
      type: 'string',
      group: 'layout',
      options: { list: marginOptions },
      initialValue: 'none',
    }),

    // === STILE ===
    defineField({
      name: 'cardStyle',
      title: 'Stile Domande',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Con bordo', value: 'border' },
          { title: 'Card con ombra', value: 'shadow' },
          { title: 'Separatore linea', value: 'divider' },
        ],
      },
      initialValue: 'border',
    }),

    defineField({
      name: 'iconStyle',
      title: 'Stile Icona +/-',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Plus/Minus', value: 'plus' },
          { title: 'Freccia', value: 'arrow' },
          { title: 'Chevron', value: 'chevron' },
          { title: 'Nessuna', value: 'none' },
        ],
      },
      initialValue: 'plus',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Blu Chiaro', value: 'primary-light' },
        ],
      },
      initialValue: 'white',
    }),

    // === CTA ===
    defineField({
      name: 'ctaTitle',
      title: 'Titolo CTA',
      type: 'localeString',
      description: 'Es: "Non hai trovato la risposta?"',
      group: 'content',
    }),

    defineField({
      name: 'ctaButton',
      title: 'Testo Pulsante CTA',
      type: 'localeString',
      description: 'Es: "Contattaci"',
      group: 'content',
    }),

    defineField({
      name: 'ctaLink',
      title: 'Link CTA',
      type: 'string',
      group: 'content',
    }),
  ],

  preview: {
    select: { title: 'title.it', questions: 'questions', categories: 'categories' },
    prepare({ title, questions, categories }) {
      const titleText = getPlainText(title)
      const qCount = questions?.length || 0
      const catCount = categories?.length || 0
      const totalQ = catCount > 0
        ? categories.reduce((acc: number, cat: any) => acc + (cat.questions?.length || 0), 0)
        : qCount

      return {
        title: `❓ ${titleText || 'FAQ'}`,
        subtitle: `${totalQ} domande${catCount > 0 ? ` in ${catCount} categorie` : ''}`,
      }
    },
  },
})
