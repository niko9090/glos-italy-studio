// Custom Navbar con Versione Sito
// La versione viene presa da Vercel (automatica) o dalla costante sotto (manuale)
import { NavbarProps } from 'sanity'
import { Badge, Inline } from '@sanity/ui'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '1.1.2'

// Vercel fornisce automaticamente l'hash del commit durante il build
// Se disponibile, mostra quello, altrimenti usa SITE_VERSION
const getVersion = () => {
  const vercelHash = process.env.SANITY_STUDIO_VERCEL_GIT_COMMIT_SHA
  if (vercelHash) {
    return vercelHash.substring(0, 7)
  }
  return SITE_VERSION
}

export function CustomNavbar(props: NavbarProps) {
  const version = getVersion()

  return (
    <>
      {/* Renderizza il navbar default senza wrapper */}
      {props.renderDefault(props)}

      {/* Badge versione - posizionato fisso in alto a destra */}
      <div
        style={{
          position: 'fixed',
          top: '12px',
          right: '70px',
          zIndex: 9999,
        }}
      >
        <Badge tone="primary" fontSize={1} padding={2} radius={2}>
          v{version}
        </Badge>
      </div>
    </>
  )
}
