import { locAtomType } from './route'

export type placeListType = {
  place: locAtomType
  remove: (index: number, placeName: string) => void
  index: number
}
