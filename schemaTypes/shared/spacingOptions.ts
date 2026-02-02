// Opzioni di spaziatura condivise per tutte le sezioni
// Usare in tutti gli schema per consistenza

export const paddingOptions = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Piccolo (16px)', value: 'sm' },
  { title: 'Medio (32px)', value: 'md' },
  { title: 'Grande (64px)', value: 'lg' },
  { title: 'Extra Grande (96px)', value: 'xl' },
  { title: 'XXL (128px)', value: '2xl' },
]

export const marginOptions = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Piccolo (16px)', value: 'sm' },
  { title: 'Medio (32px)', value: 'md' },
  { title: 'Grande (64px)', value: 'lg' },
  { title: 'Extra Grande (96px)', value: 'xl' },
]

export const containerWidthOptions = [
  { title: 'Stretto (max 768px)', value: 'narrow' },
  { title: 'Normale (max 1200px)', value: 'normal' },
  { title: 'Largo (max 1400px)', value: 'wide' },
  { title: 'Piena Larghezza', value: 'full' },
]

export const animationOptions = [
  { title: 'Nessuna', value: 'none' },
  { title: 'Fade In', value: 'fade' },
  { title: 'Fade dal Basso', value: 'fade-up' },
  { title: 'Fade da Sinistra', value: 'fade-left' },
  { title: 'Fade da Destra', value: 'fade-right' },
  { title: 'Zoom In', value: 'zoom' },
  { title: 'Slide dal Basso', value: 'slide-up' },
]

// Classi CSS corrispondenti per il frontend
export const paddingClasses: Record<string, string> = {
  none: 'py-0',
  sm: 'py-4 md:py-6',
  md: 'py-8 md:py-12',
  lg: 'py-12 md:py-16',
  xl: 'py-16 md:py-24',
  '2xl': 'py-24 md:py-32',
}

export const paddingTopClasses: Record<string, string> = {
  none: 'pt-0',
  sm: 'pt-4 md:pt-6',
  md: 'pt-8 md:pt-12',
  lg: 'pt-12 md:pt-16',
  xl: 'pt-16 md:pt-24',
  '2xl': 'pt-24 md:pt-32',
}

export const paddingBottomClasses: Record<string, string> = {
  none: 'pb-0',
  sm: 'pb-4 md:pb-6',
  md: 'pb-8 md:pb-12',
  lg: 'pb-12 md:pb-16',
  xl: 'pb-16 md:pb-24',
  '2xl': 'pb-24 md:pb-32',
}

export const marginTopClasses: Record<string, string> = {
  none: 'mt-0',
  sm: 'mt-4 md:mt-6',
  md: 'mt-8 md:mt-12',
  lg: 'mt-12 md:mt-16',
  xl: 'mt-16 md:mt-24',
}

export const marginBottomClasses: Record<string, string> = {
  none: 'mb-0',
  sm: 'mb-4 md:mb-6',
  md: 'mb-8 md:mb-12',
  lg: 'mb-12 md:mb-16',
  xl: 'mb-16 md:mb-24',
}

export const containerWidthClasses: Record<string, string> = {
  narrow: 'max-w-3xl',
  normal: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
}
