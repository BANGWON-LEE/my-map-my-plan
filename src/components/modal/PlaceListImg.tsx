'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import NotImage from '../../assets/notImage.png'
import { ImageSearchResultType } from '@/type/modal'

type placeListImgType = {
  locImg: ImageSearchResultType[]
  index: number
}

export default function PlaceListImg(props: placeListImgType) {
  const { locImg, index } = props

  if (locImg[index]?.value === undefined) {
    console.error('placeImg undefined')
    return
  }

  return (
    <>
      {locImg.length > 0 &&
        locImg[index]?.value.map(el => (
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
    <div className="w-[5rem] h-[5rem] relative ">
      <Image
        fill
        unoptimized
        src={imgSrc}
        alt="마이맵 마이플랜 검색 사진"
        sizes={'80'}
        onError={() => setImgSrc(NotImage)}
      />
    </div>
  )
}
