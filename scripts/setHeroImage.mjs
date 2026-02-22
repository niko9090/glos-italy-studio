const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'
const ASSET_ID = 'image-84d4bd21bf6c24791098baeeabb55949d7843c0f-1920x1281-jpg'

async function main() {
  // Get homepage with sections
  const query = encodeURIComponent('*[_type=="page" && slug.current=="home"][0]')
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

  // Trova la sezione hero (indice 0)
  const sections = page.sections || []
  const heroSection = sections[0]

  if (!heroSection || heroSection._type !== 'heroSection') {
    console.log('Hero section non trovata')
    return
  }

  console.log('Hero section key:', heroSection._key)

  // Aggiorna la sezione hero con l'immagine
  const updatedHero = {
    ...heroSection,
    backgroundImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: ASSET_ID
      }
    }
  }

  // Sostituisci la sezione nell'array
  sections[0] = updatedHero

  // Patch della homepage
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
              sections: sections
            }
          }
        }]
      })
    }
  )

  const patchData = await patchResponse.json()
  console.log('Patch result:', patchData.results?.[0]?.operation || 'error')
  console.log('Immagine associata alla hero section!')
}

main().catch(console.error)
