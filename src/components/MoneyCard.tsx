import { Eye, ArrowUp, ArrowDown } from 'lucide-react'
import { naira, compact } from '../lib/format'

export function MoneyCard({ balance, moneyIn, moneyOut }: { balance: number; moneyIn: number; moneyOut: number; flow?: number[] }) {
  const kobo = Math.round((balance - Math.floor(balance)) * 100).toString().padStart(2, '0')
  return (
    <div className="relative rounded-3xl p-5 overflow-hidden text-white shadow-money" style={{ background: 'linear-gradient(155deg, #2a211c 0%, #1b1512 50%, #141010 100%)' }}>
      <div className="absolute -right-10 -top-16 w-48 h-48 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(232,92,42,.9), transparent 70%)' }} />
      <div className="relative flex items-center gap-1.5 text-white/55 text-[12.5px] font-medium">
        Available balance <Eye size={14} />
      </div>
      <div className="relative mt-1 flex items-end gap-1">
        <span className="text-[34px] leading-none font-extrabold tnum tracking-tight">{naira(Math.floor(balance))}</span>
        <span className="text-[16px] font-semibold text-white/45 pb-0.5">.{kobo}</span>
      </div>
      <div className="relative flex items-start justify-between mt-6">
        <div>
          <div className="text-[10.5px] tracking-wide text-white/45 font-semibold">MONEY IN</div>
          <div className="flex items-center gap-1 mt-0.5"><span className="text-[15px] font-bold tnum">{compact(moneyIn)}</span><ArrowUp size={13} className="text-good" /></div>
        </div>
        <div className="text-right">
          <div className="text-[10.5px] tracking-wide text-white/45 font-semibold">MONEY OUT</div>
          <div className="flex items-center justify-end gap-1 mt-0.5"><span className="text-[15px] font-bold tnum">{compact(moneyOut)}</span><ArrowDown size={13} className="text-bad" /></div>
        </div>
      </div>
    </div>
  )
}
