// Schema: Elemento Listino Prezzi
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'listinoItem',
  title: 'Listino Prezzi',
  type: 'document',
  icon: () => '💰',

  groups: [
    { name: 'info', title: 'Informazioni', default: true },
    { name: 'pricing', title: 'Prezzi' },
    { name: 'settings', title: 'Impostazioni' },
  ],

  fields: [
    // === INFORMAZIONI PRODOTTO ===
    defineField({
      name: 'name',
      title: 'Nome Prodotto',
      type: 'string',
      group: 'info',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'code',
      title: 'Codice Articolo',
      type: 'string',
      group: 'info',
      description: 'Codice identificativo del prodotto (es: GLO-001)',
    }),

    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Blender', value: 'blender' },
          { title: 'Taglierine', value: 'taglierine' },
          { title: 'Accessori', value: 'accessori' },
          { title: 'Ricambi', value: 'ricambi' },
          { title: 'Kit', value: 'kit' },
        ],
      },
    }),

    defineField({
      name: 'description',
      title: 'Descrizione Breve',
      type: 'text',
      group: 'info',
      rows: 2,
      description: 'Breve descrizione per il listino',
    }),

    defineField({
      name: 'linkedProduct',
      title: 'Prodotto Collegato',
      type: 'reference',
      to: [{ type: 'product' }],
      group: 'info',
      description: 'Collega a un prodotto del catalogo (opzionale)',
    }),

    // === PREZZI ===
    defineField({
      name: 'priceRetail',
      title: 'Prezzo al Pubblico',
      type: 'number',
      group: 'pricing',
      description: 'Prezzo di listino IVA inclusa (€)',
      validation: Rule => Rule.min(0),
    }),

    defineField({
      name: 'priceWholesale',
      title: 'Prezzo Rivenditore',
      type: 'number',
      group: 'pricing',
      description: 'Prezzo riservato ai rivenditori (€)',
      validation: Rule => Rule.min(0),
    }),

    defineField({
      name: 'pricePromo',
      title: 'Prezzo Promo',
      type: 'number',
      group: 'pricing',
      description: 'Prezzo promozionale (se attivo)',
      validation: Rule => Rule.min(0),
    }),

    defineField({
      name: 'isPromoActive',
      title: 'Promo Attiva',
      type: 'boolean',
      group: 'pricing',
      description: 'Attiva il prezzo promozionale',
      initialValue: false,
    }),

    defineField({
      name: 'promoEndDate',
      title: 'Fine Promo',
      type: 'date',
      group: 'pricing',
      description: 'Data di scadenza della promozione',
      hidden: ({ parent }) => !parent?.isPromoActive,
    }),

    defineField({
      name: 'unit',
      title: 'Unita di Misura',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'Pezzo (pz)', value: 'pz' },
          { title: 'Confezione (conf)', value: 'conf' },
          { title: 'Kit', value: 'kit' },
          { title: 'Metro (m)', value: 'm' },
          { title: 'Kg', value: 'kg' },
        ],
      },
      initialValue: 'pz',
    }),

    defineField({
      name: 'minQuantity',
      title: 'Quantita Minima',
      type: 'number',
      group: 'pricing',
      description: 'Quantita minima ordinabile',
      initialValue: 1,
    }),

    // === IMPOSTAZIONI ===
    defineField({
      name: 'sortOrder',
      title: 'Ordine',
      type: 'number',
      group: 'settings',
      description: 'Numero per ordinare nel listino (1 = primo)',
      initialValue: 99,
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile nel Listino',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),

    defineField({
      name: 'isNew',
      title: 'Nuovo Articolo',
      type: 'boolean',
      group: 'settings',
      description: 'Mostra badge "Nuovo"',
      initialValue: false,
    }),

    defineField({
      name: 'notes',
      title: 'Note',
      type: 'text',
      group: 'settings',
      rows: 2,
      description: 'Note interne (non visibili sul sito)',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      code: 'code',
      category: 'category',
      priceRetail: 'priceRetail',
      active: 'isActive',
      isNew: 'isNew',
      isPromo: 'isPromoActive',
    },
    prepare({ title, code, category, priceRetail, active, isNew, isPromo }) {
      const badges = []
      if (isNew) badges.push('🆕')
      if (isPromo) badges.push('🏷️')
      const badgeStr = badges.length > 0 ? ` ${badges.join('')}` : ''
      const price = priceRetail ? `€${priceRetail.toFixed(2)}` : 'Prezzo non impostato'
      return {
        title: `${title}${badgeStr}`,
        subtitle: `${code || 'No codice'} | ${category || 'No categoria'} | ${price} ${active ? '✅' : '❌'}`,
      }
    },
  },

  orderings: [
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Categoria',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }, { field: 'name', direction: 'asc' }],
    },
    {
      title: 'Prezzo (basso-alto)',
      name: 'priceAsc',
      by: [{ field: 'priceRetail', direction: 'asc' }],
    },
    {
      title: 'Ordine manuale',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
})
