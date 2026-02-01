// sanity.config.ts - Configurazione principale Sanity Studio (v1.5.0)
import { defineConfig, definePlugin } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { PageDashboard } from './components/tools/PageDashboard'
import { DealerDashboard } from './components/tools/DealerDashboard'
import { CustomNavbar } from './components/studio/CustomNavbar'
import { DocumentsIcon, UsersIcon } from '@sanity/icons'
import { cleanPastePlugin } from './plugins/cleanPaste'
import { TranslateAction } from './actions/translateAction'

// URL del frontend per preview
const FRONTEND_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://glositaly.vercel.app'

// Risolve le locations per il visual editing
const resolve = {
  locations: {
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [{ title: doc?.title || 'Pagina', href: doc.slug === 'home' ? '/' : `/${doc.slug}` }]
          : [],
      }),
    }),
    product: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [{ title: doc?.name || 'Prodotto', href: `/prodotti/${doc.slug}` }]
          : [],
      }),
    }),
    dealer: defineLocations({
      resolve: () => ({
        locations: [{ title: 'Rivenditori', href: '/rivenditori' }],
      }),
    }),
    siteSettings: defineLocations({
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    }),
  },
}

// Plugin Dashboard Pagine
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

// Plugin Dashboard Rivenditori
const dealerDashboardPlugin = definePlugin({
  name: 'dealer-dashboard',
  tools: [
    {
      name: 'dealer-dashboard',
      title: 'Dashboard Rivenditori',
      icon: UsersIcon,
      component: DealerDashboard,
    },
  ],
})

// Struttura personalizzata del pannello admin (semplificata)
const structure = (S: any) =>
  S.list()
    .title('GLOS Italy CMS')
    .items([
      // === PAGINE ===
      S.listItem()
        .title('Pagine')
        .icon(() => '📄')
        .child(
          S.documentTypeList('page').title('Tutte le Pagine')
        ),

      S.divider(),

      // === CATALOGO ===
      S.listItem()
        .title('Prodotti')
        .icon(() => '🏷️')
        .child(
          S.documentTypeList('product').title('Tutti i Prodotti')
        ),

      S.listItem()
        .title('Categorie Prodotti')
        .icon(() => '📂')
        .child(
          S.documentTypeList('productCategory').title('Categorie')
        ),

      S.divider(),

      // === RIVENDITORI ===
      S.listItem()
        .title('Rivenditori')
        .icon(() => '🏪')
        .child(
          S.documentTypeList('dealer').title('Rete Vendita')
        ),

      S.divider(),

      // === CONTENUTI EXTRA (appiattiti) ===
      S.listItem()
        .title('Testimonianze')
        .icon(() => '💬')
        .child(
          S.documentTypeList('testimonial').title('Testimonianze Clienti')
        ),

      S.listItem()
        .title('FAQ')
        .icon(() => '❓')
        .child(
          S.documentTypeList('faq').title('Domande Frequenti')
        ),

      S.divider(),

      // === CONFIGURAZIONE ===
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
        .title('Menu Navigazione')
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

  // Componenti Studio personalizzati
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },

  plugins: [
    // Pulizia testo incollato
    cleanPastePlugin(),

    // Dashboard personalizzate
    pageDashboardPlugin(),
    dealerDashboardPlugin(),

    // Editor Visuale con Preview Live
    presentationTool({
      name: 'editor',
      title: 'Editor Visuale',
      previewUrl: {
        origin: FRONTEND_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      resolve,
    }),

    // Gestione Contenuti (struttura ad albero)
    structureTool({ structure, title: 'Contenuti' }),

    // Gestione Media Avanzata
    media(),

    // Vision Tool rimosso - era per sviluppatori (query GROQ)
    // Se serve per debug, decommentare: visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Azioni documento
  document: {
    actions: (prev, context) => {
      const translateableTypes = ['page', 'product', 'siteSettings', 'navigation', 'dealer']
      if (translateableTypes.includes(context.schemaType)) {
        return [...prev, TranslateAction]
      }
      return prev
    },
  },

  form: {
    components: {},
  },
})
