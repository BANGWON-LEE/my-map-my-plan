export function tMapFormatSpreadPath(path: number[]) {
  const resultArr: number[] = []

  path.forEach(el => {
    if (Array.isArray(el) && Array.isArray(el[0])) {
      resultArr.push(...el)
    } else if (!Array.isArray(el)) {
      resultArr.push(el)
    }
  })

  return resultArr
}
