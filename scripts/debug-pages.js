const https = require('https');

const PROJECT_ID = '97oreljh';
const DATASET = 'production';

// Query che include TUTTI i documenti, anche drafts
const QUERY = `*[_type == "page"] | order(_updatedAt desc) {
  _id,
  _rev,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "sectionCount": count(sections),
  "sectionTypes": sections[]._type
}`;

const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.result;

    console.log('\n' + '='.repeat(60));
    console.log('DEBUG COMPLETO DATABASE PAGINE');
    console.log('='.repeat(60));
    console.log(`\nTotale documenti trovati: ${pages.length}\n`);

    // Raggruppa per slug
    const bySlug = {};
    pages.forEach(p => {
      const slug = p.slug || 'NO-SLUG';
      if (!bySlug[slug]) bySlug[slug] = [];
      bySlug[slug].push(p);
    });

    Object.entries(bySlug).forEach(([slug, docs]) => {
      console.log(`\n${'─'.repeat(50)}`);
      console.log(`URL: /${slug}`);
      console.log(`Documenti con questo URL: ${docs.length}`);

      if (docs.length > 1) {
        console.log('⚠️  ATTENZIONE: URL USATO DA PIU DOCUMENTI!');
      }

      docs.forEach((doc, i) => {
        const title = typeof doc.title === 'string'
          ? doc.title
          : (doc.title?.it || doc.title?.en || 'Senza titolo');

        const isDraft = doc._id.startsWith('drafts.');
        const baseId = doc._id.replace('drafts.', '');

        console.log(`\n  [${i + 1}] ${title}`);
        console.log(`      ID completo: ${doc._id}`);
        console.log(`      ID base: ${baseId}`);
        console.log(`      Tipo: ${isDraft ? '📝 BOZZA (drafts.)' : '✅ PUBBLICATO'}`);
        console.log(`      Sezioni (${doc.sectionCount || 0}): ${doc.sectionTypes?.join(', ') || 'nessuna'}`);
        console.log(`      Creato: ${new Date(doc._createdAt).toLocaleString('it-IT')}`);
        console.log(`      Modificato: ${new Date(doc._updatedAt).toLocaleString('it-IT')}`);
        console.log(`      Revisione: ${doc._rev}`);
      });

      // Analisi specifica per questo slug
      if (docs.length > 1) {
        const drafts = docs.filter(d => d._id.startsWith('drafts.'));
        const published = docs.filter(d => !d._id.startsWith('drafts.'));

        // Controlla se draft e published sono della stessa pagina
        const draftBaseIds = drafts.map(d => d._id.replace('drafts.', ''));
        const publishedIds = published.map(p => p._id);

        const matchingPairs = draftBaseIds.filter(id => publishedIds.includes(id));
        const orphanDrafts = draftBaseIds.filter(id => !publishedIds.includes(id));
        const uniquePublished = publishedIds.filter(id => !draftBaseIds.includes(id));

        console.log('\n  📊 ANALISI:');

        if (matchingPairs.length > 0) {
          console.log(`     ✓ ${matchingPairs.length} pagina(e) con bozza+pubblicata (stesso documento, modifiche pendenti)`);
        }
        if (orphanDrafts.length > 0) {
          console.log(`     ⚠️ ${orphanDrafts.length} bozza(e) senza versione pubblicata`);
        }
        if (uniquePublished.length > 1) {
          console.log(`     🚨 ${uniquePublished.length} DOCUMENTI DIVERSI PUBBLICATI CON STESSO URL!`);
          console.log('        Questo e un ERRORE - devi eliminare i duplicati');
        }

        // Controlla se le sezioni sono diverse
        const sectionSets = docs.map(d => (d.sectionTypes || []).join(','));
        const uniqueSections = [...new Set(sectionSets)];
        if (uniqueSections.length > 1) {
          console.log('     📋 I documenti hanno SEZIONI DIVERSE:');
          docs.forEach((d, i) => {
            console.log(`        Doc ${i+1}: ${d.sectionTypes?.join(', ') || 'vuoto'}`);
          });
        }
      }
    });

    console.log('\n' + '='.repeat(60));
    console.log('RIEPILOGO');
    console.log('='.repeat(60));

    const allDrafts = pages.filter(p => p._id.startsWith('drafts.'));
    const allPublished = pages.filter(p => !p._id.startsWith('drafts.'));

    console.log(`\nDocumenti pubblicati: ${allPublished.length}`);
    console.log(`Bozze: ${allDrafts.length}`);

    // Trova URL con problemi reali (documenti DIVERSI con stesso URL)
    const problematicSlugs = Object.entries(bySlug).filter(([slug, docs]) => {
      const baseIds = [...new Set(docs.map(d => d._id.replace('drafts.', '')))];
      return baseIds.length > 1;
    });

    if (problematicSlugs.length > 0) {
      console.log('\n🚨 URL CON DOCUMENTI DUPLICATI (DA CORREGGERE):');
      problematicSlugs.forEach(([slug, docs]) => {
        const baseIds = [...new Set(docs.map(d => d._id.replace('drafts.', '')))];
        console.log(`   /${slug}: ${baseIds.length} documenti diversi`);
        baseIds.forEach(id => console.log(`      - ${id}`));
      });
    } else {
      console.log('\n✅ Nessun URL duplicato trovato');
    }

    console.log('\n');
  });
}).on('error', err => {
  console.error('Errore:', err.message);
});
