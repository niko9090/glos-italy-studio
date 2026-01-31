// PageDashboard.tsx - Dashboard panoramica per gestione pagine (VERSIONE MIGLIORATA)
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
} from '@sanity/ui'
import {
  AddIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  LaunchIcon,
  CheckmarkCircleIcon,
  CloseCircleIcon,
} from '@sanity/icons'
import { useClient } from 'sanity'

interface Page {
  _id: string
  _type: string
  _updatedAt: string
  _createdAt: string
  title: string | { it?: string; en?: string; es?: string }
  slug?: { current: string }
  isPublished: boolean
  sectionCount?: number
  sectionTypes?: string[]
}

// Helper per estrarre il titolo dalla struttura multilingua
function getTitle(title: Page['title']): string {
  if (!title) return 'Senza titolo'
  if (typeof title === 'string') return title
  return title.it || title.en || title.es || 'Senza titolo'
}

// URL del frontend
const FRONTEND_URL = 'https://glositaly.vercel.app'

export function PageDashboard() {
  const client = useClient({ apiVersion: '2024-01-01' })

  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('updated')
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set())

  // Carica le pagine
  const loadPages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const query = `*[_type == "page"] {
        _id,
        _type,
        _updatedAt,
        _createdAt,
        title,
        slug,
        isPublished,
        "sectionCount": count(sections),
        "sectionTypes": sections[]._type
      }`
      const result = await client.fetch(query)
      setPages(result || [])
    } catch (err) {
      console.error('Errore caricamento pagine:', err)
      setError('Impossibile caricare le pagine')
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    loadPages()
  }, [loadPages])

  // Ordina le pagine
  const sortedPages = [...pages].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return getTitle(a.title).localeCompare(getTitle(b.title))
      case 'created':
        return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      case 'sections':
        return (b.sectionCount || 0) - (a.sectionCount || 0)
      case 'updated':
      default:
        return new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime()
    }
  })

  // Filtra le pagine
  const filteredPages = sortedPages.filter((page) => {
    // Ricerca testuale
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const title = getTitle(page.title).toLowerCase()
      const slug = page.slug?.current?.toLowerCase() || ''
      if (!title.includes(query) && !slug.includes(query)) return false
    }
    // Filtro status
    if (filterStatus === 'published' && page.isPublished === false) return false
    if (filterStatus === 'draft' && page.isPublished !== false) return false
    return true
  })

  // Statistiche
  const stats = {
    total: pages.length,
    published: pages.filter((p) => p.isPublished !== false).length,
    drafts: pages.filter((p) => p.isPublished === false).length,
    totalSections: pages.reduce((sum, p) => sum + (p.sectionCount || 0), 0),
  }

  // Formatta data
  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return '-'
    }
  }

  // Ottieni URL pagina
  const getPageUrl = (page: Page) => {
    const slug = page.slug?.current
    if (!slug) return null
    return slug === 'home' ? FRONTEND_URL : `${FRONTEND_URL}/${slug}`
  }

  // Modifica pagina (apre in Gestione Contenuti)
  const handleEdit = (page: Page) => {
    // Naviga alla pagina di edit nel structure tool
    window.location.href = `/structure/page;${page._id}`
  }

  // Crea nuova pagina
  const handleCreate = () => {
    window.location.href = `/structure/page;template=page`
  }

  // Toggle pubblicazione
  const handleTogglePublish = async (page: Page) => {
    try {
      const newValue = page.isPublished === false ? true : false
      await client.patch(page._id).set({ isPublished: newValue }).commit()
      loadPages()
    } catch (err) {
      console.error('Errore aggiornamento:', err)
    }
  }

  // Duplica pagina
  const handleDuplicate = async (page: Page) => {
    try {
      const fullPage = await client.fetch(`*[_id == $id][0]`, { id: page._id })
      const newPage = {
        _type: 'page',
        title: typeof page.title === 'string'
          ? `${page.title} (Copia)`
          : { ...page.title, it: `${getTitle(page.title)} (Copia)` },
        slug: { current: `${page.slug?.current || 'pagina'}-copia-${Date.now()}` },
        isPublished: false,
        sections: fullPage?.sections || [],
      }
      await client.create(newPage)
      loadPages()
    } catch (err) {
      console.error('Errore duplicazione:', err)
    }
  }

  // Elimina pagina
  const handleDelete = async (page: Page) => {
    if (page.slug?.current === 'home') {
      alert('Non puoi eliminare la homepage!')
      return
    }
    if (!window.confirm(`Eliminare la pagina "${getTitle(page.title)}"?\nQuesta azione non può essere annullata.`)) return
    try {
      await client.delete(page._id)
      loadPages()
    } catch (err) {
      console.error('Errore eliminazione:', err)
    }
  }

  // Bulk publish/unpublish
  const handleBulkPublish = async (publish: boolean) => {
    if (selectedPages.size === 0) return
    try {
      const transaction = client.transaction()
      selectedPages.forEach((id) => {
        transaction.patch(id, { set: { isPublished: publish } })
      })
      await transaction.commit()
      setSelectedPages(new Set())
      loadPages()
    } catch (err) {
      console.error('Errore operazione bulk:', err)
    }
  }

  // Toggle selezione
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedPages)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedPages(newSelection)
  }

  // Seleziona tutti
  const selectAll = () => {
    if (selectedPages.size === filteredPages.length) {
      setSelectedPages(new Set())
    } else {
      setSelectedPages(new Set(filteredPages.map((p) => p._id)))
    }
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" height="fill" padding={5}>
        <Stack space={3} style={{ textAlign: 'center' }}>
          <Spinner size={4} />
          <Text size={2} muted>Caricamento pagine...</Text>
        </Stack>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex align="center" justify="center" height="fill" padding={5}>
        <Card padding={4} radius={2} tone="critical">
          <Text>{error}</Text>
          <Button text="Riprova" onClick={loadPages} style={{ marginTop: 16 }} />
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
            <Heading size={3}>Gestione Pagine</Heading>
            <Text size={1} muted>
              Panoramica di tutte le pagine del sito
            </Text>
          </Stack>
          <Button
            icon={AddIcon}
            text="Nuova Pagina"
            tone="primary"
            onClick={handleCreate}
          />
        </Flex>

        {/* Statistiche */}
        <Grid columns={[2, 4]} gap={3}>
          <Card padding={4} radius={2} shadow={1}>
            <Flex align="center" gap={3}>
              <Text size={3}>📄</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.total}</Text>
                <Text size={1} muted>Totale Pagine</Text>
              </Stack>
            </Flex>
          </Card>
          <Card padding={4} radius={2} shadow={1} tone="positive">
            <Flex align="center" gap={3}>
              <Text size={3}>✅</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.published}</Text>
                <Text size={1} muted>Pubblicate</Text>
              </Stack>
            </Flex>
          </Card>
          <Card padding={4} radius={2} shadow={1} tone="caution">
            <Flex align="center" gap={3}>
              <Text size={3}>📝</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.drafts}</Text>
                <Text size={1} muted>Bozze</Text>
              </Stack>
            </Flex>
          </Card>
          <Card padding={4} radius={2} shadow={1}>
            <Flex align="center" gap={3}>
              <Text size={3}>🧩</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.totalSections}</Text>
                <Text size={1} muted>Sezioni Totali</Text>
              </Stack>
            </Flex>
          </Card>
        </Grid>

        {/* Filtri e Ordinamento */}
        <Card padding={3} radius={2} shadow={1}>
          <Flex gap={3} wrap="wrap" align="flex-end">
            <Box flex={1} style={{ minWidth: 200 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Cerca</Text>
              <TextInput
                icon={SearchIcon}
                placeholder="Nome o URL pagina..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </Box>
            <Box style={{ minWidth: 150 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Stato</Text>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.currentTarget.value)}
              >
                <option value="all">Tutte</option>
                <option value="published">✅ Pubblicate</option>
                <option value="draft">📝 Bozze</option>
              </Select>
            </Box>
            <Box style={{ minWidth: 150 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Ordina per</Text>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.currentTarget.value)}
              >
                <option value="updated">Ultima modifica</option>
                <option value="created">Data creazione</option>
                <option value="name">Nome A-Z</option>
                <option value="sections">N. Sezioni</option>
              </Select>
            </Box>
          </Flex>
        </Card>

        {/* Azioni Bulk */}
        {selectedPages.size > 0 && (
          <Card padding={3} radius={2} tone="primary">
            <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
              <Text size={1}>
                <strong>{selectedPages.size}</strong> pagine selezionate
              </Text>
              <Flex gap={2}>
                <Button
                  icon={CheckmarkCircleIcon}
                  text="Pubblica"
                  mode="ghost"
                  tone="positive"
                  onClick={() => handleBulkPublish(true)}
                />
                <Button
                  icon={CloseCircleIcon}
                  text="Nascondi"
                  mode="ghost"
                  tone="caution"
                  onClick={() => handleBulkPublish(false)}
                />
                <Button
                  text="Deseleziona"
                  mode="ghost"
                  onClick={() => setSelectedPages(new Set())}
                />
              </Flex>
            </Flex>
          </Card>
        )}

        {/* Lista Pagine */}
        {filteredPages.length === 0 ? (
          <Card padding={5} radius={2} tone="transparent" style={{ textAlign: 'center' }}>
            <Stack space={3}>
              <Text size={3}>🔍</Text>
              <Text size={2} muted>
                {searchQuery || filterStatus !== 'all' ? 'Nessuna pagina trovata' : 'Nessuna pagina creata'}
              </Text>
              {pages.length === 0 && (
                <Button
                  icon={AddIcon}
                  text="Crea la prima pagina"
                  tone="primary"
                  onClick={handleCreate}
                />
              )}
            </Stack>
          </Card>
        ) : (
          <Stack space={2}>
            {/* Header lista con checkbox */}
            <Card padding={2} radius={2} style={{ background: '#f3f4f6' }}>
              <Flex align="center" gap={3}>
                <input
                  type="checkbox"
                  checked={selectedPages.size === filteredPages.length && filteredPages.length > 0}
                  onChange={selectAll}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <Text size={1} weight="semibold" style={{ flex: 1 }}>
                  {selectedPages.size > 0 ? `${selectedPages.size} selezionate` : 'Seleziona tutte'}
                </Text>
              </Flex>
            </Card>

            {filteredPages.map((page) => {
              const pageUrl = getPageUrl(page)
              const isHome = page.slug?.current === 'home'

              return (
                <Card
                  key={page._id}
                  padding={3}
                  radius={2}
                  shadow={1}
                  style={{
                    borderLeft: `4px solid ${page.isPublished !== false ? '#10b981' : '#f59e0b'}`,
                    background: selectedPages.has(page._id) ? '#eff6ff' : undefined,
                  }}
                >
                  <Flex align="center" gap={3} wrap="wrap">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedPages.has(page._id)}
                      onChange={() => toggleSelection(page._id)}
                      style={{ width: 18, height: 18, cursor: 'pointer' }}
                    />

                    {/* Info */}
                    <Box flex={1} style={{ minWidth: 200 }}>
                      <Flex align="center" gap={2}>
                        <Text weight="semibold">{getTitle(page.title)}</Text>
                        {isHome && <Badge tone="primary">Home</Badge>}
                      </Flex>
                      <Text size={1} muted>/{page.slug?.current || ''}</Text>
                    </Box>

                    {/* Badge */}
                    <Badge tone={page.isPublished !== false ? 'positive' : 'caution'}>
                      {page.isPublished !== false ? 'Online' : 'Bozza'}
                    </Badge>

                    <Badge mode="outline">
                      {page.sectionCount || 0} sez.
                    </Badge>

                    <Text size={1} muted style={{ minWidth: 120 }}>
                      {formatDate(page._updatedAt)}
                    </Text>

                    {/* Azioni */}
                    <Flex gap={1}>
                      <Button
                        icon={EditIcon}
                        mode="ghost"
                        title="Modifica"
                        onClick={() => handleEdit(page)}
                      />
                      {pageUrl && (
                        <Button
                          icon={LaunchIcon}
                          mode="ghost"
                          title="Apri nel sito"
                          as="a"
                          href={pageUrl}
                          target="_blank"
                        />
                      )}
                      <Button
                        icon={page.isPublished !== false ? EyeClosedIcon : EyeOpenIcon}
                        mode="ghost"
                        title={page.isPublished !== false ? 'Nascondi' : 'Pubblica'}
                        onClick={() => handleTogglePublish(page)}
                      />
                      <Button
                        icon={CopyIcon}
                        mode="ghost"
                        title="Duplica"
                        onClick={() => handleDuplicate(page)}
                      />
                      {!isHome && (
                        <Button
                          icon={TrashIcon}
                          mode="ghost"
                          tone="critical"
                          title="Elimina"
                          onClick={() => handleDelete(page)}
                        />
                      )}
                    </Flex>
                  </Flex>
                </Card>
              )
            })}
          </Stack>
        )}

        {/* Riepilogo */}
        {filteredPages.length > 0 && filteredPages.length !== pages.length && (
          <Text size={1} muted style={{ textAlign: 'center' }}>
            Visualizzate {filteredPages.length} di {pages.length} pagine
          </Text>
        )}
      </Stack>
    </Box>
  )
}

export default PageDashboard
