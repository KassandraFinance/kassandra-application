import Big from 'big.js'
import { ActivityCardProps, activityProps } from '../Activity'

type Token = {
  logo?: string
  amount?: string
  value?: string
}

type IActivityProps = {
  id: string
  type: string
  timestamp: number
  price_usd: string[]
  txHash: string
  address: string
  symbol: string[]
  amount: string[]
}

type IUnderlyingAssetsProps = {
  token: {
    logo?: string | null
    symbol: string
    wraps?: {
      symbol: string
      logo?: string | null
    } | null
  }
}

type IWeightGoalsProps = {
  __typename?: 'WeightGoalPoint' | undefined
  id: string
  type: string
  txHash: string
  end_timestamp: number
  previous?:
    | {
        __typename?: 'WeightGoalPoint' | undefined
        weights: {
          __typename?: 'WeightGoal' | undefined
          weight_normalized: string
          asset: {
            __typename?: 'Asset' | undefined
            token: {
              __typename?: 'Token' | undefined
              symbol: string
            }
          }
        }[]
      }
    | null
    | undefined
  token?:
    | {
        __typename?: 'Token' | undefined
        symbol: string
        logo?: string | null | undefined
      }
    | null
    | undefined
  weights: {
    __typename?: 'WeightGoal' | undefined
    weight_normalized: string
    asset: {
      __typename?: 'Asset' | undefined
      balance: string
      token: {
        __typename?: 'Token' | undefined
        symbol: string
        logo?: string | null | undefined
      }
    }
  }[]
}

export function getActivityInfo(
  activityData: IActivityProps[],
  underlyingAssets: IUnderlyingAssetsProps[],
  filters: Record<string, boolean> = { join: true, exit: true }
): Array<ActivityCardProps> {
  const activityInfo: ActivityCardProps[] = []
  const assets: Record<string, string> = {}
  let tokenIn: Token = {}
  let tokenOut: Token = {}

  underlyingAssets.forEach(item => {
    const symbol = item.token.symbol
    assets[symbol] = item?.token?.wraps?.logo ?? item?.token?.logo ?? ''
  })

  for (const activity of activityData) {
    if (filters[activity.type]) {
      if (activity.symbol.length === 2) {
        tokenIn = {
          logo: assets[activity.symbol[0]],
          amount: Big(activity.amount[0]).toFixed(2),
          value: Big(activity.amount[0]).mul(activity.price_usd[0]).toFixed(2)
        }
        tokenOut = {
          logo: assets[activity.symbol[1]],
          amount: Big(activity.amount[1]).toFixed(2),
          value: Big(activity.amount[1]).mul(activity.price_usd[1]).toFixed(2)
        }
      }

      if (activity.type === 'join' && activity.symbol.length > 2) {
        const indexOfTokenOut = activity.amount.length - 1
        const totalAmount = activity.amount
          .slice(0, indexOfTokenOut)
          .reduce(
            (total, current, i) =>
              (total = total.add(
                Big(current).mul(
                  activity.price_usd.slice(0, indexOfTokenOut)[i]
                )
              )),
            Big(0)
          )

        tokenIn = {
          value: totalAmount.toFixed()
        }
        tokenOut = {
          logo: assets[activity.symbol[indexOfTokenOut]],
          amount: Big(activity.amount[indexOfTokenOut] ?? '0').toFixed(2),
          value: Big(activity.amount[indexOfTokenOut])
            .mul(activity.price_usd[indexOfTokenOut])
            .toFixed(2)
        }
      }

      if (activity.type === 'exit' && activity.symbol.length > 2) {
        const totalAmount = activity.amount
          .slice(1)
          .reduce(
            (total, current, i) =>
              (total = total.add(
                Big(current).mul(activity.price_usd.slice(1)[i])
              )),
            Big(0)
          )

        tokenIn = {
          logo: assets[activity.symbol[0]],
          amount: Big(activity.amount[0] ?? '0').toFixed(2),
          value: Big(activity.amount[0]).mul(activity.price_usd[0]).toFixed(2)
        }
        tokenOut = {
          value: totalAmount.toFixed(2)
        }
      }

      const sharesPrice =
        activity.type === 'join'
          ? Big(tokenIn.value ?? 0).div(tokenOut.amount ?? 1)
          : Big(tokenOut.value ?? 0).div(tokenIn.amount ?? 1)

      activityInfo.push({
        key: activity.id + activity.type,
        actionType: activityProps[activity.type],
        date: new Date(activity.timestamp * 1000),
        txHash: activity.txHash,
        wallet: activity.address,
        transactionData: {
          sharesPrice: sharesPrice.toFixed(2),
          tokenIn: {
            logo: tokenIn.logo,
            amount: tokenIn.amount ? Big(tokenIn.amount).toFixed(2) : undefined,
            value: tokenIn.value ? Big(tokenIn.value).toFixed(2) : undefined
          },
          tokenOut
        }
      })
    }
  }
  return activityInfo
}

export function getManagerActivity(
  weightGoals: IWeightGoalsProps[],
  userWalletAddress: string,
  filters: Record<string, boolean> = {
    rebalance: true,
    add: true,
    removed: true
  }
): Array<ActivityCardProps> {
  const activityInfo: ActivityCardProps[] = []

  for (const [i, activity] of weightGoals.entries()) {
    if (activity.type === 'rebalance' && filters[activity.type]) {
      activityInfo.push({
        key: activity.id,
        actionType: activityProps[activity.type],
        date: new Date(activity.end_timestamp * 1000),
        txHash: activity.txHash,
        wallet: userWalletAddress
      })

      const indexOfActivityInfo = activityInfo.length - 1
      const rebalanceData = []
      for (const [_i, operation] of activity.weights.entries()) {
        rebalanceData.push({
          logo: operation.asset.token.logo ?? '',
          newWeight: Big(operation.weight_normalized).mul(100).toFixed(2),
          symbol: operation.asset.token?.symbol || '',
          weight: Big(
            weightGoals[i].previous?.weights[_i].weight_normalized || 0
          )
            .mul(100)
            .toFixed(2)
        })
      }

      activityInfo[indexOfActivityInfo].rebalancePoolData = {
        rebalanceData
      }
    } else {
      if (filters[activity.type] && weightGoals[i]) {
        activityInfo.push({
          key: activity.id,
          actionType: activityProps[activity.type],
          date: new Date(activity.end_timestamp * 1000),
          txHash: activity.txHash,
          wallet: userWalletAddress
        })

        const indexOfActivityInfo = activityInfo.length - 1
        const symbol = activity.token?.symbol || ''
        let weightNormalized = '0'
        let newWeight = '0'
        if (activity.type === 'removed') {
          weightNormalized =
            weightGoals[i].previous?.weights.find(
              weight => weight.asset.token.symbol === symbol
            )?.weight_normalized ?? '0'
        } else {
          const _activity = activity.weights.find(
            op => op.asset.token.symbol === symbol
          )
          if (_activity) {
            newWeight = _activity.weight_normalized
          }
        }

        const rebalanceData = []
        for (const operation of activity.weights) {
          if (operation.asset.token.symbol !== symbol) {
            rebalanceData.push({
              logo: operation.asset.token.logo ?? '',
              newWeight: Big(operation.weight_normalized).mul(100).toFixed(2),
              symbol: operation.asset.token?.symbol || '',
              weight: Big(
                weightGoals[i].previous?.weights.find(
                  item =>
                    item.asset.token.symbol === operation.asset.token.symbol
                )?.weight_normalized ?? 0
              )
                .mul(100)
                .toFixed(2)
            })
          }
        }

        const assetChange = {
          logo: activity.token?.logo ?? '',
          symbol,
          weight: Big(weightNormalized).mul(100).toFixed(2),
          newWeight: Big(newWeight).mul(100).toFixed(2)
        }

        activityInfo[indexOfActivityInfo].rebalancePoolData = {
          assetChange,
          rebalanceData
        }
      }
    }
  }

  return activityInfo
}

type DataVolatility = {
  close: string
}

export function calcVolatility(dataVolatility: DataVolatility[]) {
  const size = dataVolatility.length
  if (size < 2) return '0'
  const dayVolatility = new Array(size - 1).fill('0')
  let total = '0'
  for (let index = 0; index < size - 1; index++) {
    dayVolatility[index] = Big(dataVolatility[index + 1].close)
      .sub(dataVolatility[index].close)
      .div(dataVolatility[index].close)
      .toFixed()
    total = Big(total).add(dayVolatility[index]).toFixed()
  }
  let average = Big(total).div(dayVolatility.length).toFixed()
  total = '0'
  for (let index = 0; index < size - 1; index++) {
    total = Big(total).add(dayVolatility[index]).sub(average).pow(2).toFixed()
  }

  average = Big(total).div(dayVolatility.length).toFixed()

  return Big(average).sqrt().toFixed(2)
}
