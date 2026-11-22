import { useState } from 'react'
import { UserPlus, Link2, Check } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Avatar, Field, Sheet, Pill, useToast } from '../../ui/primitives'
import { naira } from '../../lib/format'

export function InviteStaff() {
  const s = useApp(); const d = useDispatch(); const toast = useToast()
  const [open, setOpen] = useState(false)
  const [f, setF] = useState({ name: '', role: '', salary: '' })
  const invited = s.staff.filter((x) => x.status === 'invited')
  const add = () => {
    if (!f.name) return
    d({ type: 'inviteStaff', name: f.name, role: f.role || 'Staff', salary: Number(f.salary || '0') })
    setF({ name: '', role: '', salary: '' }); setOpen(false); toast('Invite sent')
  }
  return (
    <>
      <ScreenHeader title="Invite staff" />
      <Body>
        <Card className="p-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-gt-50 grid place-items-center text-gt shrink-0"><Link2 size={18} /></span>
          <p className="text-[13px] text-ink-soft">Send an invite link. Staff fill in their own bank details and ID. You just approve.</p>
        </Card>

        <button onClick={() => setOpen(true)} className="w-full flex items-center gap-3 mt-4 p-4 rounded-2xl bg-white border border-line active:scale-[.99] transition">
          <span className="w-10 h-10 rounded-full bg-gt grid place-items-center text-white"><UserPlus size={19} /></span>
          <span className="text-left"><span className="block text-[14.5px] font-bold text-ink">Add a staff member</span><span className="block text-[12px] text-ink-mute">We text them an invite to join</span></span>
        </button>

        {invited.length > 0 && <>
          <h3 className="text-[13px] font-bold text-ink-mute mt-6 mb-1">Waiting to join</h3>
          <Card className="px-4 divide-y divide-line">
            {invited.map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-3">
                <Avatar name={m.name} size={40} />
                <div className="flex-1 min-w-0"><div className="text-[14px] font-semibold text-ink truncate">{m.name}</div><div className="text-[12px] text-ink-mute">{m.role} · {naira(m.salary)}</div></div>
                <button onClick={() => { d({ type: 'activateStaff', id: m.id }); toast(`${m.name.split(' ')[0]} joined`) }} className="flex items-center gap-1 text-[12.5px] font-semibold text-gt"><Check size={14} /> Mark joined</button>
              </div>
            ))}
          </Card>
          <p className="text-[12px] text-ink-mute mt-2">Tap "Mark joined" to simulate a staff member completing their own onboarding.</p>
        </>}

        {s.staff.some((x) => x.status === 'active') && <>
          <h3 className="text-[13px] font-bold text-ink-mute mt-6 mb-1">On the team</h3>
          <Card className="px-4 divide-y divide-line">
            {s.staff.filter((x) => x.status === 'active').map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-3">
                <Avatar name={m.name} size={40} />
                <div className="flex-1 min-w-0"><div className="text-[14px] font-semibold text-ink truncate">{m.name}</div><div className="text-[12px] text-ink-mute">{m.role}</div></div>
                <Pill tone="good">active</Pill>
              </div>
            ))}
          </Card>
        </>}
      </Body>
      <Sheet open={open} onClose={() => setOpen(false)} title="Add staff member">
        <div className="space-y-4">
          <Field label="Full name" placeholder="e.g. Chioma Obi" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Field label="Role" placeholder="e.g. Sales" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} />
          <Field label="Monthly salary" prefix={'₦'} inputMode="numeric" placeholder="80000" value={f.salary} onChange={(e) => setF({ ...f, salary: e.target.value })} />
          <Button full disabled={!f.name} onClick={add}>Send invite</Button>
        </div>
      </Sheet>
    </>
  )
}
