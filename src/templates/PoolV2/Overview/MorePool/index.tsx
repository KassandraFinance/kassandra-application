import React from 'react'

import { useFeaturedPools } from '@/hooks/query/useFeaturedPools'

import FundCard from '@/components/FundCard'

import * as S from './styles'

const MorePool = () => {
  const { data: poolsKassandra } = useFeaturedPools()

  return (
    <S.MorePool>
      <S.MorePoolHeader>
        <h1>More Pools</h1>

        <S.Line />
      </S.MorePoolHeader>

      <S.FundCardContainer>
        {poolsKassandra?.poolsKassandra.slice(0, 3).map(pool => {
          return (
            <FundCard
              key={pool.id}
              poolAddress={pool.id}
              link={`/pool/${pool.id}`}
            />
          )
        })}
      </S.FundCardContainer>
    </S.MorePool>
  )
}

export default MorePool
