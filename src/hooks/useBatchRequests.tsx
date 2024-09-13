import { Contract } from 'ethers'

import { NATIVE_ADDRESS } from '@/constants/tokenAddresses'
import ERC20 from '@/constants/abi/ERC20.json'
import { handleInstanceFallbackProvider } from '@/utils/provider'

const useBatchRequests = (networkId: number) => {
  const readProvider = handleInstanceFallbackProvider(networkId)

  // Batch request to get user balance from an array of tokens
  const balances = async (userWalletAddress: string, addresses: string[]) => {
    try {
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
    } catch {
      return []
    }
  }

  return {
    balances
  }
}

export default useBatchRequests
