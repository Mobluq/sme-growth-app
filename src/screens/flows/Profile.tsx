import { useApp } from '../../store/store'
import { ScreenHeader, Body } from '../../ui/phone'
import { Card, Avatar, Pill } from '../../ui/primitives'

export function Profile() {
  const s = useApp()
  const acct = '0' + (s.business.name.length * 73 + 4821).toString().padStart(9, '0')
  const who = { self: 'I do it all myself', staff: 'Staff start, I approve', both: 'A bit of both' }[s.business.whoHandles]
  const rows: [string, string][] = [
    ['Legal name', `${s.business.name} Ltd`],
    ['Business type', s.business.type],
    ['Category', s.business.category],
    ['Account number', acct],
    ['Bank', 'GTBank'],
    ['Approvals', who],
  ]
  return (
    <>
      <ScreenHeader title="Business profile" />
      <Body>
        <div className="flex flex-col items-center text-center py-5">
          <Avatar name={s.business.name} size={72} />
          <div className="text-[19px] font-extrabold text-ink mt-3">{s.business.name}</div>
          <div className="text-[13px] text-ink-mute">{s.business.type}</div>
          <div className="mt-2"><Pill tone="good">KYC verified</Pill></div>
        </div>
        <Card className="px-4 divide-y divide-line">
          {rows.map(([k, v]) => <div key={k} className="flex items-center justify-between py-3.5 text-[14px] gap-3"><span className="text-ink-mute shrink-0">{k}</span><span className="font-semibold text-ink text-right">{v}</span></div>)}
        </Card>
      </Body>
    </>
  )
}
