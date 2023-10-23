import { NextApiRequest, NextApiResponse } from 'next'
import { handleEncrypt } from '@/utils/hashOperation'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request
  const { address } = request.query

  const walletAddress = Array.isArray(address) ? address[0] : address
  const privateHash = process.env.REFERRAL_COMMISSION_PRIVATE_HASH

  try {
    if (method === 'GET') {
      const hash = handleEncrypt(walletAddress, privateHash ?? '')
      return response.status(200).json({
        hash
      })
    }

    response.setHeader('Allow', ['GET', 'POST', 'PUT'])
    return response.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export default handler
