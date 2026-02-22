import { readFileSync } from 'fs'

const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'

async function main() {
  // 1. Upload immagine
  console.log('Caricamento immagine hero-fluid-art.jpg...')
  const imageBuffer = readFileSync('Z:/GLOS-SANITY-PROJECT/frontend/public/images/hero-fluid-art.jpg')

  const uploadResponse = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${DATASET}?filename=hero-fluid-art.jpg`,
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
  console.log('Asset ID:', assetId)

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
  console.log('Sezioni trovate:', page.sections?.length || 0)

  // Trova la sezione hero (prima sezione)
  const sections = page.sections || []
  const heroIndex = sections.findIndex(s => s._type === 'heroSection')

  if (heroIndex === -1) {
    console.log('Hero section non trovata')
    return
  }

  console.log('Hero section trovata all\'indice:', heroIndex)

  // 3. Aggiorna la hero section con l'immagine di sfondo
  const updatedSections = [...sections]
  updatedSections[heroIndex] = {
    ...sections[heroIndex],
    backgroundImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId
      }
    }
  }

  // 4. Patch della homepage
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
  console.log('Risultato patch:', patchData.results?.[0]?.operation || 'error')

  if (patchData.results?.[0]?.operation) {
    console.log('Immagine di sfondo hero impostata con successo!')
  } else {
    console.error('Errore:', patchData)
  }
}

main().catch(console.error)
