import { CalendarCheck, UserPlus, Users } from 'lucide-react'
import { useApp } from '../store/store'
import { useNav } from '../nav/nav'
import { Body } from '../ui/phone'
import { Button, Card, Avatar, Pill, SectionTitle } from '../ui/primitives'
import { naira } from '../lib/format'

export function Payroll() {
  const s = useApp(); const { push } = useNav()
  const active = s.staff.filter((x) => x.status === 'active')
  const total = active.reduce((t, x) => t + x.salary, 0)

  if (s.payrollDay == null) return (
    <Body className="pt-2">
      <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Payroll</h1>
      <p className="text-[13.5px] text-ink-mute mt-0.5">Manage your team and payroll.</p>
      <div className="flex flex-col items-center text-center mt-20">
        <span className="w-16 h-16 rounded-full bg-paper border border-line grid place-items-center"><CalendarCheck size={26} className="text-ink-soft" /></span>
        <div className="text-[18px] font-bold text-ink mt-4">Set up payroll</div>
        <p className="text-[13.5px] text-ink-mute mt-1 max-w-[260px]">Choose a monthly pay day and add your team. Staff fill in their own details.</p>
      </div>
      <Button full className="mt-10" onClick={() => push('payroll-setup')}>Set up payroll schedule</Button>
    </Body>
  )

  return (
    <Body className="pt-2">
      <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Payroll</h1>
      <p className="text-[13.5px] text-ink-mute mt-0.5">Your team and monthly pay.</p>

      <Card className="p-5 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[12.5px] text-ink-mute">Next payroll</div>
            <div className="text-[18px] font-extrabold text-ink mt-0.5">{s.payrollDay}th {new Date().toLocaleString('en', { month: 'long' })}</div>
          </div>
          <Pill tone="gt">{active.length} staff</Pill>
        </div>
        <div className="flex items-end justify-between mt-4">
          <div><div className="text-[12px] text-ink-mute">Total</div><div className="text-[24px] font-extrabold text-ink tnum">{naira(total)}</div></div>
          <Button className="h-12 px-6" onClick={() => push('run-payroll')}>Run now</Button>
        </div>
      </Card>

      <SectionTitle action={<button onClick={() => push('invite-staff')} className="flex items-center gap-1 text-[13px] font-semibold text-gt"><UserPlus size={14} /> Invite</button>}>Your team</SectionTitle>
      <Card className="px-4 divide-y divide-line">
        {s.staff.map((m) => (
          <div key={m.id} className="flex items-center gap-3 py-3">
            <Avatar name={m.name} size={42} />
            <div className="flex-1 min-w-0"><div className="text-[14.5px] font-semibold text-ink truncate">{m.name}</div><div className="text-[12px] text-ink-mute">{m.role}</div></div>
            <div className="text-right">
              <div className="text-[14px] font-bold text-ink tnum">{naira(m.salary)}</div>
              {m.status === 'invited' && <Pill tone="warn">invited</Pill>}
            </div>
          </div>
        ))}
      </Card>
      <p className="text-[12px] text-ink-mute mt-3 flex items-center gap-1.5"><Users size={13} /> Invited staff add their own bank details. You just approve.</p>
    </Body>
  )
}
