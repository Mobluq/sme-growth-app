import { useState } from 'react'
import { Copy, Link2, Plus } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Row, useToast } from '../../ui/primitives'
import { AmountSheet } from '../../components/AmountSheet'
import { ChevronRight } from 'lucide-react'

export function Receive() {
  const s = useApp(); const d = useDispatch(); const toast = useToast(); const { push } = useNav()
  const [open, setOpen] = useState(false)
  const acct = '0' + (s.business.name.length * 73 + 4821).toString().padStart(9, '0')
  const link = `gtgrowth.ng/pay/${s.business.name.toLowerCase().replace(/\s+/g, '')}`
  const copy = (t: string, m: string) => { try { navigator.clipboard.writeText(t) } catch { /* */ } toast(m) }
  return (
    <>
      <ScreenHeader title="Receive money" />
      <Body>
        <Card className="p-5 text-center">
          <div className="text-[12.5px] text-ink-mute">Your business account</div>
          <div className="text-[30px] font-extrabold text-ink tnum mt-1">{acct}</div>
          <div className="text-[13.5px] text-ink-soft font-semibold mt-1">GTBank · {s.business.name} Ltd</div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" full className="h-12" onClick={() => copy(acct, 'Account number copied')}><Copy size={16} /> Copy</Button>
            <Button variant="dark" full className="h-12" onClick={() => copy(acct, 'Details shared')}>Share</Button>
          </div>
        </Card>

        <Card className="p-4 mt-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gt-50 grid place-items-center text-gt"><Link2 size={18} /></span>
            <div className="flex-1 min-w-0"><div className="text-[14.5px] font-bold text-ink">Payment link</div><div className="text-[12px] text-ink-mute truncate">{link}</div></div>
          </div>
          <Button variant="subtle" full className="h-12 mt-3" onClick={() => copy(link, 'Payment link copied')}>Copy payment link</Button>
        </Card>

        <button onClick={() => setOpen(true)} className="w-full flex items-center gap-3 mt-4 p-4 rounded-2xl bg-white border border-line active:scale-[.99] transition">
          <span className="w-10 h-10 rounded-full bg-paper border border-line grid place-items-center"><Plus size={18} /></span>
          <span className="text-left"><span className="block text-[14.5px] font-bold text-ink">Record a payment</span><span className="block text-[12px] text-ink-mute">Log cash or a transfer you received</span></span>
        </button>
        <Card className="px-4 mt-4"><Row title="See all collections" sub="Payment links, virtual account, history" right={<ChevronRight size={18} className="text-ink-mute" />} onClick={() => push('collections')} /></Card>
      </Body>
      <AmountSheet open={open} onClose={() => setOpen(false)} title="Record a payment" cta="Add to collections" onSubmit={(v) => { d({ type: 'receive', amount: v }); toast('Payment recorded') }} />
    </>
  )
}
