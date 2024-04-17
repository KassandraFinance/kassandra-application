import React from 'react'
import { JsonRpcProvider, Contract, Network } from 'ethers'

import PrivateInvestors from '@/constants/abi/PrivateInvestors.json'
import { networks } from '@/constants/tokenAddresses'

const usePrivateInvestors = (contractAddress: string, chainId = 137) => {
  // Set read rpc
  const networkInfo = networks[chainId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })

  const [contract, setContract] = React.useState(
    new Contract(contractAddress, PrivateInvestors, readProvider)
  )

  React.useEffect(() => {
    setContract(new Contract(contractAddress, PrivateInvestors, readProvider))
  }, [contractAddress, chainId])

  return React.useMemo(() => {
    // Read functions
    const privateAddresses = async (poolAddress: string) => {
      const addresses = await contract.getInvestors(poolAddress, 0, 100)
      return addresses
    }

    return {
      privateAddresses
    }
  }, [contract])
}

export default usePrivateInvestors
