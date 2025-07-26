'use client'
import React, { useState } from 'react'
import {
  goalInfoType,
  placeDistanceType,
  startInfoType,
  tmapRoutePathType,
} from '@/type/route'
import { useRecoilState, useRecoilValue } from 'recoil'
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
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import {
  convertGetKm,
  formatAddressTitle,
  formatMyLocation,
  getHourTimeMinTimeFormat,
} from '@/actions/common/common'
import RouteAddBtnField from '../common/input/RouteAddBtnField'
import { SetState } from '@/type/common'
import Image from 'next/image'
import ArrowRight from '../../assets/arrowRight.png'

export default function RouteHistoryChoiceBox(props: {
  startInfoState: startInfoType
  goalInfoState: goalInfoType
  routeBtnStatus: boolean
  index?: number
  setPlaceDistanceInfoArr: SetState<placeDistanceType[]>
}) {
  const {
    startInfoState,
    goalInfoState,
    routeBtnStatus,
    index,
    setPlaceDistanceInfoArr,
  } = props

  const [, setStartSummaryState] = useRecoilState(startLocSummaryAtom)

  const [, setRoutePathSignal] = useRecoilState(signalRouteStateAtom)
  const [, setCategoryState] = useRecoilState(signalCateGoryStateAtom)

  const [routeTypeState, setRouteTypeState] = useRecoilState(routeMethodAtom)
  const [, setOpenPlaceListModal] = useRecoilState<boolean>(
    openPlaceListModalAtom
  )

  const [, setStartInfoState] = useRecoilState(routeStartSelector)
  const [, setGoalInfoState] = useRecoilState(routeGoalSelector)
  const [movingStage, setMovingStage] = useState<boolean>(false)

  function drawPolyLine(
    // position: routePositionType,
    path: tmapRoutePathType,
    polyLine: (map: naver.maps.Map, path: [[number, number]]) => void,
    method: string
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

    setStartInfoState({
      start: {
        name: formatAddressTitle(startInfoState.start.name, '</b>'),
        path: {
          x: formatMyLocation(startInfoState.start.path.x),
          y: formatMyLocation(startInfoState.start.path.y),
        },
        address: startInfoState.start.address,
        roadAddress: startInfoState.start.roadAddress,
        category: startInfoState.start.category,
      },
    })
    setGoalInfoState({
      goal: {
        name: formatAddressTitle(goalInfoState.goal.name, '</b>'),
        path: {
          x: formatMyLocation(goalInfoState.goal.path.x),
          y: formatMyLocation(goalInfoState.goal.path.y),
        },
        address: goalInfoState.goal.address,
        roadAddress: goalInfoState.goal.roadAddress,
        category: goalInfoState.goal.category,
      },
    })

    setMovingStage(true)
    setOpenPlaceListModal(false)
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
  }

  const startSummaryState = useRecoilValue(startLocSummaryAtom)

  function saveAddRoute(
    index: number = 0,
    setPlaceDistanceInfoArr: SetState<placeDistanceType[]>
  ) {
    const routeData = {
      start: startInfoState.start.name,
      goal: goalInfoState.goal.name,
      distance: convertGetKm(startSummaryState.distance),
      hour: getHourTimeMinTimeFormat(startSummaryState.duration).hours,
      minutes: getHourTimeMinTimeFormat(startSummaryState.duration).minutes,
      method: startSummaryState.method,
    }

    console.log('saveRoute Signal')

    setPlaceDistanceInfoArr((prev: placeDistanceType[]) => {
      const routeArr = [...prev]
      routeArr.splice(index, 0, routeData)
      return routeArr
    })
  }

  function movePrev(setMovingStage: SetState<boolean>) {
    setMovingStage(false)
  }

  const placeCheck = goalInfoState.goal.address !== ''

  return (
    <div className="flex">
      <div
        // id={`route-${index}`}
        className="w-[12rem] h-full grid justify-items-end content-evenly mt-2 mr-5"
      >
        {movingStage === false ? (
          <RouteBtnField
            carAction={() => getPathDrivie(startInfoState, goalInfoState)}
            walkAction={() => getPathWalk(startInfoState, goalInfoState)}
            routeTypeState={routeTypeState}
            routeBtnStatus={routeBtnStatus}
          />
        ) : (
          <div className="grid">
            <div className="flex justify-center">
              <div className="w-[4.5rem] h-[4.5rem] rotate-90">
                <Image src={ArrowRight} alt="마이맵 마이플랜 출발 도착" />
              </div>
              <div className="flex justify-center mt-3">
                <div className="flex justify-evenly  w-[13rem]">
                  <div className="text-right">
                    <span className="text-[1.5rem] font-extrabold">
                      {placeCheck
                        ? getHourTimeMinTimeFormat(startSummaryState.duration)
                            .hours
                        : 0}
                    </span>
                    <span className="text-[1rem]">시간</span>
                    <span className="text-[1.5rem] font-extrabold">
                      {placeCheck
                        ? getHourTimeMinTimeFormat(startSummaryState.duration)
                            .minutes
                        : 0}
                    </span>
                    <span className="text-[1rem]">분</span>
                  </div>
                  <div className="text-[1.4rem]"> | </div>
                  <div>
                    <span className="text-[1.5rem] font-extrabold">
                      {placeCheck
                        ? convertGetKm(startSummaryState.distance)
                        : 0}
                    </span>
                    <span className="text-[1rem]">km</span>
                  </div>
                </div>
              </div>
            </div>
            <RouteAddBtnField
              save={() => saveAddRoute(index, setPlaceDistanceInfoArr)}
              prev={() => movePrev(setMovingStage)}
              routeTypeState={''}
              routeBtnStatus={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}
