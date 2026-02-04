// Schema Campi Spaziature Interne - Riutilizzabile per TUTTE le sezioni
// Importare questi campi in ogni sezione per personalizzazione granulare
import { defineField } from 'sanity'

// === OPZIONI SPAZIATURE ===

// Gap/Distanze generiche (Tailwind spacing scale)
export const gapOptions = [
  { title: 'Nessuno (0)', value: '0' },
  { title: 'Minimo (4px)', value: '1' },
  { title: 'Piccolo (8px)', value: '2' },
  { title: 'Compatto (12px)', value: '3' },
  { title: 'Normale (16px)', value: '4' },
  { title: 'Medio (20px)', value: '5' },
  { title: 'Ampio (24px)', value: '6' },
  { title: 'Grande (32px)', value: '8' },
  { title: 'Extra (40px)', value: '10' },
  { title: 'XL (48px)', value: '12' },
  { title: 'XXL (64px)', value: '16' },
  { title: 'Enorme (80px)', value: '20' },
]

// Padding box (presets leggibili)
export const boxPaddingOptions = [
  { title: 'Nessuno', value: 'none' },
  { title: 'Minimo (8px)', value: 'xs' },
  { title: 'Piccolo (16px)', value: 'sm' },
  { title: 'Medio (24px)', value: 'md' },
  { title: 'Normale (32px)', value: 'lg' },
  { title: 'Grande (48px)', value: 'xl' },
  { title: 'Extra Grande (64px)', value: '2xl' },
]

// Dimensioni elementi
export const elementSizeOptions = [
  { title: 'Piccolo', value: 'sm' },
  { title: 'Medio', value: 'md' },
  { title: 'Normale', value: 'lg' },
  { title: 'Grande', value: 'xl' },
  { title: 'Extra Grande', value: '2xl' },
]

// === CAMPI SPAZIATURE INTERNE (da importare nelle sezioni) ===

// Gruppo spaziature interne
export const internalSpacingGroup = {
  name: 'internalSpacing',
  title: '📏 Spaziature Interne',
}

// Campi standard per spaziature interne di ogni sezione
export const internalSpacingFields = [
  defineField({
    name: 'headerMarginBottom',
    title: 'Distanza Header → Contenuto',
    type: 'string',
    group: 'internalSpacing',
    description: 'Spazio tra titolo/sottotitolo e il contenuto sottostante',
    options: {
      list: gapOptions,
    },
    initialValue: '12',
  }),

  defineField({
    name: 'itemsGap',
    title: 'Distanza tra Elementi',
    type: 'string',
    group: 'internalSpacing',
    description: 'Spazio tra le card/elementi della sezione',
    options: {
      list: gapOptions,
    },
    initialValue: '6',
  }),

  defineField({
    name: 'columnsGap',
    title: 'Distanza tra Colonne',
    type: 'string',
    group: 'internalSpacing',
    description: 'Spazio orizzontale tra colonne (layout a griglia)',
    options: {
      list: gapOptions,
    },
    initialValue: '8',
  }),

  defineField({
    name: 'rowsGap',
    title: 'Distanza tra Righe',
    type: 'string',
    group: 'internalSpacing',
    description: 'Spazio verticale tra righe (layout a griglia)',
    options: {
      list: gapOptions,
    },
    initialValue: '8',
  }),

  defineField({
    name: 'cardPadding',
    title: 'Padding Card/Box',
    type: 'string',
    group: 'internalSpacing',
    description: 'Spaziatura interna delle card/box',
    options: {
      list: boxPaddingOptions,
    },
    initialValue: 'lg',
  }),

  defineField({
    name: 'contentMaxWidth',
    title: 'Larghezza Massima Contenuto',
    type: 'string',
    group: 'internalSpacing',
    description: 'Larghezza massima del testo/contenuto interno',
    options: {
      list: [
        { title: 'Stretto (512px)', value: 'max-w-lg' },
        { title: 'Medio (640px)', value: 'max-w-xl' },
        { title: 'Normale (768px)', value: 'max-w-2xl' },
        { title: 'Largo (896px)', value: 'max-w-3xl' },
        { title: 'Extra Largo (1024px)', value: 'max-w-4xl' },
        { title: 'Pieno', value: 'max-w-none' },
      ],
    },
    initialValue: 'max-w-2xl',
  }),
]

// === CSS CLASSES MAPPINGS (per frontend) ===

export const gapClasses: Record<string, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
  '20': 'gap-20',
}

export const spaceYClasses: Record<string, string> = {
  '0': 'space-y-0',
  '1': 'space-y-1',
  '2': 'space-y-2',
  '3': 'space-y-3',
  '4': 'space-y-4',
  '5': 'space-y-5',
  '6': 'space-y-6',
  '8': 'space-y-8',
  '10': 'space-y-10',
  '12': 'space-y-12',
  '16': 'space-y-16',
  '20': 'space-y-20',
}

export const marginBottomClasses: Record<string, string> = {
  '0': 'mb-0',
  '1': 'mb-1',
  '2': 'mb-2',
  '3': 'mb-3',
  '4': 'mb-4',
  '5': 'mb-5',
  '6': 'mb-6',
  '8': 'mb-8',
  '10': 'mb-10',
  '12': 'mb-12',
  '16': 'mb-16',
  '20': 'mb-20',
}

export const boxPaddingClasses: Record<string, string> = {
  none: 'p-0',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-5 md:p-6',
  lg: 'p-6 md:p-8',
  xl: 'p-8 md:p-10',
  '2xl': 'p-10 md:p-12',
}

// === HELPER per ottenere classe CSS da valore ===

export const getGapClass = (value?: string) => gapClasses[value || '6'] || 'gap-6'
export const getSpaceYClass = (value?: string) => spaceYClasses[value || '6'] || 'space-y-6'
export const getMarginBottomClass = (value?: string) => marginBottomClasses[value || '12'] || 'mb-12'
export const getBoxPaddingClass = (value?: string) => boxPaddingClasses[value || 'lg'] || 'p-6 md:p-8'
