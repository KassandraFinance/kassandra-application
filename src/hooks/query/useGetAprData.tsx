import { handleGetAPR } from '@/templates/StakeFarm/utils'
import { networks } from '@/constants/tokenAddresses'
import { useQuery } from '@tanstack/react-query'
import Big from 'big.js'
import { ZeroAddress } from 'ethers'

type Pools = {
  chain_id: number
  address: string
  pool_id?: number | null
  price_usd: string
}

interface FetchAprDataProps {
  pools?: Pools[]
  kacyPrice: Big
}

export const fetchAprData = async ({
  pools,
  kacyPrice
}: FetchAprDataProps): Promise<Record<string, Big>> => {
  if (!pools) return {}
  const aprList: Record<string, Big> = {}

  for (const pool of pools) {
    if (!pool.pool_id) continue
    const network = networks[pool.chain_id]
    const apr = await handleGetAPR(
      network.stakingContract ?? ZeroAddress,
      pool.chain_id,
      pool.pool_id,
      kacyPrice,
      Big(pool.price_usd)
    )
    aprList[pool.address] = apr
  }
  return aprList
}

export const useGetAprData = ({ pools, kacyPrice }: FetchAprDataProps) => {
  return useQuery({
    queryKey: ['apr-data', pools, kacyPrice],
    queryFn: async () =>
      fetchAprData({
        pools,
        kacyPrice
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
