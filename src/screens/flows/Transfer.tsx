import { useState } from 'react'
import { Search, Plus, Delete, CheckCircle2, Pencil } from 'lucide-react'
import { useApp, useDispatch } from '../../store/store'
import { useNav } from '../../nav/nav'
import { ScreenHeader, Body } from '../../ui/phone'
import { Button, Field, Avatar, Row, Sheet, cx, useToast } from '../../ui/primitives'
import { ConfirmSheet } from '../../components/ConfirmSheet'
import { naira } from '../../lib/format'
import type { Recipient } from '../../lib/types'

export function Transfer() {
  const s = useApp(); const d = useDispatch(); const { pop } = useNav(); const toast = useToast()
  const [step, setStep] = useState<'pick' | 'amount' | 'done'>('pick')
  const [sel, setSel] = useState<Recipient | null>(null)
  const [q, setQ] = useState('')
  const [amt, setAmt] = useState('')
  const [newOpen, setNewOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [nr, setNr] = useState({ name: '', bank: 'GTBank', account: '' })
  const val = Number(amt || '0')

  const list = s.recipients.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) || r.account.includes(q))

  if (step === 'done') return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
      <CheckCircle2 size={72} className="text-good" />
      <h1 className="text-[22px] font-extrabold text-ink mt-5">Transfer successful</h1>
      <p className="text-[14.5px] text-ink-mute mt-2">{naira(val)} sent to {sel?.name}.</p>
      <Button full className="mt-8" onClick={pop}>Done</Button>
    </div>
  )

  if (step === 'amount' && sel) return (
    <>
      <ScreenHeader title="Enter amount" />
      <Body>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-line">
          <Avatar name={sel.name} size={40} />
          <div className="flex-1 min-w-0"><div className="text-[14.5px] font-bold text-ink truncate">{sel.name}</div><div className="text-[12px] text-ink-mute">{sel.bank} · {sel.account}</div></div>
          <button onClick={() => setStep('pick')} className="text-gt"><Pencil size={16} /></button>
        </div>
        <div className="text-center py-8">
          <div className="text-[44px] font-extrabold text-ink tnum tracking-tight">{naira(val)}</div>
          <div className="text-[12.5px] text-ink-mute mt-1">Balance {naira(s.balance)}</div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'del'].map((k, i) => (
            <button key={i} onClick={() => setAmt((p) => k === 'del' ? p.slice(0, -1) : (p.length >= 10 ? p : (p === '0' ? k : p + k)))} className="h-14 rounded-2xl bg-white border border-line text-[21px] font-bold text-ink active:bg-paper grid place-items-center">{k === 'del' ? <Delete size={20} /> : k}</button>
          ))}
        </div>
        <Button full className="mt-4" disabled={val <= 0 || val > s.balance} onClick={() => setConfirm(true)}>Send {naira(val)}</Button>
      </Body>
      <ConfirmSheet open={confirm} onClose={() => setConfirm(false)} title="Confirm transfer"
        rows={[{ label: 'To', value: sel.name }, { label: 'Bank', value: sel.bank }, { label: 'Amount', value: naira(val) }]}
        onConfirm={() => { d({ type: 'transfer', name: sel.name, bank: sel.bank, account: sel.account, amount: val }); toast('Transfer sent'); setStep('done') }} />
    </>
  )

  return (
    <>
      <ScreenHeader title="Transfer" />
      <Body>
        <Field prefix="" placeholder="Search name or account number" value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => setNewOpen(true)} className="w-full flex items-center gap-3 mt-4 p-4 rounded-2xl bg-white border border-line active:scale-[.99] transition">
          <span className="w-10 h-10 rounded-full bg-gt grid place-items-center text-white"><Plus size={20} /></span>
          <span className="text-left"><span className="block text-[15px] font-bold text-ink">New recipient</span><span className="block text-[12px] text-ink-mute">Pay a new account</span></span>
        </button>
        <h3 className="text-[13px] font-bold text-ink-mute mt-6 mb-1">Recent recipients</h3>
        <div className="divide-y divide-line">
          {list.map((r) => <Row key={r.id} left={<Avatar name={r.name} size={44} />} title={r.name} sub={`${r.bank} · ${r.account}`} onClick={() => { setSel(r); setStep('amount') }} />)}
        </div>
      </Body>
      <Sheet open={newOpen} onClose={() => setNewOpen(false)} title="New recipient">
        <div className="space-y-4">
          <Field label="Account number" inputMode="numeric" placeholder="0000000000" value={nr.account} onChange={(e) => setNr({ ...nr, account: e.target.value })} />
          <Field label="Bank" value={nr.bank} onChange={(e) => setNr({ ...nr, bank: e.target.value })} />
          <Field label="Account name" placeholder="Beneficiary name" value={nr.name} onChange={(e) => setNr({ ...nr, name: e.target.value })} />
          <Button full disabled={!nr.name || !nr.account} onClick={() => { const r = { id: 'n' + Date.now(), ...nr }; setSel(r); setNewOpen(false); setStep('amount') }}>Continue</Button>
        </div>
      </Sheet>
    </>
  )
}
