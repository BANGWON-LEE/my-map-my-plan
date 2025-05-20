'use client'

import { getSearchLocImage } from '@/actions/api/api'
import { formatAddressTitle } from '@/actions/common/common'
import { SearchPlaceType } from '@/type/marker'
// import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import dynamic from 'next/dynamic'
import { ImageSearchResultType } from '@/type/modal'
const PlaceListImg = dynamic(() => import('./PlaceListImg'), {
  ssr: false,
  loading: () => (
    <div className="w-[10rem] text-center m-auto">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  ),
})

export default function PlaceListModal(props: {
  searchPlaceList: SearchPlaceType[]
}) {
  const { searchPlaceList } = props

  //   console.log('searchPlaceList', searchPlaceList)
  const [locImg, setLocImg] = useState<ImageSearchResultType[]>([])
  async function getLocImg(text: string) {
    const img = await getSearchLocImage(text)
    return img.items
  }

  async function getImgList() {
    const imgPlaceLocList = searchPlaceList.map(el => {
      const word = el.title + el.address
      return getLocImg(formatAddressTitle(word, '</b>'))
    })
    const settledResult = await Promise.allSettled(imgPlaceLocList)

    const imgArr: ImageSearchResultType[] = settledResult.filter(
      el => el.status === 'fulfilled'
    )

    console.log('imgARr', imgArr)

    setLocImg(imgArr)
  }

  useEffect(() => {
    getImgList()
    return () => {
      setLocImg([])
    }
  }, [searchPlaceList])

  const laodingStatus = locImg.length > 0 && searchPlaceList.length > 0

  const domRef = useRef<HTMLDivElement>(null)

  return (
    <Draggable nodeRef={domRef as React.RefObject<HTMLDivElement>}>
      <div
        ref={domRef}
        className="absolute top-[10rem] left-[5rem] z-10 w-xl bg-[#fff] h-[40rem] rounded-2xl overflow-y-scroll"
      >
        {laodingStatus &&
          searchPlaceList.map((el, index) => (
            <section
              className="w-[33em] h-[9em] mx-auto mt-5 mb-5 flex"
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
                  <button className="mx-auto w-auto">위치 조회</button>
                </div>
              </div>
            </section>
          ))}
      </div>
    </Draggable>
  )
}
