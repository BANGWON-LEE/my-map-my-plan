'use client'

import { useRecoilValue } from 'recoil'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import RouteChoiceBox from './RouteChoiceBox'
// import { start } from 'repl'
// import { getPathDriving, getPathWalking } from '@/pages/api/searchLoc'

export default function StartAndGoalTextField() {
  const startInfoState = useRecoilValue(routeStartSelector)
  const goalInfoState = useRecoilValue(routeGoalSelector)

  // console.log('저장 후 탐색', startInfoState, goalInfoState)

  // const [, setStartSummaryState] = useRecoilState(startLocSummaryAtom)

  // const [, setRoutePathSignal] = useRecoilState(signalRouteStateAtom)
  // const [, setCategoryState] = useRecoilState(signalCateGoryStateAtom)

  // const [routeTypeState, setRouteTypeState] = useRecoilState(routeMethodAtom)
  // const [, setOpenPlaceListModal] = useRecoilState<boolean>(
  //   openPlaceListModalAtom
  // )

  // function drawPolyLine(
  //   // position: routePositionType,
  //   path: tmapRoutePathType,
  //   polyLine: (map: naver.maps.Map, path: [[number, number]]) => void,
  //   method: string
  // ) {
  //   const position = {
  //     x: goalInfoState.goal.path.x,
  //     y: goalInfoState.goal.path.y,
  //   }

  //   const map = onLoadRouteMap(position)
  //   setRoutePathSignal(false)
  //   polyLine(map, path.path)
  //   startMarker(map, startInfoState.start.path)
  //   goalMarker(map, goalInfoState.goal.path)
  //   setCategoryState(placeListModalCategory.route)
  //   setStartSummaryState({
  //     distance: path.summary.totalDistance,
  //     duration: path.summary.totalTime * 1000,
  //     method: method,
  //   })
  //   setOpenPlaceListModal(true)
  // }

  // async function getPathDrivie(
  //   startInfoState: startInfoType,
  //   goalInfoState: goalInfoType
  // ) {
  //   setRouteTypeState('자동차')
  //   setRoutePathSignal(true)
  //   const requestData = {
  //     startX: startInfoState.start.path.x,
  //     startY: startInfoState.start.path.y,
  //     endX: goalInfoState.goal.path.x,
  //     endY: goalInfoState.goal.path.y,
  //     reqCoordType: 'WGS84GEO',
  //     resCoordType: 'WGS84GEO',
  //     startName: startInfoState.start.name,
  //     endName: goalInfoState.goal.name,
  //   }

  //   const res = await fetch('/api/driving', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(requestData),
  //   })
  //   const path = await res.json()
  //   const method = '자동차'
  //   drawPolyLine(path, setCarPolyLine, method)
  // }

  // async function getPathWalk(
  //   startInfoState: startInfoType,
  //   goalInfoState: goalInfoType
  // ) {
  //   setRouteTypeState('걷기')
  //   setRoutePathSignal(true)

  //   const requestData = {
  //     startX: startInfoState.start.path.x,
  //     startY: startInfoState.start.path.y,
  //     endX: goalInfoState.goal.path.x,
  //     endY: goalInfoState.goal.path.y,
  //     // passList: '경도,위도_경도,위도_경도,위도',
  //     reqCoordType: 'WGS84GEO',
  //     resCoordType: 'WGS84GEO',
  //     startName: startInfoState.start.name,
  //     endName: goalInfoState.goal.name,
  //   }

  //   // const path = await getPathWalking(requestData)
  //   const res = await fetch('/api/walking', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(requestData),
  //   })
  //   const path = await res.json()

  //   const method = '도보'

  //   drawPolyLine(path, setWalkPolyLine, method)
  //   setOpenPlaceListModal(true)
  // }

  const routeBtnStatus =
    startInfoState.start.name === '' || goalInfoState.goal.name === ''

  return (
    <div className="flex w-full h-full justify-end relative">
      <div className="flex w-4/6 h-full  border-2 border-blue-400 rounded-2xl justify-between bg-[#fff] absolute top-2 right-2 p-3">
        <div className="grid">
          <input
            type="text"
            readOnly
            value={'출발 : ' + startInfoState.start.name}
            placeholder="출발지를 선택하세요"
            className="outline-0 w-full text-base font-bold"
          />
          <input
            type="text"
            readOnly
            value={'도착 : ' + goalInfoState.goal.name}
            placeholder="도착지를 입력하세요"
            className="outline-0 w-full text-base font-bold"
          />
        </div>
      </div>
      <RouteChoiceBox
        startInfoState={startInfoState}
        goalInfoState={goalInfoState}
        routeBtnStatus={routeBtnStatus}
      />
    </div>
  )
}
