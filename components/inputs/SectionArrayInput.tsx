// SectionArrayInput.tsx - Custom wrapper per array sezioni
// Aggiunge header personalizzato + dialog raggruppato, preservando il rendering di Sanity
import React, { useCallback, useState, useMemo } from 'react'
import {
  ArrayOfObjectsInputProps,
  insert,
  setIfMissing,
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
import { AddIcon } from '@sanity/icons'

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
// COMPONENTE PRINCIPALE
// ============================================
export function SectionArrayInput(props: ArrayOfObjectsInputProps) {
  const { onChange, renderDefault } = props
  const toast = useToast()
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const items = (props.value || []) as any[]

  // Aggiungi sezione dal dialog personalizzato
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
      {/* Header personalizzato */}
      <Card padding={3} radius={2} tone="primary">
        <Flex align="center" justify="space-between">
          <Box>
            <Text weight="semibold" size={2}>Sezioni della Pagina</Text>
            <Text size={1} muted>{items.length} sezioni</Text>
          </Box>
          <Button
            icon={AddIcon}
            text="Aggiungi Sezione"
            tone="primary"
            onClick={() => setAddDialogOpen(true)}
          />
        </Flex>
      </Card>

      {/* Rendering default di Sanity - gestisce editing, drag-and-drop nativo, modali, ecc. */}
      {renderDefault(props)}

      {/* Dialog Aggiungi Sezione - raggruppato per categoria */}
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
