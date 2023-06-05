import { JsonRpcProvider, Contract } from 'ethers'

import { networks } from '@/constants/tokenAddresses'
import KassandraWhitelistAbi from '@/constants/abi/KassandraWhitelist.json'

const useWhiteList = (networkId: number) => {
  const rpcURL = networks[networkId].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

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
