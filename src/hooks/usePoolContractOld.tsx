/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import React from 'react'
import { AbiItem } from 'web3-utils'
import BigNumber from 'bn.js'
import { Contract } from 'web3-eth-contract'

import web3, { EventSubscribe } from '../utils/web3'
import Pool from '../constants/abi/Pool.json'

import { underlyingAssetsInfo } from '../store/reducers/pool'

interface Events {
  NewSwapFee: EventSubscribe
  WeightChanged: EventSubscribe
  LogSwap: EventSubscribe
  LogJoin: EventSubscribe
  LogExit: EventSubscribe
  LogCall: EventSubscribe
}

function PoolContract(contract: Contract) {
  /* EVENT */

  const events: Events = contract.events

  /* VIEWS */

  const currentTokens = async (): Promise<string[]> => {
    const value = await contract.methods.getCurrentTokens().call()
    return value
  }

  const denormalizedWeight = async (tokenAddressIn: string) => {
    const value = await contract.methods
      .getDenormalizedWeight(tokenAddressIn)
      .call()
    return new BigNumber(value)
  }

  const totalDenormalizedWeight = async () => {
    const value = await contract.methods.getTotalDenormalizedWeight().call()
    return new BigNumber(value)
  }

  const calcPoolOutGivenSingleIn = async (
    tokenBalanceIn: BigNumber,
    tokenWeightIn: BigNumber,
    poolSupply: BigNumber,
    totalWeight: BigNumber,
    tokenAmountIn: BigNumber,
    swapFee: BigNumber
  ) => {
    const value = await contract.methods
      .calcPoolOutGivenSingleIn(
        tokenBalanceIn,
        tokenWeightIn,
        poolSupply,
        totalWeight,
        tokenAmountIn,
        swapFee
      )
      .call()
    return new BigNumber(value)
  }

  const calcSingleInGivenPoolOut = async (
    tokenBalanceIn: BigNumber,
    tokenWeightIn: BigNumber,
    poolSupply: BigNumber,
    totalWeight: BigNumber,
    tokenAmountOut: BigNumber,
    swapFee: BigNumber
  ) => {
    const value = await contract.methods
      .calcSingleInGivenPoolOut(
        tokenBalanceIn,
        tokenWeightIn,
        poolSupply,
        totalWeight,
        tokenAmountOut,
        swapFee
      )
      .call()
    return new BigNumber(value)
  }

  const calcSingleOutGivenPoolIn = async (
    tokenBalanceOut: BigNumber,
    tokenWeightOut: BigNumber,
    poolSupply: BigNumber,
    totalWeight: BigNumber,
    poolAmountIn: BigNumber,
    swapFee: BigNumber,
    exitFee: BigNumber
  ) => {
    const value = await contract.methods
      .calcSingleOutGivenPoolIn(
        tokenBalanceOut,
        tokenWeightOut,
        poolSupply,
        totalWeight,
        poolAmountIn,
        swapFee,
        exitFee
      )
      .call()
    return new BigNumber(value)
  }

  const calcOutGivenIn = async (
    tokenBalanceIn: BigNumber,
    tokenWeightIn: BigNumber,
    tokenBalanceOut: BigNumber,
    tokenWeightOut: BigNumber,
    tokenAmountIn: BigNumber,
    swapFee: BigNumber
  ) => {
    const value = await contract.methods
      .calcOutGivenIn(
        tokenBalanceIn,
        tokenWeightIn,
        tokenBalanceOut,
        tokenWeightOut,
        tokenAmountIn,
        swapFee
      )
      .call()
    return new BigNumber(value)
  }

  const calcInGivenOut = async (
    tokenBalanceIn: BigNumber,
    tokenWeightIn: BigNumber,
    tokenBalanceOut: BigNumber,
    tokenWeightOut: BigNumber,
    tokenAmountOut: BigNumber,
    swapFee: BigNumber
  ) => {
    const value = await contract.methods
      .calcInGivenOut(
        tokenBalanceIn,
        tokenWeightIn,
        tokenBalanceOut,
        tokenWeightOut,
        tokenAmountOut,
        swapFee
      )
      .call()
    return new BigNumber(value)
  }

  const swapFee = async () => {
    const value = await contract.methods.getSwapFee().call()
    return new BigNumber(value)
  }

  const exitFee = async () => {
    const value = await contract.methods.getExitFee().call()
    return new BigNumber(value)
  }

  const normalizedWeight = async (address: string) => {
    const value = await contract.methods.getNormalizedWeight(address).call()
    return (
      Number(
        new BigNumber(value).div(new BigNumber(10).pow(new BigNumber(14)))
      ) / 100
    )
  }

  const balance = async (address: string) => {
    const value = await contract.methods.getBalance(address).call()
    return new BigNumber(value)
  }

  return {
    events,

    balance,
    calcOutGivenIn,
    calcInGivenOut,
    calcPoolOutGivenSingleIn,
    calcSingleInGivenPoolOut,
    calcSingleOutGivenPoolIn,
    currentTokens,
    denormalizedWeight,
    normalizedWeight,
    swapFee,
    exitFee,
    totalDenormalizedWeight
  }
}

const usePoolContract = (address: string) => {
  const [contract, setContract] = React.useState(
    new web3.eth.Contract(Pool as unknown as AbiItem, address)
  )

  React.useEffect(() => {
    setContract(new web3.eth.Contract(Pool as unknown as AbiItem, address))
  }, [address])

  return React.useMemo(() => {
    return PoolContract(contract)
  }, [contract])
}

export const corePoolContract = (address: string) => {
  const contract = new web3.eth.Contract(Pool as unknown as AbiItem, address)
  return PoolContract(contract)
}

export default usePoolContract
