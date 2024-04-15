import { JsonRpcProvider, Contract, Network } from 'ethers'

import { networks } from '@/constants/tokenAddresses'
import KassandraWhitelistAbi from '@/constants/abi/KassandraWhitelist.json'

const useWhiteList = (networkId: number) => {
  const networkInfo = networks[networkId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })
  const read = new Contract(
    networks[networkId].whiteList,
    KassandraWhitelistAbi,
    readProvider
  )

  const tokensWhitelist = async (): Promise<string[]> => {
    const value = await read.getTokens(0, 100)

    return value
  }

  return {
    tokensWhitelist
  }
}

export default useWhiteList
