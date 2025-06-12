export function checkEmptyString(text: string) {
  const textStatus = text === '' || text === null || text === undefined
  if (textStatus) return alert('검색어를 입력해주세요')
}

export const formatMyLocation = (value: number): number => value / 1e7
export const formatTmapPath = (value: number): number => value * 0.00001

export function formatAddressTitle(title: string, charsToRemove: string) {
  const removePattern = new RegExp(`[${charsToRemove}]`, 'g')
  return title.replace(removePattern, '')
}
