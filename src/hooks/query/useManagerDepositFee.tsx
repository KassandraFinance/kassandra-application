import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseManagerDepositFeeProps = {
  poolId: string
  id: string
}

export const fetchManagerDepositFee = async ({
  poolId,
  id
}: UseManagerDepositFeeProps) => {
  return kassandraClient
    .ManagerDepositFee({ poolId, id })
    .then(res => res.manager)
}

export const useManagerDepositFee = ({
  poolId,
  id
}: UseManagerDepositFeeProps) => {
  return useQuery({
    queryKey: ['manager-deposit-fee', poolId, id],
    queryFn: async () =>
      fetchManagerDepositFee({
        poolId,
        id
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: id.length > 0
  })
}
