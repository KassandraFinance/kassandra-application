import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { handleGetAPR } from '@/templates/StakeFarm/utils'
import { networks } from '@/constants/tokenAddresses'
import { ZeroAddress } from 'ethers'
import Big from 'big.js'

type UseAPRList = {
  month: number
  period_selected: number
  price_period: number
  chainIn: string[]
  poolIdList: string[]
  kacyPrice: string
}

export const fetchFarmPools = async ({
  month,
  period_selected,
  price_period,
  chainIn,
  poolIdList,
  kacyPrice
}: UseAPRList) => {
  const response = await kassandraClient.FarmPools({
    month,
    period_selected,
    price_period,
    chainIn,
    poolIdList
  })

  const pools = []

  for (const pool of response.pools) {
    const network = networks[pool.chain_id]
    const apr = await handleGetAPR(
      network.stakingContract ?? ZeroAddress,
      pool.chain_id,
      pool?.pool_id ?? 0,
      Big(kacyPrice),
      Big(pool.price_usd)
    )

    if (apr.lte(0)) continue

    pools.push({ ...pool, apr })
  }

  const poolsSorted = pools.sort((a, b) => b.apr.toNumber() - a.apr.toNumber())

  return poolsSorted
}

export const useFarmPools = ({
  month,
  period_selected,
  price_period,
  chainIn,
  poolIdList,
  kacyPrice
}: UseAPRList) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['farm-pools', chainIn, kacyPrice],
    queryFn: async () =>
      fetchFarmPools({
        month,
        period_selected,
        price_period,
        chainIn,
        poolIdList,
        kacyPrice
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: !!kacyPrice
  })
}
