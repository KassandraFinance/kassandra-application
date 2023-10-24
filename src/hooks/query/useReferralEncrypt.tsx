import { useQuery } from '@tanstack/react-query'

type IReferralProps = {
  hash: string | undefined
}

export const referralEncrypt = async (
  walletAddress: string | undefined
): Promise<IReferralProps> => {
  const res = await fetch(`/api/hash/encrypt/${walletAddress}`).then(res =>
    res.json()
  )

  return res
}

export const useReferralEncrypt = (walletAddress: string | undefined) => {
  return useQuery({
    queryKey: ['referral-commission-encrypt', walletAddress],
    queryFn: async () => referralEncrypt(walletAddress),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    enabled: !!walletAddress
  })
}
