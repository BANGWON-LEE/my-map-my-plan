import { totalRouteSummary } from '@/type/route'
import Image from 'next/image'
import ArrowRight from '../../assets/arrowRight.png'
import { convertGetKm, getHourTimeMinTimeFormat } from '@/actions/common/common'

export default function PlaceRouteComponent(props: totalRouteSummary) {
  const { startSummaryState, startInfoStateName, goalInfoStateName } = props

  console.log('props check', startSummaryState)

  const placeTextStyle =
    'font-bold text-[1.4rem] whitespace-nowrap overflow-hidden overflow-ellipsis'

  return (
    <section className="w-[33em] h-[11em] mx-auto my-5 pb-5 flex border-b-1 border-b-gray-200">
      <div className="w-full my-4">
        <div className="w-full grid">
          <div className="w-full flex justify-between">
            <div className="w-[12rem] text-center">
              <p className="text-[1.2rem]">출발</p>
              <p className={placeTextStyle}>{startInfoStateName}</p>
            </div>
            <div className="w-[4.5rem] h-[4.5rem]">
              <Image src={ArrowRight} alt="마이맵 마이플랜 출발 도착" />
            </div>
            <div className="w-[12rem] text-center ">
              <p className="text-[1.2rem]">도착</p>
              <p className={placeTextStyle}>{goalInfoStateName}</p>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <div className="flex justify-evenly  w-[13rem]">
              <div className="text-right">
                <span className="text-[1.5rem] font-extrabold">
                  {getHourTimeMinTimeFormat(startSummaryState.duration).hours}
                </span>
                <span className="text-[1rem]">시간</span>
                <span className="text-[1.5rem] font-extrabold">
                  {getHourTimeMinTimeFormat(startSummaryState.duration).minutes}
                </span>
                <span className="text-[1rem]">분</span>
              </div>
              <div className="text-[1.4rem]"> | </div>
              <div>
                <span className="text-[1.5rem] font-extrabold">
                  {convertGetKm(startSummaryState.distance)}
                </span>
                <span className="text-[1rem]">km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
