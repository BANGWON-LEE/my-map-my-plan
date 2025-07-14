'use client'

import { placeDistanceAtom, setPlanHistoryListAtom } from '@/recoil/atoms'
import React, { useEffect, useState } from 'react'
// import Draggable from 'react-draggable'
import { useRecoilState, useRecoilValue } from 'recoil'
import RouteHistoryComponent from './RouteHistoryComponent'
import PlaceHistorySaveBtn from '../maps/PlanHistorySaveBtn'
import { RouteDistanceComponent } from './RouteDistanceComponent'
import { placeDistanceType } from '@/type/route'
import RouteHistoryChoiceBox from './RouteHistoryChoiceBox'
import CalandarBox from '../common/calandar/CalandarBox'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'
// import { RouteDistanceComponent } from './RouteDistanceComponent'
// import { placeDistanceType } from '@/type/route'

export default function RouteHistoryModal() {
  const [planHistoryList, setPlanHistoryList] = useRecoilState(
    setPlanHistoryListAtom
  )

  function removePlace(index: number, placeName: string): void {
    const choicedIndex = document.getElementById(index.toString())

    const filterPlace = planHistoryList.filter((place, placeIndex) => {
      if (place.name !== placeName && placeIndex !== Number(choicedIndex))
        return place
    })

    setPlanHistoryList(filterPlace)
  }

  const placeDistanceInfo = useRecoilValue(placeDistanceAtom)

  //   const routeDistanceArr: placeDistanceType[] = []
  const [routeDistanceArr, setRouteDistanceArr] = useState<placeDistanceType[]>(
    []
  )

  function setDistanceArr(placeDistanceInfo: placeDistanceType) {
    setRouteDistanceArr(prev => [...prev, placeDistanceInfo])
  }

  useEffect(() => {
    if (placeDistanceInfo) {
      setDistanceArr(placeDistanceInfo)
    }
  }, [placeDistanceInfo])

  function updateDistanceArr(
    // routeDistanceArr: placeDistanceType[],
    placeDistanceInfo: placeDistanceType[]
  ) {
    // routeDistanceArr.length = 0
    setRouteDistanceArr(placeDistanceInfo)
  }

  function removeDistance(placeName: string) {
    const filterDistanceArr = routeDistanceArr.filter(
      distance => distance.start !== placeName && distance.goal !== placeName
    )

    updateDistanceArr(filterDistanceArr)
  }

  function removePlaceAndDistance(index: number, placeName: string) {
    removePlace(index, placeName)
    removeDistance(placeName)
  }

  function checkRouteDistanceArr(placeName: string) {
    return (
      routeDistanceArr.length > 0 &&
      routeDistanceArr.find(el => el.start === placeName)
    )
  }

  function checkEmptyRouteDistance(index: number) {
    return planHistoryList.length !== index + 1
  }

  const [planDate, setPlanDate] = useState<string | string[]>('')

  return (
    <div className="fixed right-[0rem] z-10 w-[27rem] bg-[#fff]   h-[85rem] ">
      <div className="flex justify-between mx-10">
        <div className="grid items-center">
          <CalandarBox setState={setPlanDate} />
        </div>
        <div>
          <BlueRoundedBtnV1
            text={'저장'}
            onClick={() => console.log('저장')}
            btnPosition={''}
            disabled={false}
          />
        </div>
      </div>
      <div className="grid content-baseline w-full overflow-y-scroll h-[60rem] ">
        {planHistoryList.map((place, index) => (
          <>
            <RouteHistoryComponent
              key={place.address}
              place={place}
              index={index}
              remove={removePlaceAndDistance}
            />
            {checkRouteDistanceArr(place.name) && (
              <RouteDistanceComponent
                // placeDistanceInfo={routeDistanceMatched}
                placeDistanceInfo={
                  checkRouteDistanceArr(place.name) as placeDistanceType
                }
              />
            )}
            {!checkRouteDistanceArr(place.name) &&
              checkEmptyRouteDistance(index) && (
                <RouteHistoryChoiceBox
                  startInfoState={{
                    start: planHistoryList[index],
                  }}
                  goalInfoState={{ goal: planHistoryList[index + 1] }}
                  routeBtnStatus={false}
                  index={index}
                  setRouteDistanceArr={setRouteDistanceArr}
                />
              )}
          </>
        ))}
      </div>
      <PlaceHistorySaveBtn />
    </div>
  )
}
