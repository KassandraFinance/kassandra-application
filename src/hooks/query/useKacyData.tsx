import { useQuery } from '@tanstack/react-query'

type KacyDataType = {
  kacyPercentage: number
  kacyPrice: number
  marketCap: number
  supply: number
}

export const fetchKacyData = async (): Promise<KacyDataType> => {
  const res = await fetch('/api/overview').then(res => res.json())

  return res
}

export const useKacyData = () => {
  return useQuery({
    queryKey: ['kacy-data'],
    queryFn: async () => {
      return fetchKacyData()
    },
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
