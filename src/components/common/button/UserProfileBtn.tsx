import Image from 'next/image'

export default function UserProfileBtn(props: {
  onClick: () => void
  btnPosition: string
  photoURL: string
}) {
  const { onClick, btnPosition, photoURL } = props

  return (
    <button
      onClick={onClick}
      className={`w-[3.3em]  h-[3.35em] rounded-[10rem] bg-sky-200 border-sky-500 border-[2px] cursor-pointer ${btnPosition} `}
    >
      <Image
        src={photoURL}
        alt="마이맵 마이플랜 유저 프로필 로그인"
        width={100}
        height={100}
        style={{
          borderRadius: '50px',
        }}
      />
    </button>
  )
}
