'use client'

// import { routeStartSelector } from '@/recoil/selector'
import LogoTextField from './LogoTextField'
// import StartAndGoalTextField from './StartAndGoalTextField'
// import { useRecoilValue } from 'recoil'
import { onClickPropsKeyBoadEventType } from '@/type/commonButton'
import StartAndGoalTextField from './StartAndGoalTextField'
import { useRecoilValue } from 'recoil'
import { routeStartSelector } from '@/recoil/selector'

export default function HeaderInputField(props: onClickPropsKeyBoadEventType) {
  const { onClick, onKeyDown } = props

  const startInfoState = useRecoilValue(routeStartSelector)

  console.log('start na', startInfoState.start.path.x === 0)

  return (
    <>
      <LogoTextField onClick={onClick} onKeyDown={onKeyDown} />

      {startInfoState.start.path.x !== 0 && <StartAndGoalTextField />}
    </>
  )
}
