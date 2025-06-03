'use client'

import { formatAddressTitle, formatMyLocation } from '@/actions/common/common'
import { routeGoalSelector, routeStartSelector } from '@/recoil/selector'
import { pathPropsDataType, routeSelectorType } from '@/type/marker'
import { useRecoilState } from 'recoil'

export default function PathChoiceContainer(props: pathPropsDataType) {
  const { data } = props
  console.log('data', data)
  // console.log('type index', choiceKey)

  const [, setStartInfoState] = useRecoilState(routeStartSelector)
  const [, setGoalInfoState] = useRecoilState(routeGoalSelector)

  function setStartLocInfo(data: routeSelectorType) {
    setStartInfoState({
      start: {
        name: formatAddressTitle(data.title, '</b>'),
        path: {
          x: formatMyLocation(data.mapx),
          y: formatMyLocation(data.mapy),
        },
      },
    })
  }

  function setGoalLocInfo(data: routeSelectorType) {
    setGoalInfoState({
      goal: {
        name: formatAddressTitle(data.title, '</b>'),
        path: {
          x: formatMyLocation(data.mapx),
          y: formatMyLocation(data.mapy),
        },
      },
    })
  }

  return (
    <section className="bg-gray-100 mx-auto w-[5rem] rounded-2xl ">
      <div className="border-b-2 border-b-gray-200">
        <button
          onClick={() => setStartLocInfo(data)}
          className=" w-[5rem] rounded-t-2xl cursor-pointer py-2 font-bold hover:bg-green-300"
        >
          출발
        </button>
      </div>
      <div>
        <button
          onClick={() => setGoalLocInfo(data)}
          className="  w-[5rem] rounded-b-2xl cursor-pointer py-2 font-bold hover:bg-red-300"
        >
          도착
        </button>
      </div>
    </section>
  )
}
