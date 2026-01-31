// Custom Navbar con Versione Sito
import { NavbarProps } from 'sanity'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.1.6'

export function CustomNavbar(props: NavbarProps) {
  return (
    <>
      {props.renderDefault(props)}

      {/* Badge versione - in basso a sinistra, fuori dalla barra */}
      <div
        style={{
          position: 'fixed',
          bottom: '12px',
          left: '12px',
          zIndex: 10,
          backgroundColor: 'rgba(0, 71, 171, 0.9)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        v{SITE_VERSION}
      </div>
    </>
  )
}
