import { NextApiRequest, NextApiResponse } from 'next'
import { SUBGRAPH_GRAPHQL_URL, subgraphNames } from '@/constants/tokenAddresses'

async function getSubgraphsData() {
  let query = ''
  for (const [key, value] of Object.entries(subgraphNames)) {
    query += `
      ${key}: indexingStatusesForSubgraphName(subgraphName: "${value}") {
        fatalError {
          message
        }
        chains {
          latestBlock {
            number
          }
          chainHeadBlock {
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
    for (const [key, _] of Object.entries(subgraphNames)) {
      const subgraphData = subgraphsData[key][0]
      const chainData = subgraphData.chains[0]

      if (subgraphData.fatalError) {
        return response.status(500).json({
          message: `${key} subgraph is giving fatal error`,
          data: {}
        })
      }

      Object.assign(data, {
        [key]: {
          subgraphBlock: chainData.latestBlock.number,
          currentBlock: chainData.chainHeadBlock.number,
          diff: chainData.chainHeadBlock.number - chainData.latestBlock.number
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
