import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useRouter } from 'next/router'
import Big from 'big.js'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { useAppSelector } from '@/store/hooks'
import { GET_DEPOSIT_FEE } from './graphql'

import * as S from './styles'

type GetDepositFeeType = {
  manager: {
    pools: {
      fee_join_broker: string
      fee_join_manager: string
    }[]
  }
}

const ComissionRates = () => {
  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const params = {
    id: userWalletAddress,
    poolId: poolId
  }

  const { data } = useSWR<GetDepositFeeType>(
    userWalletAddress.length > 0 && poolId.length > 0
      ? [GET_DEPOSIT_FEE, params]
      : null,
    (query, params) => request(BACKEND_KASSANDRA, query, params)
  )

  return (
    <S.ComissionRates>
      <S.ValueContainer>
        <S.TotalValue>Deposit Fee</S.TotalValue>

        <S.TotalValue>
          {Big(data?.manager?.pools[0]?.fee_join_manager || 0)
            .add(data?.manager?.pools[0]?.fee_join_broker || 0)
            .mul(100)
            .toFixed()}
          %
        </S.TotalValue>
      </S.ValueContainer>

      <S.ValueContainer>
        <S.Value>Broker Comission</S.Value>

        <S.Value>
          {Big(data?.manager?.pools[0]?.fee_join_broker ?? 0)
            .mul(100)
            .toFixed()}
          %
        </S.Value>
      </S.ValueContainer>

      <S.ValueContainer>
        <S.Value>Manager share</S.Value>

        <S.Value>
          {Big(data?.manager?.pools[0]?.fee_join_manager ?? 0)
            .mul(100)
            .toFixed()}
          %
        </S.Value>
      </S.ValueContainer>
    </S.ComissionRates>
  )
}

export default ComissionRates
