// Schema Types Index - GLOS Italy
// Esporta tutti gli schemi per Sanity Studio

import page from './page'
import product from './product'
import productCategory from './productCategory'
import siteSettings from './siteSettings'
import navigation from './navigation'
import dealer from './dealer'
import testimonial from './testimonial'
import faq from './faq'
import mediaItem from './mediaItem'

// Tipi oggetto per multilingua
import localeString from './objects/localeString'
import localeText from './objects/localeText'

// Schemi per le sezioni delle pagine
import heroSection from './sections/heroSection'
import statsSection from './sections/statsSection'
import productsSection from './sections/productsSection'
import featuresSection from './sections/featuresSection'
import gallerySection from './sections/gallerySection'
import ctaSection from './sections/ctaSection'
import contactSection from './sections/contactSection'

export const schemaTypes = [
  // Tipi oggetto base
  localeString,
  localeText,

  // Documenti principali
  page,
  product,
  productCategory,
  siteSettings,
  navigation,
  dealer,
  testimonial,
  faq,
  mediaItem,

  // Sezioni (oggetti riutilizzabili)
  heroSection,
  statsSection,
  productsSection,
  featuresSection,
  gallerySection,
  ctaSection,
  contactSection,
]
