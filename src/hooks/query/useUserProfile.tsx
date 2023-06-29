import { useQuery } from '@tanstack/react-query'

type UseUserProfileProps = {
  address: string
}

type UserProfileType = {
  description: string | null
  discord: string | null
  image: string | null
  nickname: string | null
  telegram: string | null
  twitter: string | null
  website: string | null
  isNFT: boolean | null
  nft: {
    contractType: string | null
    collectionName: string | null
    symbol: string | null
    tokenAddress: string | null
    tokenId: string | null
    chain: string | null
    nftName: string | null
    nftDescription: string | null
  }
}

export const fetchUserProfile = async ({
  address
}: UseUserProfileProps): Promise<UserProfileType> => {
  const res = await fetch(`/api/profile/${address}`).then(res => res.json())

  return res
}

export const useUserProfile = ({ address }: UseUserProfileProps) => {
  return useQuery({
    queryKey: ['user-profile', address],
    queryFn: async () => {
      return fetchUserProfile({ address })
    }
  })
}
