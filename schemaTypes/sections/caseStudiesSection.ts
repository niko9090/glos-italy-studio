// Schema: Sezione Case Studies
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudiesSection',
  title: 'Sezione Case Studies',
  type: 'object',
  icon: () => '📋',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      description: 'Seleziona specifici case studies da mostrare',
    }),
    defineField({
      name: 'showFeaturedOnly',
      title: 'Solo In Evidenza',
      type: 'boolean',
      description: 'Se attivo, mostra solo i case studies marcati come "In Evidenza"',
      initialValue: false,
    }),
    defineField({
      name: 'limit',
      title: 'Limite',
      type: 'number',
      description: 'Numero massimo di case studies da mostrare',
      initialValue: 3,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio', value: 'gray' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title.it' },
    prepare: ({ title }) => ({
      title: title || 'Case Studies',
      subtitle: 'Sezione Case Studies',
    }),
  },
})
