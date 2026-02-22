import { readFileSync } from 'fs'
import { basename } from 'path'

const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'

// Mappatura prodotti -> immagini
const productImages = {
  'prod-blender-bg2': 'Z:/sito/glos/products/blender_glos_combinazione.png',
  'prod-twin-120-20': 'Z:/sito/glos/products/policut_twin_20_30.png',
  'prod-easy-1200-20': 'Z:/sito/glos/products/policut_easy_basic_1200_30.png',
  'prod-easy-1000-20': 'Z:/sito/glos/products/policut_easy_1000_20_30.png',
  'prod-easy-700-20': 'Z:/sito/glos/products/policut_easy_light_1200.png',
  'prod-termolight-con': 'Z:/sito/glos/products/termolight.png',
  'prod-wash-station': 'Z:/sito/glos/products/wash_station.png',
  'prod-fiber-cut': 'Z:/sito/glos/products/cutter/glos_taglierine_cutters_policut.jpg',
  'prod-minicut-con-trasf': 'Z:/sito/glos/products/cutter/glos_policut_twin_basic_1000.jpg',
  'prod-hot-knife': 'Z:/sito/glos/products/cutter/glos_policut_twin_basic_1200.jpg'
}

async function uploadImage(imagePath) {
  const filename = basename(imagePath)
  const imageBuffer = readFileSync(imagePath)
  const contentType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg'

  console.log(`  Uploading ${filename} (${(imageBuffer.length / 1024).toFixed(0)} KB)...`)

  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': contentType
      },
      body: imageBuffer
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Upload failed')
  }

  return data.document._id
}

async function setProductImage(productId, assetId) {
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
            set: {
              mainImage: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: assetId
                }
              }
            }
          }
        }]
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Patch failed')
  }

  return true
}

async function processProduct(productId, imagePath) {
  console.log(`\n=== ${productId} ===`)

  try {
    // Upload immagine
    const assetId = await uploadImage(imagePath)
    console.log(`  Asset: ${assetId}`)

    // Associa al prodotto
    await setProductImage(productId, assetId)
    console.log(`  OK`)

    return true
  } catch (error) {
    console.log(`  ERRORE: ${error.message}`)
    return false
  }
}

async function main() {
  console.log('=== Caricamento Immagini Prodotti GLOS ===')

  let success = 0
  let failed = 0

  for (const [productId, imagePath] of Object.entries(productImages)) {
    const result = await processProduct(productId, imagePath)
    if (result) success++
    else failed++
  }

  console.log('\n=== Riepilogo ===')
  console.log(`Successi: ${success}`)
  console.log(`Falliti: ${failed}`)
}

main()
