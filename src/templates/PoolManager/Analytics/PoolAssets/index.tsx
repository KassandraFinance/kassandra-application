import React from 'react'
import useSWR from 'swr'

import usePoolAssets from '@/hooks/usePoolAssets'

import CoinCard from '@/templates/PoolManager/Analytics/CoinCard'
import {
  COINS_METADATA,
  mockTokens,
  networks
} from '@/constants/tokenAddresses'
import Loading from '@/components/Loading'

import * as S from './styles'

interface IPoolAssetsProps {
  poolId: string;
  chainId: string;
}

type Result = {
  id: string,
  contractAddress: string,
  contractName: string,
  name: string,
  symbol: string,
  price: string,
  image: string,
  priceChangePercentage7d: number,
  volume: number,
  marketCap: number,
  sparkline: string[]
}

const PoolAssets = (props: IPoolAssetsProps) => {
  const { poolAssets } = usePoolAssets(props.poolId)
  const addresses = poolAssets
    ?.map(asset => mockTokens[asset.token.id].toLocaleLowerCase())
    .toString()

  const url = addresses
    ? `${COINS_METADATA}/coins/contracts?name=` +
      networks[Number(props.chainId)].coingecko +
      '&addressesSeparatedByComma=' +
      addresses
    : null

  const { data } = useSWR<Result[]>(url, {
    refreshInterval: 60 * 5 * 1000
  })

  return (
    <S.PoolAssets>
      {data ? (
        <S.CoinCardContainer>
          {data?.map(token => (
            <CoinCard
              key={token.id}
              image={token.image ?? ''}
              name={token.name}
              symbol={token.symbol}
              sparkLine={token.sparkline?.map(line => ({ close: line }))}
              priceChangeIn7d={token.priceChangePercentage7d?.toFixed(4)}
              marketCap={token.marketCap}
              price={token.price}
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
