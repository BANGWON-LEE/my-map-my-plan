import { atom } from 'recoil'

export const startLocNameAtom = atom<string>({
  key: 'recoil/atom/startLocNameAtom',
  default: '',
})

export const startLocPathAtom = atom<{ x: number; y: number }>({
  key: 'recoil/atom/startLocPathAtom',
  default: {
    x: 0,
    y: 0,
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

export const goalLocNameAtom = atom<string>({
  key: 'recoil/atom/goalLocNameAtom',
  default: '',
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
