import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'h5v7p7s2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const pages = await client.fetch(`*[_type == "page"] | order(_updatedAt desc) {
  _id,
  title,
  "slug": slug.current,
  isPublished,
  _createdAt,
  _updatedAt,
  "sectionCount": count(sections),
  "sectionTypes": sections[]._type
}`)

console.log("=== TUTTE LE PAGINE ===\n")
console.log(`Totale documenti trovati: ${pages.length}\n`)

pages.forEach((p, i) => {
  const title = typeof p.title === 'string' ? p.title : (p.title?.it || p.title?.en || 'Senza titolo')
  const isDraft = p._id.startsWith('drafts.')
  console.log(`${i+1}. ${title}`)
  console.log(`   ID: ${p._id}`)
  console.log(`   Slug: /${p.slug || ''}`)
  console.log(`   Tipo: ${isDraft ? '📝 BOZZA' : '✅ PUBBLICATA'}`)
  console.log(`   Sezioni (${p.sectionCount}): ${p.sectionTypes?.join(', ') || 'nessuna'}`)
  console.log(`   Ultimo aggiornamento: ${new Date(p._updatedAt).toLocaleString('it-IT')}`)
  console.log('')
})

// Trova duplicati per slug
const slugCount = {}
pages.forEach(p => {
  const slug = p.slug || 'no-slug'
  if (!slugCount[slug]) slugCount[slug] = []
  slugCount[slug].push({ id: p._id, title: typeof p.title === 'string' ? p.title : (p.title?.it || 'Senza titolo') })
})

// Controlla drafts vs published
const draftPages = pages.filter(p => p._id.startsWith('drafts.'))
const publishedPages = pages.filter(p => !p._id.startsWith('drafts.'))

console.log("\n=== ANALISI ===\n")
console.log(`Pagine pubblicate: ${publishedPages.length}`)
console.log(`Bozze: ${draftPages.length}`)

// Trova bozze che hanno anche versione pubblicata
const draftIds = draftPages.map(p => p._id.replace('drafts.', ''))
const publishedIds = publishedPages.map(p => p._id)

const draftsWithPublished = draftIds.filter(id => publishedIds.includes(id))
const draftsWithoutPublished = draftIds.filter(id => !publishedIds.includes(id))

if (draftsWithPublished.length > 0) {
  console.log(`\n🔄 PAGINE CON MODIFICHE NON SALVATE (bozza + pubblicata):`)
  draftsWithPublished.forEach(id => {
    const pub = publishedPages.find(p => p._id === id)
    const draft = draftPages.find(p => p._id === `drafts.${id}`)
    const title = typeof pub.title === 'string' ? pub.title : (pub.title?.it || 'Senza titolo')
    console.log(`  - "${title}" (/${pub.slug})`)
    console.log(`    Versione pubblicata: ${pub.sectionCount} sezioni`)
    console.log(`    Versione bozza: ${draft.sectionCount} sezioni`)
    if (pub.sectionCount !== draft.sectionCount) {
      console.log(`    ⚠️ DIFFERENZA SEZIONI!`)
    }
  })
}

if (draftsWithoutPublished.length > 0) {
  console.log(`\n📝 BOZZE MAI PUBBLICATE:`)
  draftsWithoutPublished.forEach(id => {
    const draft = draftPages.find(p => p._id === `drafts.${id}`)
    const title = typeof draft.title === 'string' ? draft.title : (draft.title?.it || 'Senza titolo')
    console.log(`  - "${title}" (/${draft.slug}) - ${draft.sectionCount} sezioni`)
  })
}

// Cerca slug duplicati tra pagine diverse
const realDuplicates = Object.entries(slugCount).filter(([slug, items]) => {
  // Filtra i casi dove sono solo draft+published della stessa pagina
  const uniqueBaseIds = [...new Set(items.map(item => item.id.replace('drafts.', '')))]
  return uniqueBaseIds.length > 1
})

if (realDuplicates.length > 0) {
  console.log(`\n⚠️ ERRORE: SLUG DUPLICATI (pagine diverse con stesso URL):`)
  realDuplicates.forEach(([slug, items]) => {
    console.log(`  /${slug}:`)
    items.forEach(item => console.log(`    - ${item.title} (${item.id})`))
  })
} else {
  console.log(`\n✅ Nessun slug duplicato trovato`)
}
