'use client'
import { placeListType } from '@/type/placeHistory'
import React from 'react'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'

export default function RouteHistoryComponent(props: placeListType) {
  const { place, index, remove } = props

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
              remove(index, place.name)
            }}
          />
        </div>
      </div>
    </>
  )
}
