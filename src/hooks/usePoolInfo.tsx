import useSWR from 'swr'
import { request } from 'graphql-request'
import { gql } from 'graphql-request'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'

export type GetPoolInfoType = {
  pools: {
    address: string,
    chainId: number,
    chain_id: number,
    id: string,
    logo: string,
    name: string,
    poolId: null,
    pool_version: number,
    symbol: string,
    total_value_locked_usd: string,
    vault: string,
    chain: {
      addressWrapped: string,
      blockExplorerUrl: string,
      chainName: string,
      id: string,
      logo: string,
      nativeTokenDecimals: number,
      nativeTokenName: string,
      nativeTokenSymbol: string,
      secondsPerBlock: number,
      rpcUrls: string[]
    },
    underlying_assets_addresses: string[]
  }[]
}

function usePoolInfo(userWalletAddress: string, poolId: string) {
  const GET_INFO_POOL = gql`
    query ($manager: String, $id: ID) {
      pools(where: { manager: $manager, id: $id }) {
        id
        address
        vault
        chain_id
        chainId
        logo
        pool_version
        chain {
          id
          logo
          chainName
          nativeTokenName
          nativeTokenSymbol
          nativeTokenDecimals
          rpcUrls
          blockExplorerUrl
          secondsPerBlock
          addressWrapped
        }
        name
        symbol
        poolId
        total_value_locked_usd
        underlying_assets_addresses
      }
    }
  `
  const { data, error, isValidating } = useSWR<GetPoolInfoType>(
    userWalletAddress.length > 0 && poolId
      ? [GET_INFO_POOL, userWalletAddress, poolId]
      : null,
    (query, userWalletAddress) =>
      request(BACKEND_KASSANDRA, query, {
        manager: userWalletAddress,
        id: poolId
      })
  )
  return {
    poolInfo: data,
    isValidating,
    isError: error
  }
}

export default usePoolInfo