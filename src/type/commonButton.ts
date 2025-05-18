import { MouseEvent } from 'react'

export interface onClickEventProps {
  onClick: (event: MouseEvent<Element>) => void
}

export interface onClickProps {
  onClick: (text: string) => void
}

export interface BlueRoundedBtnV1Type {
  onClick: () => void
  text: string
  btnPosition: string
}
