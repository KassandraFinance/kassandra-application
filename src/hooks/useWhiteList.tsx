import { useMemo } from 'react'
import { JsonRpcProvider, Contract, Network } from 'ethers'

import { networks } from '@/constants/tokenAddresses'
import KassandraWhitelistAbi from '@/constants/abi/KassandraWhitelist.json'

function whiteListContract(contract: Contract) {
  const tokensWhitelist = async (): Promise<string[]> => {
    const value = await contract.getTokens(0, 100)

    return value
  }

  const countTokens = async (): Promise<bigint> => {
    const value = await contract.countTokens()

    return value
  }

  return {
    tokensWhitelist,
    countTokens
  }
}

export function whiteList(networkId: number) {
  const networkInfo = networks[networkId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })

  const contract = new Contract(
    networkInfo.whiteList,
    KassandraWhitelistAbi,
    readProvider
  )

  return whiteListContract(contract)
}

const useWhiteList = (networkId: number) => {
  return useMemo(() => {
    const networkInfo = networks[networkId]
    const network = new Network(networkInfo.chainName, networkInfo.chainId)
    const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
      staticNetwork: network
    })
    const contract = new Contract(
      networkInfo.whiteList,
      KassandraWhitelistAbi,
      readProvider
    )

    return whiteListContract(contract)
  }, [networkId])
}

export default useWhiteList
