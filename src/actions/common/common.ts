export function checkEmptyString(text: string) {
  console.log('check T', text)
  const textStatus = text === '' || text === null || text === undefined
  if (textStatus) return alert('검색어를 입력해주세요')
}
