import type { AppState } from '../lib/types'

const now = Date.now()
const iso = (minsAgo: number) => new Date(now - minsAgo * 60000).toISOString()

export function demoState(overrides: Partial<AppState> = {}): AppState {
  return {
    onboarded: true,
    version: 1,
    business: { name: 'HelenMart', kind: 'running', type: 'Retail / Provisions', category: 'Wholesale & Retail', whoHandles: 'both' },
    balance: 2_458_300,
    moneyIn: 3_400_000,
    moneyOut: 1_600_000,
    flow: [9, 11, 10, 13, 12, 15, 14, 13, 16, 15, 18, 17, 20, 19, 23, 26],
    recipients: [
      { id: 'r1', name: 'Greenfield Agro Supplies', bank: 'GTBank', account: '0000004821' },
      { id: 'r2', name: 'Lagos Cold Chain Ltd', bank: 'Access Bank', account: '0112233445' },
      { id: 'r3', name: 'HelenMart Ltd', bank: 'Zenith', account: '2034455667' },
    ],
    txns: [
      { id: 't1', title: 'November Payroll', kind: 'payroll', amount: -140_000, status: 'completed', at: iso(78), sub: 'Transfer' },
      { id: 't2', title: 'Customer payment', kind: 'collection', amount: 182_400, status: 'completed', at: iso(105), sub: 'Collection' },
      { id: 't3', title: 'Greenfield Agro', kind: 'transfer', amount: -480_000, status: 'pending', at: iso(1500), sub: 'Awaiting approval' },
      { id: 't4', title: 'Lagos Cold Chain', kind: 'transfer', amount: -480_000, status: 'pending', at: iso(1510), sub: 'Awaiting approval' },
      { id: 't5', title: 'Customer payment', kind: 'collection', amount: 96_200, status: 'completed', at: iso(1600), sub: 'Collection' },
      { id: 't6', title: 'PHCN prepaid', kind: 'bill', amount: -23_500, status: 'completed', at: iso(1700), sub: 'Bill' },
      { id: 't7', title: 'Customer payment', kind: 'collection', amount: 54_000, status: 'completed', at: iso(2800), sub: 'Collection' },
    ],
    approvals: [
      { id: 'a1', payee: 'Greenfield Agro', startedBy: 'Ngozi', amount: 480_000, at: iso(12) },
      { id: 'a2', payee: 'Greenfield Agro', startedBy: 'Helen', amount: 300_000, at: iso(12) },
      { id: 'a3', payee: 'Greenfield Agro', startedBy: 'Ngozi', amount: 120_000, at: iso(13) },
    ],
    staff: [
      { id: 's1', name: 'Ada Obi', role: 'Sales lead', salary: 90_000, status: 'active' },
      { id: 's2', name: 'Ngozi Eze', role: 'Accounts', salary: 120_000, status: 'active' },
      { id: 's3', name: 'Emeka Nwosu', role: 'Logistics', salary: 80_000, status: 'active' },
      { id: 's4', name: 'Bola Ade', role: 'Cashier', salary: 70_000, status: 'invited' },
      { id: 's5', name: 'Tunde Cole', role: 'Store keeper', salary: 65_000, status: 'invited' },
    ],
    payrollDay: 28,
    pos: { stage: 'none' },
    tax: { estimated: 245_000, saved: 0 },
    invest: { balance: 0, rateAnnual: 0.18 },
    loan: null,
    signals: [
      { id: 'sig-pos', kind: 'pos', title: 'More customers are paying by transfer', body: 'Collections are up this month. A POS terminal captures walk-in customers too.', cta: 'Request a POS' },
    ],
    ...overrides,
  }
}

export function initialState(): AppState {
  // Boots into onboarding; carries demo figures so the intro preview feels real.
  return demoState({ onboarded: false })
}
