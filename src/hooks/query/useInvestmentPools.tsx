import { useQuery } from '@tanstack/react-query'
import { FallbackProvider } from 'ethers'
import Big from 'big.js'

import { PoolDetails, investmentsPools } from '@/constants/pools'

import { handleInstaceFallbackProvider } from '@/utils/provider'

import { handleGetUserAndPoolInfo } from '@/components/StakeCard/utils'

type PoolsPrice = {
  price_usd?: string
  address?: string
}
type useInvestmentPools = {
  kacyPrice: Big
  poolsPrice?: PoolsPrice[]
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

export const investmentPools = async ({
  kacyPrice,
  poolsPrice,
  walletAddress
}: useInvestmentPools) => {
  const poolInfo: PoolInfo[] = []

  const providersForChain: Record<number, FallbackProvider> = {}

  for (const pool of investmentsPools) {
    if (!providersForChain[pool.chain.id]) continue

    console.log('LINHA 66', pool.chain.id)
    const provider = await handleInstaceFallbackProvider(pool.chain.id)

    providersForChain[pool.chain.id] = provider
  }

  for (const pool of investmentsPools) {
    const poolPrice =
      (poolsPrice &&
        poolsPrice.find(token => token.address === pool.poolTokenAddress)
          ?.price_usd) ??
      '0'

    const { poolDataMetrics, userInfo } = await handleGetUserAndPoolInfo(
      pool,
      walletAddress,
      kacyPrice,
      Big(poolPrice),
      providersForChain[pool.chain.id]
    )

    poolInfo.push({ pool, poolDataMetrics, userInfo })
  }

  return poolInfo
}

type UseSkatePoolPowerVoting = {
  kacyPrice?: Big
  poolsPrice?: PoolsPrice[]
  walletAddress?: string
}

export const useInvestmentPools = ({
  kacyPrice,
  poolsPrice,
  walletAddress
}: UseSkatePoolPowerVoting) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['investment-pool', kacyPrice, poolsPrice],
    queryFn: async () =>
      investmentPools({
        kacyPrice: kacyPrice ?? Big(0),
        poolsPrice: poolsPrice,
        walletAddress: walletAddress ?? ''
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: !!kacyPrice || !!poolsPrice || !!walletAddress
  })
}
