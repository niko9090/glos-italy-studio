const https = require('https');

const PROJECT_ID = '97oreljh';
const DATASET = 'production';
const QUERY = '*[_type == "page"] | order(_updatedAt desc) { _id, title, "slug": slug.current, isPublished, _updatedAt, "sectionCount": count(sections), "sectionTypes": sections[]._type }';

const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.result;

    console.log('\n=== ANALISI PAGINE SANITY ===\n');
    console.log('Totale documenti trovati:', pages.length);
    console.log('');

    // Separa drafts e pubblicati
    const drafts = pages.filter(p => p._id.startsWith('drafts.'));
    const published = pages.filter(p => !p._id.startsWith('drafts.'));

    console.log('📄 PAGINE PUBBLICATE:', published.length);
    published.forEach((p, i) => {
      const title = typeof p.title === 'string' ? p.title : (p.title?.it || p.title?.en || 'Senza titolo');
      const sections = p.sectionTypes || [];
      console.log(`  ${i+1}. ${title}`);
      console.log(`     ID: ${p._id}`);
      console.log(`     URL: /${p.slug || ''}`);
      console.log(`     Sezioni (${p.sectionCount || 0}): ${sections.length > 0 ? sections.join(', ') : 'nessuna'}`);
      console.log('');
    });

    if (drafts.length > 0) {
      console.log('📝 BOZZE:', drafts.length);
      drafts.forEach((p, i) => {
        const title = typeof p.title === 'string' ? p.title : (p.title?.it || p.title?.en || 'Senza titolo');
        const sections = p.sectionTypes || [];
        const baseId = p._id.replace('drafts.', '');
        const hasPublished = published.some(pub => pub._id === baseId);
        console.log(`  ${i+1}. ${title}`);
        console.log(`     ID: ${p._id}`);
        console.log(`     URL: /${p.slug || ''}`);
        console.log(`     Sezioni (${p.sectionCount || 0}): ${sections.length > 0 ? sections.join(', ') : 'nessuna'}`);
        console.log(`     Versione pubblicata: ${hasPublished ? '✅ SI' : '❌ NO'}`);
        console.log('');
      });
    }

    // Verifica slug duplicati
    const slugMap = {};
    pages.forEach(p => {
      const slug = p.slug || 'no-slug';
      const baseId = p._id.replace('drafts.', '');
      if (!slugMap[slug]) slugMap[slug] = new Set();
      slugMap[slug].add(baseId);
    });

    const duplicateSlugs = Object.entries(slugMap).filter(([, ids]) => ids.size > 1);
    if (duplicateSlugs.length > 0) {
      console.log('⚠️ ATTENZIONE: SLUG DUPLICATI (pagine diverse con stesso URL)');
      duplicateSlugs.forEach(([slug, ids]) => {
        console.log(`  /${slug} -> ${[...ids].length} pagine diverse usano questo URL!`);
      });
    } else {
      console.log('✅ Nessun conflitto di URL (slug duplicati)');
    }

    // Controlla pagine con bozze in attesa
    const draftBaseIds = drafts.map(d => d._id.replace('drafts.', ''));
    const publishedIds = published.map(p => p._id);
    const pagesWithPendingChanges = draftBaseIds.filter(id => publishedIds.includes(id));

    if (pagesWithPendingChanges.length > 0) {
      console.log('\n🔄 PAGINE CON MODIFICHE NON PUBBLICATE:');
      pagesWithPendingChanges.forEach(baseId => {
        const pub = published.find(p => p._id === baseId);
        const draft = drafts.find(d => d._id === `drafts.${baseId}`);
        const title = typeof pub.title === 'string' ? pub.title : (pub.title?.it || 'Senza titolo');
        console.log(`  - ${title} (/${pub.slug})`);
        console.log(`    Pubblicata: ${pub.sectionCount || 0} sezioni`);
        console.log(`    Bozza: ${draft.sectionCount || 0} sezioni`);
        if ((pub.sectionCount || 0) !== (draft.sectionCount || 0)) {
          console.log(`    ⚠️ NUMERO SEZIONI DIVERSO!`);
        }
      });
    }

    console.log('\n' + '='.repeat(55));
    console.log('SPIEGAZIONE:');
    console.log('- Quando modifichi una pagina, Sanity crea una BOZZA');
    console.log('- La bozza ha ID "drafts.XXX", la pubblicata ha ID "XXX"');
    console.log('- Nella Dashboard potresti vedere ENTRAMBE se non hai');
    console.log('  ancora pubblicato le modifiche');
    console.log('- Per unificarle: pubblica le modifiche o scarta la bozza');
    console.log('='.repeat(55));
  });
}).on('error', err => {
  console.error('Errore:', err.message);
});
