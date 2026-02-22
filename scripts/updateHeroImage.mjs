import { readFileSync } from 'fs'

const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'

async function main() {
  // 1. Upload nuova immagine
  console.log('Caricamento nuova immagine hero-marble-gold.jpg...')
  const imageBuffer = readFileSync('Z:/GLOS-SANITY-PROJECT/frontend/public/images/hero-marble-gold.jpg')

  const uploadResponse = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${DATASET}?filename=hero-marble-gold.jpg`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'image/jpeg'
      },
      body: imageBuffer
    }
  )

  const uploadData = await uploadResponse.json()
  const assetId = uploadData.document?._id
  console.log('Nuovo Asset ID:', assetId)

  if (!assetId) {
    console.error('Errore upload:', uploadData)
    return
  }

  // 2. Trova la homepage
  const query = encodeURIComponent('*[_type=="page" && slug.current=="home"][0]{_id, sections}')
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    { headers: { 'Authorization': `Bearer ${TOKEN}` } }
  )
  const data = await response.json()
  const page = data.result

  if (!page) {
    console.log('Homepage non trovata')
    return
  }

  console.log('Homepage ID:', page._id)

  const sections = page.sections || []
  const heroIndex = sections.findIndex(s => s._type === 'heroSection')

  if (heroIndex === -1) {
    console.log('Hero section non trovata')
    return
  }

  // 3. Aggiorna con la nuova immagine
  const updatedSections = [...sections]
  updatedSections[heroIndex] = {
    ...sections[heroIndex],
    backgroundType: 'image',
    backgroundImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId
      }
    }
  }

  // 4. Patch
  const patchResponse = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mutations: [{
          patch: {
            id: page._id,
            set: {
              sections: updatedSections
            }
          }
        }]
      })
    }
  )

  const patchData = await patchResponse.json()
  console.log('Risultato:', patchData.results?.[0]?.operation || 'error')
  console.log('Nuova immagine hero impostata!')
}

main().catch(console.error)
