'use client'

import { setPlanHistoryListAtom } from '@/recoil/atoms'
import React from 'react'
// import Draggable from 'react-draggable'
import { useRecoilState } from 'recoil'
import RouteHistoryComponent from './RouteHistoryComponent'
import PlaceHistorySaveBtn from '../maps/PlanHistorySaveBtn'
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

  return (
    <div className="fixed right-[0rem] z-10 w-[27rem] bg-[#fff]   h-[85rem] ">
      {/* <div className="flex justify-between"> */}
      {/* <div className="flex justify-between items-center w-[11rem] ml-11 mt-3"> */}
      <div className="grid content-baseline w-full overflow-y-scroll h-[85rem] ">
        {planHistoryList.map((place, index) => (
          <RouteHistoryComponent
            key={place.address}
            place={place}
            index={index}
            removePlace={removePlace}
          />
        ))}
      </div>
      <PlaceHistorySaveBtn />
    </div>
  )
}
