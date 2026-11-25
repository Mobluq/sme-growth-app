import { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, FileText, Headphones, Bell, Clock, ChevronRight, Users, Store, Receipt, TrendingUp, Banknote, type LucideIcon } from 'lucide-react'
import { useApp, useDispatch } from '../store/store'
import { useNav } from '../nav/nav'
import { Body } from '../ui/phone'
import { Avatar, Card, SectionTitle, Button } from '../ui/primitives'
import { MoneyCard } from '../components/MoneyCard'
import { TxnRow } from '../components/TxnRow'
import type { FeatureKey } from '../lib/types'

function QuickAction({ Icon, label, onClick }: { Icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 flex-1 active:opacity-70 transition">
      <span className="w-12 h-12 rounded-full bg-white border border-line grid place-items-center"><Icon size={20} className="text-ink" /></span>
      <span className="text-[12px] font-semibold text-ink-soft">{label}</span>
    </button>
  )
}

const AV = [['AO', '#E85C2A'], ['TB', '#3B82F6'], ['CE', '#16A06B'], ['FA', '#9333EA']] as [string, string][]
function Avatars() {
  return (
    <div className="flex items-center">
      {AV.map(([t, c], i) => <span key={i} className="w-7 h-7 rounded-full grid place-items-center text-[9px] font-bold text-white ring-2 ring-gt-50" style={{ background: c, marginLeft: i ? -8 : 0 }}>{t}</span>)}
      <span className="w-7 h-7 rounded-full grid place-items-center text-[9px] font-bold text-white ring-2 ring-gt-50 bg-ink" style={{ marginLeft: -8 }}>+4</span>
    </div>
  )
}

export function Home() {
  const s = useApp(); const d = useDispatch(); const { push, setTab } = useNav()
  const f = s.features
  const [dismissed, setDismissed] = useState<FeatureKey[]>([])

  const setups: { key: FeatureKey; q: string; body: string; cta: string; icon: LucideIcon; go: () => void }[] = [
    { key: 'payroll', q: 'Do you have people who work for you?', body: 'Pay your team and keep salaries organized in one place.', cta: 'Yes, set up payroll', icon: Users, go: () => setTab('payroll') },
    { key: 'pos', q: 'Want to accept card payments?', body: 'Get a POS terminal delivered and set up in person.', cta: 'Yes, get a POS', icon: Store, go: () => push('request-pos') },
    { key: 'invest', q: 'Have idle cash sitting still?', body: 'Put it to work and earn daily in a GT money market fund.', cta: 'Start investing', icon: TrendingUp, go: () => push('invest') },
    { key: 'loans', q: 'Need working capital?', body: 'An overdraft sized to your real sales history.', cta: 'See overdraft', icon: Banknote, go: () => push('loans') },
  ]
  const active = setups.filter((x) => !f[x.key] && !dismissed.includes(x.key)).slice(0, 2)
  const enable = (x: (typeof setups)[number]) => { d({ type: 'toggleFeature', key: x.key }); x.go() }

  return (
    <Body className="pt-1">
      <header className="flex items-center gap-3 mb-5">
        <Avatar name={s.business.name} size={46} />
        <div className="flex-1 min-w-0">
          <div className="text-[17px] font-bold text-ink leading-tight truncate">Hello, {s.business.name}</div>
          <div className="text-[12.5px] text-ink-mute">Welcome to your dashboard.</div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white border border-line grid place-items-center"><Headphones size={18} /></button>
        <button onClick={() => push('notifications')} className="relative w-10 h-10 rounded-full bg-white border border-line grid place-items-center">
          <Bell size={18} />
          {s.approvals.length > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-gt" />}
        </button>
      </header>

      <MoneyCard balance={s.balance} moneyIn={s.moneyIn} moneyOut={s.moneyOut} flow={s.flow} />

      <div className="flex gap-2 mt-5">
        <QuickAction Icon={ArrowUpRight} label="Transfer" onClick={() => push('transfer')} />
        <QuickAction Icon={ArrowDownLeft} label="Receive" onClick={() => push('receive')} />
        <QuickAction Icon={FileText} label="Pay Bills" onClick={() => push('pay-bills')} />
      </div>

      {s.approvals.length > 0 && (
        <button onClick={() => push('approvals')} className="w-full mt-5 flex items-center gap-3 p-4 rounded-xl2 bg-gt-50 border border-gt-100 active:scale-[.99] transition">
          <span className="w-10 h-10 rounded-full bg-white grid place-items-center shrink-0"><Clock size={18} className="text-gt" /></span>
          <span className="flex-1 text-left">
            <span className="block text-[14.5px] font-bold text-ink">{s.approvals.length} payments awaiting approval</span>
            <span className="block text-[12.5px] text-ink-soft">Review and approve requests</span>
          </span>
          <ChevronRight size={18} className="text-gt" />
        </button>
      )}

      {active.length > 0 && (<>
        <SectionTitle>Get Started with your business</SectionTitle>
        <div className="space-y-3">
          {active.map((x) => {
            const Icon = x.icon
            return (
              <Card key={x.key} className="p-4 bg-gt-50/60 border-gt-100">
                {x.key === 'payroll' ? <Avatars /> : <span className="w-10 h-10 rounded-full bg-white grid place-items-center text-gt"><Icon size={18} /></span>}
                <div className="text-[15px] font-bold text-ink mt-3">{x.q}</div>
                <div className="text-[12.5px] text-ink-soft mt-0.5">{x.body}</div>
                <div className="flex items-center gap-2 mt-3">
                  <Button onClick={() => enable(x)} className="flex-1 h-11">{x.cta}</Button>
                  <button onClick={() => setDismissed((v) => [...v, x.key])} className="px-4 h-11 rounded-full text-[13.5px] font-semibold text-ink-soft">Not now</button>
                </div>
              </Card>
            )
          })}
        </div>
      </>)}

      <SectionTitle action={<button onClick={() => push('txns-all')} className="text-[13px] font-semibold text-gt">See all</button>}>Recent activity</SectionTitle>
      <Card className="px-4 divide-y divide-line">
        {s.txns.slice(0, 4).map((t) => <TxnRow key={t.id} t={t} onClick={() => push('txn', { id: t.id })} />)}
      </Card>
    </Body>
  )
}
