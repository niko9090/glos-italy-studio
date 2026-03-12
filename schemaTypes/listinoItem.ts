// Schema: Listino Prezzi - VERSIONE SEMPLIFICATA
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'listinoItem',
  title: 'Listino Prezzi',
  type: 'document',
  icon: () => '💰',

  groups: [
    { name: 'info', title: '📝 Articolo', default: true },
    { name: 'pricing', title: '💶 Prezzo' },
  ],

  fields: [
    // ══════════════════════════════════════════════════════
    // INFORMAZIONI ARTICOLO
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'name',
      title: 'Nome Articolo',
      type: 'string',
      group: 'info',
      description: 'Nome del prodotto nel listino',
      validation: Rule => Rule.required().error('Il nome e obbligatorio'),
    }),

    defineField({
      name: 'code',
      title: 'Codice',
      type: 'string',
      group: 'info',
      description: 'Codice articolo (es: GLO-001)',
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
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      group: 'info',
      rows: 2,
      description: 'Breve descrizione per il listino',
    }),

    defineField({
      name: 'isActive',
      title: 'Visibile nel Listino',
      type: 'boolean',
      group: 'info',
      initialValue: true,
    }),

    defineField({
      name: 'isNew',
      title: 'Nuovo Articolo',
      type: 'boolean',
      group: 'info',
      description: 'Mostra badge "Nuovo"',
      initialValue: false,
    }),

    // ══════════════════════════════════════════════════════
    // PREZZO
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'priceRetail',
      title: 'Prezzo (€)',
      type: 'number',
      group: 'pricing',
      description: 'Prezzo di listino',
      validation: Rule => Rule.min(0),
    }),

    defineField({
      name: 'isPromoActive',
      title: 'Prezzo in Promo',
      type: 'boolean',
      group: 'pricing',
      description: 'Attiva il prezzo promozionale',
      initialValue: false,
    }),

    defineField({
      name: 'pricePromo',
      title: 'Prezzo Promo (€)',
      type: 'number',
      group: 'pricing',
      description: 'Prezzo scontato',
      validation: Rule => Rule.min(0),
      hidden: ({ parent }) => !parent?.isPromoActive,
    }),

    defineField({
      name: 'notes',
      title: 'Note',
      type: 'text',
      group: 'pricing',
      rows: 2,
      description: 'Note interne (non visibili sul sito)',
    }),

    // ══════════════════════════════════════════════════════
    // CAMPI NASCOSTI (mantenuti per compatibilita)
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'linkedProduct',
      title: 'Prodotto Collegato',
      type: 'reference',
      to: [{ type: 'product' }],
      hidden: true,
    }),

    defineField({
      name: 'priceWholesale',
      title: 'Prezzo Rivenditore',
      type: 'number',
      hidden: true,
    }),

    defineField({
      name: 'promoEndDate',
      title: 'Fine Promo',
      type: 'date',
      hidden: true,
    }),

    defineField({
      name: 'unit',
      title: 'Unita',
      type: 'string',
      hidden: true,
      initialValue: 'pz',
    }),

    defineField({
      name: 'minQuantity',
      title: 'Quantita Minima',
      type: 'number',
      hidden: true,
      initialValue: 1,
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
      code: 'code',
      category: 'category',
      priceRetail: 'priceRetail',
      active: 'isActive',
      isNew: 'isNew',
      isPromo: 'isPromoActive',
      pricePromo: 'pricePromo',
    },
    prepare({ title, code, category, priceRetail, active, isNew, isPromo, pricePromo }) {
      const badges = []
      if (isNew) badges.push('🆕')
      if (isPromo) badges.push('🏷️')
      const badgeStr = badges.length > 0 ? ` ${badges.join('')}` : ''

      let priceStr = 'Prezzo non impostato'
      if (priceRetail) {
        if (isPromo && pricePromo) {
          priceStr = `€${pricePromo} (era €${priceRetail})`
        } else {
          priceStr = `€${priceRetail}`
        }
      }

      return {
        title: `${title || 'Senza nome'}${badgeStr}`,
        subtitle: `${code || '-'} | ${category || '-'} | ${priceStr} ${active ? '✅' : '❌'}`,
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
  ],
})
