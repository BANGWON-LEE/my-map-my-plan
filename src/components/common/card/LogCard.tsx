import Image from 'next/image'
import ArrowRight from '../../../assets/arrowRight.png'
import { LogDocType } from '@/type/log'
import { formatDate } from '@/util/date'

// import BlueRoundedBtnV1 from '../button/BlueRoundedBtnV1'

export default function LogCard(props: { doc: LogDocType }) {
  const { doc } = props

  console.log('받은 거 확인', doc)

  return (
    <div className="w-[60rem] mx-auto my-9 ">
      <div className="border-2 border-gray-200 rounded-lg">
        <div className="mx-12 my-6">
          <p>{formatDate(doc.date)}</p>
          <div className="w-[55em] inline-flex justify-center">
            {doc.place.map((loc, index) => (
              <div
                key={loc.name + index}
                className="flex w-[30em] justify-center"
              >
                <p className="grid items-center text-[2rem] h-[5rem] ">
                  {loc.name}
                </p>
                {doc.place.length - 1 !== index && (
                  <div className="grid items-center w-[4.2rem] h-[5rem]">
                    <Image src={ArrowRight} alt="마이맵 마이플랜 나의 일정" />
                  </div>
                )}
                {/* <p className="grid items-center text-[2rem] ">• • •</p>
              <div className="grid items-center w-[4.2rem] h-[4.2rem]">
                <Image src={ArrowRight} alt="마이맵 마이플랜 나의 일정" />
              </div> */}
                {/* <p className="grid items-center text-[2rem] ">동대문</p> */}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            {/* <BlueRoundedBtnV1
              text="선택"
              //   onClick={() => console.log('마이로그 디테일 버튼')}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
