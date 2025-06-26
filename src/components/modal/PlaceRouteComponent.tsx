'use client'

import { locAtomType } from '@/type/route'
import Image from 'next/image'
import ArrowRight from '../../assets/arrowRight.png'
import { convertGetKm, getHourTimeMinTimeFormat } from '@/actions/common/common'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  placeDistance,
  // goalLocAtom,
  setPlanHistoryListAtom,
  signalCateGoryStateAtom,
  startLocSummaryAtom,
} from '@/recoil/atoms'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import { initialPlaceObj, placeListModalCategory } from '@/data/constants'
// import { useEffect } from 'react'
// import { routeSelectorType } from '@/type/marker'

export default function PlaceRouteComponent() {
  // const { startSummaryState, startInfoState, goalInfoState } = props

  // console.log('props startInfoState', startInfoState)

  const placeTextStyle =
    'font-bold text-[1.4rem] whitespace-nowrap overflow-hidden overflow-ellipsis'

  const [planHistoryList, setPlanHistoryList] = useRecoilState(
    setPlanHistoryListAtom
  )

  const startSummaryState = useRecoilValue(startLocSummaryAtom)
  // const goalSummaryState = useRecoilValue(goalLocSummaryAtom)
  const [startInfoState, setStartInfoState] = useRecoilState(routeStartSelector)
  const [goalInfoState, setGoalInfoState] = useRecoilState(routeGoalSelector)
  const [, setCategoryState] = useRecoilState(signalCateGoryStateAtom)
  const [, setPlaceDistanceInfo] = useRecoilState(placeDistance)

  function savePlan(
    startInfoState: locAtomType,
    goalInfoState: locAtomType
  ): void {
    const choicedPlan =
      planHistoryList[planHistoryList.length - 1]?.name === startInfoState.name
        ? [goalInfoState]
        : [startInfoState, goalInfoState]

    setPlanHistoryList(prev => [...prev, ...choicedPlan])
    setPlaceDistanceInfo({
      start: startInfoState.name,
      goal: goalInfoState.name,
      distance: convertGetKm(startSummaryState.distance),
      hour: getHourTimeMinTimeFormat(startSummaryState.duration).hours,
      minutes: getHourTimeMinTimeFormat(startSummaryState.duration).minutes,
      method: startSummaryState.method,
    })
    setStartInfoState({
      start: goalInfoState,
    })
    setGoalInfoState({
      goal: initialPlaceObj,
    })
    setCategoryState(placeListModalCategory.placeList)
  }

  const placeCheck = goalInfoState.goal.address !== ''

  return (
    <section className="w-[33em] h-full mt-8 mx-auto my-5 pb-5 grid items-start border-b-1 border-b-gray-200">
      <div className="w-full h-[11rem] flex">
        <div className="w-[5rem] grid items-center border-r-2 border-l-indigo-500">
          <p className="text-[1.2rem]">출발</p>
        </div>
        <div className="w-full text-center">
          <div className="mb-2">
            <p className={placeTextStyle}>{startInfoState.start.name}</p>
          </div>
          <div className="mb-2">
            <p>{startInfoState.start.category}</p>
          </div>
          <div className="flex justify-evenly mb-2">
            <span>{startInfoState.start.address}</span>
            <span> | </span>
            <span>{startInfoState.start.roadAddress}</span>
          </div>
          <div className="mb-2">
            <textarea
              placeholder="메모를 작성해주세요"
              className="w-[27rem] h-[4rem] border-2 resize-none"
            />
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex justify-center">
        <div className="w-[4.5rem] h-[4.5rem] rotate-90">
          <Image src={ArrowRight} alt="마이맵 마이플랜 출발 도착" />
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex justify-evenly  w-[13rem]">
            <div className="text-right">
              <span className="text-[1.5rem] font-extrabold">
                {placeCheck
                  ? getHourTimeMinTimeFormat(startSummaryState.duration).hours
                  : 0}
              </span>
              <span className="text-[1rem]">시간</span>
              <span className="text-[1.5rem] font-extrabold">
                {placeCheck
                  ? getHourTimeMinTimeFormat(startSummaryState.duration).minutes
                  : 0}
              </span>
              <span className="text-[1rem]">분</span>
            </div>
            <div className="text-[1.4rem]"> | </div>
            <div>
              <span className="text-[1.5rem] font-extrabold">
                {placeCheck ? convertGetKm(startSummaryState.distance) : 0}
              </span>
              <span className="text-[1rem]">km</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[11rem] flex">
        <div className="w-[5rem] grid items-center border-r-2 border-l-indigo-500">
          <p className="text-[1.2rem]">도착</p>
        </div>
        <div className="w-full text-center">
          <div className="mb-2">
            <p className={placeTextStyle}>{goalInfoState.goal.name}</p>
          </div>
          <div className="mb-2">
            <p>{goalInfoState.goal.category}</p>
          </div>
          <div className="flex justify-evenly mb-2">
            <span>{goalInfoState.goal.address}</span>
            <span> | </span>
            <span>{goalInfoState.goal.roadAddress}</span>
          </div>
          <div className="mb-2">
            <textarea
              placeholder="메모를 작성해주세요"
              className="w-[27rem] h-[4rem] border-2 resize-none"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <BlueRoundedBtnV1
          text={'저장'}
          onClick={() => savePlan(startInfoState.start, goalInfoState.goal)}
          // btnPosition={'absolute bottom-16 righ'}
          disabled={goalInfoState.goal.address === ''}
        />
      </div>
    </section>
  )
}
