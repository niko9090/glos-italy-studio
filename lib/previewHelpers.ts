// Helper functions for Sanity previews

/**
 * Estrae testo semplice da un campo che può essere:
 * - Una stringa
 * - Un array di Portable Text blocks
 * - null/undefined
 */
export function getPlainText(value: unknown): string {
  if (!value) return ''

  // Se è già una stringa
  if (typeof value === 'string') return value

  // Se è un array (Portable Text)
  if (Array.isArray(value)) {
    return value
      .filter((block: any) => block._type === 'block')
      .map((block: any) => {
        if (block.children) {
          return block.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text || '')
            .join('')
        }
        return ''
      })
      .join(' ')
      .trim()
  }

  return ''
}

/**
 * Tronca il testo a una lunghezza massima
 */
export function truncate(text: string, maxLength: number = 50): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
