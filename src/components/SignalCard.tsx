import { Sparkles, X } from 'lucide-react'
import type { Signal } from '../lib/types'
import { Button } from '../ui/primitives'

export function SignalCard({ signal, onAct, onDismiss }: { signal: Signal; onAct: () => void; onDismiss: () => void }) {
  return (
    <div className="relative rounded-xl2 p-4 bg-gt-50 border border-gt-100 overflow-hidden">
      <button onClick={onDismiss} className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-gt/60 active:bg-gt-100"><X size={15} /></button>
      <div className="flex items-center gap-2 text-gt">
        <Sparkles size={16} />
        <span className="text-[11px] font-bold tracking-wide uppercase">Smart tip</span>
      </div>
      <h4 className="mt-2 text-[15.5px] font-bold text-ink pr-6 leading-snug">{signal.title}</h4>
      <p className="mt-1 text-[13px] text-ink-soft leading-snug">{signal.body}</p>
      <Button variant="primary" onClick={onAct} className="mt-3 h-11 w-full text-[14px]">{signal.cta}</Button>
    </div>
  )
}
