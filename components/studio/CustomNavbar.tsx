// Custom Navbar con Versione Sito
import { NavbarProps } from 'sanity'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.1.3'

export function CustomNavbar(props: NavbarProps) {
  return (
    <div style={{ display: 'contents' }}>
      {/* Renderizza il navbar default */}
      {props.renderDefault(props)}

      {/* Badge versione - posizionato fisso in alto a destra */}
      <span
        style={{
          position: 'fixed',
          top: '10px',
          right: '16px',
          zIndex: 99999,
          backgroundColor: '#0047AB',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        v{SITE_VERSION}
      </span>
    </div>
  )
}
