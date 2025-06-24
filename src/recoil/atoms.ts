import { locAtomType } from '@/type/route'
import { atom } from 'recoil'

export const startLocAtom = atom<locAtomType>({
  key: 'recoil/atom/startLocNameAtom',
  default: {
    name: '',
    path: {
      x: 0,
      y: 0,
    },
    address: '',
    roadAddress: '',
    category: '',
  },
})

export const startLocSummaryAtom = atom<{ distance: number; duration: number }>(
  {
    key: 'recoil/atom/startLocSummary',
    default: {
      distance: 0,
      duration: 0,
    },
  }
)

export const goalLocAtom = atom<locAtomType>({
  key: 'recoil/atom/goalLocNameAtom',
  default: {
    name: '',
    path: {
      x: 0,
      y: 0,
    },
    address: '',
    roadAddress: '',
    category: '',
  },
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
