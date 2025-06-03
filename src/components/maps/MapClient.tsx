'use client'

// import dynamic from 'next/dynamic'
// import RecoilRootWrapper from '../wrapper/RecoilWrapper'

// import dynamic from 'next/dynamic'

// const Map = dynamic(() => import('./Map'), {
//   ssr: false,
// })

// import { Suspense } from 'react'

import Map from './Map'

export default function MapClient() {
  return <Map />
}
