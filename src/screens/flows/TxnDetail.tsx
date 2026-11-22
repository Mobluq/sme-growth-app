import { Share2, Flag } from 'lucide-react'
import { useApp } from '../../store/store'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Pill } from '../../ui/primitives'
import { naira, dayLabel } from '../../lib/format'

export function TxnDetail({ id }: { id?: string }) {
  const s = useApp()
  const t = s.txns.find((x) => x.id === id)
  if (!t) return <><ScreenHeader title="Transaction" /><Body><p className="text-ink-mute mt-6 text-center">Transaction not found.</p></Body></>
  const income = t.amount > 0
  return (
    <>
      <ScreenHeader title="Transaction" />
      <Body>
        <div className="text-center py-6">
          <div className={`text-[40px] font-extrabold tnum tracking-tight ${income ? 'text-good' : 'text-ink'}`}>{income ? '+' : ''}{naira(t.amount)}</div>
          <div className="mt-2"><Pill tone={t.status === 'completed' ? 'good' : t.status === 'pending' ? 'warn' : 'default'}>{t.status}</Pill></div>
        </div>
        <Card className="px-4 divide-y divide-line">
          {[['Description', t.title], ['Type', t.sub ?? t.kind], ['Date', dayLabel(t.at)], ['Reference', 'GTX' + t.id.toUpperCase().slice(0, 8)], ['Channel', 'SME Growth']].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-3.5 text-[14px]"><span className="text-ink-mute">{k}</span><span className="font-semibold text-ink text-right">{v}</span></div>
          ))}
        </Card>
        <div className="flex gap-2 mt-5">
          <Button variant="outline" full className="h-12"><Share2 size={16} /> Share</Button>
          <Button variant="ghost" full className="h-12 text-ink-mute"><Flag size={16} /> Report</Button>
        </div>
      </Body>
    </>
  )
}
