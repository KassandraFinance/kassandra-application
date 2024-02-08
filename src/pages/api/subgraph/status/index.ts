import { NextApiRequest, NextApiResponse } from 'next'
import { JsonRpcProvider } from 'ethers'

import { URL_KASSANDRA_API, networks } from '@/constants/tokenAddresses'

type subgraphData = {
  subgraphBlock: string
  currentBlock: string
  diff: number
}

type SubgraphsData = Record<string, subgraphData>

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'GET') {
    return response
      .setHeader('Allow', ['GET'])
      .status(405)
      .json({ message: `Method ${request.method} Not Allowed` })
  }

  try {
    const subgraphResponse: SubgraphsData = await fetch(
      `${URL_KASSANDRA_API}/subgraph`
    ).then(res => res.json())

    const blocksInTenMinutes = 300
    for (const [key, value] of Object.entries(subgraphResponse)) {
      if (key === 'arbitrum') {
        const arbitrumChainId = 42161
        const provider = new JsonRpcProvider(networks[arbitrumChainId].rpc)

        const subgraphTimestamp = await provider.getBlock(
          BigInt(value.subgraphBlock)
        )
        const currentTimestamp = await provider.getBlock(
          BigInt(value.currentBlock)
        )

        if (!(currentTimestamp?.timestamp && subgraphTimestamp?.timestamp)) {
          return response.status(500).json({
            message: `error when fetching timestamp of blocks in the ${key} subgraph`
          })
        }

        //The return of getBlock from ethers is with timestamps in seconds.
        const timestampDiffInSeconds = Math.abs(
          currentTimestamp.timestamp - subgraphTimestamp.timestamp
        )
        const diffInMinutes = Math.floor(timestampDiffInSeconds / 60)

        if (diffInMinutes > 10) {
          return response
            .status(503)
            .json({ message: `the subgraph of ${key} is outdated` })
        }
      }
      if (value.diff >= blocksInTenMinutes) {
        return response
          .status(503)
          .json({ message: `the subgraph of ${key} is outdated` })
      }
    }

    response.status(200).json({ message: 'Ok' })
  } catch (error) {
    console.error(error)
    response.status(500).json({
      message: 'Request to subgraph failed'
    })
  }
}
