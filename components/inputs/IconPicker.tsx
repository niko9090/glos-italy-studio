// Icon Picker Component - Selezione visuale delle icone
import React, { useState, useCallback } from 'react'
import { set, unset } from 'sanity'
import { Box, Button, Card, Dialog, Flex, Grid, Text, TextInput, Stack } from '@sanity/ui'
import { SearchIcon, CloseIcon } from '@sanity/icons'

// Definizione icone organizzate per categoria
const iconCategories = {
  'Frecce': [
    { value: 'arrow-right', icon: '→', label: 'Freccia Destra' },
    { value: 'arrow-left', icon: '←', label: 'Freccia Sinistra' },
    { value: 'arrow-up', icon: '↑', label: 'Freccia Su' },
    { value: 'arrow-down', icon: '↓', label: 'Freccia Giù' },
    { value: 'arrow-diagonal', icon: '↗', label: 'Freccia Diagonale' },
    { value: 'arrow-filled', icon: '➜', label: 'Freccia Piena' },
    { value: 'triangle-right', icon: '▶', label: 'Triangolo Destra' },
    { value: 'triangle-left', icon: '◀', label: 'Triangolo Sinistra' },
    { value: 'chevron-right', icon: '›', label: 'Chevron Destra' },
    { value: 'chevron-left', icon: '‹', label: 'Chevron Sinistra' },
    { value: 'double-arrow', icon: '»', label: 'Doppia Freccia' },
  ],
  'Check & Status': [
    { value: 'check', icon: '✓', label: 'Check' },
    { value: 'check-filled', icon: '✔', label: 'Check Pieno' },
    { value: 'check-circle', icon: '✅', label: 'Check Cerchio' },
    { value: 'x', icon: '✗', label: 'X' },
    { value: 'x-filled', icon: '✘', label: 'X Piena' },
    { value: 'x-circle', icon: '❌', label: 'X Cerchio' },
    { value: 'warning', icon: '⚠', label: 'Warning' },
    { value: 'stop', icon: '⛔', label: 'Stop' },
    { value: 'info', icon: 'ℹ', label: 'Info' },
    { value: 'question', icon: '❓', label: 'Domanda' },
    { value: 'exclamation', icon: '❗', label: 'Esclamazione' },
  ],
  'Stelle & Rating': [
    { value: 'star', icon: '★', label: 'Stella Piena' },
    { value: 'star-empty', icon: '☆', label: 'Stella Vuota' },
    { value: 'star-4', icon: '✦', label: 'Stella 4 punte' },
    { value: 'star-sparkle', icon: '✧', label: 'Stella Brillante' },
    { value: 'star-glow', icon: '🌟', label: 'Stella Glow' },
    { value: 'sparkles', icon: '✨', label: 'Scintille' },
  ],
  'Cuori': [
    { value: 'heart', icon: '♥', label: 'Cuore Pieno' },
    { value: 'heart-empty', icon: '♡', label: 'Cuore Vuoto' },
    { value: 'heart-sparkle', icon: '💖', label: 'Cuore Brillante' },
    { value: 'heart-fire', icon: '❤️‍🔥', label: 'Cuore Fuoco' },
    { value: 'hearts', icon: '💕', label: 'Cuori Doppi' },
  ],
  'Forme': [
    { value: 'circle', icon: '●', label: 'Cerchio Pieno' },
    { value: 'circle-empty', icon: '○', label: 'Cerchio Vuoto' },
    { value: 'square', icon: '■', label: 'Quadrato Pieno' },
    { value: 'square-empty', icon: '□', label: 'Quadrato Vuoto' },
    { value: 'diamond', icon: '◆', label: 'Diamante' },
    { value: 'diamond-empty', icon: '◇', label: 'Diamante Vuoto' },
    { value: 'triangle', icon: '▲', label: 'Triangolo' },
    { value: 'hexagon', icon: '⬡', label: 'Esagono' },
  ],
  'Business': [
    { value: 'phone', icon: '📞', label: 'Telefono' },
    { value: 'email', icon: '✉️', label: 'Email' },
    { value: 'location', icon: '📍', label: 'Location' },
    { value: 'web', icon: '🌐', label: 'Web' },
    { value: 'business', icon: '💼', label: 'Business' },
    { value: 'calendar', icon: '📅', label: 'Calendario' },
    { value: 'clock', icon: '⏰', label: 'Orologio' },
    { value: 'money', icon: '💰', label: 'Soldi' },
    { value: 'euro', icon: '€', label: 'Euro' },
    { value: 'dollar', icon: '$', label: 'Dollaro' },
    { value: 'target', icon: '🎯', label: 'Target' },
    { value: 'trophy', icon: '🏆', label: 'Trofeo' },
    { value: 'medal', icon: '🥇', label: 'Medaglia' },
    { value: 'handshake', icon: '🤝', label: 'Stretta di mano' },
    { value: 'chart', icon: '📈', label: 'Grafico' },
    { value: 'clipboard', icon: '📋', label: 'Clipboard' },
  ],
  'Tech': [
    { value: 'lightning', icon: '⚡', label: 'Fulmine' },
    { value: 'gear', icon: '⚙️', label: 'Ingranaggio' },
    { value: 'lock', icon: '🔒', label: 'Lucchetto' },
    { value: 'unlock', icon: '🔓', label: 'Lucchetto Aperto' },
    { value: 'bell', icon: '🔔', label: 'Notifica' },
    { value: 'bulb', icon: '💡', label: 'Idea' },
    { value: 'rocket', icon: '🚀', label: 'Rocket' },
    { value: 'battery', icon: '🔋', label: 'Batteria' },
    { value: 'wifi', icon: '📶', label: 'WiFi' },
    { value: 'shield', icon: '🛡️', label: 'Scudo' },
    { value: 'tools', icon: '🔧', label: 'Attrezzi' },
    { value: 'plug', icon: '🔌', label: 'Spina' },
  ],
  'Natura': [
    { value: 'sun', icon: '☀️', label: 'Sole' },
    { value: 'moon', icon: '🌙', label: 'Luna' },
    { value: 'fire', icon: '🔥', label: 'Fuoco' },
    { value: 'drop', icon: '💧', label: 'Goccia' },
    { value: 'leaf', icon: '🍃', label: 'Foglia' },
    { value: 'flower', icon: '🌸', label: 'Fiore' },
    { value: 'tree', icon: '🌳', label: 'Albero' },
    { value: 'mountain', icon: '⛰️', label: 'Montagna' },
    { value: 'wave', icon: '🌊', label: 'Onda' },
    { value: 'snowflake', icon: '❄️', label: 'Fiocco di neve' },
    { value: 'rainbow', icon: '🌈', label: 'Arcobaleno' },
  ],
  'Persone': [
    { value: 'user', icon: '👤', label: 'Utente' },
    { value: 'users', icon: '👥', label: 'Gruppo' },
    { value: 'family', icon: '👨‍👩‍👧‍👦', label: 'Famiglia' },
    { value: 'baby', icon: '👶', label: 'Bambino' },
    { value: 'worker', icon: '👷', label: 'Lavoratore' },
    { value: 'thumbs-up', icon: '👍', label: 'Pollice Su' },
    { value: 'thumbs-down', icon: '👎', label: 'Pollice Giù' },
    { value: 'clap', icon: '👏', label: 'Applauso' },
    { value: 'wave-hand', icon: '👋', label: 'Saluto' },
    { value: 'muscle', icon: '💪', label: 'Muscolo' },
  ],
  'Oggetti': [
    { value: 'gift', icon: '🎁', label: 'Regalo' },
    { value: 'camera', icon: '📷', label: 'Fotocamera' },
    { value: 'house', icon: '🏠', label: 'Casa' },
    { value: 'car', icon: '🚗', label: 'Auto' },
    { value: 'plane', icon: '✈️', label: 'Aereo' },
    { value: 'ship', icon: '🚢', label: 'Nave' },
    { value: 'package', icon: '📦', label: 'Pacco' },
    { value: 'bag', icon: '🛍️', label: 'Shopping' },
    { value: 'key', icon: '🔑', label: 'Chiave' },
    { value: 'flag', icon: '🚩', label: 'Bandiera' },
    { value: 'pin', icon: '📌', label: 'Puntina' },
    { value: 'tag', icon: '🏷️', label: 'Tag' },
  ],
  'Simboli': [
    { value: 'copyright', icon: '©', label: 'Copyright' },
    { value: 'registered', icon: '®', label: 'Registered' },
    { value: 'trademark', icon: '™', label: 'Trademark' },
    { value: 'infinity', icon: '∞', label: 'Infinito' },
    { value: 'percent', icon: '%', label: 'Percentuale' },
    { value: 'plus', icon: '+', label: 'Più' },
    { value: 'minus', icon: '−', label: 'Meno' },
    { value: 'multiply', icon: '×', label: 'Moltiplica' },
    { value: 'divide', icon: '÷', label: 'Dividi' },
    { value: 'equal', icon: '=', label: 'Uguale' },
    { value: 'numero', icon: '#', label: 'Numero' },
    { value: 'at', icon: '@', label: 'Chiocciola' },
  ],
  'Food & Drink': [
    { value: 'coffee', icon: '☕', label: 'Caffè' },
    { value: 'wine', icon: '🍷', label: 'Vino' },
    { value: 'beer', icon: '🍺', label: 'Birra' },
    { value: 'pizza', icon: '🍕', label: 'Pizza' },
    { value: 'cake', icon: '🎂', label: 'Torta' },
    { value: 'fruit', icon: '🍎', label: 'Frutta' },
  ],
}

// Flatten all icons for search
const allIcons = Object.entries(iconCategories).flatMap(([category, icons]) =>
  icons.map(icon => ({ ...icon, category }))
)

// Icon Picker Component
export function IconPicker(props: any) {
  const { value, onChange, schemaType } = props
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSelect = useCallback((iconValue: string) => {
    onChange(iconValue ? set(iconValue) : unset())
    setIsOpen(false)
  }, [onChange])

  const handleClear = useCallback(() => {
    onChange(unset())
  }, [onChange])

  // Find current icon
  const currentIcon = allIcons.find(i => i.value === value)

  // Filter icons based on search
  const filteredIcons = search
    ? allIcons.filter(icon =>
        icon.label.toLowerCase().includes(search.toLowerCase()) ||
        icon.value.toLowerCase().includes(search.toLowerCase()) ||
        icon.icon.includes(search)
      )
    : selectedCategory
      ? iconCategories[selectedCategory as keyof typeof iconCategories] || []
      : []

  const categories = Object.keys(iconCategories)

  return (
    <Stack space={3}>
      <Flex gap={2}>
        <Button
          mode="ghost"
          onClick={() => setIsOpen(true)}
          style={{ flex: 1 }}
          padding={3}
        >
          <Flex align="center" gap={3}>
            {currentIcon ? (
              <>
                <Text size={4}>{currentIcon.icon}</Text>
                <Text size={1} muted>{currentIcon.label}</Text>
              </>
            ) : (
              <Text size={1} muted>Seleziona un'icona...</Text>
            )}
          </Flex>
        </Button>
        {value && (
          <Button
            mode="ghost"
            tone="critical"
            icon={CloseIcon}
            onClick={handleClear}
            title="Rimuovi icona"
          />
        )}
      </Flex>

      {isOpen && (
        <Dialog
          header="Scegli un'icona"
          id="icon-picker-dialog"
          onClose={() => setIsOpen(false)}
          width={2}
        >
          <Box padding={4}>
            <Stack space={4}>
              {/* Search */}
              <TextInput
                icon={SearchIcon}
                placeholder="Cerca icona..."
                value={search}
                onChange={(e) => {
                  setSearch(e.currentTarget.value)
                  if (e.currentTarget.value) setSelectedCategory(null)
                }}
              />

              {/* Categories */}
              {!search && (
                <Flex wrap="wrap" gap={2}>
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      mode={selectedCategory === cat ? 'default' : 'ghost'}
                      tone={selectedCategory === cat ? 'primary' : 'default'}
                      onClick={() => setSelectedCategory(cat)}
                      fontSize={1}
                      padding={2}
                    >
                      {cat}
                    </Button>
                  ))}
                </Flex>
              )}

              {/* Icons Grid */}
              {(search || selectedCategory) && (
                <Grid columns={[4, 6, 8]} gap={2}>
                  {filteredIcons.map(icon => (
                    <Card
                      key={icon.value}
                      padding={3}
                      radius={2}
                      shadow={value === icon.value ? 2 : 0}
                      tone={value === icon.value ? 'primary' : 'default'}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                      }}
                      onClick={() => handleSelect(icon.value)}
                    >
                      <Stack space={2}>
                        <Text size={4} align="center">{icon.icon}</Text>
                        <Text size={0} muted align="center" style={{ fontSize: '9px' }}>
                          {icon.label}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              )}

              {/* No results */}
              {search && filteredIcons.length === 0 && (
                <Text muted align="center">Nessuna icona trovata</Text>
              )}

              {/* Hint */}
              {!search && !selectedCategory && (
                <Text muted align="center" size={1}>
                  Seleziona una categoria o cerca un'icona
                </Text>
              )}
            </Stack>
          </Box>
        </Dialog>
      )}
    </Stack>
  )
}

export default IconPicker
