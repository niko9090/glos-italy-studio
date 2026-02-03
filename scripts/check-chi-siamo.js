// Script per verificare lo stato della pagina Chi Siamo
const https = require('https');

const PROJECT_ID = '97oreljh';
const DATASET = 'production';

// Query GROQ per vedere i dati della pagina chi-siamo
const QUERY = `*[_type == "page" && slug.current == "chi-siamo"][0] {
  _id,
  _type,
  "slug": slug.current,
  title,
  "sectionCount": count(sections),
  sections[] {
    _key,
    _type,
    backgroundColor,
    paddingTop,
    paddingBottom,
    paddingY
  }
}`;

const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const page = json.result;

    if (!page) {
      console.log('❌ Pagina "chi-siamo" non trovata!');
      return;
    }

    console.log('\n='.repeat(60));
    console.log('PAGINA "CHI SIAMO" - STATO ATTUALE');
    console.log('='.repeat(60));

    console.log(`\nID: ${page._id}`);
    console.log(`Slug: ${page.slug}`);
    console.log(`Tipo: ${page._type}`);
    console.log(`Numero sezioni: ${page.sectionCount || 0}`);

    if (page.sections && page.sections.length > 0) {
      console.log('\n--- SEZIONI ---');
      page.sections.forEach((section, i) => {
        console.log(`\n[${i + 1}] ${section._type}`);
        console.log(`    Key: ${section._key}`);
        console.log(`    Background: ${section.backgroundColor || 'non impostato'}`);
        console.log(`    PaddingTop: ${section.paddingTop || 'non impostato'}`);
        console.log(`    PaddingBottom: ${section.paddingBottom || 'non impostato'}`);
        if (section.paddingY) {
          console.log(`    PaddingY (legacy): ${section.paddingY}`);
        }
      });
    } else {
      console.log('\n⚠️  Nessuna sezione trovata!');
    }

    console.log('\n');
  });
}).on('error', err => {
  console.error('Errore:', err.message);
});
