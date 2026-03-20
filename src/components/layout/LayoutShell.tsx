'use client'

import { useState, useCallback } from 'react'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import InvestorDisclaimerModal from '@/components/InvestorDisclaimerModal'
import Navbar from '@/components/layout/Navbar'

export default function LayoutShell() {
  const [bannerVisible, setBannerVisible] = useState(false)

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setBannerVisible(visible)
  }, [])

  return (
    <>
      <InvestorDisclaimerModal />
      <DisclaimerBanner onVisibilityChange={handleVisibilityChange} />
      <Navbar bannerVisible={bannerVisible} />
    </>
  )
}
