import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Avatar, useToast } from '../../ui/primitives'
import { ConfirmSheet } from '../../components/ConfirmSheet'
import { naira, timeAgo } from '../../lib/format'
import type { Approval } from '../../lib/types'

export function Approvals() {
  const s = useApp(); const d = useDispatch(); const toast = useToast()
  const [sel, setSel] = useState<Approval | null>(null)
  return (
    <>
      <ScreenHeader title="Approvals" />
      <Body>
        <p className="text-[13.5px] text-ink-mute mb-4">Payments your staff started. You review and release them.</p>
        {s.approvals.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16">
            <CheckCircle2 size={48} className="text-good" />
            <div className="text-[16px] font-bold text-ink mt-4">All caught up</div>
            <div className="text-[13px] text-ink-mute mt-1">No payments waiting on you.</div>
          </div>
        ) : s.approvals.map((a) => (
          <div key={a.id} className="rounded-xl2 bg-white border border-line shadow-card p-4 mb-3">
            <div className="flex items-center gap-3">
              <Avatar name={a.payee} size={42} />
              <div className="flex-1 min-w-0"><div className="text-[15px] font-bold text-ink truncate">{a.payee}</div><div className="text-[12px] text-ink-mute">Started by {a.startedBy} · {timeAgo(a.at)}</div></div>
              <div className="text-[16px] font-extrabold text-ink tnum">{naira(a.amount)}</div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" full className="h-12" onClick={() => { d({ type: 'decline', id: a.id }); toast('Payment declined') }}>Decline</Button>
              <Button full className="h-12" onClick={() => setSel(a)}>Review</Button>
            </div>
          </div>
        ))}
      </Body>
      <ConfirmSheet open={!!sel} onClose={() => setSel(null)} title="Approve payment"
        rows={sel ? [{ label: 'Pay', value: sel.payee }, { label: 'Started by', value: sel.startedBy }, { label: 'Amount', value: naira(sel.amount) }] : []}
        onConfirm={() => { if (sel) { d({ type: 'approve', id: sel.id }); toast('Payment approved') } }} />
    </>
  )
}
