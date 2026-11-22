import { Check, Phone, MapPin, Store, Activity, ChevronRight, Banknote } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, Avatar, Pill, cx } from '../../ui/primitives'
import { naira } from '../../lib/format'
import type { PosStage } from '../../lib/types'

const STEPS: { key: PosStage; label: string }[] = [
  { key: 'requested', label: 'Requested' },
  { key: 'assigned', label: 'Officer assigned' },
  { key: 'delivering', label: 'On the way' },
  { key: 'active', label: 'Active' },
]

export function PosStatus() {
  const s = useApp(); const d = useDispatch(); const { push } = useNav()
  const pos = s.pos
  const idx = STEPS.findIndex((x) => x.key === pos.stage)

  return (
    <>
      <ScreenHeader title="Your POS" />
      <Body>
        <div className="flex items-center justify-between py-2">
          {STEPS.map((st, i) => (
            <div key={st.key} className="flex-1 flex flex-col items-center relative">
              {i > 0 && <span className={cx('absolute right-1/2 top-3.5 h-0.5 w-full', i <= idx ? 'bg-gt' : 'bg-line')} />}
              <span className={cx('relative z-10 w-7 h-7 rounded-full grid place-items-center text-[11px] font-bold', i < idx ? 'bg-gt text-white' : i === idx ? 'bg-gt text-white ring-4 ring-gt/20' : 'bg-line text-ink-mute')}>
                {i < idx ? <Check size={14} /> : i + 1}
              </span>
              <span className={cx('text-[10px] font-semibold mt-1.5 text-center leading-tight', i <= idx ? 'text-ink' : 'text-ink-mute')}>{st.label}</span>
            </div>
          ))}
        </div>

        {pos.stage === 'requested' && (
          <Card className="p-5 text-center mt-5">
            <span className="w-14 h-14 rounded-full bg-gt-50 grid place-items-center text-gt mx-auto animate-pulse"><Store size={24} /></span>
            <h2 className="text-[17px] font-bold text-ink mt-4">Finding an officer near you</h2>
            <p className="text-[13px] text-ink-mute mt-1">We are matching your request to a Field Sales Officer who covers your area.</p>
          </Card>
        )}

        {(pos.stage === 'assigned' || pos.stage === 'delivering') && (
          <>
            <Card className="p-4 mt-5">
              <div className="flex items-center gap-3">
                <Avatar name={pos.fsoName ?? 'Officer'} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-ink">{pos.fsoName}</div>
                  <div className="text-[12px] text-ink-mute">GTCO Field Sales Officer · Surulere</div>
                </div>
                <a href={`tel:${pos.fsoPhone}`} className="w-11 h-11 rounded-full bg-gt grid place-items-center text-white"><Phone size={18} /></a>
              </div>
              <div className="h-px bg-line my-3" />
              <div className="flex items-center gap-2 text-[13px] text-ink-soft"><MapPin size={15} className="text-gt" /> {pos.stage === 'delivering' ? 'On the way · about 25 min' : 'Delivering to you today'}</div>
            </Card>
            {pos.stage === 'delivering' && <Card className="mt-3 h-28 grid place-items-center text-ink-mute text-[12px]" >Live route · Surulere → your shop</Card>}
          </>
        )}

        {pos.stage === 'active' && (
          <>
            <Card className="p-5 mt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Activity size={16} className="text-good" /><span className="text-[13px] font-semibold text-ink">Terminal {pos.terminalId}</span></div>
                <Pill tone="good">Active</Pill>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-2xl bg-paper p-3"><div className="text-[11px] text-ink-mute font-semibold">TODAY</div><div className="text-[18px] font-extrabold text-ink tnum mt-0.5">{naira(pos.todayVolume ?? 0)}</div></div>
                <div className="rounded-2xl bg-paper p-3"><div className="text-[11px] text-ink-mute font-semibold">THIS WEEK</div><div className="text-[18px] font-extrabold text-ink tnum mt-0.5">{pos.weekTxns} sales</div></div>
              </div>
              <div className="flex items-center justify-between mt-3 text-[13px]"><span className="text-ink-mute">Idle during work hours</span><span className="font-semibold text-good">No · working</span></div>
              <p className="text-[11.5px] text-ink-mute mt-3">Field Pulse watches this terminal for your officer. If it goes quiet in work hours, they get a flag and check in.</p>
            </Card>
            {s.loan && !s.loan.accepted && (
              <Card className="p-4 mt-3 bg-gt-50 border-gt-100" onClick={() => push('loans')}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-white grid place-items-center text-gt shrink-0"><Banknote size={18} /></span>
                  <div className="flex-1"><div className="text-[14px] font-bold text-ink">Working capital unlocked</div><div className="text-[12px] text-ink-soft">Your sales qualify you for {naira(s.loan.amount)}.</div></div>
                  <ChevronRight size={18} className="text-gt" />
                </div>
              </Card>
            )}
          </>
        )}

        {pos.stage !== 'active' && (
          <Button variant="outline" full className="mt-6" onClick={() => d({ type: 'advancePos' })}>Simulate next step (demo)</Button>
        )}
      </Body>
    </>
  )
}
