import { useQuery } from '@tanstack/react-query'
import Big from 'big.js'

import { PoolDetails, poolsKacy } from '@/constants/pools'
import { staking as stakingContract } from '../useStaking'
import { ERC20 } from '../useERC20'
import { handleCalcAPR } from '@/components/StakeCard/utils'
import { getDate } from '@/utils/date'

type SkatePoolPowerVoting = {
  kacyPrice: Big
  poolPrice: Big
  walletAddress: string
}

type UserInfo = {
  currentAvailableWithdraw: string
  lockPeriod: string
  delegateTo: string
  yourStake: Big
  withdrawable: string
  unstake: string
  kacyEarned: Big
}

type PoolMetrics = {
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

type PoolInfo = {
  pool: PoolDetails
  userInfo: UserInfo
  poolDataMetrics: PoolMetrics
}

export const skatePoolPowerVoting = async ({
  kacyPrice,
  poolPrice,
  walletAddress
}: SkatePoolPowerVoting) => {
  const poolInfo: PoolInfo[] = []

  for (const pool of poolsKacy) {
    const staking = await stakingContract(pool.stakingContract, pool.chain.id)

    const promise = [
      staking.availableWithdraw(pool.pid, walletAddress),
      staking.lockUntil(pool.pid, walletAddress),
      staking.userInfo(pool.pid, walletAddress),
      staking.balance(pool.pid, walletAddress),
      staking.withdrawable(pool.pid, walletAddress),
      staking.unstaking(pool.pid, walletAddress),
      staking.earned(pool.pid, walletAddress)
    ]

    const result = await Promise.all(promise)
    const poolInfoRes = await staking.poolInfo(pool.pid)
    const erc20 = await ERC20(poolInfoRes.stakingToken, pool.chain.id)
    const decimals = await erc20.decimals()

    const totalStaked = Big(poolInfoRes.depositedAmount.toString())
    const kacyRewards = Big(poolInfoRes.rewardRate.toString()).mul(Big(86400))

    const apr = handleCalcAPR({
      kacyPrice: kacyPrice,
      poolPrice: poolPrice,
      rewardRate: kacyRewards,
      totalDeposit: totalStaked
    })

    const endDate = getDate(Number(poolInfoRes.periodFinish))
    const timestampNow = new Date().getTime()
    const startDate = getDate(
      Number(poolInfoRes.periodFinish) - Number(poolInfoRes.rewardsDuration)
    )
    const periodFinish = new Date(
      Number(poolInfoRes.periodFinish) * 1000
    ).getTime()

    console.log('aqui')
    const userInfo = {
      currentAvailableWithdraw: result[0],
      lockPeriod: result[1],
      delegateTo: result[2]?.delegatee ?? '',
      yourStake: Big(result[3]),
      withdrawable: result[4],
      unstake: result[5],
      kacyEarned: Big(result[6] ?? 0)
    }

    const poolDataMetrics = {
      apr,
      endDate,
      startDate,
      kacyRewards,
      totalStaked,
      tokenDecimals: decimals.toString(),
      lockPeriod: poolInfoRes.lockPeriod,
      stakingToken: poolInfoRes.stakingToken,
      hasExpired: periodFinish < timestampNow,
      vestingPeriod: poolInfoRes.vestingPeriod,
      votingMultiplier: poolInfoRes.votingMultiplier.toString(),
      withdrawDelay: Number(poolInfoRes.withdrawDelay)
    }

    poolInfo.push({ pool, poolDataMetrics, userInfo })
  }

  console.log(poolInfo)
  return poolInfo
}

type UseSkatePoolPowerVoting = {
  kacyPrice?: Big
  poolPrice?: Big
  walletAddress?: string
}

export const useStakePoolPowerVoting = ({
  kacyPrice,
  poolPrice,
  walletAddress
}: UseSkatePoolPowerVoting) => {
  return useQuery({
    queryKey: ['stake-pool', kacyPrice, poolPrice, walletAddress],
    queryFn: async () =>
      skatePoolPowerVoting({
        kacyPrice: kacyPrice ?? Big(0),
        poolPrice: poolPrice ?? Big(0),
        walletAddress: walletAddress ?? ''
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
    // enabled: !!kacyPrice || !!poolPrice || !!walletAddress
  })
}
