import { JsonRpcProvider, formatUnits } from 'ethers'

import { networks } from '@/constants/tokenAddresses'
import Big from 'big.js'

const useGasFee = (networkId: number) => {
  const rpcURL = networks[networkId || 137].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

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
