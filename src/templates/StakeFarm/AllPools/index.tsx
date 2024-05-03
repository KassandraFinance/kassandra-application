import React from 'react'
import * as S from './styles'

interface StakeFarmPoolsProps {
  numberOfPools: string
}

export function StakeFarmPools({ numberOfPools }: StakeFarmPoolsProps) {
  return (
    <S.AllPoolsWrapper>
      <S.Content>
        <S.TextContent>
          All Pools <S.PoolsNumber>({numberOfPools})</S.PoolsNumber>
        </S.TextContent>
      </S.Content>
    </S.AllPoolsWrapper>
  )
}
