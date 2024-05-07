import { useQuery } from '@tanstack/react-query'
import { FallbackProvider } from 'ethers'
import Big from 'big.js'

import { PoolDetails, liquidityPools } from '@/constants/pools'

import { handleInstaceFallbackProvider } from '@/utils/provider'

import { lpPoolPriceFunctions } from '../usePriceLPEthers'
import { CoinsMetadataType } from './useTokensData'

import { handleGetUserAndPoolInfo } from '@/components/StakeCard/utils'

type useInvestmentPools = {
  kacyPrice: Big
  coinsData?: CoinsMetadataType
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

export const liquidityPool = async ({
  kacyPrice,
  coinsData,
  walletAddress
}: useInvestmentPools) => {
  const poolInfo: PoolInfo[] = []

  const providersForChain: Record<number, FallbackProvider> = {}
  const { getPricePoolLP } = lpPoolPriceFunctions()

  for (const pool of liquidityPools) {
    if (!providersForChain[pool.chain.id]) continue

    const provider = await handleInstaceFallbackProvider(pool.chain.id)

    providersForChain[pool.chain.id] = provider
  }

  for (const pool of liquidityPools) {
    const tokenPoolPrice = coinsData
      ? coinsData[pool.poolTokenAddress.toLowerCase()]?.usd
      : '0'

    const poolPrice = await getPricePoolLP({
      lpType: pool.lpPool?.type,
      chainId: pool.chain.id,
      poolAddress: pool.address,
      tokenPoolAddress: pool.poolTokenAddress,
      balancerPoolId: pool.lpPool?.balancerPoolId,
      tokenPoolPrice: Big(tokenPoolPrice)
    })

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
  coinsData?: CoinsMetadataType
  walletAddress?: string
}

export const useLiquidityPool = ({
  kacyPrice,
  coinsData,
  walletAddress
}: UseSkatePoolPowerVoting) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['liquidity-pool', kacyPrice, coinsData],
    queryFn: async () =>
      liquidityPool({
        kacyPrice: kacyPrice ?? Big(0),
        coinsData: coinsData,
        walletAddress: walletAddress ?? ''
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: !!kacyPrice || !!coinsData || !!walletAddress
  })
}
