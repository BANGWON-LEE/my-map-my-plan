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
import { useEffect, useState } from 'react'
import { SearchPlaceType } from '@/type/marker'
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
  }

  function closeAndClearSearchPlaceList(): void {
    setSearchPlaceList([])
  }

  function handleKeyDown(event: React.KeyboardEvent, text: string) {
    if (event.key === 'Enter') getPlaceList(text)
  }

  return (
    <div className="w-full h-full">
      <Header onClick={getPlaceList} onKeyDown={handleKeyDown} />
      {searchPlaceList.length > 0 && (
        <PlaceListModal
          searchPlaceList={searchPlaceList}
          close={() => closeAndClearSearchPlaceList()}
        />
      )}
      <FindMeBtn />
      <div id="map" className="w-full h-full"></div>
    </div>
  )
}
