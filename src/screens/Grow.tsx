import { useState } from 'react'
import { Sparkles, TrendingUp, Banknote, Lock, ChevronRight } from 'lucide-react'
import { useApp } from '../store/store'
import { useNav } from '../nav/nav'
import { Body } from '../ui/phone'
import { Button, Card, Pill, Segmented } from '../ui/primitives'
import { Progress } from '../ui/charts'
import { naira } from '../lib/format'

export function Grow() {
  const s = useApp(); const { push } = useNav()
  const [t, setT] = useState<'tax' | 'invest'>('tax')
  const savedPct = s.tax.estimated ? s.tax.saved / s.tax.estimated : 0

  return (
    <Body className="pt-2">
      <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Grow</h1>
      <p className="text-[13.5px] text-ink-mute mt-0.5">Set aside tax and grow your business funds.</p>

      <div className="mt-4"><Segmented value={t} onChange={setT} options={[{ value: 'tax', label: 'Tax' }, { value: 'invest', label: 'Invest' }]} /></div>

      {t === 'tax' ? (
        <Card className="p-5 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink-soft flex items-center gap-1.5"><Sparkles size={14} className="text-gt" /> Estimated tax</span>
            <Pill tone="good">AI calculated</Pill>
          </div>
          <div className="text-[32px] font-extrabold text-ink tnum mt-1">{naira(s.tax.estimated)}</div>
          <div className="text-[12.5px] text-ink-mute">For this quarter, from your turnover</div>
          <div className="h-px bg-line my-4" />
          <div className="flex items-center justify-between text-[13px] mb-2"><span className="text-ink-mute">Saved so far</span><span className="font-semibold text-ink">{Math.round(savedPct * 100)}% of estimate</span></div>
          <Progress pct={savedPct} />
          <div className="text-[18px] font-extrabold text-ink tnum mt-2">{naira(s.tax.saved)}</div>
          <Button full className="mt-4" onClick={() => push('tax')}>Set money aside</Button>
        </Card>
      ) : (
        <Card className="p-5 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink-soft flex items-center gap-1.5"><TrendingUp size={15} className="text-gt" /> GT Fund Managers</span>
            <Pill tone="good">{(s.invest.rateAnnual * 100).toFixed(1)}% p.a.</Pill>
          </div>
          <div className="text-[12.5px] text-ink-mute mt-2">Money market fund balance</div>
          <div className="text-[32px] font-extrabold text-ink tnum">{naira(s.invest.balance)}</div>
          <p className="text-[12.5px] text-ink-mute mt-1">Grows every day. Withdraw anytime.</p>
          <Button full className="mt-4" onClick={() => push('invest')}>{s.invest.balance > 0 ? 'Add funds' : 'Start investing'}</Button>
        </Card>
      )}

      <h3 className="text-[16px] font-bold text-ink mt-6 mb-2">Working capital</h3>
      {s.loan ? (
        <Card className="p-5 bg-gt-50 border-gt-100" onClick={() => push('loans')}>
          <div className="flex items-center gap-2 text-gt"><Banknote size={16} /><span className="text-[11px] font-bold tracking-wide uppercase">Offer ready</span></div>
          <div className="text-[26px] font-extrabold text-ink tnum mt-1">{naira(s.loan.amount)}</div>
          <div className="text-[12.5px] text-ink-soft">{s.loan.reason}</div>
          <div className="flex items-center justify-end text-gt text-[13px] font-semibold mt-2">See offer <ChevronRight size={16} /></div>
        </Card>
      ) : (
        <Card className="p-5" onClick={() => push('loans')}>
          <span className="w-10 h-10 rounded-full bg-paper border border-line grid place-items-center"><Lock size={16} className="text-ink-mute" /></span>
          <div className="text-[15px] font-bold text-ink mt-3">Unlock a loan with your sales</div>
          <div className="text-[12.5px] text-ink-mute mt-0.5">Loan size is set by your POS and collections history. Start taking card payments to build it.</div>
        </Card>
      )}
    </Body>
  )
}
