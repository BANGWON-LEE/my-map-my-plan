import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getPathDriving(
  req: NextApiRequest,
  res: NextApiResponse
  // handleRouteSignal: () => void
) {
  // console.log('qqqq', start, goal)
  const { start, goal } = req.query
  const result = await axios.get(
    `https://ncp-render-proxy.onrender.com/driving?start=${start}&goal=${goal}`
  )

  return res.status(200).json(result.data)
}
