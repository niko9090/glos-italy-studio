// Input personalizzato che pulisce il testo incollato da formattazione HTML
import { useCallback } from 'react'
import {
  ArrayOfObjectsInputProps,
  PortableTextInput,
  PortableTextInputProps,
  insert,
  usePortableTextEditor,
  PortableTextEditor,
} from 'sanity'
import { OnPasteFn } from '@portabletext/editor'

// Funzione per convertire testo semplice in blocchi Portable Text
function textToPortableTextBlocks(text: string) {
  // Dividi per righe e crea un blocco per ogni paragrafo
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())

  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `pasted-${Date.now()}-${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span-${Date.now()}-${index}`,
        text: paragraph.replace(/\n/g, ' ').trim(),
        marks: [],
      },
    ],
  }))
}

// Handler personalizzato per il paste
const handlePaste: OnPasteFn = (input) => {
  const { event, path, schemaTypes } = input

  // Prendi solo il testo semplice, ignorando HTML
  const plainText = event.clipboardData?.getData('text/plain')

  if (plainText) {
    // Restituisci i blocchi di testo puliti
    return {
      insert: textToPortableTextBlocks(plainText),
      path,
    }
  }

  // Se non c'è testo, lascia il comportamento di default
  return undefined
}

export function CleanPasteInput(props: PortableTextInputProps) {
  return <PortableTextInput {...props} onPaste={handlePaste} />
}
