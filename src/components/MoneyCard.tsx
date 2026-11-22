import { Eye, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { naira, compact } from '../lib/format'
import { Flow } from '../ui/charts'

export function MoneyCard({ balance, moneyIn, moneyOut, flow }: { balance: number; moneyIn: number; moneyOut: number; flow: number[] }) {
  const kobo = Math.round((balance - Math.floor(balance)) * 100).toString().padStart(2, '0')
  return (
    <div className="relative rounded-xl3 p-5 overflow-hidden text-white shadow-money" style={{ background: 'linear-gradient(155deg, #2a211c 0%, #1b1512 48%, #120d0b 100%)' }}>
      <div className="absolute -right-10 -top-14 w-44 h-44 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(232,87,30,.9), transparent 70%)' }} />
      <div className="relative">
        <div className="flex items-center gap-1.5 text-white/60 text-[12.5px] font-medium">
          Available balance <Eye size={14} />
        </div>
        <div className="mt-1 flex items-end gap-1">
          <span className="text-[34px] leading-none font-extrabold tnum tracking-tight">{naira(Math.floor(balance))}</span>
          <span className="text-[16px] font-semibold text-white/45 pb-0.5">.{kobo}</span>
        </div>
      </div>
      <div className="relative -mx-1 mt-1 mb-2 opacity-90">
        <Flow points={flow} h={52} stroke="#F7A24A" />
      </div>
      <div className="relative flex items-stretch gap-3">
        <div className="flex-1 rounded-2xl bg-white/[.06] px-3 py-2.5">
          <div className="text-[10.5px] tracking-wide text-white/50 font-semibold">MONEY IN</div>
          <div className="flex items-center gap-1 mt-0.5"><span className="text-[15px] font-bold tnum">{compact(moneyIn)}</span><ArrowDownLeft size={14} className="text-good" /></div>
        </div>
        <div className="flex-1 rounded-2xl bg-white/[.06] px-3 py-2.5">
          <div className="text-[10.5px] tracking-wide text-white/50 font-semibold">MONEY OUT</div>
          <div className="flex items-center gap-1 mt-0.5"><span className="text-[15px] font-bold tnum">{compact(moneyOut)}</span><ArrowUpRight size={14} className="text-gt" /></div>
        </div>
      </div>
    </div>
  )
}
