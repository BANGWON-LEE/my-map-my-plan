'use client'
import { placeListType } from '@/type/placeHistory'
import React, { useEffect, useState } from 'react'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'
import { useRecoilValue } from 'recoil'
import { placeDistance } from '@/recoil/atoms'
import { placeDistanceType } from '@/type/route'
import { RouteDistanceComponent } from './RouteDistanceComponent'

export default function RouteHistoryComponent(props: placeListType) {
  const { place } = props

  const placeDistanceInfo = useRecoilValue(placeDistance)

  //   const routeDistanceArr: placeDistanceType[] = []
  const [routeDistanceArr, setRouteDistanceArr] = useState<placeDistanceType[]>(
    []
  )

  const setDistanceArr = function (
    // routeDistanceArr: placeDistanceType[],
    placeDistanceInfo: placeDistanceType
  ) {
    setRouteDistanceArr(prev => [...prev, placeDistanceInfo])
  }

  useEffect(() => {
    if (placeDistanceInfo) setDistanceArr(placeDistanceInfo)
  }, [placeDistanceInfo])

  const routeDistanceMatched =
    routeDistanceArr.length > 0 &&
    routeDistanceArr.find(el => el.start === place.name)
  return (
    <>
      <div className="bg-white w-[25em] rounded-lg shadow-lg p-6 my-4 mx-auto flex  ">
        <div className="flex-[3]">
          <div className="font-bold text-xl">{place.name}</div>
          <div className="">{place.category}</div>
          <div>{place.address}</div>
        </div>
        <div className="flex-[1]">
          <BlueRoundedBtnV1 text={'삭제'} onClick={() => console.log('삭제')} />
        </div>
      </div>
      {routeDistanceMatched && (
        <RouteDistanceComponent placeDistanceInfo={routeDistanceMatched} />
      )}
      {/* <RouteDistanceComponent placeDistanceInfo={routeDistanceArr?.[0]} /> */}
    </>
  )
}
