'use client'

import { setPlanHistoryListAtom } from '@/recoil/atoms'
import React from 'react'
// import Draggable from 'react-draggable'
import { useRecoilValue } from 'recoil'
import RouteHistoryComponent from './RouteHistoryComponent'
// import { RouteDistanceComponent } from './RouteDistanceComponent'
// import { placeDistanceType } from '@/type/route'

export default function RouteHistoryModal() {
  const planHistoryList = useRecoilValue(setPlanHistoryListAtom)

  return (
    <div className="fixed right-[0rem] z-10 w-[27rem] bg-[#fff] h-full rounded-2xl ">
      {/* <div className="flex justify-between"> */}
      {/* <div className="flex justify-between items-center w-[11rem] ml-11 mt-3"> */}
      <div className="grid w-full overflow-y-scroll">
        {planHistoryList.map(place => (
          <RouteHistoryComponent key={place.address} place={place} />
        ))}
      </div>
    </div>
  )
}
