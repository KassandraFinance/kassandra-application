/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import BigNumber from 'bn.js'
import Web3 from 'web3'

import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'

import web3, { EventSubscribe } from '../utils/web3'
import ERC20ABI from '../constants/abi/ERC20.json'

import { TransactionCallback } from '../utils/txWait'

interface Events {
  Transfer: EventSubscribe
  Approval: EventSubscribe
}

function ERC20Contract(contract: Contract) {
  /* EVENT */

  const events: Events = contract.events

  /* SEND */

  const approve = async (
    spenderAddress: string,
    userWalletAddress: string,
    callback: TransactionCallback
  ): Promise<boolean> => {
    const chainId = await web3.eth.getChainId()
    try {
      const gasPrice = await web3.eth.getGasPrice()
      return contract.methods
        .approve(spenderAddress, web3.utils.toTwosComplement(-1))
        .send(
          {
            from: userWalletAddress,
            gasPrice: gasPrice,
            maxPriorityFeePerGas: chainId === 137 ? 30e9 : 2.5e9
          },
          callback
        )
    } catch (e) {
      console.log('error', e)
      return false
    }
  }

  /* VIEWS */

  const name = async (): Promise<string> => {
    const value = await contract.methods.name().call()
    return value
  }

  const symbol = async (): Promise<string> => {
    const value = await contract.methods.symbol().call()
    return value
  }

  const decimals = async (): Promise<BigNumber> => {
    const value = await contract.methods.decimals().call()
    return new BigNumber(value)
  }

  const allowance = async (
    contractAddress: string,
    userWalletAddress: string
  ): Promise<string> => {
    try {
      const allowance: string = await contract.methods
        .allowance(userWalletAddress, contractAddress)
        .call()
      return allowance
    } catch (e) {
      return '0'
    }
  }

  const balance = async (userAddress: string): Promise<BigNumber> => {
    try {
      const balance: string = await contract.methods
        .balanceOf(userAddress)
        .call()
      return new BigNumber(balance)
    } catch (e) {
      return new BigNumber(0)
    }
  }

  const totalSupply = async (): Promise<BigNumber> => {
    try {
      const supply: string = await contract.methods.totalSupply().call()
      return new BigNumber(supply)
    } catch (e) {
      return new BigNumber(0)
    }
  }

  return {
    events,

    approve,

    name,
    symbol,
    decimals,
    allowance,
    balance,
    totalSupply
  }
}

const useERC20Contract = (address: string, _web3: Web3 = web3) => {
  const [contract, setContract] = React.useState(
    new _web3.eth.Contract(ERC20ABI as unknown as AbiItem, address)
  )

  React.useEffect(() => {
    setContract(new _web3.eth.Contract(ERC20ABI as unknown as AbiItem, address))
  }, [address])

  return React.useMemo(() => {
    return ERC20Contract(contract)
  }, [contract])
}

export const ERC20 = (address: string, _web3: Web3 = web3) => {
  const contract = new _web3.eth.Contract(
    ERC20ABI as unknown as AbiItem,
    address
  )
  return ERC20Contract(contract)
}

export default useERC20Contract
