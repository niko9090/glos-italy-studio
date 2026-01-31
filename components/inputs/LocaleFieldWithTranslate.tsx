// Locale Field with Auto-Translate Button
import React, { useState, useCallback } from 'react'
import { Stack, Box, Button, Flex, Text, useToast, Spinner, Card, Badge } from '@sanity/ui'
import { TranslateIcon, CheckmarkIcon, CloseIcon } from '@sanity/icons'
import { set, useFormValue, useClient } from 'sanity'

// Dizionario di traduzioni comuni IT -> EN/ES per fallback
const commonTranslations: Record<string, { en: string; es: string }> = {
  // Parole comuni
  'casa': { en: 'home', es: 'casa' },
  'prodotti': { en: 'products', es: 'productos' },
  'contatti': { en: 'contact', es: 'contacto' },
  'chi siamo': { en: 'about us', es: 'sobre nosotros' },
  'servizi': { en: 'services', es: 'servicios' },
  'qualità': { en: 'quality', es: 'calidad' },
  'scopri di più': { en: 'learn more', es: 'saber más' },
  'contattaci': { en: 'contact us', es: 'contáctenos' },
  'vedi catalogo': { en: 'view catalog', es: 'ver catálogo' },
  'invia': { en: 'send', es: 'enviar' },
  'nome': { en: 'name', es: 'nombre' },
  'email': { en: 'email', es: 'correo electrónico' },
  'telefono': { en: 'phone', es: 'teléfono' },
  'messaggio': { en: 'message', es: 'mensaje' },
  'indirizzo': { en: 'address', es: 'dirección' },
}

// Simple translation using LibreTranslate (free) or fallback
async function translateText(text: string, from: string, to: string): Promise<string> {
  if (!text || text.trim() === '') return ''

  // Check common translations first
  const lowerText = text.toLowerCase().trim()
  if (from === 'it' && commonTranslations[lowerText]) {
    return commonTranslations[lowerText][to as 'en' | 'es'] || text
  }

  try {
    // Try LibreTranslate (free, no API key needed)
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: 'text',
      }),
    })

    if (response.ok) {
      const data = await response.json()
      return data.translatedText || text
    }
  } catch (error) {
    console.log('LibreTranslate failed, trying MyMemory...')
  }

  try {
    // Fallback to MyMemory (free, no API key)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    )

    if (response.ok) {
      const data = await response.json()
      if (data.responseStatus === 200) {
        return data.responseData.translatedText || text
      }
    }
  } catch (error) {
    console.log('MyMemory failed too')
  }

  // Ultimate fallback - return original
  return text
}

// Translate rich text (Portable Text)
async function translateRichText(blocks: any[], from: string, to: string): Promise<any[]> {
  if (!blocks || !Array.isArray(blocks)) return blocks

  const translatedBlocks = await Promise.all(
    blocks.map(async (block) => {
      if (block._type === 'block' && block.children) {
        const translatedChildren = await Promise.all(
          block.children.map(async (child: any) => {
            if (child._type === 'span' && child.text) {
              const translatedText = await translateText(child.text, from, to)
              return { ...child, text: translatedText }
            }
            return child
          })
        )
        return { ...block, children: translatedChildren }
      }
      return block
    })
  )

  return translatedBlocks
}

// Props types
interface TranslateButtonProps {
  fieldPath: string
  sourceLanguage?: string
  targetLanguages?: string[]
  onTranslate?: (translations: Record<string, any>) => void
  isRichText?: boolean
}

// Translate Button Component
export function TranslateButton({
  fieldPath,
  sourceLanguage = 'it',
  targetLanguages = ['en', 'es'],
  onTranslate,
  isRichText = false,
}: TranslateButtonProps) {
  const [isTranslating, setIsTranslating] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const toast = useToast()

  const sourceValue = useFormValue([fieldPath, sourceLanguage]) as string | any[]

  const handleTranslate = useCallback(async () => {
    if (!sourceValue) {
      toast.push({
        status: 'warning',
        title: 'Nessun testo da tradurre',
        description: `Scrivi prima il testo in ${sourceLanguage.toUpperCase()}`,
      })
      return
    }

    setIsTranslating(true)
    setStatus('idle')

    try {
      const translations: Record<string, any> = {}

      for (const lang of targetLanguages) {
        if (isRichText && Array.isArray(sourceValue)) {
          translations[lang] = await translateRichText(sourceValue, sourceLanguage, lang)
        } else if (typeof sourceValue === 'string') {
          translations[lang] = await translateText(sourceValue, sourceLanguage, lang)
        }
      }

      if (onTranslate) {
        onTranslate(translations)
      }

      setStatus('success')
      toast.push({
        status: 'success',
        title: 'Traduzione completata!',
        description: `Tradotto in ${targetLanguages.map(l => l.toUpperCase()).join(', ')}`,
      })

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      setStatus('error')
      toast.push({
        status: 'error',
        title: 'Errore di traduzione',
        description: 'Non è stato possibile tradurre il testo',
      })
    } finally {
      setIsTranslating(false)
    }
  }, [sourceValue, sourceLanguage, targetLanguages, isRichText, onTranslate, toast])

  return (
    <Button
      mode="ghost"
      tone={status === 'success' ? 'positive' : status === 'error' ? 'critical' : 'primary'}
      icon={isTranslating ? Spinner : status === 'success' ? CheckmarkIcon : TranslateIcon}
      onClick={handleTranslate}
      disabled={isTranslating || !sourceValue}
      title={`Traduci da ${sourceLanguage.toUpperCase()} a ${targetLanguages.map(l => l.toUpperCase()).join(', ')}`}
      fontSize={1}
      padding={2}
    >
      {isTranslating ? 'Traduzione...' : status === 'success' ? 'Tradotto!' : 'Traduci'}
    </Button>
  )
}

// Wrapper for locale fields with translation
export function LocaleFieldWrapper(props: any) {
  const { children, renderDefault, path } = props

  return (
    <Stack space={3}>
      <Flex align="center" justify="space-between">
        <Box flex={1}>{renderDefault(props)}</Box>
      </Flex>
    </Stack>
  )
}

export default TranslateButton
