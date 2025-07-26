import GuestProfileBtn from '../common/button/GuestProfileBtn'
import GuestMenuBox from './GuestMenuBox'
import { useEffect, useState } from 'react'
import UserProfileBtn from '../common/button/UserProfileBtn'
import UserMenuBox from './UserMenuBox'
import { useRecoilState } from 'recoil'
import { userInfoAtom } from '@/recoil/atoms'
import { UserInfoType } from '@/type/user'

export default function Profile() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)

  function handleUserModal() {
    setIsProfileOpen(!isProfileOpen)
  }

  const [userGlobalInfo, setUserGlobalInfo] =
    useRecoilState<UserInfoType>(userInfoAtom)

  // const userInfo = useRecoilValue<UserInfoType>(userInfoAtom)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (user) {
      setUserGlobalInfo(user)
    }
  }, [])

  return (
    <div className="z-10  absolute top-2 left-6 ">
      {userGlobalInfo.photoURL === '' ? (
        <GuestProfileBtn
          onClick={() => handleUserModal()}
          btnPosition={''}
          // btnPosition={'z-10 absolute top-2  left-40 w-[4rem] h-[4rem]'}
        />
      ) : (
        <UserProfileBtn
          onClick={() => handleUserModal()}
          btnPosition={''}
          photoURL={userGlobalInfo.photoURL || ''}
        />
      )}
      {isProfileOpen && userGlobalInfo.uid === '' && <GuestMenuBox />}
      {isProfileOpen && userGlobalInfo.uid && <UserMenuBox />}
    </div>
  )
}
