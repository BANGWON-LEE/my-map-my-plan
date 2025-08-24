'use client'
import Header from '../layout/Header'
import FindMeBtn from './FindMeBtn'
import {
  formatSearchPlaceLocation,
  getCurrentPositionPromise,
  getMyLocAddress,
  onLoadMap,
} from '@/actions/map-action/mapFunctions'
import { getFamousCompany } from '@/data/famousCompany'
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import { SearchPlaceType } from '@/type/marker'
import MapClient from './MapClient'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  openPlaceListModalAtom,
  // goalLocSummaryAtom,
  searchPlaceStateAtom,
  setPlanHistoryListAtom,
  signalCateGoryStateAtom,
} from '@/recoil/atoms'
import { placeListModalCategory } from '@/data/constants'
import RouteHistoryModal from '../modal/RouteHistoryModal'
import Script from 'next/script'
import Profile from '../auth/Profile'
const PlaceListModal = dynamic(() => import('../modal/PlaceListModal'), {
  ssr: false,
})

export default function Map() {
  const [, setSearchPlaceList] =
    useRecoilState<SearchPlaceType[]>(searchPlaceStateAtom)

  useEffect(() => {
    const mapStatus = window.naver?.maps?.Service
    if (mapStatus === null || mapStatus === undefined) {
      console.error('서비스 없음')
      return
    }
  }, [])

  const [, setCategoryState] = useRecoilState(signalCateGoryStateAtom)

  const [openPlaceListModal, setOpenPlaceListModal] = useRecoilState<boolean>(
    openPlaceListModalAtom
  )

  function closeAndClearSearchPlaceList(): void {
    // setSearchPlaceList([])
    setOpenPlaceListModal(!openPlaceListModal)
  }

  async function getPlaceList(text: string) {
    const forMyLocCheckWord = getFamousCompany()

    const position = await getCurrentPositionPromise()
    const myAddress = await getMyLocAddress(position) // 이건 현재 함수에 정의되어 있음
    // console.log('주소:', typeof myAddress)

    const getNearCompany = forMyLocCheckWord.includes(text)
    const myloc = myAddress.jibunAddress + text
    const resultWord = getNearCompany ? myloc : text

    const res = await fetch(
      `/api/searchLoc?text=${encodeURIComponent(resultWord)}`
    )
    const address = await res.json()
    setSearchPlaceList(address.items)
    formatSearchPlaceLocation(address.items)
    setCategoryState(placeListModalCategory.placeList)
    setOpenPlaceListModal(true)
  }

  function handleKeyDown(event: React.KeyboardEvent, text: string) {
    // console.log(event, text)
    // return null
    if (event.key === 'Enter') return getPlaceList(text)
  }

  const planHistoryList = useRecoilValue(setPlanHistoryListAtom)

  return (
    <div className="w-full h-full">
      <Script
        type="text/javascript"
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=1awovn0tlc&submodules=geocoder"
        strategy="afterInteractive"
        onLoad={() => {
          navigator.geolocation.getCurrentPosition(pos => {
            onLoadMap(pos)
          })
        }}
      ></Script>
      <Header onClick={getPlaceList} onKeyDown={handleKeyDown} />
      {openPlaceListModal && (
        <PlaceListModal
          // searchPlaceList={searchPlaceList}
          close={() => closeAndClearSearchPlaceList()}
        />
      )}

      {planHistoryList.length > 0 && <RouteHistoryModal />}
      <FindMeBtn />
      <Profile />
      <Suspense fallback={<div>경로를 불러오는 중</div>}>
        <MapClient />
      </Suspense>
    </div>
  )
}
