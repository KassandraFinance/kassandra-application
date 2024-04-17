import { JsonRpcProvider, Network, formatUnits } from 'ethers'

import { networks } from '@/constants/tokenAddresses'
import Big from 'big.js'

const useGasFee = (networkId: number) => {
  const networkInfo = networks[networkId || 137]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })

  const gasFee = async (number: number) => {
    const estimateGasUsed = Big(number)
    const feeData = await readProvider.getFeeData()
    const mul = estimateGasUsed.mul(
      Big(feeData?.gasPrice?.toString() || 0)
        .mul(13)
        .div(10)
    )
    const value = formatUnits(BigInt(parseInt(mul.toString())), 'ether')

    return value
  }

  return {
    gasFee
  }
}

export default useGasFee
