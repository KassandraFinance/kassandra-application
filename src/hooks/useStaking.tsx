import React from 'react'
import Big from 'big.js'

import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'

import StakingContract from '@/constants/abi/Staking.json'

import useTransaction, { CallbacksType, MessageType } from './useTransaction'

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

const useStaking = (address: string, chainId = 43114) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const rpcURL = networks[chainId].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

  const [contract, setContractEthers] = React.useState({
    send: new Contract(address, StakingContract, readProvider),
    read: new Contract(address, StakingContract, readProvider)
  })

  React.useEffect(() => {
    if (!wallet?.provider) return

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContractEthers({
        send: new Contract(address, StakingContract, signer),
        read: new Contract(address, StakingContract, readProvider)
      })
    }

    signContranct()
  }, [wallet])

  return React.useMemo(() => {
    // Read functions
    const getUserInfo = async (
      pid: number,
      walletAddress: string,
      address: string,
      chainId: number
    ) => {
      const provider = new JsonRpcProvider(networks[chainId].rpc)
      const infoContract = new Contract(address, StakingContract, provider)
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
      const value: boolean = await contract.read.withdrawable(
        pid,
        walletAddress
      )
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
      const provider = new JsonRpcProvider(networks[chainId].rpc)
      const infoContract = new Contract(address, StakingContract, provider)
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
      try {
        const tx = await contract.send.stake(pid, amount, delegatee, delegatee)
        await txNotification(tx, message, callbacks)
      } catch (error) {
        transactionErrors(error, callbacks?.onFail)
      }
    }

    const unstake = async (
      pid: number,
      message?: MessageType,
      callbacks?: CallbacksType
    ) => {
      try {
        const tx = await contract.send.unstake(pid)
        await txNotification(tx, message, callbacks)
      } catch (error) {
        transactionErrors(error, callbacks?.onFail)
      }
    }

    const cancelUnstake = async (
      pid: number,
      message?: MessageType,
      callbacks?: CallbacksType
    ) => {
      try {
        const tx = await contract.send.cancelUnstake(pid)
        await txNotification(tx, message, callbacks)
      } catch (error) {
        transactionErrors(error, callbacks?.onFail)
      }
    }

    const getReward = async (
      pid: number,
      message?: MessageType,
      callbacks?: CallbacksType
    ) => {
      try {
        const tx = await contract.send.getReward(pid)
        await txNotification(tx, message, callbacks)
      } catch (error) {
        transactionErrors(error, callbacks?.onFail)
      }
    }

    const withdraw = async (
      pid: number,
      amount: string,
      message?: MessageType,
      callbacks?: CallbacksType
    ) => {
      try {
        const tx = await contract.send.withdraw(pid, amount)
        await txNotification(tx, message, callbacks)
      } catch (error) {
        transactionErrors(error, callbacks?.onFail)
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
  }, [contract])
}

export default useStaking
