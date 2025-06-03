'use client'

import { onClickPropsKeyBoadEventType } from '@/type/commonButton'
// import LogoTextField from '../common/input/LogoTextField'
import HeaderInputField from '../common/input/HeaderInputFiled'

export default function Header(props: onClickPropsKeyBoadEventType) {
  const { onClick, onKeyDown } = props

  const getPlaceList = onClick

  return (
    <header className="absolute top-0 w-full h-[7rem] z-10 bg-transparent ">
      <div className="flex items-center m-auto w-3/4 h-full justify-evenly">
        <div className="w-3/5 h-full mt-4 ">
          <HeaderInputField onClick={getPlaceList} onKeyDown={onKeyDown} />
        </div>
      </div>
    </header>
  )
}
