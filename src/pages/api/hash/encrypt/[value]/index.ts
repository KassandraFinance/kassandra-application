import { NextApiRequest, NextApiResponse } from 'next'
import { handleEncrypt } from '@/utils/hashOperation'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', ['GET'])
    return response.status(405).end(`Method ${request.method} Not Allowed`)
  }

  const privateSalt = process.env.REFERRAL_COMMISSION_PRIVATE_SALT ?? ''
  const value = request.query.value

  if (typeof value !== 'string') {
    return response.status(400).json({ message: 'value must be a string' })
  }

  try {
    const hash = handleEncrypt(value, privateSalt)

    return response.status(200).json({
      hash
    })
  } catch (error) {
    return response.status(500).json(error)
  }
}

export default handler
