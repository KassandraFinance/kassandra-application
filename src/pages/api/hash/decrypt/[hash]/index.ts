import { NextApiRequest, NextApiResponse } from 'next'
import { handleDecrypt } from '@/utils/hashOperation'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', ['GET'])
    return response.status(405).end(`Method ${request.method} Not Allowed`)
  }

  const privateSalt = process.env.REFERRAL_COMMISSION_PRIVATE_SALT ?? ''
  const hash = request.query.hash

  if (typeof hash !== 'string') {
    return response.status(400).json({ message: 'hash must be a string' })
  }

  try {
    const decodeHash = decodeURIComponent(hash)
    const value = handleDecrypt(decodeHash, privateSalt)

    return response.status(200).json({
      value
    })
  } catch (error) {
    return response.status(500).json(error)
  }
}

export default handler
