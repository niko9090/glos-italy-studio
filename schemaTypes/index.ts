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
// Nuovi schemi documento
import sector from './sector'
import caseStudy from './caseStudy'

// Tipi oggetto per multilingua
import localeString from './objects/localeString'
import localeText from './objects/localeText'
import localeRichText from './objects/localeRichText'
import richText from './objects/richText'
import accessibleImage from './objects/accessibleImage'

// Schemi per le sezioni delle pagine
import heroSection from './sections/heroSection'
import statsSection from './sections/statsSection'
import productsSection from './sections/productsSection'
import featuresSection from './sections/featuresSection'
import gallerySection from './sections/gallerySection'
import ctaSection from './sections/ctaSection'
import contactSection from './sections/contactSection'
// Nuove sezioni
import textImageSection from './sections/textImageSection'
import testimonialsSection from './sections/testimonialsSection'
import faqSection from './sections/faqSection'
import logoCloudSection from './sections/logoCloudSection'
import richTextSection from './sections/richTextSection'
// Sezioni avanzate
import carouselSection from './sections/carouselSection'
import videoSection from './sections/videoSection'
import timelineSection from './sections/timelineSection'
import teamSection from './sections/teamSection'
import tabsSection from './sections/tabsSection'
import bannerSection from './sections/bannerSection'
import iconBoxesSection from './sections/iconBoxesSection'
import beforeAfterSection from './sections/beforeAfterSection'
import downloadSection from './sections/downloadSection'
import embedSection from './sections/embedSection'
import pricingSection from './sections/pricingSection'
import mapSection from './sections/mapSection'
import counterSection from './sections/counterSection'
// Nuove sezioni
import sectorsSection from './sections/sectorsSection'
import strengthsSection from './sections/strengthsSection'
import caseStudiesSection from './sections/caseStudiesSection'
import trustBadgesSection from './sections/trustBadgesSection'

export const schemaTypes = [
  // Tipi oggetto base (ORDINE IMPORTANTE: richText prima di localeRichText)
  localeString,
  localeText,
  richText,
  localeRichText,
  accessibleImage,

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
  sector,
  caseStudy,

  // Sezioni (oggetti riutilizzabili)
  heroSection,
  statsSection,
  productsSection,
  featuresSection,
  gallerySection,
  ctaSection,
  contactSection,
  // Nuove sezioni
  textImageSection,
  testimonialsSection,
  faqSection,
  logoCloudSection,
  richTextSection,
  // Sezioni avanzate
  carouselSection,
  videoSection,
  timelineSection,
  teamSection,
  tabsSection,
  bannerSection,
  iconBoxesSection,
  beforeAfterSection,
  downloadSection,
  embedSection,
  pricingSection,
  mapSection,
  counterSection,
  // Nuove sezioni
  sectorsSection,
  strengthsSection,
  caseStudiesSection,
  trustBadgesSection,
]
