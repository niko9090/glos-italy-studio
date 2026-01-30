// PageDashboard.tsx - Dashboard panoramica per gestione pagine
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
  Select,
  Badge,
  useToast,
  Dialog,
  Spinner,
  Container,
} from '@sanity/ui'
import {
  AddIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  DocumentIcon,
  CheckmarkCircleIcon,
  CloseCircleIcon,
} from '@sanity/icons'
import { useClient, useDocumentStore } from 'sanity'
import { useRouter } from 'sanity/router'

interface Page {
  _id: string
  _type: string
  _updatedAt: string
  _createdAt: string
  title: string
  slug?: { current: string }
  isPublished: boolean
  sections?: any[]
}

interface Stats {
  total: number
  published: number
  drafts: number
}

export function PageDashboard() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const router = useRouter()
  const toast = useToast()

  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null)
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0 })

  // Carica le pagine
  const loadPages = useCallback(async () => {
    setLoading(true)
    try {
      const query = `*[_type == "page"] | order(_updatedAt desc) {
        _id,
        _type,
        _updatedAt,
        _createdAt,
        title,
        slug,
        isPublished,
        "sectionCount": count(sections)
      }`
      const result = await client.fetch(query)
      setPages(result)

      // Calcola statistiche
      const published = result.filter((p: Page) => p.isPublished).length
      setStats({
        total: result.length,
        published,
        drafts: result.length - published,
      })
    } catch (error) {
      console.error('Errore caricamento pagine:', error)
      toast.push({
        status: 'error',
        title: 'Errore',
        description: 'Impossibile caricare le pagine',
      })
    } finally {
      setLoading(false)
    }
  }, [client, toast])

  useEffect(() => {
    loadPages()
  }, [loadPages])

  // Filtra le pagine
  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug?.current?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'published' && page.isPublished) ||
      (filterStatus === 'draft' && !page.isPublished)

    return matchesSearch && matchesStatus
  })

  // Naviga all'editor della pagina
  const handleEdit = (pageId: string) => {
    router.navigateIntent('edit', { id: pageId, type: 'page' })
  }

  // Crea nuova pagina
  const handleCreate = () => {
    router.navigateIntent('create', { type: 'page' })
  }

  // Duplica pagina
  const handleDuplicate = async (page: Page) => {
    try {
      const newPage = {
        _type: 'page',
        title: `${page.title} (Copia)`,
        slug: { current: `${page.slug?.current || 'pagina'}-copia-${Date.now()}` },
        isPublished: false,
        sections: page.sections || [],
      }

      const result = await client.create(newPage)
      toast.push({
        status: 'success',
        title: 'Pagina duplicata!',
        description: `"${newPage.title}" creata`,
      })
      loadPages()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Errore',
        description: 'Impossibile duplicare la pagina',
      })
    }
  }

  // Elimina pagina
  const handleDelete = async () => {
    if (!pageToDelete) return

    try {
      await client.delete(pageToDelete._id)
      toast.push({
        status: 'success',
        title: 'Pagina eliminata',
      })
      setDeleteDialogOpen(false)
      setPageToDelete(null)
      loadPages()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Errore',
        description: 'Impossibile eliminare la pagina',
      })
    }
  }

  // Toggle pubblicazione
  const handleTogglePublish = async (page: Page) => {
    try {
      await client.patch(page._id).set({ isPublished: !page.isPublished }).commit()
      toast.push({
        status: 'success',
        title: page.isPublished ? 'Pagina nascosta' : 'Pagina pubblicata',
      })
      loadPages()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Errore',
        description: 'Impossibile aggiornare lo stato',
      })
    }
  }

  // Formatta data
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" height="fill" padding={5}>
        <Stack space={3} align="center">
          <Spinner size={4} />
          <Text size={2} muted>Caricamento pagine...</Text>
        </Stack>
      </Flex>
    )
  }

  return (
    <Container width={4} padding={4}>
      <Stack space={5}>
        {/* Header */}
        <Flex align="center" justify="space-between">
          <Stack space={2}>
            <Heading size={3}>
              <Flex align="center" gap={2}>
                <Text size={4}>📄</Text>
                Gestione Pagine
              </Flex>
            </Heading>
            <Text size={1} muted>
              Visualizza, modifica e gestisci tutte le pagine del sito
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
        <Grid columns={[1, 3]} gap={3}>
          <Card padding={4} radius={2} shadow={1} tone="default">
            <Flex align="center" gap={3}>
              <Text size={4}>📊</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.total}</Text>
                <Text size={1} muted>Totale Pagine</Text>
              </Stack>
            </Flex>
          </Card>
          <Card padding={4} radius={2} shadow={1} tone="positive">
            <Flex align="center" gap={3}>
              <Text size={4}>✅</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.published}</Text>
                <Text size={1} muted>Pubblicate</Text>
              </Stack>
            </Flex>
          </Card>
          <Card padding={4} radius={2} shadow={1} tone="caution">
            <Flex align="center" gap={3}>
              <Text size={4}>📝</Text>
              <Stack space={1}>
                <Text size={3} weight="bold">{stats.drafts}</Text>
                <Text size={1} muted>Bozze</Text>
              </Stack>
            </Flex>
          </Card>
        </Grid>

        {/* Filtri e ricerca */}
        <Card padding={4} radius={2} shadow={1}>
          <Flex gap={3} wrap="wrap">
            <Box flex={1} style={{ minWidth: '200px' }}>
              <TextInput
                icon={SearchIcon}
                placeholder="Cerca pagina..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </Box>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.currentTarget.value as any)}
            >
              <option value="all">Tutte le pagine</option>
              <option value="published">Solo pubblicate</option>
              <option value="draft">Solo bozze</option>
            </Select>
            <Flex gap={1}>
              <Button
                mode={viewMode === 'grid' ? 'default' : 'ghost'}
                text="Griglia"
                onClick={() => setViewMode('grid')}
              />
              <Button
                mode={viewMode === 'list' ? 'default' : 'ghost'}
                text="Lista"
                onClick={() => setViewMode('list')}
              />
            </Flex>
          </Flex>
        </Card>

        {/* Lista Pagine */}
        {filteredPages.length === 0 ? (
          <Card padding={5} radius={2} tone="transparent" style={{ textAlign: 'center' }}>
            <Stack space={3}>
              <Text size={4}>🔍</Text>
              <Text size={2} muted>Nessuna pagina trovata</Text>
              {searchQuery && (
                <Button
                  mode="ghost"
                  text="Cancella ricerca"
                  onClick={() => setSearchQuery('')}
                />
              )}
            </Stack>
          </Card>
        ) : viewMode === 'grid' ? (
          <Grid columns={[1, 2, 3]} gap={4}>
            {filteredPages.map((page: any) => (
              <Card
                key={page._id}
                padding={4}
                radius={2}
                shadow={1}
                style={{
                  borderLeft: `4px solid ${page.isPublished ? '#10b981' : '#f59e0b'}`,
                }}
              >
                <Stack space={4}>
                  <Flex align="flex-start" justify="space-between">
                    <Stack space={2}>
                      <Heading size={1}>{page.title || 'Senza titolo'}</Heading>
                      <Text size={1} muted>/{page.slug?.current || ''}</Text>
                    </Stack>
                    <Badge tone={page.isPublished ? 'positive' : 'caution'}>
                      {page.isPublished ? 'Online' : 'Bozza'}
                    </Badge>
                  </Flex>

                  <Flex gap={2}>
                    <Badge mode="outline">
                      {page.sectionCount || 0} sezioni
                    </Badge>
                  </Flex>

                  <Text size={1} muted>
                    Modificata: {formatDate(page._updatedAt)}
                  </Text>

                  <Flex gap={2} wrap="wrap">
                    <Button
                      icon={EditIcon}
                      text="Modifica"
                      tone="primary"
                      mode="ghost"
                      onClick={() => handleEdit(page._id)}
                    />
                    <Button
                      icon={page.isPublished ? EyeClosedIcon : EyeOpenIcon}
                      title={page.isPublished ? 'Nascondi' : 'Pubblica'}
                      mode="ghost"
                      onClick={() => handleTogglePublish(page)}
                    />
                    <Button
                      icon={CopyIcon}
                      title="Duplica"
                      mode="ghost"
                      onClick={() => handleDuplicate(page)}
                    />
                    <Button
                      icon={TrashIcon}
                      title="Elimina"
                      mode="ghost"
                      tone="critical"
                      onClick={() => {
                        setPageToDelete(page)
                        setDeleteDialogOpen(true)
                      }}
                    />
                  </Flex>
                </Stack>
              </Card>
            ))}
          </Grid>
        ) : (
          <Stack space={2}>
            {filteredPages.map((page: any) => (
              <Card key={page._id} padding={3} radius={2} shadow={1}>
                <Flex align="center" gap={4}>
                  <Box
                    style={{
                      width: '8px',
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: page.isPublished ? '#10b981' : '#f59e0b',
                    }}
                  />
                  <Box flex={1}>
                    <Text weight="semibold">{page.title || 'Senza titolo'}</Text>
                    <Text size={1} muted>/{page.slug?.current || ''}</Text>
                  </Box>
                  <Badge tone={page.isPublished ? 'positive' : 'caution'}>
                    {page.isPublished ? 'Online' : 'Bozza'}
                  </Badge>
                  <Badge mode="outline">{page.sectionCount || 0} sez.</Badge>
                  <Text size={1} muted style={{ whiteSpace: 'nowrap' }}>
                    {formatDate(page._updatedAt)}
                  </Text>
                  <Flex gap={1}>
                    <Button
                      icon={EditIcon}
                      mode="ghost"
                      onClick={() => handleEdit(page._id)}
                    />
                    <Button
                      icon={page.isPublished ? EyeClosedIcon : EyeOpenIcon}
                      mode="ghost"
                      onClick={() => handleTogglePublish(page)}
                    />
                    <Button
                      icon={CopyIcon}
                      mode="ghost"
                      onClick={() => handleDuplicate(page)}
                    />
                    <Button
                      icon={TrashIcon}
                      mode="ghost"
                      tone="critical"
                      onClick={() => {
                        setPageToDelete(page)
                        setDeleteDialogOpen(true)
                      }}
                    />
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Stack>
        )}

        {/* Dialog conferma eliminazione */}
        <Dialog
          id="delete-page-dialog"
          header="Conferma Eliminazione"
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false)
            setPageToDelete(null)
          }}
          width={0}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text size={2}>
                Sei sicuro di voler eliminare la pagina <strong>"{pageToDelete?.title}"</strong>?
              </Text>
              <Text size={1} muted>
                Questa azione non può essere annullata. Tutte le sezioni della pagina verranno eliminate.
              </Text>
              <Flex gap={2} justify="flex-end">
                <Button
                  mode="ghost"
                  text="Annulla"
                  onClick={() => {
                    setDeleteDialogOpen(false)
                    setPageToDelete(null)
                  }}
                />
                <Button
                  tone="critical"
                  text="Elimina Pagina"
                  icon={TrashIcon}
                  onClick={handleDelete}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      </Stack>
    </Container>
  )
}

export default PageDashboard
