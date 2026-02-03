// Custom Navbar con Versione Sito e Changelog
import { NavbarProps } from 'sanity'
import { useState } from 'react'

// ============================================
// VERSIONE SITO
// ============================================
const SITE_VERSION = '2.0.3'

// ============================================
// CHANGELOG - Solo versioni funzionanti
// ============================================
const CHANGELOG: Record<string, string[]> = {
  '2.0.3': [
    '🔧 Fix layout altezza - rimosso flex problematico',
    '✅ CustomNavbar semplificato',
  ],
  '2.0.0': [
    '🐛 Fix SchemaError: rimossi campi duplicati',
    '✅ statsSection e ctaSection corretti',
  ],
  '1.8.0': [
    '✨ Editor Rich Text in tutti i campi testo',
    '📝 72 campi convertiti in localeRichText',
  ],
  '1.7.0': [
    '🔤 Tipografia personalizzabile',
  ],
  '1.6.0': [
    '📄 Dashboard Pagine v3',
  ],
  '1.5.0': [
    '📐 Spaziatura granulare sezioni',
  ],
}

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
    <>
      {props.renderDefault(props)}

      {/* Badge versione - posizionato absolute per non interferire con layout */}
      <div
        style={{
          position: 'fixed',
          top: '12px',
          right: '12px',
          zIndex: 9999,
        }}
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
            cursor: 'help',
          }}
        >
          v{SITE_VERSION}
        </div>

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
              minWidth: '280px',
              maxHeight: '400px',
              overflowY: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ fontWeight: '700', marginBottom: '12px', color: '#0077FF' }}>
              📋 Storico Versioni
            </div>
            {VERSION_ORDER.map((version) => (
              <div key={version} style={{ marginBottom: '12px' }}>
                <div style={{
                  fontWeight: '600',
                  fontSize: '11px',
                  color: version === SITE_VERSION ? '#00cc66' : '#888',
                }}>
                  {version === SITE_VERSION && '● '}v{version}
                </div>
                <ul style={{ margin: '4px 0 0 12px', padding: 0, listStyle: 'none' }}>
                  {CHANGELOG[version].map((item, i) => (
                    <li key={i} style={{ fontSize: '10px', color: '#aaa', padding: '2px 0' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
