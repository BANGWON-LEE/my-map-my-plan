'use client'
import { placeListType } from '@/type/placeHistory'
import React, { useEffect, useState } from 'react'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'
import { useRecoilValue } from 'recoil'
import { placeDistanceAtom } from '@/recoil/atoms'
import { placeDistanceType } from '@/type/route'
import { RouteDistanceComponent } from './RouteDistanceComponent'

export default function RouteHistoryComponent(props: placeListType) {
  const { place, index, removePlace } = props

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

  const updateDistanceArr = function (
    // routeDistanceArr: placeDistanceType[],
    placeDistanceInfo: placeDistanceType[]
  ) {
    setRouteDistanceArr(placeDistanceInfo)
  }

  useEffect(() => {
    if (placeDistanceInfo) {
      console.log('remove!!!', routeDistanceArr)
      setDistanceArr(placeDistanceInfo)
    }
  }, [placeDistanceInfo])

  const routeDistanceMatched =
    routeDistanceArr.length > 0 &&
    routeDistanceArr.find(el => el.start === place.name)

  function removeDistance(index: number) {
    const removeIndex = index

    console.log('removeIndex', removeIndex, routeDistanceArr)

    const filterDistanceArr = routeDistanceArr.filter(
      (distance, routeIndex) => {
        console.log('차차차', routeIndex, removeIndex)
        if (distance.goal === place.name) return distance
      }
    )

    console.log('fffqqq', filterDistanceArr)
    // routeDistanceArr.splice(removeIndex, 1)
    updateDistanceArr(filterDistanceArr)
  }

  console.log('routeDDD', routeDistanceArr)

  return (
    <>
      <div
        id={index.toString()}
        className="bg-white w-[25em]  h-[10em] rounded-lg shadow-lg p-6 my-4 mx-auto flex  "
      >
        <div className="flex-[3] h-full">
          <div className="font-bold text-xl">{place.name}</div>
          <div className="">{place.category}</div>
          <div>{place.address}</div>
        </div>
        <div className="flex-[1] h-full">
          <BlueRoundedBtnV1
            text={'삭제'}
            onClick={() => {
              removePlace(index, place.name)
              removeDistance(index)
            }}
          />
        </div>
      </div>
      {routeDistanceMatched && (
        <RouteDistanceComponent placeDistanceInfo={routeDistanceMatched} />
      )}
    </>
  )
}
