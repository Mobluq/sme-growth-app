import { createContext, useContext, useEffect, useReducer, type ReactNode, type Dispatch } from 'react'
import type { AppState, Business, Recipient, LoanOffer } from '../lib/types'
import { demoState, initialState } from './seed'
import { uid } from '../lib/format'

const KEY = 'sme-growth-state-v1'

export type Action =
  | { type: 'onboard'; business: Business }
  | { type: 'approve'; id: string }
  | { type: 'decline'; id: string }
  | { type: 'transfer'; name: string; bank: string; account: string; amount: number; save?: boolean }
  | { type: 'receive'; amount: number }
  | { type: 'requestPos' }
  | { type: 'advancePos' }
  | { type: 'inviteStaff'; name: string; role: string; salary: number }
  | { type: 'activateStaff'; id: string }
  | { type: 'setPayrollDay'; day: number }
  | { type: 'runPayroll' }
  | { type: 'setAsideTax'; amount: number }
  | { type: 'invest'; amount: number }
  | { type: 'acceptLoan' }
  | { type: 'dismissSignal'; id: string }
  | { type: 'reset' }

function spend(s: AppState, amount: number): Pick<AppState, 'balance' | 'moneyOut'> {
  return { balance: s.balance - amount, moneyOut: s.moneyOut + amount }
}

function reducer(s: AppState, a: Action): AppState {
  switch (a.type) {
    case 'onboard':
      return demoState({ onboarded: true, business: a.business })

    case 'approve': {
      const ap = s.approvals.find((x) => x.id === a.id)
      if (!ap) return s
      return {
        ...s,
        approvals: s.approvals.filter((x) => x.id !== a.id),
        ...spend(s, ap.amount),
        txns: [{ id: uid(), title: ap.payee, kind: 'transfer', amount: -ap.amount, status: 'completed', at: new Date().toISOString(), sub: `Approved · started by ${ap.startedBy}` }, ...s.txns],
      }
    }
    case 'decline':
      return { ...s, approvals: s.approvals.filter((x) => x.id !== a.id) }

    case 'transfer': {
      const recips: Recipient[] = a.save && !s.recipients.some((r) => r.account === a.account)
        ? [{ id: uid(), name: a.name, bank: a.bank, account: a.account }, ...s.recipients]
        : s.recipients
      return {
        ...s,
        recipients: recips,
        ...spend(s, a.amount),
        txns: [{ id: uid(), title: a.name, kind: 'transfer', amount: -a.amount, status: 'completed', at: new Date().toISOString(), sub: 'Transfer' }, ...s.txns],
      }
    }

    case 'receive':
      return {
        ...s,
        balance: s.balance + a.amount,
        moneyIn: s.moneyIn + a.amount,
        txns: [{ id: uid(), title: 'Customer payment', kind: 'collection', amount: a.amount, status: 'completed', at: new Date().toISOString(), sub: 'Collection' }, ...s.txns],
      }

    case 'requestPos':
      return {
        ...s,
        pos: { stage: 'requested', requestedAt: new Date().toISOString() },
        signals: s.signals.filter((x) => x.kind !== 'pos'),
      }

    case 'advancePos': {
      const order: AppState['pos']['stage'][] = ['none', 'requested', 'assigned', 'delivering', 'active']
      const i = order.indexOf(s.pos.stage)
      const next = order[Math.min(i + 1, order.length - 1)]
      if (next === 'assigned')
        return { ...s, pos: { ...s.pos, stage: 'assigned', fsoName: 'Chidi Okafor', fsoPhone: '+234 803 221 0049' } }
      if (next === 'delivering') return { ...s, pos: { ...s.pos, stage: 'delivering' } }
      if (next === 'active') {
        const loan: LoanOffer = { id: uid(), amount: 1_500_000, rateMonthly: 0.035, termMonths: 6, reason: 'Based on your POS and collections history' }
        return {
          ...s,
          pos: { ...s.pos, stage: 'active', terminalId: 'GT-POS-48213', todayVolume: 184_500, weekTxns: 92, idleFlag: false },
          loan,
          signals: [{ id: 'sig-loan', kind: 'loan', title: 'Your sales can carry a loan', body: 'Your POS history now qualifies you for working capital, repaid from daily sales.', cta: 'See your offer' }, ...s.signals.filter((x) => x.kind !== 'pos')],
        }
      }
      return { ...s, pos: { ...s.pos, stage: next } }
    }

    case 'inviteStaff':
      return { ...s, staff: [...s.staff, { id: uid(), name: a.name, role: a.role, salary: a.salary, status: 'invited' }] }

    case 'activateStaff':
      return { ...s, staff: s.staff.map((x) => (x.id === a.id ? { ...x, status: 'active' } : x)) }

    case 'setPayrollDay':
      return { ...s, payrollDay: a.day }

    case 'runPayroll': {
      const total = s.staff.filter((x) => x.status === 'active').reduce((t, x) => t + x.salary, 0)
      if (total === 0) return s
      return { ...s, ...spend(s, total), txns: [{ id: uid(), title: 'Payroll run', kind: 'payroll', amount: -total, status: 'completed', at: new Date().toISOString(), sub: `${s.staff.filter((x) => x.status === 'active').length} staff paid` }, ...s.txns] }
    }

    case 'setAsideTax':
      return { ...s, tax: { ...s.tax, saved: s.tax.saved + a.amount }, ...spend(s, a.amount), txns: [{ id: uid(), title: 'Tax set aside', kind: 'tax', amount: -a.amount, status: 'completed', at: new Date().toISOString(), sub: 'Tax vault' }, ...s.txns] }

    case 'invest':
      return { ...s, invest: { ...s.invest, balance: s.invest.balance + a.amount }, ...spend(s, a.amount), txns: [{ id: uid(), title: 'Moved to investments', kind: 'transfer', amount: -a.amount, status: 'completed', at: new Date().toISOString(), sub: 'GT Fund Managers' }, ...s.txns] }

    case 'acceptLoan': {
      if (!s.loan) return s
      return {
        ...s,
        loan: { ...s.loan, accepted: true },
        balance: s.balance + s.loan.amount,
        moneyIn: s.moneyIn + s.loan.amount,
        signals: s.signals.filter((x) => x.kind !== 'loan'),
        txns: [{ id: uid(), title: 'Loan disbursed', kind: 'transfer', amount: s.loan.amount, status: 'completed', at: new Date().toISOString(), sub: 'GTBank working capital' }, ...s.txns],
      }
    }

    case 'dismissSignal':
      return { ...s, signals: s.signals.filter((x) => x.id !== a.id) }

    case 'reset':
      return initialState()

    default:
      return s
  }
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const p = JSON.parse(raw)
      if (p && p.version === 1) return p as AppState
    }
  } catch { /* ignore */ }
  return initialState()
}

const StateCtx = createContext<AppState>(initialState())
const DispatchCtx = createContext<Dispatch<Action>>(() => {})

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  )
}

export const useApp = () => useContext(StateCtx)
export const useDispatch = () => useContext(DispatchCtx)
