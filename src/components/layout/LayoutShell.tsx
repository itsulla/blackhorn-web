'use client'

import InvestorGateBottomSheet, {
  type InvestorGateCMSData,
} from '@/components/InvestorGateBottomSheet'
import Navbar from '@/components/layout/Navbar'

export default function LayoutShell({
  investorGate,
}: {
  investorGate?: InvestorGateCMSData
}) {
  return (
    <>
      <InvestorGateBottomSheet cms={investorGate} />
      <Navbar bannerVisible={false} />
    </>
  )
}
