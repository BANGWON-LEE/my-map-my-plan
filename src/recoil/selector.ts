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
    // const goalName = get(goalLocNameAtom)
    // const goalPath = get(goalLocPathAtom)

    const start = {
      start: {
        name: '출발 : ' + startName,
        path: startPath,
      },
    }

    return start
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      const value = newValue as {
        start: { name: string; path: { x: number; y: number } }
        // goal: { name: string; path: { x: string; y: string } }
      }
      set(startLocNameAtom, value.start.name)
      set(startLocPathAtom, value.start.path)
      //   set(goalLocNameAtom, value.goal.name)
      //   set(goalLocPathAtom, value.goal.path)
    }
  },
})

export const routeGoalSelector = selector({
  key: 'routeGoalSelector',
  get: ({ get }) => {
    // const startName = get(startLocNameAtom)
    // const startPath = get(startLocPathAtom)
    const goalName = get(goalLocNameAtom)
    const goalPath = get(goalLocPathAtom)

    return {
      //   start: {
      //     name: startName,
      //     path: startPath,
      //   },
      goal: {
        name: '도착 : ' + goalName,
        path: goalPath,
      },
    }
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      const value = newValue as {
        // start: { name: string; path: { x: string; y: string } }
        goal: { name: string; path: { x: number; y: number } }
      }
      //   set(startLocNameAtom, value.start.name)
      //   set(startLocPathAtom, value.start.path)
      set(goalLocNameAtom, value.goal.name)
      set(goalLocPathAtom, value.goal.path)
    }
  },
})
