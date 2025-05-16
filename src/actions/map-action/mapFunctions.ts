const getMapOptions = () => {
  return {
    center: new naver.maps.LatLng(37.5666805, 126.9784147),
    // center: new naver.maps.LatLng(37.1666805, 126.4784147),
    zoom: 18,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
  }
}

export const infowindow = () =>
  new naver.maps.InfoWindow({
    content: '<div style="padding:10px;">i am here</div>',
  })

export const onLoadMap = () => new naver.maps.Map('map', getMapOptions())

// const infowindow = () => new naver.maps.InfoWindow()

export function setGeolocationOnMap(): void {
  const geolocationError =
    '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>'

  const map = onLoadMap()
  const infoMark = infowindow()

  switch (navigator.geolocation) {
    case undefined: {
      infoMark.setContent(geolocationError)
      infoMark.open(map, map.getCenter())
      break
    }
    default:
      navigator.geolocation.getCurrentPosition(onSuccessGeolocation)
  }
}

function onSuccessGeolocation(position: GeolocationPosition) {
  const location = new naver.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  )

  const map = onLoadMap()
  const infoMark = infowindow()

  map.setCenter(location) // 얻은 좌표를 지도의 중심으로 설정합니다.
  map.setZoom(18) // 지도의 줌 레벨을 변경합니다.

  infoMark.open(map, location)
}
