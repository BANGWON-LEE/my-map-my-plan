import { simplePosition } from '@/type/marker'
import { checkEmptyString } from '../common/common'

export const getMapOptions = (position: GeolocationPosition) => {
  // const checkPositionType = 'coords' in position

  const x = position.coords.latitude
  const y = position.coords.longitude

  return {
    center: new naver.maps.LatLng(x, y),
    zoom: 18,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
  }
}

export const getSearchMapOptions = (position: simplePosition) => {
  const x = Number(position.x)
  const y = Number(position.y)

  return {
    center: new naver.maps.LatLng(y, x),
    zoom: 18,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
  }
}

export const infowindow = () =>
  new naver.maps.InfoWindow({
    content: '<div style="padding:10px;">i am here</div>',
  })

export const onLoadMap = (position: GeolocationPosition) =>
  new naver.maps.Map('map', getMapOptions(position))

export const onSearchLoadMap = (position: simplePosition) =>
  new naver.maps.Map('map', getSearchMapOptions(position))

export const myMarker = (
  map: naver.maps.Map,
  position: GeolocationPosition
) => {
  new naver.maps.Marker({
    position: new naver.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    ),
    map: map,
  })
}

export const mySearchMarker = (
  map: naver.maps.Map,
  position: simplePosition
) => {
  const x = Number(position.x)
  const y = Number(position.y)

  new naver.maps.Marker({
    position: new naver.maps.LatLng(y, x),
    map: map,
  })
}
// const infowindow = () => new naver.maps.InfoWindow()

export function setGeolocationOnMap(position: GeolocationPosition): void {
  const geolocationError =
    '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>'

  const map = onLoadMap(position)
  const infoMark = infowindow()

  switch (navigator.geolocation) {
    case undefined: {
      infoMark.setContent(geolocationError)
      infoMark.open(map, map.getCenter())
      break
    }
    default: {
      navigator.geolocation.getCurrentPosition(onSuccessGeolocation)
    }
  }
}

function onSuccessGeolocation(position: GeolocationPosition) {
  const location = new naver.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  )

  const map = onLoadMap(position)
  // const infoMark = infowindow()

  map.setCenter(location) // 얻은 좌표를 지도의 중심으로 설정합니다.
  map.setZoom(18) // 지도의 줌 레벨을 변경합니다.
  myMarker(map, position)
  // infoMark.open(map, location)
}
export function formatPlaceLocation(
  addresses: naver.maps.Service.AddressItemV2[]
) {
  console.log('check', addresses)

  const position = addresses.map(el => {
    return { x: el.x, y: el.y }
  })

  // const position = { x: 34, y: 132 }

  const map = onSearchLoadMap(position[0])

  position.forEach(el => {
    const position = { x: el.x, y: el.y }

    mySearchMarker(map, position)
  })
}

export function getPlaceLocation(
  text: string,
  formatPlaceLocation: (addresses: naver.maps.Service.AddressItemV2[]) => void
) {
  checkEmptyString(text)

  console.log('naver.maps.Service', naver.maps.Service)

  naver.maps.Service.geocode(
    {
      query: text,
    },
    (status, response) => {
      console.log('response', status, '<===>', response)
      if (status !== naver.maps.Service.Status.OK) {
        return alert('장소를 찾을 수 없습니다.')
      }

      const result = response.v2 // 검색 결과의 컨테이너
      console.log('middle', result.addresses)
      const address = result.addresses
      formatPlaceLocation(address)
      // return result.addresses // 검색 결과의 배열
    }
  )
}

export function renderPlaceMarker(text: string) {
  // formatPlaceLocation(getPlaceLocation(text))
  getPlaceLocation(text, formatPlaceLocation)
  // console.log('result', result)
}
