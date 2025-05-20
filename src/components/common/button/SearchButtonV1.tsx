import Image from 'next/image'
import Search from '../../../assets/search.png'
import { onClickEventProps } from '@/type/commonButton'
// import { onClickProps } from '@/type/BlueRoundedBtnV1Type'

export default function SearchButtonV1(props: onClickEventProps) {
  const { onClick } = props

  return (
    <button onClick={onClick} className="w-full h-full relative cursor-pointer">
      <Image fill src={Search} alt="MyMap 장소 검색 버튼" />
    </button>
  )
}
