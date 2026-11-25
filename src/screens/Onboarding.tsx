import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, Check, Delete, Briefcase, Store, CheckCircle2, Users, Receipt, TrendingUp, Banknote, Bell, Eye, ArrowUpRight, ChevronRight, Layers, type LucideIcon } from 'lucide-react'
import { useDispatch } from '../store/store'
import { StatusBar } from '../ui/phone'
import { Button, Field, cx } from '../ui/primitives'
import type { BusinessKind, WhoHandles, FeatureKey, Features } from '../lib/types'

const SLIDES = [
  { t: 'Your whole business, in one app', s: 'Pay suppliers, run payroll, set aside tax and grow your cash.' },
  { t: 'See your money the moment it moves', s: 'Collections, transfers and POS settle into one clear view.' },
  { t: 'Built around how you trade', s: 'Pick what you need and the app shapes itself to your business.' },
]

// The choices that personalise the app. Sending and receiving money are the
// spine and stay on for everyone, so they are not offered here.
const GOALS: { key: FeatureKey; title: string; sub: string; Icon: LucideIcon }[] = [
  { key: 'payroll', title: 'Pay my staff', sub: 'Run payroll and let staff add their own details.', Icon: Users },
  { key: 'pos', title: 'Take card payments', sub: 'A POS terminal delivered and set up in person.', Icon: Store },
  { key: 'tax', title: 'Set aside tax', sub: 'We estimate it and help you save gradually.', Icon: Receipt },
  { key: 'invest', title: 'Grow my cash', sub: 'Earn daily in a GT money market fund.', Icon: TrendingUp },
  { key: 'loans', title: 'Access working capital', sub: 'Loans sized to your real sales history.', Icon: Banknote },
]

function Dots({ n, i }: { n: number; i: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: n }).map((_, k) => <span key={k} className={cx('h-1.5 rounded-full transition-all', k === i ? 'w-6 bg-ink' : 'w-1.5 bg-line')} />)}
    </div>
  )
}

function Radio({ title, sub, icon, on, onClick }: { title: string; sub: string; icon?: React.ReactNode; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cx('w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition', on ? 'border-gt bg-gt-50' : 'border-line bg-white')}>
      {icon && <span className={cx('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', on ? 'bg-white text-gt' : 'bg-paper text-ink border border-line')}>{icon}</span>}
      <span className="flex-1">
        <span className="block text-[15px] font-bold text-ink">{title}</span>
        <span className="block text-[12.5px] text-ink-mute leading-snug">{sub}</span>
      </span>
      <span className={cx('w-5 h-5 rounded-full border-2 grid place-items-center shrink-0', on ? 'border-gt' : 'border-line')}>{on && <span className="w-2.5 h-2.5 rounded-full bg-gt" />}</span>
    </button>
  )
}

function GoalCard({ title, sub, Icon, on, onClick }: { title: string; sub: string; Icon: LucideIcon; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cx('w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition', on ? 'border-gt bg-gt-50' : 'border-line bg-white')}>
      <span className={cx('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', on ? 'bg-white text-gt' : 'bg-paper text-ink border border-line')}><Icon size={20} /></span>
      <span className="flex-1">
        <span className="block text-[15px] font-bold text-ink">{title}</span>
        <span className="block text-[12.5px] text-ink-mute leading-snug">{sub}</span>
      </span>
      <span className={cx('w-6 h-6 rounded-md border-2 grid place-items-center shrink-0', on ? 'border-gt bg-gt' : 'border-line')}>{on && <Check size={14} className="text-white" />}</span>
    </button>
  )
}

export function Onboarding() {
  const d = useDispatch()
  const [step, setStep] = useState(0)
  const [slide, setSlide] = useState(0)
  const [kind, setKind] = useState<BusinessKind>('running')
  const [name, setName] = useState('HelenMart')
  const [type, setType] = useState('Retail / Provisions')
  const [cat, setCat] = useState('Wholesale & Retail')
  const [who, setWho] = useState<WhoHandles>('both')
  const [goals, setGoals] = useState<Features>({ payments: true, collections: true, payroll: false, pos: true, tax: true, invest: false, loans: false })
  const [pin, setPin] = useState('')
  const [mode, setMode] = useState<'onboard' | 'signin'>('onboard')

  const seg = Math.min(6, step) // steps 1..6 show on the 6-segment bar
  const next = () => setStep((s) => s + 1)
  const back = () => (step === 1 && slide === 0 ? setStep(0) : setStep((s) => s - 1))
  const toggleGoal = (k: FeatureKey) => setGoals((g) => ({ ...g, [k]: !g[k] }))
  const picked = GOALS.filter((g) => goals[g.key]).length

  const finish = () => d({ type: 'onboard', business: { name: name || 'My Business', kind, type, category: cat, whoHandles: who }, features: goals })

  // Returning user: a real sign-in that opens the full demo account.
  if (mode === 'signin') {
    return (
      <>
        <StatusBar />
        <div className="flex-1 min-h-0 flex flex-col px-6 pb-8">
          <button onClick={() => { setMode('onboard'); setStep(0) }} aria-label="Back" className="w-9 h-9 -ml-2 mt-1 rounded-full grid place-items-center active:bg-line/60"><ChevronLeft size={22} /></button>
          <div className="mt-6">
            <h1 className="text-[27px] font-extrabold text-ink tracking-tight">Welcome back</h1>
            <p className="text-[14.5px] text-ink-mute mt-1">Sign in to HelenMart and pick up where you left off.</p>
          </div>
          <div className="space-y-4 mt-7">
            <Field label="Business email or phone" defaultValue="hello@helenmart.com" />
            <Field label="Password" type="password" defaultValue="password" />
          </div>
          <div className="flex-1" />
          <Button full onClick={() => d({ type: 'signIn' })}>Sign in</Button>
          <button onClick={() => { setMode('onboard'); setStep(1) }} className="mt-3 text-[13.5px] text-ink-mute text-center">New here? <span className="text-gt font-semibold">Create an account</span></button>
        </div>
      </>
    )
  }

  // Step 0: single intro screen (matches the prototype)
  if (step === 0) {
    const mini = [[ArrowUpRight, 'Loans'], [Store, 'POS'], [Users, 'Payroll']] as [LucideIcon, string][]
    return (
      <>
        <StatusBar />
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col px-6 pb-7">
          <h1 className="text-[30px] font-extrabold text-ink leading-[1.05] tracking-tight mt-2">
            Run and grow your business in <span className="text-gt">one app.</span>
          </h1>
          <p className="text-[14.5px] text-ink-mute mt-3 leading-snug max-w-[310px]">Get paid, pay your team, access funding and accept payments with a POS.</p>

          <div className="relative flex-1 min-h-[310px] my-4">
            <div className="absolute inset-x-2 top-6 bottom-0 rounded-[2.2rem] bg-gradient-to-b from-gt-50 to-transparent" />
            <div className="relative mx-auto mt-7 w-[244px] rounded-[1.6rem] bg-white border border-line shadow-pop p-3.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-paper border border-line grid place-items-center text-[10px] font-bold">HM</span>
                <div className="flex-1 text-[12.5px] font-bold text-ink">Hello, HelenMart</div>
                <Bell size={14} className="text-ink-mute" />
              </div>
              <div className="mt-3 rounded-2xl p-3 text-white" style={{ background: 'linear-gradient(155deg,#2a211c,#161110)' }}>
                <div className="flex items-center gap-1 text-white/55 text-[10.5px]">Available balance <Eye size={11} /></div>
                <div className="text-[20px] font-extrabold tnum mt-0.5">{'₦'}2,458,300<span className="text-[11px] text-white/45">.00</span></div>
                <div className="flex justify-between mt-2 text-[9.5px] text-white/50">
                  <span>Money in <b className="text-white">{'₦'}3.4m</b> <span className="text-good">▲</span></span>
                  <span>Money out <b className="text-white">{'₦'}1.6m</b> <span className="text-bad">▼</span></span>
                </div>
              </div>
              <div className="flex justify-around mt-3">
                {mini.map(([I, l], i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="w-8 h-8 rounded-full border border-line grid place-items-center"><I size={14} className="text-ink" /></span>
                    <span className="text-[9px] text-ink-soft">{l}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl bg-gt-50 border border-gt-100 px-2.5 py-2 flex items-center gap-2">
                <div className="flex-1"><div className="text-[10px] font-bold text-ink leading-tight">3 payments awaiting approval</div><div className="text-[8.5px] text-ink-mute">Review and approve requests</div></div>
                <ChevronRight size={12} className="text-gt" />
              </div>
            </div>
            <div className="absolute top-3 right-2 bg-white rounded-2xl shadow-pop border border-line px-3 py-2 flex flex-col items-center gap-0.5">
              <Store size={15} className="text-gt" /><span className="text-[10px] font-bold text-ink">Get a POS</span>
            </div>
            <div className="absolute top-[46%] left-0 bg-white rounded-2xl shadow-pop border border-line px-3 py-2 flex flex-col items-center gap-0.5">
              <Layers size={15} className="text-gt" /><span className="text-[10px] font-bold text-ink">Overdraft</span>
            </div>
            <div className="absolute bottom-3 right-1 bg-white rounded-2xl shadow-pop border border-line px-3 py-2 flex flex-col items-center gap-0.5">
              <Users size={15} className="text-gt" /><span className="text-[10px] font-bold text-ink">Run payroll</span>
            </div>
          </div>

          <Button full onClick={() => setStep(1)}>Next</Button>
          <button onClick={() => setMode('signin')} className="mt-3 text-[13.5px] text-ink-mute text-center">Already have an account? <span className="text-gt font-semibold">Sign In</span></button>
        </div>
      </>
    )
  }

  return (
    <>
      <StatusBar />
      <div className="shrink-0 px-6 pt-1 pb-3 flex items-center gap-4">
        <button onClick={back} aria-label="Back" className="w-9 h-9 -ml-2 rounded-full grid place-items-center active:bg-line/60"><ChevronLeft size={22} /></button>
        <div className="flex-1 flex gap-1.5">
          {Array.from({ length: 6 }).map((_, k) => <span key={k} className={cx('flex-1 h-1.5 rounded-full', k < seg ? 'bg-ink' : 'bg-line')} />)}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-6 pb-8 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col">

            {step === 1 && (<>
              <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Create your account</h1>
              <p className="text-[14px] text-ink-mute mt-1">Use the phone number linked to your business.</p>
              <div className="space-y-4 mt-6">
                <Field label="Phone number" prefix="+234" placeholder="803 555 0142" defaultValue="803 555 0142" inputMode="tel" />
                <Field label="Business email" placeholder="e.g. hello@helenmart.com" defaultValue="hello@helenmart.com" type="email" />
                <Field label="Password" placeholder="Create a password" type="password" defaultValue="password" />
                <label className="flex items-center gap-2 text-[13px] text-ink-soft"><span className="w-5 h-5 rounded-md bg-gt grid place-items-center"><Check size={13} className="text-white" /></span> I agree to the <span className="font-semibold">Terms</span> and <span className="font-semibold">Privacy Policy</span>.</label>
              </div>
              <div className="flex-1" />
              <Button full onClick={next}>Continue</Button>
            </>)}

            {step === 2 && (<>
              <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Enter the code</h1>
              <p className="text-[14px] text-ink-mute mt-1">We sent a 6-digit code to <span className="font-semibold text-ink">+234 803 555 0142</span>.</p>
              <div className="flex gap-2.5 mt-6">
                {['4', '7', '2', '9', '1', '5'].map((c, i) => <div key={i} className={cx('flex-1 h-14 rounded-2xl grid place-items-center text-[20px] font-bold', i < 5 ? 'bg-paper border border-line' : 'bg-white border-2 border-gt')}>{c}</div>)}
              </div>
              <p className="text-[13px] text-ink-mute mt-4">Resend code in <span className="font-semibold text-ink">0:42</span></p>
              <div className="flex-1" />
              <Button full onClick={next}>Continue</Button>
            </>)}

            {step === 3 && (<>
              <h1 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight">What best describes your business?</h1>
              <div className="space-y-3 mt-6">
                <Radio icon={<Briefcase size={20} />} title="I am starting a business" sub="Register, open an account and get set up." on={kind === 'starting'} onClick={() => setKind('starting')} />
                <Radio icon={<Store size={20} />} title="I already run a business" sub="Get tools that fit how you trade today." on={kind === 'running'} onClick={() => setKind('running')} />
              </div>
              <div className="flex-1" />
              <Button full onClick={next}>Continue</Button>
            </>)}

            {step === 4 && (<>
              <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Tell us about your business</h1>
              <p className="text-[14px] text-ink-mute mt-1">We use this to set up the right account.</p>
              <div className="space-y-4 mt-6">
                <Field label="Business name" value={name} onChange={(e) => setName(e.target.value)} />
                <Field label="Business type" value={type} onChange={(e) => setType(e.target.value)} />
                <Field label="Business category" value={cat} onChange={(e) => setCat(e.target.value)} />
              </div>
              <div className="flex-1" />
              <Button full onClick={next}>Continue</Button>
            </>)}

            {step === 5 && (<>
              <h1 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight">Who handles payments in your business?</h1>
              <p className="text-[14px] text-ink-mute mt-1">We show what you need first. Change it later in Settings.</p>
              <div className="space-y-3 mt-6">
                <Radio title="I do it all myself" sub="You start and complete transfers and supplier payments." on={who === 'self'} onClick={() => setWho('self')} />
                <Radio title="My staff start, I approve" sub="Staff start payments. You review and approve each one." on={who === 'staff'} onClick={() => setWho('staff')} />
                <Radio title="A bit of both" sub="You pay directly and also approve what staff start." on={who === 'both'} onClick={() => setWho('both')} />
              </div>
              <div className="flex-1" />
              <Button full onClick={next}>Continue</Button>
            </>)}

            {step === 6 && (<>
              <h1 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight">What do you want to use GTBank for?</h1>
              <p className="text-[14px] text-ink-mute mt-1">Pick what fits. Sending and receiving money are always on, and you can add the rest anytime.</p>
              <div className="space-y-2.5 mt-5">
                {GOALS.map((g) => <GoalCard key={g.key} title={g.title} sub={g.sub} Icon={g.Icon} on={goals[g.key]} onClick={() => toggleGoal(g.key)} />)}
              </div>
              <div className="flex-1 min-h-4" />
              <Button full onClick={next}>{picked > 0 ? `Continue with ${picked} selected` : 'Continue'}</Button>
            </>)}

            {step === 7 && (<>
              <h1 className="text-[26px] font-extrabold text-ink tracking-tight">Create transaction PIN</h1>
              <p className="text-[14px] text-ink-mute mt-1">You will use this 4-digit PIN to authorise payments.</p>
              <div className="flex gap-3 mt-7 justify-center">
                {Array.from({ length: 4 }).map((_, i) => <span key={i} className={cx('w-5 h-5 rounded-full', i < pin.length ? 'bg-gt' : 'bg-line')} />)}
              </div>
              <div className="grid grid-cols-3 gap-2.5 mt-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((k, i) => k === '' ? <span key={i} /> : (
                  <button key={i} onClick={() => k === 'del' ? setPin((p) => p.slice(0, -1)) : setPin((p) => (p.length < 4 ? p + k : p))} className="h-14 rounded-2xl bg-white border border-line text-[22px] font-bold text-ink active:bg-paper grid place-items-center">
                    {k === 'del' ? <Delete size={20} /> : k}
                  </button>
                ))}
              </div>
              <Button full className="mt-4" disabled={pin.length < 4} onClick={next}>Create PIN</Button>
            </>)}

            {step === 8 && (<div className="flex-1 flex flex-col items-center justify-center text-center">
              <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 14 }} className="w-20 h-20 rounded-full bg-good grid place-items-center"><CheckCircle2 size={44} className="text-white" /></motion.span>
              <h1 className="text-[24px] font-extrabold text-ink mt-6">Your app is ready</h1>
              <p className="text-[14.5px] text-ink-mute mt-2 max-w-[280px]">We have set it up around what you picked. Add or remove anything later under More.</p>
            </div>)}

          </motion.div>
        </AnimatePresence>
        {step === 8 && <Button full onClick={finish}>Go to Home</Button>}
      </div>
    </>
  )
}
