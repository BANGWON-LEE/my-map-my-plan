'use client'

import {
  goalMarker,
  onLoadRouteMap,
  setCarPolyLine,
  setWalkPolyLine,
  startMarker,
} from '@/actions/map-action/mapFunctions'
import { placeListModalCategory } from '@/data/constants'
import {
  startInfoType,
  goalInfoType,
  tmapRoutePathType,
  routeSummary,
} from '@/type/route'

type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>

export function drawPolyLine(
  path: tmapRoutePathType,
  polyLine: (map: naver.maps.Map, path: [[number, number]]) => void,
  method: string,
  goalInfoState: goalInfoType,
  startInfoState: startInfoType,
  setRoutePathSignal: SetStateFn<boolean>,
  setCategoryState: SetStateFn<string>,
  setStartSummaryState: SetStateFn<routeSummary>,
  setOpenPlaceListModal: SetStateFn<boolean>
) {
  const position = {
    x: goalInfoState.goal.path.x,
    y: goalInfoState.goal.path.y,
  }

  const map = onLoadRouteMap(position)
  setRoutePathSignal(false)
  polyLine(map, path.path)
  startMarker(map, startInfoState.start.path)
  goalMarker(map, goalInfoState.goal.path)
  setCategoryState(placeListModalCategory.route)
  setStartSummaryState({
    distance: path.summary.totalDistance,
    duration: path.summary.totalTime * 1000,
    method: method,
  })
  setOpenPlaceListModal(true)
}

export async function getPathDrivie(
  startInfoState: startInfoType,
  goalInfoState: goalInfoType,
  setRouteTypeState: SetStateFn<string>,
  setRoutePathSignal: SetStateFn<boolean>,
  setCategoryState: SetStateFn<string>,
  setStartSummaryState: SetStateFn<routeSummary>,
  setOpenPlaceListModal: SetStateFn<boolean>
) {
  setRouteTypeState('자동차')
  setRoutePathSignal(true)

  const requestData = {
    startX: startInfoState.start.path.x,
    startY: startInfoState.start.path.y,
    endX: goalInfoState.goal.path.x,
    endY: goalInfoState.goal.path.y,
    reqCoordType: 'WGS84GEO',
    resCoordType: 'WGS84GEO',
    startName: startInfoState.start.name,
    endName: goalInfoState.goal.name,
  }

  const res = await fetch('/api/driving', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  })

  const path = await res.json()
  drawPolyLine(
    path,
    setCarPolyLine,
    '자동차',
    goalInfoState,
    startInfoState,
    setRoutePathSignal,
    setCategoryState,
    setStartSummaryState,
    setOpenPlaceListModal
  )
}

export async function getPathWalk(
  startInfoState: startInfoType,
  goalInfoState: goalInfoType,
  setRouteTypeState: SetStateFn<string>,
  setRoutePathSignal: SetStateFn<boolean>,
  setCategoryState: SetStateFn<string>,
  setStartSummaryState: SetStateFn<routeSummary>,
  setOpenPlaceListModal: SetStateFn<boolean>
) {
  setRouteTypeState('걷기')
  setRoutePathSignal(true)

  const requestData = {
    startX: startInfoState.start.path.x,
    startY: startInfoState.start.path.y,
    endX: goalInfoState.goal.path.x,
    endY: goalInfoState.goal.path.y,
    reqCoordType: 'WGS84GEO',
    resCoordType: 'WGS84GEO',
    startName: startInfoState.start.name,
    endName: goalInfoState.goal.name,
  }

  const res = await fetch('/api/walking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  })

  const path = await res.json()
  drawPolyLine(
    path,
    setWalkPolyLine,
    '도보',
    goalInfoState,
    startInfoState,
    setRoutePathSignal,
    setCategoryState,
    setStartSummaryState,
    setOpenPlaceListModal
  )
}
