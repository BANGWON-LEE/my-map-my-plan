import Image from 'next/image'
import ArrowRight from '../../../assets/arrowRight.png'
// import BlueRoundedBtnV1 from '../button/BlueRoundedBtnV1'

export default function LogCard() {
  return (
    <div className="w-[60rem] mx-auto ">
      <div className="border-2 border-gray-200 rounded-lg">
        <div className="mx-12 my-6">
          <p>2025-08-15</p>
          <div className="w-[55em] inline-flex justify-center">
            <div className="flex w-[30em] justify-center">
              <p className="grid items-center text-[2rem] ">광화문</p>
              <div className="grid items-center w-[4.2rem] h-[4.2rem]">
                <Image src={ArrowRight} alt="마이맵 마이플랜 나의 일정" />
              </div>
              {/* <p className="grid items-center text-[2rem] ">• • •</p>
              <div className="grid items-center w-[4.2rem] h-[4.2rem]">
                <Image src={ArrowRight} alt="마이맵 마이플랜 나의 일정" />
              </div> */}
              <p className="grid items-center text-[2rem] ">동대문</p>
            </div>
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
