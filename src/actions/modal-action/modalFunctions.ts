// import { getSearchLocImage } from '../../pages/api/searchLoc'

export async function getLocImg(text: string) {
  const res = await fetch(
    `/api/searchLocImage?text=${encodeURIComponent(text)}`
  )
  const address = await res.json()
  // const img = await getSearchLocImage(address)
  return address.items
}
