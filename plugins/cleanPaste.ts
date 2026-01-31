// Plugin che pulisce automaticamente il testo incollato da HTML
// Intercetta tutti i paste events nello Studio

export function setupCleanPaste() {
  if (typeof window === 'undefined') return

  document.addEventListener('paste', (event: ClipboardEvent) => {
    // Verifica se siamo in un editor Portable Text
    const target = event.target as HTMLElement
    const isPortableText = target.closest('[data-testid="pt-editor"]') ||
                           target.closest('.pt-editor') ||
                           target.getAttribute('contenteditable') === 'true'

    if (!isPortableText) return

    const clipboardData = event.clipboardData
    if (!clipboardData) return

    const htmlText = clipboardData.getData('text/html')
    const plainText = clipboardData.getData('text/plain')

    // Se c'è HTML e testo semplice, usa solo il testo semplice
    if (htmlText && plainText) {
      event.preventDefault()
      event.stopPropagation()

      // Inserisci il testo pulito usando l'API di input
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        range.deleteContents()

        // Crea nodi di testo per ogni riga
        const lines = plainText.split('\n')
        const fragment = document.createDocumentFragment()

        lines.forEach((line, index) => {
          if (index > 0) {
            fragment.appendChild(document.createElement('br'))
          }
          fragment.appendChild(document.createTextNode(line))
        })

        range.insertNode(fragment)

        // Sposta il cursore alla fine
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)

        // Triggera un evento input per notificare Sanity del cambiamento
        target.dispatchEvent(new InputEvent('input', {
          bubbles: true,
          cancelable: true,
          inputType: 'insertText',
          data: plainText,
        }))
      }
    }
  }, true) // capture phase
}
