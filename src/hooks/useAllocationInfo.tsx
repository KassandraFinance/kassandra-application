import React from 'react'
import Big from 'big.js'

import { UnderlyingAssetsInfoType } from '@/utils/updateAssetsToV2'
import { getDateDiff } from '@/utils/date'

type TokenInfo = {
  token: {
    address: string
    logo: string
    name: string
    symbol: string
    decimals: number
  }
  allocation: string
  holding: {
    value: Big
  }
}

type IWeightGoalsProps = {
  id: string
  type: string
  end_timestamp: number
  start_timestamp: number
  token?:
    | {
        symbol: string
        logo?: string | null | undefined
      }
    | null
    | undefined
  weights: {
    weight_normalized: string
    asset: {
      balance: string
      token: {
        symbol: string
        logo?: string | null | undefined
      }
    }
  }[]
}

const useAllocationInfo = () => {
  const tokenWeightFormatted = React.useCallback((value: string): string => {
    return Big(value).mul(100).toFixed(2, 2)
  }, [])

  const handleCurrentAllocationInfo = React.useCallback(
    (poolAssets: UnderlyingAssetsInfoType[]): TokenInfo[] => {
      const tokenList = poolAssets.map(item => {
        return {
          token: {
            address: item.token.id,
            logo: item.token.logo ?? '',
            name: item.token.name,
            symbol: item.token.symbol,
            decimals: item.token.decimals
          },
          allocation: tokenWeightFormatted(item.weight_normalized),
          holding: {
            value: Big(item.balance)
          }
        }
      })

      return tokenList
    },
    []
  )

  const handleRebalancingTimeProgress = React.useCallback(
    (weightGoals: IWeightGoalsProps[]) => {
      const currentTime = new Date().getTime()
      const endTime = (weightGoals[0]?.end_timestamp || 0) * 1000

      if (currentTime < endTime) {
        const oneHourInTimestamp = 3600000
        const startTime: number = weightGoals[0].start_timestamp * 1000
        const timeSelected = (endTime - startTime) / oneHourInTimestamp

        const started = getDateDiff(startTime)
        const remaining = getDateDiff(currentTime, endTime)
        const hoursLeft = (endTime - currentTime) / oneHourInTimestamp
        const datePorcentage = ((timeSelected - hoursLeft) * 100) / timeSelected

        return {
          started: started ? String(started.value) + ' ' + started.string : '0',
          remaning: remaining
            ? String(remaining.value) + ' ' + remaining.string
            : '0',
          progress: datePorcentage > 0 ? datePorcentage : 0
        }
      } else {
        return null
      }
    },
    []
  )

  const handleRebalanceWeights = React.useCallback(
    (
      name: string,
      price: string,
      weightGoals: IWeightGoalsProps[],
      poolAssets: UnderlyingAssetsInfoType[]
    ) => {
      const targetWeights = weightGoals[0]
      const previousWeights = weightGoals[1]
      const currentTime = new Date().getTime()
      const endTime = (targetWeights?.end_timestamp || 0) * 1000

      if (currentTime < endTime) {
        const listTokenWeightsSorted = poolAssets.sort((a, b) =>
          a.token.id.toLowerCase() > b.token.id.toLowerCase() ? 1 : -1
        )

        const listTokenWeights = listTokenWeightsSorted.map((item, index) => {
          return {
            token: {
              address: item.token.id,
              logo: item.token.logo ?? '',
              name: item.token.name,
              symbol: item.token.symbol
            },
            previous: tokenWeightFormatted(
              previousWeights.weights[index].weight_normalized
            ),
            current: tokenWeightFormatted(item.weight_normalized),
            final: tokenWeightFormatted(
              targetWeights.weights[index].weight_normalized
            )
          }
        })

        return {
          poolName: name,
          poolPrice: Big(price).toFixed(2, 2),
          listTokenWeights
        }
      } else {
        return null
      }
    },
    []
  )

  return {
    handleCurrentAllocationInfo,
    handleRebalancingTimeProgress,
    handleRebalanceWeights
  }
}

export default useAllocationInfo
