import { getPlanLog } from '@/pages/api/logs/log'
import LogCard from '../common/card/LogCard'

import { cookies } from 'next/headers'

// async function getPlanLog(uid?: string) {
//   if (!uid) return []
//   const q = query(collection(db, 'plan'), where('uid', '==', uid))
//   const snap = await getDocs(q)
//   return snap.docs.map(d => ({ ...d.data() }))
// }

export default async function LogMain() {
  const raw = cookies().get('user')?.value
  const user = raw ? JSON.parse(decodeURIComponent(raw)) : null

  const items = await getPlanLog(user?.uid)

  return (
    <div className="w-full h-full">
      <div className="m-auto  w-[70rem] h-auto">
        <div className="my-16 min-h-[60em]">
          {items.length > 0 &&
            items.map(doc => <LogCard key={doc.id} doc={doc.plan} />)}
        </div>
      </div>
    </div>
  )
}
