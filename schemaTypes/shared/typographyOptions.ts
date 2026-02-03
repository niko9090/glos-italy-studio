// Typography Options - Opzioni tipografiche riutilizzabili per tutte le sezioni
// Include dimensioni, pesi, colori, allineamento e spacing del testo

// Dimensioni testo per titoli
export const titleSizeOptions = [
  { title: 'Piccolo (24px)', value: 'sm' },
  { title: 'Normale (32px)', value: 'base' },
  { title: 'Grande (40px)', value: 'lg' },
  { title: 'Extra Large (48px)', value: 'xl' },
  { title: 'XXL (56px)', value: '2xl' },
  { title: 'Gigante (72px)', value: '3xl' },
]

// Dimensioni testo per sottotitoli
export const subtitleSizeOptions = [
  { title: 'Piccolo (14px)', value: 'sm' },
  { title: 'Normale (18px)', value: 'base' },
  { title: 'Grande (20px)', value: 'lg' },
  { title: 'Extra Large (24px)', value: 'xl' },
]

// Dimensioni testo per corpo
export const bodySizeOptions = [
  { title: 'Piccolo (14px)', value: 'sm' },
  { title: 'Normale (16px)', value: 'base' },
  { title: 'Grande (18px)', value: 'lg' },
  { title: 'Extra Large (20px)', value: 'xl' },
]

// Peso del font
export const fontWeightOptions = [
  { title: 'Leggero (300)', value: 'light' },
  { title: 'Normale (400)', value: 'normal' },
  { title: 'Medio (500)', value: 'medium' },
  { title: 'Semi-Bold (600)', value: 'semibold' },
  { title: 'Bold (700)', value: 'bold' },
  { title: 'Extra Bold (800)', value: 'extrabold' },
]

// Colori testo
export const textColorOptions = [
  { title: 'Nero', value: 'black' },
  { title: 'Grigio Scuro', value: 'gray-900' },
  { title: 'Grigio', value: 'gray-600' },
  { title: 'Grigio Chiaro', value: 'gray-400' },
  { title: 'Bianco', value: 'white' },
  { title: 'Primary (Blu)', value: 'primary' },
  { title: 'Secondary', value: 'secondary' },
  { title: 'Accent', value: 'accent' },
  { title: 'Verde', value: 'green' },
  { title: 'Rosso', value: 'red' },
  { title: 'Arancione', value: 'orange' },
  { title: 'Viola', value: 'purple' },
  { title: 'Gradiente Blu', value: 'gradient-blue' },
  { title: 'Gradiente Multicolor', value: 'gradient-multi' },
]

// Allineamento testo
export const textAlignOptions = [
  { title: 'Sinistra', value: 'left' },
  { title: 'Centro', value: 'center' },
  { title: 'Destra', value: 'right' },
  { title: 'Giustificato', value: 'justify' },
]

// Letter spacing
export const letterSpacingOptions = [
  { title: 'Stretto (-0.05em)', value: 'tight' },
  { title: 'Normale', value: 'normal' },
  { title: 'Largo (0.05em)', value: 'wide' },
  { title: 'Molto Largo (0.1em)', value: 'wider' },
  { title: 'Tracking (0.2em)', value: 'widest' },
]

// Line height
export const lineHeightOptions = [
  { title: 'Stretto (1.2)', value: 'tight' },
  { title: 'Normale (1.5)', value: 'normal' },
  { title: 'Rilassato (1.75)', value: 'relaxed' },
  { title: 'Largo (2)', value: 'loose' },
]

// Trasformazione testo
export const textTransformOptions = [
  { title: 'Normale', value: 'none' },
  { title: 'MAIUSCOLO', value: 'uppercase' },
  { title: 'minuscolo', value: 'lowercase' },
  { title: 'Capitalizzato', value: 'capitalize' },
]

// Decorazione testo
export const textDecorationOptions = [
  { title: 'Nessuna', value: 'none' },
  { title: 'Sottolineato', value: 'underline' },
  { title: 'Barrato', value: 'line-through' },
]

// Font family
export const fontFamilyOptions = [
  { title: 'Sans Serif (default)', value: 'sans' },
  { title: 'Serif', value: 'serif' },
  { title: 'Monospace', value: 'mono' },
]

// ================================================
// CAMPI RIUTILIZZABILI PER SINGOLI ELEMENTI
// ================================================

// Campo stile titolo
export const titleStyleField = {
  name: 'titleStyle',
  title: 'Stile Titolo',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'size',
      title: 'Dimensione',
      type: 'string',
      options: { list: titleSizeOptions },
      initialValue: 'lg',
    },
    {
      name: 'weight',
      title: 'Peso',
      type: 'string',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    },
    {
      name: 'color',
      title: 'Colore',
      type: 'string',
      options: { list: textColorOptions },
    },
    {
      name: 'align',
      title: 'Allineamento',
      type: 'string',
      options: { list: textAlignOptions },
      initialValue: 'left',
    },
    {
      name: 'letterSpacing',
      title: 'Spaziatura Lettere',
      type: 'string',
      options: { list: letterSpacingOptions },
      initialValue: 'normal',
    },
    {
      name: 'transform',
      title: 'Trasformazione',
      type: 'string',
      options: { list: textTransformOptions },
      initialValue: 'none',
    },
    {
      name: 'shadow',
      title: 'Ombra Testo',
      type: 'boolean',
      description: 'Aggiunge ombra al testo per maggiore impatto',
      initialValue: false,
    },
  ],
}

// Campo stile sottotitolo
export const subtitleStyleField = {
  name: 'subtitleStyle',
  title: 'Stile Sottotitolo',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'size',
      title: 'Dimensione',
      type: 'string',
      options: { list: subtitleSizeOptions },
      initialValue: 'lg',
    },
    {
      name: 'weight',
      title: 'Peso',
      type: 'string',
      options: { list: fontWeightOptions },
      initialValue: 'normal',
    },
    {
      name: 'color',
      title: 'Colore',
      type: 'string',
      options: { list: textColorOptions },
    },
    {
      name: 'opacity',
      title: 'Opacità',
      type: 'number',
      description: 'Da 0 a 100',
      initialValue: 80,
      validation: (Rule: any) => Rule.min(0).max(100),
    },
  ],
}

// Campo stile body/descrizione
export const bodyStyleField = {
  name: 'bodyStyle',
  title: 'Stile Testo',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'size',
      title: 'Dimensione',
      type: 'string',
      options: { list: bodySizeOptions },
      initialValue: 'base',
    },
    {
      name: 'weight',
      title: 'Peso',
      type: 'string',
      options: { list: fontWeightOptions },
      initialValue: 'normal',
    },
    {
      name: 'color',
      title: 'Colore',
      type: 'string',
      options: { list: textColorOptions },
    },
    {
      name: 'lineHeight',
      title: 'Interlinea',
      type: 'string',
      options: { list: lineHeightOptions },
      initialValue: 'normal',
    },
  ],
}

// ================================================
// GRUPPO COMPLETO TIPOGRAFIA PER SEZIONI
// ================================================

export const typographyFieldGroup = {
  name: 'typography',
  title: '🔤 Tipografia',
  type: 'object',
  description: 'Personalizza dimensioni, pesi e colori del testo',
  options: { collapsible: true, collapsed: true },
  fields: [
    // Titolo
    {
      name: 'titleSize',
      title: 'Dimensione Titolo',
      type: 'string',
      options: { list: titleSizeOptions },
      initialValue: 'lg',
    },
    {
      name: 'titleWeight',
      title: 'Peso Titolo',
      type: 'string',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    },
    {
      name: 'titleColor',
      title: 'Colore Titolo',
      type: 'string',
      options: { list: textColorOptions },
    },
    {
      name: 'titleTransform',
      title: 'Trasformazione Titolo',
      type: 'string',
      options: { list: textTransformOptions },
      initialValue: 'none',
    },
    {
      name: 'titleShadow',
      title: 'Ombra Titolo',
      type: 'boolean',
      initialValue: false,
    },
    // Sottotitolo
    {
      name: 'subtitleSize',
      title: 'Dimensione Sottotitolo',
      type: 'string',
      options: { list: subtitleSizeOptions },
      initialValue: 'lg',
    },
    {
      name: 'subtitleWeight',
      title: 'Peso Sottotitolo',
      type: 'string',
      options: { list: fontWeightOptions },
      initialValue: 'normal',
    },
    {
      name: 'subtitleColor',
      title: 'Colore Sottotitolo',
      type: 'string',
      options: { list: textColorOptions },
    },
    // Body
    {
      name: 'bodySize',
      title: 'Dimensione Testo',
      type: 'string',
      options: { list: bodySizeOptions },
      initialValue: 'base',
    },
    {
      name: 'bodyColor',
      title: 'Colore Testo',
      type: 'string',
      options: { list: textColorOptions },
    },
    // Allineamento globale
    {
      name: 'textAlign',
      title: 'Allineamento',
      type: 'string',
      options: {
        list: textAlignOptions,
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    },
  ],
}

// ================================================
// EXPORTS
// ================================================

export default {
  titleSizeOptions,
  subtitleSizeOptions,
  bodySizeOptions,
  fontWeightOptions,
  textColorOptions,
  textAlignOptions,
  letterSpacingOptions,
  lineHeightOptions,
  textTransformOptions,
  textDecorationOptions,
  fontFamilyOptions,
  titleStyleField,
  subtitleStyleField,
  bodyStyleField,
  typographyFieldGroup,
}
