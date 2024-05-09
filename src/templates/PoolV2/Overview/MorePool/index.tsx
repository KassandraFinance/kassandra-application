import React from 'react'

import { useFeaturedPools } from '@/hooks/query/useFeaturedPools'

import FundCard from '@/components/FundCard'

import * as S from './styles'

const MorePool = () => {
  const dateNow = new Date()
  const params = {
    price_period: 86400,
    period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 30),
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    chainIn: ['137', '42161', '43114']
  }
  const { data: poolsKassandra } = useFeaturedPools(params)

  return (
    <S.MorePool>
      <S.MorePoolHeader>
        <h1>More Pools</h1>

        <S.Line />
      </S.MorePoolHeader>

      <S.FundCardContainer>
        {poolsKassandra?.pools.slice(0, 3).map(pool => {
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
