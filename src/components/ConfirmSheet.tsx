import { useState } from 'react'
import { Delete } from 'lucide-react'
import { Sheet, cx } from '../ui/primitives'

export function ConfirmSheet({ open, onClose, title = 'Confirm', rows, onConfirm }: {
  open: boolean; onClose: () => void; title?: string
  rows: { label: string; value: string }[]; onConfirm: () => void
}) {
  const [pin, setPin] = useState('')
  const close = () => { setPin(''); onClose() }
  const key = (k: string) => {
    if (k === 'del') { setPin((p) => p.slice(0, -1)); return }
    setPin((p) => {
      if (p.length >= 4) return p
      const np = p + k
      if (np.length === 4) window.setTimeout(() => { onConfirm(); setPin(''); onClose() }, 180)
      return np
    })
  }
  return (
    <Sheet open={open} onClose={close} title={title}>
      <div className="rounded-2xl bg-white border border-line divide-y divide-line mb-5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 text-[14px]">
            <span className="text-ink-mute">{r.label}</span>
            <span className="font-bold text-ink tnum text-right">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-[13px] text-ink-mute mb-3">Enter your 4-digit PIN</div>
      <div className="flex gap-3 justify-center mb-5">
        {[0, 1, 2, 3].map((i) => <span key={i} className={cx('w-4 h-4 rounded-full', i < pin.length ? 'bg-gt' : 'bg-line')} />)}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((k, i) => k === '' ? <span key={i} /> : (
          <button key={i} onClick={() => key(k)} className="h-14 rounded-2xl bg-white border border-line text-[22px] font-bold text-ink active:bg-paper grid place-items-center">
            {k === 'del' ? <Delete size={20} /> : k}
          </button>
        ))}
      </div>
    </Sheet>
  )
}
