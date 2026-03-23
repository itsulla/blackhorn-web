'use client'

import InvestorGateBottomSheet from '@/components/InvestorGateBottomSheet'
import Navbar from '@/components/layout/Navbar'

export default function LayoutShell() {
  return (
    <>
      <InvestorGateBottomSheet />
      <Navbar bannerVisible={false} />
    </>
  )
}
