import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { kassandraClient } from '@/graphQLClients'

type UseBrokersFeesType = {
  id: string
  poolId: string
  depositsTimestamp: number
  rewardsTimestamp: number
}

type UseBrokersFeesProps = {
  id: string | undefined
  poolId: string
  depositsTimestamp: number
  rewardsTimestamp: number
}

export const fetchBrokersFees = async ({
  id,
  poolId,
  depositsTimestamp,
  rewardsTimestamp
}: UseBrokersFeesType) => {
  return kassandraClient
    .BrokersFees({ id, poolId, depositsTimestamp, rewardsTimestamp })
    .then(res => res.manager)
}

export const useBrokersFees = ({
  id,
  poolId,
  depositsTimestamp,
  rewardsTimestamp
}: UseBrokersFeesProps) => {
  const user = id ? getAddress(id) : ''
  return useQuery({
    queryKey: [
      'brokers-fees',
      poolId,
      user,
      depositsTimestamp,
      rewardsTimestamp
    ],
    queryFn: async () =>
      fetchBrokersFees({
        id: user,
        poolId,
        depositsTimestamp,
        rewardsTimestamp
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: user.length > 0
  })
}
