// Custom Navbar con Versione Sito
import { NavbarProps } from 'sanity'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.2.0'

export function CustomNavbar(props: NavbarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {/* Navbar default */}
      <div style={{ flex: 1 }}>
        {props.renderDefault(props)}
      </div>

      {/* Badge versione - integrato nella barra, a destra prima dei controlli */}
      <div
        style={{
          backgroundColor: '#0047AB',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          fontFamily: 'system-ui, sans-serif',
          marginRight: '12px',
          whiteSpace: 'nowrap',
        }}
      >
        v{SITE_VERSION}
      </div>
    </div>
  )
}
