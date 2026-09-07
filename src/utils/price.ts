/**
 * Format price for Turkish locale display.
 * Example: 55000 -> "55.000,00 TL"
 */
export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—'
  }

  return (
    new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + ' TL'
  )
}

/**
 * Parse Turkish-formatted price string to number.
 * Accepts "55000", "55.000,00", "55000.00"
 */
export function parsePrice(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  const normalized = trimmed
    .replace(/\s/g, '')
    .replace(/TL/gi, '')
    .replace(/\./g, '')
    .replace(',', '.')

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}
