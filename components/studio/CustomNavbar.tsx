// Custom Navbar con Versione Sito e Changelog
import { NavbarProps } from 'sanity'
import { useState } from 'react'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.5.0'

// ============================================
// CHANGELOG - Note di rilascio per ogni versione
// ============================================
const CHANGELOG: Record<string, string[]> = {
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

export function CustomNavbar(props: NavbarProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const currentChangelog = CHANGELOG[SITE_VERSION] || []

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {/* Navbar default */}
      <div style={{ flex: 1 }}>
        {props.renderDefault(props)}
      </div>

      {/* Badge versione con tooltip changelog */}
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

        {/* Tooltip Changelog */}
        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'system-ui, sans-serif',
              minWidth: '280px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              zIndex: 9999,
            }}
          >
            {/* Header */}
            <div
              style={{
                fontWeight: '700',
                fontSize: '13px',
                marginBottom: '10px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                color: '#0077FF',
              }}
            >
              📋 Novità v{SITE_VERSION}
            </div>

            {/* Lista modifiche */}
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {currentChangelog.map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: '4px 0',
                    fontSize: '11px',
                    lineHeight: '1.4',
                    color: '#e0e0e0',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>

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
