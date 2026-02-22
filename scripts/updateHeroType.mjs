const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'

async function main() {
  // Trova la homepage
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

  console.log('Hero section attuale:', JSON.stringify(sections[heroIndex], null, 2).slice(0, 500))
  console.log('\nBackgroundType attuale:', sections[heroIndex].backgroundType)
  console.log('BackgroundImage:', sections[heroIndex].backgroundImage ? 'presente' : 'non presente')

  // Aggiorna backgroundType a 'image'
  const updatedSections = [...sections]
  updatedSections[heroIndex] = {
    ...sections[heroIndex],
    backgroundType: 'image'
  }

  // Patch
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
  console.log('\nRisultato patch:', patchData.results?.[0]?.operation || 'error')
  console.log('backgroundType impostato su "image"!')
}

main().catch(console.error)
