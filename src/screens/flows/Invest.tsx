import { useState } from 'react'
import { TrendingUp, ShieldCheck, Clock, type LucideIcon } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Pill, useToast } from '../../ui/primitives'
import { AmountSheet } from '../../components/AmountSheet'
import { naira } from '../../lib/format'

export function Invest() {
  const s = useApp(); const d = useDispatch(); const toast = useToast()
  const [open, setOpen] = useState(false)
  const projected = Math.round(s.invest.balance * (1 + s.invest.rateAnnual))
  return (
    <>
      <ScreenHeader title="Invest" />
      <Body>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink-soft flex items-center gap-1.5"><TrendingUp size={15} className="text-gt" /> Money market fund</span>
            <Pill tone="good">{(s.invest.rateAnnual * 100).toFixed(1)}% p.a.</Pill>
          </div>
          <div className="text-[12.5px] text-ink-mute mt-2">Your balance</div>
          <div className="text-[32px] font-extrabold text-ink tnum">{naira(s.invest.balance)}</div>
          {s.invest.balance > 0 && <div className="text-[12.5px] text-ink-mute mt-1">Projected in 12 months · <span className="font-semibold text-good">{naira(projected)}</span></div>}
        </Card>
        <div className="grid grid-cols-1 gap-2 mt-4">
          {([[ShieldCheck, 'Managed by GT Fund Managers', 'Regulated, low-risk money market fund.'], [Clock, 'Withdraw anytime', 'Your cash is never locked in.'], [TrendingUp, 'Earns every day', 'Returns accrue daily, not once a year.']] as [LucideIcon, string, string][]).map(([I, a, b], i) => (
            <Card key={i} className="p-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-paper border border-line grid place-items-center"><I size={17} className="text-ink" /></span>
              <div><div className="text-[13.5px] font-bold text-ink">{a}</div><div className="text-[12px] text-ink-mute">{b}</div></div>
            </Card>
          ))}
        </div>
        <Button full className="mt-6" onClick={() => setOpen(true)}>{s.invest.balance > 0 ? 'Add funds' : 'Start investing'}</Button>
      </Body>
      <AmountSheet open={open} onClose={() => setOpen(false)} title="Move to investments" cta="Invest" max={s.balance} onSubmit={(v) => { d({ type: 'invest', amount: v }); toast('Added to investments') }} />
    </>
  )
}
