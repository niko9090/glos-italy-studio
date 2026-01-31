// Custom Navbar con Versione Sito
// La versione viene presa da Vercel (automatica) o dalla costante sotto (manuale)
import { NavbarProps } from 'sanity'
import { Flex, Badge } from '@sanity/ui'

// ============================================
// VERSIONE SITO - Aggiorna qui prima di ogni deploy importante
// ============================================
const SITE_VERSION = '2026.01.31'

// Vercel fornisce automaticamente l'hash del commit durante il build
// Se disponibile, mostra quello, altrimenti usa SITE_VERSION
const getVersion = () => {
  // In Sanity Studio, le env vars devono avere prefisso SANITY_STUDIO_
  // Vercel le passa automaticamente se configurate
  const vercelHash = process.env.SANITY_STUDIO_VERCEL_GIT_COMMIT_SHA
  if (vercelHash) {
    return vercelHash.substring(0, 7) // Primi 7 caratteri dell'hash
  }
  return SITE_VERSION
}

export function CustomNavbar(props: NavbarProps) {
  const version = getVersion()

  return (
    <Flex align="center" style={{ width: '100%' }}>
      {/* Renderizza il navbar default */}
      {props.renderDefault(props)}

      {/* Badge versione - non editabile, solo da codice */}
      <Flex
        align="center"
        gap={2}
        paddingRight={3}
        style={{
          position: 'absolute',
          right: '60px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100
        }}
      >
        <Badge tone="primary" fontSize={1} padding={2} radius={2}>
          v{version}
        </Badge>
      </Flex>
    </Flex>
  )
}
