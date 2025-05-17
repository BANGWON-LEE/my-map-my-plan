import Image from 'next/image'
import Search from '../../../assets/search.png'

export default function SearchButtonV1() {
  return (
    <button className="w-full h-full relative">
      <Image fill src={Search} alt="MyMap 장소 검색 버튼" />
    </button>
  )
}
