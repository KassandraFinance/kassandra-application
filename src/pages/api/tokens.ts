import { NextApiRequest, NextApiResponse } from 'next'

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

async function getTokens(params: { tokensId?: string[]; chainId?: number }) {
  const resKassandra = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_KASSANDRA ?? '',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
        query($ids: [ID!] $chainId: Int) {
          tokensByIds(ids: $ids chainId: $chainId) {
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
    }
  )

  return (await resKassandra.json()).data?.tokensByIds
}

async function getInfoTokens(coingeckoIds: string[], page: number) {
  const resInfoTokens = await fetch(process.env.HEIMDALL_API ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `BearerInternal ${process.env.HEIMDALL_API_KEY}`
    },
    body: JSON.stringify({
      query: `
        query MarketCoins ($ids: [String!]! $page: Float) {
          marketCoins (
            filters: {
              coinsID: $ids
            }
            pagination: {
              page: $page
            }
          ) {
            items {
              id
              name
              symbol
              image
              price
              marketCap
              volume
              pricePercentageChangeIn24h
              pricePercentageChangeIn7d
              sparklineFrom7d
            }
          }
        }
      `,
      variables: {
        ids: coingeckoIds,
        page
      }
    })
  })
  return (await resInfoTokens.json()).data?.marketCoins?.items
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
      chainId
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
      const response = await getInfoTokens(coingeckoIds, page)
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
          usd: infoToken.price,
          marketCap: infoToken.marketCap,
          volume: infoToken.volume,
          pricePercentageChangeIn24h: infoToken.pricePercentageChangeIn24h,
          pricePercentageChangeIn7d: infoToken.pricePercentageChangeIn7d,
          sparklineFrom7d: infoToken.sparklineFrom7d,
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
