// Custom Navbar con Versione Sito
import { NavbarProps } from 'sanity'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.1.4'

export function CustomNavbar(props: NavbarProps) {
  return (
    <div style={{ display: 'contents' }}>
      {/* Renderizza il navbar default */}
      {props.renderDefault(props)}

      {/* Badge versione - in alto accanto al logo, non copre menu */}
      <span
        style={{
          position: 'fixed',
          top: '13px',
          left: '180px',
          zIndex: 10,
          backgroundColor: '#0047AB',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          fontFamily: 'system-ui, sans-serif',
          pointerEvents: 'none',
        }}
      >
        v{SITE_VERSION}
      </span>
    </div>
  )
}
