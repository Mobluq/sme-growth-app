// The SME Growth mark: three ascending bars rising into a leaning growth stroke,
// rebuilt from the prototype's splash logo.
export function LogoMark({ size = 30, color = '#E85C2A' }: { size?: number; color?: string }) {
  return (
    <svg width={Math.round((size * 34) / 32)} height={size} viewBox="0 0 34 32" fill="none" aria-hidden="true">
      <rect x="1" y="21" width="6.6" height="10" rx="3.3" fill={color} />
      <rect x="10" y="14" width="6.6" height="17" rx="3.3" fill={color} />
      <path d="M23.2 31 L29 1 L34 1 L28.2 31 Z" fill={color} />
    </svg>
  )
}

export function Logo({ size = 24, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size * 1.2} />
      <span className={`font-extrabold tracking-tight ${onDark ? 'text-white' : 'text-ink'}`} style={{ fontSize: size, lineHeight: 1 }}>
        SME<span className="font-medium"> Growth</span>
      </span>
    </div>
  )
}
