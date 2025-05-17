export const getMapOptions = (position: GeolocationPosition) => {
  return {
    center: new naver.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    ),
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

export const myMarker = (map: naver.maps.Map, position: GeolocationPosition) =>
  new naver.maps.Marker({
    position: new naver.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    ),
    map: map,
  })

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

export function getPlaceLocation() {
  const placeList = naver.maps.Service.geocode(
    {
      query: '서정동',
    },
    (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        return alert('장소를 찾을 수 없습니다.')
      }

      const result = response.v2 // 검색 결과의 컨테이너
      return result.addresses // 검색 결과의 배열
    }
  )

  return placeList
}
