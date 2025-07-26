'use client'

// import { placeDistance } from '@/recoil/atoms'
import Image from 'next/image'

import ArrowRight from '../../assets/arrowRight.png'
import { placeDistanceType } from '@/type/route'

export function RouteDistanceComponent(props: {
  placeDistanceInfoArr: placeDistanceType
}) {
  const { placeDistanceInfoArr } = props

  return (
    <div className="flex justify-center">
      <div className="grid items-center">
        <span className="text-[1.5rem] font-extrabold">
          {placeDistanceInfoArr?.method}
        </span>
      </div>
      <div className="w-[4.5rem] h-[4.5rem] rotate-90">
        <Image src={ArrowRight} alt="마이맵 마이플랜 출발 도착" />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-evenly  w-[13rem]">
          <div className="text-right">
            <span className="text-[1.5rem] font-extrabold">
              {placeDistanceInfoArr?.hour}
            </span>
            <span className="text-[1rem]">시간</span>
            <span className="text-[1.5rem] font-extrabold">
              {placeDistanceInfoArr?.minutes}
            </span>
            <span className="text-[1rem]">분</span>
          </div>
          <div className="text-[1.4rem]"> | </div>
          <div>
            <span className="text-[1.5rem] font-extrabold">
              {placeDistanceInfoArr?.distance}
            </span>
            <span className="text-[1rem]">km</span>
          </div>
        </div>
      </div>
    </div>
  )
}
