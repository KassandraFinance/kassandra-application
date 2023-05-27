import React from 'react'
import { BrowserProvider, JsonRpcProvider, Contract, MaxUint256 } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import useTransaction, {
  MessageType,
  CallbacksType
} from '@/hooks/useTransaction'
import ERC20ABI from '@/constants/abi/ERC20.json'
import { networks } from '@/constants/tokenAddresses'

type ContractType = {
  read: Contract
  send: Contract
}

function ERC20Contract(contract: ContractType) {
  const { txNotification, transactionErrors } = useTransaction()
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
  ): Promise<number> => {
    try {
      const tx = await contract.send.approve(spenderAddress, MaxUint256)
      const status = await txNotification(tx, message, callbacks)
      return status
    } catch (error) {
      transactionErrors(error, callbacks?.onFail)
      return 0
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
  // const { txNotification, transactionErrors } = useTransaction()

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
    return ERC20Contract(contract)
  }, [contract])
}

export const ERC20 = (addresses: string, rpcUrl = networks[137].rpc) => {
  const provider = new JsonRpcProvider(rpcUrl)
  const contract: ContractType = {
    read: new Contract(addresses, ERC20ABI, provider),
    send: new Contract(addresses, ERC20ABI, provider)
  }

  return ERC20Contract(contract)
}

export default useERC20
