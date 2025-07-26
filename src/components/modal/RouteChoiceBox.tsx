'use client'
import React from 'react'
import { goalInfoType, startInfoType, tmapRoutePathType } from '@/type/route'
import { useRecoilState } from 'recoil'
import {
  openPlaceListModalAtom,
  routeMethodAtom,
  signalCateGoryStateAtom,
  signalRouteStateAtom,
  startLocSummaryAtom,
} from '@/recoil/atoms'
import {
  goalMarker,
  onLoadRouteMap,
  setCarPolyLine,
  setWalkPolyLine,
  startMarker,
} from '@/actions/map-action/mapFunctions'
import { placeListModalCategory } from '@/data/constants'
import RouteBtnField from '../common/input/RouteBtnField'

export default function RouteChoiceBox(props: {
  startInfoState: startInfoType
  goalInfoState: goalInfoType
  routeBtnStatus: boolean
  index?: number
}) {
  const { startInfoState, goalInfoState, routeBtnStatus, index } = props

  const [, setStartSummaryState] = useRecoilState(startLocSummaryAtom)

  const [, setRoutePathSignal] = useRecoilState(signalRouteStateAtom)
  const [, setCategoryState] = useRecoilState(signalCateGoryStateAtom)

  const [routeTypeState, setRouteTypeState] = useRecoilState(routeMethodAtom)
  const [, setOpenPlaceListModal] = useRecoilState<boolean>(
    openPlaceListModalAtom
  )

  function drawPolyLine(
    // position: routePositionType,
    path: tmapRoutePathType,
    polyLine: (map: naver.maps.Map, path: [[number, number]]) => void,
    method: string
  ) {
    setRoutePathSignal(false)
    const position = {
      x: goalInfoState.goal.path.x,
      y: goalInfoState.goal.path.y,
    }

    const map = onLoadRouteMap(position)
    setCategoryState(placeListModalCategory.route)
    polyLine(map, path.path)
    startMarker(map, startInfoState.start.path)
    setStartSummaryState({
      distance: path.summary.totalDistance,
      duration: path.summary.totalTime * 1000,
      method: method,
    })
    goalMarker(map, goalInfoState.goal.path)
    setOpenPlaceListModal(true)
  }

  async function getPathDrivie(
    startInfoState: startInfoType,
    goalInfoState: goalInfoType
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
    const path = await res.json()
    const method = '자동차'
    drawPolyLine(path, setCarPolyLine, method)
  }

  async function getPathWalk(
    startInfoState: startInfoType,
    goalInfoState: goalInfoType
  ) {
    setRouteTypeState('걷기')
    setRoutePathSignal(true)

    const requestData = {
      startX: startInfoState.start.path.x,
      startY: startInfoState.start.path.y,
      endX: goalInfoState.goal.path.x,
      endY: goalInfoState.goal.path.y,
      // passList: '경도,위도_경도,위도_경도,위도',
      reqCoordType: 'WGS84GEO',
      resCoordType: 'WGS84GEO',
      startName: startInfoState.start.name,
      endName: goalInfoState.goal.name,
    }

    // const path = await getPathWalking(requestData)
    const res = await fetch('/api/walking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
    const path = await res.json()

    const method = '도보'

    drawPolyLine(path, setWalkPolyLine, method)
    setOpenPlaceListModal(true)
  }
  return (
    <div
      id={`route-${index}`}
      className="w-[12rem] h-full grid justify-items-end content-evenly mt-2 mr-5"
    >
      {/* <RouteBtn
        onClick={() => getPathDrivie(startInfoState, goalInfoState)}
        text={'자동차'}
        selected={routeTypeState === '자동차'}
        bgColor={'bg-[#00bfff]'}
        disabled={routeBtnStatus}
      />
      <RouteBtn
        onClick={() => getPathWalk(startInfoState, goalInfoState)}
        text={'걷기'}
        selected={routeTypeState === '걷기'}
        bgColor={'bg-[#90ee90]'}
        disabled={routeBtnStatus}
      /> */}
      <RouteBtnField
        carAction={() => getPathDrivie(startInfoState, goalInfoState)}
        walkAction={() => getPathWalk(startInfoState, goalInfoState)}
        routeTypeState={routeTypeState}
        routeBtnStatus={routeBtnStatus}
      />
      {/* <RouteBtn onClick={() => getPathDrivie('자동차')} text={'자동차'} /> */}
    </div>
  )
}
