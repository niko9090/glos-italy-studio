// Trust Badges Section Schema - Qualita Certificata, Made in Italy, etc.
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'trustBadgesSection',
  title: 'Trust Badges (Qualita)',
  type: 'object',
  icon: () => '🛡️',
  description: 'Sezione per mostrare badge di qualita, certificazioni, Made in Italy',

  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'style', title: 'Stile' },
    { name: 'spacing', title: 'Spaziatura' },
  ],

  fields: [
    // Content
    defineField({
      name: 'eyebrow',
      title: 'Sopratitolo',
      type: 'string',
      group: 'content',
      description: 'Es: I NOSTRI STANDARD',
    }),

    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      group: 'content',
      description: 'Es: Qualita Certificata',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'text',
      rows: 2,
      group: 'content',
    }),

    defineField({
      name: 'badges',
      title: 'Badge',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icona Emoji',
              type: 'string',
              description: 'Es: 🇮🇹 🏆 ✓ 🛡️',
            },
            {
              name: 'lucideIcon',
              title: 'Icona Lucide',
              type: 'string',
              options: {
                list: [
                  { title: 'Scudo', value: 'shield' },
                  { title: 'Premio', value: 'award' },
                  { title: 'Check', value: 'check' },
                  { title: 'Foglia', value: 'leaf' },
                  { title: 'Fabbrica', value: 'factory' },
                  { title: 'Globo', value: 'globe' },
                  { title: 'Orologio', value: 'clock' },
                  { title: 'Utenti', value: 'users' },
                  { title: 'Chiave inglese', value: 'wrench' },
                  { title: 'Badge', value: 'badge' },
                  { title: 'Medaglia', value: 'medal' },
                  { title: 'Stella', value: 'star' },
                ],
              },
            },
            {
              name: 'iconImage',
              title: 'Immagine Icona',
              type: 'image',
              description: 'Carica un logo o immagine personalizzata',
            },
            {
              name: 'title',
              title: 'Titolo',
              type: 'string',
              description: 'Es: Made in Italy, ISO 9001, Garanzia 2 Anni',
            },
            {
              name: 'subtitle',
              title: 'Sottotitolo',
              type: 'string',
              description: 'Es: Produzione italiana, Certificazione qualita',
            },
            {
              name: 'highlight',
              title: 'In evidenza',
              type: 'boolean',
              description: 'Evidenzia questo badge',
            },
          ],
          preview: {
            select: { title: 'title', icon: 'icon', lucideIcon: 'lucideIcon' },
            prepare({ title, icon, lucideIcon }) {
              const icons: Record<string, string> = {
                shield: '🛡️', award: '🏆', check: '✓', leaf: '🌱',
                factory: '🏭', globe: '🌍', clock: '⏰', users: '👥',
                wrench: '🔧', badge: '✅', medal: '🥇', star: '⭐',
              }
              const displayIcon = icon || icons[lucideIcon || ''] || '•'
              return { title: `${displayIcon} ${title || 'Badge'}` }
            },
          },
        },
      ],
    }),

    // Style
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Orizzontale', value: 'horizontal' },
          { title: 'Griglia', value: 'grid' },
          { title: 'Impilato', value: 'stacked' },
        ],
        layout: 'radio',
      },
      initialValue: 'horizontal',
    }),

    defineField({
      name: 'style',
      title: 'Stile',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Industriale (metallo)', value: 'industrial' },
          { title: 'Card elevate', value: 'cards' },
          { title: 'Premium (oro)', value: 'premium' },
          { title: 'Minimale', value: 'minimal' },
        ],
        layout: 'radio',
      },
      initialValue: 'industrial',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Sfondo',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio chiaro', value: 'gray-light' },
          { title: 'Metallo chiaro', value: 'metal' },
          { title: 'Metallo scuro', value: 'metal-dark' },
          { title: 'Blu gradient', value: 'gradient-blue' },
          { title: 'Scuro gradient', value: 'gradient-dark' },
        ],
      },
      initialValue: 'white',
    }),

    defineField({
      name: 'textColor',
      title: 'Colore testo',
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
      name: 'showDecorations',
      title: 'Mostra decorazioni',
      type: 'boolean',
      group: 'style',
      initialValue: false,
    }),

    // Spacing
    defineField({
      name: 'paddingY',
      title: 'Padding verticale',
      type: 'string',
      group: 'spacing',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra grande', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),

    defineField({
      name: 'paddingTop',
      title: 'Padding superiore',
      type: 'string',
      group: 'spacing',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra grande', value: 'xl' },
        ],
      },
    }),

    defineField({
      name: 'paddingBottom',
      title: 'Padding inferiore',
      type: 'string',
      group: 'spacing',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra grande', value: 'xl' },
        ],
      },
    }),

    defineField({
      name: 'marginTop',
      title: 'Margine superiore',
      type: 'string',
      group: 'spacing',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
        ],
      },
    }),

    defineField({
      name: 'marginBottom',
      title: 'Margine inferiore',
      type: 'string',
      group: 'spacing',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Piccolo', value: 'sm' },
          { title: 'Medio', value: 'md' },
          { title: 'Grande', value: 'lg' },
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      badges: 'badges',
      style: 'style',
    },
    prepare({ title, badges, style }) {
      const count = badges?.length || 0
      const styleLabels: Record<string, string> = {
        industrial: 'Industriale',
        cards: 'Card',
        premium: 'Premium',
        minimal: 'Minimale',
      }
      return {
        title: title || 'Trust Badges',
        subtitle: `${count} badge • Stile ${styleLabels[style || 'industrial']}`,
      }
    },
  },
})
