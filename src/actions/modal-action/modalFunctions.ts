import { getSearchLocImage } from '../api/api'

export async function getLocImg(text: string) {
  const img = await getSearchLocImage(text)
  return img.items
}
