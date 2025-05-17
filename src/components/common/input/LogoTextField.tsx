import Logo from '../logo/Logo'
import SearchButtonV1 from '../button/SearchButtonV1'

export default function LogoTextField() {
  return (
    <div className="flex w-full h-full  border-2 border-blue-400 rounded-2xl justify-between bg-[#fff]">
      <Logo />
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="outline-0 w-5/7 text-2xl font-bold"
      />
      <div className="w-[6rem] h-full">
        <SearchButtonV1 />
      </div>
    </div>
  )
}
