import { initialPlaceObj } from '@/data/constants'
import { SearchPlaceType } from '@/type/marker'
import { locAtomType, placeDistanceType } from '@/type/route'
import { UserInfoType } from '@/type/user'
import { atom } from 'recoil'

export const startLocAtom = atom<locAtomType>({
  key: 'recoil/atom/startLocNameAtom',
  default: initialPlaceObj,
})

export const startLocSummaryAtom = atom<{
  distance: number
  duration: number
  method: string
}>({
  key: 'recoil/atom/startLocSummary',
  default: {
    distance: 0,
    duration: 0,
    method: '',
  },
})

export const goalLocAtom = atom<locAtomType>({
  key: 'recoil/atom/goalLocNameAtom',
  default: initialPlaceObj,
})

export const goalLocPathAtom = atom<{ x: number; y: number }>({
  key: 'recoil/atom/goalLocPathAtom',
  default: {
    x: 0,
    y: 0,
  },
})

export const goalLocSummaryAtom = atom<{ distance: number; duration: number }>({
  key: 'recoil/atom/goalLocSummaryAtom',
  default: {
    distance: 0,
    duration: 0,
  },
})

export const signalRouteStateAtom = atom<boolean>({
  key: 'recoil/atom/signalRouteState',
  default: false,
})

export const signalCateGoryStateAtom = atom<string>({
  key: 'recoil/atom/signalCateGoryState',
  default: '',
})

export const searchPlaceStateAtom = atom<SearchPlaceType[]>({
  key: 'recoil/atom/searchPlaceStateAtom',
  default: [],
})

export const openPlaceListModalAtom = atom<boolean>({
  key: 'recoil/atom/openPlaceListModalAtom',
  default: false,
})

export const setPlanHistoryListAtom = atom<locAtomType[]>({
  key: 'recoil/atom/setPlanHistoryListAtom',
  default: [],
})

export const placeDistanceAtom = atom<placeDistanceType>({
  key: 'recoil/atom/placeDistanceAtom',
  default: {
    start: '',
    goal: '',
    distance: 0,
    hour: 0,
    minutes: 0,
    method: '',
  },
})

export const routeMethodAtom = atom<string>({
  key: 'recoil/atom/routeMethodAtom',
  default: '',
})

export const userInfoAtom = atom<UserInfoType>({
  key: 'recoil/atom/routeMethodAtom',
  default: {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
  },
})
