import Image from 'next/image'
import LogoPng from '../../../assets/logo.png'

export default function Logo() {
  return (
    <div className="w-[9rem] h-full relative">
      <Image fill alt="MyMap 로고" src={LogoPng} />
    </div>
  )
}
