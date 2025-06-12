export type tmapObjType = {
  startX: number
  startY: number
  endX: number
  endY: number
  // passList: '경도,위도_경도,위도_경도,위도',
  reqCoordType: string
  resCoordType: string
  startName: string
  endName: string
}

export interface tmapResponseWalk {
  geometry: {
    type: string
    coordinates: [number, number]
  }
}
