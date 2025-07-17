import GuestProfileBtn from '../common/button/GuestProfileBtn'
import GuestMenuBox from './GuestMenuBox'
import { useState } from 'react'
import UserProfileBtn from '../common/button/UserProfileBtn'
import UserMenuBox from './UserMenuBox'
import { useRecoilValue } from 'recoil'
import { userInfoAtom } from '@/recoil/atoms'
import { UserInfoType } from '@/type/user'

export default function Profile() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)

  function handleUserModal() {
    setIsProfileOpen(!isProfileOpen)
  }

  const userGlobalInfo = useRecoilValue<UserInfoType>(userInfoAtom)

  // const userInfo = useRecoilValue<UserInfoType>(userInfoAtom)

  // console.log('userInfo', userInfo)

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
