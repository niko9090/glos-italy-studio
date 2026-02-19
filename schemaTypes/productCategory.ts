// Schema: Categoria Prodotto (con supporto sottocategorie)
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Categorie',
  type: 'document',
  icon: () => '🏷️',

  fields: [
    defineField({
      name: 'name',
      title: 'Nome Categoria',
      type: 'string',
      validation: Rule => Rule.required(),
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
      name: 'parentCategory',
      title: 'Categoria Padre',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'Lascia vuoto se questa e una categoria principale. Seleziona una categoria se questa e una sottocategoria.',
      options: {
        filter: '!defined(parentCategory)', // Mostra solo categorie principali
      },
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'sortOrder',
      title: 'Ordine',
      type: 'number',
      description: 'Numero per ordinare le categorie (1 = primo)',
      initialValue: 99,
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      parentName: 'parentCategory.name',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({ title, parentName, media, isActive }) {
      return {
        title: parentName ? `  ${title}` : title,
        subtitle: parentName
          ? `Sottocategoria di: ${parentName}`
          : `Categoria principale ${isActive ? '' : '(nascosta)'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Per Ordine',
      name: 'sortOrderAsc',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Per Nome',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Categorie Principali Prima',
      name: 'parentFirst',
      by: [
        { field: 'parentCategory', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' },
      ],
    },
  ],
})
