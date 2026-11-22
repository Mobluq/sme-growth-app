import { useState } from 'react'
import { Building2, ShieldCheck, Bell, HelpCircle, Info, RotateCcw, ChevronRight, Users, Store, Receipt, TrendingUp, Banknote, type LucideIcon } from 'lucide-react'
import { useApp, useDispatch } from '../store/store'
import { useNav } from '../nav/nav'
import { Body } from '../ui/phone'
import { Button, Card, Avatar, Pill, Sheet, cx } from '../ui/primitives'
import type { FeatureKey } from '../lib/types'

const MANAGE: { key: FeatureKey; label: string; sub: string; Icon: LucideIcon }[] = [
  { key: 'payroll', label: 'Pay staff & payroll', sub: 'Adds the Payroll tab', Icon: Users },
  { key: 'pos', label: 'Card payments (POS)', sub: 'Request and track a terminal', Icon: Store },
  { key: 'tax', label: 'Set aside tax', sub: 'Shows in Grow', Icon: Receipt },
  { key: 'invest', label: 'Grow & invest cash', sub: 'Shows in Grow', Icon: TrendingUp },
  { key: 'loans', label: 'Working capital', sub: 'Shows in Grow', Icon: Banknote },
]

function Switch({ on }: { on: boolean }) {
  return (
    <span className={cx('w-11 h-6 rounded-full p-0.5 transition-colors shrink-0', on ? 'bg-gt' : 'bg-line')}>
      <span className={cx('block w-5 h-5 rounded-full bg-white shadow-sm transition-transform', on ? 'translate-x-5' : 'translate-x-0')} />
    </span>
  )
}

export function More() {
  const s = useApp(); const d = useDispatch(); const { push } = useNav()
  const f = s.features
  const [reset, setReset] = useState(false)
  const Item = ({ Icon, label, onClick, danger }: { Icon: typeof Info; label: string; onClick: () => void; danger?: boolean }) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 py-3.5 active:opacity-70">
      <span className={`w-9 h-9 rounded-full grid place-items-center ${danger ? 'bg-gt-50 text-gt' : 'bg-paper border border-line text-ink'}`}><Icon size={17} /></span>
      <span className={`flex-1 text-left text-[14.5px] font-semibold ${danger ? 'text-gt' : 'text-ink'}`}>{label}</span>
      <ChevronRight size={18} className="text-ink-mute" />
    </button>
  )
  return (
    <Body className="pt-2">
      <h1 className="text-[26px] font-extrabold text-ink tracking-tight">More</h1>
      <Card className="p-4 mt-4 flex items-center gap-3">
        <Avatar name={s.business.name} size={52} />
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-bold text-ink truncate">{s.business.name}</div>
          <div className="text-[12.5px] text-ink-mute">Business account · GTBank</div>
        </div>
        <Pill tone="good"><ShieldCheck size={12} /> Verified</Pill>
      </Card>

      <h2 className="text-[13px] font-bold text-ink-soft mt-6 mb-2 uppercase tracking-wide">Your app</h2>
      <Card className="px-4 divide-y divide-line">
        {MANAGE.map((m) => {
          const Icon = m.Icon
          return (
            <button key={m.key} onClick={() => d({ type: 'toggleFeature', key: m.key })} className="w-full flex items-center gap-3 py-3.5 active:opacity-70">
              <span className="w-9 h-9 rounded-full grid place-items-center bg-paper border border-line text-ink"><Icon size={17} /></span>
              <span className="flex-1 text-left">
                <span className="block text-[14.5px] font-semibold text-ink">{m.label}</span>
                <span className="block text-[11.5px] text-ink-mute">{m.sub}</span>
              </span>
              <Switch on={f[m.key]} />
            </button>
          )
        })}
      </Card>
      <p className="text-[11.5px] text-ink-mute mt-2 px-1">Sending and receiving money stay on for every account.</p>

      <Card className="px-4 mt-5 divide-y divide-line">
        <Item Icon={Building2} label="Business profile" onClick={() => push('profile')} />
        <Item Icon={Bell} label="Notifications" onClick={() => push('notifications')} />
        <Item Icon={ShieldCheck} label="Security & PIN" onClick={() => push('about')} />
        <Item Icon={HelpCircle} label="Help & support" onClick={() => push('about')} />
        <Item Icon={Info} label="About SME Growth" onClick={() => push('about')} />
      </Card>

      <Card className="px-4 mt-4">
        <Item Icon={RotateCcw} label="Reset demo" onClick={() => setReset(true)} danger />
      </Card>
      <p className="text-center text-[11.5px] text-ink-mute mt-6">SME Growth · a GTCO concept · v1.0</p>

      <Sheet open={reset} onClose={() => setReset(false)} title="Reset the demo?">
        <p className="text-[13.5px] text-ink-soft mb-5">This clears your changes and starts again from onboarding. Handy for a fresh walk-through.</p>
        <div className="flex gap-2">
          <Button variant="outline" full onClick={() => setReset(false)}>Cancel</Button>
          <Button full onClick={() => { setReset(false); d({ type: 'reset' }) }}>Reset</Button>
        </div>
      </Sheet>
    </Body>
  )
}
