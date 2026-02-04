// Migration Script: Convert richText arrays to plain strings
// This preserves content while fixing schema mismatches

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '97oreljh',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Estrae testo plain da un array di blocchi Portable Text
function extractPlainText(blocks) {
  if (!blocks) return ''
  if (typeof blocks === 'string') return blocks
  if (!Array.isArray(blocks)) return String(blocks)

  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (!block.children) return ''
      return block.children
        .filter(child => child._type === 'span')
        .map(span => span.text || '')
        .join('')
    })
    .join('\n')
}

// Converte un oggetto locale (it, en, es) da richText a string
function convertLocaleField(localeObj) {
  if (!localeObj) return localeObj
  if (typeof localeObj === 'string') return localeObj

  const converted = {}
  let hasChanges = false

  for (const lang of ['it', 'en', 'es']) {
    if (localeObj[lang] !== undefined) {
      if (Array.isArray(localeObj[lang])) {
        converted[lang] = extractPlainText(localeObj[lang])
        hasChanges = true
        console.log(`  Converting ${lang}: Array -> "${converted[lang].substring(0, 50)}..."`)
      } else {
        converted[lang] = localeObj[lang]
      }
    }
  }

  return hasChanges ? converted : null
}

// Campi da controllare nelle sezioni
const fieldsToConvert = [
  'eyebrow', 'title', 'subtitle', 'description',
  'formTitle', 'formSubtitle', 'submitButtonText',
  'formSuccessMessage', 'formErrorMessage', 'privacyText',
  'contactInfoTitle', 'openingHoursTitle', 'socialTitle',
]

async function migratePages() {
  console.log('Fetching all pages...')

  const pages = await client.fetch(`*[_type == "page"]{_id, _rev, title, sections}`)
  console.log(`Found ${pages.length} pages`)

  for (const page of pages) {
    console.log(`\nProcessing page: ${page.title || page._id}`)

    if (!page.sections || !Array.isArray(page.sections)) {
      console.log('  No sections found')
      continue
    }

    let hasChanges = false
    const updatedSections = page.sections.map((section, sIdx) => {
      const sectionType = section._type || 'unknown'
      let sectionChanged = false
      const updatedSection = { ...section }

      for (const field of fieldsToConvert) {
        if (section[field]) {
          const converted = convertLocaleField(section[field])
          if (converted) {
            console.log(`  Section ${sIdx} (${sectionType}): Converting field "${field}"`)
            updatedSection[field] = converted
            sectionChanged = true
          }
        }
      }

      // Controlla anche campi nested come formFields, contactItems, openingHours
      if (section.formFields && Array.isArray(section.formFields)) {
        const updatedFormFields = section.formFields.map((ff, ffIdx) => {
          let ffChanged = false
          const updatedFF = { ...ff }

          for (const field of ['label', 'placeholder']) {
            if (ff[field]) {
              const converted = convertLocaleField(ff[field])
              if (converted) {
                console.log(`  Section ${sIdx} formField ${ffIdx}: Converting "${field}"`)
                updatedFF[field] = converted
                ffChanged = true
              }
            }
          }

          return ffChanged ? updatedFF : ff
        })

        if (updatedFormFields.some((ff, i) => ff !== section.formFields[i])) {
          updatedSection.formFields = updatedFormFields
          sectionChanged = true
        }
      }

      // contactItems
      if (section.contactItems && Array.isArray(section.contactItems)) {
        const updatedItems = section.contactItems.map((item, iIdx) => {
          if (item.label) {
            const converted = convertLocaleField(item.label)
            if (converted) {
              console.log(`  Section ${sIdx} contactItem ${iIdx}: Converting "label"`)
              return { ...item, label: converted }
            }
          }
          return item
        })

        if (updatedItems.some((item, i) => item !== section.contactItems[i])) {
          updatedSection.contactItems = updatedItems
          sectionChanged = true
        }
      }

      // openingHours
      if (section.openingHours && Array.isArray(section.openingHours)) {
        const updatedHours = section.openingHours.map((hour, hIdx) => {
          let hChanged = false
          const updatedH = { ...hour }

          for (const field of ['days', 'note']) {
            if (hour[field]) {
              const converted = convertLocaleField(hour[field])
              if (converted) {
                console.log(`  Section ${sIdx} openingHours ${hIdx}: Converting "${field}"`)
                updatedH[field] = converted
                hChanged = true
              }
            }
          }

          return hChanged ? updatedH : hour
        })

        if (updatedHours.some((h, i) => h !== section.openingHours[i])) {
          updatedSection.openingHours = updatedHours
          sectionChanged = true
        }
      }

      if (sectionChanged) hasChanges = true
      return sectionChanged ? updatedSection : section
    })

    if (hasChanges) {
      console.log(`  Saving changes to page "${page.title}"...`)
      try {
        await client
          .patch(page._id)
          .set({ sections: updatedSections })
          .commit()
        console.log(`  ✓ Page updated successfully`)
      } catch (err) {
        console.error(`  ✗ Error updating page:`, err.message)
      }
    } else {
      console.log('  No changes needed')
    }
  }

  console.log('\n✓ Migration complete!')
}

// Controlla anche FAQ section
async function migrateFAQs() {
  console.log('\nChecking FAQ documents...')

  const faqs = await client.fetch(`*[_type == "faq"]{_id, _rev, question, answer}`)
  console.log(`Found ${faqs.length} FAQs`)

  for (const faq of faqs) {
    let hasChanges = false
    const updates = {}

    if (faq.question) {
      const converted = convertLocaleField(faq.question)
      if (converted) {
        updates.question = converted
        hasChanges = true
        console.log(`FAQ ${faq._id}: Converting question`)
      }
    }

    if (faq.answer) {
      const converted = convertLocaleField(faq.answer)
      if (converted) {
        updates.answer = converted
        hasChanges = true
        console.log(`FAQ ${faq._id}: Converting answer`)
      }
    }

    if (hasChanges) {
      try {
        await client.patch(faq._id).set(updates).commit()
        console.log(`  ✓ FAQ updated`)
      } catch (err) {
        console.error(`  ✗ Error:`, err.message)
      }
    }
  }
}

async function main() {
  console.log('=== Sanity Data Migration ===')
  console.log('Converting richText arrays to plain strings\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN environment variable is required')
    console.log('Get a token from: https://www.sanity.io/manage/project/97oreljh/api#tokens')
    console.log('Then run: SANITY_API_TOKEN=your_token node migrations/convertRichTextToString.js')
    process.exit(1)
  }

  await migratePages()
  await migrateFAQs()
}

main().catch(console.error)
