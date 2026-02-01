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
  Label,
  Checkbox,
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
  CloseIcon,
  CheckmarkIcon,
} from '@sanity/icons'
import { useClient } from 'sanity'
import { uuid } from '@sanity/uuid'

interface Dealer {
  _id: string
  _updatedAt: string
  name: string
  type: string
  city: string
  country?: string
  address?: string
  email?: string
  phone?: string
  website?: string
  youtubeVideo?: string
  isActive: boolean
  isFeatured?: boolean
  certifications?: string[]
  location?: { lat: number; lng: number }
}

interface NewDealerForm {
  name: string
  type: string
  city: string
  country: string
  email: string
  phone: string
  address: string
  website: string
  youtubeVideo: string
  isActive: boolean
}

const initialFormState: NewDealerForm = {
  name: '',
  type: 'rivenditore',
  city: '',
  country: 'Italia',
  email: '',
  phone: '',
  address: '',
  website: '',
  youtubeVideo: '',
  isActive: true,
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

  // Modal nuovo rivenditore
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newDealerForm, setNewDealerForm] = useState<NewDealerForm>(initialFormState)
  const [isSaving, setIsSaving] = useState(false)

  // Modal modifica rivenditore
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null)
  const [editDealerForm, setEditDealerForm] = useState<NewDealerForm>(initialFormState)

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
        address,
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

  // Apri modal modifica rivenditore
  const handleEdit = (dealer: Dealer) => {
    setEditingDealer(dealer)
    setEditDealerForm({
      name: dealer.name || '',
      type: dealer.type || 'rivenditore',
      city: dealer.city || '',
      country: dealer.country || 'Italia',
      email: dealer.email || '',
      phone: dealer.phone || '',
      address: dealer.address || '',
      website: dealer.website || '',
      youtubeVideo: dealer.youtubeVideo || '',
      isActive: dealer.isActive ?? true,
    })
    setIsEditModalOpen(true)
  }

  // Chiudi modal modifica
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingDealer(null)
    setEditDealerForm(initialFormState)
  }

  // Aggiorna campo form modifica
  const handleEditFormChange = (field: keyof NewDealerForm, value: string | boolean) => {
    setEditDealerForm(prev => ({ ...prev, [field]: value }))
  }

  // Salva modifiche rivenditore
  const handleSaveEditDealer = async () => {
    if (!editingDealer) return
    if (!editDealerForm.name.trim() || !editDealerForm.city.trim()) {
      alert('Nome e Città sono obbligatori')
      return
    }

    setIsSaving(true)
    try {
      await client
        .patch(editingDealer._id)
        .set({
          name: editDealerForm.name.trim(),
          type: editDealerForm.type,
          city: editDealerForm.city.trim(),
          country: editDealerForm.country,
          email: editDealerForm.email.trim() || null,
          phone: editDealerForm.phone.trim() || null,
          address: editDealerForm.address.trim() || null,
          website: editDealerForm.website.trim() || null,
          youtubeVideo: editDealerForm.youtubeVideo.trim() || null,
          isActive: editDealerForm.isActive,
        })
        .commit()

      handleCloseEditModal()
      loadDealers()
    } catch (err) {
      console.error('Errore aggiornamento rivenditore:', err)
      alert('Errore durante il salvataggio. Riprova.')
    } finally {
      setIsSaving(false)
    }
  }

  // Apri modal nuovo rivenditore
  const handleCreate = () => {
    setNewDealerForm(initialFormState)
    setIsModalOpen(true)
  }

  // Chiudi modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNewDealerForm(initialFormState)
  }

  // Aggiorna campo form
  const handleFormChange = (field: keyof NewDealerForm, value: string | boolean) => {
    setNewDealerForm(prev => ({ ...prev, [field]: value }))
  }

  // Salva nuovo rivenditore
  const handleSaveNewDealer = async () => {
    if (!newDealerForm.name.trim() || !newDealerForm.city.trim()) {
      alert('Nome e Città sono obbligatori')
      return
    }

    setIsSaving(true)
    try {
      const newDealer = {
        _id: `drafts.${uuid()}`,
        _type: 'dealer',
        name: newDealerForm.name.trim(),
        type: newDealerForm.type,
        city: newDealerForm.city.trim(),
        country: newDealerForm.country,
        email: newDealerForm.email.trim() || undefined,
        phone: newDealerForm.phone.trim() || undefined,
        address: newDealerForm.address.trim() || undefined,
        website: newDealerForm.website.trim() || undefined,
        youtubeVideo: newDealerForm.youtubeVideo.trim() || undefined,
        isActive: newDealerForm.isActive,
        isFeatured: false,
      }

      await client.create(newDealer)

      // Pubblica immediatamente
      const docId = newDealer._id.replace('drafts.', '')
      await client.patch(newDealer._id).set({}).commit()

      handleCloseModal()
      loadDealers()
    } catch (err) {
      console.error('Errore creazione rivenditore:', err)
      alert('Errore durante la creazione. Riprova.')
    } finally {
      setIsSaving(false)
    }
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

      {/* Modal Nuovo Rivenditore */}
      {isModalOpen && (
        <Dialog
          id="new-dealer-dialog"
          header="Nuovo Rivenditore"
          onClose={handleCloseModal}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              {/* Nome */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Nome Azienda *</Label>
                <TextInput
                  value={newDealerForm.name}
                  onChange={(e) => handleFormChange('name', e.currentTarget.value)}
                  placeholder="Es: Colorificio Rossi"
                />
              </Box>

              {/* Tipo */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Tipo</Label>
                <Select
                  value={newDealerForm.type}
                  onChange={(e) => handleFormChange('type', e.currentTarget.value)}
                >
                  <option value="rivenditore">🏪 Rivenditore</option>
                  <option value="distributore">🏭 Distributore</option>
                  <option value="agente">👤 Agente</option>
                </Select>
              </Box>

              {/* Città e Paese */}
              <Grid columns={2} gap={3}>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Città *</Label>
                  <TextInput
                    value={newDealerForm.city}
                    onChange={(e) => handleFormChange('city', e.currentTarget.value)}
                    placeholder="Es: Milano"
                  />
                </Box>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Paese</Label>
                  <Select
                    value={newDealerForm.country}
                    onChange={(e) => handleFormChange('country', e.currentTarget.value)}
                  >
                    <option value="Italia">🇮🇹 Italia</option>
                    <option value="Francia">🇫🇷 Francia</option>
                    <option value="Germania">🇩🇪 Germania</option>
                    <option value="Spagna">🇪🇸 Spagna</option>
                    <option value="Svizzera">🇨🇭 Svizzera</option>
                    <option value="Austria">🇦🇹 Austria</option>
                    <option value="Regno Unito">🇬🇧 Regno Unito</option>
                    <option value="Paesi Bassi">🇳🇱 Paesi Bassi</option>
                    <option value="Belgio">🇧🇪 Belgio</option>
                    <option value="Polonia">🇵🇱 Polonia</option>
                    <option value="Portogallo">🇵🇹 Portogallo</option>
                    <option value="Grecia">🇬🇷 Grecia</option>
                    <option value="Altro">🌍 Altro</option>
                  </Select>
                </Box>
              </Grid>

              {/* Indirizzo */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Indirizzo</Label>
                <TextInput
                  value={newDealerForm.address}
                  onChange={(e) => handleFormChange('address', e.currentTarget.value)}
                  placeholder="Via, numero civico, CAP"
                />
              </Box>

              {/* Email e Telefono */}
              <Grid columns={2} gap={3}>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Email</Label>
                  <TextInput
                    type="email"
                    value={newDealerForm.email}
                    onChange={(e) => handleFormChange('email', e.currentTarget.value)}
                    placeholder="email@esempio.it"
                  />
                </Box>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Telefono</Label>
                  <TextInput
                    value={newDealerForm.phone}
                    onChange={(e) => handleFormChange('phone', e.currentTarget.value)}
                    placeholder="+39 02 1234567"
                  />
                </Box>
              </Grid>

              {/* Sito Web */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Sito Web</Label>
                <TextInput
                  value={newDealerForm.website}
                  onChange={(e) => handleFormChange('website', e.currentTarget.value)}
                  placeholder="https://www.esempio.it"
                />
              </Box>

              {/* Video YouTube */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>🎬 Video YouTube</Label>
                <TextInput
                  value={newDealerForm.youtubeVideo}
                  onChange={(e) => handleFormChange('youtubeVideo', e.currentTarget.value)}
                  placeholder="https://www.youtube.com/watch?v=xxxxx"
                />
                <Text size={1} muted style={{ marginTop: 4 }}>
                  Link completo al video YouTube del rivenditore
                </Text>
              </Box>

              {/* Attivo */}
              <Flex align="center" gap={3}>
                <Checkbox
                  id="isActive"
                  checked={newDealerForm.isActive}
                  onChange={(e) => handleFormChange('isActive', e.currentTarget.checked)}
                />
                <Label htmlFor="isActive">Attivo (visibile sul sito)</Label>
              </Flex>

              {/* Azioni */}
              <Flex gap={3} justify="flex-end" marginTop={3}>
                <Button
                  text="Annulla"
                  mode="ghost"
                  onClick={handleCloseModal}
                  disabled={isSaving}
                />
                <Button
                  text={isSaving ? 'Salvataggio...' : 'Crea Rivenditore'}
                  tone="primary"
                  icon={isSaving ? Spinner : CheckmarkIcon}
                  onClick={handleSaveNewDealer}
                  disabled={isSaving || !newDealerForm.name.trim() || !newDealerForm.city.trim()}
                />
              </Flex>

              <Text size={1} muted>
                * Campi obbligatori. Dopo la creazione potrai aggiungere altri dettagli.
              </Text>
            </Stack>
          </Box>
        </Dialog>
      )}

      {/* Modal Modifica Rivenditore */}
      {isEditModalOpen && editingDealer && (
        <Dialog
          id="edit-dealer-dialog"
          header={`Modifica: ${editingDealer.name}`}
          onClose={handleCloseEditModal}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              {/* Nome */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Nome Azienda *</Label>
                <TextInput
                  value={editDealerForm.name}
                  onChange={(e) => handleEditFormChange('name', e.currentTarget.value)}
                  placeholder="Es: Colorificio Rossi"
                />
              </Box>

              {/* Tipo */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Tipo</Label>
                <Select
                  value={editDealerForm.type}
                  onChange={(e) => handleEditFormChange('type', e.currentTarget.value)}
                >
                  <option value="rivenditore">🏪 Rivenditore</option>
                  <option value="distributore">🏭 Distributore</option>
                  <option value="agente">👤 Agente</option>
                </Select>
              </Box>

              {/* Città e Paese */}
              <Grid columns={2} gap={3}>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Città *</Label>
                  <TextInput
                    value={editDealerForm.city}
                    onChange={(e) => handleEditFormChange('city', e.currentTarget.value)}
                    placeholder="Es: Milano"
                  />
                </Box>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Paese</Label>
                  <Select
                    value={editDealerForm.country}
                    onChange={(e) => handleEditFormChange('country', e.currentTarget.value)}
                  >
                    <option value="Italia">🇮🇹 Italia</option>
                    <option value="Francia">🇫🇷 Francia</option>
                    <option value="Germania">🇩🇪 Germania</option>
                    <option value="Spagna">🇪🇸 Spagna</option>
                    <option value="Svizzera">🇨🇭 Svizzera</option>
                    <option value="Austria">🇦🇹 Austria</option>
                    <option value="Regno Unito">🇬🇧 Regno Unito</option>
                    <option value="Paesi Bassi">🇳🇱 Paesi Bassi</option>
                    <option value="Belgio">🇧🇪 Belgio</option>
                    <option value="Polonia">🇵🇱 Polonia</option>
                    <option value="Portogallo">🇵🇹 Portogallo</option>
                    <option value="Grecia">🇬🇷 Grecia</option>
                    <option value="Altro">🌍 Altro</option>
                  </Select>
                </Box>
              </Grid>

              {/* Indirizzo */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Indirizzo</Label>
                <TextInput
                  value={editDealerForm.address}
                  onChange={(e) => handleEditFormChange('address', e.currentTarget.value)}
                  placeholder="Via, numero civico, CAP"
                />
              </Box>

              {/* Email e Telefono */}
              <Grid columns={2} gap={3}>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Email</Label>
                  <TextInput
                    type="email"
                    value={editDealerForm.email}
                    onChange={(e) => handleEditFormChange('email', e.currentTarget.value)}
                    placeholder="email@esempio.it"
                  />
                </Box>
                <Box>
                  <Label style={{ marginBottom: 8, display: 'block' }}>Telefono</Label>
                  <TextInput
                    value={editDealerForm.phone}
                    onChange={(e) => handleEditFormChange('phone', e.currentTarget.value)}
                    placeholder="+39 02 1234567"
                  />
                </Box>
              </Grid>

              {/* Sito Web */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>Sito Web</Label>
                <TextInput
                  value={editDealerForm.website}
                  onChange={(e) => handleEditFormChange('website', e.currentTarget.value)}
                  placeholder="https://www.esempio.it"
                />
              </Box>

              {/* Video YouTube */}
              <Box>
                <Label style={{ marginBottom: 8, display: 'block' }}>🎬 Video YouTube</Label>
                <TextInput
                  value={editDealerForm.youtubeVideo}
                  onChange={(e) => handleEditFormChange('youtubeVideo', e.currentTarget.value)}
                  placeholder="https://www.youtube.com/watch?v=xxxxx"
                />
                <Text size={1} muted style={{ marginTop: 4 }}>
                  Link completo al video YouTube del rivenditore
                </Text>
              </Box>

              {/* Attivo */}
              <Flex align="center" gap={3}>
                <Checkbox
                  id="editIsActive"
                  checked={editDealerForm.isActive}
                  onChange={(e) => handleEditFormChange('isActive', e.currentTarget.checked)}
                />
                <Label htmlFor="editIsActive">Attivo (visibile sul sito)</Label>
              </Flex>

              {/* Azioni */}
              <Flex gap={3} justify="flex-end" marginTop={3}>
                <Button
                  text="Annulla"
                  mode="ghost"
                  onClick={handleCloseEditModal}
                  disabled={isSaving}
                />
                <Button
                  text={isSaving ? 'Salvataggio...' : 'Salva Modifiche'}
                  tone="primary"
                  icon={isSaving ? Spinner : CheckmarkIcon}
                  onClick={handleSaveEditDealer}
                  disabled={isSaving || !editDealerForm.name.trim() || !editDealerForm.city.trim()}
                />
              </Flex>

              <Text size={1} muted>
                * Campi obbligatori</Text>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Box>
  )
}

export default DealerDashboard
