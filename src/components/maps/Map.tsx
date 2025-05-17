'use client'

import {
  // getPlaceLocation,
  // getMapOptions,
  // infowindow,
  myMarker,
  onLoadMap,
  setGeolocationOnMap,
} from '@/actions/map-action/mapFunctions'
import { useEffect } from 'react'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'

export default function Map() {
  // const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.geolocation.getCurrentPosition(setGeolocationOnMap)
      // addEventListener('load', getPlaceLocation)
      // addEventListener('load2', )
      // console.log('load map list', getPlaceLocation())
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
      {/* <div className="absolute left-1"> */}
      <BlueRoundedBtnV1
        onClick={() => navigator.geolocation.getCurrentPosition(getMyLocation)}
        text={'Find Me'}
        btnPosition={'absolute bottom-16 right-6 z-10'}
      />
      {/* </div> */}
      <div id="map" className="w-full h-full"></div>
    </div>
  )
}
