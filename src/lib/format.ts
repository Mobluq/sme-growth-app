export const NGN = '₦' // ₦

export function naira(n: number, opts: { kobo?: boolean } = {}): string {
  const neg = n < 0
  const v = Math.abs(n)
  const main = Math.floor(v).toLocaleString('en-NG')
  const body = opts.kobo ? `${main}.${Math.round((v - Math.floor(v)) * 100).toString().padStart(2, '0')}` : main
  return `${neg ? '-' : ''}${NGN}${body}`
}

export function compact(n: number): string {
  const v = Math.abs(n)
  const neg = n < 0 ? '-' : ''
  if (v >= 1_000_000) return `${neg}${NGN}${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}m`
  if (v >= 1_000) return `${neg}${NGN}${(v / 1_000).toFixed(v % 1_000 === 0 ? 0 : 1)}k`
  return `${neg}${NGN}${v}`
}

export function initials(name: string): string {
  const p = name.trim().split(/\s+/)
  return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase()
}

export function timeAgo(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000
  if (d < 60) return 'just now'
  if (d < 3600) return `${Math.floor(d / 60)} min ago`
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`
  return `${Math.floor(d / 86400)}d ago`
}

export function dayLabel(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const same = d.toDateString() === today.toDateString()
  const yday = new Date(today.getTime() - 86400000).toDateString() === d.toDateString()
  const t = d.toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' })
  if (same) return `Today, ${t}`
  if (yday) return `Yesterday, ${t}`
  return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) + `, ${t}`
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}
