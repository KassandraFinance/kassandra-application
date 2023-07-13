import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

type FetchUserProfileType = {
  address: string
}

type UseUserProfileProps = {
  address: string | undefined
}

export type UserProfileType = {
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
}: FetchUserProfileType): Promise<UserProfileType> => {
  const res = await fetch(`/api/profile/${address}`).then(res => res.json())

  return res
}

export const useUserProfile = ({ address }: UseUserProfileProps) => {
  const id = address ? getAddress(address) : ''
  return useQuery({
    queryKey: ['user-profile', id],
    queryFn: async () => fetchUserProfile({ address: id }),
    enabled: id.length > 0
  })
}
