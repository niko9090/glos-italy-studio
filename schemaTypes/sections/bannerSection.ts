// Banner Section - Annunci, promozioni, avvisi
import { defineType, defineField } from 'sanity'
import { iconOptions } from '../shared/iconOptions'

export default defineType({
  name: 'bannerSection',
  title: 'Banner',
  type: 'object',
  icon: () => '🏷️',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'style', title: 'Stile' },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Testo',
      type: 'localeRichText',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Testo Pulsante',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link Pulsante',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'dismissible',
      title: 'Dismissibile',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description: 'L\'utente può chiudere il banner',
    }),
    defineField({
      name: 'icon',
      title: 'Icona',
      type: 'string',
      group: 'content',
      options: {
        list: iconOptions,
      },
    }),
    // Style
    defineField({
      name: 'variant',
      title: 'Variante',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Informativo (blu)', value: 'info' },
          { title: 'Successo (verde)', value: 'success' },
          { title: 'Attenzione (giallo)', value: 'warning' },
          { title: 'Promo (viola)', value: 'promo' },
          { title: 'Primario', value: 'primary' },
          { title: 'Scuro', value: 'dark' },
          { title: 'Gradiente', value: 'gradient' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'size',
      title: 'Dimensione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Compatto', value: 'compact' },
          { title: 'Normale', value: 'normal' },
          { title: 'Grande', value: 'large' },
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'position',
      title: 'Posizione',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Inline (nella pagina)', value: 'inline' },
          { title: 'Fisso in Alto', value: 'fixed-top' },
          { title: 'Fisso in Basso', value: 'fixed-bottom' },
        ],
      },
      initialValue: 'inline',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Larghezza Piena',
      type: 'boolean',
      group: 'style',
      initialValue: true,
    }),
    defineField({
      name: 'animated',
      title: 'Testo Scorrevole',
      type: 'boolean',
      group: 'style',
      initialValue: false,
      description: 'Il testo scorre orizzontalmente (marquee)',
    }),
  ],
  preview: {
    select: {
      text: 'text.it',
      variant: 'variant',
    },
    prepare({ text, variant }) {
      // Extract plain text from rich text
      let plainText = 'Banner'
      if (text && Array.isArray(text)) {
        plainText = text.map((block: any) =>
          block.children?.map((child: any) => child.text).join('') || ''
        ).join(' ').slice(0, 50) || 'Banner'
      }
      const variantEmoji: Record<string, string> = {
        info: '🔵',
        success: '🟢',
        warning: '🟡',
        promo: '🟣',
        primary: '🔷',
        dark: '⬛',
        gradient: '🌈',
      }
      return {
        title: plainText,
        subtitle: `🏷️ ${variantEmoji[variant] || ''} Banner ${variant}`,
      }
    },
  },
})
