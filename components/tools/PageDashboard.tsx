// PageDashboard.tsx - Dashboard panoramica per gestione pagine (versione semplificata)
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
}

// Helper per estrarre il titolo dalla struttura multilingua
function getTitle(title: Page['title']): string {
  if (!title) return 'Senza titolo'
  if (typeof title === 'string') return title
  return title.it || title.en || title.es || 'Senza titolo'
}

export function PageDashboard() {
  const client = useClient({ apiVersion: '2024-01-01' })

  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Carica le pagine
  const loadPages = useCallback(async () => {
    setLoading(true)
    setError(null)
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

  // Filtra le pagine
  const filteredPages = pages.filter((page) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const title = getTitle(page.title).toLowerCase()
    const slug = page.slug?.current?.toLowerCase() || ''
    return title.includes(query) || slug.includes(query)
  })

  // Statistiche (isPublished undefined = pubblicata di default)
  const stats = {
    total: pages.length,
    published: pages.filter((p) => p.isPublished !== false).length,
    drafts: pages.filter((p) => p.isPublished === false).length,
  }

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

  // Toggle pubblicazione (undefined = pubblicata, quindi toggle a false)
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
      // Fetch full page data
      const fullPage = await client.fetch(`*[_id == $id][0]`, { id: page._id })

      const newPage = {
        _type: 'page',
        title: `${getTitle(page.title)} (Copia)`,
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
    if (!window.confirm(`Eliminare la pagina "${getTitle(page.title)}"?`)) return

    try {
      await client.delete(page._id)
      loadPages()
    } catch (err) {
      console.error('Errore eliminazione:', err)
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
    <Box padding={4} style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Stack space={5}>
        {/* Header */}
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Stack space={2}>
            <Heading size={3}>Gestione Pagine</Heading>
            <Text size={1} muted>
              Panoramica di tutte le pagine del sito
            </Text>
          </Stack>
        </Flex>

        {/* Statistiche */}
        <Grid columns={[1, 3]} gap={3}>
          <Card padding={4} radius={2} shadow={1}>
            <Flex align="center" gap={3}>
              <Text size={3}>📊</Text>
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
        </Grid>

        {/* Ricerca */}
        <Card padding={3} radius={2} shadow={1}>
          <TextInput
            icon={SearchIcon}
            placeholder="Cerca pagina per nome o URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
        </Card>

        {/* Info */}
        <Card padding={3} radius={2} tone="primary">
          <Text size={1}>
            💡 Per modificare una pagina, vai su <strong>Gestione Contenuti → Pagine</strong> nel menu in alto
          </Text>
        </Card>

        {/* Lista Pagine */}
        {filteredPages.length === 0 ? (
          <Card padding={5} radius={2} tone="transparent" style={{ textAlign: 'center' }}>
            <Stack space={3}>
              <Text size={3}>🔍</Text>
              <Text size={2} muted>
                {searchQuery ? 'Nessuna pagina trovata' : 'Nessuna pagina creata'}
              </Text>
            </Stack>
          </Card>
        ) : (
          <Stack space={2}>
            {filteredPages.map((page) => (
              <Card
                key={page._id}
                padding={3}
                radius={2}
                shadow={1}
                style={{
                  borderLeft: `4px solid ${page.isPublished !== false ? '#10b981' : '#f59e0b'}`,
                }}
              >
                <Flex align="center" gap={3} wrap="wrap">
                  {/* Info */}
                  <Box flex={1} style={{ minWidth: 200 }}>
                    <Text weight="semibold">{getTitle(page.title)}</Text>
                    <Text size={1} muted>/{page.slug?.current || ''}</Text>
                  </Box>

                  {/* Badge */}
                  <Badge tone={page.isPublished !== false ? 'positive' : 'caution'}>
                    {page.isPublished !== false ? 'Online' : 'Bozza'}
                  </Badge>

                  <Badge mode="outline">
                    {page.sectionCount || 0} sez.
                  </Badge>

                  <Text size={1} muted style={{ minWidth: 80 }}>
                    {formatDate(page._updatedAt)}
                  </Text>

                  {/* Azioni */}
                  <Flex gap={1}>
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
                    <Button
                      icon={TrashIcon}
                      mode="ghost"
                      tone="critical"
                      title="Elimina"
                      onClick={() => handleDelete(page)}
                    />
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  )
}

export default PageDashboard
