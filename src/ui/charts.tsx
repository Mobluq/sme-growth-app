// Dependency-free SVG mini-charts, tuned for the GT look.

function smooth(pts: number[][]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`
  }
  return d
}

export function Flow({ points, h = 60, stroke = '#F7A24A', area = true }: { points: number[]; h?: number; stroke?: string; area?: boolean }) {
  const w = 300
  const max = Math.max(...points), min = Math.min(...points)
  const rng = max - min || 1
  const step = w / (points.length - 1)
  const pts = points.map((p, i) => [i * step, h - 6 - ((p - min) / rng) * (h - 16)])
  const line = smooth(pts)
  const id = 'fl' + stroke.replace('#', '')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {area && <path d={`${line} L ${w},${h} L 0,${h} Z`} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Gauge({ pct, size = 150, label, value }: { pct: number; size?: number; label?: string; value?: string }) {
  const p = Math.max(0, Math.min(1, pct))
  const r = size / 2 - 12
  const cx = size / 2, cy = size / 2
  const start = Math.PI * 0.75, end = Math.PI * 2.25
  const a = start + (end - start) * p
  const pt = (ang: number) => [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
  const [sx, sy] = pt(start)
  const [ex, ey] = pt(end)
  const [vx, vy] = pt(a)
  const big = p > 0.5 ? 1 : 1
  const arc = (x1: number, y1: number, x2: number, y2: number, large: number) => `M ${x1},${y1} A ${r},${r} 0 ${large} 1 ${x2},${y2}`
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <path d={arc(sx, sy, ex, ey, 1)} fill="none" stroke="#EFEAE2" strokeWidth="12" strokeLinecap="round" />
      <path d={arc(sx, sy, vx, vy, p > 0.666 ? 1 : 0)} fill="none" stroke="#E8571E" strokeWidth="12" strokeLinecap="round" />
      {label && <text x={cx} y={cy - 4} textAnchor="middle" fontSize="12" fill="#8C847B" fontWeight="600">{label}</text>}
      {value && <text x={cx} y={cy + 20} textAnchor="middle" fontSize="22" fill="#17120E" fontWeight="800">{value}</text>}
    </svg>
  )
}

export function Bars({ data, labels, h = 90 }: { data: number[]; labels?: string[]; h?: number }) {
  const max = Math.max(...data, 1)
  return (
    <div className="flex items-end gap-2" style={{ height: h }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
          <div className="w-full rounded-t-md bg-gt/90" style={{ height: `${(d / max) * (h - 22)}px` }} />
          {labels && <span className="text-[10px] text-ink-mute">{labels[i]}</span>}
        </div>
      ))}
    </div>
  )
}

export function Progress({ pct, tone = 'gt' }: { pct: number; tone?: 'gt' | 'good' }) {
  const c = tone === 'good' ? 'bg-good' : 'bg-gt'
  return (
    <div className="h-2 rounded-full bg-line overflow-hidden">
      <div className={`h-full rounded-full ${c}`} style={{ width: `${Math.max(2, Math.min(100, pct * 100))}%` }} />
    </div>
  )
}
