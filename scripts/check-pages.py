#!/usr/bin/env python3
import urllib.request
import urllib.parse
import json

# Sanity API query
PROJECT_ID = "h5v7p7s2"
DATASET = "production"
QUERY = '*[_type == "page"] | order(_updatedAt desc) { _id, title, "slug": slug.current, isPublished, "sectionCount": count(sections), "sectionTypes": sections[]._type }'

url = f"https://{PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/{DATASET}?query={urllib.parse.quote(QUERY)}"

with urllib.request.urlopen(url) as response:
    data = json.loads(response.read().decode())

pages = data.get('result', [])
print(f'=== TUTTE LE PAGINE ({len(pages)} documenti) ===\n')

drafts = []
published = []

for i, p in enumerate(pages):
    title = p.get('title', {})
    if isinstance(title, dict):
        title = title.get('it') or title.get('en') or 'Senza titolo'
    elif not title:
        title = 'Senza titolo'

    is_draft = p['_id'].startswith('drafts.')
    if is_draft:
        drafts.append(p)
    else:
        published.append(p)

    tipo = '📝 BOZZA' if is_draft else '✅ PUBBLICATA'
    sections = p.get('sectionTypes') or []
    print(f"{i+1}. {title}")
    print(f"   ID: {p['_id']}")
    print(f"   Slug: /{p.get('slug', '')}")
    print(f"   Tipo: {tipo}")
    print(f"   Sezioni ({p.get('sectionCount', 0)}): {', '.join(sections) if sections else 'nessuna'}")
    print()

print(f'\n=== ANALISI ===')
print(f'Pagine pubblicate: {len(published)}')
print(f'Bozze: {len(drafts)}')

# Check for drafts with published counterpart
draft_base_ids = [d['_id'].replace('drafts.', '') for d in drafts]
pub_ids = [p['_id'] for p in published]

with_both = [d for d in draft_base_ids if d in pub_ids]
only_draft = [d for d in draft_base_ids if d not in pub_ids]

if with_both:
    print(f'\n🔄 PAGINE CON MODIFICHE NON SALVATE (hai modificato ma non pubblicato):')
    for base_id in with_both:
        pub = next((p for p in published if p['_id'] == base_id), None)
        draft = next((d for d in drafts if d['_id'] == f'drafts.{base_id}'), None)
        if pub and draft:
            title = pub.get('title', {})
            if isinstance(title, dict):
                title = title.get('it') or 'Senza titolo'
            pub_sec = pub.get('sectionCount', 0)
            draft_sec = draft.get('sectionCount', 0)
            print(f"  - {title} (/{pub.get('slug', '')})")
            print(f"    Pubblicata: {pub_sec} sezioni | Bozza: {draft_sec} sezioni")
            if pub_sec != draft_sec:
                print(f"    ⚠️ DIFFERENZA SEZIONI!")

if only_draft:
    print(f'\n📝 BOZZE MAI PUBBLICATE (esistono solo come bozza):')
    for base_id in only_draft:
        draft = next((d for d in drafts if d['_id'] == f'drafts.{base_id}'), None)
        if draft:
            title = draft.get('title', {})
            if isinstance(title, dict):
                title = title.get('it') or 'Senza titolo'
            print(f"  - {title} (/{draft.get('slug', '')}) - {draft.get('sectionCount', 0)} sezioni")

# Check for duplicate slugs (different pages with same URL)
slug_map = {}
for p in pages:
    slug = p.get('slug') or 'no-slug'
    base_id = p['_id'].replace('drafts.', '')
    if slug not in slug_map:
        slug_map[slug] = set()
    slug_map[slug].add(base_id)

real_dupes = {s: ids for s, ids in slug_map.items() if len(ids) > 1}
if real_dupes:
    print(f'\n⚠️ ERRORE CRITICO: SLUG DUPLICATI (pagine diverse con stesso URL):')
    for slug, ids in real_dupes.items():
        print(f"  /{slug}: {len(ids)} pagine diverse usano questo URL!")
        for base_id in ids:
            page = next((p for p in pages if p['_id'].replace('drafts.', '') == base_id), None)
            if page:
                title = page.get('title', {})
                if isinstance(title, dict):
                    title = title.get('it') or 'Senza titolo'
                print(f"    - {title} ({page['_id']})")
else:
    print(f'\n✅ Nessun conflitto di URL trovato')

print("\n" + "="*50)
print("SPIEGAZIONE:")
print("- Quando modifichi una pagina, Sanity crea una BOZZA")
print("- La bozza ha ID 'drafts.XXX', la pubblicata ha ID 'XXX'")
print("- Nella Dashboard vedi ENTRAMBE se non hai pubblicato")
print("- Per risolvere: pubblica le modifiche o scarta la bozza")
print("="*50)
