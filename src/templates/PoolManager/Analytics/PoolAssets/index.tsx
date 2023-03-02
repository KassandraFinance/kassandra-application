import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'

import { BACKEND_KASSANDRA } from '../../../../constants/tokenAddresses'

import { GET_ASSETS } from './graphql'

import CoinCard from '../CoinCard'

import * as S from './styles'

interface IPoolAssetsProps {
  poolId: string;
}

const PoolAssets = (props: IPoolAssetsProps) => {
  const [assets, setAssets] = React.useState<Array<object>>([])

  const { data } = useSWR([GET_ASSETS, props.poolId], query =>
    request(BACKEND_KASSANDRA, query, { id: props.poolId })
  )

  React.useEffect(() => {
    if (!data?.pool) return

    setAssets(data.pool.underlying_assets)
  }, [data])

  return (
    <S.PoolAssets>
      <S.CoinCardContainer>
        {assets.map((asset: any) => (
          <>
            <CoinCard
              key={asset.token.id}
              image={asset.token.logo}
              name={asset.token.name}
              symbol={asset.token.symbol}
            />
          </>
        ))}
      </S.CoinCardContainer>
    </S.PoolAssets>
  )
}

export default PoolAssets
