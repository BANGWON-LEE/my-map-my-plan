'use client'

import { formatAddressTitle } from '@/actions/common/common'
import { SearchPlaceType } from '@/type/marker'
// import Image from 'next/image'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

// import dynamic from 'next/dynamic'
import { ImageSearchResultType } from '@/type/modal'
import { getLocImg } from '@/actions/modal-action/modalFunctions'
import // mySearchMarker,
// onSearchLoadMap,
'@/actions/map-action/mapFunctions'
import Image from 'next/image'
import CloseBtn from '../../assets/close.png'
// import PathChoiceContainer from './PathChoiceContainer'
import Spinner from '../common/loading/Spinner'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  goalLocSummaryAtom,
  signalCateGoryStateAtom,
  startLocSummaryAtom,
} from '@/recoil/atoms'
import PlaceRouteComponent from './PlaceRouteComponent'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import { placeListModalCategory } from '@/data/constants'
// import PlaceListComponent from './PlaceListComponent'

const PlaceListComponent = lazy(() => import('./PlaceListComponent'))

// const PlaceListImg = dynamic(() => import('./PlaceListImg'), {
//   ssr: false,
// })

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

  const domRef = useRef<HTMLDivElement>(null)

  const categoryBtnStyle =
    'border-2 bg-gray-400 hover:bg-gray-500 text-[#FFF] font-bold rounded-lg p-2'

  const choicedCategoryBtnStyle =
    'border-2 bg-gray-500 hover:bg-gray-500 text-[#FFF] font-extrabold rounded-lg p-2'

  const [categoryState, setCategoryState] = useRecoilState(
    signalCateGoryStateAtom
  )

  function handleCategorySignal(cate: string) {
    setCategoryState(cate)
  }

  const startSummaryState = useRecoilValue(startLocSummaryAtom)
  const goalSummaryState = useRecoilValue(goalLocSummaryAtom)
  const startInfoState = useRecoilValue(routeStartSelector)
  const goalInfoState = useRecoilValue(routeGoalSelector)

  const routeStateSignal = startSummaryState.distance > 0

  return (
    <Draggable nodeRef={domRef as React.RefObject<HTMLDivElement>}>
      <div
        ref={domRef}
        className="absolute top-[10rem] left-[5rem] z-10 w-[39rem]   bg-[#fff] h-[40rem] rounded-2xl "
      >
        <div className="flex justify-between">
          <div className="flex justify-between items-center w-[11rem] ml-11 mt-3">
            <div className="w-32">
              <button
                onClick={() =>
                  handleCategorySignal(placeListModalCategory.placeList)
                }
                className={
                  categoryState === placeListModalCategory.placeList
                    ? choicedCategoryBtnStyle
                    : categoryBtnStyle
                }
              >
                {placeListModalCategory.placeList}
              </button>
            </div>
            <div className="w-32">
              <button
                onClick={() =>
                  handleCategorySignal(placeListModalCategory.route)
                }
                className={
                  categoryState === placeListModalCategory.route
                    ? choicedCategoryBtnStyle
                    : categoryBtnStyle
                }
                disabled={routeStateSignal === false}
              >
                경로정보
              </button>
            </div>
          </div>
          <div className=" mt-3 mr-3 flex justify-end">
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
        </div>
        <div className="overflow-y-scroll w-full h-[36.5rem]">
          <Suspense fallback={<Spinner />}>
            {categoryState === placeListModalCategory.placeList &&
              searchPlaceList.map((el, index) => (
                <PlaceListComponent
                  key={el.mapx - el.mapy}
                  el={el}
                  index={index}
                  locImg={locImg}
                />
              ))}
            {categoryState === placeListModalCategory.route && (
              <PlaceRouteComponent
                startSummaryState={startSummaryState}
                goalSummaryState={goalSummaryState}
                startInfoStateName={startInfoState.start.name}
                goalInfoStateName={goalInfoState.goal.name}
              />
            )}
          </Suspense>
        </div>
      </div>
    </Draggable>
  )
}
