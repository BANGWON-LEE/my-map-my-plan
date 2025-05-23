import Image from 'next/image'
import Search from '../../../assets/search.png'
import { onClickPropsType } from '@/type/commonButton'

export default function SearchButtonV1(props: onClickPropsType) {
  const { onClick, text } = props

  return (
    <button
      onClick={() => onClick(text)}
      className="w-full h-full relative cursor-pointer"
    >
      <Image fill src={Search} alt="마이맵 마이플랜 장소 검색 버튼" />
    </button>
  )
}
