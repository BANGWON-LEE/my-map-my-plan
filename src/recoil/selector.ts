import { selector } from 'recoil'
import {
  goalLocNameAtom,
  goalLocPathAtom,
  startLocNameAtom,
  startLocPathAtom,
} from './atoms'

export const routeStartSelector = selector({
  key: 'routeStartSelector',
  get: ({ get }) => {
    const startName = get(startLocNameAtom)
    const startPath = get(startLocPathAtom)

    const start = {
      start: {
        name: startName,
        path: startPath,
      },
    }

    return start
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      const value = newValue as {
        start: { name: string; path: { x: number; y: number } }
      }
      set(startLocNameAtom, value.start.name)
      set(startLocPathAtom, value.start.path)
    }
  },
})

export const routeGoalSelector = selector({
  key: 'routeGoalSelector',
  get: ({ get }) => {
    const goalName = get(goalLocNameAtom)
    const goalPath = get(goalLocPathAtom)

    return {
      goal: {
        name: goalName,
        path: goalPath,
      },
    }
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      const value = newValue as {
        goal: { name: string; path: { x: number; y: number } }
      }
      set(goalLocNameAtom, value.goal.name)
      set(goalLocPathAtom, value.goal.path)
    }
  },
})
