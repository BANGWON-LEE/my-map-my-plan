import Image from 'next/image'
import LogoPng from '../../../assets/logo.png'

export default function Logo() {
  return (
    <div className="w-[9rem] h-full relative">
      <Image fill alt="마이맵 마이플랜 로고" src={LogoPng} />
    </div>
  )
}
