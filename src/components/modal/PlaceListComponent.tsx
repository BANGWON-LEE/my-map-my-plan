import { formatAddressTitle, formatMyLocation } from '@/actions/common/common'
import {
  mySearchMarker,
  onSearchLoadMap,
} from '@/actions/map-action/mapFunctions'
import dynamic from 'next/dynamic'
import { MouseEvent, useState } from 'react'
import PathChoiceContainer from './PathChoiceContainer'
import { totalPlaceListComponentType } from '@/type/modal'
const PlaceListImg = dynamic(() => import('./PlaceListImg'), {
  ssr: false,
})

export default function PlaceListComponent(props: totalPlaceListComponentType) {
  const { el, index, locImg } = props

  function handleFindLoc(x: number, y: number): void {
    const position = {
      x: formatMyLocation(Number(x)),
      y: formatMyLocation(Number(y)),
    }

    const map = onSearchLoadMap(position)
    mySearchMarker(map, position)
  }

  const [pathChoice, setPathChoice] = useState('')

  function handlePathChoiceModal(event: MouseEvent<HTMLButtonElement>) {
    const choiceId = event.currentTarget.id

    setPathChoice(choiceId)
  }

  return (
    <section
      className="w-[33em] h-[11em] mx-auto my-5 pb-5 flex border-b-1 border-b-gray-200"
      key={el.mapx + el.mapx}
    >
      <div className=" w-3/4">
        <div className="flex justify-start w-6/6 items-center">
          <p className="text-[1.2em] mr-3.5 font-bold">
            {formatAddressTitle(el.title, '</b>')}
          </p>
          <p className="text-[0.8em]">{el.category}</p>
        </div>
        <div className="grid">
          <p className="text-sm">{el.address}</p>
          <p className="text-sm">{el.roadAddress}</p>
        </div>
        <div className="flex justify-between">
          <PlaceListImg locImg={locImg} index={index} />
        </div>
      </div>
      <div className="w-1/4">
        <div className="w-full text-center">
          <button
            id={`path-${String(index)}`}
            onClick={event => {
              handleFindLoc(el.mapx, el.mapy)
              handlePathChoiceModal(event)
            }}
            className="border-2 font-extrabold p-2 rounded-2xl border-gray-300 bg-blue-300 text-[#FFF] cursor-pointer"
          >
            위치 조회
          </button>
          {pathChoice === `path-${String(index)}` && (
            <PathChoiceContainer el={el} />
          )}
        </div>
      </div>
    </section>
  )
}
