'use client'

import { signalRouteState } from '@/recoil/atoms'

import { useRecoilState } from 'recoil'
import RouteSpinner from '../common/loading/RouteSpinner'

// import dynamic from 'next/dynamic'
// import RecoilRootWrapper from '../wrapper/RecoilWrapper'

// import dynamic from 'next/dynamic'

// const Map = dynamic(() => import('./Map'), {
//   ssr: false,
// })

// import { Suspense } from 'react'

export default function MapClient() {
  const [routePathSignal] = useRecoilState(signalRouteState)

  return (
    <>
      {routePathSignal && <RouteSpinner />}
      <div id="map" className="w-full h-full"></div>
    </>
  )
}
