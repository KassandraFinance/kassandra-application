import useSWR from 'swr'
import { request } from 'graphql-request'
import { gql } from 'graphql-request'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'

export type GetManagerPoolsType = {
  pools: {
    id: string
    logo: string | null
    name: string
    chain: {
      logo: string
    }
  }[]
}

function useManagerPools(userWalletAddress: string) {
  const GET_MANAGER_POOLS = gql`
    query ($manager: String) {
      pools(where: { manager: $manager }) {
        id
        name
        logo
        chain {
          logo
        }
      }
    }
  `

  const { data, error, isValidating } = useSWR<GetManagerPoolsType>(
    userWalletAddress.length > 0
      ? [GET_MANAGER_POOLS, userWalletAddress]
      : null,
    (query, userWalletAddress) =>
      request(BACKEND_KASSANDRA, query, {
        manager: userWalletAddress
      })
  )
  return {
    managerPools: data,
    isValidating,
    isError: error
  }
}

export default useManagerPools
