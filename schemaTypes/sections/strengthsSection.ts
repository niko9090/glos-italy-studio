// Schema: Sezione Punti di Forza - Enhanced
import { defineType, defineField } from 'sanity'

// Icone Lucide disponibili
const lucideIconOptions = [
  { title: 'Scudo', value: 'shield' },
  { title: 'Fulmine', value: 'zap' },
  { title: 'Premio', value: 'award' },
  { title: 'Utenti', value: 'users' },
  { title: 'Globo', value: 'globe' },
  { title: 'Chiave inglese', value: 'wrench' },
  { title: 'Cuore', value: 'heart' },
  { title: 'Stella', value: 'star' },
  { title: 'Check', value: 'check' },
  { title: 'Target', value: 'target' },
  { title: 'Lampadina', value: 'lightbulb' },
  { title: 'Trending', value: 'trending' },
  { title: 'Orologio', value: 'clock' },
  { title: 'Pollice su', value: 'thumbsup' },
  { title: 'Badge', value: 'badge' },
  { title: 'Sparkles', value: 'sparkles' },
]

// Opzioni colore per item
const colorOptions = [
  { title: 'Primario (Blu)', value: 'primary' },
  { title: 'Blu', value: 'blue' },
  { title: 'Verde', value: 'green' },
  { title: 'Viola', value: 'purple' },
  { title: 'Arancione', value: 'orange' },
  { title: 'Rosso', value: 'red' },
  { title: 'Ciano', value: 'cyan' },
  { title: 'Oro', value: 'gold' },
]

export default defineType({
  name: 'strengthsSection',
  title: 'Sezione Punti di Forza',
  type: 'object',
  icon: () => '💪',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'layout', title: 'Layout' },
    { name: 'style', title: 'Stile' },
    { name: 'decoration', title: 'Decorazioni' },
    { name: 'spacing', title: 'Spaziatura' },
  ],
  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'eyebrow',
      title: 'Etichetta superiore',
      type: 'localeString',
      description: 'Testo piccolo sopra il titolo (es: "I NOSTRI VALORI")',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'localeText',
      description: 'Testo opzionale dopo il sottotitolo',
      group: 'content',
    }),
    defineField({
      name: 'items',
      title: 'Punti di Forza',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'strengthItem',
          title: 'Punto di Forza',
          fields: [
            {
              name: 'icon',
              title: 'Icona Emoji',
              type: 'string',
              description: 'Usa un emoji come icona (es: 🏆, ✅, 🇮🇹)',
            },
            {
              name: 'lucideIcon',
              title: 'Icona Lucide',
              type: 'string',
              description: 'Oppure scegli un\'icona dalla libreria',
              options: {
                list: lucideIconOptions,
              },
            },
            {
              name: 'iconImage',
              title: 'Immagine Icona',
              type: 'image',
              description: 'Oppure carica un\'immagine personalizzata',
              options: { hotspot: true },
            },
            {
              name: 'title',
              title: 'Titolo',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'localeText',
            },
            {
              name: 'color',
              title: 'Colore Accento',
              type: 'string',
              options: { list: colorOptions },
              initialValue: 'primary',
            },
            {
              name: 'highlight',
              title: 'In Evidenza',
              type: 'boolean',
              description: 'Mostra questo item con maggiore risalto',
              initialValue: false,
            },
          ],
          preview: {
            select: { title: 'title.it', icon: 'icon', lucideIcon: 'lucideIcon' },
            prepare: ({ title, icon, lucideIcon }) => {
              const lucideEmojis: Record<string, string> = {
                shield: '🛡️', zap: '⚡', award: '🏆', users: '👥', globe: '🌍',
                wrench: '🔧', heart: '❤️', star: '⭐', check: '✅', target: '🎯',
                lightbulb: '💡', trending: '📈', clock: '⏰', thumbsup: '👍',
                badge: '🏅', sparkles: '✨',
              }
              return {
                title: title || 'Punto di forza',
                media: () => icon || lucideEmojis[lucideIcon] || '💪',
              }
            },
          },
        },
      ],
    }),

    // === LAYOUT ===
    defineField({
      name: 'layout',
      title: 'Disposizione',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Griglia 2 colonne', value: 'grid-2' },
          { title: 'Griglia 3 colonne', value: 'grid-3' },
          { title: 'Griglia 4 colonne', value: 'grid-4' },
          { title: 'Lista verticale', value: 'list' },
          { title: 'Centrato', value: 'centered' },
          { title: 'Alternato', value: 'alternating' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid-3',
    }),
    defineField({
      name: 'iconPosition',
      title: 'Posizione Icona',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Sopra il testo', value: 'top' },
          { title: 'A sinistra', value: 'left' },
          { title: 'Inline col titolo', value: 'inline' },
        ],
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'iconSize',
      title: 'Dimensione Icona',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Piccola', value: 'sm' },
          { title: 'Media', value: 'md' },
          { title: 'Grande', value: 'lg' },
          { title: 'Extra Grande', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    }),
    defineField({
      name: 'textAlign',
      title: 'Allineamento Testo',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Sinistra', value: 'left' },
          { title: 'Centro', value: 'center' },
          { title: 'Destra', value: 'right' },
        ],
      },
      initialValue: 'center',
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
          { title: 'Grigio chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Blu primario', value: 'primary' },
          { title: 'Blu chiaro', value: 'primary-light' },
          { title: 'Gradiente Blu', value: 'gradient-blue' },
          { title: 'Gradiente Scuro', value: 'gradient-dark' },
          { title: 'Metal', value: 'metal' },
          { title: 'Metal Scuro', value: 'metal-dark' },
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
      name: 'iconStyle',
      title: 'Stile Icona',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Semplice', value: 'simple' },
          { title: 'Riempito', value: 'filled' },
          { title: 'Contorno', value: 'outlined' },
          { title: 'Gradiente', value: 'gradient' },
          { title: 'Cerchio', value: 'circle' },
        ],
      },
      initialValue: 'filled',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Elevato (ombra)', value: 'elevated' },
          { title: 'Bordato', value: 'bordered' },
          { title: 'Glass', value: 'glass' },
          { title: 'Gradiente', value: 'gradient' },
        ],
      },
      initialValue: 'none',
    }),

    // === DECORAZIONI ===
    defineField({
      name: 'backgroundImage',
      title: 'Immagine di Sfondo',
      type: 'image',
      group: 'decoration',
      description: 'Immagine decorativa sullo sfondo della sezione',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundImageOpacity',
      title: 'Opacita Immagine Sfondo',
      type: 'number',
      group: 'decoration',
      description: 'Da 0 (invisibile) a 100 (piena visibilita)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 10,
    }),
    defineField({
      name: 'decorativeElements',
      title: 'Elementi Decorativi',
      type: 'string',
      group: 'decoration',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Cerchi sfumati', value: 'circles' },
          { title: 'Griglia', value: 'grid' },
          { title: 'Onde', value: 'waves' },
          { title: 'Geometrico', value: 'geometric' },
        ],
      },
      initialValue: 'none',
    }),

    // === ANIMAZIONI ===
    defineField({
      name: 'animation',
      title: 'Animazione Entrata',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Fade', value: 'fade' },
          { title: 'Fade + Slide', value: 'fade-up' },
          { title: 'Stagger', value: 'stagger' },
          { title: 'Zoom', value: 'zoom' },
        ],
      },
      initialValue: 'stagger',
    }),
    defineField({
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuno', value: 'none' },
          { title: 'Solleva', value: 'lift' },
          { title: 'Bagliore', value: 'glow' },
          { title: 'Ingrandisci', value: 'scale' },
        ],
      },
      initialValue: 'lift',
    }),

    // === SPAZIATURA ===
    defineField({
      name: 'paddingTop',
      title: 'Padding Sopra',
      type: 'string',
      group: 'spacing',
      options: {
        list: [
          { title: 'Nessuno', value: 'pt-0' },
          { title: 'Piccolo', value: 'pt-8' },
          { title: 'Medio', value: 'pt-12' },
          { title: 'Grande', value: 'pt-16' },
          { title: 'Extra Grande', value: 'pt-24' },
        ],
      },
      initialValue: 'pt-16',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Sotto',
      type: 'string',
      group: 'spacing',
      options: {
        list: [
          { title: 'Nessuno', value: 'pb-0' },
          { title: 'Piccolo', value: 'pb-8' },
          { title: 'Medio', value: 'pb-12' },
          { title: 'Grande', value: 'pb-16' },
          { title: 'Extra Grande', value: 'pb-24' },
        ],
      },
      initialValue: 'pb-16',
    }),
  ],
  preview: {
    select: { title: 'title.it', items: 'items' },
    prepare: ({ title, items }) => ({
      title: title || 'Punti di Forza',
      subtitle: `${items?.length || 0} punti • Sezione Punti di Forza`,
    }),
  },
})
