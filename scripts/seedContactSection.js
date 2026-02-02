// Script per popolare la sezione Contatti con tutti i campi
// Esegui con: npx sanity exec scripts/seedContactSection.js --with-user-token

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const contactSection = {
  _type: 'contactSection',
  _key: 'contact-section-main',

  // === CONTENUTO ===
  eyebrow: {
    it: 'CONTATTACI',
    en: 'CONTACT US',
    es: 'CONTÁCTENOS'
  },
  title: {
    _type: 'localeRichText',
    it: [{ _type: 'block', _key: 'title-it', style: 'normal', children: [{ _type: 'span', _key: 'span1', text: 'Siamo qui per aiutarti' }] }],
    en: [{ _type: 'block', _key: 'title-en', style: 'normal', children: [{ _type: 'span', _key: 'span2', text: 'We are here to help you' }] }],
    es: [{ _type: 'block', _key: 'title-es', style: 'normal', children: [{ _type: 'span', _key: 'span3', text: 'Estamos aquí para ayudarte' }] }]
  },
  subtitle: {
    _type: 'localeRichText',
    it: [{ _type: 'block', _key: 'sub-it', style: 'normal', children: [{ _type: 'span', _key: 'spans1', text: 'Compila il modulo o contattaci direttamente. Ti risponderemo il prima possibile.' }] }],
    en: [{ _type: 'block', _key: 'sub-en', style: 'normal', children: [{ _type: 'span', _key: 'spans2', text: 'Fill out the form or contact us directly. We will reply as soon as possible.' }] }],
    es: [{ _type: 'block', _key: 'sub-es', style: 'normal', children: [{ _type: 'span', _key: 'spans3', text: 'Rellena el formulario o contáctanos directamente. Te responderemos lo antes posible.' }] }]
  },
  description: {
    it: 'GLOS S.R.L. è specializzata nella produzione di macchinari di precisione per il settore vernici. Contattaci per informazioni sui nostri prodotti, assistenza tecnica o per diventare rivenditore.',
    en: 'GLOS S.R.L. specializes in the production of precision machinery for the paint industry. Contact us for information about our products, technical support, or to become a dealer.',
    es: 'GLOS S.R.L. está especializada en la producción de maquinaria de precisión para el sector de pinturas. Contáctenos para información sobre nuestros productos, asistencia técnica o para convertirse en distribuidor.'
  },

  // === TOGGLE ELEMENTI ===
  showForm: true,
  showMap: true,
  showContactInfo: true,
  showSocialLinks: true,
  showOpeningHours: true,

  // === FORM ===
  formTitle: {
    it: 'Inviaci un messaggio',
    en: 'Send us a message',
    es: 'Envíanos un mensaje'
  },
  formSubtitle: {
    it: 'Compila tutti i campi e ti risponderemo entro 24 ore',
    en: 'Fill in all fields and we will reply within 24 hours',
    es: 'Rellena todos los campos y te responderemos en 24 horas'
  },
  formFields: [
    {
      _type: 'formField',
      _key: 'field-name',
      type: 'text',
      name: 'name',
      label: { it: 'Nome e Cognome', en: 'Full Name', es: 'Nombre Completo' },
      placeholder: { it: 'Inserisci il tuo nome', en: 'Enter your name', es: 'Ingresa tu nombre' },
      required: true,
      width: 'half'
    },
    {
      _type: 'formField',
      _key: 'field-company',
      type: 'text',
      name: 'company',
      label: { it: 'Azienda', en: 'Company', es: 'Empresa' },
      placeholder: { it: 'Nome della tua azienda', en: 'Your company name', es: 'Nombre de tu empresa' },
      required: false,
      width: 'half'
    },
    {
      _type: 'formField',
      _key: 'field-email',
      type: 'email',
      name: 'email',
      label: { it: 'Email', en: 'Email', es: 'Correo electrónico' },
      placeholder: { it: 'La tua email', en: 'Your email', es: 'Tu correo electrónico' },
      required: true,
      width: 'half'
    },
    {
      _type: 'formField',
      _key: 'field-phone',
      type: 'tel',
      name: 'phone',
      label: { it: 'Telefono', en: 'Phone', es: 'Teléfono' },
      placeholder: { it: '+39 XXX XXX XXXX', en: '+39 XXX XXX XXXX', es: '+39 XXX XXX XXXX' },
      required: false,
      width: 'half'
    },
    {
      _type: 'formField',
      _key: 'field-subject',
      type: 'select',
      name: 'subject',
      label: { it: 'Oggetto', en: 'Subject', es: 'Asunto' },
      placeholder: { it: 'Seleziona un argomento', en: 'Select a topic', es: 'Selecciona un tema' },
      required: true,
      width: 'full',
      options: [
        'Informazioni Prodotti',
        'Richiesta Preventivo',
        'Assistenza Tecnica',
        'Diventare Rivenditore',
        'Altro'
      ]
    },
    {
      _type: 'formField',
      _key: 'field-message',
      type: 'textarea',
      name: 'message',
      label: { it: 'Messaggio', en: 'Message', es: 'Mensaje' },
      placeholder: { it: 'Scrivi il tuo messaggio...', en: 'Write your message...', es: 'Escribe tu mensaje...' },
      required: true,
      width: 'full'
    },
    {
      _type: 'formField',
      _key: 'field-privacy',
      type: 'checkbox',
      name: 'privacy',
      label: { it: 'Accetto la Privacy Policy', en: 'I accept the Privacy Policy', es: 'Acepto la Política de Privacidad' },
      required: true,
      width: 'full'
    }
  ],
  submitButtonText: {
    it: 'Invia Messaggio',
    en: 'Send Message',
    es: 'Enviar Mensaje'
  },
  submitButtonIcon: '→',
  formSuccessMessage: {
    it: 'Grazie! Il tuo messaggio è stato inviato. Ti risponderemo al più presto.',
    en: 'Thank you! Your message has been sent. We will reply as soon as possible.',
    es: '¡Gracias! Tu mensaje ha sido enviado. Te responderemos lo antes posible.'
  },
  formErrorMessage: {
    it: 'Si è verificato un errore. Riprova o contattaci direttamente.',
    en: 'An error occurred. Please try again or contact us directly.',
    es: 'Se produjo un error. Inténtalo de nuevo o contáctanos directamente.'
  },
  privacyText: {
    _type: 'localeRichText',
    it: [{ _type: 'block', _key: 'priv-it', style: 'normal', children: [{ _type: 'span', _key: 'ps1', text: 'I tuoi dati saranno trattati secondo la nostra ' }, { _type: 'span', _key: 'ps2', text: 'Privacy Policy', marks: ['strong'] }, { _type: 'span', _key: 'ps3', text: ' e non saranno condivisi con terzi.' }] }],
    en: [{ _type: 'block', _key: 'priv-en', style: 'normal', children: [{ _type: 'span', _key: 'pe1', text: 'Your data will be processed according to our ' }, { _type: 'span', _key: 'pe2', text: 'Privacy Policy', marks: ['strong'] }, { _type: 'span', _key: 'pe3', text: ' and will not be shared with third parties.' }] }],
    es: [{ _type: 'block', _key: 'priv-es', style: 'normal', children: [{ _type: 'span', _key: 'pse1', text: 'Tus datos serán tratados según nuestra ' }, { _type: 'span', _key: 'pse2', text: 'Política de Privacidad', marks: ['strong'] }, { _type: 'span', _key: 'pse3', text: ' y no serán compartidos con terceros.' }] }]
  },
  formStyle: 'card',

  // === INFO CONTATTO ===
  contactInfoTitle: {
    it: 'I Nostri Recapiti',
    en: 'Our Contact Details',
    es: 'Nuestros Datos de Contacto'
  },
  contactItems: [
    {
      _type: 'contactItem',
      _key: 'contact-address',
      type: 'address',
      label: { it: 'Sede Legale', en: 'Headquarters', es: 'Sede Central' },
      value: 'Via dell\'Industria 15, 20100 Milano (MI), Italia',
      link: 'https://maps.google.com/?q=Via+dell%27Industria+15+Milano'
    },
    {
      _type: 'contactItem',
      _key: 'contact-phone',
      type: 'phone',
      label: { it: 'Telefono', en: 'Phone', es: 'Teléfono' },
      value: '+39 02 1234567',
      link: 'tel:+390212345678'
    },
    {
      _type: 'contactItem',
      _key: 'contact-mobile',
      type: 'mobile',
      label: { it: 'Cellulare', en: 'Mobile', es: 'Móvil' },
      value: '+39 333 1234567',
      link: 'tel:+393331234567'
    },
    {
      _type: 'contactItem',
      _key: 'contact-whatsapp',
      type: 'whatsapp',
      label: { it: 'WhatsApp', en: 'WhatsApp', es: 'WhatsApp' },
      value: '+39 333 1234567',
      link: 'https://wa.me/393331234567'
    },
    {
      _type: 'contactItem',
      _key: 'contact-email',
      type: 'email',
      label: { it: 'Email Commerciale', en: 'Sales Email', es: 'Email Comercial' },
      value: 'info@glositaly.it',
      link: 'mailto:info@glositaly.it'
    },
    {
      _type: 'contactItem',
      _key: 'contact-support',
      type: 'email',
      label: { it: 'Assistenza Tecnica', en: 'Technical Support', es: 'Soporte Técnico' },
      value: 'supporto@glositaly.it',
      link: 'mailto:supporto@glositaly.it'
    },
    {
      _type: 'contactItem',
      _key: 'contact-vat',
      type: 'vat',
      label: { it: 'Partita IVA', en: 'VAT Number', es: 'NIF' },
      value: 'IT 01234567890'
    },
    {
      _type: 'contactItem',
      _key: 'contact-pec',
      type: 'other',
      label: { it: 'PEC', en: 'Certified Email', es: 'Email Certificado' },
      value: 'glos@pec.it',
      link: 'mailto:glos@pec.it'
    }
  ],

  // === ORARI ===
  openingHoursTitle: {
    it: 'Orari di Apertura',
    en: 'Opening Hours',
    es: 'Horario de Apertura'
  },
  openingHours: [
    {
      _type: 'hours',
      _key: 'hours-weekdays',
      days: { it: 'Lunedì - Venerdì', en: 'Monday - Friday', es: 'Lunes - Viernes' },
      hours: '08:30 - 18:00',
      note: { it: 'Pausa pranzo: 12:30 - 14:00', en: 'Lunch break: 12:30 - 14:00', es: 'Pausa almuerzo: 12:30 - 14:00' }
    },
    {
      _type: 'hours',
      _key: 'hours-saturday',
      days: { it: 'Sabato', en: 'Saturday', es: 'Sábado' },
      hours: '09:00 - 12:00',
      note: { it: 'Solo su appuntamento', en: 'By appointment only', es: 'Solo con cita previa' }
    },
    {
      _type: 'hours',
      _key: 'hours-sunday',
      days: { it: 'Domenica e Festivi', en: 'Sunday and Holidays', es: 'Domingo y Festivos' },
      hours: 'Chiuso / Closed / Cerrado'
    }
  ],

  // === SOCIAL ===
  socialTitle: {
    it: 'Seguici sui Social',
    en: 'Follow Us',
    es: 'Síguenos'
  },
  socialLinks: [
    {
      _type: 'social',
      _key: 'social-facebook',
      platform: 'facebook',
      url: 'https://facebook.com/glositaly',
      label: 'Facebook'
    },
    {
      _type: 'social',
      _key: 'social-instagram',
      platform: 'instagram',
      url: 'https://instagram.com/glositaly',
      label: 'Instagram'
    },
    {
      _type: 'social',
      _key: 'social-linkedin',
      platform: 'linkedin',
      url: 'https://linkedin.com/company/glositaly',
      label: 'LinkedIn'
    },
    {
      _type: 'social',
      _key: 'social-youtube',
      platform: 'youtube',
      url: 'https://youtube.com/@glositaly',
      label: 'YouTube'
    },
    {
      _type: 'social',
      _key: 'social-whatsapp',
      platform: 'whatsapp',
      url: 'https://wa.me/393331234567',
      label: 'WhatsApp'
    }
  ],

  // === MAPPA ===
  mapType: 'google',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.5!2d9.19!3d45.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI3JzM2LjAiTiA5wrAxMScyNC4wIkU!5e0!3m2!1sit!2sit!4v1234567890',
  mapZoom: 15,
  mapHeight: 'lg',

  // === LAYOUT ===
  layout: 'form-left',
  formWidth: 'normal',
  contentWidth: 'normal',
  paddingY: 'lg',

  // === STILE ===
  backgroundColor: 'gray-light',
  textColor: 'auto',
  cardStyle: 'shadow',
  iconStyle: 'circle-filled',
  animation: 'fade-up',
  showDecorations: true
}

async function seedContactSection() {
  console.log('Cercando la pagina contatti...')

  // Trova la pagina contatti
  const pages = await client.fetch(`*[_type == "page" && slug.current == "contatti"][0]`)

  if (!pages) {
    console.log('Pagina contatti non trovata. Creando nuova pagina...')

    // Crea la pagina contatti
    const newPage = await client.create({
      _type: 'page',
      title: { it: 'Contatti', en: 'Contact', es: 'Contacto' },
      slug: { current: 'contatti' },
      description: { it: 'Contattaci per informazioni', en: 'Contact us for information', es: 'Contáctenos para información' },
      isPublished: true,
      sections: [contactSection]
    })

    console.log('Pagina contatti creata con ID:', newPage._id)
  } else {
    console.log('Pagina contatti trovata. Aggiornando sezioni...')

    // Rimuovi eventuali sezioni contatti esistenti e aggiungi la nuova
    const existingSections = pages.sections || []
    const filteredSections = existingSections.filter(s => s._type !== 'contactSection')

    await client
      .patch(pages._id)
      .set({
        sections: [...filteredSections, contactSection]
      })
      .commit()

    console.log('Sezione contatti aggiornata!')
  }

  console.log('Fatto! La sezione contatti è ora completa con tutti i campi.')
}

seedContactSection().catch(console.error)
