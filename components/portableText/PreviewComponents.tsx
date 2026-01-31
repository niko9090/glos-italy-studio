// Preview Components per Portable Text in Sanity Studio
// Questi componenti mostrano gli stili direttamente nell'editor
import React from 'react'

// ============================================
// MAPPE COLORI
// ============================================
const textColorMap: Record<string, string> = {
  'black': '#000000',
  'white': '#ffffff',
  'gray-dark': '#374151',
  'gray': '#6b7280',
  'gray-light': '#9ca3af',
  'primary': '#0047AB',
  'primary-dark': '#003380',
  'primary-light': '#3373c4',
  'red': '#ef4444',
  'red-dark': '#b91c1c',
  'orange': '#f97316',
  'yellow': '#eab308',
  'green': '#22c55e',
  'green-dark': '#15803d',
  'lime': '#84cc16',
  'cyan': '#06b6d4',
  'sky': '#0ea5e9',
  'purple': '#a855f7',
  'purple-dark': '#7c3aed',
  'pink': '#ec4899',
  'pink-hot': '#f43f5e',
  'brown': '#92400e',
  'gold': '#d97706',
  'silver': '#9ca3af',
  'bronze': '#b45309',
  'diamond': '#60a5fa',
  'rainbow': 'linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6)',
}

const highlightColorMap: Record<string, string> = {
  'yellow': '#fef08a',
  'lightgreen': '#bbf7d0',
  'lightblue': '#bfdbfe',
  'pink': '#fbcfe8',
  'lavender': '#e9d5ff',
  'peach': '#fed7aa',
  'lightgray': '#e5e7eb',
  'lightred': '#fecaca',
  'lightcyan': '#a5f3fc',
  'beige': '#fef3c7',
  'gold-light': '#fde68a',
  'violet-light': '#ddd6fe',
}

const fontSizeMap: Record<string, string> = {
  'xs': '10px',
  'sm': '12px',
  'base-sm': '14px',
  'base': '16px',
  'lg': '18px',
  'xl': '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px',
}

const fontFamilyMap: Record<string, string> = {
  'default': 'inherit',
  'sans': 'system-ui, -apple-system, sans-serif',
  'serif': 'Georgia, Cambria, "Times New Roman", serif',
  'mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
  'display': 'system-ui, -apple-system, sans-serif',
  'handwriting': 'Caveat, cursive, system-ui',
}

const gradientMap: Record<string, string> = {
  'sunset': 'linear-gradient(90deg, #f97316, #ec4899)',
  'ocean': 'linear-gradient(90deg, #3b82f6, #06b6d4)',
  'forest': 'linear-gradient(90deg, #22c55e, #10b981)',
  'fire': 'linear-gradient(90deg, #ef4444, #f97316)',
  'aurora': 'linear-gradient(90deg, #a855f7, #ec4899)',
  'gold': 'linear-gradient(90deg, #eab308, #f97316)',
  'silver': 'linear-gradient(90deg, #d1d5db, #f3f4f6)',
  'rainbow': 'linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6)',
  'night': 'linear-gradient(90deg, #1e3a8a, #7c3aed)',
  'candy': 'linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)',
  'electric': 'linear-gradient(90deg, #eab308, #22c55e)',
  'dark': 'linear-gradient(90deg, #4b5563, #1f2937)',
  'ice': 'linear-gradient(90deg, #f0f9ff, #bae6fd)',
  'citrus': 'linear-gradient(90deg, #f97316, #eab308)',
  'grape': 'linear-gradient(90deg, #7c3aed, #3b82f6)',
  'sakura': 'linear-gradient(90deg, #fbcfe8, #fdf2f8)',
}

const shadowMap: Record<string, string> = {
  'sm': '1px 1px 2px rgba(0,0,0,0.2)',
  'md': '2px 2px 4px rgba(0,0,0,0.3)',
  'lg': '3px 3px 6px rgba(0,0,0,0.4)',
  'xl': '4px 4px 8px rgba(0,0,0,0.5)',
  'neon-blue': '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6',
  'neon-green': '0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 30px #22c55e',
  'neon-pink': '0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899',
  'neon-gold': '0 0 10px #eab308, 0 0 20px #eab308, 0 0 30px #eab308',
  'neon-red': '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444',
  'neon-purple': '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7',
  'glow-white': '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6)',
  'long': '5px 5px 0 rgba(0,0,0,0.3)',
  '3d': '1px 1px 0 #ccc, 2px 2px 0 #bbb, 3px 3px 0 #aaa',
  'retro': '3px 3px 0 #000',
  'inset': 'inset 1px 1px 2px rgba(0,0,0,0.3)',
}

const iconMap: Record<string, string> = {
  'arrow-right': '→',
  'arrow-left': '←',
  'arrow-up': '↑',
  'arrow-down': '↓',
  'arrow-diagonal': '↗',
  'arrow-filled': '➜',
  'triangle-right': '▶',
  'triangle-left': '◀',
  'check': '✓',
  'check-filled': '✔',
  'x': '✗',
  'x-filled': '✘',
  'warning': '⚠',
  'stop': '⛔',
  'info': 'ℹ',
  'question': '❓',
  'exclamation': '❗',
  'star': '★',
  'star-empty': '☆',
  'star-4': '✦',
  'star-sparkle': '✧',
  'heart': '♥',
  'heart-empty': '♡',
  'heart-sparkle': '💖',
  'circle': '●',
  'circle-empty': '○',
  'square': '■',
  'square-empty': '□',
  'diamond': '◆',
  'diamond-empty': '◇',
  'phone': '📞',
  'email': '✉',
  'location': '📍',
  'web': '🌐',
  'business': '💼',
  'calendar': '📅',
  'clock': '⏰',
  'money': '💰',
  'target': '🎯',
  'trophy': '🏆',
  'lightning': '⚡',
  'gear': '⚙',
  'lock': '🔒',
  'unlock': '🔓',
  'bell': '🔔',
  'bulb': '💡',
  'rocket': '🚀',
  'fire': '🔥',
  'sparkles': '✨',
  'sun': '☀',
  'moon': '🌙',
  'cloud': '☁',
  'umbrella': '☂',
  'snowflake': '❄',
  'leaf': '🍃',
  'flower': '🌸',
  'tree': '🌳',
  'wave': '🌊',
  'mountain': '⛰',
  'music': '♪',
  'camera': '📷',
  'gift': '🎁',
  'party': '🎉',
  'flag': '🚩',
  'pin': '📌',
  'bookmark': '🔖',
  'tag': '🏷',
  'link': '🔗',
  'infinite': '∞',
  'percent': '%',
  'plus': '+',
  'minus': '−',
  'multiply': '×',
  'divide': '÷',
  'equal': '=',
  'copyright': '©',
  'registered': '®',
  'trademark': '™',
}

// ============================================
// COMPONENTI PREVIEW ANNOTAZIONI
// ============================================

// Colore Testo
export const TextColorPreview = (props: any) => {
  const { children, value } = props
  const color = textColorMap[value?.color] || value?.color || 'inherit'

  // Per rainbow, usa gradiente
  if (value?.color === 'rainbow') {
    return (
      <span style={{
        background: gradientMap['rainbow'],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {children}
      </span>
    )
  }

  return <span style={{ color }}>{children}</span>
}

// Evidenziazione
export const HighlightPreview = (props: any) => {
  const { children, value } = props
  const bgColor = highlightColorMap[value?.color] || '#fef08a'

  return (
    <span style={{
      backgroundColor: bgColor,
      padding: '0.1em 0.2em',
      borderRadius: '2px',
    }}>
      {children}
    </span>
  )
}

// Dimensione Font
export const FontSizePreview = (props: any) => {
  const { children, value } = props
  const fontSize = fontSizeMap[value?.size] || 'inherit'

  return <span style={{ fontSize }}>{children}</span>
}

// Font Family
export const FontFamilyPreview = (props: any) => {
  const { children, value } = props
  const fontFamily = fontFamilyMap[value?.family] || 'inherit'

  return <span style={{ fontFamily }}>{children}</span>
}

// Font Weight
export const FontWeightPreview = (props: any) => {
  const { children, value } = props
  const fontWeight = value?.weight || 'inherit'

  return <span style={{ fontWeight }}>{children}</span>
}

// Gradiente Testo
export const GradientPreview = (props: any) => {
  const { children, value } = props
  const gradient = gradientMap[value?.gradient] || gradientMap['ocean']

  if (!value?.gradient || value?.gradient === 'none') {
    return <span>{children}</span>
  }

  return (
    <span style={{
      background: gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {children}
    </span>
  )
}

// Ombra Testo
export const TextShadowPreview = (props: any) => {
  const { children, value } = props
  const shadow = shadowMap[value?.shadow] || 'none'

  if (!value?.shadow || value?.shadow === 'none') {
    return <span>{children}</span>
  }

  return <span style={{ textShadow: shadow }}>{children}</span>
}

// Outline Testo
export const TextOutlinePreview = (props: any) => {
  const { children, value } = props
  const color = textColorMap[value?.color] || '#000000'
  const widthMap: Record<string, string> = {
    'thin': '0.5px',
    'normal': '1px',
    'thick': '2px',
  }
  const width = widthMap[value?.width] || '1px'

  return (
    <span style={{
      WebkitTextStroke: `${width} ${color}`,
    }}>
      {children}
    </span>
  )
}

// Animazione
export const AnimationPreview = (props: any) => {
  const { children, value } = props

  // Mostra un badge per indicare l'animazione
  return (
    <span style={{ position: 'relative' }}>
      {children}
      {value?.animation && value.animation !== 'none' && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          fontSize: '10px',
          background: '#8b5cf6',
          color: 'white',
          padding: '1px 4px',
          borderRadius: '4px',
          lineHeight: 1,
        }}>
          ✨
        </span>
      )}
    </span>
  )
}

// Icona Inline
export const InlineIconPreview = (props: any) => {
  const { children, value } = props
  const icon = iconMap[value?.icon] || value?.icon || ''
  const color = textColorMap[value?.color] || 'inherit'
  const sizeMap: Record<string, string> = {
    'sm': '0.875em',
    'base': '1em',
    'lg': '1.25em',
    'xl': '1.5em',
  }
  const fontSize = sizeMap[value?.size] || '1em'

  return (
    <span>
      <span style={{ color, fontSize, marginRight: '0.25em' }}>{icon}</span>
      {children}
    </span>
  )
}

// Button Style
export const ButtonStylePreview = (props: any) => {
  const { children, value } = props
  const variant = value?.variant || 'primary'

  const variantStyles: Record<string, React.CSSProperties> = {
    'primary': {
      background: '#0047AB',
      color: 'white',
      padding: '0.25em 0.75em',
      borderRadius: '4px',
      display: 'inline-block',
    },
    'secondary': {
      background: '#6b7280',
      color: 'white',
      padding: '0.25em 0.75em',
      borderRadius: '4px',
      display: 'inline-block',
    },
    'outline': {
      background: 'transparent',
      color: '#0047AB',
      border: '2px solid #0047AB',
      padding: '0.25em 0.75em',
      borderRadius: '4px',
      display: 'inline-block',
    },
    'ghost': {
      background: 'rgba(0, 71, 171, 0.1)',
      color: '#0047AB',
      padding: '0.25em 0.75em',
      borderRadius: '4px',
      display: 'inline-block',
    },
  }

  return <span style={variantStyles[variant] || variantStyles['primary']}>{children}</span>
}

// Inline Border
export const InlineBorderPreview = (props: any) => {
  const { children, value } = props
  const color = textColorMap[value?.color] || '#0047AB'
  const styleMap: Record<string, string> = {
    'solid': 'solid',
    'dashed': 'dashed',
    'dotted': 'dotted',
    'double': 'double',
  }
  const borderStyle = styleMap[value?.style] || 'solid'
  const widthMap: Record<string, string> = {
    'thin': '1px',
    'normal': '2px',
    'thick': '3px',
  }
  const borderWidth = widthMap[value?.width] || '2px'

  return (
    <span style={{
      border: `${borderWidth} ${borderStyle} ${color}`,
      padding: '0.1em 0.3em',
      borderRadius: '4px',
    }}>
      {children}
    </span>
  )
}

// Letter Spacing
export const LetterSpacingPreview = (props: any) => {
  const { children, value } = props
  const spacingMap: Record<string, string> = {
    'tighter': '-0.05em',
    'tight': '-0.025em',
    'normal': '0',
    'wide': '0.025em',
    'wider': '0.05em',
    'widest': '0.1em',
  }
  const letterSpacing = spacingMap[value?.spacing] || '0'

  return <span style={{ letterSpacing }}>{children}</span>
}

// Line Height
export const LineHeightPreview = (props: any) => {
  const { children, value } = props
  const heightMap: Record<string, string> = {
    'none': '1',
    'tight': '1.25',
    'snug': '1.375',
    'normal': '1.5',
    'relaxed': '1.625',
    'loose': '2',
  }
  const lineHeight = heightMap[value?.height] || '1.5'

  return <span style={{ lineHeight }}>{children}</span>
}

// Text Transform
export const TextTransformPreview = (props: any) => {
  const { children, value } = props
  const transformMap: Record<string, string> = {
    'none': 'none',
    'uppercase': 'uppercase',
    'lowercase': 'lowercase',
    'capitalize': 'capitalize',
    'small-caps': 'none', // small-caps usa fontVariant
  }

  if (value?.transform === 'small-caps') {
    return <span style={{ fontVariant: 'small-caps' }}>{children}</span>
  }

  return <span style={{ textTransform: transformMap[value?.transform] as any || 'none' }}>{children}</span>
}

// Text Decoration
export const TextDecorationPreview = (props: any) => {
  const { children, value } = props
  const decorationMap: Record<string, React.CSSProperties> = {
    'none': {},
    'underline': { textDecoration: 'underline' },
    'underline-wavy': { textDecoration: 'underline wavy' },
    'underline-double': { textDecoration: 'underline double' },
    'underline-dotted': { textDecoration: 'underline dotted' },
    'underline-dashed': { textDecoration: 'underline dashed' },
    'overline': { textDecoration: 'overline' },
    'line-through': { textDecoration: 'line-through' },
  }

  return <span style={decorationMap[value?.decoration] || {}}>{children}</span>
}

// Link Preview
export const LinkPreview = (props: any) => {
  const { children, value } = props

  return (
    <span style={{
      color: '#0047AB',
      textDecoration: 'underline',
      cursor: 'pointer',
    }}>
      {children}
      {value?.openInNewTab && <span style={{ fontSize: '0.75em', marginLeft: '2px' }}>↗</span>}
    </span>
  )
}

// ============================================
// COMPONENTI PREVIEW DECORATORI
// ============================================

export const StrongPreview = (props: any) => (
  <strong style={{ fontWeight: 'bold' }}>{props.children}</strong>
)

export const EmPreview = (props: any) => (
  <em style={{ fontStyle: 'italic' }}>{props.children}</em>
)

export const UnderlinePreview = (props: any) => (
  <span style={{ textDecoration: 'underline' }}>{props.children}</span>
)

export const StrikeThroughPreview = (props: any) => (
  <span style={{ textDecoration: 'line-through' }}>{props.children}</span>
)

export const CodePreview = (props: any) => (
  <code style={{
    fontFamily: 'ui-monospace, monospace',
    backgroundColor: '#f3f4f6',
    padding: '0.1em 0.3em',
    borderRadius: '3px',
    fontSize: '0.9em',
  }}>
    {props.children}
  </code>
)

export const SupPreview = (props: any) => (
  <sup style={{ fontSize: '0.75em', verticalAlign: 'super' }}>{props.children}</sup>
)

export const SubPreview = (props: any) => (
  <sub style={{ fontSize: '0.75em', verticalAlign: 'sub' }}>{props.children}</sub>
)

export const MarkPreview = (props: any) => (
  <mark style={{
    backgroundColor: '#fef08a',
    padding: '0.1em 0.2em',
    borderRadius: '2px',
  }}>
    {props.children}
  </mark>
)

export const SmallTextPreview = (props: any) => (
  <small style={{ fontSize: '0.875em' }}>{props.children}</small>
)

export const AbbrPreview = (props: any) => (
  <abbr style={{
    textDecoration: 'underline dotted',
    cursor: 'help',
  }}>
    {props.children}
  </abbr>
)

export const KbdPreview = (props: any) => (
  <kbd style={{
    fontFamily: 'ui-monospace, monospace',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '0.1em 0.4em',
    fontSize: '0.875em',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
  }}>
    {props.children}
  </kbd>
)

// ============================================
// COMPONENTI PREVIEW STILI BLOCCO
// ============================================

export const BlockStylePreview = {
  normal: (props: any) => <p>{props.children}</p>,
  lead: (props: any) => <p style={{ fontSize: '1.25em', color: '#4b5563' }}>{props.children}</p>,
  hero: (props: any) => <p style={{ fontSize: '3em', fontWeight: 'bold' }}>{props.children}</p>,
  display: (props: any) => <p style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{props.children}</p>,
  h1: (props: any) => <h1 style={{ fontSize: '2.25em', fontWeight: 'bold' }}>{props.children}</h1>,
  h2: (props: any) => <h2 style={{ fontSize: '1.875em', fontWeight: 'bold' }}>{props.children}</h2>,
  h3: (props: any) => <h3 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{props.children}</h3>,
  h4: (props: any) => <h4 style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{props.children}</h4>,
  h5: (props: any) => <h5 style={{ fontSize: '1.125em', fontWeight: 'bold' }}>{props.children}</h5>,
  h6: (props: any) => <h6 style={{ fontSize: '1em', fontWeight: 'bold' }}>{props.children}</h6>,
  subtitle: (props: any) => <p style={{ fontSize: '1.25em', color: '#6b7280' }}>{props.children}</p>,
  blockquote: (props: any) => (
    <blockquote style={{
      borderLeft: '4px solid #0047AB',
      paddingLeft: '1em',
      fontStyle: 'italic',
      color: '#4b5563',
    }}>
      {props.children}
    </blockquote>
  ),
  'blockquote-large': (props: any) => (
    <blockquote style={{
      borderLeft: '4px solid #0047AB',
      paddingLeft: '1em',
      fontSize: '1.5em',
      fontStyle: 'italic',
      color: '#4b5563',
    }}>
      {props.children}
    </blockquote>
  ),
  callout: (props: any) => (
    <div style={{
      backgroundColor: '#eff6ff',
      borderLeft: '4px solid #3b82f6',
      padding: '1em',
      borderRadius: '0 4px 4px 0',
    }}>
      {props.children}
    </div>
  ),
  'callout-success': (props: any) => (
    <div style={{
      backgroundColor: '#f0fdf4',
      borderLeft: '4px solid #22c55e',
      padding: '1em',
      borderRadius: '0 4px 4px 0',
    }}>
      {props.children}
    </div>
  ),
  'callout-warning': (props: any) => (
    <div style={{
      backgroundColor: '#fffbeb',
      borderLeft: '4px solid #f59e0b',
      padding: '1em',
      borderRadius: '0 4px 4px 0',
    }}>
      {props.children}
    </div>
  ),
  'callout-error': (props: any) => (
    <div style={{
      backgroundColor: '#fef2f2',
      borderLeft: '4px solid #ef4444',
      padding: '1em',
      borderRadius: '0 4px 4px 0',
    }}>
      {props.children}
    </div>
  ),
  caption: (props: any) => <p style={{ fontSize: '0.875em', color: '#6b7280' }}>{props.children}</p>,
  small: (props: any) => <p style={{ fontSize: '0.875em' }}>{props.children}</p>,
  'code-block': (props: any) => (
    <pre style={{
      fontFamily: 'ui-monospace, monospace',
      backgroundColor: '#1f2937',
      color: '#f9fafb',
      padding: '1em',
      borderRadius: '4px',
      overflow: 'auto',
    }}>
      {props.children}
    </pre>
  ),
}

// ============================================
// COMPONENTI PREVIEW LISTE
// ============================================

export const ListItemPreview = {
  bullet: (props: any) => <li style={{ listStyleType: 'disc' }}>{props.children}</li>,
  number: (props: any) => <li style={{ listStyleType: 'decimal' }}>{props.children}</li>,
  check: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#22c55e' }}>✓</span>
      <span>{props.children}</span>
    </li>
  ),
  'check-red': (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#ef4444' }}>✗</span>
      <span>{props.children}</span>
    </li>
  ),
  arrow: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#0047AB' }}>→</span>
      <span>{props.children}</span>
    </li>
  ),
  'arrow-green': (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#22c55e' }}>➜</span>
      <span>{props.children}</span>
    </li>
  ),
  star: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#eab308' }}>★</span>
      <span>{props.children}</span>
    </li>
  ),
  'star-blue': (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#3b82f6' }}>★</span>
      <span>{props.children}</span>
    </li>
  ),
  heart: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#ef4444' }}>♥</span>
      <span>{props.children}</span>
    </li>
  ),
  'dot-blue': (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#3b82f6' }}>●</span>
      <span>{props.children}</span>
    </li>
  ),
  'dot-green': (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#22c55e' }}>●</span>
      <span>{props.children}</span>
    </li>
  ),
  'dot-red': (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#ef4444' }}>●</span>
      <span>{props.children}</span>
    </li>
  ),
  diamond: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#60a5fa' }}>◆</span>
      <span>{props.children}</span>
    </li>
  ),
  lightning: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span style={{ color: '#eab308' }}>⚡</span>
      <span>{props.children}</span>
    </li>
  ),
  fire: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span>🔥</span>
      <span>{props.children}</span>
    </li>
  ),
  rocket: (props: any) => (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
      <span>🚀</span>
      <span>{props.children}</span>
    </li>
  ),
}
