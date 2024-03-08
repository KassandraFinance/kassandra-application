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
