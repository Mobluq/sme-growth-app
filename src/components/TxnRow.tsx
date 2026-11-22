import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { Txn } from '../lib/types'
import { naira, dayLabel } from '../lib/format'
import { Pill } from '../ui/primitives'

export function TxnRow({ t, onClick }: { t: Txn; onClick?: () => void }) {
  const income = t.amount > 0
  return (
    <button onClick={onClick} disabled={!onClick} className="w-full flex items-center gap-3 py-3 text-left active:opacity-70 transition">
      <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${income ? 'bg-good/10 text-good' : 'bg-paper text-ink-soft border border-line'}`}>
        {income ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[14.5px] font-semibold text-ink truncate">{t.title}</span>
        <span className="block text-[12px] text-ink-mute truncate">{t.sub ? `${t.sub} · ` : ''}{dayLabel(t.at)}</span>
      </span>
      <span className="text-right shrink-0">
        <span className={`block text-[14.5px] font-bold tnum ${income ? 'text-good' : 'text-ink'}`}>{income ? '+' : ''}{naira(t.amount)}</span>
        {t.status !== 'completed' && <span className="inline-block mt-0.5"><Pill tone={t.status === 'pending' ? 'warn' : 'default'}>{t.status}</Pill></span>}
      </span>
    </button>
  )
}
