import {
  BACKEND_KASSANDRA,
  COINGECKO_API,
  URL_KASSANDRA_API
} from '@/constants/tokenAddresses'
import { NextApiRequest, NextApiResponse } from 'next'

const OK = 200

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    if (request.method !== 'GET') {
      return response
        .setHeader('Allow', ['GET'])
        .status(405)
        .json({ message: `Method ${request.method} Not Allowed` })
    }

    const [subgraphHealth, backendHealth, coingeckoHealth] = await Promise.all([
      fetch(`${URL_KASSANDRA_API}/subgraph/status`),
      fetch(`${BACKEND_KASSANDRA}/health`),
      fetch(
        `${COINGECKO_API}ping?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_COINGECKO}`
      )
    ])

    if (
      backendHealth.status !== OK ||
      subgraphHealth.status !== OK ||
      coingeckoHealth.status !== OK
    ) {
      return response
        .status(503)
        .json({ message: 'Services are not available' })
    }

    return response.status(200).json({ message: 'OK' })
  } catch (error) {
    return response.status(503).json({ message: 'Services are not available' })
  }
}
