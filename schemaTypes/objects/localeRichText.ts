// Tipo: Rich Text Multilingua con formattazione COMPLETA e effetti
import { defineType, defineArrayMember } from 'sanity'

// Lingue supportate
const supportedLanguages = [
  { id: 'it', title: 'Italiano', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Español' },
]

// ============================================
// COLORI TESTO - Palette completa
// ============================================
const textColors = [
  // Neutri
  { title: '⬛ Nero', value: 'black' },
  { title: '⬜ Bianco', value: 'white' },
  { title: '🔘 Grigio Scuro', value: 'gray-dark' },
  { title: '🔘 Grigio', value: 'gray' },
  { title: '🔘 Grigio Chiaro', value: 'gray-light' },

  // Brand
  { title: '🔵 Blu GLOS (Primary)', value: 'primary' },
  { title: '🔵 Blu Scuro', value: 'primary-dark' },
  { title: '🔵 Blu Chiaro', value: 'primary-light' },

  // Colori vivaci
  { title: '🔴 Rosso', value: 'red' },
  { title: '🔴 Rosso Scuro', value: 'red-dark' },
  { title: '🟠 Arancione', value: 'orange' },
  { title: '🟡 Giallo', value: 'yellow' },
  { title: '🟢 Verde', value: 'green' },
  { title: '🟢 Verde Scuro', value: 'green-dark' },
  { title: '🩵 Ciano', value: 'cyan' },
  { title: '🟣 Viola', value: 'purple' },
  { title: '💜 Viola Scuro', value: 'purple-dark' },
  { title: '🩷 Rosa', value: 'pink' },
  { title: '🤎 Marrone', value: 'brown' },

  // Speciali
  { title: '🪙 Oro', value: 'gold' },
  { title: '🥈 Argento', value: 'silver' },
  { title: '🥉 Bronzo', value: 'bronze' },
]

// ============================================
// COLORI SFONDO/EVIDENZIAZIONE
// ============================================
const highlightColors = [
  { title: '🟡 Giallo', value: 'yellow' },
  { title: '🟢 Verde Chiaro', value: 'lightgreen' },
  { title: '🔵 Azzurro', value: 'lightblue' },
  { title: '🩷 Rosa', value: 'pink' },
  { title: '🟣 Lavanda', value: 'lavender' },
  { title: '🟠 Pesca', value: 'peach' },
  { title: '⬜ Grigio Chiaro', value: 'lightgray' },
  { title: '🔴 Rosso Chiaro', value: 'lightred' },
  { title: '🩵 Ciano Chiaro', value: 'lightcyan' },
  { title: '🟤 Beige', value: 'beige' },
]

// ============================================
// DIMENSIONI FONT - Scala completa
// ============================================
const fontSizes = [
  { title: '10px - Minuscolo', value: 'xs' },
  { title: '12px - Molto Piccolo', value: 'sm' },
  { title: '14px - Piccolo', value: 'base-sm' },
  { title: '16px - Normale', value: 'base' },
  { title: '18px - Medio', value: 'lg' },
  { title: '20px - Grande', value: 'xl' },
  { title: '24px - Molto Grande', value: '2xl' },
  { title: '30px - Extra Grande', value: '3xl' },
  { title: '36px - Enorme', value: '4xl' },
  { title: '48px - Gigante', value: '5xl' },
  { title: '60px - Massimo', value: '6xl' },
  { title: '72px - Display', value: '7xl' },
  { title: '96px - Hero', value: '8xl' },
  { title: '128px - Mega', value: '9xl' },
]

// ============================================
// FONT FAMILY
// ============================================
const fontFamilies = [
  { title: 'Default (Sistema)', value: 'default' },
  { title: 'Sans Serif (Pulito)', value: 'sans' },
  { title: 'Serif (Elegante)', value: 'serif' },
  { title: 'Monospace (Codice)', value: 'mono' },
  { title: 'Display (Titoli)', value: 'display' },
  { title: 'Handwriting (Scritto a mano)', value: 'handwriting' },
]

// ============================================
// FONT WEIGHT
// ============================================
const fontWeights = [
  { title: 'Thin (100)', value: '100' },
  { title: 'Extra Light (200)', value: '200' },
  { title: 'Light (300)', value: '300' },
  { title: 'Normal (400)', value: '400' },
  { title: 'Medium (500)', value: '500' },
  { title: 'Semi Bold (600)', value: '600' },
  { title: 'Bold (700)', value: '700' },
  { title: 'Extra Bold (800)', value: '800' },
  { title: 'Black (900)', value: '900' },
]

// ============================================
// LETTER SPACING
// ============================================
const letterSpacings = [
  { title: 'Molto Stretto (-0.05em)', value: 'tighter' },
  { title: 'Stretto (-0.025em)', value: 'tight' },
  { title: 'Normale', value: 'normal' },
  { title: 'Largo (0.025em)', value: 'wide' },
  { title: 'Molto Largo (0.05em)', value: 'wider' },
  { title: 'Larghissimo (0.1em)', value: 'widest' },
]

// ============================================
// LINE HEIGHT
// ============================================
const lineHeights = [
  { title: 'Nessuna (1)', value: 'none' },
  { title: 'Stretta (1.25)', value: 'tight' },
  { title: 'Compatta (1.375)', value: 'snug' },
  { title: 'Normale (1.5)', value: 'normal' },
  { title: 'Rilassata (1.625)', value: 'relaxed' },
  { title: 'Ampia (2)', value: 'loose' },
]

// ============================================
// EFFETTI TESTO - Ombre
// ============================================
const textShadows = [
  { title: 'Nessuna', value: 'none' },
  { title: 'Leggera', value: 'sm' },
  { title: 'Media', value: 'md' },
  { title: 'Forte', value: 'lg' },
  { title: 'Molto Forte', value: 'xl' },
  { title: 'Neon Blu', value: 'neon-blue' },
  { title: 'Neon Verde', value: 'neon-green' },
  { title: 'Neon Rosa', value: 'neon-pink' },
  { title: 'Neon Oro', value: 'neon-gold' },
  { title: 'Glow Bianco', value: 'glow-white' },
  { title: 'Ombra Lunga', value: 'long' },
  { title: 'Ombra 3D', value: '3d' },
  { title: 'Retro', value: 'retro' },
]

// ============================================
// EFFETTI TESTO - Gradienti
// ============================================
const textGradients = [
  { title: 'Nessuno', value: 'none' },
  { title: '🌅 Tramonto (Arancio → Rosa)', value: 'sunset' },
  { title: '🌊 Oceano (Blu → Ciano)', value: 'ocean' },
  { title: '🌲 Foresta (Verde → Smeraldo)', value: 'forest' },
  { title: '🔥 Fuoco (Rosso → Arancio)', value: 'fire' },
  { title: '💜 Aurora (Viola → Rosa)', value: 'aurora' },
  { title: '🪙 Oro (Giallo → Arancio)', value: 'gold' },
  { title: '🥈 Argento (Grigio Chiaro → Bianco)', value: 'silver' },
  { title: '🌈 Arcobaleno', value: 'rainbow' },
  { title: '🌙 Notte (Blu Scuro → Viola)', value: 'night' },
  { title: '🍭 Candy (Rosa → Viola → Blu)', value: 'candy' },
  { title: '⚡ Elettrico (Giallo → Verde)', value: 'electric' },
  { title: '🖤 Dark Mode (Grigio → Nero)', value: 'dark' },
]

// ============================================
// ANIMAZIONI TESTO
// ============================================
const textAnimations = [
  { title: 'Nessuna', value: 'none' },
  { title: '✨ Fade In', value: 'fade-in' },
  { title: '⬆️ Slide Up', value: 'slide-up' },
  { title: '⬇️ Slide Down', value: 'slide-down' },
  { title: '⬅️ Slide Left', value: 'slide-left' },
  { title: '➡️ Slide Right', value: 'slide-right' },
  { title: '📈 Zoom In', value: 'zoom-in' },
  { title: '📉 Zoom Out', value: 'zoom-out' },
  { title: '🔄 Flip', value: 'flip' },
  { title: '💫 Bounce', value: 'bounce' },
  { title: '🌀 Rotate', value: 'rotate' },
  { title: '💓 Pulse', value: 'pulse' },
  { title: '🌊 Wave', value: 'wave' },
  { title: '⌨️ Typewriter', value: 'typewriter' },
  { title: '✏️ Scrittura', value: 'draw' },
  { title: '🌟 Glitter', value: 'glitter' },
  { title: '🔥 Shake', value: 'shake' },
  { title: '👻 Float', value: 'float' },
]

// ============================================
// DECORAZIONI TESTO SPECIALI
// ============================================
const textDecorations = [
  { title: 'Nessuna', value: 'none' },
  { title: 'Sottolineato', value: 'underline' },
  { title: 'Sottolineato Ondulato', value: 'underline-wavy' },
  { title: 'Sottolineato Doppio', value: 'underline-double' },
  { title: 'Sottolineato Punteggiato', value: 'underline-dotted' },
  { title: 'Sottolineato Tratteggiato', value: 'underline-dashed' },
  { title: 'Sopralineato', value: 'overline' },
  { title: 'Barrato', value: 'line-through' },
]

// ============================================
// TRASFORMAZIONI TESTO
// ============================================
const textTransforms = [
  { title: 'Normale', value: 'none' },
  { title: 'MAIUSCOLO', value: 'uppercase' },
  { title: 'minuscolo', value: 'lowercase' },
  { title: 'Prima Lettera Maiuscola', value: 'capitalize' },
  { title: 'Maiuscoletto', value: 'small-caps' },
]

// ============================================
// EFFETTI BLOCCO - Sfondo
// ============================================
const blockBackgrounds = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Bianco', value: 'white' },
  { title: 'Grigio Chiaro', value: 'gray-light' },
  { title: 'Grigio', value: 'gray' },
  { title: 'Nero', value: 'black' },
  { title: 'Blu GLOS', value: 'primary' },
  { title: 'Blu Chiaro', value: 'primary-light' },
  { title: 'Verde', value: 'green' },
  { title: 'Rosso', value: 'red' },
  { title: 'Giallo', value: 'yellow' },
  { title: 'Gradiente Orizzontale', value: 'gradient-h' },
  { title: 'Gradiente Verticale', value: 'gradient-v' },
  { title: 'Gradiente Diagonale', value: 'gradient-d' },
  { title: 'Glass Effect', value: 'glass' },
]

// ============================================
// EFFETTI BLOCCO - Bordi
// ============================================
const blockBorders = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Sottile', value: 'thin' },
  { title: 'Medio', value: 'medium' },
  { title: 'Spesso', value: 'thick' },
  { title: 'Solo Sinistra', value: 'left' },
  { title: 'Solo Destra', value: 'right' },
  { title: 'Solo Sopra', value: 'top' },
  { title: 'Solo Sotto', value: 'bottom' },
  { title: 'Arrotondato', value: 'rounded' },
  { title: 'Pillola', value: 'pill' },
  { title: 'Tratteggiato', value: 'dashed' },
  { title: 'Punteggiato', value: 'dotted' },
]

// ============================================
// EFFETTI BLOCCO - Ombra
// ============================================
const blockShadows = [
  { title: 'Nessuna', value: 'none' },
  { title: 'Leggera', value: 'sm' },
  { title: 'Media', value: 'md' },
  { title: 'Forte', value: 'lg' },
  { title: 'Molto Forte', value: 'xl' },
  { title: 'Interna', value: 'inner' },
  { title: 'Colorata', value: 'colored' },
]

// ============================================
// PADDING BLOCCO
// ============================================
const blockPaddings = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Piccolo (8px)', value: 'sm' },
  { title: 'Medio (16px)', value: 'md' },
  { title: 'Grande (24px)', value: 'lg' },
  { title: 'Extra Grande (32px)', value: 'xl' },
]

// ============================================
// CONFIGURAZIONE BLOCK CONTENT
// ============================================
const richTextBlock = defineArrayMember({
  type: 'block',

  // STILI DI PARAGRAFO - Estesi
  styles: [
    { title: 'Normale', value: 'normal' },
    { title: 'Lead (Intro grande)', value: 'lead' },
    { title: 'Titolo Hero', value: 'hero' },
    { title: 'Titolo 1', value: 'h1' },
    { title: 'Titolo 2', value: 'h2' },
    { title: 'Titolo 3', value: 'h3' },
    { title: 'Titolo 4', value: 'h4' },
    { title: 'Titolo 5', value: 'h5' },
    { title: 'Titolo 6', value: 'h6' },
    { title: 'Sottotitolo', value: 'subtitle' },
    { title: 'Citazione', value: 'blockquote' },
    { title: 'Citazione Grande', value: 'blockquote-large' },
    { title: 'Callout', value: 'callout' },
    { title: 'Caption (Didascalia)', value: 'caption' },
    { title: 'Piccolo', value: 'small' },
    { title: 'Codice', value: 'code-block' },
  ],

  // LISTE
  lists: [
    { title: 'Elenco Puntato', value: 'bullet' },
    { title: 'Elenco Numerato', value: 'number' },
    { title: 'Checklist', value: 'check' },
    { title: 'Frecce', value: 'arrow' },
    { title: 'Stelle', value: 'star' },
  ],

  // MARKS - Decoratori e Annotazioni
  marks: {
    // Decoratori base (toggle on/off)
    decorators: [
      { title: 'Grassetto', value: 'strong' },
      { title: 'Corsivo', value: 'em' },
      { title: 'Sottolineato', value: 'underline' },
      { title: 'Barrato', value: 'strike-through' },
      { title: 'Codice Inline', value: 'code' },
      { title: 'Apice (superscript)', value: 'sup' },
      { title: 'Pedice (subscript)', value: 'sub' },
      { title: 'Testo Marcato', value: 'mark' },
      { title: 'Testo Piccolo', value: 'small-text' },
      { title: 'Abbreviazione', value: 'abbr' },
      { title: 'Keyboard', value: 'kbd' },
    ],

    // Annotazioni (con opzioni)
    annotations: [
      // ========== LINK ==========
      {
        name: 'link',
        type: 'object',
        title: '🔗 Link',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (Rule: any) => Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
              allowRelative: true,
            }),
          },
          {
            name: 'openInNewTab',
            type: 'boolean',
            title: 'Apri in nuova scheda',
            initialValue: false,
          },
        ],
      },

      // ========== COLORE TESTO ==========
      {
        name: 'textColor',
        type: 'object',
        title: '🎨 Colore Testo',
        fields: [
          {
            name: 'color',
            type: 'string',
            title: 'Colore',
            options: { list: textColors },
          },
        ],
      },

      // ========== EVIDENZIAZIONE ==========
      {
        name: 'highlight',
        type: 'object',
        title: '🖍️ Evidenzia',
        fields: [
          {
            name: 'color',
            type: 'string',
            title: 'Colore Evidenziatore',
            options: { list: highlightColors },
            initialValue: 'yellow',
          },
        ],
      },

      // ========== DIMENSIONE FONT ==========
      {
        name: 'fontSize',
        type: 'object',
        title: '📏 Dimensione Font',
        fields: [
          {
            name: 'size',
            type: 'string',
            title: 'Dimensione',
            options: { list: fontSizes },
          },
        ],
      },

      // ========== FONT FAMILY ==========
      {
        name: 'fontFamily',
        type: 'object',
        title: '🔤 Font',
        fields: [
          {
            name: 'family',
            type: 'string',
            title: 'Tipo di Font',
            options: { list: fontFamilies },
          },
        ],
      },

      // ========== FONT WEIGHT ==========
      {
        name: 'fontWeight',
        type: 'object',
        title: '💪 Spessore Font',
        fields: [
          {
            name: 'weight',
            type: 'string',
            title: 'Spessore',
            options: { list: fontWeights },
          },
        ],
      },

      // ========== LETTER SPACING ==========
      {
        name: 'letterSpacing',
        type: 'object',
        title: '↔️ Spaziatura Lettere',
        fields: [
          {
            name: 'spacing',
            type: 'string',
            title: 'Spaziatura',
            options: { list: letterSpacings },
          },
        ],
      },

      // ========== LINE HEIGHT ==========
      {
        name: 'lineHeight',
        type: 'object',
        title: '↕️ Altezza Riga',
        fields: [
          {
            name: 'height',
            type: 'string',
            title: 'Altezza',
            options: { list: lineHeights },
          },
        ],
      },

      // ========== ALLINEAMENTO ==========
      {
        name: 'textAlign',
        type: 'object',
        title: '📐 Allineamento',
        fields: [
          {
            name: 'align',
            type: 'string',
            title: 'Allineamento',
            options: {
              list: [
                { title: '⬅️ Sinistra', value: 'left' },
                { title: '↔️ Centro', value: 'center' },
                { title: '➡️ Destra', value: 'right' },
                { title: '⬜ Giustificato', value: 'justify' },
              ],
            },
          },
        ],
      },

      // ========== TRASFORMAZIONE TESTO ==========
      {
        name: 'textTransform',
        type: 'object',
        title: '🔠 Trasformazione',
        fields: [
          {
            name: 'transform',
            type: 'string',
            title: 'Tipo',
            options: { list: textTransforms },
          },
        ],
      },

      // ========== DECORAZIONE TESTO ==========
      {
        name: 'textDecoration',
        type: 'object',
        title: '〰️ Decorazione',
        fields: [
          {
            name: 'decoration',
            type: 'string',
            title: 'Tipo',
            options: { list: textDecorations },
          },
          {
            name: 'color',
            type: 'string',
            title: 'Colore Decorazione',
            options: { list: textColors },
          },
        ],
      },

      // ========== OMBRA TESTO ==========
      {
        name: 'textShadow',
        type: 'object',
        title: '👥 Ombra Testo',
        fields: [
          {
            name: 'shadow',
            type: 'string',
            title: 'Tipo Ombra',
            options: { list: textShadows },
          },
          {
            name: 'color',
            type: 'string',
            title: 'Colore Ombra',
            options: { list: textColors },
          },
        ],
      },

      // ========== GRADIENTE TESTO ==========
      {
        name: 'textGradient',
        type: 'object',
        title: '🌈 Gradiente Testo',
        fields: [
          {
            name: 'gradient',
            type: 'string',
            title: 'Tipo Gradiente',
            options: { list: textGradients },
          },
        ],
      },

      // ========== ANIMAZIONE TESTO ==========
      {
        name: 'textAnimation',
        type: 'object',
        title: '✨ Animazione',
        fields: [
          {
            name: 'animation',
            type: 'string',
            title: 'Tipo Animazione',
            options: { list: textAnimations },
          },
          {
            name: 'duration',
            type: 'string',
            title: 'Durata',
            options: {
              list: [
                { title: 'Veloce (0.3s)', value: 'fast' },
                { title: 'Normale (0.5s)', value: 'normal' },
                { title: 'Lenta (1s)', value: 'slow' },
                { title: 'Molto Lenta (2s)', value: 'slower' },
              ],
            },
            initialValue: 'normal',
          },
          {
            name: 'delay',
            type: 'string',
            title: 'Ritardo',
            options: {
              list: [
                { title: 'Nessuno', value: '0' },
                { title: '0.2s', value: '200' },
                { title: '0.5s', value: '500' },
                { title: '1s', value: '1000' },
                { title: '2s', value: '2000' },
              ],
            },
            initialValue: '0',
          },
        ],
      },

      // ========== OUTLINE TESTO ==========
      {
        name: 'textOutline',
        type: 'object',
        title: '⭕ Contorno Testo',
        fields: [
          {
            name: 'width',
            type: 'string',
            title: 'Spessore',
            options: {
              list: [
                { title: 'Sottile (1px)', value: 'thin' },
                { title: 'Medio (2px)', value: 'medium' },
                { title: 'Spesso (3px)', value: 'thick' },
              ],
            },
          },
          {
            name: 'color',
            type: 'string',
            title: 'Colore Contorno',
            options: { list: textColors },
          },
        ],
      },

      // ========== BADGE/TAG ==========
      {
        name: 'badge',
        type: 'object',
        title: '🏷️ Badge',
        fields: [
          {
            name: 'variant',
            type: 'string',
            title: 'Stile',
            options: {
              list: [
                { title: 'Default', value: 'default' },
                { title: 'Primary (Blu)', value: 'primary' },
                { title: 'Success (Verde)', value: 'success' },
                { title: 'Warning (Arancio)', value: 'warning' },
                { title: 'Danger (Rosso)', value: 'danger' },
                { title: 'Info (Ciano)', value: 'info' },
                { title: 'Outline', value: 'outline' },
              ],
            },
          },
        ],
      },

      // ========== TOOLTIP ==========
      {
        name: 'tooltip',
        type: 'object',
        title: '💬 Tooltip',
        fields: [
          {
            name: 'text',
            type: 'string',
            title: 'Testo Tooltip',
          },
          {
            name: 'position',
            type: 'string',
            title: 'Posizione',
            options: {
              list: [
                { title: 'Sopra', value: 'top' },
                { title: 'Sotto', value: 'bottom' },
                { title: 'Sinistra', value: 'left' },
                { title: 'Destra', value: 'right' },
              ],
            },
            initialValue: 'top',
          },
        ],
      },
    ],
  },
})

// ============================================
// BLOCCO CON EFFETTI (per effetti a livello blocco)
// ============================================
const blockWithEffects = defineArrayMember({
  type: 'object',
  name: 'styledBlock',
  title: '🎨 Blocco Stilizzato',
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Contenuto',
      of: [richTextBlock],
    },
    {
      name: 'background',
      type: 'string',
      title: 'Sfondo Blocco',
      options: { list: blockBackgrounds },
      initialValue: 'none',
    },
    {
      name: 'backgroundGradient',
      type: 'object',
      title: 'Gradiente Sfondo',
      fields: [
        {
          name: 'from',
          type: 'string',
          title: 'Colore Iniziale',
          options: { list: textColors },
        },
        {
          name: 'to',
          type: 'string',
          title: 'Colore Finale',
          options: { list: textColors },
        },
        {
          name: 'direction',
          type: 'string',
          title: 'Direzione',
          options: {
            list: [
              { title: 'Orizzontale →', value: 'to-r' },
              { title: 'Orizzontale ←', value: 'to-l' },
              { title: 'Verticale ↓', value: 'to-b' },
              { title: 'Verticale ↑', value: 'to-t' },
              { title: 'Diagonale ↘', value: 'to-br' },
              { title: 'Diagonale ↙', value: 'to-bl' },
            ],
          },
        },
      ],
    },
    {
      name: 'border',
      type: 'string',
      title: 'Bordo',
      options: { list: blockBorders },
      initialValue: 'none',
    },
    {
      name: 'borderColor',
      type: 'string',
      title: 'Colore Bordo',
      options: { list: textColors },
    },
    {
      name: 'shadow',
      type: 'string',
      title: 'Ombra',
      options: { list: blockShadows },
      initialValue: 'none',
    },
    {
      name: 'padding',
      type: 'string',
      title: 'Padding',
      options: { list: blockPaddings },
      initialValue: 'md',
    },
    {
      name: 'animation',
      type: 'string',
      title: 'Animazione Blocco',
      options: { list: textAnimations },
      initialValue: 'none',
    },
  ],
  preview: {
    select: {
      content: 'content',
      background: 'background',
    },
    prepare({ content, background }: any) {
      const text = content?.[0]?.children?.[0]?.text || 'Blocco stilizzato'
      return {
        title: text,
        subtitle: `Sfondo: ${background || 'nessuno'}`,
      }
    },
  },
})

// ============================================
// EXPORT TIPO PRINCIPALE
// ============================================
export default defineType({
  name: 'localeRichText',
  title: 'Testo Formattato Multilingua',
  type: 'object',
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: [richTextBlock, blockWithEffects],
  })),
})
