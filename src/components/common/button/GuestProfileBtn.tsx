import Image from 'next/image'
import ProfileImg from '../../../assets/profile.png'

export default function GuestProfileBtn(props: {
  onClick: () => void
  btnPosition: string
}) {
  const { onClick, btnPosition } = props

  return (
    <button
      onClick={onClick}
      className={`w-[3.1em]  h-[3.3em] rounded-[10rem] bg-sky-200 border-sky-500 border-[2px] cursor-pointer ${btnPosition} `}
    >
      <Image src={ProfileImg} alt="마이맵 마이플랜 게스트 프로필" />
    </button>
  )
}
