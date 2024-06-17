import React from 'react'
import Big from 'big.js'
import { WalletState } from '@web3-onboard/core'

import {
  BrowserProvider,
  Contract,
  ZeroAddress,
  ContractTransactionResponse,
  ContractTransactionReceipt,
  ErrorCode
} from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import StakingContract from '@/constants/abi/Staking.json'
import { handleInstanceFallbackProvider } from '@/utils/provider'

import useTransaction, {
  CallbacksType,
  ContractInfo,
  MessageType
} from './useTransaction'

export interface PoolInfo {
  pid?: number
  stakingToken: string // address
  depositedAmount: string // uint256
  lastUpdateTime: string // uint256
  rewardPerTokenStored: string // uint256
  rewardsDuration: string // uint256
  rewardRate: string // uint256
  periodFinish: string // uint256
  lockPeriod: string // uint256
  withdrawDelay: string // uint256
  vestingPeriod: string // uint256
  votingMultiplier: string // uint256
}

type ContractType = {
  read: Contract
  send?: Contract
}

export function stakingContract(
  contract: ContractType,
  txNotification?: (
    tx: ContractTransactionResponse,
    message?: MessageType | undefined,
    callbacks?: CallbacksType | undefined
  ) => Promise<ContractTransactionReceipt | null>,
  transactionErrors?: (
    error: unknown,
    contractInfo?: ContractInfo,
    onFail?: (() => void | Promise<void>) | undefined
  ) => Promise<ErrorCode | undefined>
) {
  const getUserInfo = async (
    pid: number,
    walletAddress: string,
    address: string,
    chainId: number
  ) => {
    const readProvider = handleInstanceFallbackProvider(chainId)

    const infoContract = new Contract(address, StakingContract, readProvider)
    const value = await infoContract.userInfo(pid, walletAddress)
    return value
  }

  const availableWithdraw = async (pid: number, walletAddress: string) => {
    const value: string = await contract.read.availableWithdraw(
      pid,
      walletAddress
    )
    return Big(value)
  }

  const balance = async (pid: number, walletAddress: string) => {
    const value: bigint = await contract.read.balanceOf(pid, walletAddress)
    return value
  }

  const earned = async (pid: number, walletAddress: string) => {
    const value: bigint = await contract.read.earned(pid, walletAddress)
    return value
  }

  const lockUntil = async (pid: number, walletAddress: string) => {
    const value = await contract.read.lockUntil(pid, walletAddress)
    return parseInt(value)
  }

  const poolInfo = async (pid: number) => {
    const value: PoolInfo = await contract.read.poolInfo(pid)
    return value
  }

  const stakedUntil = async (pid: number, walletAddress: string) => {
    const value: string = await contract.read.stakedUntil(pid, walletAddress)
    return value
  }

  const unstaking = async (pid: number, walletAddress: string) => {
    const value: boolean = await contract.read.unstaking(pid, walletAddress)
    return value
  }

  const withdrawable = async (pid: number, walletAddress: string) => {
    const value: boolean = await contract.read.withdrawable(pid, walletAddress)
    return value
  }

  const userInfo = async (
    pid: number,
    walletAddress: string | string[] | undefined
  ) => {
    const value = await contract.read.userInfo(pid, walletAddress)

    return value
  }

  const earnedMultChain = async (
    pid: number,
    walletAddress: string,
    address: string,
    chainId: number
  ) => {
    const readProvider = handleInstanceFallbackProvider(chainId)

    const infoContract = new Contract(address, StakingContract, readProvider)
    const value: bigint = await infoContract.earned(pid, walletAddress)
    return value
  }

  const stake = async (
    pid: number,
    amount: string,
    delegatee: string,
    message?: MessageType,
    callbacks?: CallbacksType
  ) => {
    if (!txNotification || !transactionErrors || !contract?.send) return null

    try {
      const tx = await contract.send.stake(pid, amount, ZeroAddress, delegatee)
      await txNotification(tx, message, callbacks)
    } catch (error) {
      const contractInfo = {
        contractName: 'StakingContract',
        functionName: 'stake'
      }
      transactionErrors(error, contractInfo, callbacks?.onFail)
    }
  }

  const unstake = async (
    pid: number,
    message?: MessageType,
    callbacks?: CallbacksType
  ) => {
    if (!txNotification || !transactionErrors || !contract?.send) return null

    try {
      const tx = await contract.send.unstake(pid)
      await txNotification(tx, message, callbacks)
    } catch (error) {
      const contractInfo = {
        contractName: 'StakingContract',
        functionName: 'unstake'
      }
      transactionErrors(error, contractInfo, callbacks?.onFail)
    }
  }

  const cancelUnstake = async (
    pid: number,
    message?: MessageType,
    callbacks?: CallbacksType
  ) => {
    if (!txNotification || !transactionErrors || !contract?.send) return null

    try {
      const tx = await contract.send.cancelUnstake(pid)
      await txNotification(tx, message, callbacks)
    } catch (error) {
      const contractInfo = {
        contractName: 'StakingContract',
        functionName: 'cancelUnstake'
      }
      transactionErrors(error, contractInfo, callbacks?.onFail)
    }
  }

  const getReward = async (
    pid: number,
    message?: MessageType,
    callbacks?: CallbacksType
  ) => {
    if (!txNotification || !transactionErrors || !contract?.send) return null

    try {
      const tx = await contract.send.getReward(pid)
      await txNotification(tx, message, callbacks)
    } catch (error) {
      const contractInfo = {
        contractName: 'StakingContract',
        functionName: 'getReward'
      }
      transactionErrors(error, contractInfo, callbacks?.onFail)
    }
  }

  const withdraw = async (
    pid: number,
    amount: string,
    message?: MessageType,
    callbacks?: CallbacksType
  ) => {
    if (!txNotification || !transactionErrors || !contract?.send) return null

    try {
      const tx = await contract.send.withdraw(pid, amount)
      await txNotification(tx, message, callbacks)
    } catch (error) {
      const contractInfo = {
        contractName: 'StakingContract',
        functionName: 'withdraw'
      }
      transactionErrors(error, contractInfo, callbacks?.onFail)
    }
  }

  return {
    getUserInfo,
    availableWithdraw,
    balance,
    earned,
    lockUntil,
    poolInfo,
    stakedUntil,
    unstaking,
    withdrawable,
    userInfo,
    earnedMultChain,

    stake,
    unstake,
    cancelUnstake,
    getReward,
    withdraw
  }
}

const useStaking = (address: string, chainId = 43114) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const provider = handleInstanceFallbackProvider(chainId)

  const [contract, setContractEthers] = React.useState({
    send: new Contract(address, StakingContract, provider),
    read: new Contract(address, StakingContract, provider)
  })

  React.useEffect(() => {
    if (!wallet?.provider) return

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContractEthers({
        send: new Contract(address, StakingContract, signer),
        read: new Contract(address, StakingContract, provider)
      })
    }

    signContranct()
  }, [wallet])

  return React.useMemo(() => {
    return stakingContract(contract, txNotification, transactionErrors)
  }, [contract])
}

type ParamsType = {
  wallet?: WalletState | null
  txNotification?: (
    tx: ContractTransactionResponse,
    message?: MessageType | undefined,
    callbacks?: CallbacksType | undefined
  ) => Promise<ContractTransactionReceipt | null>
  transactionErrors?: (
    error: unknown,
    contractInfo?: ContractInfo,
    onFail?: (() => void | Promise<void>) | undefined
  ) => Promise<ErrorCode | undefined>
}

export const staking = async (
  address: string,
  chainId = 137,
  params?: ParamsType
) => {
  const readProvider = handleInstanceFallbackProvider(chainId)

  const contract: ContractType = {
    read: new Contract(address, StakingContract, readProvider),
    send: new Contract(address, StakingContract, readProvider)
  }

  async function signContranct(sendProvider: BrowserProvider) {
    const signer = await sendProvider.getSigner()

    contract.send = new Contract(address, StakingContract, signer)
  }

  if (params?.wallet?.provider) {
    const sendProvider = new BrowserProvider(params.wallet.provider)

    await signContranct(sendProvider)
  }

  return stakingContract(
    contract,
    params?.txNotification,
    params?.transactionErrors
  )
}

export default useStaking
