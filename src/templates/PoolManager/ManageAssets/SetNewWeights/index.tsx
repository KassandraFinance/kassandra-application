import React from 'react'
import Big from 'big.js'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'

import { mockTokens } from '@/constants/tokenAddresses'

import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  lockToken,
  setNewTokensWights,
  setPoolTokensList,
  setTotalWeight
} from '@/store/reducers/rebalanceAssetsSlice'
import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import { usePoolAssets } from '@/hooks/query/usePoolAssets'

import ExecutionPeriod from './ExecutionPeriod'
import Steps from '../../../../components/Steps'
import AllocationsTable from './AllocationsTable'
import WarningCard from '@/components/WarningCard'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

export const MAX_RECOMMENDED_DIFF = 15

const SetNewWeights = () => {
  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const dispatch = useAppDispatch()
  const poolTokensList = useAppSelector(
    state => state.rebalanceAssets.poolTokensList
  )
  const { newTokensWights } = useAppSelector(state => state.rebalanceAssets)
  const [{ wallet }] = useConnectWallet()
  const { data: poolAssets } = usePoolAssets({ id: poolId })
  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const { data } = useTokensData({
    chainId: (poolInfo && poolInfo[0]?.chain_id) ?? 137,
    tokenAddresses: handleMockToken(poolAssets ?? [])
  })

  const { priceToken } = useGetToken({
    nativeTokenAddress: (poolInfo && poolInfo[0]?.chain?.address_wrapped) ?? '',
    tokens: data || {}
  })

  function handleMockToken(tokenList: any) {
    if (poolInfo && poolInfo[0]?.chain_id === 5) {
      return tokenList?.map((item: any) => {
        return mockTokens[item.token.id]
      })
    } else {
      return tokenList?.map((item: any) => {
        return item.token.id
      })
    }
  }

  const checkValueDiff = React.useMemo(() => {
    return poolTokensList.some(
      item =>
        newTokensWights[item.token.address].newWeight.gt(Big(0)) &&
        item.currentWeight
          .minus(newTokensWights[item.token.address].newWeight)
          .abs()
          .gte(MAX_RECOMMENDED_DIFF)
    )
  }, [newTokensWights])

  React.useEffect(() => {
    if (!poolAssets || !poolInfo) return

    const poolTokensList = poolAssets.map(item => {
      return {
        currentAmount: Big(item.balance),
        currentWeight: Big(Number(item.weight_normalized) * 100 ?? 0),
        token: {
          decimals: item.token?.decimals || 18,
          address: item.token.id,
          logo: item.token?.logo || '',
          name: item.token?.name || '',
          symbol: item.token?.symbol || '',
          coingeckoId: item.token.coingecko_id ?? ''
        }
      }
    })

    dispatch(setPoolTokensList(poolTokensList))
  }, [])

  React.useEffect(() => {
    if (!poolAssets) return

    let totalWeight = Big(0)
    const newWeights = {}

    poolAssets.forEach(item => {
      const address = item.token.id
      totalWeight = totalWeight.add(newTokensWights[address]?.newWeight ?? 0)

      Object.assign(newWeights, {
        [address]: {
          newWeight: newTokensWights[address]?.newWeight ?? Big(0),
          newAmount: newTokensWights[address]?.newAmount ?? Big(0),
          newAmountUSD: newTokensWights[address]?.newAmountUSD ?? Big(0),
          lockPercentage:
            newTokensWights[address]?.lockPercentage ?? lockToken.UNBLOCKED,
          alreadyCalculated:
            newTokensWights[address]?.alreadyCalculated ?? false
        }
      })
    })

    dispatch(setTotalWeight(totalWeight))
    dispatch(setNewTokensWights(newWeights))
  }, [])

  return (
    <S.SetNewWeights>
      <CreatePoolHeader title="Change token weights" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Set new token weights',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />

      <S.SetNewWeightsBody>
        <h2>Token Weights</h2>
        <p>Define the new Allocations of the assets that make up the pool</p>

        <S.AllocationsAndExecutionPeriod>
          <AllocationsTable
            priceToken={priceToken}
            chainId={(poolInfo && poolInfo[0]?.chain_id) || 0}
          />

          <S.ExecutionPeriodContainer>
            <ExecutionPeriod />

            <WarningCard showCard={checkValueDiff}>
              <p>
                Warning: Your aggressive portfolio rebalancing may lead to
                substantial financial losses. Please review your investment
                strategy for a more balanced approach aligned with your
                financial goals.
              </p>
            </WarningCard>
          </S.ExecutionPeriodContainer>
        </S.AllocationsAndExecutionPeriod>
      </S.SetNewWeightsBody>
    </S.SetNewWeights>
  )
}

export default SetNewWeights
