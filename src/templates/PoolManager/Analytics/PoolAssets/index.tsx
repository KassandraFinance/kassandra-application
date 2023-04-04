import React from 'react'
import useSWR from 'swr'

import usePoolAssets from '@/hooks/usePoolAssets'

import CoinCard from '@/templates/PoolManager/Analytics/CoinCard'
import { mockTokens, networks } from '@/constants/tokenAddresses'
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
  price: number,
  image: string,
  priceChangeIn24h: number,
  volume: number,
  marketCap: number,
  socialScore24h: number,
  sparkline: string[]
}

const PoolAssets = (props: IPoolAssetsProps) => {
  const { poolAssets } = usePoolAssets(props.poolId)
  const addresses = poolAssets
    ?.map(asset => mockTokens[asset.token.id].toLocaleLowerCase())
    .toString()

  const url = addresses
    ? 'https://coins-metadata.kassandra.finance/coins/contracts?name=' +
      networks[Number(props.chainId)].coingecko +
      '&addressesSeparatedByComma=' +
      addresses
    : undefined

  const { data } = useSWR<Result[]>(url)

  return (
    <S.PoolAssets>
      <S.CoinCardContainer>
        {data ? (
          data?.map(token => (
            <CoinCard
              key={token.id}
              image={token.image ?? ''}
              name={token.name}
              symbol={token.symbol}
              sparkLine={token.sparkline.map(line => ({ close: line }))}
              priceChangeIn24h={token.priceChangeIn24h.toFixed(4)}
              volume={token.volume}
              score24h={token.socialScore24h.toFixed(2)}
              period={{ time: 7, frame: 'days', abvFrame: 'D' }}
            />
          ))
        ) : (
          <Loading marginTop={0} />
        )}
      </S.CoinCardContainer>
    </S.PoolAssets>
  )
}

export default PoolAssets
