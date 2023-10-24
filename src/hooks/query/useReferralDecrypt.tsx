import { useQuery } from '@tanstack/react-query'

type IReferraldecryptReturn = {
  value: string
}

type IReferralDecryptProps = {
  hash?: string
  enabled: boolean
}

export const referralDecrypt = async (
  hash: string | undefined
): Promise<IReferraldecryptReturn> => {
  const res = await fetch(`/api/hash/decrypt/${hash}`).then(res => res.json())

  return res
}

export const useReferralDecrypt = ({
  hash,
  enabled = true
}: IReferralDecryptProps) => {
  return useQuery({
    queryKey: ['referral-commission-decrypt', hash, enabled],
    queryFn: async () => referralDecrypt(hash),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    enabled
  })
}
