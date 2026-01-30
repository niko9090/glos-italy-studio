// SectionArrayInput.tsx - Editor sezioni migliorato con UX intuitiva
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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

// Componente Card Sezione Sortabile
interface SortableSectionCardProps {
  id: string
  item: any
  index: number
  totalItems: number
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function SortableSectionCard({
  id,
  item,
  index,
  totalItems,
  onEdit,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: SortableSectionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const sectionType = item._type || 'unknown'
  const config = SECTION_CONFIG[sectionType] || {
    emoji: '❓',
    color: '#6b7280',
    label: sectionType,
    description: '',
  }

  // Estrai titolo dalla sezione
  const sectionTitle = item.title?.it || item.title || config.label

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        padding={3}
        radius={2}
        shadow={isDragging ? 2 : 1}
        style={{
          borderLeft: `4px solid ${config.color}`,
          marginBottom: '8px',
        }}
      >
        <Flex align="center" gap={3}>
          {/* Drag Handle */}
          <Box
            {...attributes}
            {...listeners}
            style={{
              cursor: 'grab',
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: config.color + '20',
            }}
          >
            <DragHandleIcon style={{ color: config.color }} />
          </Box>

          {/* Emoji e Info */}
          <Box flex={1}>
            <Flex align="center" gap={2}>
              <Text size={3}>{config.emoji}</Text>
              <Box>
                <Text weight="semibold" size={2}>
                  {sectionTitle}
                </Text>
                <Text size={1} muted>
                  {config.label} • Posizione {index + 1}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Azioni */}
          <Flex gap={1}>
            <Button
              icon={ChevronUpIcon}
              mode="ghost"
              tone="default"
              disabled={index === 0}
              onClick={onMoveUp}
              title="Sposta su"
              padding={2}
            />
            <Button
              icon={ChevronDownIcon}
              mode="ghost"
              tone="default"
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
              tone="default"
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
    </div>
  )
}

// Dialog per aggiungere una nuova sezione
interface AddSectionDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (type: string) => void
}

function AddSectionDialog({ open, onClose, onSelect }: AddSectionDialogProps) {
  return (
    <Dialog
      id="add-section-dialog"
      header="Aggiungi Sezione"
      open={open}
      onClose={onClose}
      width={1}
    >
      <Box padding={4}>
        <Stack space={4}>
          <Text size={2} muted>
            Scegli il tipo di sezione da aggiungere alla pagina:
          </Text>
          <Grid columns={[1, 2]} gap={3}>
            {Object.entries(SECTION_CONFIG).map(([type, config]) => (
              <Card
                key={type}
                padding={4}
                radius={2}
                shadow={1}
                style={{
                  cursor: 'pointer',
                  borderLeft: `4px solid ${config.color}`,
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  onSelect(type)
                  onClose()
                }}
                // Hover effect handled by Sanity UI
              >
                <Flex gap={3} align="flex-start">
                  <Text size={4}>{config.emoji}</Text>
                  <Box>
                    <Text weight="semibold" size={2}>
                      {config.label}
                    </Text>
                    <Text size={1} muted style={{ marginTop: '4px' }}>
                      {config.description}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Box>
    </Dialog>
  )
}

// Dialog conferma eliminazione
interface DeleteConfirmDialogProps {
  open: boolean
  sectionLabel: string
  onClose: () => void
  onConfirm: () => void
}

function DeleteConfirmDialog({
  open,
  sectionLabel,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog
      id="delete-confirm-dialog"
      header="Conferma Eliminazione"
      open={open}
      onClose={onClose}
      width={0}
    >
      <Box padding={4}>
        <Stack space={4}>
          <Text size={2}>
            Sei sicuro di voler eliminare la sezione <strong>{sectionLabel}</strong>?
          </Text>
          <Text size={1} muted>
            Questa azione non può essere annullata.
          </Text>
          <Flex gap={2} justify="flex-end">
            <Button mode="ghost" text="Annulla" onClick={onClose} />
            <Button
              tone="critical"
              text="Elimina"
              icon={TrashIcon}
              onClick={() => {
                onConfirm()
                onClose()
              }}
            />
          </Flex>
        </Stack>
      </Box>
    </Dialog>
  )
}

// Componente principale
export function SectionArrayInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, onItemOpen, schemaType } = props
  const toast = useToast()

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ index: number; label: string } | null>(null)

  // Sensori per drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Handler per drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (over && active.id !== over.id) {
        const oldIndex = value.findIndex((item: any) => item._key === active.id)
        const newIndex = value.findIndex((item: any) => item._key === over.id)

        const newValue = arrayMove(value as any[], oldIndex, newIndex)
        onChange(set(newValue))

        toast.push({
          status: 'success',
          title: 'Sezione spostata',
        })
      }
    },
    [value, onChange, toast]
  )

  // Handler per aggiungere sezione
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

  // Handler per duplicare
  const handleDuplicate = useCallback(
    (index: number) => {
      const item = (value as any[])[index]
      if (!item) return

      const duplicatedItem = {
        ...JSON.parse(JSON.stringify(item)),
        _key: `section-${Date.now()}`,
      }

      onChange(insert([duplicatedItem], 'after', [index]))

      toast.push({
        status: 'success',
        title: 'Sezione duplicata',
      })
    },
    [value, onChange, toast]
  )

  // Handler per eliminare
  const handleDelete = useCallback(
    (index: number) => {
      onChange(unset([index]))

      toast.push({
        status: 'success',
        title: 'Sezione eliminata',
      })
    },
    [onChange, toast]
  )

  // Handler per spostare su/giù
  const handleMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= (value as any[]).length) return

      const newValue = arrayMove(value as any[], fromIndex, toIndex)
      onChange(set(newValue))
    },
    [value, onChange]
  )

  // Handler per aprire dialog eliminazione
  const handleDeleteClick = useCallback(
    (index: number) => {
      const item = (value as any[])[index]
      const config = SECTION_CONFIG[item?._type] || { label: 'Sezione' }
      setItemToDelete({ index, label: config.label })
      setDeleteDialogOpen(true)
    },
    [value]
  )

  return (
    <Stack space={4}>
      {/* Header */}
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size={1}>Sezioni della Pagina</Heading>
          <Text size={1} muted style={{ marginTop: '4px' }}>
            Trascina per riordinare • {(value as any[]).length} sezioni
          </Text>
        </Box>
        <Button
          icon={AddIcon}
          text="Aggiungi Sezione"
          tone="primary"
          onClick={() => setAddDialogOpen(true)}
        />
      </Flex>

      {/* Lista sezioni */}
      {(value as any[]).length === 0 ? (
        <Card padding={5} radius={2} tone="transparent" style={{ textAlign: 'center' }}>
          <Stack space={3}>
            <Text size={4}>📄</Text>
            <Text size={2} muted>
              Nessuna sezione ancora
            </Text>
            <Text size={1} muted>
              Clicca "Aggiungi Sezione" per iniziare a costruire la pagina
            </Text>
          </Stack>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={(value as any[]).map((item) => item._key)}
            strategy={verticalListSortingStrategy}
          >
            {(value as any[]).map((item, index) => (
              <SortableSectionCard
                key={item._key}
                id={item._key}
                item={item}
                index={index}
                totalItems={(value as any[]).length}
                onEdit={() => onItemOpen([index])}
                onDuplicate={() => handleDuplicate(index)}
                onDelete={() => handleDeleteClick(index)}
                onMoveUp={() => handleMove(index, index - 1)}
                onMoveDown={() => handleMove(index, index + 1)}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      {/* Dialog Aggiungi */}
      <AddSectionDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSelect={handleAddSection}
      />

      {/* Dialog Conferma Eliminazione */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        sectionLabel={itemToDelete?.label || ''}
        onClose={() => {
          setDeleteDialogOpen(false)
          setItemToDelete(null)
        }}
        onConfirm={() => {
          if (itemToDelete) {
            handleDelete(itemToDelete.index)
          }
        }}
      />
    </Stack>
  )
}

export default SectionArrayInput
