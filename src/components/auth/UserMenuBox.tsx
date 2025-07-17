'use client'

import { getMyLocation } from '@/actions/map-action/mapFunctions'
import { auth } from '@/firebase/firebase'
import { signOut } from 'firebase/auth'
import React from 'react'

export default function UserMenuBox() {
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}')

  async function logoutUser() {
    await signOut(auth).then(() => {
      localStorage.removeItem('user')
      navigator.geolocation.getCurrentPosition(getMyLocation)
    })
    // console.log('userStatus', userStatus)
    // userStatus.then(() => {
    // })
  }

  return (
    <div className=" w-auto h-[7rem] grid bg-slate-100 rounded-lg border-2 border-slate-300 py-2 ">
      <p className="text-center font-bold">{userInfo.displayName}</p>
      <div className="grid items-center justify-center  mx-7 ">
        <button onClick={() => logoutUser()}>로그아웃</button>
      </div>
    </div>
  )
}
