import { NextApiRequest, NextApiResponse } from 'next'
import { SUBGRAPH_GRAPHQL_URL, networks } from '@/constants/tokenAddresses'
import { JsonRpcProvider } from 'ethers'

async function getSubgraphData(subgraphName: string) {
  const response = await fetch(SUBGRAPH_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query($id: String!) {
          indexingStatusesForSubgraphName(subgraphName: $id) {
            fatalError {
              message
            }
            chains {
              latestBlock {
                number
              }
            }
          }
        }
      `,
      variables: {
        id: subgraphName
      }
    })
  })

  const data = await response.json()

  return data.data
}

async function getCurrentBlock(rpcUrl: string) {
  const readProvider = new JsonRpcProvider(rpcUrl)
  const block = await readProvider.getBlockNumber()

  return block
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'GET') {
    return response
      .setHeader('Allow', ['GET'])
      .status(405)
      .json({ message: `Method ${request.method} Not Allowed`, data: {} })
  }

  try {
    const { id } = request.query
    if (!id) {
      return response.status(400).json({
        message: 'chainId not found'
      })
    }

    const chainId = Array.isArray(id) ? Number(id[0]) : Number(id)

    const subgraphName = networks[chainId]?.subgraphName
    if (!subgraphName) {
      return response.status(404).json({
        message: 'Subgraph not exist'
      })
    }

    const subgraphData = await getSubgraphData(subgraphName)

    const fatalError =
      subgraphData.indexingStatusesForSubgraphName[0].fatalError
    const subgraphBlock =
      subgraphData.indexingStatusesForSubgraphName[0].chains[0].latestBlock
        .number

    if (fatalError) {
      return response.status(500).json({
        message: `${subgraphName} is giving fatal error`,
        data: {}
      })
    }
    const currentBlock = await getCurrentBlock(networks[chainId].rpc)
    const blockDiff = currentBlock - subgraphBlock

    const data = {
      subgraphBlock,
      currentBlock,
      blockDiff
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
