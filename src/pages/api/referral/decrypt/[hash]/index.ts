import { NextApiRequest, NextApiResponse } from 'next'
import { handleDecrypt } from '@/utils/hashOperation'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request
  const { hash } = request.query

  const _hash = Array.isArray(hash) ? hash[0] : hash
  const privateHash = process.env.REFERRAL_COMMISSION_PRIVATE_HASH

  try {
    if (method === 'GET') {
      const decodeHash = decodeURIComponent(_hash).toString()
      const address = handleDecrypt(decodeHash, privateHash ?? '')
      return response.status(200).json({
        address
      })
    }

    response.setHeader('Allow', ['GET', 'POST', 'PUT'])
    return response.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export default handler
