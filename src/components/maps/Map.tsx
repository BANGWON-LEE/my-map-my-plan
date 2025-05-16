'use client'

import {
  infowindow,
  onLoadMap,
  setGeolocationOnMap,
} from '@/actions/map-action/mapFunctions'
import { useEffect } from 'react'
import BlueRoundedBtnV1 from './button/BlueRoundedBtnV1'

export default function Map() {
  // const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const map = onLoadMap()

    if (typeof window !== 'undefined') {
      // onLoadMap()
      setGeolocationOnMap()
    }

    return () => {
      //   onLoadMap()
      console.log('check!!', map.destroy())
      map.destroy()
    }
  }, [])

  function getMyLocation(position: GeolocationPosition) {
    const map = onLoadMap()
    const infoMark = infowindow()

    const location = new naver.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    )

    naver.maps.Event.once(map, 'init', function () {
      map.setCenter(location)
    })
    infoMark.open(map, location)
  }

  return (
    <div className="w-full h-full">
      <BlueRoundedBtnV1
        onClick={() => navigator.geolocation.getCurrentPosition(getMyLocation)}
        text={'Me'}
        btnPosition={'absolute z-10'}
      />
      <div id="map" className="w-full h-full"></div>
    </div>
  )
}
