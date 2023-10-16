import React from 'react'

import { IPoolDataProps } from '@/hooks/query/usePoolData'

import * as S from './styles'

interface IOverviewProps {
  pool: IPoolDataProps
}

const Overview = ({ pool }: IOverviewProps) => {
  return (
    <S.Overview>
      <div>Overview</div>
    </S.Overview>
  )
}

export default Overview
