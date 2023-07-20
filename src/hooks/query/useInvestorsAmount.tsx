import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseInvestorsAmountProps = {
  id: string
  investorsAddresses: string | string[]
}

export const fetchInvestorsAmount = async ({
  id,
  investorsAddresses
}: UseInvestorsAmountProps) => {
  return kassandraClient
    .InvestorsAmount({ id, investorsAddresses })
    .then(res => res.investors)
}

export const useInvestorsAmount = ({
  id,
  investorsAddresses
}: UseInvestorsAmountProps) => {
  return useQuery({
    queryKey: ['investors-amount', id, investorsAddresses],
    queryFn: async () =>
      fetchInvestorsAmount({
        id,
        investorsAddresses
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
