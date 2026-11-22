import { useState } from 'react'
import { Building2, ShieldCheck, Bell, HelpCircle, Info, RotateCcw, ChevronRight } from 'lucide-react'
import { useApp, useDispatch } from '../store/store'
import { useNav } from '../nav/nav'
import { Body } from '../ui/phone'
import { Button, Card, Avatar, Pill, Sheet } from '../ui/primitives'

export function More() {
  const s = useApp(); const d = useDispatch(); const { push } = useNav()
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

      <Card className="px-4 mt-4 divide-y divide-line">
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
