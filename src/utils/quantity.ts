/**
 * Quantity is stored as free-form text (e.g. "500 + 500", "3000 X2").
 * These helpers extract numeric totals when possible for future calculations.
 */

export function parseQuantityParts(quantity: string): number[] {
  if (!quantity.trim()) return []

  const normalized = quantity
    .toUpperCase()
    .replace(/,/g, '.')
    .replace(/\s+/g, ' ')
    .trim()

  // Pattern: 3000 X2 or 3000x2
  const multiplyMatch = normalized.match(/^([\d.]+)\s*[X×]\s*([\d.]+)$/)
  if (multiplyMatch) {
    const base = Number(multiplyMatch[1])
    const times = Number(multiplyMatch[2])
    if (Number.isFinite(base) && Number.isFinite(times)) {
      return [base * times]
    }
  }

  // Pattern: 500 + 500 or 1000
  const parts = normalized
    .split('+')
    .map((part) => Number(part.replace(/[^\d.]/g, '')))
    .filter((n) => Number.isFinite(n))

  return parts
}

export function sumQuantity(quantity: string): number | null {
  const parts = parseQuantityParts(quantity)
  if (parts.length === 0) return null
  return parts.reduce((sum, n) => sum + n, 0)
}

export function formatQuantityDisplay(quantity: string): string {
  return quantity.trim() || '—'
}
