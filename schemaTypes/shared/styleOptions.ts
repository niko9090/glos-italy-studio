// Style Options - Opzioni stile moderne riutilizzabili
// Glassmorphism, gradienti, ombre e effetti visivi moderni

// Stili per card
export const cardStyleOptions = [
  { title: 'Semplice', value: 'none' },
  { title: 'Con Bordo', value: 'border' },
  { title: 'Ombra Leggera', value: 'shadow-sm' },
  { title: 'Ombra Media', value: 'shadow-md' },
  { title: 'Ombra Forte', value: 'shadow-lg' },
  { title: 'Glass (vetro)', value: 'glass' },
  { title: 'Glass Scuro', value: 'glass-dark' },
  { title: 'Gradiente', value: 'gradient' },
  { title: 'Elevated (premium)', value: 'elevated' },
  { title: 'Colorato (accent)', value: 'colored' },
]

// Colori sfondo sezione
export const backgroundColorOptions = [
  { title: 'Bianco', value: 'white' },
  { title: 'Grigio Chiaro', value: 'gray-light' },
  { title: 'Grigio', value: 'gray' },
  { title: 'Scuro', value: 'dark' },
  { title: 'Nero', value: 'black' },
  { title: 'Primary (blu)', value: 'primary' },
  { title: 'Primary Chiaro', value: 'primary-light' },
  { title: 'Gradiente Blu', value: 'gradient-blue' },
  { title: 'Gradiente Scuro', value: 'gradient-dark' },
  { title: 'Gradiente Animato', value: 'gradient-animated' },
  { title: 'Pattern', value: 'pattern' },
  { title: 'Immagine', value: 'image' },
]

// Gradienti disponibili
export const gradientOptions = [
  // Blu
  { title: 'Blu Scuro', value: 'blue-dark' },
  { title: 'Blu Viola', value: 'blue-purple' },
  { title: 'Navy Blu', value: 'navy-blue' },
  { title: 'Radiale Blu', value: 'radial-blue' },
  // Verde
  { title: 'Verde Blu', value: 'green-blue' },
  { title: 'Teal Verde', value: 'teal-green' },
  // Caldi
  { title: 'Arancio Rosa', value: 'orange-pink' },
  { title: 'Viola Rosa', value: 'purple-pink' },
  { title: 'Rosso Arancio', value: 'red-orange' },
  // Scuri
  { title: 'Nero Blu', value: 'black-blue' },
  { title: 'Nero Grigio', value: 'black-gray' },
  { title: 'Carbone', value: 'charcoal-gray' },
  // Animati
  { title: 'Blu Animato', value: 'animated-blue' },
  { title: 'Viola Animato', value: 'animated-purple' },
  // Speciali
  { title: 'Tramonto', value: 'sunset' },
  { title: 'Oceano', value: 'ocean' },
  { title: 'Aurora', value: 'aurora' },
  { title: 'Notte', value: 'night' },
]

// Dimensioni titolo
export const titleSizeOptions = [
  { title: 'Normale', value: 'normal' },
  { title: 'Grande', value: 'large' },
  { title: 'Extra Large', value: 'xl' },
  { title: 'XXL (hero)', value: 'xxl' },
]

// Stili icone
export const iconStyleOptions = [
  { title: 'Semplice', value: 'simple' },
  { title: 'Filled (pieno)', value: 'filled' },
  { title: 'Outlined (contorno)', value: 'outlined' },
  { title: 'Gradiente', value: 'gradient' },
  { title: 'Cerchio Pieno', value: 'circle-filled' },
  { title: 'Cerchio Contorno', value: 'circle-outlined' },
  { title: 'Quadrato Arrotondato', value: 'rounded-square' },
]

// Dimensioni icone
export const iconSizeOptions = [
  { title: 'Piccola', value: 'sm' },
  { title: 'Media', value: 'md' },
  { title: 'Grande', value: 'lg' },
  { title: 'Extra Grande', value: 'xl' },
]

// Colori accent
export const accentColorOptions = [
  { title: 'Primary (blu)', value: 'primary' },
  { title: 'Verde', value: 'green' },
  { title: 'Viola', value: 'purple' },
  { title: 'Arancione', value: 'orange' },
  { title: 'Rosso', value: 'red' },
  { title: 'Ciano', value: 'cyan' },
  { title: 'Oro', value: 'gold' },
  { title: 'Gradiente', value: 'gradient' },
]

// Raggio bordi
export const borderRadiusOptions = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Piccolo', value: 'sm' },
  { title: 'Medio', value: 'md' },
  { title: 'Grande', value: 'lg' },
  { title: 'Extra Grande', value: 'xl' },
  { title: 'Completo (pill)', value: 'full' },
]

// Ombre
export const shadowOptions = [
  { title: 'Nessuna', value: 'none' },
  { title: 'Leggera', value: 'sm' },
  { title: 'Media', value: 'md' },
  { title: 'Forte', value: 'lg' },
  { title: 'Glow (bagliore)', value: 'glow' },
  { title: '3D', value: '3d' },
]

// Opacita overlay
export const overlayOpacityOptions = [
  { title: 'Leggera (20%)', value: 20 },
  { title: 'Media (40%)', value: 40 },
  { title: 'Standard (50%)', value: 50 },
  { title: 'Forte (60%)', value: 60 },
  { title: 'Molto Forte (70%)', value: 70 },
  { title: 'Scuro (80%)', value: 80 },
]

// Gruppo di campi stile visivo per le sezioni
export const visualStyleFieldGroup = {
  name: 'visualStyle',
  title: 'Stile Visivo',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'cardStyle',
      title: 'Stile Card',
      type: 'string',
      options: { list: cardStyleOptions },
      initialValue: 'shadow-md',
    },
    {
      name: 'iconStyle',
      title: 'Stile Icone',
      type: 'string',
      options: { list: iconStyleOptions },
      initialValue: 'filled',
    },
    {
      name: 'accentColor',
      title: 'Colore Accent',
      type: 'string',
      options: { list: accentColorOptions },
      initialValue: 'primary',
    },
    {
      name: 'borderRadius',
      title: 'Raggio Bordi',
      type: 'string',
      options: { list: borderRadiusOptions },
      initialValue: 'lg',
    },
    {
      name: 'shadow',
      title: 'Ombra',
      type: 'string',
      options: { list: shadowOptions },
      initialValue: 'md',
    },
    {
      name: 'enableGlassEffect',
      title: 'Abilita Effetto Glass',
      type: 'boolean',
      description: 'Applica effetto glassmorphism agli elementi',
      initialValue: false,
    },
  ],
}

// Gruppo effetti moderni (particelle, glow, ecc)
export const modernEffectsFieldGroup = {
  name: 'modernEffects',
  title: 'Effetti Moderni',
  type: 'object',
  description: 'Abilita effetti visivi avanzati sempre visibili',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      name: 'showFloatingParticles',
      title: 'Particelle Fluttuanti',
      type: 'boolean',
      description: 'Mostra particelle animate sullo sfondo',
      initialValue: true,
    },
    {
      name: 'particleCount',
      title: 'Numero Particelle',
      type: 'number',
      description: 'Quante particelle mostrare (3-10)',
      initialValue: 6,
      hidden: ({ parent }: any) => !parent?.showFloatingParticles,
    },
    {
      name: 'showGlowLines',
      title: 'Linee Luminose',
      type: 'boolean',
      description: 'Mostra linee decorative animate',
      initialValue: true,
    },
    {
      name: 'buttonGlowOnHover',
      title: 'Glow Bottoni su Hover',
      type: 'boolean',
      description: 'Effetto bagliore sui bottoni quando ci passi sopra',
      initialValue: true,
    },
    {
      name: 'cardsLiftOnHover',
      title: 'Card si Sollevano su Hover',
      type: 'boolean',
      description: 'Le card si sollevano e proiettano ombra su hover',
      initialValue: true,
    },
    {
      name: 'textShadowOnTitles',
      title: 'Ombra sui Titoli',
      type: 'boolean',
      description: 'Aggiunge ombra ai titoli per maggiore impatto',
      initialValue: false,
    },
    {
      name: 'glassEffectOnCards',
      title: 'Effetto Glass sulle Card',
      type: 'boolean',
      description: 'Applica effetto vetro smerigliato alle card',
      initialValue: false,
    },
  ],
}

// Export per uso in schemi
export default {
  cardStyleOptions,
  backgroundColorOptions,
  gradientOptions,
  titleSizeOptions,
  iconStyleOptions,
  iconSizeOptions,
  accentColorOptions,
  borderRadiusOptions,
  shadowOptions,
  overlayOpacityOptions,
  visualStyleFieldGroup,
  modernEffectsFieldGroup,
}
