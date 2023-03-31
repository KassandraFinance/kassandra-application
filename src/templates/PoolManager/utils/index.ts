import { BNtoDecimal } from '@/utils/numerals'
import Big from 'big.js'
import { ActivityCardProps, activityProps, Result } from '../Activity'

export function getActivityInfo(
  data: Result,
  filters: Record<string, boolean> = { join: true, exit: true }
): Array<ActivityCardProps> {
  const activityInfo: ActivityCardProps[] = []
  const assets = data.pool.underlying_assets
  for (const activity of data.pool.activities) {
    if (filters[activity.type]) {
      activityInfo.push({
        key: activity.id,
        actionType: activityProps[activity.type],
        activityInfo: [],
        date: new Date(activity.timestamp * 1000),
        txHash: activity.txHash,
        wallet: activity.address,
        sharesRedeemed: {
          amount: activity.amount.at(-1) ?? '0',
          value: BNtoDecimal(
            Big(activity.amount.at(-1) ?? '0').mul(
              activity.price_usd.at(-1) ?? '0'
            ),
            5
          )
        }
      })
      const indexOfActivityInfo = activityInfo.length - 1
      const size = activity.symbol.length - 1
      for (let index = 0; index < size; index++) {
        const asset = assets.find(
          asset =>
            activity.symbol[index] ===
            (asset.token.wraps?.symbol ?? asset.token.symbol)
        )
        activityInfo[indexOfActivityInfo].activityInfo.push({
          amount: activity.amount[index],
          logo: asset?.token.wraps?.logo ?? asset?.token.logo ?? '',
          symbol: activity.symbol[index],
          value: Big(activity.amount[index])
            .mul(activity.price_usd[index])
            .toFixed(2)
        })
      }
    }
  }
  return activityInfo
}

export function getManagerActivity(
  data: Result,
  userWalletAddress: string,
  filters: Record<string, boolean> = {
    rebalance: true,
    add: true,
    removed: true
  }
): Array<ActivityCardProps> {
  const activityInfo: ActivityCardProps[] = []
  let countRebalance = 0
  for (const [i, activity] of data.pool.weight_goals.entries()) {
    if (activity.type === 'rebalance' && filters[activity.type]) {
      if (
        data.pool.weight_goals[i + 1] &&
        data.pool.weight_goals[i + 1].type === 'rebalance' &&
        countRebalance === 0
      ) {
        activityInfo.push({
          key: activity.id,
          actionType: activityProps[activity.type],
          activityInfo: [],
          date: new Date(activity.end_timestamp * 1000),
          txHash: '',
          wallet: userWalletAddress
        })
        const indexOfActivityInfo = activityInfo.length - 1
        for (const [_i, operation] of activity.weights.entries()) {
          countRebalance = 1
          activityInfo[indexOfActivityInfo].activityInfo.push({
            amount: '0',
            logo: operation.asset.token.logo ?? '',
            newWeight: Big(operation.weight_normalized).mul(100).toFixed(2),
            symbol: operation.asset.token.symbol,
            weight: Big(
              data.pool.weight_goals[i + 1].weights[_i].weight_normalized
            )
              .mul(100)
              .toFixed(2),
            value: '0'
          })
        }
      } else {
        countRebalance = 0
      }
    } else {
      if (filters[activity.type] && data.pool.weight_goals[i + 1]) {
        activityInfo.push({
          key: activity.id,
          actionType: activityProps[activity.type],
          activityInfo: [],
          newBalancePool: [],
          date: new Date(activity.end_timestamp * 1000),
          txHash: '',
          wallet: userWalletAddress
        })
        const indexOfActivityInfo = activityInfo.length - 1
        const symbol = activity.token.symbol
        let weightNormalized = '0'
        let newWeight = '0'
        if (activity.type === 'removed') {
          weightNormalized =
            data.pool.weight_goals[i + 1].weights.find(
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

        for (const [_i, operation] of activity.weights.entries()) {
          if (operation.asset.token.symbol !== symbol) {
            activityInfo[indexOfActivityInfo].newBalancePool?.push({
              amount: '0',
              logo: operation.asset.token.logo ?? '',
              newWeight: Big(operation.weight_normalized).mul(100).toFixed(2),
              symbol: operation.asset.token.symbol,
              weight: Big(
                data.pool.weight_goals[i + 1].weights[_i].weight_normalized
              )
                .mul(100)
                .toFixed(2),
              value: '0'
            })
          }
        }

        activityInfo[indexOfActivityInfo].activityInfo.push({
          amount: '0',
          logo: activity.token.logo ?? '',
          symbol,
          value: '0',
          newWeight: Big(newWeight).mul(100).toFixed(2),
          weight: Big(weightNormalized).mul(100).toFixed(2)
        })
      }
    }
  }

  return activityInfo
}
