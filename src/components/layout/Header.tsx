import LogoTextField from '../common/input/LogoTextField'

export default function Header() {
  return (
    <header className="absolute top-0 w-full h-[7rem] z-10 bg-transparent ">
      <div className="flex items-center m-auto w-3/4 h-full justify-evenly">
        <div className="w-3/5 h-full mt-4 ">
          <LogoTextField />
        </div>
      </div>
    </header>
  )
}
