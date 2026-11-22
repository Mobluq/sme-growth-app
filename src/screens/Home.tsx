import { ArrowUpRight, ArrowDownLeft, Users, Receipt, Bell, Headphones, Clock, ChevronRight, Store, PiggyBank, TrendingUp, Banknote, type LucideIcon } from 'lucide-react'
import { useApp, useDispatch } from '../store/store'
import { useNav } from '../nav/nav'
import { Body } from '../ui/phone'
import { Avatar, Card, SectionTitle } from '../ui/primitives'
import { MoneyCard } from '../components/MoneyCard'
import { SignalCard } from '../components/SignalCard'
import { TxnRow } from '../components/TxnRow'
import type { SignalKind } from '../lib/types'

function QuickAction({ Icon, label, onClick }: { Icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 flex-1 active:opacity-70 transition">
      <span className="w-14 h-14 rounded-2xl bg-white border border-line shadow-card flex items-center justify-center"><Icon size={22} className="text-ink" /></span>
      <span className="text-[12px] font-semibold text-ink-soft">{label}</span>
    </button>
  )
}

type Tile = { Icon: LucideIcon; label?: string; title?: string; sub?: string; onClick: () => void }

export function Home() {
  const s = useApp()
  const d = useDispatch()
  const { push, setTab } = useNav()
  const f = s.features

  const act = (kind: string) => {
    if (kind === 'pos') push(s.pos.stage === 'none' ? 'request-pos' : 'pos-status')
    else if (kind === 'loan') push('loans')
    else if (kind === 'payroll') setTab('payroll')
    else if (kind === 'tax') push('tax')
    else if (kind === 'invest') push('invest')
  }

  // Quick actions: transfers and collections are always here; the rest follow features.
  const quick: Tile[] = [
    { Icon: ArrowUpRight, label: 'Transfer', onClick: () => push('transfer') },
    { Icon: ArrowDownLeft, label: 'Receive', onClick: () => push('receive') },
  ]
  if (f.payroll) quick.push({ Icon: Users, label: 'Payroll', onClick: () => setTab('payroll') })
  if (f.pos) quick.push({ Icon: Store, label: 'POS', onClick: () => push(s.pos.stage === 'none' ? 'request-pos' : 'pos-status') })
  if (f.tax) quick.push({ Icon: Receipt, label: 'Tax', onClick: () => push('tax') })
  if (f.invest) quick.push({ Icon: PiggyBank, label: 'Invest', onClick: () => push('invest') })

  // "For your business" cards, also by feature.
  const cards: Tile[] = []
  if (f.payroll) cards.push({ Icon: Users, title: 'Pay your team', sub: 'Send invite links, they add their own details.', onClick: () => setTab('payroll') })
  if (f.pos) cards.push(s.pos.stage === 'none'
    ? { Icon: Store, title: 'Request a POS', sub: 'An officer delivers and sets it up for you.', onClick: () => push('request-pos') }
    : { Icon: Store, title: 'Track your POS', sub: 'See delivery and your live sales.', onClick: () => push('pos-status') })
  if (f.tax) cards.push({ Icon: PiggyBank, title: 'Set aside tax', sub: 'Track and save for tax payments.', onClick: () => push('tax') })
  if (f.invest) cards.push({ Icon: TrendingUp, title: 'Grow your cash', sub: 'Earn daily with GT Fund Managers.', onClick: () => push('invest') })
  if (f.loans) cards.push({ Icon: Banknote, title: 'Working capital', sub: 'See what your sales can borrow.', onClick: () => push('loans') })

  const featureFor: Record<SignalKind, boolean> = { pos: f.pos, loan: f.loans, payroll: f.payroll, tax: f.tax, invest: f.invest }
  const signals = s.signals.filter((sig) => featureFor[sig.kind])

  return (
    <Body className="pt-1">
      <header className="flex items-center gap-3 mb-5">
        <Avatar name={s.business.name} size={46} />
        <div className="flex-1 min-w-0">
          <div className="text-[17px] font-bold text-ink leading-tight truncate">Hello, {s.business.name}</div>
          <div className="text-[12.5px] text-ink-mute">Welcome back</div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center"><Headphones size={18} /></button>
        <button onClick={() => push('notifications')} className="relative w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center">
          <Bell size={18} />
          {s.approvals.length > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-gt" />}
        </button>
      </header>

      <MoneyCard balance={s.balance} moneyIn={s.moneyIn} moneyOut={s.moneyOut} flow={s.flow} />

      <div className="flex gap-2 mt-5 mb-1">
        {quick.slice(0, 4).map((q, i) => <QuickAction key={i} Icon={q.Icon} label={q.label!} onClick={q.onClick} />)}
      </div>

      {signals.length > 0 && (
        <div className="mt-5 space-y-3">
          {signals.map((sig) => (
            <SignalCard key={sig.id} signal={sig} onAct={() => act(sig.kind)} onDismiss={() => d({ type: 'dismissSignal', id: sig.id })} />
          ))}
        </div>
      )}

      {s.approvals.length > 0 && (
        <button onClick={() => push('approvals')} className="w-full mt-5 flex items-center gap-3 p-4 rounded-xl2 bg-gt-50 border border-gt-100 active:scale-[.99] transition">
          <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0"><Clock size={18} className="text-gt" /></span>
          <span className="flex-1 text-left">
            <span className="block text-[14.5px] font-bold text-ink">{s.approvals.length} payments awaiting approval</span>
            <span className="block text-[12.5px] text-ink-soft">Review and approve requests</span>
          </span>
          <ChevronRight size={18} className="text-gt" />
        </button>
      )}

      {cards.length > 0 && (<>
        <SectionTitle>For your business</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {cards.slice(0, 4).map((c, i) => {
            const Icon = c.Icon
            return (
              <Card key={i} className="p-4" onClick={c.onClick}>
                <span className="w-9 h-9 rounded-xl bg-paper border border-line flex items-center justify-center mb-6"><Icon size={18} className="text-ink" /></span>
                <div className="text-[14.5px] font-bold text-ink">{c.title}</div>
                <div className="text-[12px] text-ink-mute mt-0.5">{c.sub}</div>
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
