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

export default function Map() {
  async function getPlaceList(text: string) {
    const forMyLocCheckWord = getFamousCompany()

    const position = await getCurrentPositionPromise()
    const myAddress = await getMyLocAddress(position) // 이건 현재 함수에 정의되어 있음
    console.log('주소:', typeof myAddress)

    const getNearCompany = forMyLocCheckWord.includes(text)
    const myloc = myAddress.jibunAddress + text
    const resultWord = getNearCompany ? myloc : text

    const address = await getSearchLoc(resultWord)
    formatSearchPlaceLocation(address.items)
  }

  return (
    <div className="w-full h-full">
      <Header onClick={getPlaceList} />
      <FindMeBtn />
      <div id="map" className="w-full h-full"></div>
    </div>
  )
}
