import { useQuery } from '@tanstack/react-query'
import Big from 'big.js'

import {
  PoolDetails,
  poolsKacy,
  poolsKacyAndInvestors
} from '@/constants/pools'
import {
  PoolMetrics,
  UserInfo,
  handleGetUserAndPoolInfo
} from '@/templates/StakeFarm/utils'

import { handleInstaceFallbackProvider } from '@/utils/provider'

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

type PoolInfo = {
  pool: PoolDetails
  userInfo: UserInfo
  poolDataMetrics: PoolMetrics
}

type SkatePoolPowerVoting = {
  kacyPrice: Big
  poolPrice: Big
  walletAddress: string
}

export const skatePoolPowerVoting = async ({
  kacyPrice,
  poolPrice,
  walletAddress
}: SkatePoolPowerVoting) => {
  const poolInfo: PoolInfo[] = []
  const provider = await handleInstaceFallbackProvider(43114)

  for (const pool of poolsKacyAndInvestors) {
    const { poolDataMetrics, userInfo } = await handleGetUserAndPoolInfo(
      pool,
      walletAddress,
      kacyPrice,
      poolPrice,
      provider
    )

    if ((pool.pid === 0 || pool.pid === 1) && userInfo.yourStake.lte(0))
      continue

    poolInfo.push({ pool, poolDataMetrics, userInfo })
  }

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
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['stake-pool', kacyPrice, poolPrice, walletAddress],
    queryFn: async () =>
      skatePoolPowerVoting({
        kacyPrice: kacyPrice ?? Big(0),
        poolPrice: poolPrice ?? Big(0),
        walletAddress: walletAddress ?? ''
      }),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
    keepPreviousData: true,
    enabled: !!kacyPrice || !!poolPrice,
    placeholderData: poolsKacy.map(item => {
      return {
        pool: item,
        userInfo,
        poolDataMetrics
      }
    })
  })
}
