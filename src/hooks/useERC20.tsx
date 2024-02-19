import React from 'react'
import {
  BrowserProvider,
  JsonRpcProvider,
  Contract,
  MaxUint256,
  ContractTransactionResponse,
  ErrorCode,
  ContractTransactionReceipt
} from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import { WalletState } from '@web3-onboard/core'

import useTransaction, {
  MessageType,
  CallbacksType,
  ContractInfo
} from '@/hooks/useTransaction'
import ERC20ABI from '@/constants/abi/ERC20.json'
import { networks } from '@/constants/tokenAddresses'

type ContractType = {
  read: Contract
  send: Contract
}

function ERC20Contract(
  contract: ContractType,
  txNotification?: (
    tx: ContractTransactionResponse,
    message?: MessageType | undefined,
    callbacks?: CallbacksType | undefined
  ) => Promise<ContractTransactionReceipt | null>,
  transactionErrors?: (
    error: unknown,
    contractInfo: ContractInfo,
    onFail?: (() => void | Promise<void>) | undefined
  ) => Promise<ErrorCode | undefined>
) {
  // Read
  const name = async (): Promise<string> => {
    const value = await contract.read.name()
    return value
  }

  const symbol = async (): Promise<string> => {
    const value = await contract.read.symbol()
    return value
  }

  const decimals = async (): Promise<bigint> => {
    const value = await contract.read.decimals()
    return value
  }

  const allowance = async (
    contractAddress: string,
    userWalletAddress: string
  ): Promise<string> => {
    const value = await contract.read.allowance(
      userWalletAddress,
      contractAddress
    )

    return value
  }

  const balance = async (userAddress: string): Promise<string> => {
    const value = await contract.read.balanceOf(userAddress)
    return value
  }

  const totalSupply = async (): Promise<string> => {
    const value: string = await contract.read.totalSupply()
    return value
  }

  const approve = async (
    spenderAddress: string,
    message?: MessageType,
    callbacks?: CallbacksType
  ): Promise<ContractTransactionReceipt | null> => {
    if (!txNotification || !transactionErrors) return null

    try {
      const tx = await contract.send.approve(spenderAddress, MaxUint256)
      const receipt = await txNotification(tx, message, callbacks)
      return receipt
    } catch (error) {
      const contractInfo = {
        contractName: 'kacyOFT',
        functionName: 'sendFrom'
      }
      transactionErrors(error, contractInfo, callbacks?.onFail)
      return null
    }
  }

  return {
    name,
    symbol,
    decimals,
    allowance,
    balance,
    totalSupply,

    approve
  }
}

const useERC20 = (address: string, rpcURL = networks[137].rpc) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const readProvider = new JsonRpcProvider(rpcURL)

  const [contract, setContract] = React.useState({
    send: new Contract(address, ERC20ABI, readProvider),
    read: new Contract(address, ERC20ABI, readProvider)
  })

  React.useEffect(() => {
    if (!wallet?.provider) {
      return
    }

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContract({
        send: new Contract(address, ERC20ABI, signer),
        read: new Contract(address, ERC20ABI, readProvider)
      })
    }

    signContranct()
  }, [address, rpcURL, wallet])

  return React.useMemo(() => {
    return ERC20Contract(contract, txNotification, transactionErrors)
  }, [contract])
}
type ParamsType = {
  wallet: WalletState | null
  txNotification: (
    tx: ContractTransactionResponse,
    message?: MessageType | undefined,
    callbacks?: CallbacksType | undefined
  ) => Promise<ContractTransactionReceipt | null>
  transactionErrors: (
    error: unknown,
    contractInfo: ContractInfo,
    onFail?: (() => void | Promise<void>) | undefined
  ) => Promise<ErrorCode | undefined>
}

export const ERC20 = async (
  address: string,
  rpcUrl = networks[137].rpc,
  params?: ParamsType
) => {
  const readProvider = new JsonRpcProvider(rpcUrl)
  const contract: ContractType = {
    read: new Contract(address, ERC20ABI, readProvider),
    send: new Contract(address, ERC20ABI, readProvider)
  }

  async function signContranct(sendProvider: BrowserProvider) {
    const signer = await sendProvider.getSigner()

    contract.send = new Contract(address, ERC20ABI, signer)
  }

  if (params?.wallet?.provider) {
    const sendProvider = new BrowserProvider(params.wallet.provider)

    await signContranct(sendProvider)
  }

  return ERC20Contract(
    contract,
    params?.txNotification,
    params?.transactionErrors
  )
}

export default useERC20
