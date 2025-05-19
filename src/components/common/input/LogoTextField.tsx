'use client'

import Logo from '../logo/Logo'
import SearchButtonV1 from '../button/SearchButtonV1'
// import { useState } from 'react'
import { onClickProps } from '@/type/commonButton'
import { useState } from 'react'

export default function LogoTextField(props: onClickProps) {
  const { onClick } = props

  const [text, setText] = useState<string>('')

  function writeText(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value)
  }

  return (
    <div className="flex w-full h-full  border-2 border-blue-400 rounded-2xl justify-between bg-[#fff]">
      <Logo />
      <input
        type="text"
        value={text}
        onChange={event => writeText(event)}
        placeholder="검색어를 입력하세요"
        className="outline-0 w-5/7 text-2xl font-bold"
      />
      <div className="w-[6rem] h-full">
        <SearchButtonV1 onClick={() => onClick(text)} />
      </div>
    </div>
  )
}
