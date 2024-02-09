import { useQuery } from '@tanstack/react-query'

type LatestBlock = {
  id: string
}

export const fetchLatestBlock = async ({ id }: LatestBlock) => {
  const response = await fetch(`/api/subgraph/${id}`).then(res => res.json())
  return response
}

export const useLatestBlock = ({ id }: LatestBlock) => {
  return useQuery({
    queryKey: ['latest-block', id],
    queryFn: async () => fetchLatestBlock({ id }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: !!id
  })
}
