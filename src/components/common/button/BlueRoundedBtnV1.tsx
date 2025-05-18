import { BlueRoundedBtnV1Type } from '@/type/commonButton'

export default function BlueRoundedBtnV1({
  onClick,
  text,
  btnPosition,
}: BlueRoundedBtnV1Type) {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-blue-400 rounded-3xl w-[5.2rem] p-2  bg-blue-400 text-[#fff] font-bold m-2 cursor-pointer ${btnPosition}`}
    >
      {text}
    </button>
  )
}
