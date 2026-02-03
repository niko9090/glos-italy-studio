// Custom Navbar con Versione Sito e Changelog
import { NavbarProps } from 'sanity'
import { useState } from 'react'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.9.8'

// ============================================
// CHANGELOG - Note di rilascio per ogni versione
// ============================================
const CHANGELOG: Record<string, string[]> = {
  '1.9.8': [
    '🐛 Fix SchemaError: rimossi campi duplicati',
    '✅ statsSection: rimossi numberSize/numberWeight duplicati',
    '✅ ctaSection: rimosso titleSize duplicato',
    '🔧 Ogni campo ora definito una sola volta',
  ],
  '1.9.5': [
    '🐛 Fix SchemaError: ordine schemi corretto',
    '✅ richText ora viene PRIMA di localeRichText',
    '🔧 Risolto problema dipendenza tipo',
  ],
  '1.9.4': [
    '🐛 Fix SchemaError: localeRichText usa tipo richText',
    '✅ Riferimento al tipo richText esistente',
    '🔧 Semplificazione massima',
  ],
  '1.9.3': [
    '🐛 Fix SchemaError: defineField esplicito',
    '✅ Rimosso .map() dinamico per campi lingua',
    '🔧 Versione ultra-minimale per debug',
  ],
  '1.9.2': [
    '🐛 Fix SchemaError: versione semplificata localeRichText',
    '✅ Rimossi componenti custom problematici',
    '🔧 Rich text base: grassetto, corsivo, colori, link, dimensioni',
  ],
  '1.9.1': [
    '🐛 Fix SchemaError: rimosso styledBlock nidificato',
    '✅ Semplificato localeRichText per compatibilità Sanity',
    '🔧 Risolto problema defineArrayMember nidificato',
  ],
  '1.9.0': [
    '🐛 Fix SchemaError per localeRichText',
    '✅ Preview corrette in tutte le sezioni',
    '🔧 getPlainText() per estrarre testo da Portable Text',
    '📋 25 file sezioni aggiornati',
  ],
  '1.8.0': [
    '✨ Editor Rich Text in TUTTI i campi testo',
    '🎨 Formattazione inline: grassetto, colori, dimensioni',
    '🌈 Gradienti, evidenziazioni, animazioni testo',
    '📝 72 campi localeString convertiti in localeRichText',
  ],
  '1.7.0': [
    '🔤 Tipografia personalizzabile in TUTTE le sezioni',
    '📏 Dimensione, peso e colore titoli configurabili',
    '✏️ Controllo testi: sottotitoli, descrizioni, etichette',
    '🎯 Campi specifici per ogni sezione (prezzi, numeri, citazioni)',
  ],
  '1.6.0': [
    '📄 Dashboard Pagine v3: vista unificata',
    '🔗 No piu duplicati (draft+published in una riga)',
    '🏷️ Badge stato: Pubblicata, Solo Bozza, Modifiche Pendenti',
    '⚡ Pulsanti pubblica/scarta modifiche',
    '🚨 Rilevamento URL duplicati',
  ],
  '1.5.0': [
    '📐 Spaziatura granulare sezioni (padding/margini)',
    '📏 Larghezza contenitore personalizzabile',
    '🎨 Opzioni layout migliorate per Contatti',
    '🔧 Fix visualizzazione campi vuoti',
  ],
  '1.4.0': [
    '🗺️ Geocoding automatico rivenditori (no lat/lng richieste)',
    '🎯 Icone con menu a tendina in tutti gli schemi',
    '🔧 Fix layout sezioni (stega encoding)',
    '📋 Nuova lista icone condivisa (100+ emoji)',
  ],
  '1.3.0': [
    '🎬 Supporto video background in Hero',
    '🎨 Nuovi gradienti e colori solidi',
    '🏪 Dashboard Rivenditori migliorata',
  ],
  '1.2.0': [
    '📄 Dashboard Pagine con filtri',
    '🔄 Azioni bulk per pagine',
    '✨ Editor sezioni migliorato',
  ],
  '1.1.0': [
    '🌍 Supporto multilingua (IT/EN)',
    '📱 Componenti responsive',
    '🖼️ Gestione media avanzata',
  ],
  '1.0.0': [
    '🚀 Release iniziale',
    '📝 Sistema pagine modulare',
    '🏷️ Catalogo prodotti',
  ],
}

// Ordine versioni (dalla più recente alla più vecchia)
const VERSION_ORDER = Object.keys(CHANGELOG).sort((a, b) => {
  const [aMajor, aMinor, aPatch] = a.split('.').map(Number)
  const [bMajor, bMinor, bPatch] = b.split('.').map(Number)
  if (bMajor !== aMajor) return bMajor - aMajor
  if (bMinor !== aMinor) return bMinor - aMinor
  return bPatch - aPatch
})

export function CustomNavbar(props: NavbarProps) {
  // Ritorna semplicemente la navbar default senza modifiche
  // per testare se il problema di layout è causato dal wrapper custom
  return props.renderDefault(props)
}
