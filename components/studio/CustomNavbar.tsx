// Custom Navbar con Versione Sito
import { useEffect, useState } from 'react'
import { NavbarProps, useClient } from 'sanity'
import { Flex, Text, Badge } from '@sanity/ui'

export function CustomNavbar(props: NavbarProps) {
  const [version, setVersion] = useState<string>('')
  const client = useClient({ apiVersion: '2024-01-01' })

  useEffect(() => {
    // Fetch versione da siteSettings
    client
      .fetch<{ siteVersion?: string }>(`*[_type == "siteSettings"][0]{ siteVersion }`)
      .then((data) => {
        if (data?.siteVersion) {
          setVersion(data.siteVersion)
        }
      })
      .catch(console.error)
  }, [client])

  return (
    <Flex align="center" style={{ width: '100%' }}>
      {/* Renderizza il navbar default */}
      {props.renderDefault(props)}

      {/* Badge versione */}
      {version && (
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
      )}
    </Flex>
  )
}
