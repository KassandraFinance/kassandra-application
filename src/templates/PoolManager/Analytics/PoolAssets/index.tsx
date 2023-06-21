import React from 'react'
import useSWR from 'swr'

import usePoolAssets from '@/hooks/usePoolAssets'

import CoinCard from '@/templates/PoolManager/Analytics/CoinCard'
import { mockTokens } from '@/constants/tokenAddresses'
import Loading from '@/components/Loading'

import * as S from './styles'

interface IPoolAssetsProps {
  poolId: string
  chainId: number
}

type Result = {
  tokens: {
    [id: string]: {
      heimdallId: string
      name: string
      symbol: string
      logo: string
      usd: number
      marketCap: number
      volume: number
      pricePercentageChangeIn24h: number
      pricePercentageChangeIn7d: number
      sparklineFrom7d: number[]
    }
  }
}

const PoolAssets = (props: IPoolAssetsProps) => {
  const { poolAssets } = usePoolAssets(props.poolId)

  let addresses
  if (props.chainId === 5) {
    addresses = poolAssets
      ?.map(asset => mockTokens[asset.token.id].toLocaleLowerCase())
      .toString()
  } else {
    addresses = poolAssets
      ?.map(asset => asset.token.id.toLowerCase())
      .toString()
  }

  const url = addresses
    ? `/api/tokens?chainId=${137}&addressesSeparatedByComma=${addresses}`
    : null

  const { data } = useSWR<Result>(url, {
    refreshInterval: 60 * 5 * 1000
  })

  Object.entries(data?.tokens ?? {}).map(console.log)

  return (
    <S.PoolAssets>
      {data ? (
        <S.CoinCardContainer>
          {Object.values(data.tokens).map(token => (
            <CoinCard
              key={token.heimdallId}
              image={token.logo ?? ''}
              name={token.name}
              symbol={token.symbol}
              sparkLine={token.sparklineFrom7d?.map(line => ({
                close: line.toString()
              }))}
              priceChangeIn7d={Number(token.pricePercentageChangeIn7d)?.toFixed(
                4
              )}
              marketCap={Number(token.marketCap)}
              price={token.usd}
              period={{ time: 7, frame: 'days', abvFrame: 'D' }}
            />
          ))}
        </S.CoinCardContainer>
      ) : (
        <Loading marginTop={0} />
      )}
    </S.PoolAssets>
  )
}

export default PoolAssets
