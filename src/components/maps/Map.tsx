'use client'

import {
  // getMapOptions,
  // infowindow,
  myMarker,
  onLoadMap,
  setGeolocationOnMap,
} from '@/actions/map-action/mapFunctions'
import { useEffect } from 'react'
import BlueRoundedBtnV1 from './button/BlueRoundedBtnV1'

export default function Map() {
  // const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const map = onLoadMap()
      navigator.geolocation.getCurrentPosition(setGeolocationOnMap)
    }
  })

  function getMyLocation(position: GeolocationPosition) {
    console.log('qqqqq')
    const map = onLoadMap(position)
    // const infoMark = infowindow()

    const location = new naver.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    )

    naver.maps.Event.once(map, 'init', () => {
      map.setCenter(location)
    })
    // infoMark.open(map, location)
    myMarker(map, position)
  }

  const getMyPosition = () => {
    console.log('qweeees')
    navigator.geolocation.getCurrentPosition(getMyLocation)
  }
  return (
    <div className="w-full h-full">
      <BlueRoundedBtnV1
        onClick={getMyPosition}
        // onClick={() => getMyLocation(null)}
        text={'Find Me'}
        btnPosition={'absolute z-10'}
      />
      <div id="map" className="w-full h-full"></div>
    </div>
  )
}
