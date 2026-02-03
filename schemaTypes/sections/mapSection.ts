// Sezione: Mappa Interattiva
// Mappa con marker personalizzati e stili configurabili
import { defineType, defineField, defineArrayMember } from 'sanity'
import { PinIcon } from '@sanity/icons'
import { getPlainText } from '../../lib/previewHelpers'
import { paddingOptions, marginOptions } from '../shared/spacingOptions'
import { titleSizeOptions, fontWeightOptions, textColorOptions } from '../shared/typographyOptions'

export default defineType({
  name: 'mapSection',
  title: 'Sezione Mappa',
  type: 'object',
  icon: PinIcon,
  description: 'Mappa interattiva con marker personalizzati e stile configurabile',

  groups: [
    { name: 'content', title: '📝 Contenuto', default: true },
    { name: 'map', title: '🗺️ Mappa' },
    { name: 'markers', title: '📍 Marker' },
    { name: 'typography', title: '🔤 Tipografia' },
    { name: 'style', title: '🎨 Stile' },
  ],

  fields: [
    // === CONTENUTO ===
    defineField({
      name: 'title',
      title: 'Titolo Sezione',
      type: 'localeRichText',
      description: 'Titolo opzionale della sezione mappa',
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'localeRichText',
      description: 'Sottotitolo opzionale della sezione',
      group: 'content',
    }),

    // === MAPPA ===
    defineField({
      name: 'mapType',
      title: 'Tipo Mappa',
      type: 'string',
      description: 'Seleziona il tipo di mappa da visualizzare',
      group: 'map',
      options: {
        list: [
          { title: 'Rivenditori (da database)', value: 'dealers' },
          { title: 'Marker Personalizzati', value: 'custom' },
          { title: 'Posizione Singola', value: 'single-location' },
        ],
        layout: 'radio',
      },
      initialValue: 'dealers',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'centerLat',
      title: 'Latitudine Centro',
      type: 'number',
      description: 'Latitudine del centro mappa (es: 45.4642 per Milano)',
      group: 'map',
      validation: Rule => Rule.min(-90).max(90),
    }),

    defineField({
      name: 'centerLng',
      title: 'Longitudine Centro',
      type: 'number',
      description: 'Longitudine del centro mappa (es: 9.1900 per Milano)',
      group: 'map',
      validation: Rule => Rule.min(-180).max(180),
    }),

    defineField({
      name: 'zoom',
      title: 'Livello Zoom',
      type: 'number',
      description: 'Livello di zoom iniziale (6 = nazione, 12 = citta, 18 = strada)',
      group: 'map',
      validation: Rule => Rule.min(6).max(18),
      initialValue: 10,
    }),

    defineField({
      name: 'showDealersList',
      title: 'Mostra Lista Rivenditori',
      type: 'boolean',
      description: 'Visualizza la lista dei rivenditori sotto la mappa',
      group: 'map',
      initialValue: true,
      hidden: ({ parent }) => parent?.mapType !== 'dealers',
    }),

    // === MARKER ===
    defineField({
      name: 'markers',
      title: 'Marker Personalizzati',
      type: 'array',
      description: 'Aggiungi marker personalizzati sulla mappa',
      group: 'markers',
      hidden: ({ parent }) => parent?.mapType !== 'custom',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'marker',
          title: 'Marker',
          fields: [
            defineField({
              name: 'title',
              title: 'Titolo',
              type: 'localeRichText',
              description: 'Nome del punto sulla mappa',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'localeRichText',
              description: 'Descrizione opzionale del punto',
            }),
            defineField({
              name: 'lat',
              title: 'Latitudine',
              type: 'number',
              description: 'Coordinata latitudine',
              validation: Rule => Rule.required().min(-90).max(90),
            }),
            defineField({
              name: 'lng',
              title: 'Longitudine',
              type: 'number',
              description: 'Coordinata longitudine',
              validation: Rule => Rule.required().min(-180).max(180),
            }),
            defineField({
              name: 'icon',
              title: 'Tipo Icona',
              type: 'string',
              description: 'Icona da visualizzare sul marker',
              options: {
                list: [
                  { title: 'Pin Standard', value: 'pin' },
                  { title: 'Negozio', value: 'store' },
                  { title: 'Ufficio', value: 'office' },
                  { title: 'Magazzino', value: 'warehouse' },
                  { title: 'Fabbrica', value: 'factory' },
                  { title: 'Stella', value: 'star' },
                ],
              },
              initialValue: 'pin',
            }),
            defineField({
              name: 'color',
              title: 'Colore Marker',
              type: 'string',
              description: 'Colore del marker sulla mappa',
              options: {
                list: [
                  { title: 'Rosso', value: 'red' },
                  { title: 'Blu', value: 'blue' },
                  { title: 'Verde', value: 'green' },
                  { title: 'Arancione', value: 'orange' },
                  { title: 'Viola', value: 'purple' },
                  { title: 'Blu GLOS', value: 'primary' },
                  { title: 'Rosso GLOS', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL opzionale (apre al click sul marker)',
            }),
          ],
          preview: {
            select: {
              title: 'title.it',
              lat: 'lat',
              lng: 'lng',
              icon: 'icon',
            },
            prepare({ title, lat, lng, icon }) {
              const icons: Record<string, string> = {
                pin: '📍',
                store: '🏪',
                office: '🏢',
                warehouse: '📦',
                factory: '🏭',
                star: '⭐',
              }
              return {
                title: `${icons[icon] || '📍'} ${title || 'Marker'}`,
                subtitle: lat && lng ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : 'Coordinate mancanti',
              }
            },
          },
        }),
      ],
    }),

    // === TIPOGRAFIA ===
    defineField({
      name: 'titleSize',
      title: 'Dimensione Titolo',
      type: 'string',
      group: 'typography',
      options: { list: titleSizeOptions },
      initialValue: 'lg',
    }),

    defineField({
      name: 'titleWeight',
      title: 'Peso Titolo',
      type: 'string',
      group: 'typography',
      options: { list: fontWeightOptions },
      initialValue: 'bold',
    }),

    defineField({
      name: 'titleColor',
      title: 'Colore Titolo',
      type: 'string',
      group: 'typography',
      options: { list: textColorOptions },
    }),

    defineField({
      name: 'subtitleSize',
      title: 'Dimensione Sottotitolo',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Piccolo (14px)', value: 'sm' },
          { title: 'Normale (16px)', value: 'base' },
          { title: 'Grande (18px)', value: 'lg' },
        ],
      },
      initialValue: 'base',
    }),

    // === STILE ===
    defineField({
      name: 'height',
      title: 'Altezza Mappa',
      type: 'string',
      description: 'Altezza della mappa sullo schermo',
      group: 'style',
      options: {
        list: [
          { title: 'Piccola (300px)', value: 'small' },
          { title: 'Media (400px)', value: 'medium' },
          { title: 'Grande (500px)', value: 'large' },
          { title: 'Schermo Intero (100vh)', value: 'full' },
        ],
      },
      initialValue: 'medium',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Colore Sfondo Sezione',
      type: 'string',
      description: 'Colore di sfondo attorno alla mappa',
      group: 'style',
      options: {
        list: [
          { title: 'Bianco', value: 'white' },
          { title: 'Grigio Chiaro', value: 'gray-light' },
          { title: 'Grigio', value: 'gray' },
          { title: 'Blu GLOS', value: 'primary' },
          { title: 'Nero', value: 'black' },
        ],
      },
      initialValue: 'white',
    }),

    defineField({
      name: 'paddingY',
      title: 'Spaziatura Verticale (Legacy)',
      type: 'string',
      description: 'Spazio sopra e sotto la sezione',
      group: 'style',
      options: {
        list: [
          { title: 'Nessuna', value: 'none' },
          { title: 'Piccola', value: 'small' },
          { title: 'Media', value: 'medium' },
          { title: 'Grande', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),

    defineField({
      name: 'paddingTop',
      title: 'Spaziatura Sopra',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Spaziatura Sotto',
      type: 'string',
      group: 'style',
      options: { list: paddingOptions },
      initialValue: 'lg',
    }),
    defineField({
      name: 'marginTop',
      title: 'Margine Sopra',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
    }),
    defineField({
      name: 'marginBottom',
      title: 'Margine Sotto',
      type: 'string',
      group: 'style',
      options: { list: marginOptions },
      initialValue: 'none',
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      mapType: 'mapType',
      markers: 'markers',
      height: 'height',
    },
    prepare({ title, mapType, markers, height }) {
      const titleText = getPlainText(title)
      const mapTypeLabels: Record<string, string> = {
        dealers: 'Rivenditori',
        custom: 'Marker Personalizzati',
        'single-location': 'Posizione Singola',
      }
      const markerCount = markers?.length || 0
      const heightLabels: Record<string, string> = {
        small: '300px',
        medium: '400px',
        large: '500px',
        full: '100vh',
      }

      let subtitle = mapTypeLabels[mapType] || 'Mappa'
      if (mapType === 'custom' && markerCount > 0) {
        subtitle += ` (${markerCount} marker)`
      }
      subtitle += ` - ${heightLabels[height] || '400px'}`

      return {
        title: `📍 ${titleText || 'Mappa'}`,
        subtitle,
      }
    },
  },
})
