import { useState } from 'react'
import { Store, ShieldCheck, Zap, UserCheck, type LucideIcon } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Field, Sheet, useToast } from '../../ui/primitives'

export function RequestPos() {
  const s = useApp(); const d = useDispatch(); const { pop, push } = useNav(); const toast = useToast()
  const [open, setOpen] = useState(false)
  const [addr, setAddr] = useState('14 Adeniran Ogunsanya, Surulere, Lagos')

  if (s.pos.stage !== 'none') return (
    <>
      <ScreenHeader title="Request a POS" />
      <Body>
        <Card className="p-5 text-center mt-4">
          <span className="w-14 h-14 rounded-full bg-gt-50 grid place-items-center text-gt mx-auto"><Store size={24} /></span>
          <h1 className="text-[18px] font-bold text-ink mt-4">POS request in progress</h1>
          <p className="text-[13.5px] text-ink-mute mt-1">You already have a terminal on the way. Track it live.</p>
        </Card>
        <Button full className="mt-6" onClick={() => { pop(); push('pos-status') }}>Track your POS</Button>
      </Body>
    </>
  )

  return (
    <>
      <ScreenHeader title="Request a POS" />
      <Body>
        <Card className="p-5">
          <span className="w-12 h-12 rounded-2xl bg-gt grid place-items-center text-white"><Store size={24} /></span>
          <h1 className="text-[19px] font-extrabold text-ink mt-4">Take card payments</h1>
          <p className="text-[13.5px] text-ink-mute mt-1">A GTCO officer brings your terminal, sets it up and shows you the first sale. No forms, no second KYC.</p>
        </Card>
        <div className="space-y-2.5 mt-4">
          {([[Zap, 'Delivered and activated', 'An officer brings it and sets it up in person.'], [ShieldCheck, 'Settles to your account', 'Every sale lands in your GTBank account, not a wallet.'], [UserCheck, 'Profile already here', 'Your KYC is in the app, so there is nothing to fill in.']] as [LucideIcon, string, string][]).map(([I, a, b], i) => (
            <Card key={i} className="p-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-paper border border-line grid place-items-center shrink-0"><I size={17} className="text-ink" /></span>
              <div><div className="text-[13.5px] font-bold text-ink">{a}</div><div className="text-[12px] text-ink-mute">{b}</div></div>
            </Card>
          ))}
        </div>
        <Button full className="mt-6" onClick={() => setOpen(true)}>Request POS terminal</Button>
      </Body>
      <Sheet open={open} onClose={() => setOpen(false)} title="Where should we bring it?">
        <div className="space-y-4">
          <Field label="Delivery address" value={addr} onChange={(e) => setAddr(e.target.value)} />
          <div className="rounded-2xl bg-white border border-line p-4 text-[13px] text-ink-soft">A one-time terminal deposit applies, refunded against your sales. No monthly rental.</div>
          <Button full onClick={() => { d({ type: 'requestPos' }); toast('POS requested'); setOpen(false); pop(); push('pos-status') }}>Confirm request</Button>
        </div>
      </Sheet>
    </>
  )
}
