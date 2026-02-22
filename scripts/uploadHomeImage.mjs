import { readFileSync } from 'fs'

const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'

async function main() {
  // Prima cerchiamo la homepage per trovare la sezione con "INNOVAZIONE"
  const query = encodeURIComponent('*[_type=="page" && slug.current=="home"][0]{_id, sections}')
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    { headers: { 'Authorization': `Bearer ${TOKEN}` } }
  )
  const data = await response.json()
  console.log('Homepage trovata:', data.result?._id)

  if (data.result?.sections) {
    console.log('\nSezioni trovate:', data.result.sections.length)
    data.result.sections.forEach((s, i) => {
      const title = s.title?.it || s.title || 'N/A'
      console.log(`  ${i}: [${s._type}] ${typeof title === 'string' ? title.substring(0, 50) : JSON.stringify(title).substring(0, 50)}`)
    })
  }

  // Upload immagine
  console.log('\nCarico immagine engineering-innovation.jpg...')
  const imageBuffer = readFileSync('Z:/GLOS-SANITY-PROJECT/frontend/public/images/engineering-innovation.jpg')

  const uploadResponse = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${DATASET}?filename=engineering-innovation.jpg`,
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
  console.log('Asset ID:', uploadData.document?._id)

  return uploadData.document?._id
}

main().catch(console.error)
