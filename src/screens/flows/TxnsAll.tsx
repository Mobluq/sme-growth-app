import { useState } from 'react'
import { useApp } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Card, cx } from '../../ui/primitives'
import { TxnRow } from '../../components/TxnRow'
import type { TxnStatus } from '../../lib/types'

const F: (TxnStatus | 'all')[] = ['all', 'pending', 'completed', 'failed']

export function TxnsAll() {
  const s = useApp(); const { push } = useNav()
  const [f, setF] = useState<TxnStatus | 'all'>('all')
  const txns = s.txns.filter((t) => f === 'all' || t.status === f)
  return (
    <>
      <ScreenHeader title="Transactions" />
      <Body>
        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
          {F.map((x) => <button key={x} onClick={() => setF(x)} className={cx('px-3.5 h-9 rounded-full text-[13px] font-semibold capitalize shrink-0', f === x ? 'bg-ink text-white' : 'bg-white border border-line text-ink-soft')}>{x}</button>)}
        </div>
        <Card className="px-4 divide-y divide-line">
          {txns.length === 0 ? <div className="py-10 text-center text-ink-mute text-[13px]">Nothing here</div> : txns.map((t) => <TxnRow key={t.id} t={t} onClick={() => push('txn', { id: t.id })} />)}
        </Card>
      </Body>
    </>
  )
}
