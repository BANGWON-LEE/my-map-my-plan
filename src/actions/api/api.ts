'use server'
// import { signalRouteState } from '@/recoil/atoms'
import { tmapObjType, tmapResponseWalk } from '@/type/route'
import axios from 'axios'
// import { useRecoilState } from 'recoil'

export async function getSearchLoc(text: string = '광화문') {
  // axios.get(`https://openapi.naver.com/v1/search/local?query=${word}`)
  const result = await axios.get(
    `https://openapi.naver.com/v1/search/local?query=${text}&display=10`,
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

export async function getPathDriving(
  start: string,
  goal: string
  // handleRouteSignal: () => void
) {
  // console.log('qqqq', start, goal)

  const result = await axios.get(
    `https://ncp-render-proxy.onrender.com/driving?start=${start}&goal=${goal}`
  )

  return result.data
}
// export async function getPathWalking(start: string, goal: string) {
//   console.log('걷기 중', start, goal)

//   const result = await axios.get(
//     `https://ncp-render-proxy.onrender.com/walking?start=${start}&goal=${goal}`
//   )

//   console.log('결과 걷기', result)

//   return result.data
// }

export async function getPathWalking(requestData: tmapObjType) {
  const headers = { appkey: 'EGxTk6ZG5L6VmtY26wGOf5uyXhSewdgS6rJIXvV1' }

  const result = await axios.post(
    'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
    requestData,
    { headers: headers }
  )
  console.log('resultDD', result.data.features[2].properties)

  const walkPath = result.data.features
    .filter((item: tmapResponseWalk) => item.geometry.type === 'Point')
    .map((result: tmapResponseWalk) => result.geometry.coordinates)

  return { path: walkPath, summary: result.data.features[0].properties }
}
