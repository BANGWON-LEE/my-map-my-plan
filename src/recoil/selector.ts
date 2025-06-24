import { selector } from 'recoil'
import {
  goalLocAtom,
  // goalLocPathAtom,
  startLocAtom,
  // startLocPathAtom,
} from './atoms'

export const routeStartSelector = selector({
  key: 'routeStartSelector',
  get: ({ get }) => {
    const startLoc = get(startLocAtom)

    const start = {
      start: {
        name: startLoc.name,
        path: startLoc.path,
        address: startLoc.address,
        roadAddress: startLoc.roadAddress,
        category: startLoc.category,
      },
    }

    return start
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      const value = newValue as {
        start: {
          name: string
          path: { x: number; y: number }
          address: string
          roadAddress: string
          category: string
        }
      }
      set(startLocAtom, value.start)
      // set(startLocPathAtom, value.start.path)
    }
  },
})

export const routeGoalSelector = selector({
  key: 'routeGoalSelector',
  get: ({ get }) => {
    const goalLoc = get(goalLocAtom)
    // const goalPath = get(goalLocPathAtom)

    return {
      goal: {
        name: goalLoc.name,
        path: goalLoc.path,
        address: goalLoc.address,
        roadAddress: goalLoc.roadAddress,
        category: goalLoc.category,
      },
    }
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      const value = newValue as {
        goal: {
          name: string
          path: { x: number; y: number }
          address: string
          roadAddress: string
          category: string
        }
      }
      set(goalLocAtom, value.goal)
    }
  },
})
