import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export async function getSearchLocImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text = '광화문' } = req.query
  const result = await axios.get(
    `https://openapi.naver.com/v1/search/image?query=${text}&display=5`,
    {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
      },
    }
  )

  return res.status(200).json(result.data)
}

export async function getSearchLoc(req: NextApiRequest, res: NextApiResponse) {
  const { text = '광화문' } = req.query
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

  return res.status(200).json(result.data)
}
