import type { ReactNode } from 'react'
import { Home, Wallet, Users, LineChart, MoreHorizontal, ChevronLeft } from 'lucide-react'
import { useNav, type Tab } from '../nav/nav'
import { cx } from './primitives'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100svh] w-full flex items-center justify-center p-0 sm:p-6" style={{ background: 'radial-gradient(120% 120% at 50% 0%, #2a231d 0%, #17120f 60%, #0c0a08 100%)' }}>
      <div className="relative w-full h-[100svh] sm:h-[min(92svh,880px)] sm:w-[min(100%,404px)] bg-black sm:rounded-[2.7rem] sm:p-[9px] sm:shadow-[0_40px_120px_rgba(0,0,0,.6)]">
        <div className="relative w-full h-full bg-paper overflow-hidden sm:rounded-[2.2rem] flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? '#fff' : '#17120E'
  return (
    <div className="shrink-0 h-12 px-6 flex items-center justify-between z-30 select-none" style={{ color: c }}>
      <span className="text-[15px] font-semibold tnum pt-1">9:41</span>
      <div className="flex items-center gap-1.5 pt-1">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c}><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="4" width="3" height="8" rx="1" /><rect x="10" y="2" width="3" height="10" rx="1" opacity=".9" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".4" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 10.5l.01 0M2 5.5a9 9 0 0112 0M4.5 8a5.5 5.5 0 017 0" stroke={c} strokeWidth="1.6" strokeLinecap="round" /></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="1" y="1" width="21" height="11" rx="3" stroke={c} strokeOpacity=".4" strokeWidth="1.2" /><rect x="3" y="3" width="15" height="7" rx="1.5" fill={c} /><rect x="23.5" y="4" width="2" height="5" rx="1" fill={c} fillOpacity=".4" /></svg>
      </div>
    </div>
  )
}

const TABS: { key: Tab; label: string; Icon: typeof Home }[] = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'payment', label: 'Payment', Icon: Wallet },
  { key: 'payroll', label: 'Payroll', Icon: Users },
  { key: 'grow', label: 'Grow', Icon: LineChart },
  { key: 'more', label: 'More', Icon: MoreHorizontal },
]

export function TabBar() {
  const { tab, setTab } = useNav()
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="mx-3 mb-3 h-16 rounded-3xl bg-white/90 backdrop-blur border border-line shadow-pop flex items-center justify-around px-1">
        {TABS.map(({ key, label, Icon }) => {
          const on = tab === key
          return (
            <button key={key} onClick={() => setTab(key)} className="flex flex-col items-center gap-1 w-14 py-1">
              <span className={cx('flex items-center justify-center w-9 h-7 rounded-xl transition', on && 'bg-gt-50')}>
                <Icon size={20} className={on ? 'text-gt' : 'text-ink-mute'} strokeWidth={on ? 2.4 : 2} />
              </span>
              <span className={cx('text-[10.5px] font-semibold', on ? 'text-gt' : 'text-ink-mute')}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ScreenHeader({ title, right }: { title?: string; right?: ReactNode }) {
  const { pop } = useNav()
  return (
    <div className="shrink-0 px-5 h-14 flex items-center gap-3 bg-paper/95 backdrop-blur sticky top-0 z-10">
      <button onClick={pop} aria-label="Back" className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center active:bg-line/60 transition"><ChevronLeft size={24} /></button>
      {title && <h1 className="text-[18px] font-bold text-ink flex-1 truncate">{title}</h1>}
      {right}
    </div>
  )
}

// Standard scroll body for a screen
export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pb-28', className)}>{children}</div>
}
