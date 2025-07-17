import { User } from 'firebase/auth'

export type UserInfoType = Pick<
  User,
  'uid' | 'displayName' | 'email' | 'photoURL'
>
