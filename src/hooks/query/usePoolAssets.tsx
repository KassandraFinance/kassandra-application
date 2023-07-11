import { useQuery } from '@tanstack/react-query'

import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'

import { kassandraClient } from '@/graphQLClients'

type UsePoolAssetsProps = {
  id: string
}

export const fetchPoolAssets = async ({ id }: UsePoolAssetsProps) => {
  return kassandraClient.PoolAssets({ id }).then(res => {
    const data = res.pool
    let underlying_assets
    if (data) {
      if (data.pool_version === 2) {
        underlying_assets = getWeightsNormalizedV2(
          data.weight_goals,
          data.underlying_assets
        )
      } else {
        underlying_assets = data.underlying_assets
      }
    }

    return underlying_assets
  })
}

export const usePoolAssets = ({ id }: UsePoolAssetsProps) => {
  return useQuery({
    queryKey: ['pool-assets', id],
    queryFn: async () => fetchPoolAssets({ id }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
