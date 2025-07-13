'use client'

import { useRecoilValue } from 'recoil'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import RouteChoiceBox from '../../modal/RouteChoiceBox'
// import { start } from 'repl'
// import { getPathDriving, getPathWalking } from '@/pages/api/searchLoc'

export default function StartAndGoalTextField() {
  const startInfoState = useRecoilValue(routeStartSelector)
  const goalInfoState = useRecoilValue(routeGoalSelector)

  const routeBtnStatus =
    startInfoState.start.name === '' || goalInfoState.goal.name === ''

  return (
    <div className="flex w-full h-full justify-end relative">
      <div className="flex w-4/6 h-full  border-2 border-blue-400 rounded-2xl justify-between bg-[#fff] absolute top-2 right-2 p-3">
        <div className="grid">
          <input
            type="text"
            readOnly
            value={'출발 : ' + startInfoState.start.name}
            placeholder="출발지를 선택하세요"
            className="outline-0 w-full text-base font-bold"
          />
          <input
            type="text"
            readOnly
            value={'도착 : ' + goalInfoState.goal.name}
            placeholder="도착지를 입력하세요"
            className="outline-0 w-full text-base font-bold"
          />
        </div>
      </div>
      <RouteChoiceBox
        startInfoState={startInfoState}
        goalInfoState={goalInfoState}
        routeBtnStatus={routeBtnStatus}
      />
    </div>
  )
}
