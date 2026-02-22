import { readFileSync } from 'fs'

const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'

// Mappatura varianti -> prodotto principale (per copiare l'immagine)
const VARIANT_MAPPING = {
  // Easy variants - usano immagine Easy 1200
  'prod-easy-1000-30': 'prod-easy-1000-20',
  'prod-easy-1200-30': 'prod-easy-1200-20',
  'prod-easy-700-30': 'prod-easy-700-20',
  // Twin variant
  'prod-twin-120-30': 'prod-twin-120-20',
  // Termolight variant
  'prod-termolight-senza': 'prod-termolight-con',
  // Minicut variant
  'prod-minicut-senza-trasf': 'prod-minicut-con-trasf',
  // Basic Easy - usano Easy
  'prod-basic-easy-1000': 'prod-easy-1000-20',
  'prod-basic-easy-1000-cc': 'prod-easy-1000-20',
  'prod-basic-easy-1200': 'prod-easy-1200-20',
  'prod-basic-easy-1200-cc': 'prod-easy-1200-20',
  'prod-basic-easy-700': 'prod-easy-700-20',
  // Basic Twin - usano Twin
  'prod-basic-twin-1000-s': 'prod-twin-120-20',
  'prod-basic-twin-1000-scc': 'prod-twin-120-20',
  'prod-basic-twin-1200-s': 'prod-twin-120-20',
  'prod-basic-twin-1200-scc': 'prod-twin-120-20',
}

async function getProductMainImage(productId) {
  const query = encodeURIComponent(`*[_id=="${productId}"][0]{mainImage}`)
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    }
  )
  const data = await response.json()
  return data.result?.mainImage
}

async function setProductImage(productId, mainImage) {
  const response = await fetch(
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
            id: productId,
            set: { mainImage }
          }
        }]
      })
    }
  )
  return response.ok
}

async function main() {
  console.log('=== Associazione Immagini Varianti ===\n')

  // Cache delle immagini dei prodotti principali
  const imageCache = {}

  for (const [variantId, mainProductId] of Object.entries(VARIANT_MAPPING)) {
    console.log(`${variantId} <- ${mainProductId}`)

    // Ottieni immagine del prodotto principale (con cache)
    if (!imageCache[mainProductId]) {
      imageCache[mainProductId] = await getProductMainImage(mainProductId)
    }

    const mainImage = imageCache[mainProductId]

    if (mainImage) {
      const success = await setProductImage(variantId, mainImage)
      console.log(`  ${success ? '✓' : '✗'}`)
    } else {
      console.log(`  - Nessuna immagine disponibile`)
    }
  }

  console.log('\n=== Completato ===')
}

main()
