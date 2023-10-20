import { useQuery } from '@tanstack/react-query'

type IReferralProps = {
  hash: string
}

export const referralCommission = async (
  walletAddress: string | undefined
): Promise<IReferralProps | undefined> => {
  if (!walletAddress) return

  const res = await fetch(`/api/referral/encrypt/${walletAddress}`).then(res =>
    res.json()
  )

  return res
}

export const useReferralCommission = (walletAddress: string | undefined) => {
  return useQuery({
    queryKey: ['referral-commission', walletAddress],
    queryFn: async () => referralCommission(walletAddress),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5
  })
}
