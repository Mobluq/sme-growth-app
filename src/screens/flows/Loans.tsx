import { useState } from 'react'
import { Banknote, Lock, CheckCircle2, Store } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Card, useToast } from '../../ui/primitives'
import { ConfirmSheet } from '../../components/ConfirmSheet'
import { naira } from '../../lib/format'

export function Loans() {
  const s = useApp(); const d = useDispatch(); const { push } = useNav(); const toast = useToast()
  const [confirm, setConfirm] = useState(false)
  const loan = s.loan

  if (!loan) return (
    <>
      <ScreenHeader title="Working capital" />
      <Body>
        <div className="flex flex-col items-center text-center mt-14">
          <span className="w-16 h-16 rounded-full bg-paper border border-line grid place-items-center"><Lock size={24} className="text-ink-mute" /></span>
          <h1 className="text-[19px] font-bold text-ink mt-5">No offer yet</h1>
          <p className="text-[13.5px] text-ink-mute mt-2 max-w-[280px]">Your loan size is set by your real sales. Start taking card payments on a POS, and an offer builds from your history, repaid from daily sales.</p>
        </div>
        <Button full className="mt-10" onClick={() => push('request-pos')}><Store size={18} /> Request a POS</Button>
      </Body>
    </>
  )

  if (loan.accepted) return (
    <>
      <ScreenHeader title="Working capital" />
      <Body>
        <div className="flex flex-col items-center text-center mt-10">
          <CheckCircle2 size={64} className="text-good" />
          <h1 className="text-[20px] font-extrabold text-ink mt-4">Loan active</h1>
          <p className="text-[14px] text-ink-mute mt-2">{naira(loan.amount)} is in your account.</p>
        </div>
        <Card className="px-4 divide-y divide-line mt-6">
          {[['Amount', naira(loan.amount)], ['Rate', `${(loan.rateMonthly * 100).toFixed(1)}% / month`], ['Term', `${loan.termMonths} months`], ['Repayment', 'From daily POS sales']].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-3.5 text-[14px]"><span className="text-ink-mute">{k}</span><span className="font-semibold text-ink">{v}</span></div>
          ))}
        </Card>
      </Body>
    </>
  )

  return (
    <>
      <ScreenHeader title="Working capital" />
      <Body>
        <Card className="p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-gt"><Banknote size={16} /><span className="text-[11px] font-bold tracking-wide uppercase">Your offer</span></div>
          <div className="text-[40px] font-extrabold text-ink tnum mt-1">{naira(loan.amount)}</div>
          <div className="text-[12.5px] text-ink-mute">{loan.reason}</div>
        </Card>
        <Card className="px-4 divide-y divide-line mt-4">
          {[['Rate', `${(loan.rateMonthly * 100).toFixed(1)}% / month`], ['Term', `${loan.termMonths} months`], ['Repayment', 'Auto from daily POS sales'], ['Est. daily repay', naira(Math.round((loan.amount * (1 + loan.rateMonthly * loan.termMonths)) / (loan.termMonths * 26)))]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-3.5 text-[14px]"><span className="text-ink-mute">{k}</span><span className="font-semibold text-ink">{v}</span></div>
          ))}
        </Card>
        <Button full className="mt-6" onClick={() => setConfirm(true)}>Accept {naira(loan.amount)}</Button>
        <p className="text-[12px] text-ink-mute text-center mt-3">A small share of each day's card sales repays the loan automatically.</p>
      </Body>
      <ConfirmSheet open={confirm} onClose={() => setConfirm(false)} title="Accept loan"
        rows={[{ label: 'Amount', value: naira(loan.amount) }, { label: 'Term', value: `${loan.termMonths} months` }, { label: 'Repay', value: 'From daily sales' }]}
        onConfirm={() => { d({ type: 'acceptLoan' }); toast('Loan disbursed') }} />
    </>
  )
}
