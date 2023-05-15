/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import React from 'react'
import Big from 'big.js'
import BigNumber from 'bn.js'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'

import { networks } from '@/constants/tokenAddresses'

import web3, { EventSubscribe } from '../utils/web3'
import { TransactionCallback } from '../utils/txWait'

import { useAppSelector } from '../store/hooks'

import StakingContract from '../constants/abi/Staking.json'

interface Events {
  MinterChanged: EventSubscribe
  DelegateChanged: EventSubscribe
  DelegateVotesChanged: EventSubscribe
  Transfer: EventSubscribe
  Approval: EventSubscribe
  NewPool: EventSubscribe
  RewardAdded: EventSubscribe
  Staked: EventSubscribe
  Unstaking: EventSubscribe
  Withdrawn: EventSubscribe
  RewardPaid: EventSubscribe
  RewardsDurationUpdated: EventSubscribe
  Recovered: EventSubscribe
}

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

const useStakingContract = (address: string, chainId = 43114) => {
  const _web3 = new Web3(networks[chainId].rpc)
  const { userWalletAddress, chainId: _chainId } = useAppSelector(
    state => state
  )
  const [contract, setContract] = React.useState(
    new _web3.eth.Contract(StakingContract as unknown as AbiItem, address)
  )
  const [contractSend, setContractSend] = React.useState(
    new web3.eth.Contract(StakingContract as unknown as AbiItem, address)
  )

  React.useEffect(() => {
    setContract(
      new _web3.eth.Contract(StakingContract as unknown as AbiItem, address)
    )
    setContractSend(
      new web3.eth.Contract(StakingContract as unknown as AbiItem, address)
    )
  }, [address])

  return React.useMemo(() => {
    /* EVENT */

    const events: Events = contract.events

    /* SEND */

    const stake = async (
      pid: number,
      amount: BigNumber,
      delegatee: string,
      callback: TransactionCallback
    ) => {
      await contractSend.methods
        .stake(pid, amount, userWalletAddress, delegatee)
        .send(
          {
            from: userWalletAddress,
            maxPriorityFeePerGas: _chainId === 137 ? 30e9 : 2.5e9
          },
          callback
        )
    }

    const unstake = async (pid: number, callback: TransactionCallback) => {
      await contractSend.methods.unstake(pid).send(
        {
          from: userWalletAddress,
          maxPriorityFeePerGas: _chainId === 137 ? 30e9 : 2.5e9
        },
        callback
      )
    }

    const cancelUnstake = async (
      pid: number,
      callback: TransactionCallback
    ) => {
      await contractSend.methods
        .cancelUnstake(pid)
        .send({ from: userWalletAddress }, callback)
    }

    const getReward = async (pid: number, callback: TransactionCallback) => {
      await contractSend.methods.getReward(pid).send(
        {
          from: userWalletAddress,
          maxPriorityFeePerGas: _chainId === 137 ? 30e9 : 2.5e9
        },
        callback
      )
    }

    const withdraw = async (
      pid: number,
      amount: BigNumber,
      callback: TransactionCallback
    ) => {
      await contractSend.methods.withdraw(pid, amount).send(
        {
          from: userWalletAddress,
          maxPriorityFeePerGas: _chainId === 137 ? 30e9 : 2.5e9
        },
        callback
      )
    }

    // ======== Read Contract ========

    const getUserInfo = async (
      pid: number,
      walletAddress: string | string[] | undefined,
      stakingContract: string,
      _chainId: number
    ) => {
      const _web3 = new Web3(networks[_chainId].rpc)
      const _contract = new _web3.eth.Contract(
        StakingContract as unknown as AbiItem,
        stakingContract
      )
      const value = await _contract.methods.userInfo(pid, walletAddress).call()
      return value
    }

    const availableWithdraw = async (pid: number, walletAddress: string) => {
      const value: string = await contract.methods
        .availableWithdraw(pid, walletAddress)
        .call()
      return Big(value)
    }

    const balance = async (pid: number, walletAddress: string) => {
      const value: string = await contract.methods
        .balanceOf(pid, walletAddress)
        .call()
      return new BigNumber(value)
    }

    const earned = async (pid: number, walletAddress: string) => {
      const value: string = await contract.methods
        .earned(pid, walletAddress)
        .call()
      return new BigNumber(value)
    }

    const lockUntil = async (pid: number, walletAddress: string) => {
      const value = await contract.methods.lockUntil(pid, walletAddress).call()
      return parseInt(value)
    }

    const poolInfo = async (pid: number) => {
      const value: PoolInfo = await contract.methods.poolInfo(pid).call()
      return value
    }

    const stakedUntil = async (pid: number, walletAddress: string) => {
      const value: string = await contract.methods
        .stakedUntil(pid, walletAddress)
        .call()
      return value
    }

    const unstaking = async (pid: number, walletAddress: string) => {
      const value: boolean = await contract.methods
        .unstaking(pid, walletAddress)
        .call()
      return value
    }

    const withdrawable = async (pid: number, walletAddress: string) => {
      const value: boolean = await contract.methods
        .withdrawable(pid, walletAddress)
        .call()
      return value
    }

    const userInfo = async (
      pid: number,
      walletAddress: string | string[] | undefined
    ) => {
      const value = await contract.methods.userInfo(pid, walletAddress).call()
      return value
    }

    const earnedMultChain = async (
      pid: number,
      walletAddress: string,
      stakingContractAddress: string,
      chainId: number
    ) => {
      const _web3 = new Web3(networks[chainId].rpc)
      const contract = new _web3.eth.Contract(
        StakingContract as unknown as AbiItem,
        stakingContractAddress
      )
      const value: string = await contract.methods
        .earned(pid, walletAddress)
        .call()
      return new BigNumber(value)
    }

    return {
      events,

      stake,
      unstake,
      cancelUnstake,
      getReward,
      withdraw,

      availableWithdraw,
      balance,
      earned,
      lockUntil,
      poolInfo,
      stakedUntil,
      unstaking,
      withdrawable,
      earnedMultChain,

      userInfo,
      getUserInfo
    }
  }, [contract, userWalletAddress])
}

export default useStakingContract
