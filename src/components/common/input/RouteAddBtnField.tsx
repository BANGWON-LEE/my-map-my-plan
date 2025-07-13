'use client'

import RouteBtn from '../button/RouteBtn'

export default function RouteAddBtnField(props: {
  save: () => void
  prev: () => void
  routeTypeState: string
  routeBtnStatus: boolean
}) {
  const { save, prev, routeTypeState, routeBtnStatus } = props

  return (
    <div className="w-[12rem] h-full flex justify-items-end content-evenly mt-2 mx-auto">
      <RouteBtn
        onClick={save}
        text={'저장'}
        selected={routeTypeState === '자동차'}
        bgColor={'bg-[#00bfff]'}
        disabled={routeBtnStatus}
      />
      <RouteBtn
        onClick={prev}
        text={'이전으로'}
        selected={routeTypeState === '걷기'}
        bgColor={'bg-[#90ee90]'}
        disabled={routeBtnStatus}
      />
    </div>
  )
}
