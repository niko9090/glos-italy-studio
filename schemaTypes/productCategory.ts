// Schema: Categoria Prodotto - VERSIONE SEMPLIFICATA
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
      type: 'string',
      description: 'Il nome della categoria',
      validation: Rule => Rule.required().error('Il nome e obbligatorio'),
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'Clicca "Generate" per creare automaticamente',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 2,
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
      return {
        title: title || 'Categoria senza nome',
        subtitle: isActive ? '✅ Visibile' : '❌ Nascosta',
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
