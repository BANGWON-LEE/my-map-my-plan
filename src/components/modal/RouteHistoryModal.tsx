'use client'

import { placeDistanceAtom, setPlanHistoryListAtom } from '@/recoil/atoms'
import React, { useEffect, useState } from 'react'
// import Draggable from 'react-draggable'
import { useRecoilState, useRecoilValue } from 'recoil'
import RouteHistoryComponent from './RouteHistoryComponent'
import PlaceHistorySaveBtn from '../maps/PlanHistorySaveBtn'
import { RouteDistanceComponent } from './RouteDistanceComponent'
import { placeDistanceType } from '@/type/route'
// import RouteChoiceBox from '../common/input/RouteChoiceBox'
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

  function setDistanceArr(
    // routeDistanceArr: placeDistanceType[],
    placeDistanceInfo: placeDistanceType
  ) {
    // console.log('placeDis', placeDistanceInfo)
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

  // function checkEmptyRouteDistance(placeName: string) {
  //   console.log('라우트 로우트', placeName, routeDistanceArr)
  //   return (
  //     routeDistanceArr.length === 0 ||
  //     routeDistanceArr.find(
  //       el => el.start === placeName && el.goal !== placeName
  //       // (el.start === undefined && el.goal === placeName)
  //     )
  //   )
  // }

  // useEffect(() => {
  //   const btnIndex = document.getElementById(`route-${}`)
  // },[])

  return (
    <div className="fixed right-[0rem] z-10 w-[27rem] bg-[#fff]   h-[85rem] ">
      <div className="grid content-baseline w-full overflow-y-scroll h-[85rem] ">
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
            {/* {!checkRouteDistanceArr(place.name) &&
              checkEmptyRouteDistance(place.name) && (
                <RouteChoiceBox
                  startInfoState={{
                    start: planHistoryList.find(el => el.name === place.name),
                  }}
                  goalInfoState={{ goal: planHistoryList[index + 1] }}
                  routeBtnStatus={false}
                  index={index}
                />
              )} */}
          </>
        ))}
      </div>
      <PlaceHistorySaveBtn />
    </div>
  )
}
