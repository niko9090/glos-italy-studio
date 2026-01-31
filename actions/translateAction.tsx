// Document Action: Traduci Automaticamente
import { TranslateIcon } from '@sanity/icons'
import { useState, useCallback } from 'react'
import { useDocumentOperation, useEditState } from 'sanity'
import { useToast, Dialog, Box, Stack, Text, Button, Checkbox, Flex, Card, Spinner } from '@sanity/ui'

// Languages configuration
const LANGUAGES = [
  { id: 'it', title: 'Italiano', flag: '🇮🇹' },
  { id: 'en', title: 'English', flag: '🇬🇧' },
  { id: 'es', title: 'Español', flag: '🇪🇸' },
]

// Translation API using MyMemory (free, no key needed)
async function translateText(text: string, from: string, to: string): Promise<string> {
  if (!text || text.trim() === '') return ''
  if (from === to) return text

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    )

    if (response.ok) {
      const data = await response.json()
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        // MyMemory returns uppercase sometimes, normalize it
        let translated = data.responseData.translatedText
        // If original was lowercase, keep lowercase (unless it's a title)
        if (text === text.toLowerCase()) {
          translated = translated.toLowerCase()
        }
        return translated
      }
    }
  } catch (error) {
    console.error('Translation error:', error)
  }

  return text // Return original if translation fails
}

// Translate Portable Text blocks
async function translateBlocks(blocks: any[], from: string, to: string): Promise<any[]> {
  if (!blocks || !Array.isArray(blocks)) return blocks

  const result = []
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      const translatedChildren = []
      for (const child of block.children) {
        if (child._type === 'span' && child.text) {
          const translatedText = await translateText(child.text, from, to)
          translatedChildren.push({ ...child, text: translatedText })
        } else {
          translatedChildren.push(child)
        }
      }
      result.push({ ...block, children: translatedChildren })
    } else {
      result.push(block)
    }
  }
  return result
}

// Find all translatable fields in document
function findTranslatableFields(obj: any, path: string[] = []): Array<{ path: string[]; type: 'string' | 'text' | 'richText'; value: any }> {
  const fields: Array<{ path: string[]; type: 'string' | 'text' | 'richText'; value: any }> = []

  if (!obj || typeof obj !== 'object') return fields

  // Check if this is a locale field (has it, en, es keys)
  if (obj.it !== undefined) {
    const itValue = obj.it

    if (typeof itValue === 'string' && itValue.trim()) {
      fields.push({ path, type: 'string', value: itValue })
    } else if (Array.isArray(itValue) && itValue[0]?._type === 'block') {
      fields.push({ path, type: 'richText', value: itValue })
    }
  }

  // Recursively search nested objects and arrays
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('_')) continue // Skip internal fields

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        fields.push(...findTranslatableFields(item, [...path, key, String(index)]))
      })
    } else if (typeof value === 'object' && value !== null) {
      fields.push(...findTranslatableFields(value, [...path, key]))
    }
  }

  return fields
}

// Translate Action
export function TranslateAction(props: any) {
  const { id, type, draft, published } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [targetLangs, setTargetLangs] = useState<string[]>(['en', 'es'])
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const toast = useToast()
  const { patch } = useDocumentOperation(id, type)

  const doc = draft || published

  const handleTranslate = useCallback(async () => {
    if (!doc) return

    setIsTranslating(true)

    try {
      // Find all translatable fields
      const translatableFields = findTranslatableFields(doc)
      setProgress({ current: 0, total: translatableFields.length * targetLangs.length })

      let completedCount = 0
      const patches: any[] = []

      for (const field of translatableFields) {
        for (const lang of targetLangs) {
          if (field.type === 'string') {
            const translated = await translateText(field.value, 'it', lang)
            patches.push({
              set: { [[...field.path, lang].join('.')]: translated }
            })
          } else if (field.type === 'richText') {
            const translated = await translateBlocks(field.value, 'it', lang)
            patches.push({
              set: { [[...field.path, lang].join('.')]: translated }
            })
          }

          completedCount++
          setProgress({ current: completedCount, total: translatableFields.length * targetLangs.length })
        }
      }

      // Apply all patches
      if (patches.length > 0) {
        for (const p of patches) {
          patch.execute([p])
        }
      }

      toast.push({
        status: 'success',
        title: 'Traduzione completata!',
        description: `${translatableFields.length} campi tradotti in ${targetLangs.map(l => l.toUpperCase()).join(', ')}`,
      })

      setIsOpen(false)
    } catch (error) {
      console.error('Translation error:', error)
      toast.push({
        status: 'error',
        title: 'Errore di traduzione',
        description: 'Si è verificato un errore durante la traduzione',
      })
    } finally {
      setIsTranslating(false)
      setProgress({ current: 0, total: 0 })
    }
  }, [doc, targetLangs, patch, toast])

  const toggleLang = (lang: string) => {
    setTargetLangs(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    )
  }

  return {
    label: 'Traduci tutto',
    icon: TranslateIcon,
    tone: 'primary',
    onHandle: () => setIsOpen(true),
    dialog: isOpen && {
      type: 'dialog',
      header: '🌍 Traduci documento',
      content: (
        <Box padding={4}>
          <Stack space={4}>
            <Text>
              Traduci automaticamente tutti i campi da <strong>Italiano</strong> alle lingue selezionate:
            </Text>

            <Card padding={3} radius={2} shadow={1}>
              <Stack space={3}>
                {LANGUAGES.filter(l => l.id !== 'it').map(lang => (
                  <Flex key={lang.id} align="center" gap={3}>
                    <Checkbox
                      checked={targetLangs.includes(lang.id)}
                      onChange={() => toggleLang(lang.id)}
                    />
                    <Text>
                      {lang.flag} {lang.title}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Card>

            {isTranslating && progress.total > 0 && (
              <Card padding={3} radius={2} tone="primary">
                <Flex align="center" gap={3}>
                  <Spinner />
                  <Text>
                    Traduzione in corso... {progress.current}/{progress.total}
                  </Text>
                </Flex>
              </Card>
            )}

            <Flex gap={2} justify="flex-end">
              <Button
                mode="ghost"
                text="Annulla"
                onClick={() => setIsOpen(false)}
                disabled={isTranslating}
              />
              <Button
                tone="primary"
                text={isTranslating ? 'Traduzione...' : 'Traduci ora'}
                icon={isTranslating ? Spinner : TranslateIcon}
                onClick={handleTranslate}
                disabled={isTranslating || targetLangs.length === 0}
              />
            </Flex>
          </Stack>
        </Box>
      ),
      onClose: () => !isTranslating && setIsOpen(false),
    },
  }
}

export default TranslateAction
