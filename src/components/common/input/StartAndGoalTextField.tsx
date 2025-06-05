'use client'

import SearchButtonV1 from '../button/SearchButtonV1'
import { useRecoilValue } from 'recoil'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import { getPathDriving } from '@/actions/api/api'

export default function StartAndGoalTextField() {
  const startInfoState = useRecoilValue(routeStartSelector)
  const goalInfoState = useRecoilValue(routeGoalSelector)

  const formatStartCoordinate = () =>
    `${startInfoState.start.path.x},${startInfoState.start.path.y}`
  const formatGoalCoordinate = () =>
    `${goalInfoState.goal.path.x},${goalInfoState.goal.path.y}`

  async function getPathDrivie() {
    // console.log('rere', startInfoState.start.path.x)
    // const startXpath = startInfoState.start.path.x
    // const startYpath = startInfoState.start.path.y
    const startCoordinate = formatStartCoordinate()
    const goalCoordinate = formatGoalCoordinate()

    const path = await getPathDriving(startCoordinate, goalCoordinate)
    console.log('get 드라이브 경로', path)
  }

  return (
    <div className="flex w-full h-full justify-end relative">
      <div className="flex w-4/6 h-4/6  border-2 border-blue-400 rounded-2xl justify-between bg-[#fff] absolute top-2 right-2 p-3">
        <div className="grid">
          <input
            type="text"
            readOnly
            value={startInfoState.start.name}
            placeholder="검색어를 입력하세요"
            className="outline-0 w-full text-base font-bold"
          />
          <input
            type="text"
            readOnly
            value={goalInfoState.goal.name}
            placeholder="검색어를 입력하세요"
            className="outline-0 w-full text-base font-bold"
          />
        </div>
        <div className="w-[6rem] h-full">
          <SearchButtonV1 onClick={() => getPathDrivie()} />
        </div>
      </div>
    </div>
  )
}
