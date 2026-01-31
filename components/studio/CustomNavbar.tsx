// Custom Navbar con Versione Sito
import { NavbarProps } from 'sanity'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.1.5'

export function CustomNavbar(props: NavbarProps) {
  return (
    <>
      {props.renderDefault(props)}

      {/* Badge versione - bottom right, non interferisce con nulla */}
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 99999,
          backgroundColor: '#0047AB',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        v{SITE_VERSION}
      </div>
    </>
  )
}
