import { useState } from 'react'
import { useDispatch } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, cx } from '../../ui/primitives'

export function PayrollSetup() {
  const d = useDispatch(); const { pop, push } = useNav()
  const [day, setDay] = useState(28)
  return (
    <>
      <ScreenHeader title="Set up payroll" />
      <Body>
        <h2 className="text-[17px] font-bold text-ink mt-2">Choose your monthly pay day</h2>
        <p className="text-[13px] text-ink-mute mt-1">We run payroll on this day each month. You approve before anything leaves.</p>
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          {[25, 26, 27, 28, 29, 30].map((dd) => (
            <button key={dd} onClick={() => setDay(dd)} className={cx('h-16 rounded-2xl border text-[18px] font-bold transition', day === dd ? 'border-gt bg-gt-50 text-gt' : 'border-line bg-white text-ink')}>{dd}th</button>
          ))}
        </div>
        <Button full className="mt-8" onClick={() => { d({ type: 'setPayrollDay', day }); pop(); push('invite-staff') }}>Save and add staff</Button>
      </Body>
    </>
  )
}
