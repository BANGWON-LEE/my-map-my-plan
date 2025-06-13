import { RoutePropsType } from '@/type/commonButton'

export default function RouteBtn(props: RoutePropsType) {
  const { onClick, text, selected, bgColor } = props

  return (
    <button
      onClick={onClick}
      className={`w-2/3 h-full border-2 relative cursor-pointer p-1 rounded-lg ${
        selected && ` text-[#FFF] font-bold ${bgColor}`
      } `}
    >
      {text}
    </button>
  )
}
