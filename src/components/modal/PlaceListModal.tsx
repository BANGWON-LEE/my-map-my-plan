'use client'

import { formatAddressTitle, formatMyLocation } from '@/actions/common/common'
import { SearchPlaceType } from '@/type/marker'
// import Image from 'next/image'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import dynamic from 'next/dynamic'
import { ImageSearchResultType } from '@/type/modal'
import { getLocImg } from '@/actions/modal-action/modalFunctions'
import {
  mySearchMarker,
  onSearchLoadMap,
} from '@/actions/map-action/mapFunctions'
import Image from 'next/image'
import CloseBtn from '../../assets/close.png'
import PathChoiceContainer from './PathChoiceContainer'
const PlaceListImg = dynamic(() => import('./PlaceListImg'), {
  ssr: false,
})

export default function PlaceListModal(props: {
  searchPlaceList: SearchPlaceType[]
  close: () => void
}) {
  const { searchPlaceList, close } = props

  const [locImg, setLocImg] = useState<ImageSearchResultType[]>([])

  useEffect(() => {
    async function getImgList() {
      const imgPlaceLocList = searchPlaceList.map(el => {
        const word = el.title + el.address
        return getLocImg(formatAddressTitle(word, '</b>'))
      })
      const settledResult = await Promise.allSettled(imgPlaceLocList)

      const imgArr: ImageSearchResultType[] = settledResult.filter(
        el => el.status === 'fulfilled'
      )

      setLocImg(imgArr)
    }
    getImgList()
    return () => {
      setLocImg([])
    }
  }, [searchPlaceList])

  function handleFindLoc(x: string, y: string): void {
    const position = {
      x: formatMyLocation(Number(x)),
      y: formatMyLocation(Number(y)),
    }

    const map = onSearchLoadMap(position)
    mySearchMarker(map, position)
  }

  const [pathChoice, setPathChoice] = useState('')

  function handlePathChoiceModal(event: MouseEvent<HTMLButtonElement>) {
    const choiceId = event.currentTarget.id

    setPathChoice(choiceId)
  }

  const laodingStatus = locImg.length > 0 && searchPlaceList.length > 0
  // const laodingStatus = false
  const domRef = useRef<HTMLDivElement>(null)

  return (
    <Draggable nodeRef={domRef as React.RefObject<HTMLDivElement>}>
      <div
        ref={domRef}
        className="absolute top-[10rem] left-[5rem] z-10 w-xl bg-[#fff] h-[40rem] rounded-2xl "
      >
        <div className=" m-3 flex justify-end">
          <button
            className=" w-[1.5rem] h-[1.5rem] cursor-pointer"
            onClick={close}
          >
            <Image
              src={CloseBtn}
              unoptimized
              sizes="full"
              alt="마이맵 마이플랜 팝업 닫기"
            />
          </button>
        </div>
        <div className="overflow-y-scroll w-full h-[36.5rem]">
          {laodingStatus ? (
            searchPlaceList.map((el, index) => (
              <section
                className="w-[33em] h-[11em] mx-auto my-5 pb-5 flex border-b-1 border-b-gray-200"
                key={el.mapx + el.mapx}
              >
                <div className=" w-3/4">
                  <div className="flex justify-start w-6/6 items-center">
                    <p className="text-[1.2em] mr-3.5 font-bold">
                      {formatAddressTitle(el.title, '</b>')}
                    </p>
                    <p className="text-[0.8em]">{el.category}</p>
                  </div>
                  <div className="grid">
                    <p className="text-sm">{el.address}</p>
                    <p className="text-sm">{el.roadAddress}</p>
                  </div>
                  <div className="flex justify-between">
                    <PlaceListImg locImg={locImg} index={index} />
                  </div>
                </div>
                <div className="w-1/4">
                  <div className="w-full text-center">
                    <button
                      id={`path-${String(index)}`}
                      onClick={event => {
                        handleFindLoc(el.mapx, el.mapy)
                        handlePathChoiceModal(event)
                      }}
                      className="border-2 font-extrabold p-2 rounded-2xl border-gray-300 bg-blue-300 text-[#FFF] cursor-pointer"
                    >
                      위치 조회
                    </button>

                    {pathChoice === `path-${String(index)}` && (
                      <PathChoiceContainer data={el} />
                    )}
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className="w-full h-full grid items-center text-center m-auto">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin m-auto" />
            </div>
          )}
        </div>
      </div>
    </Draggable>
  )
}
