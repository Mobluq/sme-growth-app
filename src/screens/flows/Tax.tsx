import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Pill, useToast } from '../../ui/primitives'
import { Progress } from '../../ui/charts'
import { AmountSheet } from '../../components/AmountSheet'
import { naira } from '../../lib/format'

export function Tax() {
  const s = useApp(); const d = useDispatch(); const toast = useToast()
  const [open, setOpen] = useState(false)
  const vat = Math.round(s.tax.estimated * 0.55)
  const cit = s.tax.estimated - vat
  const pct = s.tax.estimated ? s.tax.saved / s.tax.estimated : 0
  return (
    <>
      <ScreenHeader title="Set aside tax" />
      <Body>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink-soft flex items-center gap-1.5"><Sparkles size={14} className="text-gt" /> Estimated for the quarter</span>
            <Pill tone="good">AI calculated</Pill>
          </div>
          <div className="text-[30px] font-extrabold text-ink tnum mt-1">{naira(s.tax.estimated)}</div>
          <div className="h-px bg-line my-4" />
          <div className="flex items-center justify-between py-1.5 text-[14px]"><span className="text-ink-mute">VAT (7.5%)</span><span className="font-semibold text-ink tnum">{naira(vat)}</span></div>
          <div className="flex items-center justify-between py-1.5 text-[14px]"><span className="text-ink-mute">Company income tax</span><span className="font-semibold text-ink tnum">{naira(cit)}</span></div>
        </Card>

        <Card className="p-5 mt-4">
          <div className="flex items-center justify-between text-[13px] mb-2"><span className="text-ink-mute">Saved in your tax vault</span><span className="font-semibold text-ink">{Math.round(pct * 100)}%</span></div>
          <Progress pct={pct} tone="good" />
          <div className="text-[22px] font-extrabold text-ink tnum mt-2">{naira(s.tax.saved)}</div>
        </Card>

        <Button full className="mt-6" onClick={() => setOpen(true)}>Set money aside</Button>
        <p className="text-[12px] text-ink-mute text-center mt-3">Money in your tax vault is kept separate so it is ready when tax is due.</p>
      </Body>
      <AmountSheet open={open} onClose={() => setOpen(false)} title="Set aside for tax" cta="Move to tax vault" max={s.balance} onSubmit={(v) => { d({ type: 'setAsideTax', amount: v }); toast('Added to tax vault') }} />
    </>
  )
}
