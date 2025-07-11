'use client'
import { placeListType } from '@/type/placeHistory'
import React from 'react'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'
// import { useRecoilValue } from 'recoil'
// import { placeDistanceAtom } from '@/recoil/atoms'
// import { placeDistanceType } from '@/type/route'
// import { RouteDistanceComponent } from './RouteDistanceComponent'

export default function RouteHistoryComponent(props: placeListType) {
  const { place, index, remove } = props

  // const placeDistanceInfo = useRecoilValue(placeDistanceAtom)

  // //   const routeDistanceArr: placeDistanceType[] = []
  // const [routeDistanceArr, setRouteDistanceArr] = useState<placeDistanceType[]>(
  //   []
  // )

  // function setDistanceArr(
  //   // routeDistanceArr: placeDistanceType[],
  //   placeDistanceInfo: placeDistanceType
  // ) {
  //   // console.log('placeDis', placeDistanceInfo)
  //   setRouteDistanceArr(prev => [...prev, placeDistanceInfo])
  // }

  // useEffect(() => {
  //   if (placeDistanceInfo) {
  //     console.log('remove!!!', routeDistanceArr)
  //     setDistanceArr(placeDistanceInfo)
  //   }
  // }, [placeDistanceInfo])

  // const routeDistanceMatched =
  //   routeDistanceArr.length > 0 &&
  //   routeDistanceArr.find(el => el.start === place.name)

  // function updateDistanceArr(
  //   // routeDistanceArr: placeDistanceType[],
  //   placeDistanceInfo: placeDistanceType[]
  // ) {
  //   console.log('라우트 99999')
  //   // routeDistanceArr.length = 0
  //   setRouteDistanceArr(placeDistanceInfo)
  // }

  // function removeDistance(index: number, placeName: string) {
  //   const filterDistanceArr = routeDistanceArr.filter(
  //     (distance, routeIndex) =>
  //       distance.start !== placeName && distance.goal !== placeName
  //   )

  //   console.log('fffqqq', filterDistanceArr)
  //   // routeDistanceArr.splice(removeIndex, 1)
  //   updateDistanceArr(filterDistanceArr)
  // }

  // console.log('거리 배열 확인 중', routeDistanceArr)
  // console.log('라우트 확인 중', routeDistanceMatched)

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
      {/* {routeDistanceMatched && (
        <RouteDistanceComponent placeDistanceInfo={routeDistanceMatched} />
      )} */}
    </>
  )
}
