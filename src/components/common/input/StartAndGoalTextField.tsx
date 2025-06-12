'use client'

import { useRecoilValue } from 'recoil'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import { getPathDriving, getPathWalking } from '@/actions/api/api'
import {
  goalMarker,
  onLoadRouteMap,
  setCarPolyLine,
  setWalkPolyLine,
  startMarker,
} from '@/actions/map-action/mapFunctions'
import RouteBtn from '../button/RouteBtn'

export default function StartAndGoalTextField() {
  const startInfoState = useRecoilValue(routeStartSelector)
  const goalInfoState = useRecoilValue(routeGoalSelector)

  const formatStartCoordinate = () =>
    `${startInfoState.start.path.x},${startInfoState.start.path.y}`
  const formatGoalCoordinate = () =>
    `${goalInfoState.goal.path.x},${goalInfoState.goal.path.y}`

  async function getPathDrivie() {
    const startCoordinate = formatStartCoordinate()
    const goalCoordinate = formatGoalCoordinate()

    const path = await getPathDriving(startCoordinate, goalCoordinate)

    const position = {
      x: goalInfoState.goal.path.x,
      y: goalInfoState.goal.path.y,
    }

    const map = onLoadRouteMap(position)
    console.log('path drive', path)
    setCarPolyLine(map, path.path)

    startMarker(map, startInfoState.start.path)
    goalMarker(map, goalInfoState.goal.path)
  }

  async function getPathWalk() {
    // const startCoordinate = formatStartCoordinate()
    // const goalCoordinate = formatGoalCoordinate()

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

    const path = await getPathWalking(requestData)

    const position = {
      x: goalInfoState.goal.path.x,
      y: goalInfoState.goal.path.y,
    }
    //
    // console.log('path walk', path)

    const map = onLoadRouteMap(position)
    setWalkPolyLine(map, path.path)

    startMarker(map, startInfoState.start.path)
    goalMarker(map, goalInfoState.goal.path)
  }

  // function determineRouteType(
  //   routeType: string,
  //   startCoordinate: string,
  //   goalCoordinate: string
  // ) {
  //   switch (routeType) {
  //     case '자동차':
  //       getPathDriving(startCoordinate, goalCoordinate)
  //       break
  //     case '걷기':
  //       getPathWalking(startCoordinate, goalCoordinate)
  //       break
  //   }
  // }

  return (
    <div className="flex w-full h-full justify-end relative">
      <div className="flex w-4/6 h-full  border-2 border-blue-400 rounded-2xl justify-between bg-[#fff] absolute top-2 right-2 p-3">
        <div className="grid">
          <input
            type="text"
            readOnly
            value={startInfoState.start.name}
            placeholder="출발지를 선택하세요"
            className="outline-0 w-full text-base font-bold"
          />
          <input
            type="text"
            readOnly
            value={goalInfoState.goal.name}
            placeholder="도착지를 입력하세요"
            className="outline-0 w-full text-base font-bold"
          />
        </div>
      </div>
      <div className="w-[12rem] h-full grid justify-items-end content-evenly mt-2 mr-5">
        <RouteBtn onClick={() => getPathDrivie()} text={'자동차'} />
        <RouteBtn onClick={() => getPathWalk()} text={'걷기'} />
        {/* <RouteBtn onClick={() => getPathDrivie('자동차')} text={'자동차'} /> */}
      </div>
    </div>
  )
}
