// sanity.cli.ts - Configurazione CLI Sanity
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '97oreljh',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
