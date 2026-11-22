import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StoreProvider, useApp } from './store/store'
import { NavProvider, useNav, visibleTabs } from './nav/nav'
import { ToastHost } from './ui/primitives'
import { PhoneFrame, StatusBar, TabBar, ScreenHeader, Body } from './ui/phone'
import { Onboarding } from './screens/Onboarding'
import { Home } from './screens/Home'
import { Payment } from './screens/Payment'
import { Payroll } from './screens/Payroll'
import { Grow } from './screens/Grow'
import { More } from './screens/More'
import { Transfer } from './screens/flows/Transfer'
import { Receive } from './screens/flows/Receive'
import { Approvals } from './screens/flows/Approvals'
import { Collections } from './screens/flows/Collections'
import { TxnsAll } from './screens/flows/TxnsAll'
import { TxnDetail } from './screens/flows/TxnDetail'
import { RequestPos } from './screens/flows/RequestPos'
import { PosStatus } from './screens/flows/PosStatus'
import { Tax } from './screens/flows/Tax'
import { Invest } from './screens/flows/Invest'
import { Loans } from './screens/flows/Loans'
import { Notifications } from './screens/flows/Notifications'
import { Profile } from './screens/flows/Profile'
import { About } from './screens/flows/About'
import { InviteStaff } from './screens/flows/InviteStaff'
import { RunPayroll } from './screens/flows/RunPayroll'
import { PayrollSetup } from './screens/flows/PayrollSetup'

function FlowPlaceholder({ title }: { title: string }) {
  return <><ScreenHeader title={title} /><Body><p className="text-ink-mute mt-2">Coming together.</p></Body></>
}

type Params = Record<string, unknown> | undefined
const FLOWS: Record<string, (p: Params) => JSX.Element> = {
  transfer: () => <Transfer />,
  receive: () => <Receive />,
  approvals: () => <Approvals />,
  collections: () => <Collections />,
  'txns-all': () => <TxnsAll />,
  txn: (p) => <TxnDetail id={p?.id as string} />,
  'request-pos': () => <RequestPos />,
  'pos-status': () => <PosStatus />,
  tax: () => <Tax />,
  invest: () => <Invest />,
  loans: () => <Loans />,
  notifications: () => <Notifications />,
  profile: () => <Profile />,
  about: () => <About />,
  'invite-staff': () => <InviteStaff />,
  'run-payroll': () => <RunPayroll />,
  'payroll-setup': () => <PayrollSetup />,
}

function TabScreen({ tab }: { tab: string }) {
  switch (tab) {
    case 'home': return <Home />
    case 'payment': return <Payment />
    case 'payroll': return <Payroll />
    case 'grow': return <Grow />
    default: return <More />
  }
}

function Shell() {
  const { tab, stack, setTab } = useNav()
  const features = useApp().features
  const tabs = visibleTabs(features)
  const activeTab = tabs.includes(tab) ? tab : 'home'
  useEffect(() => { if (!tabs.includes(tab)) setTab('home') }, [features, tab, setTab]) // keep the selected tab valid when features change
  return (
    <>
      <StatusBar />
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 flex flex-col"><TabScreen tab={activeTab} /></div>
        <AnimatePresence>
          {stack.map((item, i) => (
            <motion.div key={item.id} className="absolute inset-0 bg-paper flex flex-col" style={{ zIndex: 10 + i }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 340 }}>
              {(FLOWS[item.key] ?? (() => <FlowPlaceholder title={item.key} />))(item.params)}
            </motion.div>
          ))}
        </AnimatePresence>
        {stack.length === 0 && <TabBar />}
      </div>
    </>
  )
}

function Root() {
  const s = useApp()
  return s.onboarded ? <Shell /> : <Onboarding />
}

export default function App() {
  return (
    <StoreProvider>
      <NavProvider>
        <PhoneFrame>
          <ToastHost>
            <Root />
          </ToastHost>
        </PhoneFrame>
      </NavProvider>
    </StoreProvider>
  )
}
