import { useQuery } from '@tanstack/react-query'
import { FallbackProvider } from 'ethers'
import Big from 'big.js'

import { PoolDetails, liquidityPools } from '@/constants/pools'

import { handleInstaceFallbackProvider } from '@/utils/provider'

import { lpPoolPriceFunctions } from '../usePriceLPEthers'
import { CoinsMetadataType } from './useTokensData'

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
  coinsData?: CoinsMetadataType
  walletAddress: string
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
    queryKey: ['liquidity-pool', kacyPrice, coinsData, walletAddress],
    queryFn: async () =>
      liquidityPool({
        kacyPrice: kacyPrice ?? Big(0),
        coinsData: coinsData,
        walletAddress: walletAddress ?? ''
      }),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
    keepPreviousData: true,
    placeholderData: liquidityPools.map(item => {
      return {
        pool: item,
        userInfo,
        poolDataMetrics
      }
    }),
    enabled: !!kacyPrice || !!coinsData
  })
}
