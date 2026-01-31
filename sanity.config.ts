// sanity.config.ts - Configurazione principale Sanity Studio
import { defineConfig, definePlugin } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { PageDashboard } from './components/tools/PageDashboard'
import { DocumentsIcon } from '@sanity/icons'
import { cleanPastePlugin } from './plugins/cleanPaste'

// URL del frontend per preview
const FRONTEND_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://glositaly.vercel.app'
// URL dello studio per CORS
const STUDIO_URL = process.env.SANITY_STUDIO_URL || 'https://glositalystudio.vercel.app'

// Risolve le locations per il visual editing (dove i documenti appaiono nel frontend)
const resolve = {
  locations: {
    // Pagine - mostrate al loro URL
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc?.title || 'Pagina',
                href: doc.slug === 'home' ? '/' : `/${doc.slug}`,
              },
            ]
          : [],
      }),
    }),
    // Prodotti
    product: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc?.name || 'Prodotto',
                href: `/prodotti/${doc.slug}`,
              },
            ]
          : [],
      }),
    }),
    // Impostazioni sito - mostrate ovunque
    siteSettings: defineLocations({
      resolve: () => ({
        locations: [
          { title: 'Homepage', href: '/' },
          { title: 'Tutte le pagine', href: '/' },
        ],
      }),
    }),
  },
}

// Plugin per la Dashboard Pagine
const pageDashboardPlugin = definePlugin({
  name: 'page-dashboard',
  tools: [
    {
      name: 'page-dashboard',
      title: 'Dashboard Pagine',
      icon: DocumentsIcon,
      component: PageDashboard,
    },
  ],
})

// Struttura personalizzata del pannello admin
const structure = (S: any) =>
  S.list()
    .title('GLOS Italy CMS')
    .items([
      // Pagine
      S.listItem()
        .title('Pagine')
        .icon(() => '📄')
        .child(
          S.documentTypeList('page')
            .title('Tutte le Pagine')
        ),

      S.divider(),

      // Prodotti
      S.listItem()
        .title('Catalogo')
        .icon(() => '📦')
        .child(
          S.list()
            .title('Catalogo Prodotti')
            .items([
              S.listItem()
                .title('Prodotti')
                .icon(() => '🏷️')
                .child(
                  S.documentTypeList('product')
                    .title('Tutti i Prodotti')
                ),
              S.listItem()
                .title('Categorie')
                .icon(() => '📂')
                .child(
                  S.documentTypeList('productCategory')
                    .title('Categorie')
                ),
            ])
        ),

      // Rivenditori
      S.listItem()
        .title('Rivenditori')
        .icon(() => '🏪')
        .child(
          S.documentTypeList('dealer')
            .title('Rete Vendita')
        ),

      S.divider(),

      // Contenuti Extra
      S.listItem()
        .title('Contenuti')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Contenuti Extra')
            .items([
              S.listItem()
                .title('Testimonianze')
                .icon(() => '💬')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonianze')
                ),
              S.listItem()
                .title('FAQ')
                .icon(() => '❓')
                .child(
                  S.documentTypeList('faq')
                    .title('Domande Frequenti')
                ),
              S.listItem()
                .title('Media')
                .icon(() => '🖼️')
                .child(
                  S.documentTypeList('mediaItem')
                    .title('Libreria Media')
                ),
            ])
        ),

      S.divider(),

      // Configurazione
      S.listItem()
        .title('Impostazioni Sito')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Impostazioni Globali')
        ),

      S.listItem()
        .title('Navigazione')
        .icon(() => '🧭')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('mainNavigation')
            .title('Menu Principale')
        ),
    ])

export default defineConfig({
  name: 'glos-italy',
  title: 'GLOS Italy CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '97oreljh',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    // Plugin per pulire automaticamente il testo incollato da HTML
    cleanPastePlugin(),

    // Dashboard Pagine - Vista panoramica
    pageDashboardPlugin(),

    // Page Builder Visuale - Preview live con Visual Editing
    presentationTool({
      name: 'editor',
      title: 'Modifica Pagine',
      previewUrl: {
        // URL iniziale del frontend
        origin: FRONTEND_URL,
        // Endpoint per abilitare/disabilitare draft mode
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      // Risolve dove appaiono i documenti nel frontend
      resolve,
    }),
    structureTool({ structure, title: 'Gestione Contenuti' }),
    visionTool(), // Query GROQ
    media(), // Gestione media avanzata
  ],

  schema: {
    types: schemaTypes,
  },

  // Configurazione documento
  document: {
    // Azioni disponibili per ogni documento
  },

  // Configurazione form
  form: {
    // Componenti personalizzati per i campi
    components: {
      // Puoi aggiungere componenti custom qui
    },
  },
})
