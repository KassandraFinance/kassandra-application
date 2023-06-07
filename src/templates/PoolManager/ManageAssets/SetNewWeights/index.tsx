import React from 'react'
import Big from 'big.js'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'

import { mockTokens, networks } from '@/constants/tokenAddresses'

import useCoingecko from '@/hooks/useCoingecko'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  lockToken,
  setNewTokensWights,
  setPoolTokensList,
  setTotalWeight
} from '@/store/reducers/rebalanceAssetsSlice'
import usePoolInfo from '@/hooks/usePoolInfo'
import usePoolAssets from '@/hooks/usePoolAssets'

import ExecutionPeriod from './ExecutionPeriod'
import Steps from '../../../../components/Steps'
import AllocationsTable from './AllocationsTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const SetNewWeights = () => {
  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const dispatch = useAppDispatch()
  const { newTokensWights } = useAppSelector(state => state.rebalanceAssets)
  const [{ wallet }] = useConnectWallet()
  const { poolAssets } = usePoolAssets(poolId)
  const { poolInfo } = usePoolInfo(wallet, poolId)

  const { priceToken } = useCoingecko(
    networks[poolInfo?.chain_id ?? 137]?.coingecko,
    poolInfo?.chain.addressWrapped ?? '',
    handleMockToken(poolAssets ?? [])
  )

  function handleMockToken(tokenList: any) {
    if (poolInfo?.chain_id === 5) {
      return tokenList?.map((item: any) => {
        return mockTokens[item.token.id]
      })
    } else {
      return tokenList?.map((item: any) => {
        return item.token.id
      })
    }
  }

  React.useEffect(() => {
    if (!poolAssets || !poolInfo) return

    const poolTokensList = poolAssets.map(item => {
      return {
        currentAmount: Big(item.balance),
        currentWeight: Big(Number(item.weight_normalized) * 100 ?? 0),
        token: {
          decimals: item.token.decimals,
          address: item.token.id,
          logo: item.token.logo,
          name: item.token.name,
          symbol: item.token.symbol
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
            chainId={poolInfo?.chain_id || 0}
          />
          <ExecutionPeriod />
        </S.AllocationsAndExecutionPeriod>
      </S.SetNewWeightsBody>
    </S.SetNewWeights>
  )
}

export default SetNewWeights
