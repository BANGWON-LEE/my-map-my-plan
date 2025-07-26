'use client'

import { placeDistanceAtom, setPlanHistoryListAtom } from '@/recoil/atoms'
import React, { useState } from 'react'
// import Draggable from 'react-draggable'
import { useRecoilState } from 'recoil'
import RouteHistoryComponent from './RouteHistoryComponent'
// import PlaceHistorySaveBtn from '../maps/PlanHistorySaveBtn'
import { RouteDistanceComponent } from './RouteDistanceComponent'
import { locAtomType, placeDistanceType } from '@/type/route'
import RouteHistoryChoiceBox from './RouteHistoryChoiceBox'
import CalandarBox from '../common/calandar/CalandarBox'
import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'
import { db } from '@/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
// import { RouteDistanceComponent } from './RouteDistanceComponent'
// import { placeDistanceType } from '@/type/route'

export default function RouteHistoryModal() {
  const [planHistoryList, setPlanHistoryList] = useRecoilState(
    setPlanHistoryListAtom
  )

  function removePlace(index: number, placeName: string): void {
    const choicedIndex = document.getElementById(index.toString())

    const filterPlace = planHistoryList.filter((place, placeIndex) => {
      if (place.name !== placeName && placeIndex !== Number(choicedIndex))
        return place
    })

    setPlanHistoryList(filterPlace)
  }

  const [placeDistanceInfoArr, setPlaceDistanceInfoArr] =
    useRecoilState(placeDistanceAtom)

  function updateDistanceArr(
    // routeDistanceArr: placeDistanceType[],
    placeDistanceInfoArr: placeDistanceType[]
  ) {
    // routeDistanceArr.length = 0
    setPlaceDistanceInfoArr(placeDistanceInfoArr)
  }

  function removeDistance(placeName: string) {
    const filterDistanceArr = placeDistanceInfoArr.filter(
      distance => distance.start !== placeName && distance.goal !== placeName
    )

    updateDistanceArr(filterDistanceArr)
  }

  function removePlaceAndDistance(index: number, placeName: string) {
    removePlace(index, placeName)
    removeDistance(placeName)
  }

  function checkRouteDistanceArr(placeName: string) {
    return (
      placeDistanceInfoArr.length > 0 &&
      placeDistanceInfoArr.find(el => el.start === placeName)
    )
  }

  function checkEmptyRouteDistance(index: number) {
    return planHistoryList.length !== index + 1
  }

  const [planDate, setPlanDate] = useState<string | string[]>('')

  async function setPlanLog(
    planDate: string,
    planHistoryList: locAtomType[],
    placeDistanceInfoArr: placeDistanceType[]
  ) {
    const planDateCheck = planDate === '' || planDate === undefined
    const planHistoryListCheck =
      planHistoryList.length < 1 ||
      placeDistanceInfoArr.length < 1 ||
      planHistoryList.length - 1 !== placeDistanceInfoArr.length

    if (planDateCheck || planHistoryListCheck)
      return alert('날짜 및 계획을 확인해주세요')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    // await setDoc(doc(db, 'plan', user.uid + planDate), {
    //   name: user.displayName,
    //   email: user.email,
    //   plan: {
    //     date: planDate,
    //     place: planHistoryList,
    //     distance: placeDistanceInfoArr,
    //   },
    //   createdAt: new Date().toDateString(),
    // })
    //   .then(() => {
    //     alert('저장되었습니다')
    //   })
    //   .catch(error => {
    //     console.log('error 발생', error)
    //     alert('저장되지 않았습니다. 관리자에게 문의해주세요')
    //   })
  }

  return (
    <div className="fixed right-[0rem] z-10 w-[27rem] bg-[#fff]   h-[85rem] ">
      <div className="flex justify-between mx-10">
        <div className="grid items-center">
          <CalandarBox setState={setPlanDate} />
        </div>
        <div>
          <BlueRoundedBtnV1
            text={'저장'}
            onClick={() =>
              setPlanLog(
                planDate as string,
                planHistoryList,
                placeDistanceInfoArr
              )
            }
            btnPosition={''}
            disabled={false}
          />
        </div>
      </div>
      <div className="grid content-baseline w-full overflow-y-scroll h-[60rem] ">
        {planHistoryList.map((place, index) => (
          <>
            <RouteHistoryComponent
              key={place.address}
              place={place}
              index={index}
              remove={removePlaceAndDistance}
            />
            {checkRouteDistanceArr(place.name) && (
              <RouteDistanceComponent
                // placeDistanceInfoArr={routeDistanceMatched}
                placeDistanceInfoArr={
                  checkRouteDistanceArr(place.name) as placeDistanceType
                }
              />
            )}
            {!checkRouteDistanceArr(place.name) &&
              checkEmptyRouteDistance(index) && (
                <RouteHistoryChoiceBox
                  startInfoState={{
                    start: planHistoryList[index],
                  }}
                  goalInfoState={{ goal: planHistoryList[index + 1] }}
                  routeBtnStatus={false}
                  index={index}
                  setPlaceDistanceInfoArr={setPlaceDistanceInfoArr}
                />
              )}
          </>
        ))}
      </div>
      {/* <PlaceHistorySaveBtn /> */}
    </div>
  )
}
