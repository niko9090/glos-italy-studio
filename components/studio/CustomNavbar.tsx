// Custom Navbar con Versione Sito e Changelog
import { NavbarProps } from 'sanity'
import { useState } from 'react'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '2.0.0'

// ============================================
// CHANGELOG - Note di rilascio per ogni versione
// (Solo versioni funzionanti - no versioni con errori di build)
// ============================================
const CHANGELOG: Record<string, string[]> = {
  '2.0.0': [
    '🐛 Fix SchemaError: rimossi campi duplicati negli schemi',
    '✅ statsSection: numberSize/numberWeight ora univoci',
    '✅ ctaSection: titleSize ora univoco',
    '🔧 Pulizia codice e stabilizzazione',
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
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {/* Navbar default */}
      <div style={{ flex: 1 }}>
        {props.renderDefault(props)}
      </div>

      {/* Badge versione con tooltip changelog completo */}
      <div
        style={{ position: 'relative', marginRight: '12px' }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          style={{
            backgroundColor: '#0047AB',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            fontFamily: 'system-ui, sans-serif',
            whiteSpace: 'nowrap',
            cursor: 'help',
          }}
        >
          v{SITE_VERSION}
        </div>

        {/* Tooltip Changelog Completo */}
        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'system-ui, sans-serif',
              minWidth: '320px',
              maxWidth: '400px',
              maxHeight: '70vh',
              overflowY: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              zIndex: 9999,
            }}
          >
            {/* Header */}
            <div
              style={{
                fontWeight: '700',
                fontSize: '14px',
                marginBottom: '12px',
                paddingBottom: '10px',
                borderBottom: '1px solid #333',
                color: '#0077FF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              📋 Storico Versioni
            </div>

            {/* Lista tutte le versioni */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {VERSION_ORDER.map((version) => (
                <div key={version}>
                  {/* Titolo versione */}
                  <div
                    style={{
                      fontWeight: '600',
                      fontSize: '12px',
                      marginBottom: '6px',
                      color: version === SITE_VERSION ? '#00cc66' : '#888',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {version === SITE_VERSION && (
                      <span style={{
                        backgroundColor: '#00cc66',
                        color: '#000',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: '700',
                      }}>
                        ATTUALE
                      </span>
                    )}
                    v{version}
                  </div>

                  {/* Lista modifiche */}
                  <ul
                    style={{
                      margin: 0,
                      padding: '0 0 0 12px',
                      listStyle: 'none',
                    }}
                  >
                    {CHANGELOG[version].map((item, index) => (
                      <li
                        key={index}
                        style={{
                          padding: '2px 0',
                          fontSize: '11px',
                          lineHeight: '1.4',
                          color: version === SITE_VERSION ? '#e0e0e0' : '#888',
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Freccia tooltip */}
            <div
              style={{
                position: 'absolute',
                top: '-6px',
                right: '12px',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '6px solid #1a1a1a',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
