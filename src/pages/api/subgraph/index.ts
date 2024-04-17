import { NextApiRequest, NextApiResponse } from 'next'
import {
  SUBGRAPH_GRAPHQL_URL,
  networks,
  subgraphNames
} from '@/constants/tokenAddresses'
import { JsonRpcProvider } from 'ethers'
import { getDateDiff } from '@/utils/date'

async function getSubgraphsData() {
  let query = ''
  for (const [key, value] of Object.entries(subgraphNames)) {
    query += `
      ${key}: indexingStatusesForSubgraphName(subgraphName: "${value.name}") {
        fatalError {
          message
        }
        chains {
          latestBlock {
            number
          }
        }
      }
    `
  }

  const requestBody = {
    query: `{ ${query} }`
  }

  const response = await fetch(SUBGRAPH_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  const data = await response.json()

  return data.data
}

export async function getSubgraphDateDiff(
  rpcUrl: string,
  subgraphBlock: number
) {
  const readProvider = new JsonRpcProvider(rpcUrl)
  const currentBlock = await readProvider.getBlockNumber()

  const subgraphTimestamp = await readProvider.getBlock(
    BigInt(subgraphBlock ?? 0)
  )
  const currentTimestamp = await readProvider.getBlock(
    BigInt(currentBlock ?? 0)
  )

  if (!(currentTimestamp?.timestamp && subgraphTimestamp?.timestamp)) {
    return {
      currentBlock,
      dateDiff: null
    }
  }

  const dateDiff = getDateDiff(
    subgraphTimestamp.timestamp * 1000,
    currentTimestamp.timestamp * 1000
  )

  return {
    currentBlock,
    dateDiff: dateDiff?.value.toString().concat(' ', dateDiff?.string) ?? '0'
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'GET') {
    return response
      .setHeader('Allow', ['GET'])
      .status(405)
      .json({ message: `Method ${request.method} Not Allowed`, data: {} })
  }

  try {
    const subgraphsData = await getSubgraphsData()

    const data = {}
    for (const [key, value] of Object.entries(subgraphNames)) {
      const subgraphData = subgraphsData[key][0]
      const subgraphBlock = subgraphData.chains[0]?.latestBlock?.number

      const { currentBlock, dateDiff } = await getSubgraphDateDiff(
        networks[value.chainId].rpc,
        subgraphBlock
      )

      if (subgraphData.fatalError) {
        return response.status(500).json({
          message: `${key} subgraph is giving fatal error`,
          data: {}
        })
      }

      Object.assign(data, {
        [key]: {
          subgraphBlock,
          currentBlock: currentBlock,
          blockDiff: currentBlock - subgraphBlock,
          dateDiff
        }
      })
    }

    response.status(200).json(data)
  } catch (error) {
    console.error(error)
    response.status(500).json({
      message: 'Request to subgraph failed',
      data: {}
    })
  }
}
