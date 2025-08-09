'use client'

import { getMyLocation } from '@/actions/map-action/mapFunctions'
import { auth } from '@/firebase/firebase'
import { userInfoAtom } from '@/recoil/atoms'
import { UserInfoType } from '@/type/user'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import React from 'react'
import { useRecoilState } from 'recoil'

export default function UserMenuBox(props: { handleUserModal: () => void }) {
  const { handleUserModal } = props

  const userInfo = JSON.parse(localStorage.getItem('user') || '{}')

  const [, setUserGlobalInfo] = useRecoilState<UserInfoType>(userInfoAtom)

  const router = useRouter()

  async function logoutUser() {
    await signOut(auth).then(() => {
      localStorage.removeItem('user')
      navigator.geolocation.getCurrentPosition(getMyLocation)
      setUserGlobalInfo({ uid: '', displayName: '', email: '', photoURL: '' })
      handleUserModal()
      router.push('/')
    })
  }

  const path = usePathname()

  return (
    <div className=" w-auto h-[7rem] grid bg-slate-100 rounded-lg border-2 border-slate-300 py-2 ">
      <p className="text-center font-bold">{userInfo.displayName}</p>
      <div className="grid items-center justify-center  mx-7 ">
        <button onClick={() => logoutUser()}>log out</button>
      </div>
      <div className="grid items-center justify-center  mx-7 ">
        {!path?.includes('/log') && (
          <button>
            <Link href={'/log'}>my log</Link>
          </button>
        )}
        {path !== '/' && (
          <button>
            <Link href={'/'}>map</Link>
          </button>
        )}
      </div>
    </div>
  )
}
