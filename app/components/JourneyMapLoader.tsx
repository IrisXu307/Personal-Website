'use client'

import dynamic from 'next/dynamic'

const JourneyMap = dynamic(() => import('./JourneyMap'), { ssr: false })

export default function JourneyMapLoader() {
  return <JourneyMap />
}
