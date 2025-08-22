import LogCard from '../common/card/LogCard'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

import { cookies } from 'next/headers'

async function getPlanLog(uid?: string) {
  if (!uid) return []
  const q = query(collection(db, 'plan'), where('uid', '==', uid))
  const snap = await getDocs(q)
  console.log('snap size', snap.size)
  snap.docs.forEach(d => console.log(d.id, '=>', d.data()))
  return snap.docs.map(d => ({ ...d.data() }))
}

export default async function LogMain() {
  const raw = cookies().get('user')?.value
  const user = raw ? JSON.parse(decodeURIComponent(raw)) : null
  console.log('확인해보자고', user)

  // if (!user?.uid) {
  //   return <div>로그인이 필요합니다.</div>
  // }

  const items = await getPlanLog(user?.uid)
  console.log('아이템', items)

  return (
    <div className="w-full h-full">
      <div className="m-auto  w-[70rem] h-auto">
        <div className="my-16 min-h-[60em]">
          {/* <LogCard /> */}
          {items.length > 0 &&
            items.map(doc => <LogCard key={doc.id} doc={doc.plan} />)}
        </div>
      </div>
    </div>
  )
}
