import { Landmark, CreditCard, PiggyBank, TrendingUp } from 'lucide-react'
import { ScreenHeader, Body } from '../../ui/phone'
import { Card } from '../../ui/primitives'

const GROUP: [typeof Landmark, string, string][] = [
  [Landmark, 'GTBank', 'Business account, transfers, loans'],
  [CreditCard, 'HabariPay', 'POS, collections, payment links'],
  [PiggyBank, 'GT Pension Managers', 'Staff pension schemes'],
  [TrendingUp, 'GT Fund Managers', 'Money-market and investments'],
]

export function About() {
  return (
    <>
      <ScreenHeader title="About" />
      <Body>
        <Card className="p-5">
          <div className="text-[18px] font-extrabold text-ink">SME Growth</div>
          <p className="text-[13.5px] text-ink-soft mt-2 leading-relaxed">Banking built around your business, not just the owner. Start on the spot, run collections, POS and payroll in one view, and grow into loans, pensions and investments when you are ready.</p>
        </Card>

        <h3 className="text-[15px] font-bold text-ink mt-6 mb-2">One app. The whole GTCO Group.</h3>
        <Card className="px-4 divide-y divide-line">
          {GROUP.map(([I, a, b]) => (
            <div key={a} className="flex items-center gap-3 py-3.5">
              <span className="w-10 h-10 rounded-full bg-paper border border-line grid place-items-center text-ink shrink-0"><I size={18} /></span>
              <div><div className="text-[14px] font-bold text-ink">{a}</div><div className="text-[12px] text-ink-mute">{b}</div></div>
            </div>
          ))}
        </Card>

        <p className="text-[11.5px] text-ink-mute mt-6 leading-relaxed">A concept prototype for the "Evolving the Grassroots" idea. Figures are illustrative and the app is not connected to live banking systems.</p>
      </Body>
    </>
  )
}
