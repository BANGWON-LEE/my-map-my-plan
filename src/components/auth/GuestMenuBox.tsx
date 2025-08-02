'use client'

import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import GoogleBtn from '../common/button/GoogleBtn'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { UserInfoType } from '@/type/user'
import { userInfoAtom } from '@/recoil/atoms'
import { useRecoilState } from 'recoil'
// import { getMyLocation } from '@/actions/map-action/mapFunctions'

export default function GuestMenuBox(props: { handleUserModal: () => void }) {
  const { handleUserModal } = props

  async function checkUserInfo(userId: string): Promise<boolean> {
    const userRef = doc(db, 'users', userId)
    const userCheck = await getDoc(userRef)

    return userCheck.exists() // 유저가 가입한 유저인지 확인
  }

  async function saveUserInfo(data: UserInfoType) {
    await setDoc(doc(db, 'users', data.uid), {
      name: data.displayName,
      email: data.email,
      photo: data.photoURL,
      createdAt: new Date().toDateString(),
      lastLoginAt: new Date().toISOString(),
    })
  }

  async function accessService(userId: string) {
    await setDoc(
      doc(db, 'users', userId),
      {
        lastLoginAt: new Date().toISOString(),
      },
      { merge: true }
    )
  }

  // const [, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom)

  function setUserInfo(user: UserInfoType) {
    const userInfo = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }
    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  function actionUserUpdate(userInfoStatus: boolean, userData: UserInfoType) {
    if (userInfoStatus) {
      // 이미 가입한 이력이 있을 경우
      accessService(userData.uid)
      setUserInfo(userData)
    } else if (!userInfoStatus) {
      // 가입한 경우
      saveUserInfo(userData)
      setUserInfo(userData)
    }
  }

  const [, setUserGlobalInfo] = useRecoilState<UserInfoType>(userInfoAtom)

  function getUserInfo() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    setUserGlobalInfo(user)
  }

  async function loginGoogle() {
    const provider = new GoogleAuthProvider()

    const userData = await signInWithPopup(auth, provider)

    const userInfoStatus = await checkUserInfo(userData.user.uid)

    actionUserUpdate(userInfoStatus, userData.user)
    getUserInfo()
    handleUserModal()
  }

  return (
    <div className=" w-auto h-[7rem] grid bg-slate-100 rounded-lg border-2 border-slate-300 py-2 ">
      <p className="text-center font-bold">간편 로그인</p>
      <div className="grid items-center justify-center  mx-7 ">
        <button onClick={() => loginGoogle()}>
          <GoogleBtn />
        </button>
      </div>
    </div>
  )
}
