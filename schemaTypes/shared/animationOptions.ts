// Animation Options - Opzioni animazioni riutilizzabili per tutte le sezioni
// Importare in ogni schema di sezione per controllo granulare delle animazioni

// Tipi di animazione d'ingresso
export const animationOptions = [
  { title: 'Nessuna', value: 'none' },
  { title: 'Fade In', value: 'fade' },
  { title: 'Slide Up (dal basso)', value: 'fade-up' },
  { title: 'Slide Down (dall\'alto)', value: 'fade-down' },
  { title: 'Slide Left (da destra)', value: 'slide-left' },
  { title: 'Slide Right (da sinistra)', value: 'slide-right' },
  { title: 'Zoom In', value: 'zoom' },
  { title: 'Stagger (sequenziale)', value: 'stagger' },
  { title: 'Text Reveal (clip)', value: 'text-reveal' },
  { title: 'Flip 3D', value: 'flip' },
  { title: 'Rotate In', value: 'rotate' },
  { title: 'Bounce In', value: 'bounce' },
]

// Effetti hover sugli elementi
export const hoverEffectOptions = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Lift (solleva)', value: 'lift' },
  { title: 'Scale (ingrandisci)', value: 'scale' },
  { title: 'Glow (bagliore)', value: 'glow' },
  { title: 'Lift + Scale + Glow (combo)', value: 'lift-scale-glow' },
  { title: '3D Tilt (inclinazione)', value: 'tilt-3d' },
  { title: 'Border Color', value: 'border-color' },
  { title: 'Background Color', value: 'bg-color' },
  { title: 'Icon Bounce', value: 'icon-bounce' },
  { title: 'Shadow Expand', value: 'shadow-expand' },
]

// Effetti decorativi di sfondo
export const backgroundEffectOptions = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Particelle Fluttuanti', value: 'floating-particles' },
  { title: 'Gradiente Animato', value: 'animated-gradient' },
  { title: 'Linee Luminose', value: 'glow-lines' },
  { title: 'Blob Morphing', value: 'blob-morph' },
  { title: 'Pattern Dots', value: 'dots-pattern' },
  { title: 'Pattern Grid', value: 'grid-pattern' },
]

// Effetti sui bottoni
export const buttonEffectOptions = [
  { title: 'Default', value: 'default' },
  { title: 'Glow su Hover', value: 'glow-hover' },
  { title: 'Pulse Continuo', value: 'pulse' },
  { title: 'Shine Effect', value: 'shine' },
  { title: 'Bounce su Click', value: 'bounce-click' },
  { title: 'Shadow Neon', value: 'neon-shadow' },
]

// Velocita animazione
export const animationSpeedOptions = [
  { title: 'Veloce (0.2s)', value: 'fast' },
  { title: 'Normale (0.4s)', value: 'normal' },
  { title: 'Lenta (0.6s)', value: 'slow' },
  { title: 'Molto lenta (0.8s)', value: 'slower' },
]

// Tipi transizione carousel/slider
export const transitionEffectOptions = [
  { title: 'Slide', value: 'slide' },
  { title: 'Fade', value: 'fade' },
  { title: 'Zoom', value: 'zoom' },
  { title: 'Flip', value: 'flip' },
  { title: 'Cards (sovrapposto)', value: 'cards' },
  { title: 'Creative', value: 'creative' },
]

// Campo riutilizzabile per animazione sezione
export const animationField = {
  name: 'animation',
  title: 'Animazione',
  type: 'string',
  options: {
    list: animationOptions,
    layout: 'radio',
  },
  initialValue: 'fade-up',
}

// Campo riutilizzabile per hover effect
export const hoverEffectField = {
  name: 'hoverEffect',
  title: 'Effetto Hover',
  type: 'string',
  options: {
    list: hoverEffectOptions,
    layout: 'dropdown',
  },
  initialValue: 'lift',
}

// Gruppo di campi animazione per le sezioni
export const animationFieldGroup = {
  name: 'animationOptions',
  title: 'Animazioni',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'entranceAnimation',
      title: 'Animazione Ingresso',
      type: 'string',
      options: { list: animationOptions },
      initialValue: 'fade-up',
    },
    {
      name: 'hoverEffect',
      title: 'Effetto Hover',
      type: 'string',
      options: { list: hoverEffectOptions },
      initialValue: 'lift',
    },
    {
      name: 'animationSpeed',
      title: 'Velocita Animazione',
      type: 'string',
      options: { list: animationSpeedOptions },
      initialValue: 'normal',
    },
    {
      name: 'staggerDelay',
      title: 'Delay Stagger (ms)',
      type: 'number',
      description: 'Delay tra elementi in animazione stagger (100-300 consigliato)',
      initialValue: 100,
      validation: (Rule: any) => Rule.min(0).max(500),
    },
  ],
}

// Campi per effetti avanzati (da aggiungere alle sezioni)
export const advancedEffectsFields = [
  {
    name: 'showFloatingParticles',
    title: 'Mostra Particelle Fluttuanti',
    type: 'boolean',
    description: 'Aggiunge particelle animate sullo sfondo',
    initialValue: false,
  },
  {
    name: 'showGlowLines',
    title: 'Mostra Linee Luminose',
    type: 'boolean',
    description: 'Aggiunge linee animate decorative',
    initialValue: false,
  },
  {
    name: 'buttonGlowEffect',
    title: 'Glow Effect sui Bottoni',
    type: 'boolean',
    description: 'Aggiunge effetto bagliore sui bottoni al hover',
    initialValue: true,
  },
  {
    name: 'backgroundEffect',
    title: 'Effetto Sfondo',
    type: 'string',
    options: { list: backgroundEffectOptions },
    initialValue: 'none',
  },
  {
    name: 'buttonEffect',
    title: 'Effetto Bottoni',
    type: 'string',
    options: { list: buttonEffectOptions },
    initialValue: 'glow-hover',
  },
]

// Export per uso in schemi
export default {
  animationOptions,
  hoverEffectOptions,
  backgroundEffectOptions,
  buttonEffectOptions,
  animationSpeedOptions,
  transitionEffectOptions,
  animationField,
  hoverEffectField,
  animationFieldGroup,
  advancedEffectsFields,
}
