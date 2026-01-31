// Document Action: Traduci Automaticamente
import { TranslateIcon } from '@sanity/icons'
import { useState, useCallback } from 'react'
import { useDocumentOperation } from 'sanity'
import { useToast, Box, Stack, Text, Button, Checkbox, Flex, Card, Spinner } from '@sanity/ui'

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
        let translated = data.responseData.translatedText
        // If original was lowercase, keep lowercase
        if (text === text.toLowerCase()) {
          translated = translated.toLowerCase()
        }
        return translated
      }
    }
  } catch (error) {
    console.error('Translation API error:', error)
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
function findTranslatableFields(
  obj: any,
  path: string[] = []
): Array<{ path: string[]; type: 'string' | 'richText'; value: any }> {
  const fields: Array<{ path: string[]; type: 'string' | 'richText'; value: any }> = []

  if (!obj || typeof obj !== 'object') return fields

  // Check if this is a locale field (has it key with content)
  if ('it' in obj && obj.it !== undefined && obj.it !== null) {
    const itValue = obj.it

    if (typeof itValue === 'string' && itValue.trim()) {
      fields.push({ path: [...path], type: 'string', value: itValue })
    } else if (Array.isArray(itValue) && itValue.length > 0 && itValue[0]?._type === 'block') {
      fields.push({ path: [...path], type: 'richText', value: itValue })
    }

    // Don't recurse into locale object keys (it, en, es)
    return fields
  }

  // Recursively search nested objects and arrays
  for (const [key, value] of Object.entries(obj)) {
    // Skip internal fields
    if (key.startsWith('_') || !key) continue

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item && typeof item === 'object') {
          // Use _key for Sanity arrays, fall back to index
          const arraySelector = item._key
            ? `${key}[_key=="${item._key}"]`
            : `${key}[${index}]`
          fields.push(...findTranslatableFields(item, [...path, arraySelector]))
        }
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
  const [progress, setProgress] = useState({ current: 0, total: 0, status: '' })
  const toast = useToast()
  const { patch } = useDocumentOperation(id, type)

  const doc = draft || published

  const handleTranslate = useCallback(async () => {
    if (!doc) return

    setIsTranslating(true)
    setProgress({ current: 0, total: 0, status: 'Analizzando documento...' })

    try {
      // Find all translatable fields
      const translatableFields = findTranslatableFields(doc)

      console.log('📝 Campi trovati:', translatableFields.length)
      console.log('📋 Dettagli campi:', translatableFields.map(f => ({
        path: f.path.join('.'),
        type: f.type,
        preview: f.type === 'string' ? f.value.substring(0, 50) : '[Rich Text]'
      })))

      if (translatableFields.length === 0) {
        toast.push({
          status: 'warning',
          title: 'Nessun campo da tradurre',
          description: 'Non sono stati trovati campi con contenuto italiano',
        })
        setIsOpen(false)
        setIsTranslating(false)
        return
      }

      const totalOperations = translatableFields.length * targetLangs.length
      setProgress({ current: 0, total: totalOperations, status: 'Traducendo...' })

      let completedCount = 0
      const allPatches: Record<string, any> = {}

      for (const field of translatableFields) {
        for (const lang of targetLangs) {
          try {
            // Build the path: join with dots, then append language
            const basePath = field.path.join('.')
            const fullPath = basePath ? `${basePath}.${lang}` : lang

            console.log(`🔄 Traducendo: ${fullPath}`)

            let translated: any
            if (field.type === 'string') {
              translated = await translateText(field.value, 'it', lang)
            } else if (field.type === 'richText') {
              translated = await translateBlocks(field.value, 'it', lang)
            }

            if (translated) {
              allPatches[fullPath] = translated
              console.log(`✅ Tradotto: ${fullPath}`)
            }
          } catch (err) {
            console.error('❌ Errore traduzione:', field.path.join('.'), err)
          }

          completedCount++
          setProgress({
            current: completedCount,
            total: totalOperations,
            status: `Tradotto ${completedCount}/${totalOperations}`
          })
        }
      }

      // Apply all patches at once
      if (Object.keys(allPatches).length > 0) {
        console.log('💾 Applicando patches:', allPatches)

        patch.execute([{ set: allPatches }])

        toast.push({
          status: 'success',
          title: 'Traduzione completata!',
          description: `${Object.keys(allPatches).length} campi tradotti. Salva il documento per confermare.`,
        })
      } else {
        toast.push({
          status: 'warning',
          title: 'Nessuna traduzione applicata',
          description: 'Le traduzioni non sono state generate correttamente',
        })
      }

      setIsOpen(false)
    } catch (error) {
      console.error('❌ Errore generale:', error)
      toast.push({
        status: 'error',
        title: 'Errore di traduzione',
        description: String(error),
      })
    } finally {
      setIsTranslating(false)
      setProgress({ current: 0, total: 0, status: '' })
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

            {isTranslating && (
              <Card padding={3} radius={2} tone="primary">
                <Stack space={2}>
                  <Flex align="center" gap={3}>
                    <Spinner />
                    <Text weight="semibold">
                      {progress.status || 'Elaborazione...'}
                    </Text>
                  </Flex>
                  {progress.total > 0 && (
                    <Text size={1} muted>
                      Progresso: {progress.current}/{progress.total}
                    </Text>
                  )}
                </Stack>
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
