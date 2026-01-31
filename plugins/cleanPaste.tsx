// Plugin che pulisce automaticamente il testo incollato da HTML
// Fa sì che Ctrl+V funzioni come Ctrl+Shift+V (incolla solo testo)

import { useEffect } from 'react'
import { definePlugin } from 'sanity'

// Componente che imposta il listener globale per il paste
function CleanPasteSetup() {
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      // Verifica se siamo in un editor Portable Text
      const target = event.target as HTMLElement
      if (!target) return

      const isPortableText =
        target.closest('[data-testid="pt-editor"]') ||
        target.closest('.pt-editor') ||
        target.getAttribute('contenteditable') === 'true'

      if (!isPortableText) return

      const clipboardData = event.clipboardData
      if (!clipboardData) return

      const htmlText = clipboardData.getData('text/html')
      const plainText = clipboardData.getData('text/plain')

      // Se c'è HTML, forza l'uso del testo semplice
      if (htmlText && plainText) {
        event.preventDefault()
        event.stopPropagation()

        // Usa execCommand per inserire il testo come se fosse digitato
        // Questo è il modo più compatibile con Portable Text
        document.execCommand('insertText', false, plainText)
      }
    }

    // Aggiungi listener in capture phase per intercettare prima di Sanity
    document.addEventListener('paste', handlePaste, true)

    return () => {
      document.removeEventListener('paste', handlePaste, true)
    }
  }, [])

  return null
}

// Plugin Sanity
export const cleanPastePlugin = definePlugin({
  name: 'clean-paste',
  studio: {
    components: {
      layout: (props) => {
        return (
          <>
            <CleanPasteSetup />
            {props.renderDefault(props)}
          </>
        )
      },
    },
  },
})
