import { NextApiRequest, NextApiResponse } from 'next'
import { handleEncrypt } from '@/utils/hashOperation'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request
  const { value } = request.query

  const _value = Array.isArray(value) ? value[0] : value
  const privateSalt = process.env.REFERRAL_COMMISSION_PRIVATE_SALT ?? ''

  try {
    if (method === 'GET') {
      const hash = handleEncrypt(_value, privateSalt)

      return response.status(200).json({
        hash
      })
    }

    response.setHeader('Allow', ['GET'])
    return response.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export default handler
