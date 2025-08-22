import { infoType, placeDistanceType } from './route'

export interface LogDocType {
  date: string
  distance: placeDistanceType[]
  place: infoType[]
}
