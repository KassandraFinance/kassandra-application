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
  chainId: number;
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
    ? 'https://coins-metadata-production.up.railway.app/coins/contracts?name=' +
      networks[props.chainId].coingecko +
      '&addressesSeparatedByComma=' +
      addresses
    : null

  const url2 = poolAssets?.some(
    asset =>
      asset.token.id.toLowerCase() ===
      '0x366e293a5cf90a0458d9ff9f3f92234da598f62e'
  )
    ? 'https://coins-metadata-production.up.railway.app/coins/contracts?name=' +
      networks[43114].coingecko +
      '&addressesSeparatedByComma=' +
      '0xf32398dae246c5f672b52a54e9b413dffcae1a44'
    : null

  const { data } = useSWR<Result[]>(url, {
    refreshInterval: 60 * 5 * 1000
  })

  const { data: kacyData } = useSWR<Result[]>(url2, {
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
          {kacyData &&
            kacyData?.map(token => (
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
