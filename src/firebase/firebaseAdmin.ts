import 'server-only' // 우발적 클라이언트 임포트 방지(선택)
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const app = getApps().length
  ? getApps()[0]!
  : initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
          /\\n/g,
          '\n'
        ),
      }),
    })

export const adminDB = getFirestore(app)
