import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Features } from '../lib/types'

export type Tab = 'home' | 'payment' | 'payroll' | 'grow' | 'more'

// The tabs shown depend on what the business chose during onboarding.
// Home, Payments and More are always present; Payroll and Grow are earned
// by picking the matching features. Max 5, so the bar never overflows.
export function visibleTabs(f: Features): Tab[] {
  if (!f) return ['home', 'payment', 'more']
  const tabs: Tab[] = ['home', 'payment']
  if (f.payroll) tabs.push('payroll')
  if (f.invest || f.loans) tabs.push('grow')
  tabs.push('more')
  return tabs
}

export interface StackItem {
  key: string
  params?: Record<string, unknown>
  id: number
}

interface Nav {
  tab: Tab
  stack: StackItem[]
  setTab: (t: Tab) => void
  push: (key: string, params?: Record<string, unknown>) => void
  pop: () => void
  popAll: () => void
}

const Ctx = createContext<Nav | null>(null)
let counter = 1

export function NavProvider({ children }: { children: ReactNode }) {
  const [tab, setTabState] = useState<Tab>('home')
  const [stack, setStack] = useState<StackItem[]>([])

  const setTab = useCallback((t: Tab) => { setStack([]); setTabState(t) }, [])
  const push = useCallback((key: string, params?: Record<string, unknown>) => {
    setStack((s) => [...s, { key, params, id: counter++ }])
  }, [])
  const pop = useCallback(() => setStack((s) => s.slice(0, -1)), [])
  const popAll = useCallback(() => setStack([]), [])

  return <Ctx.Provider value={{ tab, stack, setTab, push, pop, popAll }}>{children}</Ctx.Provider>
}

export function useNav(): Nav {
  const v = useContext(Ctx)
  if (!v) throw new Error('useNav outside provider')
  return v
}
