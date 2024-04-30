import { staking } from '@/hooks/useStaking'
import Big from 'big.js'

interface ICalcAPR {
  kacyPrice: Big
  poolPrice: Big
  totalDeposit: Big
  rewardRate: Big
}

export function handleCalcAPR({
  kacyPrice,
  poolPrice,
  rewardRate,
  totalDeposit
}: ICalcAPR) {
  if (!kacyPrice || !poolPrice || !rewardRate || !totalDeposit) return Big(0)
  if (
    kacyPrice.lte(Big(0)) ||
    poolPrice.lte(Big(0)) ||
    rewardRate.lt(Big(0)) ||
    totalDeposit.lt(Big(0))
  ) {
    return Big(0)
  }

  const result = rewardRate
    .mul('365')
    .mul('100')
    .mul(kacyPrice)
    .div(poolPrice.mul(totalDeposit.eq(0) ? 1 : totalDeposit))
    .toFixed(0)

  return Big(result)
}

export const handleGetAPR = async (
  address: string,
  chainId: number,
  pid: number,
  kacyPrice: Big,
  poolPrice: Big
) => {
  try {
    const { poolInfo } = await staking(address, chainId)
    const poolData = await poolInfo(pid)

    const totalStaked = Big(poolData.depositedAmount.toString())
    const kacyRewards = Big(poolData.rewardRate.toString()).mul(Big(86400))

    const apr = handleCalcAPR({
      kacyPrice: kacyPrice,
      poolPrice: poolPrice,
      rewardRate: kacyRewards,
      totalDeposit: totalStaked
    })

    return apr
  } catch (error) {
    return Big(0)
  }
}
