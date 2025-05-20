import Image from 'next/image'
import { useState } from 'react'
import NotImage from '../../assets/notImage.png'

export default function PlaceListImg(props: any) {
  const { locImg, index } = props

  return (
    <>
      {locImg.length > 0 &&
        locImg[index].value.map(el => (
          <PlaceImg key={el.link} el={el} />
          //   <div>www</div>
        ))}
    </>
  )
}
export function PlaceImg(props: any) {
  const { el } = props
  const [imgSrc, setImgSrc] = useState(el.thumbnail)

  return (
    <div className="w-[5rem] h-[5rem] relative">
      <Image
        fill
        src={imgSrc}
        alt="myMap 검색 사진"
        sizes="80px"
        onError={() => setImgSrc(NotImage)}
      />
    </div>
  )
}
