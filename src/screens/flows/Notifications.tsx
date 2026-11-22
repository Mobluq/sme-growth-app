import { Clock, ArrowDownLeft, Sparkles, Users } from 'lucide-react'
import { useApp } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Card } from '../../ui/primitives'
import { naira, timeAgo } from '../../lib/format'

export function Notifications() {
  const s = useApp(); const { push, setTab } = useNav()
  const items: { icon: typeof Clock; title: string; sub: string; when: string; go?: () => void; tone?: string }[] = []
  if (s.approvals.length) items.push({ icon: Clock, title: `${s.approvals.length} payments need your approval`, sub: 'Review and release them', when: 'now', go: () => push('approvals'), tone: 'gt' })
  s.signals.forEach((sig) => items.push({ icon: Sparkles, title: sig.title, sub: sig.cta, when: 'today', go: () => (sig.kind === 'pos' ? push('request-pos') : sig.kind === 'loan' ? push('loans') : setTab('grow')), tone: 'gt' }))
  const col = s.txns.find((t) => t.kind === 'collection')
  if (col) items.push({ icon: ArrowDownLeft, title: 'Customer payment received', sub: `${naira(col.amount)} into your account`, when: timeAgo(col.at), tone: 'good' })
  items.push({ icon: Users, title: 'Payroll reminder', sub: `Pay day is the ${s.payrollDay ?? 28}th`, when: 'this week' })

  return (
    <>
      <ScreenHeader title="Notifications" />
      <Body>
        <Card className="px-4 divide-y divide-line">
          {items.map((it, i) => (
            <button key={i} onClick={it.go} disabled={!it.go} className="w-full flex items-center gap-3 py-3.5 text-left active:opacity-70">
              <span className={`w-10 h-10 rounded-full grid place-items-center shrink-0 ${it.tone === 'good' ? 'bg-good/10 text-good' : it.tone === 'gt' ? 'bg-gt-50 text-gt' : 'bg-paper border border-line text-ink'}`}><it.icon size={18} /></span>
              <span className="flex-1 min-w-0"><span className="block text-[14px] font-semibold text-ink">{it.title}</span><span className="block text-[12px] text-ink-mute truncate">{it.sub}</span></span>
              <span className="text-[11px] text-ink-mute shrink-0">{it.when}</span>
            </button>
          ))}
        </Card>
      </Body>
    </>
  )
}
