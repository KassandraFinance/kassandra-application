import { JsonRpcProvider, Contract } from 'ethers'

import ManagedPool from '@/constants/abi/ManagedPool.json'

const useManagedPool = (address: string, rpcURL: string) => {
  const readProvider = new JsonRpcProvider(rpcURL)
  const contract = new Contract(address, ManagedPool, readProvider)

  // Read functions
  const totalSupply = async () => {
    const value: string = await contract.getActualSupply()
    return BigInt(value)
  }

  return {
    totalSupply
  }
}

export default useManagedPool
