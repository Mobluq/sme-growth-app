export type BusinessKind = 'starting' | 'running'
export type WhoHandles = 'self' | 'staff' | 'both'

export interface Business {
  name: string
  kind: BusinessKind
  type: string
  category: string
  whoHandles: WhoHandles
}

// What the app surfaces for this account, chosen during onboarding.
// `payments` and `collections` are the spine and are always on.
export type FeatureKey = 'payments' | 'collections' | 'payroll' | 'pos' | 'tax' | 'invest' | 'loans'
export type Features = Record<FeatureKey, boolean>

export interface Recipient {
  id: string
  name: string
  bank: string
  account: string
}

export type TxnKind = 'transfer' | 'collection' | 'payroll' | 'pos' | 'tax' | 'bill'
export type TxnStatus = 'completed' | 'pending' | 'failed'

export interface Txn {
  id: string
  title: string
  kind: TxnKind
  amount: number // positive in, negative out
  status: TxnStatus
  at: string // iso
  sub?: string
}

export interface Approval {
  id: string
  payee: string
  startedBy: string
  amount: number
  at: string
}

export type StaffStatus = 'active' | 'invited'
export interface Staff {
  id: string
  name: string
  role: string
  salary: number
  status: StaffStatus
}

export type PosStage = 'none' | 'requested' | 'assigned' | 'delivering' | 'active'
export interface Pos {
  stage: PosStage
  terminalId?: string
  fsoName?: string
  fsoPhone?: string
  requestedAt?: string
  todayVolume?: number
  weekTxns?: number
  idleFlag?: boolean
}

export type SignalKind = 'payroll' | 'pos' | 'loan' | 'tax' | 'invest'
export interface Signal {
  id: string
  kind: SignalKind
  title: string
  body: string
  cta: string
}

export interface LoanOffer {
  id: string
  amount: number
  rateMonthly: number
  termMonths: number
  reason: string
  accepted?: boolean
}

export interface AppState {
  onboarded: boolean
  business: Business
  features: Features
  balance: number
  moneyIn: number
  moneyOut: number
  flow: number[] // last ~16 net-activity points for the chart
  recipients: Recipient[]
  txns: Txn[]
  approvals: Approval[]
  staff: Staff[]
  payrollDay: number | null
  pos: Pos
  tax: { estimated: number; saved: number }
  invest: { balance: number; rateAnnual: number }
  loan: LoanOffer | null
  signals: Signal[]
  version: number
}
