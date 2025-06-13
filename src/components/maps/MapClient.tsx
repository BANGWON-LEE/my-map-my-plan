'use client'

import { signalRouteStateAtom } from '@/recoil/atoms'

import { useRecoilState } from 'recoil'
import RouteSpinner from '../common/loading/RouteSpinner'

export default function MapClient() {
  const [routePathSignal] = useRecoilState(signalRouteStateAtom)

  return (
    <>
      {routePathSignal && <RouteSpinner />}
      <div id="map" className="w-full h-full"></div>
    </>
  )
}
