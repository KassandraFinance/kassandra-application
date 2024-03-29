import { JsonRpcProvider, Contract } from 'ethers'

import { NATIVE_ADDRESS, networks } from '@/constants/tokenAddresses'
import ERC20 from '@/constants/abi/ERC20.json'

const useBatchRequests = (networkId: number) => {
  const rpcURL = networks[networkId].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

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
