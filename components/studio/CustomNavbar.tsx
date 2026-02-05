// Custom Navbar con Selettore Versione Interattivo
import { NavbarProps } from 'sanity'
import { useState, useCallback, useEffect, useRef } from 'react'

// ============================================
// VERSIONE ATTUALE
// ============================================
const SITE_VERSION = '3.0.0'

// ============================================
// LINK VERCEL E GITHUB
// ============================================
const VERCEL_FRONTEND_DASHBOARD = 'https://vercel.com/niko9090s-projects/glos-italy-website/deployments'
const VERCEL_STUDIO_DASHBOARD = 'https://vercel.com/niko9090s-projects/glos-italy-studio/deployments'
const GITHUB_FRONTEND = 'https://github.com/niko9090/glos-italy-website'
const GITHUB_STUDIO = 'https://github.com/niko9090/glos-italy-studio'

// ============================================
// VERSIONI DISPONIBILI
// ============================================
interface VersionInfo {
  changelog: string[]
  branch?: string      // Git branch associato
  tag?: string         // Git tag
  status: 'production' | 'available' | 'archived'
}

const VERSIONS: Record<string, VersionInfo> = {
  '3.0.0': {
    changelog: [
      'Page Builder con drag-and-drop sezioni (@dnd-kit)',
      '29 tipi di sezione con editor visuale personalizzato',
      'Dialog aggiunta sezioni raggruppate per categoria',
      'Modifica testo inline nella preview',
      'Pulsanti sposta/duplica/elimina sezione',
      'Upgrade sanity v3.80+',
      'Data attributes per click-to-edit',
    ],
    branch: 'main',
    tag: 'v3.0.0',
    status: 'production',
  },
  '2.1.2': {
    changelog: [
      'Geocoding migliorato con fallback multipli',
      'Avviso visivo per rivenditori non localizzati',
      'Debug logging per diagnosi problemi mappa',
    ],
    branch: 'v2-stable',
    tag: 'v2.1.2',
    status: 'available',
  },
  '2.1.1': {
    changelog: [
      'Fix rivenditori non visibili sulla mappa',
      'Campo "Pubblicato" spostato in cima',
      'Query piu permissiva per isActive',
    ],
    tag: 'v2.1.1',
    status: 'archived',
  },
  '2.1.0': {
    changelog: [
      'Header personalizzabile (logo size, stile, CTA)',
      'Footer personalizzabile (colonne, stile, links)',
      'Spaziature interne per TUTTE le sezioni',
      'Schema condiviso internalSpacingFields',
    ],
    status: 'archived',
  },
  '2.0.9': {
    changelog: [
      'Spaziature granulari sezione Contatti',
      '8 nuovi controlli distanze (header, form, info, mappa)',
    ],
    status: 'archived',
  },
  '2.0.8': {
    changelog: [
      'Fix dati misti localeRichText -> string',
      'Script migrazione dati automatico',
    ],
    status: 'archived',
  },
  '2.0.7': {
    changelog: [
      'Ripristino localeRichText (richText)',
    ],
    status: 'archived',
  },
  '2.0.6': {
    changelog: [
      'Nuova sezione Trust Badges (Qualita)',
      'Badge prodotti completi (Nuovo, In Evidenza, ecc)',
      'Mappa: disabilitato zoom rotella mouse',
      'WhatsApp: popup se non configurato',
    ],
    status: 'archived',
  },
  '2.0.5': {
    changelog: [
      'Settori Applicazione: nuovo documento + sezione',
      'Case Studies: sfida/soluzione/risultati',
      'Punti di Forza: sezione personalizzabile',
      'WhatsApp floating button',
      'Font Inter + Palette metallica',
      'Form contatto con tipo richiesta',
    ],
    status: 'archived',
  },
  '2.0.4': {
    changelog: [
      'Divisori wave automatici tra sezioni',
      'Transizioni fluide gradient/curve/slant',
      'Grafica moderna con Framer Motion',
    ],
    status: 'archived',
  },
  '2.0.3': {
    changelog: [
      'Fix layout altezza - rimosso flex problematico',
      'CustomNavbar semplificato',
    ],
    status: 'archived',
  },
  '2.0.0': {
    changelog: [
      'Fix SchemaError: rimossi campi duplicati',
      'statsSection e ctaSection corretti',
    ],
    status: 'archived',
  },
  '1.8.0': {
    changelog: [
      'Editor Rich Text in tutti i campi testo',
      '72 campi convertiti in localeRichText',
    ],
    status: 'archived',
  },
  '1.7.0': {
    changelog: [
      'Tipografia personalizzabile',
    ],
    status: 'archived',
  },
  '1.6.0': {
    changelog: [
      'Dashboard Pagine v3',
    ],
    status: 'archived',
  },
  '1.5.0': {
    changelog: [
      'Spaziatura granulare sezioni',
    ],
    status: 'archived',
  },
}

const VERSION_ORDER = Object.keys(VERSIONS).sort((a, b) => {
  const [aMajor, aMinor, aPatch] = a.split('.').map(Number)
  const [bMajor, bMinor, bPatch] = b.split('.').map(Number)
  if (bMajor !== aMajor) return bMajor - aMajor
  if (bMinor !== aMinor) return bMinor - aMinor
  return bPatch - aPatch
})

// ============================================
// STATUS BADGES
// ============================================
function StatusBadge({ status }: { status: VersionInfo['status'] }) {
  const config = {
    production: { label: 'IN PRODUZIONE', bg: '#00cc66', color: '#000' },
    available: { label: 'DISPONIBILE', bg: '#0077FF', color: '#fff' },
    archived: { label: 'ARCHIVIO', bg: '#444', color: '#999' },
  }
  const c = config[status]
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '9px',
      fontWeight: '700',
      letterSpacing: '0.5px',
      backgroundColor: c.bg,
      color: c.color,
      marginLeft: '8px',
      verticalAlign: 'middle',
    }}>
      {c.label}
    </span>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export function CustomNavbar(props: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const togglePanel = useCallback(() => {
    setIsOpen(prev => !prev)
    setSelectedVersion(null)
  }, [])

  // Close panel on click outside
  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSelectedVersion(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setSelectedVersion(null)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  const activeVersion = selectedVersion || SITE_VERSION
  const activeInfo = VERSIONS[activeVersion]

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {/* Navbar default di Sanity */}
      <div style={{ flex: 1 }}>
        {props.renderDefault(props)}
      </div>

      {/* Version Badge + Panel */}
      <div
        ref={panelRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '12px',
          position: 'relative',
        }}
      >
        {/* Badge cliccabile */}
        <button
          onClick={togglePanel}
          style={{
            backgroundColor: isOpen ? '#003380' : '#0047AB',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'background-color 0.15s',
          }}
          title="Gestione Versioni"
        >
          v{SITE_VERSION}
          <span style={{ fontSize: '8px', marginLeft: '2px' }}>
            {isOpen ? '\u25B2' : '\u25BC'}
          </span>
        </button>

        {/* Panel */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              borderRadius: '10px',
              fontSize: '12px',
              width: '420px',
              maxHeight: '520px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px',
              borderBottom: '1px solid #333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ fontWeight: '700', color: '#0077FF', fontSize: '13px' }}>
                Gestione Versioni
              </div>
              <button
                onClick={() => { setIsOpen(false); setSelectedVersion(null) }}
                style={{
                  background: 'none', border: 'none', color: '#666',
                  cursor: 'pointer', fontSize: '16px', padding: '0 4px',
                }}
              >
                &#x2715;
              </button>
            </div>

            {/* Content: split layout */}
            <div style={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden',
              minHeight: 0,
            }}>
              {/* Left: Version List */}
              <div style={{
                width: '160px',
                borderRight: '1px solid #333',
                overflowY: 'auto',
                flexShrink: 0,
              }}>
                {VERSION_ORDER.map((version) => {
                  const info = VERSIONS[version]
                  const isActive = version === activeVersion
                  const isCurrent = version === SITE_VERSION
                  return (
                    <button
                      key={version}
                      onClick={() => setSelectedVersion(version)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 12px',
                        border: 'none',
                        borderLeft: isActive ? '3px solid #0077FF' : '3px solid transparent',
                        backgroundColor: isActive ? '#2a2a4e' : 'transparent',
                        color: isActive ? '#fff' : (isCurrent ? '#00cc66' : '#999'),
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: isCurrent ? '700' : '400',
                        transition: 'background-color 0.1s',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.target as HTMLElement).style.backgroundColor = '#252525'
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.target as HTMLElement).style.backgroundColor = 'transparent'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isCurrent && (
                          <span style={{
                            display: 'inline-block',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#00cc66',
                            flexShrink: 0,
                          }} />
                        )}
                        v{version}
                      </div>
                      {info.branch && (
                        <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                          {info.branch}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Right: Version Detail */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px',
              }}>
                {activeInfo && (
                  <>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                      <span style={{ fontWeight: '700', fontSize: '16px' }}>
                        v{activeVersion}
                      </span>
                      <StatusBadge status={activeInfo.status} />
                    </div>

                    {/* Branch / Tag info */}
                    {(activeInfo.branch || activeInfo.tag) && (
                      <div style={{
                        display: 'flex',
                        gap: '6px',
                        marginBottom: '12px',
                        flexWrap: 'wrap',
                      }}>
                        {activeInfo.branch && (
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            backgroundColor: '#1a3a5c',
                            color: '#7cb3f0',
                          }}>
                            branch: {activeInfo.branch}
                          </span>
                        )}
                        {activeInfo.tag && (
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            backgroundColor: '#3a2a1a',
                            color: '#f0b07c',
                          }}>
                            tag: {activeInfo.tag}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Changelog */}
                    <div style={{
                      fontSize: '11px',
                      color: '#bbb',
                      fontWeight: '600',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      Changelog
                    </div>
                    <ul style={{
                      margin: '0 0 16px 0',
                      padding: '0 0 0 14px',
                      listStyle: 'disc',
                    }}>
                      {activeInfo.changelog.map((item, i) => (
                        <li key={i} style={{
                          fontSize: '11px',
                          color: '#aaa',
                          padding: '2px 0',
                          lineHeight: '1.4',
                        }}>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Action buttons */}
                    {activeInfo.branch && activeVersion !== SITE_VERSION && (
                      <div style={{
                        padding: '10px',
                        backgroundColor: '#1a2a3a',
                        borderRadius: '6px',
                        marginBottom: '10px',
                      }}>
                        <div style={{ fontSize: '10px', color: '#7cb3f0', marginBottom: '8px', fontWeight: '600' }}>
                          Per ripristinare questa versione:
                        </div>
                        <div style={{ fontSize: '10px', color: '#888', lineHeight: '1.5' }}>
                          1. Vai su Vercel Deployments<br />
                          2. Trova il deploy del branch <strong style={{ color: '#7cb3f0' }}>{activeInfo.branch}</strong><br />
                          3. Clicca i 3 puntini &rarr; "Promote to Production"
                        </div>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                          <a
                            href={VERCEL_FRONTEND_DASHBOARD}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '5px 10px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600',
                              backgroundColor: '#0047AB',
                              color: '#fff',
                              textDecoration: 'none',
                              display: 'inline-block',
                            }}
                          >
                            Frontend Deploys
                          </a>
                          <a
                            href={VERCEL_STUDIO_DASHBOARD}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '5px 10px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600',
                              backgroundColor: '#333',
                              color: '#ccc',
                              textDecoration: 'none',
                              display: 'inline-block',
                            }}
                          >
                            Studio Deploys
                          </a>
                        </div>
                      </div>
                    )}

                    {activeVersion === SITE_VERSION && (
                      <div style={{
                        padding: '10px',
                        backgroundColor: '#1a3a2a',
                        borderRadius: '6px',
                        fontSize: '10px',
                        color: '#66cc88',
                      }}>
                        Questa versione e attualmente in produzione.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Footer: quick links */}
            <div style={{
              padding: '10px 16px',
              borderTop: '1px solid #333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={GITHUB_FRONTEND}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#888', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#ccc' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#888' }}
                >
                  GitHub Frontend
                </a>
                <a
                  href={GITHUB_STUDIO}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#888', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#ccc' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#888' }}
                >
                  GitHub Studio
                </a>
              </div>
              <span style={{ color: '#555' }}>
                GLOS Italy CMS
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
