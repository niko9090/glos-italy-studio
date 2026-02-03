// Plugin che pulisce automaticamente il testo incollato da HTML
// Fa sì che Ctrl+V funzioni come Ctrl+Shift+V (incolla solo testo)
// NOTA: NON usa layout wrapper per evitare problemi di larghezza

import { useEffect } from 'react'
import { definePlugin } from 'sanity'

// Componente invisibile che imposta il listener globale per il paste
function CleanPasteSetup() {
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
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

      if (htmlText && plainText) {
        event.preventDefault()
        event.stopPropagation()
        document.execCommand('insertText', false, plainText)
      }
    }

    document.addEventListener('paste', handlePaste, true)
    return () => {
      document.removeEventListener('paste', handlePaste, true)
    }
  }, [])

  return null
}

// Plugin Sanity - usa navbar invece di layout per non wrappare tutto
export const cleanPastePlugin = definePlugin({
  name: 'clean-paste',
  studio: {
    components: {
      // Usiamo navbar per iniettare il setup senza wrappare il layout
      navbar: (props) => {
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
