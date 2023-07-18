import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { useManagerDepositFee } from '@/hooks/query/useManagerDepositFee'

import * as S from './styles'

const ComissionRates = () => {
  const [{ wallet }] = useConnectWallet()
  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const params = {
    id: wallet ? getAddress(wallet.accounts[0].address) : '',
    poolId: poolId
  }

  const { data } = useManagerDepositFee(params)

  return (
    <S.ComissionRates>
      <S.ValueContainer>
        <S.TotalValue>Deposit Fee</S.TotalValue>

        <S.TotalValue>
          {Big(data?.pools[0]?.fee_join_manager || 0)
            .add(data?.pools[0]?.fee_join_broker || 0)
            .mul(100)
            .toFixed()}
          %
        </S.TotalValue>
      </S.ValueContainer>

      <S.ValueContainer>
        <S.Value>Broker Comission</S.Value>

        <S.Value>
          {Big(data?.pools[0]?.fee_join_broker ?? 0)
            .mul(100)
            .toFixed()}
          %
        </S.Value>
      </S.ValueContainer>

      <S.ValueContainer>
        <S.Value>Manager share</S.Value>

        <S.Value>
          {Big(data?.pools[0]?.fee_join_manager ?? 0)
            .mul(100)
            .toFixed()}
          %
        </S.Value>
      </S.ValueContainer>
    </S.ComissionRates>
  )
}

export default ComissionRates
