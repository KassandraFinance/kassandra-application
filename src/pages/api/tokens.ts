import { NextApiRequest, NextApiResponse } from 'next'
import { COINGECKO_API, SUBGRAPH_URL } from '@/constants/tokenAddresses'

type CoinsMetadataType = Record<
  string,
  {
    heimdallId: string
    name: string
    symbol: string
    logo: string
    usd: string
    marketCap: number
    volume: number
    pricePercentageChangeIn24h: number
    pricePercentageChangeIn7d: number
    sparklineFrom7d: number[]
    decimals: number
  }
>

type CoinsMetadataResponse = {
  message: string
  tokens: CoinsMetadataType
}

async function getTokens(params: { tokensId?: string[]; chainId?: number[] }) {
  const tokensId = params?.tokensId ? 'id_in: $ids,' : ''

  const subgraphResponse = await fetch(SUBGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query($ids: [ID!], $chainId: [Int!]) {
          tokens(first: 1000, where: {${tokensId}chain_ids_contains: $chainId }) {
            id
            decimals
            coingecko_id
          }
        }
      `,
      variables: {
        ids: params.tokensId,
        chainId: params.chainId
      }
    })
  })

  const response = await subgraphResponse.json()
  return response.data.tokens
}

async function getInfoTokens(coingeckoIds: string[]) {
  const resInfoTokens = await fetch(
    `${COINGECKO_API}coins/markets?vs_currency=usd&ids=${coingeckoIds.toString()}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h%2C7d&locale=en&x_cg_pro_api_key=${
      process.env.NEXT_PUBLIC_COINGECKO
    }`
  )

  const res = await resInfoTokens.json()
  return res
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse<CoinsMetadataResponse>
) => {
  if (request.method !== 'GET') {
    return response
      .setHeader('Allow', ['GET'])
      .status(405)
      .json({ message: `Method ${request.method} Not Allowed`, tokens: {} })
  }

  try {
    const { addressesSeparatedByComma: tokensAddress, chainId: chainIdQuery } =
      request.query
    const tokensId = Array.isArray(tokensAddress)
      ? tokensAddress
      : tokensAddress.split(',')
    const chainId = Array.isArray(chainIdQuery)
      ? parseInt(chainIdQuery[0])
      : parseInt(chainIdQuery)

    const coingeckoIdToAddress: Record<
      string,
      { address: string; decimals: number }
    > = {}
    const coingeckoIds = []
    const kassandraTokens = await getTokens({
      tokensId: tokensId.length > 0 && tokensId[0] ? tokensId : undefined,
      chainId: [chainId]
    })
    for (const token of kassandraTokens) {
      if (token?.coingecko_id) {
        coingeckoIds.push(token.coingecko_id)
        Object.assign(coingeckoIdToAddress, {
          [token.coingecko_id]: {
            address: token.id.toLowerCase(),
            decimals: token.decimals
          }
        })
      }
    }

    const infoTokens = []
    let page = 1
    const totalsPage = Math.ceil(coingeckoIds.length / 100)
    while (page <= totalsPage) {
      const response = await getInfoTokens(coingeckoIds)
      if (response.length > 0) infoTokens.push(...response)
      page++
    }

    const coinsMetadata: CoinsMetadataType = {}
    for (const infoToken of infoTokens) {
      Object.assign(coinsMetadata, {
        [coingeckoIdToAddress[infoToken.id]?.address]: {
          heimdallId: infoToken.id,
          name: infoToken.name,
          symbol: infoToken.symbol.toUpperCase(),
          logo: infoToken.image,
          usd: infoToken.current_price,
          marketCap: infoToken.market_cap,
          volume: infoToken.total_volume,
          pricePercentageChangeIn24h:
            infoToken.price_change_percentage_24h_in_currency,
          pricePercentageChangeIn7d:
            infoToken.price_change_percentage_7d_in_currency,
          sparklineFrom7d: infoToken.sparkline_in_7d.price,
          decimals: coingeckoIdToAddress[infoToken.id]?.decimals
        }
      })
    }

    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    response.status(200).json({ message: 'Ok', tokens: coinsMetadata })
  } catch (error) {
    console.error(error)
    response.status(500).json({
      message: 'Internal Server error',
      tokens: {}
    })
  }
}
