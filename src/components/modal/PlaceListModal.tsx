'use client'

import { SearchPlaceType } from '@/type/marker'
import { useRef } from 'react'
import Draggable from 'react-draggable'

export default function PlaceListModal(props: {
  searchPlaceList: SearchPlaceType[]
}) {
  const { searchPlaceList } = props

  console.log('searchPlaceList', searchPlaceList)

  const domRef = useRef<HTMLDivElement>(null)

  return (
    <Draggable nodeRef={domRef as React.RefObject<HTMLDivElement>}>
      <div
        ref={domRef}
        className="absolute top-[10rem] left-[5rem] z-10 w-xl bg-[#fff] h-[40rem] rounded-2xl overflow-y-scroll"
      >
        {searchPlaceList.map(el => (
          <section
            className="w-[33em] h-[9em] mx-auto mt-3 mb-3 flex"
            key={el.roadAddress}
          >
            <div className=" w-2/3">
              <div className="flex justify-start w-6/6 items-center">
                <p className="text-[1.2em] mr-3.5 font-bold">{el.title}</p>
                <p className="text-[0.8em]">{el.category}</p>
              </div>
              <div>
                <div>
                  <p>{el.address}</p>
                  <p>{el.roadAddress}</p>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-full text-center">
                <button className="mx-auto w-auto">위치 조회</button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </Draggable>
  )
}
