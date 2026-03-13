// Schema: Categoria Prodotto - VERSIONE SEMPLIFICATA (compatibile con dati multilingua)
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Categorie',
  type: 'document',
  icon: () => '📂',

  fields: [
    defineField({
      name: 'name',
      title: 'Nome Categoria',
      type: 'localeString',
      description: 'Il nome della categoria',
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'Clicca "Generate" per creare automaticamente',
      options: {
        source: (doc: any) => {
          // Gestisce sia string che localeString
          if (typeof doc.name === 'string') return doc.name
          return doc.name?.it || doc.name?.en || ''
        },
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeText',
      description: 'Breve descrizione della categoria',
    }),

    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      description: 'Immagine rappresentativa della categoria',
      options: { hotspot: true },
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
    }),

    // ══════════════════════════════════════════════════════
    // CAMPI NASCOSTI (mantenuti per compatibilita)
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'parentCategory',
      title: 'Categoria Padre',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      hidden: true,
    }),

    defineField({
      name: 'sortOrder',
      title: 'Ordine',
      type: 'number',
      hidden: true,
      initialValue: 99,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({ title, media, isActive }) {
      // Gestisce sia string che localeString
      let titleStr = 'Categoria senza nome'
      if (typeof title === 'string') {
        titleStr = title
      } else if (title && typeof title === 'object') {
        titleStr = title.it || title.en || title.es || 'Categoria senza nome'
      }

      return {
        title: titleStr,
        subtitle: isActive ? '✅ Visibile' : '❌ Nascosta',
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name.it', direction: 'asc' }],
    },
  ],
})
