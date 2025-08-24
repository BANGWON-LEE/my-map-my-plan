import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

export async function getPlanLog(uid?: string) {
  if (!uid) return []
  const q = query(collection(db, 'plan'), where('uid', '==', uid))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ ...d.data() }))
}
