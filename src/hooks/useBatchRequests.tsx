import { JsonRpcProvider, Contract, Network } from 'ethers'

import { NATIVE_ADDRESS, networks } from '@/constants/tokenAddresses'
import ERC20 from '@/constants/abi/ERC20.json'

const useBatchRequests = (networkId: number) => {
  const networkInfo = networks[networkId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })

  // Batch request to get user balance from an array of tokens
  const balances = async (userWalletAddress: string, addresses: string[]) => {
    const promises = []
    for (const address of addresses) {
      if (address === NATIVE_ADDRESS) {
        promises.push(readProvider.getBalance(userWalletAddress))
      } else {
        const contract = new Contract(address, ERC20, readProvider)
        promises.push(contract.balanceOf(userWalletAddress))
      }
    }

    const results = await Promise.all(promises)
    return results
  }

  return {
    balances
  }
}

export default useBatchRequests
