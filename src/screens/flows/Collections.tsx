import { Link2, Copy, Building2 } from 'lucide-react'
import { useApp } from '../../store/store'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, SectionTitle, useToast } from '../../ui/primitives'
import { TxnRow } from '../../components/TxnRow'
import { useNav } from '../../nav/nav'

export function Collections() {
  const s = useApp(); const toast = useToast(); const { push } = useNav()
  const virtual = '95' + (s.business.name.length * 112 + 3380).toString().padStart(8, '0')
  const link = `gtgrowth.ng/pay/${s.business.name.toLowerCase().replace(/\s+/g, '')}`
  const cols = s.txns.filter((t) => t.kind === 'collection')
  const total = cols.reduce((t, c) => t + c.amount, 0)
  const copy = (t: string, m: string) => { try { navigator.clipboard.writeText(t) } catch { /* */ } toast(m) }
  return (
    <>
      <ScreenHeader title="Collections" />
      <Body>
        <Card className="p-5">
          <div className="text-[12.5px] text-ink-mute">Collected this month</div>
          <div className="text-[30px] font-extrabold text-ink tnum mt-0.5">{'₦'}{total.toLocaleString('en-NG')}</div>
          <div className="text-[12.5px] text-ink-mute mt-1">{cols.length} customer payments</div>
        </Card>

        <Card className="p-4 mt-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-paper border border-line grid place-items-center"><Building2 size={18} /></span>
            <div className="flex-1 min-w-0"><div className="text-[14px] font-bold text-ink">Virtual account</div><div className="text-[12.5px] text-ink-mute">GTBank · {virtual}</div></div>
            <button onClick={() => copy(virtual, 'Virtual account copied')} className="text-gt"><Copy size={18} /></button>
          </div>
          <p className="text-[12px] text-ink-mute mt-2">Share this fixed account. Every payment to it lands here automatically.</p>
        </Card>

        <Card className="p-4 mt-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gt-50 grid place-items-center text-gt"><Link2 size={18} /></span>
            <div className="flex-1 min-w-0"><div className="text-[14px] font-bold text-ink">Payment link</div><div className="text-[12.5px] text-ink-mute truncate">{link}</div></div>
          </div>
          <Button variant="subtle" full className="h-12 mt-3" onClick={() => copy(link, 'Payment link copied')}>Share a payment link</Button>
        </Card>

        <SectionTitle>Recent collections</SectionTitle>
        <Card className="px-4 divide-y divide-line">
          {cols.map((t) => <TxnRow key={t.id} t={t} onClick={() => push('txn', { id: t.id })} />)}
        </Card>
      </Body>
    </>
  )
}
