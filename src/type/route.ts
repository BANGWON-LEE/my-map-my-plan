export type tmapObjType = {
  startX: number
  startY: number
  endX: number
  endY: number
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

export type routeSummary = {
  distance: number
  duration: number
}

export interface locAtomType {
  name: string
  path: {
    x: number
    y: number
  }
  address: string
  roadAddress: string
  category: string
}

export type totalRouteSummary = {
  startSummaryState: routeSummary
  goalSummaryState: routeSummary
  startInfoState: {
    start: locAtomType
  }
  goalInfoState: {
    goal: locAtomType
  }
}

export type routePositionType = {
  // position: {
  x: number
  y: number
  // }
}

export type tmapRoutePathType = {
  path: [[number, number]]
  summary: {
    description: string
    index: number
    name: string
    nextRoadName: string
    pointIndex: number
    pointType: string
    taxiFare: number
    totalDistance: number
    totalFare: number
    totalTime: number
    turnType: number
  }
}

export type placeDistanceType = {
  start: string
  goal: string
  distance: number
  // duration: number
  hour: number
  minutes: number
  method: string
}
