import React from 'react'
import Tippy from '@tippyjs/react'
import Big from 'big.js'

import { useAppDispatch, useAppSelector } from '@/store/hooks'

import {
  lockToken,
  setNewTokensWights,
  setTotalWeight
} from '@/store/reducers/rebalanceAssetsSlice'

import { mockTokens } from '@/constants/tokenAddresses'

import PoolToken, { AssetType } from './PoolToken'

import * as S from './styles'

interface IAllocationsTableProps {
  priceToken: (address: string) => string | undefined
  chainId: number
}

const AllocationsTable = ({ priceToken, chainId }: IAllocationsTableProps) => {
  const dispatch = useAppDispatch()

  const totalWeight = useAppSelector(state => state.rebalanceAssets.totalWeight)
  const poolTokensList = useAppSelector(
    state => state.rebalanceAssets.poolTokensList
  )
  const newTokensWights = useAppSelector(
    state => state.rebalanceAssets.newTokensWights
  )

  function handleCalcNewWeights(value: number, tokenInfo: AssetType) {
    if (value > 100 || value < 0) return

    let totalWeight = Big(0)
    const poolWeightsRebalanced = {}
    const formattedValue = Big(value)

    let weightAfter = Big(0)
    let weightBefore = Big(0)

    poolTokensList.forEach(item => {
      const { lockPercentage, newWeight } = newTokensWights[item.token.address]

      if (item.token.address === tokenInfo.token.address) {
        weightAfter = weightAfter.add(formattedValue)
        weightBefore = weightBefore.add(item.currentWeight)
        return
      }

      if (lockPercentage === lockToken.BLOCKED) {
        weightAfter = weightAfter.add(newWeight)
        weightBefore = weightBefore.add(item.currentWeight)
      }
    })

    const weightModifiedAfter = Big(100).sub(weightAfter)
    const weightModifiedBefore = Big(100).sub(weightBefore)

    poolTokensList.forEach((item, index) => {
      const { lockPercentage, newAmount, newAmountUSD, newWeight } =
        newTokensWights[item.token.address]

      if (
        lockPercentage === lockToken.BLOCKED &&
        item.token.address !== tokenInfo.token.address
      ) {
        Object.assign(poolWeightsRebalanced, {
          [item.token.address]: {
            newWeight: newWeight,
            newAmount: newAmount,
            newAmountUSD: newAmountUSD,
            lockPercentage: lockToken.BLOCKED,
            alreadyCalculated: true
          }
        })

        totalWeight = totalWeight.add(newWeight)
        return
      }

      if (item.token.address === tokenInfo.token.address) {
        const newAmount = Big(
          item.currentAmount.mul(formattedValue).div(item.currentWeight)
        )

        Object.assign(poolWeightsRebalanced, {
          [item.token.address]: {
            newWeight: Big(formattedValue),
            newAmount,
            newAmountUSD: newAmount.mul(
              Big(priceToken(mockTokens[item.token.address]) ?? 0)
            ),
            lockPercentage: formattedValue.lte(0)
              ? lockToken.UNBLOCKED
              : lockToken.BLOCKED,
            alreadyCalculated: true
          }
        })

        totalWeight = totalWeight.add(Big(formattedValue))
        return
      }

      const newWeightValue = item.currentWeight.mul(
        weightModifiedAfter.div(weightModifiedBefore)
      )
      const newAmountToken = Big(
        item.currentAmount.mul(newWeightValue).div(item.currentWeight)
      )

      totalWeight = totalWeight.add(Big(newWeightValue.toFixed(2, 2)))

      let newWeightValueFormatted = Big(newWeightValue.toFixed(2, 2))
      if (index === poolTokensList.length - 1) {
        const totalWeightMinusTotalPorcentage = Big(100).sub(totalWeight)

        newWeightValueFormatted = totalWeightMinusTotalPorcentage.add(
          Big(newWeightValue.toFixed(2, 2))
        )
      }

      Object.assign(poolWeightsRebalanced, {
        [item.token.address]: {
          newWeight: newWeightValueFormatted,
          newAmount: newAmountToken,
          newAmountUSD: Big(
            newAmountToken.mul(
              Big(priceToken(mockTokens[item.token.address]) ?? 0)
            )
          ),
          lockPercentage: lockToken.UNBLOCKED,
          alreadyCalculated: true
        }
      })
    })

    dispatch(setTotalWeight(totalWeight))
    dispatch(setNewTokensWights(poolWeightsRebalanced))
  }

  function handleLockStatus(address: string, status: lockToken) {
    let newWeights = newTokensWights[address]

    if (status === lockToken.BLOCKED) {
      newWeights = { ...newWeights, lockPercentage: lockToken.UNBLOCKED }
    } else {
      newWeights = { ...newWeights, lockPercentage: lockToken.BLOCKED }
    }

    dispatch(
      setNewTokensWights(
        Object.assign({}, newTokensWights, { [address]: newWeights })
      )
    )
  }

  function handleInvalid(event: any) {
    if (!totalWeight.eq(Big(100))) {
      return event.target.setCustomValidity(
        'sum of all token weights must give 100%'
      )
    }
  }

  return (
    <S.AllocationsTable>
      <S.TableHead>
        <S.TableHeadRow>
          <S.ThHead>Asset Name</S.ThHead>
          <S.ThHead>Current amount</S.ThHead>
          <S.ThHead>
            Weight
            <Tippy content="The current allocation of each asset in this pool.">
              <img src="/assets/utilities/tooltip.svg" />
            </Tippy>
          </S.ThHead>
          <S.ThHead id="arrowIconContent" />
          <S.ThHead>
            Target Weight
            <Tippy content="The new allocation that each asset should be after the rebalancing operation.">
              <img src="/assets/utilities/tooltip.svg" />
            </Tippy>
          </S.ThHead>
          <S.ThHead>Target Amount</S.ThHead>
        </S.TableHeadRow>
      </S.TableHead>
      <S.TBodyAllocations>
        {poolTokensList.map(item => {
          return (
            <S.TrBody key={item.token.address}>
              <PoolToken
                tokenInfo={item}
                newTokensValues={newTokensWights}
                handleLockStatus={handleLockStatus}
                handleCalcNewWeights={handleCalcNewWeights}
                priceToken={
                  priceToken(
                    chainId === 5
                      ? mockTokens[item.token.address].toLowerCase()
                      : item.token.address.toLowerCase()
                  ) || '0'
                }
              />
            </S.TrBody>
          )
        })}
        {!totalWeight.eq(Big(100)) && (
          <tr>
            <input
              form="manageAssetsForm"
              id="inputBalanceValue"
              name="inputBalanceValue"
              type="radio"
              value={totalWeight.toFixed(2, 2)}
              onInvalid={handleInvalid}
              required
              checked={totalWeight.eq(Big(100))}
              onChange={() => {
                return
              }}
            />
          </tr>
        )}
      </S.TBodyAllocations>
    </S.AllocationsTable>
  )
}

export default AllocationsTable
