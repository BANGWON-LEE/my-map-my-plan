'use client'

import Logo from '../logo/Logo'
// import SearchButtonV1 from '../button/SearchButtonV1'
import { useRecoilValue } from 'recoil'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
// import { useState } from 'react'

export default function StartAndGoalTextField() {
  const startInfoState = useRecoilValue(routeStartSelector)
  const goalInfoState = useRecoilValue(routeGoalSelector)

  return (
    <div className="flex w-full h-full justify-end relative">
      <div className="flex w-4/6 h-3/5  border-2 border-blue-400 rounded-2xl justify-between bg-[#fff] absolute top-2 right-2">
        <Logo />
        <div className="grid">
          <input
            type="text"
            readOnly
            value={startInfoState.start.name}
            // onChange={event => writeText(event)}
            // onKeyDown={event => onKeyDown(event, text)}
            placeholder="검색어를 입력하세요"
            className="outline-0 w-full text-base font-bold"
          />
          <input
            type="text"
            readOnly
            value={goalInfoState.goal.name}
            // onChange={event => writeText(event)}
            // onKeyDown={event => onKeyDown(event, text)}
            placeholder="검색어를 입력하세요"
            className="outline-0 w-full text-base font-bold"
          />
        </div>
        <div className="w-[6rem] h-full">
          {/* <SearchButtonV1 onClick={onClick} onKeyDown={onKeyDown} text={text} /> */}
        </div>
      </div>
    </div>
  )
}
