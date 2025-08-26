import Image from 'next/image'
import ArrowRight from '../../../assets/arrowRight.png'
import { LogDocType } from '@/type/log'
import { formatDate } from '@/util/date'

import BlueRoundedBtnV1 from '../button/BlueRoundedBtnV1'
import Link from 'next/link'

export default function LogCard(props: { doc: LogDocType; planId: string }) {
  const { doc, planId } = props

  return (
    <div className="w-[60rem] mx-auto my-9 ">
      <div className="border-2 border-gray-200 rounded-lg">
        <div className="mx-12 my-6">
          <p>{formatDate(doc.date)}</p>
          <div className="w-full flex justify-between">
            <div className="max-w-[45rem] flex justify-start overflow-x-scroll">
              {doc.place.map((loc, index) => (
                <div
                  key={`${loc.name}${index}`}
                  className="flex max-w-[20em] justify-between"
                >
                  <p className="grid items-center text-[1.23rem] h-[5rem] ">
                    {loc.name}
                  </p>
                  {doc.place.length - 1 !== index && (
                    <div className="grid items-center w-[4.2rem] h-[5rem]">
                      <Image src={ArrowRight} alt="마이맵 마이플랜 나의 일정" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Link href={`/?planId=${planId}&detail=true`}>
              <BlueRoundedBtnV1 text="자세히" />
            </Link>
          </div>
          <div className="flex justify-center"></div>
        </div>
      </div>
    </div>
  )
}
