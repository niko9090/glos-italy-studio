// sanity.config.ts - Configurazione principale Sanity Studio
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from '@sanity/presentation'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'

// URL del frontend per preview
const FRONTEND_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://glositaly.vercel.app'

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
    // Page Builder Visuale - Preview live tipo Wix
    presentationTool({
      name: 'editor',
      title: 'Modifica Pagine',
      previewUrl: {
        previewMode: {
          enable: `${FRONTEND_URL}/api/draft`,
        },
      },
      // Risolve URL in documenti per click-to-edit
      resolve: {
        mainDocuments: [
          {
            // Homepage
            route: '/',
            filter: `_type == "page" && slug.current == "home"`,
          },
          {
            // Pagine dinamiche
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug`,
          },
          {
            // Prodotti
            route: '/prodotti/:slug',
            filter: `_type == "product" && slug.current == $slug`,
          },
          {
            // Rivenditori
            route: '/rivenditori',
            filter: `_type == "dealer"`,
          },
        ],
      },
    }),
    structureTool({ structure, title: 'Gestione Contenuti' }),
    media(), // Gestione media avanzata
  ],

  schema: {
    types: schemaTypes,
  },

  // Configurazione documento
  document: {
    // Azioni disponibili per ogni documento
    productionUrl: async (prev, context) => {
      const { document } = context

      if (document._type === 'page') {
        const slug = (document as any).slug?.current
        if (slug) {
          return `${process.env.SANITY_STUDIO_PREVIEW_URL || 'https://glositaly.vercel.app'}/${slug}`
        }
      }

      if (document._type === 'product') {
        const slug = (document as any).slug?.current
        if (slug) {
          return `${process.env.SANITY_STUDIO_PREVIEW_URL || 'https://glositaly.vercel.app'}/prodotti/${slug}`
        }
      }

      return prev
    },
  },

  // Configurazione form
  form: {
    // Componenti personalizzati per i campi
    components: {
      // Puoi aggiungere componenti custom qui
    },
  },
})
