import { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, Clock, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { useApp } from '../store/store'
import { useNav } from '../nav/nav'
import { Body } from '../ui/phone'
import { Card, cx } from '../ui/primitives'
import { TxnRow } from '../components/TxnRow'
import type { TxnStatus } from '../lib/types'

const FILTERS: (TxnStatus | 'all')[] = ['all', 'pending', 'completed', 'failed']

export function Payment() {
  const s = useApp()
  const { push } = useNav()
  const [f, setF] = useState<TxnStatus | 'all'>('all')
  const txns = s.txns.filter((t) => f === 'all' || t.status === f)
  return (
    <Body className="pt-2">
      <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Payment</h1>
      <p className="text-[13.5px] text-ink-mute mt-0.5">Manage payments, approvals and transactions.</p>

      {s.approvals.length > 0 && (
        <button onClick={() => push('approvals')} className="w-full mt-4 flex items-center gap-3 p-4 rounded-xl2 bg-gt-50 border border-gt-100 active:scale-[.99] transition">
          <span className="w-10 h-10 rounded-full bg-white grid place-items-center shrink-0"><Clock size={18} className="text-gt" /></span>
          <span className="flex-1 text-left"><span className="block text-[14.5px] font-bold text-ink">{s.approvals.length} payments awaiting approval</span><span className="block text-[12.5px] text-ink-soft">Review and approve requests</span></span>
          <ChevronRight size={18} className="text-gt" />
        </button>
      )}

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={() => push('transfer')} className="flex items-center gap-2.5 h-14 rounded-2xl bg-white border border-line shadow-card px-4 active:scale-[.99] transition"><span className="w-8 h-8 rounded-full bg-paper grid place-items-center"><ArrowUpRight size={17} /></span><span className="font-semibold text-[14.5px] text-ink">Transfer</span></button>
        <button onClick={() => push('receive')} className="flex items-center gap-2.5 h-14 rounded-2xl bg-white border border-line shadow-card px-4 active:scale-[.99] transition"><span className="w-8 h-8 rounded-full bg-paper grid place-items-center"><ArrowDownLeft size={17} /></span><span className="font-semibold text-[14.5px] text-ink">Receive</span></button>
      </div>

      <div className="flex items-center justify-between mt-6 mb-2">
        <h3 className="text-[16px] font-bold text-ink">Transactions</h3>
        <button className="flex items-center gap-1 text-[13px] font-semibold text-gt"><SlidersHorizontal size={14} /> Filter</button>
      </div>
      <div className="flex gap-2 mb-1 overflow-x-auto no-scrollbar">
        {FILTERS.map((x) => <button key={x} onClick={() => setF(x)} className={cx('px-3.5 h-9 rounded-full text-[13px] font-semibold capitalize shrink-0 transition', f === x ? 'bg-ink text-white' : 'bg-white border border-line text-ink-soft')}>{x}</button>)}
      </div>
      <Card className="px-4 divide-y divide-line mt-2">
        {txns.length === 0 ? <div className="py-10 text-center text-ink-mute text-[13px]">No {f} transactions</div>
          : txns.map((t) => <TxnRow key={t.id} t={t} onClick={() => push('txn', { id: t.id })} />)}
      </Card>
    </Body>
  )
}
