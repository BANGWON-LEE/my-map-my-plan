import { tMapFormatSpreadPath } from '@/actions/route-action/RouteFunctions'
import { tmapResponseWalk } from '@/type/route'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getPathDriving(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = { appkey: process.env.TMAP_APP_KEY }

  const requestData = req.body

  const result = await axios.post(
    'https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result',
    requestData,
    { headers: headers }
  )
  // console.log('resultDD', result.data.features[1].geometry.coordinates)

  const carPath = result.data.features.map(
    (result: tmapResponseWalk) => result.geometry.coordinates
  )

  const resultArr = tMapFormatSpreadPath(carPath)

  console.log('result carPath', resultArr)

  return res
    .status(200)
    .json({ path: resultArr, summary: result.data.features[0].properties })
}
