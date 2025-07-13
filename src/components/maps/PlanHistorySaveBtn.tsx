'use client'

import BlueRoundedBtnV1 from '../common/button/BlueRoundedBtnV1'

export default function PlaceHistorySaveBtn() {
  return (
    <BlueRoundedBtnV1
      onClick={() => console.log('기록 저장')}
      text={'저장'}
      btnPosition={'absolute bottom-16 right-6 z-10'}
    />
  )
}
