import React from 'react'
import { Contract, JsonRpcProvider, Network } from 'ethers'

import Pool from '../constants/abi/Pool.json'

import { networks } from '@/constants/tokenAddresses'

function PoolContract(contract: Contract) {
  // const currentTokens = async (): Promise<string[]> => {
  //   const value = await contract.getCurrentTokens()
  //   return value
  // }

  const denormalizedWeight = async (tokenAddressIn: string) => {
    const value = await contract.getDenormalizedWeight(tokenAddressIn)

    return BigInt(value)
  }

  const totalDenormalizedWeight = async () => {
    const value = await contract.getTotalDenormalizedWeight()
    return BigInt(value)
  }

  const calcPoolOutGivenSingleIn = async (
    tokenBalanceIn: bigint,
    tokenWeightIn: bigint,
    poolSupply: bigint,
    totalWeight: bigint,
    tokenAmountIn: bigint,
    swapFee: bigint
  ) => {
    const value = await contract.calcPoolOutGivenSingleIn(
      tokenBalanceIn,
      tokenWeightIn,
      poolSupply,
      totalWeight,
      tokenAmountIn,
      swapFee
    )

    return value
  }

  // const calcSingleInGivenPoolOut = async (
  //   tokenBalanceIn: string,
  //   tokenWeightIn: string,
  //   poolSupply: string,
  //   totalWeight: string,
  //   tokenAmountOut: string,
  //   swapFee: string
  // ) => {
  //   const value = await contract.calcSingleInGivenPoolOut(
  //     tokenBalanceIn,
  //     tokenWeightIn,
  //     poolSupply,
  //     totalWeight,
  //     tokenAmountOut,
  //     swapFee
  //   )

  //   return value
  // }

  const calcSingleOutGivenPoolIn = async (
    tokenBalanceOut: bigint,
    tokenWeightOut: bigint,
    poolSupply: bigint,
    totalWeight: bigint,
    poolAmountIn: bigint,
    swapFee: bigint,
    exitFee: bigint
  ) => {
    const value = await contract.calcSingleOutGivenPoolIn(
      tokenBalanceOut,
      tokenWeightOut,
      poolSupply,
      totalWeight,
      poolAmountIn,
      swapFee,
      exitFee
    )

    return value
  }

  // const calcOutGivenIn = async (
  //   tokenBalanceIn: string,
  //   tokenWeightIn: string,
  //   tokenBalanceOut: string,
  //   tokenWeightOut: string,
  //   tokenAmountIn: string,
  //   swapFee: string
  // ) => {
  //   const value = await contract.calcOutGivenIn(
  //     tokenBalanceIn,
  //     tokenWeightIn,
  //     tokenBalanceOut,
  //     tokenWeightOut,
  //     tokenAmountIn,
  //     swapFee
  //   )

  //   return value
  // }

  // const calcInGivenOut = async (
  //   tokenBalanceIn: string,
  //   tokenWeightIn: string,
  //   tokenBalanceOut: string,
  //   tokenWeightOut: string,
  //   tokenAmountOut: string,
  //   swapFee: string
  // ) => {
  //   const value = await contract.calcInGivenOut(
  //     tokenBalanceIn,
  //     tokenWeightIn,
  //     tokenBalanceOut,
  //     tokenWeightOut,
  //     tokenAmountOut,
  //     swapFee
  //   )

  //   return value
  // }

  const swapFee = async () => {
    const value = await contract.getSwapFee()
    return BigInt(value)
  }

  const exitFee = async () => {
    const value: bigint = await contract.getExitFee()
    return value
  }

  // const normalizedWeight = async (address: string) => {
  //   const value = await contract.getNormalizedWeight(address)
  //   return (
  //     Number(
  //       Big(value).div(Big(10).pow(Big(14)))
  //     ) / 100
  //   )
  // }

  const balance = async (address: string) => {
    const value = await contract.getBalance(address)
    return BigInt(value)
  }

  return {
    balance,
    calcPoolOutGivenSingleIn,
    swapFee,
    exitFee,
    totalDenormalizedWeight,
    denormalizedWeight,
    calcSingleOutGivenPoolIn
    // calcOutGivenIn,
    // calcInGivenOut,
    // calcSingleInGivenPoolOut,
    // currentTokens,
    // normalizedWeight,
  }
}

const usePoolContract = (address: string, chainId = 43114) => {
  const networkInfo = networks[chainId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })

  const [contract, setContract] = React.useState(
    new Contract(address, Pool, readProvider)
  )

  React.useEffect(() => {
    setContract(new Contract(address, Pool, readProvider))
  }, [address])

  return React.useMemo(() => {
    return PoolContract(contract)
  }, [contract])
}

export const corePoolContract = (address: string, chainId = 43114) => {
  const networkInfo = networks[chainId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })
  const contract = new Contract(address, Pool, readProvider)

  return PoolContract(contract)
}

export default usePoolContract
