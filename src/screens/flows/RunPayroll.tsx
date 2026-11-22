import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Avatar, useToast } from '../../ui/primitives'
import { ConfirmSheet } from '../../components/ConfirmSheet'
import { naira } from '../../lib/format'

export function RunPayroll() {
  const s = useApp(); const d = useDispatch(); const { pop } = useNav(); const toast = useToast()
  const [confirm, setConfirm] = useState(false)
  const [done, setDone] = useState(false)
  const active = s.staff.filter((x) => x.status === 'active')
  const total = active.reduce((t, x) => t + x.salary, 0)

  if (done) return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
      <CheckCircle2 size={72} className="text-good" />
      <h1 className="text-[22px] font-extrabold text-ink mt-5">Payroll paid</h1>
      <p className="text-[14.5px] text-ink-mute mt-2">{naira(total)} sent to {active.length} staff.</p>
      <Button full className="mt-8" onClick={pop}>Done</Button>
    </div>
  )

  return (
    <>
      <ScreenHeader title="Run payroll" />
      <Body>
        <Card className="p-5 text-center">
          <div className="text-[12.5px] text-ink-mute">Total payout</div>
          <div className="text-[34px] font-extrabold text-ink tnum mt-0.5">{naira(total)}</div>
          <div className="text-[12.5px] text-ink-mute mt-1">{active.length} active staff</div>
        </Card>
        <Card className="px-4 divide-y divide-line mt-4">
          {active.map((m) => (
            <div key={m.id} className="flex items-center gap-3 py-3">
              <Avatar name={m.name} size={40} />
              <div className="flex-1 min-w-0"><div className="text-[14px] font-semibold text-ink truncate">{m.name}</div><div className="text-[12px] text-ink-mute">{m.role}</div></div>
              <div className="text-[14px] font-bold text-ink tnum">{naira(m.salary)}</div>
            </div>
          ))}
        </Card>
        <Button full className="mt-6" disabled={total > s.balance} onClick={() => setConfirm(true)}>Pay {naira(total)}</Button>
        {total > s.balance && <p className="text-center text-[12.5px] text-gt mt-2">Not enough balance for this run.</p>}
      </Body>
      <ConfirmSheet open={confirm} onClose={() => setConfirm(false)} title="Confirm payroll"
        rows={[{ label: 'Staff', value: String(active.length) }, { label: 'Total', value: naira(total) }]}
        onConfirm={() => { d({ type: 'runPayroll' }); toast('Payroll paid'); setDone(true) }} />
    </>
  )
}
