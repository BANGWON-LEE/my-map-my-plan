'use client'

// import {
//   myMarker,
//   onLoadMap,
//   setGeolocationOnMap,
// } from '@/actions/map-action/mapFunctions'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'
// import { useEffect } from 'react'

export default function PlaceHistorySaveBtn() {
  //   useEffect(() => {
  //     if (typeof window !== 'undefined') {
  //       navigator.geolocation.getCurrentPosition(setGeolocationOnMap)
  //       // addEventListener('load', getPlaceLocation)
  //       // addEventListener('load2', )
  //       // console.log('load map list', getPlaceLocation())
  //     }
  //   }, [])

  //   function getMyLocation(position: GeolocationPosition) {
  //     const map = onLoadMap(position)

  //     const location = new naver.maps.LatLng(
  //       position.coords.latitude,
  //       position.coords.longitude
  //     )

  //     naver.maps.Event.once(map, 'init', () => {
  //       map.setCenter(location)
  //     })
  //     // infoMark.open(map, location)
  //     myMarker(map, position)
  //   }

  return (
    <BlueRoundedBtnV1
      onClick={() => console.log('기록 저장')}
      text={'저장'}
      btnPosition={'absolute bottom-16 right-6 z-10'}
    />
  )
}
