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
      navigator.geolocation.getCurrentPosition(setGeolocationOnMap)
    }
  })

  function getMyLocation(position: GeolocationPosition) {
    const map = onLoadMap(position)

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

  return (
    <div className="w-full h-full">
      <BlueRoundedBtnV1
        onClick={() => navigator.geolocation.getCurrentPosition(getMyLocation)}
        // onClick={() => getMyLocation(null)}
        text={'Find Me'}
        btnPosition={'absolute z-10'}
      />
      <div id="map" className="w-full h-full"></div>
    </div>
  )
}
