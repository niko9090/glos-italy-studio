// SectionArrayInput.tsx - Editor sezioni semplificato
import React, { useCallback, useState } from 'react'
import {
  ArrayOfObjectsInputProps,
  insert,
  setIfMissing,
  unset,
  set,
} from 'sanity'
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useToast,
} from '@sanity/ui'
import {
  AddIcon,
  TrashIcon,
  CopyIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EditIcon,
  DragHandleIcon,
} from '@sanity/icons'

// Configurazione sezioni con colori ed emoji
const SECTION_CONFIG: Record<string, { emoji: string; color: string; label: string; description: string }> = {
  heroSection: {
    emoji: '🎯',
    color: '#3b82f6',
    label: 'Banner Principale',
    description: 'Grande banner in cima con titolo, sottotitolo e immagine',
  },
  statsSection: {
    emoji: '📊',
    color: '#10b981',
    label: 'Statistiche',
    description: 'Numeri e statistiche aziendali (es: 40+ anni)',
  },
  productsSection: {
    emoji: '📦',
    color: '#f59e0b',
    label: 'Prodotti',
    description: 'Griglia con i prodotti in evidenza',
  },
  featuresSection: {
    emoji: '✨',
    color: '#8b5cf6',
    label: 'Caratteristiche',
    description: 'Lista punti di forza con immagine laterale',
  },
  gallerySection: {
    emoji: '🖼️',
    color: '#ec4899',
    label: 'Galleria',
    description: 'Galleria fotografica con lightbox',
  },
  ctaSection: {
    emoji: '📢',
    color: '#ef4444',
    label: 'Invito all\'Azione',
    description: 'Banner colorato con pulsante contatto',
  },
  contactSection: {
    emoji: '📞',
    color: '#06b6d4',
    label: 'Contatti',
    description: 'Form di contatto, email, telefono e mappa',
  },
}

// Helper per estrarre titolo da localeString
function extractTitle(title: any, fallback: string): string {
  if (!title) return fallback
  if (typeof title === 'string') return title
  if (typeof title === 'object') {
    return title.it || title.en || title.es || fallback
  }
  return fallback
}

// Componente Card Sezione
interface SectionCardProps {
  item: any
  index: number
  totalItems: number
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function SectionCard({
  item,
  index,
  totalItems,
  onEdit,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: SectionCardProps) {
  const sectionType = item._type || 'unknown'
  const config = SECTION_CONFIG[sectionType] || {
    emoji: '❓',
    color: '#6b7280',
    label: sectionType,
    description: '',
  }

  const sectionTitle = extractTitle(item.title, config.label)

  return (
    <Card
      padding={3}
      radius={2}
      shadow={1}
      style={{
        borderLeft: `4px solid ${config.color}`,
        marginBottom: '8px',
      }}
    >
      <Flex align="center" gap={3}>
        {/* Numero posizione */}
        <Box
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: config.color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          {index + 1}
        </Box>

        {/* Emoji e Info */}
        <Box flex={1}>
          <Flex align="center" gap={2}>
            <Text size={2}>{config.emoji}</Text>
            <Box>
              <Text weight="semibold" size={2}>
                {sectionTitle}
              </Text>
              <Text size={1} muted>
                {config.label}
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Azioni */}
        <Flex gap={1}>
          <Button
            icon={ChevronUpIcon}
            mode="ghost"
            disabled={index === 0}
            onClick={onMoveUp}
            title="Sposta su"
            padding={2}
          />
          <Button
            icon={ChevronDownIcon}
            mode="ghost"
            disabled={index === totalItems - 1}
            onClick={onMoveDown}
            title="Sposta giù"
            padding={2}
          />
          <Button
            icon={EditIcon}
            mode="ghost"
            tone="primary"
            onClick={onEdit}
            title="Modifica"
            padding={2}
          />
          <Button
            icon={CopyIcon}
            mode="ghost"
            onClick={onDuplicate}
            title="Duplica"
            padding={2}
          />
          <Button
            icon={TrashIcon}
            mode="ghost"
            tone="critical"
            onClick={onDelete}
            title="Elimina"
            padding={2}
          />
        </Flex>
      </Flex>
    </Card>
  )
}

// Componente principale
export function SectionArrayInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, onItemOpen } = props
  const toast = useToast()
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  // Aggiungi sezione
  const handleAddSection = useCallback(
    (type: string) => {
      const newItem = {
        _type: type,
        _key: `section-${Date.now()}`,
      }
      onChange([setIfMissing([]), insert([newItem], 'after', [-1])])
      toast.push({
        status: 'success',
        title: 'Sezione aggiunta',
        description: SECTION_CONFIG[type]?.label || type,
      })
    },
    [onChange, toast]
  )

  // Duplica sezione
  const handleDuplicate = useCallback(
    (index: number) => {
      const item = (value as any[])[index]
      if (!item) return
      const duplicatedItem = {
        ...JSON.parse(JSON.stringify(item)),
        _key: `section-${Date.now()}`,
      }
      onChange(insert([duplicatedItem], 'after', [index]))
      toast.push({ status: 'success', title: 'Sezione duplicata' })
    },
    [value, onChange, toast]
  )

  // Elimina sezione (con conferma browser)
  const handleDelete = useCallback(
    (index: number) => {
      const item = (value as any[])[index]
      const config = SECTION_CONFIG[item?._type] || { label: 'Sezione' }

      if (!window.confirm(`Eliminare la sezione "${config.label}"?`)) {
        return
      }

      onChange(unset([index]))
      toast.push({ status: 'success', title: 'Sezione eliminata' })
    },
    [value, onChange, toast]
  )

  // Sposta sezione
  const handleMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= (value as any[]).length) return
      const items = [...(value as any[])]
      const [removed] = items.splice(fromIndex, 1)
      items.splice(toIndex, 0, removed)
      onChange(set(items))
    },
    [value, onChange]
  )

  return (
    <Stack space={4}>
      {/* Header */}
      <Card padding={3} radius={2} tone="primary">
        <Flex align="center" justify="space-between">
          <Box>
            <Text weight="semibold" size={2}>Sezioni della Pagina</Text>
            <Text size={1} muted>{(value as any[]).length} sezioni</Text>
          </Box>
          <Button
            icon={AddIcon}
            text="Aggiungi"
            tone="primary"
            onClick={() => setAddDialogOpen(true)}
          />
        </Flex>
      </Card>

      {/* Lista sezioni */}
      {(value as any[]).length === 0 ? (
        <Card padding={5} radius={2} style={{ textAlign: 'center', border: '2px dashed #ccc' }}>
          <Stack space={3}>
            <Text size={3}>📄</Text>
            <Text size={2} muted>Nessuna sezione</Text>
            <Text size={1} muted>Clicca "Aggiungi" per iniziare</Text>
          </Stack>
        </Card>
      ) : (
        <Stack space={0}>
          {(value as any[]).map((item, index) => (
            <SectionCard
              key={item._key}
              item={item}
              index={index}
              totalItems={(value as any[]).length}
              onEdit={() => onItemOpen([index])}
              onDuplicate={() => handleDuplicate(index)}
              onDelete={() => handleDelete(index)}
              onMoveUp={() => handleMove(index, index - 1)}
              onMoveDown={() => handleMove(index, index + 1)}
            />
          ))}
        </Stack>
      )}

      {/* Dialog Aggiungi Sezione */}
      {addDialogOpen && (
        <Dialog
          id="add-section-dialog"
          header="Scegli tipo di sezione"
          onClose={() => setAddDialogOpen(false)}
          width={1}
        >
          <Box padding={4}>
            <Grid columns={[1, 2]} gap={3}>
              {Object.entries(SECTION_CONFIG).map(([type, config]) => (
                <Card
                  key={type}
                  padding={3}
                  radius={2}
                  shadow={1}
                  style={{
                    cursor: 'pointer',
                    borderLeft: `4px solid ${config.color}`,
                  }}
                  onClick={() => {
                    handleAddSection(type)
                    setAddDialogOpen(false)
                  }}
                >
                  <Flex gap={3} align="center">
                    <Text size={3}>{config.emoji}</Text>
                    <Box>
                      <Text weight="semibold" size={2}>{config.label}</Text>
                      <Text size={1} muted>{config.description}</Text>
                    </Box>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Box>
        </Dialog>
      )}
    </Stack>
  )
}

export default SectionArrayInput
