'use client'

// import { signalRouteStateAtom } from '@/recoil/atoms'

// import { useRecoilValue } from 'recoil'
// import RouteSpinner from '../common/loading/RouteSpinner'

export default function MapClient() {
  // const routePathSignal = useRecoilValue(signalRouteStateAtom)

  return (
    <>
      {/* {routePathSignal && <RouteSpinner />} */}
      <div id="map" className="w-full h-full"></div>
    </>
  )
}
