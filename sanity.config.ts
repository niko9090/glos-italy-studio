// sanity.config.ts - Configurazione principale Sanity Studio (v3.0.0)
// VERSIONE SEMPLIFICATA per utente finale
import { defineConfig, definePlugin } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { CustomNavbar } from './components/studio/CustomNavbar'
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

// ============================================================
// STRUTTURA MENU SEMPLIFICATA - 3 AREE PRINCIPALI
// ============================================================
const structure = (S: any) =>
  S.list()
    .title('GLOS Italy')
    .items([
      // ══════════════════════════════════════════════════════
      // AREA 1: PRODOTTI
      // ══════════════════════════════════════════════════════
      S.listItem()
        .title('PRODOTTI')
        .icon(() => '📦')
        .child(
          S.list()
            .title('Gestione Prodotti')
            .items([
              S.listItem()
                .title('Tutti i Prodotti')
                .icon(() => '🏷️')
                .child(S.documentTypeList('product').title('Catalogo Prodotti')),
              S.listItem()
                .title('Categorie')
                .icon(() => '📂')
                .child(S.documentTypeList('productCategory').title('Categorie')),
            ])
        ),

      S.divider(),

      // ══════════════════════════════════════════════════════
      // AREA 2: LISTINO PREZZI
      // ══════════════════════════════════════════════════════
      S.listItem()
        .title('LISTINO PREZZI')
        .icon(() => '💰')
        .child(S.documentTypeList('listinoItem').title('Articoli Listino')),

      S.divider(),

      // ══════════════════════════════════════════════════════
      // AREA 3: VIDEO COMMUNITY
      // ══════════════════════════════════════════════════════
      S.listItem()
        .title('VIDEO COMMUNITY')
        .icon(() => '🎬')
        .child(S.documentTypeList('communityVideo').title('Video e Commenti')),

      S.divider(),

      // ══════════════════════════════════════════════════════
      // IMPOSTAZIONI (solo essenziali)
      // ══════════════════════════════════════════════════════
      S.listItem()
        .title('Impostazioni')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Dati Azienda')
        ),

      // ══════════════════════════════════════════════════════
      // SEZIONI NASCOSTE (codice mantenuto ma commentato)
      // Per riabilitare: decommentare la sezione desiderata
      // ══════════════════════════════════════════════════════

      /*
      // --- PAGINE (Page Builder - nascosto per utente finale) ---
      S.listItem()
        .title('Pagine')
        .icon(() => '📄')
        .child(S.documentTypeList('page').title('Tutte le Pagine')),

      // --- TESTIMONIANZE ---
      S.listItem()
        .title('Testimonianze')
        .icon(() => '💬')
        .child(S.documentTypeList('testimonial').title('Testimonianze')),

      // --- FAQ ---
      S.listItem()
        .title('FAQ')
        .icon(() => '❓')
        .child(S.documentTypeList('faq').title('Domande Frequenti')),

      // --- RIVENDITORI ---
      S.listItem()
        .title('Rivenditori')
        .icon(() => '🏪')
        .child(S.documentTypeList('dealer').title('Rete Vendita')),

      // --- SETTORI APPLICAZIONE ---
      S.listItem()
        .title('Settori')
        .icon(() => '🏭')
        .child(S.documentTypeList('sector').title('Settori')),

      // --- CASE STUDIES ---
      S.listItem()
        .title('Case Studies')
        .icon(() => '📋')
        .child(S.documentTypeList('caseStudy').title('Case Studies')),

      // --- MENU NAVIGAZIONE ---
      S.listItem()
        .title('Menu')
        .icon(() => '🧭')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('mainNavigation')
            .title('Menu Principale')
        ),
      */
    ])

export default defineConfig({
  name: 'glos-italy',
  title: 'GLOS Italy',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '97oreljh',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  // Componenti Studio personalizzati
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },

  plugins: [
    // ══════════════════════════════════════════════════════
    // PLUGIN ATTIVI
    // ══════════════════════════════════════════════════════

    // Gestione Contenuti (struttura ad albero)
    structureTool({ structure, title: 'Contenuti' }),

    // Gestione Media
    media(),

    // ══════════════════════════════════════════════════════
    // PLUGIN DISABILITATI (troppo avanzati per utente finale)
    // ══════════════════════════════════════════════════════

    /*
    // Editor Visuale con Preview Live (per sviluppatori)
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
    */
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
})
