// SectionArrayInput.tsx - Editor sezioni con drag-and-drop (@dnd-kit)
import React, { useCallback, useState, useMemo } from 'react'
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
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

// ============================================
// CONFIGURAZIONE 29 SEZIONI
// ============================================
interface SectionConfigItem {
  emoji: string
  color: string
  label: string
  description: string
  group: string
}

const SECTION_CONFIG: Record<string, SectionConfigItem> = {
  // --- Principali ---
  heroSection: {
    emoji: '🎯',
    color: '#3b82f6',
    label: 'Hero',
    description: 'Grande banner in cima con titolo, sottotitolo e immagine',
    group: 'Principali',
  },
  carouselSection: {
    emoji: '🎠',
    color: '#6366f1',
    label: 'Carosello',
    description: 'Slideshow con immagini o contenuti scorrevoli',
    group: 'Principali',
  },
  bannerSection: {
    emoji: '🏷️',
    color: '#0ea5e9',
    label: 'Banner',
    description: 'Striscia promozionale o informativa',
    group: 'Principali',
  },

  // --- Testo & Media ---
  textImageSection: {
    emoji: '📝',
    color: '#14b8a6',
    label: 'Testo + Immagine',
    description: 'Blocco testo affiancato a un\'immagine',
    group: 'Testo & Media',
  },
  richTextSection: {
    emoji: '📄',
    color: '#64748b',
    label: 'Testo Libero',
    description: 'Blocco di testo formattato liberamente',
    group: 'Testo & Media',
  },
  videoSection: {
    emoji: '🎬',
    color: '#ef4444',
    label: 'Video',
    description: 'Video YouTube, Vimeo o file diretto',
    group: 'Testo & Media',
  },
  gallerySection: {
    emoji: '🖼️',
    color: '#ec4899',
    label: 'Galleria',
    description: 'Galleria fotografica con lightbox',
    group: 'Testo & Media',
  },
  beforeAfterSection: {
    emoji: '🔄',
    color: '#a855f7',
    label: 'Prima / Dopo',
    description: 'Confronto visivo con slider prima/dopo',
    group: 'Testo & Media',
  },

  // --- Contenuti Strutturati ---
  statsSection: {
    emoji: '📊',
    color: '#10b981',
    label: 'Statistiche',
    description: 'Numeri e statistiche aziendali (es: 40+ anni)',
    group: 'Contenuti',
  },
  counterSection: {
    emoji: '🔢',
    color: '#22d3ee',
    label: 'Contatori',
    description: 'Numeri animati con conteggio progressivo',
    group: 'Contenuti',
  },
  productsSection: {
    emoji: '📦',
    color: '#f59e0b',
    label: 'Prodotti',
    description: 'Griglia con i prodotti in evidenza',
    group: 'Contenuti',
  },
  sectorsSection: {
    emoji: '🏭',
    color: '#78716c',
    label: 'Settori',
    description: 'Settori di applicazione con icone e descrizioni',
    group: 'Contenuti',
  },
  featuresSection: {
    emoji: '✨',
    color: '#8b5cf6',
    label: 'Caratteristiche',
    description: 'Lista punti di forza con immagine laterale',
    group: 'Contenuti',
  },
  strengthsSection: {
    emoji: '💪',
    color: '#f97316',
    label: 'Punti di Forza',
    description: 'Vantaggi competitivi con icone personalizzabili',
    group: 'Contenuti',
  },
  trustBadgesSection: {
    emoji: '🛡️',
    color: '#059669',
    label: 'Trust Badges',
    description: 'Badge di qualita, certificazioni e garanzie',
    group: 'Contenuti',
  },
  pricingSection: {
    emoji: '💰',
    color: '#eab308',
    label: 'Prezzi',
    description: 'Tabella prezzi con piani e confronti',
    group: 'Contenuti',
  },
  iconBoxesSection: {
    emoji: '📦',
    color: '#06b6d4',
    label: 'Box Icone',
    description: 'Griglia di box con icone e descrizioni',
    group: 'Contenuti',
  },
  tabsSection: {
    emoji: '📑',
    color: '#8b5cf6',
    label: 'Tabs',
    description: 'Contenuti organizzati in schede cliccabili',
    group: 'Contenuti',
  },
  timelineSection: {
    emoji: '📅',
    color: '#6366f1',
    label: 'Timeline',
    description: 'Linea temporale con eventi e date',
    group: 'Contenuti',
  },
  caseStudiesSection: {
    emoji: '📋',
    color: '#0d9488',
    label: 'Case Studies',
    description: 'Casi studio con sfida, soluzione e risultati',
    group: 'Contenuti',
  },

  // --- Social Proof ---
  testimonialsSection: {
    emoji: '💬',
    color: '#f472b6',
    label: 'Testimonianze',
    description: 'Recensioni e testimonianze dei clienti',
    group: 'Social Proof',
  },
  logoCloudSection: {
    emoji: '🤝',
    color: '#94a3b8',
    label: 'Loghi Partner',
    description: 'Griglia loghi clienti o partner',
    group: 'Social Proof',
  },
  teamSection: {
    emoji: '👥',
    color: '#7c3aed',
    label: 'Team',
    description: 'Presentazione membri del team',
    group: 'Social Proof',
  },

  // --- FAQ & Contatti ---
  faqSection: {
    emoji: '❓',
    color: '#f59e0b',
    label: 'FAQ',
    description: 'Domande frequenti con accordion espandibile',
    group: 'FAQ & Contatti',
  },
  ctaSection: {
    emoji: '📢',
    color: '#ef4444',
    label: 'Invito all\'Azione',
    description: 'Banner colorato con pulsante contatto',
    group: 'FAQ & Contatti',
  },
  contactSection: {
    emoji: '📞',
    color: '#06b6d4',
    label: 'Contatti',
    description: 'Form di contatto, email, telefono e mappa',
    group: 'FAQ & Contatti',
  },
  mapSection: {
    emoji: '🗺️',
    color: '#16a34a',
    label: 'Mappa',
    description: 'Mappa interattiva con pin e informazioni',
    group: 'FAQ & Contatti',
  },

  // --- Utility ---
  downloadSection: {
    emoji: '📥',
    color: '#475569',
    label: 'Download',
    description: 'Area download file, PDF e documenti',
    group: 'Utility',
  },
  embedSection: {
    emoji: '🔗',
    color: '#71717a',
    label: 'Embed',
    description: 'Incorpora contenuto esterno (iframe, widget)',
    group: 'Utility',
  },
}

// Raggruppamento sezioni per il dialog di aggiunta
const SECTION_GROUPS: { name: string; color: string }[] = [
  { name: 'Principali', color: '#3b82f6' },
  { name: 'Testo & Media', color: '#14b8a6' },
  { name: 'Contenuti', color: '#10b981' },
  { name: 'Social Proof', color: '#f472b6' },
  { name: 'FAQ & Contatti', color: '#f59e0b' },
  { name: 'Utility', color: '#475569' },
]

// ============================================
// HELPER
// ============================================
function extractTitle(title: any, fallback: string): string {
  if (!title) return fallback
  if (typeof title === 'string') return title
  if (typeof title === 'object') {
    return title.it || title.en || title.es || fallback
  }
  return fallback
}

// ============================================
// SORTABLE SECTION CARD
// ============================================
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

function SortableSectionCard({
  item,
  index,
  totalItems,
  onEdit,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: SectionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._key })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : 'auto',
  }

  const sectionType = item._type || 'unknown'
  const config = SECTION_CONFIG[sectionType] || {
    emoji: '❓',
    color: '#6b7280',
    label: sectionType,
    description: '',
    group: 'Altro',
  }

  const sectionTitle = extractTitle(item.title, config.label)

  return (
    <div ref={setNodeRef} style={style}>
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
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              border: 'none',
              background: 'none',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#999',
              touchAction: 'none',
            }}
            title="Trascina per riordinare"
          >
            <DragHandleIcon />
          </button>

          {/* Numero posizione */}
          <Box
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: config.color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '13px',
              flexShrink: 0,
            }}
          >
            {index + 1}
          </Box>

          {/* Emoji e Info */}
          <Box flex={1} style={{ minWidth: 0 }}>
            <Flex align="center" gap={2}>
              <Text size={2}>{config.emoji}</Text>
              <Box style={{ minWidth: 0 }}>
                <Text weight="semibold" size={2} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {sectionTitle}
                </Text>
                <Text size={1} muted>
                  {config.label}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Azioni */}
          <Flex gap={1} style={{ flexShrink: 0 }}>
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
              title="Sposta giu"
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
    </div>
  )
}

// Card statica usata nel DragOverlay
function DragOverlayCard({ item, index }: { item: any; index: number }) {
  const sectionType = item._type || 'unknown'
  const config = SECTION_CONFIG[sectionType] || {
    emoji: '❓',
    color: '#6b7280',
    label: sectionType,
    description: '',
    group: 'Altro',
  }
  const sectionTitle = extractTitle(item.title, config.label)

  return (
    <Card
      padding={3}
      radius={2}
      shadow={2}
      style={{
        borderLeft: `4px solid ${config.color}`,
        backgroundColor: 'var(--card-bg-color, #fff)',
        opacity: 0.95,
        cursor: 'grabbing',
      }}
    >
      <Flex align="center" gap={3}>
        <Box style={{ padding: '4px', display: 'flex', alignItems: 'center', color: '#999' }}>
          <DragHandleIcon />
        </Box>
        <Box
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: config.color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '13px',
            flexShrink: 0,
          }}
        >
          {index + 1}
        </Box>
        <Box flex={1}>
          <Flex align="center" gap={2}>
            <Text size={2}>{config.emoji}</Text>
            <Box>
              <Text weight="semibold" size={2}>{sectionTitle}</Text>
              <Text size={1} muted>{config.label}</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

// ============================================
// COMPONENTE PRINCIPALE
// ============================================
export function SectionArrayInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, onItemOpen } = props
  const toast = useToast()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const items = value as any[]
  const itemKeys = useMemo(() => items.map((item) => item._key), [items])

  // Sensori per drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor)
  )

  // Drag handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)

      if (!over || active.id === over.id) return

      const oldIndex = items.findIndex((item) => item._key === active.id)
      const newIndex = items.findIndex((item) => item._key === over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const reordered = arrayMove(items, oldIndex, newIndex)
      onChange(set(reordered))
    },
    [items, onChange]
  )

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

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
      const item = items[index]
      if (!item) return
      const duplicatedItem = {
        ...JSON.parse(JSON.stringify(item)),
        _key: `section-${Date.now()}`,
      }
      onChange(insert([duplicatedItem], 'after', [index]))
      toast.push({ status: 'success', title: 'Sezione duplicata' })
    },
    [items, onChange, toast]
  )

  // Elimina sezione (con conferma browser)
  const handleDelete = useCallback(
    (index: number) => {
      const item = items[index]
      const config = SECTION_CONFIG[item?._type] || { label: 'Sezione' }

      if (!window.confirm(`Eliminare la sezione "${config.label}"?`)) {
        return
      }

      onChange(unset([index]))
      toast.push({ status: 'success', title: 'Sezione eliminata' })
    },
    [items, onChange, toast]
  )

  // Sposta sezione (fallback buttons)
  const handleMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= items.length) return
      const reordered = arrayMove(items, fromIndex, toIndex)
      onChange(set(reordered))
    },
    [items, onChange]
  )

  // Item attivo per DragOverlay
  const activeItem = activeId ? items.find((item) => item._key === activeId) : null
  const activeIndex = activeId ? items.findIndex((item) => item._key === activeId) : -1

  // Raggruppamento sezioni per dialog
  const groupedSections = useMemo(() => {
    const groups: Record<string, { type: string; config: SectionConfigItem }[]> = {}
    for (const [type, config] of Object.entries(SECTION_CONFIG)) {
      if (!groups[config.group]) {
        groups[config.group] = []
      }
      groups[config.group].push({ type, config })
    }
    return groups
  }, [])

  return (
    <Stack space={4}>
      {/* Header */}
      <Card padding={3} radius={2} tone="primary">
        <Flex align="center" justify="space-between">
          <Box>
            <Text weight="semibold" size={2}>Sezioni della Pagina</Text>
            <Text size={1} muted>{items.length} sezioni</Text>
          </Box>
          <Button
            icon={AddIcon}
            text="Aggiungi"
            tone="primary"
            onClick={() => setAddDialogOpen(true)}
          />
        </Flex>
      </Card>

      {/* Lista sezioni con drag-and-drop */}
      {items.length === 0 ? (
        <Card padding={5} radius={2} style={{ textAlign: 'center', border: '2px dashed #ccc' }}>
          <Stack space={3}>
            <Text size={3}>📄</Text>
            <Text size={2} muted>Nessuna sezione</Text>
            <Text size={1} muted>Clicca "Aggiungi" per iniziare</Text>
          </Stack>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={itemKeys} strategy={verticalListSortingStrategy}>
            <Stack space={0}>
              {items.map((item, index) => (
                <SortableSectionCard
                  key={item._key}
                  item={item}
                  index={index}
                  totalItems={items.length}
                  onEdit={() => onItemOpen([index])}
                  onDuplicate={() => handleDuplicate(index)}
                  onDelete={() => handleDelete(index)}
                  onMoveUp={() => handleMove(index, index - 1)}
                  onMoveDown={() => handleMove(index, index + 1)}
                />
              ))}
            </Stack>
          </SortableContext>

          <DragOverlay>
            {activeItem ? (
              <DragOverlayCard item={activeItem} index={activeIndex} />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* Dialog Aggiungi Sezione - raggruppato */}
      {addDialogOpen && (
        <Dialog
          id="add-section-dialog"
          header="Scegli tipo di sezione"
          onClose={() => setAddDialogOpen(false)}
          width={1}
        >
          <Box padding={4}>
            <Stack space={5}>
              {SECTION_GROUPS.map((group) => {
                const sections = groupedSections[group.name]
                if (!sections || sections.length === 0) return null
                return (
                  <Stack key={group.name} space={3}>
                    <Flex align="center" gap={2}>
                      <Box
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '3px',
                          backgroundColor: group.color,
                          flexShrink: 0,
                        }}
                      />
                      <Heading size={1}>{group.name}</Heading>
                    </Flex>
                    <Grid columns={[1, 2]} gap={3}>
                      {sections.map(({ type, config }) => (
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
                  </Stack>
                )
              })}
            </Stack>
          </Box>
        </Dialog>
      )}
    </Stack>
  )
}

export default SectionArrayInput
