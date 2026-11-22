import { useState } from 'react'
import { Delete } from 'lucide-react'
import { Sheet, Button } from '../ui/primitives'
import { naira } from '../lib/format'

export function AmountSheet({ open, onClose, title, cta = 'Confirm', onSubmit, max }: {
  open: boolean; onClose: () => void; title: string; cta?: string; onSubmit: (v: number) => void; max?: number
}) {
  const [amt, setAmt] = useState('')
  const val = Number(amt || '0')
  const over = max != null && val > max
  const close = () => { setAmt(''); onClose() }
  const key = (k: string) => {
    if (k === 'del') { setAmt((p) => p.slice(0, -1)); return }
    setAmt((p) => (p.length >= 10 ? p : (p === '0' ? k : p + k)))
  }
  return (
    <Sheet open={open} onClose={close} title={title}>
      <div className="text-center py-6">
        <div className="text-[40px] font-extrabold text-ink tnum tracking-tight">{naira(val)}</div>
        {over && <div className="text-[12.5px] text-gt mt-1">More than your balance</div>}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'del'].map((k, i) => (
          <button key={i} onClick={() => key(k)} className="h-14 rounded-2xl bg-white border border-line text-[21px] font-bold text-ink active:bg-paper grid place-items-center">
            {k === 'del' ? <Delete size={20} /> : k}
          </button>
        ))}
      </div>
      <Button full className="mt-4" disabled={val <= 0 || over} onClick={() => { onSubmit(val); setAmt(''); onClose() }}>{cta}</Button>
    </Sheet>
  )
}
