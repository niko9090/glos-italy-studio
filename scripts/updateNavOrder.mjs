const PROJECT_ID = '97oreljh'
const DATASET = 'production'
const TOKEN = 'skA1PF9CiGcxPjkXxpxCzCoxUErZKlzi4x8ajNyRqQMlHw9jhdusMoOORZZt4onZlUaVgBHKNKG2hxwe7OxeFcugABIPQDhgkU8pMoxTOcuOx8ePAclCdJuXxloTw1csZ0yrEWODDX9KwWjuYN6lFWPKTdIKtaS45a4sLk54QZySu1eewqEz'

async function main() {
  // Trova la navigazione principale
  const query = encodeURIComponent('*[_type=="navigation"][0]{_id, items}')
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    { headers: { 'Authorization': `Bearer ${TOKEN}` } }
  )
  const data = await response.json()
  const nav = data.result

  if (!nav) {
    console.log('Navigazione non trovata')
    return
  }

  console.log('Navigation ID:', nav._id)
  console.log('Items attuali:', nav.items?.map(i => i.label?.it || i.label).join(', '))

  // Nuovo ordine: Home, Chi Siamo, Prodotti, Listino Prezzi, Rivenditori, Contatti
  const newItems = [
    { _key: 'home', label: { _type: 'localeString', it: 'Home', en: 'Home', es: 'Inicio' }, href: '/' },
    { _key: 'chi-siamo', label: { _type: 'localeString', it: 'Chi Siamo', en: 'About Us', es: 'Sobre Nosotros' }, href: '/chi-siamo' },
    { _key: 'prodotti', label: { _type: 'localeString', it: 'Prodotti', en: 'Products', es: 'Productos' }, href: '/prodotti' },
    { _key: 'listino', label: { _type: 'localeString', it: 'Listino Prezzi', en: 'Price List', es: 'Lista de Precios' }, href: '/listino-prezzi' },
    { _key: 'rivenditori', label: { _type: 'localeString', it: 'Rivenditori', en: 'Dealers', es: 'Distribuidores' }, href: '/rivenditori' },
    { _key: 'contatti', label: { _type: 'localeString', it: 'Contatti', en: 'Contact', es: 'Contacto' }, href: '/contatti' },
  ]

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
            id: nav._id,
            set: {
              items: newItems
            }
          }
        }]
      })
    }
  )

  const patchData = await patchResponse.json()
  console.log('\nRisultato patch:', patchData.results?.[0]?.operation || 'error')
  console.log('Nuovo ordine menu: Home, Chi Siamo, Prodotti, Listino Prezzi, Rivenditori, Contatti')
}

main().catch(console.error)
