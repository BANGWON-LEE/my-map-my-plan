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
