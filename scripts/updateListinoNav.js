// Script per aggiungere "Listino Prezzi" alla navigazione
// Esegui con: node scripts/updateListinoNav.js

const projectId = '97oreljh';
const dataset = 'production';
const apiVersion = '2024-01-01';
const token = 'skSRLZrhXNGeVTZelxihjut0SUUTYqwDtRkH04A2xOOT93oH5odgsQOqe70xlFvp9UXsncnDhIeGy15OwBWkKcYcb534rFlu78WEogLgtNSfDHtBeuGYibk909UYDyShTfrAuThGg4guo8pI4xaeY0kxgsHDFZdlagKLVxDoc4Hq4EOcusel';

async function run() {
  const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data`;

  // 1. Fetch current navigation to check existing items
  const navUrl = `${baseUrl}/query/${dataset}?query=${encodeURIComponent('*[_type == "navigation" && _id == "mainNavigation"][0]{ items }')}`;
  const navRes = await fetch(navUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const navData = await navRes.json();
  const currentItems = navData.result?.items || [];

  console.log('Menu attuale:', currentItems.map(i => i.label?.it || i.label).join(', '));

  // Check if Listino Prezzi already exists
  const hasListino = currentItems.some(item => {
    const label = typeof item.label === 'string' ? item.label : item.label?.it || '';
    return label.toLowerCase().includes('listino');
  });

  if (hasListino) {
    console.log('Listino Prezzi gia presente nel menu. Skip.');
  } else {
    // Add Listino Prezzi after Prodotti
    const newItem = {
      _key: 'nav-listino',
      _type: 'object',
      label: { it: 'Listino Prezzi', en: 'Price List', es: 'Lista de Precios' },
      href: '/listino-prezzi',
      isActive: true,
    };

    // Insert after "Prodotti" (index 1, typically) or at end
    const prodottiIdx = currentItems.findIndex(item => {
      const href = item.href || '';
      return href.includes('prodotti');
    });

    const insertIdx = prodottiIdx >= 0 ? prodottiIdx + 1 : currentItems.length;
    const updatedItems = [
      ...currentItems.slice(0, insertIdx),
      newItem,
      ...currentItems.slice(insertIdx),
    ];

    const navMutation = {
      mutations: [{
        patch: {
          id: 'mainNavigation',
          set: { items: updatedItems },
        },
      }],
    };

    const mutRes = await fetch(`${baseUrl}/mutate/${dataset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(navMutation),
    });

    const mutResult = await mutRes.json();
    if (mutRes.ok) {
      console.log('Listino Prezzi aggiunto al menu dopo Prodotti');
    } else {
      console.error('Errore navigazione:', JSON.stringify(mutResult, null, 2));
    }
  }

  console.log('\nDone! La pagina /listino-prezzi e creata come pagina Next.js dedicata.');
  console.log('Non serve un documento Sanity: i dati vengono dal catalogo PDF.');
}

run();
