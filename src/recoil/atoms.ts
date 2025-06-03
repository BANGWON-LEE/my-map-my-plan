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
