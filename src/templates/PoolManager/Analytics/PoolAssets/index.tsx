import React from 'react'

import usePoolAssets from '@/hooks/usePoolAssets'

import CoinCard from '@/templates/PoolManager/Analytics/CoinCard'

import * as S from './styles'

interface IPoolAssetsProps {
  poolId: string;
}

const PoolAssets = (props: IPoolAssetsProps) => {
  const { poolAssets } = usePoolAssets(props.poolId)

  return (
    <S.PoolAssets>
      <S.CoinCardContainer>
        {poolAssets?.pool?.underlying_assets?.map(asset => (
          <CoinCard
            key={asset.token.id}
            image={asset.token.logo}
            name={asset.token.name}
            symbol={asset.token.symbol}
          />
        ))}
      </S.CoinCardContainer>
    </S.PoolAssets>
  )
}

export default PoolAssets
