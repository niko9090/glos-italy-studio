// PageDashboard.tsx - Dashboard panoramica per gestione pagine (v3 - Vista Unificata)
import React, { useState, useEffect, useCallback, useMemo } from 'react'
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
  useToast,
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
  PublishIcon,
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

// Rappresentazione unificata di una pagina (combina draft + published)
interface UnifiedPage {
  baseId: string // ID senza prefisso drafts.
  draft: Page | null
  published: Page | null
  // Dati da mostrare (presi dalla bozza se esiste, altrimenti dalla pubblicata)
  displayData: {
    title: string | { it?: string; en?: string; es?: string }
    slug?: { current: string }
    updatedAt: string
    createdAt: string
    isPublished: boolean
    sectionCount?: number
    sectionTypes?: string[]
  }
  // Stato della pagina
  status: 'draft_only' | 'published_only' | 'has_pending_changes'
}

// Helper per estrarre il titolo dalla struttura multilingua
function getTitle(title: Page['title']): string {
  if (!title) return 'Senza titolo'
  if (typeof title === 'string') return title
  return title.it || title.en || title.es || 'Senza titolo'
}

// Controlla se è una bozza
function isDraft(id: string): boolean {
  return id.startsWith('drafts.')
}

// Ottiene l'ID base (senza prefisso drafts.)
function getBaseId(id: string): string {
  return id.replace('drafts.', '')
}

// URL del frontend
const FRONTEND_URL = 'https://glositaly.vercel.app'

export function PageDashboard() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()

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

  // ========== LOGICA UNIFICATA: Raggruppa draft e published ==========
  const unifiedPages = useMemo(() => {
    const pageMap = new Map<string, { draft: Page | null; published: Page | null }>()

    // Raggruppa per baseId
    pages.forEach((page) => {
      const baseId = getBaseId(page._id)
      if (!pageMap.has(baseId)) {
        pageMap.set(baseId, { draft: null, published: null })
      }
      const entry = pageMap.get(baseId)!
      if (isDraft(page._id)) {
        entry.draft = page
      } else {
        entry.published = page
      }
    })

    // Converti in array di UnifiedPage
    const result: UnifiedPage[] = []
    pageMap.forEach((entry, baseId) => {
      const { draft, published } = entry
      // Usa i dati della bozza se esiste, altrimenti della pubblicata
      const source = draft || published!

      let status: UnifiedPage['status']
      if (draft && published) {
        status = 'has_pending_changes'
      } else if (draft && !published) {
        status = 'draft_only'
      } else {
        status = 'published_only'
      }

      result.push({
        baseId,
        draft,
        published,
        displayData: {
          title: source.title,
          slug: source.slug,
          updatedAt: source._updatedAt,
          createdAt: source._createdAt,
          isPublished: source.isPublished,
          sectionCount: source.sectionCount,
          sectionTypes: source.sectionTypes,
        },
        status,
      })
    })

    return result
  }, [pages])

  // Analizza per trovare slug duplicati (pagine DIVERSE con stesso slug)
  const duplicateSlugs = useMemo(() => {
    const slugMap: Record<string, UnifiedPage[]> = {}
    unifiedPages.forEach((up) => {
      const slug = up.displayData.slug?.current || 'no-slug'
      if (!slugMap[slug]) {
        slugMap[slug] = []
      }
      slugMap[slug].push(up)
    })

    const duplicates: { slug: string; count: number; pages: UnifiedPage[] }[] = []
    Object.entries(slugMap).forEach(([slug, pgs]) => {
      if (pgs.length > 1) {
        duplicates.push({ slug, count: pgs.length, pages: pgs })
      }
    })
    return duplicates
  }, [unifiedPages])

  // Ordina le pagine unificate
  const sortedUnifiedPages = useMemo(() => {
    return [...unifiedPages].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return getTitle(a.displayData.title).localeCompare(getTitle(b.displayData.title))
        case 'created':
          return new Date(b.displayData.createdAt).getTime() - new Date(a.displayData.createdAt).getTime()
        case 'sections':
          return (b.displayData.sectionCount || 0) - (a.displayData.sectionCount || 0)
        case 'updated':
        default:
          return new Date(b.displayData.updatedAt).getTime() - new Date(a.displayData.updatedAt).getTime()
      }
    })
  }, [unifiedPages, sortBy])

  // Filtra le pagine unificate
  const filteredUnifiedPages = useMemo(() => {
    return sortedUnifiedPages.filter((up) => {
      // Ricerca testuale
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const title = getTitle(up.displayData.title).toLowerCase()
        const slug = up.displayData.slug?.current?.toLowerCase() || ''
        if (!title.includes(query) && !slug.includes(query)) return false
      }
      // Filtro status
      if (filterStatus === 'published' && up.status !== 'published_only') return false
      if (filterStatus === 'draft' && up.status === 'published_only') return false
      if (filterStatus === 'pending' && up.status !== 'has_pending_changes') return false
      return true
    })
  }, [sortedUnifiedPages, searchQuery, filterStatus])

  // Statistiche aggiornate
  const stats = useMemo(() => ({
    totalUnique: unifiedPages.length,
    published: unifiedPages.filter((up) => up.status === 'published_only').length,
    draftsOnly: unifiedPages.filter((up) => up.status === 'draft_only').length,
    pendingChanges: unifiedPages.filter((up) => up.status === 'has_pending_changes').length,
    totalSections: unifiedPages.reduce((sum, up) => sum + (up.displayData.sectionCount || 0), 0),
  }), [unifiedPages])

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
  const getPageUrl = (up: UnifiedPage) => {
    const slug = up.displayData.slug?.current
    if (!slug) return null
    return slug === 'home' ? FRONTEND_URL : `${FRONTEND_URL}/${slug}`
  }

  // Modifica pagina - preferisce la bozza se esiste
  const handleEdit = (up: UnifiedPage) => {
    const editId = up.draft ? up.draft._id : up.published!._id
    window.location.href = `/structure/page;${editId}`
  }

  // Crea nuova pagina
  const handleCreate = () => {
    window.location.href = `/structure/page;template=page`
  }

  // Toggle pubblicazione (campo isPublished)
  const handleTogglePublish = async (up: UnifiedPage) => {
    try {
      const page = up.draft || up.published!
      const newValue = page.isPublished === false ? true : false
      await client.patch(page._id).set({ isPublished: newValue }).commit()
      toast.push({ status: 'success', title: newValue ? 'Pagina attivata' : 'Pagina nascosta' })
      loadPages()
    } catch (err) {
      console.error('Errore aggiornamento:', err)
      toast.push({ status: 'error', title: 'Errore aggiornamento' })
    }
  }

  // Duplica pagina
  const handleDuplicate = async (up: UnifiedPage) => {
    try {
      const sourceId = up.draft?._id || up.published!._id
      const fullPage = await client.fetch(`*[_id == $id][0]`, { id: sourceId })
      const newPage = {
        _type: 'page',
        title: typeof up.displayData.title === 'string'
          ? `${up.displayData.title} (Copia)`
          : { ...up.displayData.title, it: `${getTitle(up.displayData.title)} (Copia)` },
        slug: { current: `${up.displayData.slug?.current || 'pagina'}-copia-${Date.now()}` },
        isPublished: false,
        sections: fullPage?.sections || [],
      }
      await client.create(newPage)
      toast.push({ status: 'success', title: 'Pagina duplicata' })
      loadPages()
    } catch (err) {
      console.error('Errore duplicazione:', err)
      toast.push({ status: 'error', title: 'Errore duplicazione' })
    }
  }

  // Elimina pagina (elimina sia draft che published)
  const handleDelete = async (up: UnifiedPage) => {
    if (up.displayData.slug?.current === 'home') {
      toast.push({ status: 'warning', title: 'Non puoi eliminare la homepage!' })
      return
    }
    if (!window.confirm(`Eliminare "${getTitle(up.displayData.title)}"?\n\nQuesta azione eliminerà sia la bozza che la versione pubblicata.`)) return
    try {
      const transaction = client.transaction()
      if (up.draft) transaction.delete(up.draft._id)
      if (up.published) transaction.delete(up.published._id)
      await transaction.commit()
      toast.push({ status: 'success', title: 'Pagina eliminata' })
      loadPages()
    } catch (err) {
      console.error('Errore eliminazione:', err)
      toast.push({ status: 'error', title: 'Errore eliminazione' })
    }
  }

  // Pubblica le modifiche pendenti (usa l'API publish di Sanity)
  const handlePublishChanges = async (up: UnifiedPage) => {
    if (up.status !== 'has_pending_changes' && up.status !== 'draft_only') return
    try {
      if (up.draft) {
        // Pubblica il documento usando l'endpoint publish
        await client
          .patch(up.baseId)
          .set(await client.fetch(`*[_id == $id][0]`, { id: up.draft._id }))
          .commit()

        // Elimina la bozza
        await client.delete(up.draft._id)

        toast.push({ status: 'success', title: 'Modifiche pubblicate!' })
        loadPages()
      }
    } catch (err) {
      console.error('Errore pubblicazione:', err)
      toast.push({ status: 'error', title: 'Errore pubblicazione - prova dal pannello editor' })
    }
  }

  // Scarta le modifiche (elimina la bozza, mantiene la pubblicata)
  const handleDiscardChanges = async (up: UnifiedPage) => {
    if (up.status !== 'has_pending_changes') return
    if (!window.confirm(`Scartare le modifiche a "${getTitle(up.displayData.title)}"?\n\nLe modifiche non pubblicate verranno perse.`)) return
    try {
      if (up.draft) {
        await client.delete(up.draft._id)
        toast.push({ status: 'success', title: 'Modifiche scartate' })
        loadPages()
      }
    } catch (err) {
      console.error('Errore:', err)
      toast.push({ status: 'error', title: 'Errore' })
    }
  }

  // Bulk actions
  const handleBulkPublish = async (publish: boolean) => {
    if (selectedPages.size === 0) return
    try {
      const transaction = client.transaction()
      selectedPages.forEach((baseId) => {
        const up = unifiedPages.find((p) => p.baseId === baseId)
        if (up) {
          const page = up.draft || up.published
          if (page) {
            transaction.patch(page._id, { set: { isPublished: publish } })
          }
        }
      })
      await transaction.commit()
      setSelectedPages(new Set())
      toast.push({ status: 'success', title: `${selectedPages.size} pagine aggiornate` })
      loadPages()
    } catch (err) {
      console.error('Errore operazione bulk:', err)
      toast.push({ status: 'error', title: 'Errore operazione' })
    }
  }

  // Toggle selezione (usa baseId)
  const toggleSelection = (baseId: string) => {
    const newSelection = new Set(selectedPages)
    if (newSelection.has(baseId)) {
      newSelection.delete(baseId)
    } else {
      newSelection.add(baseId)
    }
    setSelectedPages(newSelection)
  }

  // Seleziona tutti
  const selectAll = () => {
    if (selectedPages.size === filteredUnifiedPages.length) {
      setSelectedPages(new Set())
    } else {
      setSelectedPages(new Set(filteredUnifiedPages.map((up) => up.baseId)))
    }
  }

  // Controlla se una pagina ha slug duplicato
  const hasSlugConflict = (up: UnifiedPage) => {
    return duplicateSlugs.some((d) => d.pages.some((p) => p.baseId === up.baseId))
  }

  // Ottieni il badge appropriato per lo stato
  const getStatusBadge = (status: UnifiedPage['status']) => {
    switch (status) {
      case 'draft_only':
        return <Badge tone="caution">Solo Bozza</Badge>
      case 'has_pending_changes':
        return <Badge tone="caution">Modifiche Pendenti</Badge>
      case 'published_only':
        return <Badge tone="positive">Pubblicata</Badge>
      default:
        return null
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
              {stats.totalUnique} pagine totali
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
                <Text size={3} weight="bold">{stats.totalUnique}</Text>
                <Text size={1} muted>Pagine</Text>
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
                <Text size={3} weight="bold">{stats.draftsOnly + stats.pendingChanges}</Text>
                <Text size={1} muted>Da Pubblicare</Text>
              </Stack>
            </Flex>
          </Card>
          <Card padding={4} radius={2} shadow={1}>
            <Flex align="center" gap={3}>
              <Text size={3}>🧩</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.totalSections}</Text>
                <Text size={1} muted>Sezioni</Text>
              </Stack>
            </Flex>
          </Card>
        </Grid>

        {/* Avviso Slug Duplicati */}
        {duplicateSlugs.length > 0 && (
          <Card padding={4} radius={2} tone="critical" shadow={1}>
            <Stack space={3}>
              <Flex align="center" gap={2}>
                <Text size={2} weight="bold">🚨 ERRORE: URL Duplicati!</Text>
              </Flex>
              <Text size={1}>
                Pagine diverse usano lo stesso URL. Questo causa conflitti.
              </Text>
              {duplicateSlugs.map((dup) => (
                <Card key={dup.slug} padding={2} radius={2} tone="critical">
                  <Text size={1}>
                    <strong>/{dup.slug}</strong> → {dup.count} pagine
                  </Text>
                </Card>
              ))}
              <Text size={1} muted>
                Soluzione: Modifica lo slug di una delle pagine o eliminala.
              </Text>
            </Stack>
          </Card>
        )}

        {/* Avviso Modifiche Pendenti */}
        {stats.pendingChanges > 0 && (
          <Card padding={3} radius={2} tone="caution" shadow={1}>
            <Flex align="center" gap={3}>
              <Text size={2}>📝</Text>
              <Text size={1}>
                <strong>{stats.pendingChanges}</strong> pagine con modifiche non pubblicate
              </Text>
            </Flex>
          </Card>
        )}

        {/* Filtri */}
        <Card padding={3} radius={2} shadow={1}>
          <Flex gap={3} wrap="wrap" align="flex-end">
            <Box flex={1} style={{ minWidth: 200 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Cerca</Text>
              <TextInput
                icon={SearchIcon}
                placeholder="Nome o URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </Box>
            <Box style={{ minWidth: 180 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Stato</Text>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.currentTarget.value)}
              >
                <option value="all">Tutte ({stats.totalUnique})</option>
                <option value="published">Pubblicate ({stats.published})</option>
                <option value="draft">Da Pubblicare ({stats.draftsOnly + stats.pendingChanges})</option>
                <option value="pending">Modifiche Pendenti ({stats.pendingChanges})</option>
              </Select>
            </Box>
            <Box style={{ minWidth: 150 }}>
              <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Ordina</Text>
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
                <strong>{selectedPages.size}</strong> selezionate
              </Text>
              <Flex gap={2}>
                <Button
                  icon={CheckmarkCircleIcon}
                  text="Attiva"
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
        {filteredUnifiedPages.length === 0 ? (
          <Card padding={5} radius={2} tone="transparent" style={{ textAlign: 'center' }}>
            <Stack space={3}>
              <Text size={3}>🔍</Text>
              <Text size={2} muted>
                {searchQuery || filterStatus !== 'all' ? 'Nessuna pagina trovata' : 'Nessuna pagina creata'}
              </Text>
              {unifiedPages.length === 0 && (
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
            {/* Header lista */}
            <Card padding={2} radius={2} tone="transparent">
              <Flex align="center" gap={3}>
                <input
                  type="checkbox"
                  checked={selectedPages.size === filteredUnifiedPages.length && filteredUnifiedPages.length > 0}
                  onChange={selectAll}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <Text size={1} weight="semibold" style={{ flex: 1 }}>
                  {selectedPages.size > 0 ? `${selectedPages.size} selezionate` : 'Seleziona tutte'}
                </Text>
              </Flex>
            </Card>

            {filteredUnifiedPages.map((up) => {
              const pageUrl = getPageUrl(up)
              const isHome = up.displayData.slug?.current === 'home'
              const slugConflict = hasSlugConflict(up)

              let cardTone: 'default' | 'caution' | 'critical' | 'positive' = 'default'
              if (slugConflict) cardTone = 'critical'
              else if (up.status === 'draft_only' || up.status === 'has_pending_changes') cardTone = 'caution'

              return (
                <Card key={up.baseId} padding={3} radius={2} shadow={1} tone={cardTone}>
                  <Flex align="center" gap={3} wrap="wrap">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedPages.has(up.baseId)}
                      onChange={() => toggleSelection(up.baseId)}
                      style={{ width: 18, height: 18, cursor: 'pointer' }}
                    />

                    {/* Info */}
                    <Box flex={1} style={{ minWidth: 180 }}>
                      <Flex align="center" gap={2} wrap="wrap">
                        <Text weight="semibold">{getTitle(up.displayData.title)}</Text>
                        {isHome && <Badge tone="primary">Home</Badge>}
                        {getStatusBadge(up.status)}
                        {slugConflict && <Badge tone="critical">URL Duplicato!</Badge>}
                      </Flex>
                      <Text size={1} muted>/{up.displayData.slug?.current || ''}</Text>
                    </Box>

                    {/* Sezioni */}
                    <Box style={{ maxWidth: 250 }}>
                      <Flex gap={1} wrap="wrap">
                        {up.displayData.sectionTypes && up.displayData.sectionTypes.length > 0 ? (
                          up.displayData.sectionTypes.slice(0, 5).map((type, idx) => (
                            <Badge key={idx} mode="outline" fontSize={0}>
                              {type.replace('Section', '')}
                            </Badge>
                          ))
                        ) : (
                          <Badge mode="outline" tone="caution" fontSize={0}>Vuota</Badge>
                        )}
                        {up.displayData.sectionTypes && up.displayData.sectionTypes.length > 5 && (
                          <Badge mode="outline" fontSize={0}>+{up.displayData.sectionTypes.length - 5}</Badge>
                        )}
                      </Flex>
                    </Box>

                    <Text size={1} muted style={{ minWidth: 120 }}>
                      {formatDate(up.displayData.updatedAt)}
                    </Text>

                    {/* Azioni */}
                    <Flex gap={1}>
                      <Button icon={EditIcon} mode="ghost" title="Modifica" onClick={() => handleEdit(up)} />
                      {pageUrl && (
                        <Button icon={LaunchIcon} mode="ghost" title="Apri nel sito" as="a" href={pageUrl} target="_blank" />
                      )}
                      {up.status === 'has_pending_changes' && (
                        <>
                          <Button
                            icon={PublishIcon}
                            mode="ghost"
                            tone="positive"
                            title="Pubblica modifiche"
                            onClick={() => handlePublishChanges(up)}
                          />
                          <Button
                            icon={CloseCircleIcon}
                            mode="ghost"
                            tone="caution"
                            title="Scarta modifiche"
                            onClick={() => handleDiscardChanges(up)}
                          />
                        </>
                      )}
                      {up.status === 'draft_only' && (
                        <Button
                          icon={PublishIcon}
                          mode="ghost"
                          tone="positive"
                          title="Pubblica"
                          onClick={() => handlePublishChanges(up)}
                        />
                      )}
                      <Button
                        icon={up.displayData.isPublished !== false ? EyeClosedIcon : EyeOpenIcon}
                        mode="ghost"
                        title={up.displayData.isPublished !== false ? 'Nascondi' : 'Attiva'}
                        onClick={() => handleTogglePublish(up)}
                      />
                      <Button icon={CopyIcon} mode="ghost" title="Duplica" onClick={() => handleDuplicate(up)} />
                      {!isHome && (
                        <Button icon={TrashIcon} mode="ghost" tone="critical" title="Elimina" onClick={() => handleDelete(up)} />
                      )}
                    </Flex>
                  </Flex>
                </Card>
              )
            })}
          </Stack>
        )}

        {/* Legenda */}
        <Card padding={3} radius={2} tone="transparent">
          <Stack space={2}>
            <Text size={1} weight="semibold">Legenda:</Text>
            <Flex gap={4} wrap="wrap">
              <Flex align="center" gap={2}>
                <Badge tone="positive">Pubblicata</Badge>
                <Text size={1} muted>Live sul sito</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Badge tone="caution">Solo Bozza</Badge>
                <Text size={1} muted>Mai pubblicata</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Badge tone="caution">Modifiche Pendenti</Badge>
                <Text size={1} muted>Ha modifiche non pubblicate</Text>
              </Flex>
            </Flex>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}

export default PageDashboard
