import Big from 'big.js'
import { formatUnits } from 'ethers'

import { handleInstanceFallbackProvider } from '@/utils/provider'

const useGasFee = (networkId: number) => {
  const readProvider = handleInstanceFallbackProvider(networkId)

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
