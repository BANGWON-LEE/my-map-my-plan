'use client'
import { getSearchLoc } from '@/actions/api/api'
import Header from '../layout/Header'
import FindMeBtn from './FindMeBtn'
import {
  formatSearchPlaceLocation,
  getCurrentPositionPromise,
  getMyLocAddress,
} from '@/actions/map-action/mapFunctions'
import { getFamousCompany } from '@/data/famousCompany'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { SearchPlaceType } from '@/type/marker'
import MapClient from './MapClient'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  goalLocSummaryAtom,
  signalCateGoryStateAtom,
  startLocSummaryAtom,
} from '@/recoil/atoms'
import { placeListModalCategory } from '@/data/constants'
const PlaceListModal = dynamic(() => import('../modal/PlaceListModal'), {
  ssr: false,
})

export default function Map() {
  const [searchPlaceList, setSearchPlaceList] = useState<SearchPlaceType[]>([])

  useEffect(() => {
    const mapStatus = window.naver?.maps?.Service
    if (mapStatus === null || mapStatus === undefined) {
      console.error('서비스 없음')
      return
    }
  }, [])

  const [, setCategoryState] = useRecoilState(signalCateGoryStateAtom)

  async function getPlaceList(text: string) {
    const forMyLocCheckWord = getFamousCompany()

    const position = await getCurrentPositionPromise()
    const myAddress = await getMyLocAddress(position) // 이건 현재 함수에 정의되어 있음
    // console.log('주소:', typeof myAddress)

    const getNearCompany = forMyLocCheckWord.includes(text)
    const myloc = myAddress.jibunAddress + text
    const resultWord = getNearCompany ? myloc : text

    const address = await getSearchLoc(resultWord)
    setSearchPlaceList(address.items)
    formatSearchPlaceLocation(address.items)
    setCategoryState(placeListModalCategory.placeList)
  }

  function closeAndClearSearchPlaceList(): void {
    setSearchPlaceList([])
  }

  function handleKeyDown(event: React.KeyboardEvent, text: string) {
    // console.log(event, text)
    // return null
    if (event.key === 'Enter') return getPlaceList(text)
  }

  const startSummaryState = useRecoilValue(startLocSummaryAtom)
  const goalSummaryState = useRecoilValue(goalLocSummaryAtom)
  const routeStateSignal = startSummaryState.distance > 0

  console.log(
    '경로 상태',
    routeStateSignal,
    startSummaryState,
    goalSummaryState
  )

  return (
    <div className="w-full h-full">
      <Header onClick={getPlaceList} onKeyDown={handleKeyDown} />
      {(searchPlaceList.length > 0 || routeStateSignal) && (
        <PlaceListModal
          searchPlaceList={searchPlaceList}
          close={() => closeAndClearSearchPlaceList()}
        />
      )}
      <FindMeBtn />
      <Suspense fallback={<div>경로를 불러오는 중</div>}>
        <MapClient />
      </Suspense>
    </div>
  )
}
