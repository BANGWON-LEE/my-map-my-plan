import { KeyboardEvent, MouseEvent } from 'react'

export interface onKeyboardPropsType {
  onKeyDown: (event: KeyboardEvent, text: string) => void
}
export interface onKeyboardEventPropsType {
  onKeyDown: (event: KeyboardEvent, text: string) => void
}

export interface searchTextType {
  text: string
}

export interface onClickPropsKeyBoadEventType extends onKeyboardEventPropsType {
  onClick: (text: string) => void
}

export interface onClickEventPropsWithTextType
  extends onKeyboardEventPropsType,
    searchTextType {
  onClick: (event: MouseEvent<Element>) => void
}

export interface onClickPropsType
  extends onKeyboardEventPropsType,
    searchTextType {
  onClick: (text: string) => void
}

export interface BlueRoundedBtnV1Type {
  onClick: () => void
  text: string
  btnPosition: string
}
