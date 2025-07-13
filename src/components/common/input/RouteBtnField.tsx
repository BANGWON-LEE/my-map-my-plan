'use client'

import RouteBtn from '../button/RouteBtn'

export default function RouteBtnField(props: {
  carAction: () => void
  walkAction: () => void
  routeTypeState: string
  routeBtnStatus: boolean
}) {
  const { carAction, walkAction, routeTypeState, routeBtnStatus } = props

  return (
    <div className="w-[12rem] h-full grid justify-items-end content-evenly mt-2 mr-5">
      <RouteBtn
        onClick={carAction}
        text={'자동차'}
        selected={routeTypeState === '자동차'}
        bgColor={'bg-[#00bfff]'}
        disabled={routeBtnStatus}
      />
      <RouteBtn
        onClick={walkAction}
        text={'걷기'}
        selected={routeTypeState === '걷기'}
        bgColor={'bg-[#90ee90]'}
        disabled={routeBtnStatus}
      />
      {/* <RouteBtn onClick={() => getPathDrivie('자동차')} text={'자동차'} /> */}
    </div>
  )
}
