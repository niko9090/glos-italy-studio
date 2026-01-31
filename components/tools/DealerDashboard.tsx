// DealerDashboard.tsx - Dashboard per gestione rivenditori
import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  TextInput,
  Badge,
  Spinner,
  Select,
  Switch,
  Dialog,
} from '@sanity/ui'
import {
  SearchIcon,
  TrashIcon,
  EditIcon,
  AddIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  StarIcon,
  LinkIcon,
  PlayIcon,
} from '@sanity/icons'
import { useClient } from 'sanity'

interface Dealer {
  _id: string
  _updatedAt: string
  name: string
  type: string
  city: string
  country?: string
  email?: string
  phone?: string
  website?: string
  youtubeVideo?: string
  isActive: boolean
  isFeatured?: boolean
  certifications?: string[]
  location?: { lat: number; lng: number }
}

export function DealerDashboard() {
  const client = useClient({ apiVersion: '2024-01-01' })

  const [dealers, setDealers] = useState<Dealer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCountry, setFilterCountry] = useState<string>('all')

  // Carica i rivenditori
  const loadDealers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const query = `*[_type == "dealer"] | order(isFeatured desc, name asc) {
        _id,
        _updatedAt,
        name,
        type,
        city,
        country,
        email,
        phone,
        website,
        youtubeVideo,
        isActive,
        isFeatured,
        certifications,
        location
      }`
      const result = await client.fetch(query)
      setDealers(result || [])
    } catch (err) {
      console.error('Errore caricamento rivenditori:', err)
      setError('Impossibile caricare i rivenditori')
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    loadDealers()
  }, [loadDealers])

  // Filtra i rivenditori
  const filteredDealers = dealers.filter((dealer) => {
    // Ricerca testuale
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const searchFields = [dealer.name, dealer.city, dealer.email, dealer.country]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!searchFields.includes(query)) return false
    }
    // Filtro tipo
    if (filterType !== 'all' && dealer.type !== filterType) return false
    // Filtro status
    if (filterStatus === 'active' && !dealer.isActive) return false
    if (filterStatus === 'inactive' && dealer.isActive) return false
    if (filterStatus === 'featured' && !dealer.isFeatured) return false
    // Filtro paese
    if (filterCountry !== 'all' && dealer.country !== filterCountry) return false
    return true
  })

  // Statistiche
  const stats = {
    total: dealers.length,
    active: dealers.filter((d) => d.isActive).length,
    inactive: dealers.filter((d) => !d.isActive).length,
    featured: dealers.filter((d) => d.isFeatured).length,
    withVideo: dealers.filter((d) => d.youtubeVideo).length,
    withCoords: dealers.filter((d) => d.location?.lat && d.location?.lng).length,
  }

  // Paesi unici per filtro
  const countries = [...new Set(dealers.map((d) => d.country).filter(Boolean))]

  // Formatta data
  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return '-'
    }
  }

  // Toggle attivo
  const handleToggleActive = async (dealer: Dealer) => {
    try {
      await client.patch(dealer._id).set({ isActive: !dealer.isActive }).commit()
      loadDealers()
    } catch (err) {
      console.error('Errore aggiornamento:', err)
    }
  }

  // Toggle featured
  const handleToggleFeatured = async (dealer: Dealer) => {
    try {
      await client.patch(dealer._id).set({ isFeatured: !dealer.isFeatured }).commit()
      loadDealers()
    } catch (err) {
      console.error('Errore aggiornamento:', err)
    }
  }

  // Elimina
  const handleDelete = async (dealer: Dealer) => {
    if (!window.confirm(`Eliminare "${dealer.name}"? Questa azione non può essere annullata.`)) return
    try {
      await client.delete(dealer._id)
      loadDealers()
    } catch (err) {
      console.error('Errore eliminazione:', err)
    }
  }

  // Vai a modifica
  const handleEdit = (dealer: Dealer) => {
    window.location.href = `/structure/dealer;${dealer._id}`
  }

  // Crea nuovo
  const handleCreate = () => {
    window.location.href = `/structure/dealer;template=dealer`
  }

  // Tipo icona
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'distributore':
        return '🏭'
      case 'agente':
        return '👤'
      default:
        return '🏪'
    }
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" height="fill" padding={5}>
        <Stack space={3} style={{ textAlign: 'center' }}>
          <Spinner size={4} />
          <Text size={2} muted>Caricamento rivenditori...</Text>
        </Stack>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex align="center" justify="center" height="fill" padding={5}>
        <Card padding={4} radius={2} tone="critical">
          <Text>{error}</Text>
          <Button text="Riprova" onClick={loadDealers} style={{ marginTop: 16 }} />
        </Card>
      </Flex>
    )
  }

  return (
    <Box padding={4} style={{ maxWidth: 1400, margin: '0 auto' }}>
      <Stack space={5}>
        {/* Header */}
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Stack space={2}>
            <Heading size={3}>Gestione Rivenditori</Heading>
            <Text size={1} muted>
              Panoramica della rete vendita GLOS Italy
            </Text>
          </Stack>
          <Button
            icon={AddIcon}
            text="Nuovo Rivenditore"
            tone="primary"
            onClick={handleCreate}
          />
        </Flex>

        {/* Statistiche */}
        <Grid columns={[2, 3, 6]} gap={3}>
          <Card padding={3} radius={2} shadow={1}>
            <Stack space={1} style={{ textAlign: 'center' }}>
              <Text size={3} weight="bold">{stats.total}</Text>
              <Text size={1} muted>Totale</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} shadow={1} tone="positive">
            <Stack space={1} style={{ textAlign: 'center' }}>
              <Text size={3} weight="bold">{stats.active}</Text>
              <Text size={1} muted>Attivi</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} shadow={1} tone="caution">
            <Stack space={1} style={{ textAlign: 'center' }}>
              <Text size={3} weight="bold">{stats.inactive}</Text>
              <Text size={1} muted>Inattivi</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} shadow={1} tone="primary">
            <Stack space={1} style={{ textAlign: 'center' }}>
              <Text size={3} weight="bold">{stats.featured}</Text>
              <Text size={1} muted>In Evidenza</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} shadow={1}>
            <Stack space={1} style={{ textAlign: 'center' }}>
              <Text size={3} weight="bold">{stats.withVideo}</Text>
              <Text size={1} muted>Con Video</Text>
            </Stack>
          </Card>
          <Card padding={3} radius={2} shadow={1}>
            <Stack space={1} style={{ textAlign: 'center' }}>
              <Text size={3} weight="bold">{stats.withCoords}</Text>
              <Text size={1} muted>Su Mappa</Text>
            </Stack>
          </Card>
        </Grid>

        {/* Filtri */}
        <Card padding={3} radius={2} shadow={1}>
          <Flex gap={3} wrap="wrap" align="flex-end">
            <Box flex={1} style={{ minWidth: 200 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Cerca</Text>
              <TextInput
                icon={SearchIcon}
                placeholder="Nome, città, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </Box>
            <Box style={{ minWidth: 150 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Tipo</Text>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.currentTarget.value)}
              >
                <option value="all">Tutti i tipi</option>
                <option value="rivenditore">🏪 Rivenditori</option>
                <option value="distributore">🏭 Distributori</option>
                <option value="agente">👤 Agenti</option>
              </Select>
            </Box>
            <Box style={{ minWidth: 150 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Stato</Text>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.currentTarget.value)}
              >
                <option value="all">Tutti</option>
                <option value="active">✅ Attivi</option>
                <option value="inactive">❌ Inattivi</option>
                <option value="featured">⭐ In Evidenza</option>
              </Select>
            </Box>
            {countries.length > 0 && (
              <Box style={{ minWidth: 150 }}>
                <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Paese</Text>
                <Select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.currentTarget.value)}
                >
                  <option value="all">Tutti i paesi</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </Box>
            )}
          </Flex>
        </Card>

        {/* Avviso se mancano coordinate */}
        {stats.total > 0 && stats.withCoords < stats.active && (
          <Card padding={3} radius={2} tone="caution">
            <Text size={1}>
              ⚠️ {stats.active - stats.withCoords} rivenditori attivi non hanno coordinate GPS e non appariranno sulla mappa.
            </Text>
          </Card>
        )}

        {/* Lista Rivenditori */}
        {filteredDealers.length === 0 ? (
          <Card padding={5} radius={2} tone="transparent" style={{ textAlign: 'center' }}>
            <Stack space={3}>
              <Text size={4}>🏪</Text>
              <Text size={2} muted>
                {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                  ? 'Nessun rivenditore trovato con questi filtri'
                  : 'Nessun rivenditore presente'}
              </Text>
              {dealers.length === 0 && (
                <Button
                  icon={AddIcon}
                  text="Aggiungi il primo rivenditore"
                  tone="primary"
                  onClick={handleCreate}
                />
              )}
            </Stack>
          </Card>
        ) : (
          <Stack space={2}>
            {filteredDealers.map((dealer) => (
              <Card
                key={dealer._id}
                padding={3}
                radius={2}
                shadow={1}
                style={{
                  borderLeft: `4px solid ${
                    !dealer.isActive ? '#ef4444' :
                    dealer.isFeatured ? '#f59e0b' :
                    '#10b981'
                  }`,
                }}
              >
                <Flex align="center" gap={3} wrap="wrap">
                  {/* Info principale */}
                  <Box flex={1} style={{ minWidth: 200 }}>
                    <Flex align="center" gap={2}>
                      <Text size={2}>{getTypeIcon(dealer.type)}</Text>
                      <Text weight="semibold">{dealer.name}</Text>
                      {dealer.isFeatured && <Text size={1}>⭐</Text>}
                    </Flex>
                    <Text size={1} muted>
                      {[dealer.city, dealer.country].filter(Boolean).join(', ')}
                    </Text>
                  </Box>

                  {/* Contatti */}
                  <Box style={{ minWidth: 180 }}>
                    {dealer.email && (
                      <Text size={1} muted style={{ display: 'block' }}>
                        ✉️ {dealer.email}
                      </Text>
                    )}
                    {dealer.phone && (
                      <Text size={1} muted style={{ display: 'block' }}>
                        📞 {dealer.phone}
                      </Text>
                    )}
                  </Box>

                  {/* Badge */}
                  <Flex gap={2} wrap="wrap">
                    <Badge tone={dealer.isActive ? 'positive' : 'critical'}>
                      {dealer.isActive ? 'Attivo' : 'Inattivo'}
                    </Badge>
                    {dealer.location?.lat && dealer.location?.lng && (
                      <Badge mode="outline" tone="primary">📍 Mappa</Badge>
                    )}
                    {dealer.youtubeVideo && (
                      <Badge mode="outline" tone="caution">🎬 Video</Badge>
                    )}
                    {dealer.website && (
                      <Badge mode="outline">🌐 Sito</Badge>
                    )}
                  </Flex>

                  {/* Data */}
                  <Text size={1} muted style={{ minWidth: 80 }}>
                    {formatDate(dealer._updatedAt)}
                  </Text>

                  {/* Azioni */}
                  <Flex gap={1}>
                    <Button
                      icon={EditIcon}
                      mode="ghost"
                      title="Modifica"
                      onClick={() => handleEdit(dealer)}
                    />
                    <Button
                      icon={dealer.isActive ? EyeClosedIcon : EyeOpenIcon}
                      mode="ghost"
                      title={dealer.isActive ? 'Disattiva' : 'Attiva'}
                      onClick={() => handleToggleActive(dealer)}
                    />
                    <Button
                      icon={StarIcon}
                      mode="ghost"
                      tone={dealer.isFeatured ? 'primary' : undefined}
                      title={dealer.isFeatured ? 'Rimuovi da evidenza' : 'Metti in evidenza'}
                      onClick={() => handleToggleFeatured(dealer)}
                    />
                    <Button
                      icon={TrashIcon}
                      mode="ghost"
                      tone="critical"
                      title="Elimina"
                      onClick={() => handleDelete(dealer)}
                    />
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Stack>
        )}

        {/* Riepilogo filtri */}
        {filteredDealers.length > 0 && filteredDealers.length !== dealers.length && (
          <Text size={1} muted style={{ textAlign: 'center' }}>
            Visualizzati {filteredDealers.length} di {dealers.length} rivenditori
          </Text>
        )}
      </Stack>
    </Box>
  )
}

export default DealerDashboard
