/**
 * Utility for resolving locale-specific CMS fields.
 *
 * Convention: every translatable Sanity field `foo` has a parallel `foo_zh`
 * field. The `localized()` helper picks the correct one based on the active
 * locale, falling back to the English value when no Chinese translation exists.
 *
 * Usage:
 *   localized(doc, 'title', locale)   // returns doc.title_zh ?? doc.title
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDoc = Record<string, any>

/**
 * Return the localised value of a CMS document field.
 *
 * @param doc    The Sanity document (or any object with _zh fields)
 * @param field  The English field name (e.g. 'title', 'bio', 'description')
 * @param locale The active locale string (e.g. 'en' | 'zh-hant')
 * @returns      The Chinese value if available and locale is zh-hant,
 *               otherwise the English value
 */
export function localized(
  doc: AnyDoc | null | undefined,
  field: string,
  locale: string
): string {
  if (!doc) return ''

  if (locale === 'zh-hant') {
    const zhKey = `${field}_zh`
    const zhValue = doc[zhKey]
    if (zhValue && typeof zhValue === 'string' && zhValue.trim()) {
      return zhValue
    }
  }

  const enValue = doc[field]
  return typeof enValue === 'string' ? enValue : ''
}

/**
 * Return the localised rich text (Portable Text) content of a CMS document.
 *
 * @param doc    The Sanity document
 * @param field  The English field name for block content (e.g. 'content', 'description')
 * @param locale The active locale string
 * @returns      The Chinese block content if available, otherwise the English block content
 */
export function localizedBlocks(
  doc: AnyDoc | null | undefined,
  field: string,
  locale: string
): unknown[] | undefined {
  if (!doc) return undefined

  if (locale === 'zh-hant') {
    const zhKey = `${field}_zh`
    const zhValue = doc[zhKey]
    if (Array.isArray(zhValue) && zhValue.length > 0) {
      return zhValue
    }
  }

  const enValue = doc[field]
  return Array.isArray(enValue) ? enValue : undefined
}
