import { locAtomType } from './route'

export type placeListType = {
  place: locAtomType
  removePlace: (index: number, placeName: string) => void
  index: number
}
