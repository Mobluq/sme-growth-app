import { useState } from 'react'
import { Smartphone, Wifi, Zap, Tv, Droplet, GraduationCap, Dice5, Landmark, type LucideIcon } from 'lucide-react'
import { ScreenHeader, Body } from '../../ui/phone'
import { Card, Row, useToast } from '../../ui/primitives'
import { AmountSheet } from '../../components/AmountSheet'

const CATS: [LucideIcon, string][] = [
  [Smartphone, 'Airtime'], [Wifi, 'Data'], [Zap, 'Electricity'], [Tv, 'Cable TV'],
  [Droplet, 'Water'], [GraduationCap, 'Education'], [Dice5, 'Betting'], [Landmark, 'Government'],
]
const RECENT = [
  { name: 'PHCN Prepaid', sub: 'Meter 4512 0098 221', amt: '₦23,500' },
  { name: 'DSTV Compact', sub: 'Smartcard 7788 2213', amt: '₦19,000' },
  { name: 'MTN Airtime', sub: '0803 555 0142', amt: '₦5,000' },
]

export function PayBills() {
  const toast = useToast()
  const [sel, setSel] = useState<string | null>(null)
  return (
    <>
      <ScreenHeader title="Pay Bills" />
      <Body>
        <p className="text-[13.5px] text-ink-mute mb-4">Airtime, power, cable and more, straight from your account.</p>
        <div className="grid grid-cols-4 gap-2.5">
          {CATS.map(([I, label]) => (
            <button key={label} onClick={() => setSel(label)} className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-white border border-line active:scale-[.97] transition">
              <span className="w-10 h-10 rounded-full bg-gt-50 grid place-items-center text-gt"><I size={18} /></span>
              <span className="text-[11px] font-semibold text-ink-soft">{label}</span>
            </button>
          ))}
        </div>
        <h3 className="text-[15px] font-bold text-ink mt-6 mb-2">Recent bills</h3>
        <Card className="px-4 divide-y divide-line">
          {RECENT.map((r) => (
            <Row key={r.name} title={r.name} sub={r.sub} right={<span className="text-[13.5px] font-bold text-ink tnum">{r.amt}</span>} onClick={() => setSel(r.name)} />
          ))}
        </Card>
      </Body>
      <AmountSheet open={!!sel} onClose={() => setSel(null)} title={sel ? `Pay ${sel}` : 'Pay'} cta="Pay now" onSubmit={() => { toast('Payment successful'); setSel(null) }} />
    </>
  )
}
