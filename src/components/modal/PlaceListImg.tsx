import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import NotImage from '../../assets/notImage.png'
import { ImageSearchResultType } from '@/type/modal'

type PlaceListImgType = {
  locImg: ImageSearchResultType[]
  index: number
}

export default function PlaceListImg(props: PlaceListImgType) {
  const { locImg, index } = props

  return (
    <>
      {locImg.length > 0 &&
        locImg[index].value.map(el => (
          <PlaceImg key={el.link} el={el.thumbnail} />
          //   <div>www</div>
        ))}
    </>
  )
}
export function PlaceImg(props: { el: string }) {
  const { el } = props
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(el)

  return (
    <div className="w-[5rem] h-[5rem] relative">
      <Image
        fill
        unoptimized
        // width={100}
        // height={30}
        src={imgSrc}
        alt="myMap 검색 사진"
        sizes="80px"
        onError={() => setImgSrc(NotImage)}
      />
    </div>
  )
}
