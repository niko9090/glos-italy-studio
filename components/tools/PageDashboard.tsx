// PageDashboard.tsx - Dashboard panoramica per gestione pagine (v2 - Dark Mode + Duplicati Slug)
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
  WarningOutlineIcon,
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

  // Analizza le pagine per trovare problemi
  const analyzePages = () => {
    const slugMap: Record<string, { drafts: Page[]; published: Page[] }> = {}

    pages.forEach((page) => {
      const slug = page.slug?.current || 'no-slug'
      if (!slugMap[slug]) {
        slugMap[slug] = { drafts: [], published: [] }
      }
      if (isDraft(page._id)) {
        slugMap[slug].drafts.push(page)
      } else {
        slugMap[slug].published.push(page)
      }
    })

    // Trova slug con problemi
    const duplicateSlugs: { slug: string; count: number; pages: Page[] }[] = []
    const pagesWithPendingChanges: { slug: string; published: Page; draft: Page }[] = []

    Object.entries(slugMap).forEach(([slug, { drafts, published }]) => {
      // Caso 1: Stesso slug usato da pagine DIVERSE (problema reale)
      const uniqueBaseIds = new Set([
        ...drafts.map((p) => getBaseId(p._id)),
        ...published.map((p) => p._id),
      ])

      if (uniqueBaseIds.size > 1) {
        duplicateSlugs.push({
          slug,
          count: uniqueBaseIds.size,
          pages: [...drafts, ...published],
        })
      }

      // Caso 2: Stessa pagina con bozza e pubblicata (modifiche pendenti)
      drafts.forEach((draft) => {
        const baseId = getBaseId(draft._id)
        const matchingPublished = published.find((p) => p._id === baseId)
        if (matchingPublished) {
          pagesWithPendingChanges.push({
            slug,
            published: matchingPublished,
            draft,
          })
        }
      })
    })

    return { duplicateSlugs, pagesWithPendingChanges, slugMap }
  }

  const { duplicateSlugs, pagesWithPendingChanges, slugMap } = analyzePages()

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
    if (filterStatus === 'published' && isDraft(page._id)) return false
    if (filterStatus === 'draft' && !isDraft(page._id)) return false
    return true
  })

  // Statistiche
  const stats = {
    total: pages.length,
    published: pages.filter((p) => !isDraft(p._id)).length,
    drafts: pages.filter((p) => isDraft(p._id)).length,
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

  // Modifica pagina
  const handleEdit = (page: Page) => {
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
      toast.push({ status: 'success', title: newValue ? 'Pagina pubblicata' : 'Pagina nascosta' })
      loadPages()
    } catch (err) {
      console.error('Errore aggiornamento:', err)
      toast.push({ status: 'error', title: 'Errore aggiornamento' })
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
      toast.push({ status: 'success', title: 'Pagina duplicata' })
      loadPages()
    } catch (err) {
      console.error('Errore duplicazione:', err)
      toast.push({ status: 'error', title: 'Errore duplicazione' })
    }
  }

  // Elimina pagina
  const handleDelete = async (page: Page) => {
    if (page.slug?.current === 'home') {
      toast.push({ status: 'warning', title: 'Non puoi eliminare la homepage!' })
      return
    }
    if (!window.confirm(`Eliminare "${getTitle(page.title)}"?\n\nQuesta azione non può essere annullata.`)) return
    try {
      await client.delete(page._id)
      toast.push({ status: 'success', title: 'Pagina eliminata' })
      loadPages()
    } catch (err) {
      console.error('Errore eliminazione:', err)
      toast.push({ status: 'error', title: 'Errore eliminazione' })
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
      toast.push({ status: 'success', title: `${selectedPages.size} pagine aggiornate` })
      loadPages()
    } catch (err) {
      console.error('Errore operazione bulk:', err)
      toast.push({ status: 'error', title: 'Errore operazione' })
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

  // Controlla se una pagina ha slug duplicato
  const hasSlugConflict = (page: Page) => {
    return duplicateSlugs.some((d) => d.pages.some((p) => p._id === page._id))
  }

  // Controlla se una pagina ha modifiche pendenti
  const hasPendingChanges = (page: Page) => {
    return pagesWithPendingChanges.some(
      (p) => p.published._id === page._id || p.draft._id === page._id
    )
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
            <Heading size={3}>📄 Gestione Pagine</Heading>
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
                <Text size={1} muted>Totale Documenti</Text>
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

        {/* Avviso Slug Duplicati (PROBLEMA GRAVE) */}
        {duplicateSlugs.length > 0 && (
          <Card padding={4} radius={2} tone="critical" shadow={1}>
            <Flex align="flex-start" gap={3}>
              <Text size={3}>🚨</Text>
              <Stack space={3} flex={1}>
                <Text size={2} weight="bold">
                  ERRORE: URL Duplicati!
                </Text>
                <Text size={1}>
                  Ci sono pagine diverse che usano lo stesso URL. Questo causa conflitti.
                </Text>
                <Stack space={2}>
                  {duplicateSlugs.map((dup) => (
                    <Card key={dup.slug} padding={2} radius={2} tone="critical">
                      <Text size={1}>
                        <strong>/{dup.slug}</strong> → {dup.count} pagine usano questo URL
                      </Text>
                    </Card>
                  ))}
                </Stack>
                <Text size={1} muted>
                  Soluzione: Modifica gli slug delle pagine duplicate o eliminale.
                </Text>
              </Stack>
            </Flex>
          </Card>
        )}

        {/* Avviso Modifiche Pendenti */}
        {pagesWithPendingChanges.length > 0 && (
          <Card padding={3} radius={2} tone="caution" shadow={1}>
            <Flex align="center" gap={3}>
              <Text size={2}>📝</Text>
              <Stack space={2} flex={1}>
                <Text size={1} weight="semibold">
                  {pagesWithPendingChanges.length} pagine con modifiche non pubblicate
                </Text>
                <Text size={1} muted>
                  {pagesWithPendingChanges.map((p) => `"${getTitle(p.published.title)}"`).join(', ')}
                </Text>
              </Stack>
            </Flex>
          </Card>
        )}

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
                <option value="all">Tutti ({stats.total})</option>
                <option value="published">✅ Pubblicate ({stats.published})</option>
                <option value="draft">📝 Bozze ({stats.drafts})</option>
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
            <Card padding={2} radius={2} tone="transparent">
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
              const isPageDraft = isDraft(page._id)
              const slugConflict = hasSlugConflict(page)
              const pendingChanges = hasPendingChanges(page)

              // Determina il tono della card
              let cardTone: 'default' | 'caution' | 'critical' | 'positive' = 'default'
              if (slugConflict) cardTone = 'critical'
              else if (isPageDraft) cardTone = 'caution'

              return (
                <Card
                  key={page._id}
                  padding={3}
                  radius={2}
                  shadow={1}
                  tone={cardTone}
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
                      <Flex align="center" gap={2} wrap="wrap">
                        <Text weight="semibold">{getTitle(page.title)}</Text>
                        {isHome && <Badge tone="primary">Home</Badge>}
                        {isPageDraft && <Badge tone="caution">Bozza</Badge>}
                        {slugConflict && <Badge tone="critical">URL Duplicato!</Badge>}
                        {pendingChanges && !isPageDraft && <Badge tone="caution">Mod. Pendenti</Badge>}
                      </Flex>
                      <Flex align="center" gap={2}>
                        <Text size={1} muted>/{page.slug?.current || ''}</Text>
                        {isPageDraft && (
                          <Text size={0} muted style={{ opacity: 0.7 }}>
                            (ID: {page._id})
                          </Text>
                        )}
                      </Flex>
                    </Box>

                    {/* Sezioni contenute */}
                    <Box style={{ maxWidth: 280 }}>
                      <Flex gap={1} wrap="wrap">
                        {page.sectionTypes && page.sectionTypes.length > 0 ? (
                          page.sectionTypes.slice(0, 6).map((type, idx) => (
                            <Badge key={idx} mode="outline" fontSize={0}>
                              {type.replace('Section', '')}
                            </Badge>
                          ))
                        ) : (
                          <Badge mode="outline" tone="caution" fontSize={0}>
                            Vuota
                          </Badge>
                        )}
                        {page.sectionTypes && page.sectionTypes.length > 6 && (
                          <Badge mode="outline" fontSize={0}>
                            +{page.sectionTypes.length - 6}
                          </Badge>
                        )}
                      </Flex>
                    </Box>

                    <Text size={1} muted style={{ minWidth: 130 }}>
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

        {/* Legenda */}
        <Card padding={3} radius={2} tone="transparent">
          <Stack space={2}>
            <Text size={1} weight="semibold">Legenda:</Text>
            <Flex gap={4} wrap="wrap">
              <Flex align="center" gap={2}>
                <Badge tone="caution">Bozza</Badge>
                <Text size={1} muted>Modifiche non ancora pubblicate</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Badge tone="critical">URL Duplicato!</Badge>
                <Text size={1} muted>Pagine diverse con stesso URL (da correggere)</Text>
              </Flex>
            </Flex>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}

export default PageDashboard
