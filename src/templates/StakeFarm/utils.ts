import Big from 'big.js'
import { FallbackProvider } from 'ethers'

import { getDate } from '@/utils/date'
import { PoolDetails } from '@/constants/pools'

import { ERC20 } from '@/hooks/useERC20'
import { PoolInfo, staking as stakingContract } from '@/hooks/useStaking'

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
    const { poolInfo } = await stakingContract(address, chainId)
    const poolData = await poolInfo(pid)

    const totalStaked = Big(poolData.depositedAmount.toString())
    const kacyRewards = Big(poolData.rewardRate.toString()).mul(Big(86400))

    const timestampNow = new Date().getTime()
    const periodFinish = new Date(
      Number(poolData.periodFinish) * 1000
    ).getTime()
    const hasExpired = periodFinish < timestampNow

    if (hasExpired) return Big(0)

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

export type UserInfo = {
  currentAvailableWithdraw: Big
  lockPeriod: number
  delegateTo: string
  yourStake: Big
  withdrawable: boolean
  unstake: boolean
  kacyEarned: Big
}

interface GetUserInfo extends UserInfo {
  stakingPoolInfo: PoolInfo
}

export const handleGetUserInfo = async (
  pool: PoolDetails,
  walletAddress: string,
  provider: FallbackProvider
): Promise<GetUserInfo> => {
  const staking = await stakingContract(
    pool.stakingContract,
    pool.chain.id,
    {},
    provider
  )

  if (!walletAddress) {
    const stakingPoolInfo = await staking.poolInfo(pool.pid)

    return {
      currentAvailableWithdraw: Big(0),
      delegateTo: '',
      lockPeriod: 0,
      yourStake: Big(0),
      unstake: false,
      withdrawable: false,
      kacyEarned: Big(0),
      stakingPoolInfo
    }
  }

  const promise = [
    staking.availableWithdraw(pool.pid, walletAddress),
    staking.lockUntil(pool.pid, walletAddress),
    staking.userInfo(pool.pid, walletAddress),
    staking.balance(pool.pid, walletAddress),
    staking.withdrawable(pool.pid, walletAddress),
    staking.unstaking(pool.pid, walletAddress),
    staking.earned(pool.pid, walletAddress),
    staking.poolInfo(pool.pid)
  ]

  const result = await Promise.all(promise)

  const userInfo = {
    currentAvailableWithdraw: result[0],
    lockPeriod: result[1],
    delegateTo: result[2]?.delegatee ?? '',
    yourStake: Big(result[3]),
    withdrawable: result[4],
    unstake: result[5],
    kacyEarned: Big(result[6] ?? 0),
    stakingPoolInfo: result[7]
  }

  return userInfo
}

export type PoolMetrics = {
  apr: Big
  endDate: string
  startDate: string
  kacyRewards: Big
  totalStaked: Big
  tokenDecimals: string
  lockPeriod: string
  stakingToken: string
  hasExpired: boolean
  vestingPeriod: string
  votingMultiplier: string
  withdrawDelay: number
}

type UserAndPoolInfo = {
  userInfo: UserInfo
  poolDataMetrics: PoolMetrics
}

export const handleGetUserAndPoolInfo = async (
  pool: PoolDetails,
  walletAddress: string,
  kacyPrice: Big,
  poolPrice: Big,
  provider: FallbackProvider
): Promise<UserAndPoolInfo> => {
  const userInfo = await handleGetUserInfo(pool, walletAddress, provider)

  const stakingPoolInfo = userInfo.stakingPoolInfo

  const erc20 = await ERC20(
    stakingPoolInfo.stakingToken,
    pool.chain.id,
    {},
    provider
  )
  const decimals = await erc20.decimals()

  const totalStaked = Big(stakingPoolInfo.depositedAmount.toString())
  const kacyRewards = Big(stakingPoolInfo.rewardRate.toString()).mul(Big(86400))

  const apr = handleCalcAPR({
    kacyPrice: kacyPrice,
    poolPrice: poolPrice,
    rewardRate: kacyRewards,
    totalDeposit: totalStaked
  })

  const endDate = getDate(Number(stakingPoolInfo.periodFinish))
  const timestampNow = new Date().getTime()
  const startDate = getDate(
    Number(stakingPoolInfo.periodFinish) -
      Number(stakingPoolInfo.rewardsDuration)
  )
  const periodFinish = new Date(
    Number(stakingPoolInfo.periodFinish) * 1000
  ).getTime()

  const poolDataMetrics = {
    apr,
    endDate,
    startDate,
    kacyRewards,
    totalStaked,
    tokenDecimals: decimals.toString(),
    lockPeriod: stakingPoolInfo.lockPeriod,
    stakingToken: stakingPoolInfo.stakingToken,
    hasExpired: periodFinish < timestampNow,
    vestingPeriod: stakingPoolInfo.vestingPeriod,
    votingMultiplier: stakingPoolInfo.votingMultiplier.toString(),
    withdrawDelay: Number(stakingPoolInfo.withdrawDelay)
  }

  return {
    userInfo,
    poolDataMetrics
  }
}
