import React from 'react'
import { networks } from '@/constants/tokenAddresses'
import { Contract, JsonRpcProvider } from 'ethers'
import Big from 'big.js'

import YieldYak from '../constants/abi/YieldYak.json'

export const YieldYakContract = (chainId = 43114) => {
  const rpcURL = networks[chainId].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

  const getDecimals = async (address: string) => {
    const contract = new Contract(address, YieldYak, readProvider)

    const value = await contract.depositToken()
    const decimals = new Contract(value, YieldYak, readProvider)
    // const decimals = new web3.eth.Contract(
    //   YieldYak as unknown as AbiItem,
    //   value
    // )

    const decimalsFinal = await decimals.decimals()
    return decimalsFinal
  }

  const convertBalanceYRTtoWrap = async (
    amountYRT: string,
    addressYRT: string
  ) => {
    const contract = new Contract(addressYRT, YieldYak, readProvider)

    const value = await contract.getDepositTokensForShares(amountYRT)

    return Big(value.toString())
  }

  const convertBalanceWrappedToYRT = async (
    amountWrapped: string,
    addressYRT: string
  ) => {
    const contract = new Contract(addressYRT, YieldYak, readProvider)

    const value = await contract.getSharesForDepositTokens(amountWrapped)
    return Big(value.toString())
  }

  return {
    convertBalanceYRTtoWrap,
    convertBalanceWrappedToYRT,
    getDecimals
  }
}

const useYieldYak = () => {
  return React.useMemo(() => {
    return YieldYakContract()
  }, [])
}

export default useYieldYak
