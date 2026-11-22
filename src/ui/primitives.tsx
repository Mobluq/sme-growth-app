import { createContext, useContext, useState, useCallback, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, X, Check } from 'lucide-react'
import { initials } from '../lib/format'

export const cx = (...a: (string | false | undefined | null)[]) => a.filter(Boolean).join(' ')

type BtnVariant = 'primary' | 'dark' | 'subtle' | 'ghost' | 'outline'
export function Button({ variant = 'primary', full, className, children, ...p }: { variant?: BtnVariant; full?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const v: Record<BtnVariant, string> = {
    primary: 'bg-gt text-white shadow-[0_10px_26px_rgba(245,88,32,.32)]',
    dark: 'bg-ink text-white',
    subtle: 'bg-gt-50 text-gt',
    ghost: 'bg-transparent text-ink',
    outline: 'border border-line bg-white text-ink',
  }
  return (
    <button className={cx('inline-flex items-center justify-center gap-2 font-semibold rounded-2xl h-14 px-6 text-[15px] transition active:scale-[.98] disabled:opacity-40 disabled:pointer-events-none', v[variant], full && 'w-full', className)} {...p}>
      {children}
    </button>
  )
}

export function Pill({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'gt' | 'good' | 'warn' | 'ink' }) {
  const t = {
    default: 'bg-line/70 text-ink-soft',
    gt: 'bg-gt-50 text-gt',
    good: 'bg-good/10 text-good',
    warn: 'bg-warn/15 text-[#A5702A]',
    ink: 'bg-ink text-white',
  }[tone]
  return <span className={cx('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold', t)}>{children}</span>
}

export function Card({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={cx('bg-card rounded-xl2 border border-line shadow-card', onClick && 'cursor-pointer active:scale-[.99] transition', className)}>
      {children}
    </div>
  )
}

export function IconCircle({ children, tone = 'soft', size = 44 }: { children: ReactNode; tone?: 'soft' | 'gt' | 'ink'; size?: number }) {
  const t = { soft: 'bg-paper text-ink border border-line', gt: 'bg-gt-50 text-gt', ink: 'bg-ink text-white' }[tone]
  return <span className={cx('inline-flex items-center justify-center rounded-full shrink-0', t)} style={{ width: size, height: size }}>{children}</span>
}

export function Avatar({ name, size = 44, tone }: { name: string; size?: number; tone?: string }) {
  const bg = tone ?? ['#F3E9DF', '#E7EEE8', '#EAE6F2', '#F4E6E4'][name.length % 4]
  return <span className="inline-flex items-center justify-center rounded-full font-semibold text-ink shrink-0" style={{ width: size, height: size, background: bg, fontSize: size * 0.34 }}>{initials(name)}</span>
}

export function Field({ label, hint, prefix, ...p }: { label?: string; hint?: string; prefix?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      {label && <span className="block text-[13px] font-semibold text-ink mb-2">{label}</span>}
      <span className="flex items-center gap-2 h-14 px-4 rounded-2xl border border-line bg-white focus-within:border-gt focus-within:ring-2 focus-within:ring-gt/15 transition">
        {prefix && <span className="text-ink-mute text-[15px] font-medium border-r border-line pr-2">{prefix}</span>}
        <input className="flex-1 bg-transparent outline-none text-[15px] text-ink placeholder:text-ink-mute/70 min-w-0" {...p} />
      </span>
      {hint && <span className="block text-[12px] text-ink-mute mt-1.5">{hint}</span>}
    </label>
  )
}

export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className="flex p-1 rounded-2xl bg-paper border border-line">
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} className={cx('flex-1 h-10 rounded-xl text-[14px] font-semibold transition', value === o.value ? 'bg-white text-ink shadow-sm' : 'text-ink-mute')}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Row({ left, title, sub, right, onClick }: { left?: ReactNode; title: ReactNode; sub?: ReactNode; right?: ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} disabled={!onClick} className={cx('w-full flex items-center gap-3 py-3.5 text-left', onClick && 'active:opacity-70 transition')}>
      {left}
      <span className="flex-1 min-w-0">
        <span className="block text-[15px] font-semibold text-ink truncate">{title}</span>
        {sub && <span className="block text-[12.5px] text-ink-mute truncate">{sub}</span>}
      </span>
      {right ?? (onClick && <ChevronRight size={18} className="text-ink-mute shrink-0" />)}
    </button>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3 mt-1">
      <h3 className="text-[16px] font-bold text-ink">{children}</h3>
      {action}
    </div>
  )
}

// ---- Bottom sheet ----
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="absolute inset-0 z-40 flex items-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div className="relative w-full bg-paper rounded-t-3xl p-5 pb-8 max-h-[86%] overflow-y-auto no-scrollbar" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 320 }}>
            <div className="w-10 h-1.5 rounded-full bg-line mx-auto mb-4" />
            {title && (
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-ink">{title}</h3>
                <button onClick={onClose} className="w-9 h-9 rounded-full bg-white border border-line flex items-center justify-center"><X size={18} /></button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ---- Toast ----
const ToastCtx = createContext<(msg: string) => void>(() => {})
export const useToast = () => useContext(ToastCtx)
export function ToastHost({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const show = useCallback((m: string) => { setMsg(m); window.setTimeout(() => setMsg(null), 2200) }, [])
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <AnimatePresence>
        {msg && (
          <motion.div className="absolute left-0 right-0 z-50 flex justify-center pointer-events-none" style={{ bottom: 96 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
            <span className="inline-flex items-center gap-2 bg-ink text-white text-[13px] font-medium px-4 py-2.5 rounded-full shadow-pop">
              <Check size={15} className="text-good" /> {msg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastCtx.Provider>
  )
}
