import { useQuery } from '@tanstack/react-query'
import Big from 'big.js'

import { PoolDetails, investmentsPools } from '@/constants/pools'

import {
  PoolMetrics,
  UserInfo,
  handleGetUserAndPoolInfo
} from '@/templates/StakeFarm/utils'

const userInfo: UserInfo = {
  currentAvailableWithdraw: Big(-1),
  delegateTo: '',
  lockPeriod: -1,
  yourStake: Big(-1),
  unstake: false,
  withdrawable: false,
  kacyEarned: Big(-1)
}

const poolDataMetrics: PoolMetrics = {
  votingMultiplier: '-1',
  startDate: '',
  endDate: '',
  kacyRewards: Big(-1),
  withdrawDelay: -1,
  totalStaked: Big(-1),
  hasExpired: false,
  apr: Big(-1),
  stakingToken: '',
  vestingPeriod: '',
  lockPeriod: '',
  tokenDecimals: '18'
}

type useInvestmentPools = {
  kacyPrice: Big
  poolsPrice?: Record<string, string>
  walletAddress: string
}

type PoolInfo = {
  pool: PoolDetails
  userInfo: UserInfo
  poolDataMetrics: PoolMetrics
}

export const investmentPools = async ({
  kacyPrice,
  poolsPrice,
  walletAddress
}: useInvestmentPools) => {
  const poolInfo: PoolInfo[] = []

  for (const pool of investmentsPools) {
    const poolPrice = Big(poolsPrice ? poolsPrice[pool.poolTokenAddress] : '0')
    const { poolDataMetrics, userInfo } = await handleGetUserAndPoolInfo(
      pool,
      walletAddress,
      kacyPrice,
      poolPrice
    )

    poolInfo.push({ pool, poolDataMetrics, userInfo })
  }

  return poolInfo
}

type UseSkatePoolPowerVoting = {
  kacyPrice?: Big
  poolsPrice?: Record<string, string>
  walletAddress?: string
}

export const useInvestmentPools = ({
  kacyPrice,
  poolsPrice,
  walletAddress
}: UseSkatePoolPowerVoting) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['investment-pool', kacyPrice, poolsPrice, walletAddress],
    queryFn: async () =>
      investmentPools({
        kacyPrice: kacyPrice ?? Big(0),
        poolsPrice: poolsPrice,
        walletAddress: walletAddress ?? ''
      }),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
    keepPreviousData: true,
    placeholderData: investmentsPools.map(item => {
      return {
        pool: item,
        userInfo,
        poolDataMetrics
      }
    }),
    enabled: !!kacyPrice || !!poolsPrice
  })
}
