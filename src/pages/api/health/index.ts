import {
  BACKEND_KASSANDRA,
  COINGECKO_API,
  URL_APP_KASSANDRA
} from '@/constants/tokenAddresses'
import { NextApiRequest, NextApiResponse } from 'next'

const OK = 200

class ServiceUnavailableError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage)
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    if (request.method !== 'GET') {
      return response
        .setHeader('Allow', ['GET'])
        .status(405)
        .json({ message: `Method ${request.method} Not Allowed` })
    }

    const errors: string[] = []

    await Promise.allSettled([
      fetch(`${URL_APP_KASSANDRA}/api/subgraph/status`).then(res => {
        if (res.status !== OK) errors.push('Subgraph is offline')
      }),
      fetch(`${BACKEND_KASSANDRA}/health`).then(res => {
        if (res.status !== OK) errors.push('Backend is offline')
      }),
      fetch(
        `${COINGECKO_API}ping?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_COINGECKO}`
      ).then(res => {
        if (res.status !== OK) errors.push('Coingecko is offline')
      })
    ])

    if (errors.length > 0) {
      throw new ServiceUnavailableError(errors.join(', '))
    }

    return response.status(200).json({ message: 'OK' })
  } catch (err) {
    const message =
      err instanceof ServiceUnavailableError
        ? err.message
        : 'Services are not available'
    return response.status(503).json({ message })
  }
}
