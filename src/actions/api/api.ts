'use server'
import axios from 'axios'

export async function getSearchLoc(text: string = '광화문') {
  // axios.get(`https://openapi.naver.com/v1/search/local?query=${word}`)
  const result = await axios.get(
    `https://openapi.naver.com/v1/search/local?query=${text}&display=30`,
    {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
      },
    }
  )

  return result.data
}

export async function getSearchLocImage(text: string = '광화문') {
  const result = await axios.get(
    `https://openapi.naver.com/v1/search/image?query=${text}&display=5`,
    {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
      },
    }
  )

  return result.data
}

export async function getPathDriving(start: string, goal: string) {
  // console.log('qqqq', start, goal)

  const result = await axios.get(
    `https://ncp-render-proxy.onrender.com/driving?start=${start}&goal=${goal}`
  )

  console.log('결과', result.data)

  return result.data
}
