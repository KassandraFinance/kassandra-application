/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import React from 'react'
import Big from 'big.js'
import BigNumber from 'bn.js'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'

import { networks } from '@/constants/tokenAddresses'

import web3, { EventSubscribe } from '@/utils/web3'
import { TransactionCallback } from '@/utils/txWait'

import { useAppSelector } from '@/store/hooks'

import StakingContract from '@/constants/abi/Staking.json'


import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers'
import useTransaction from './useTransaction'


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

const useStaking = (address: string, chainId = 43113) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const rpcURL = networks[43114].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

  const [contract, setContractEthers] = React.useState({
    send: new Contract(address, StakingContract, readProvider),
    read: new Contract(address, StakingContract, readProvider)
  })

  React.useEffect(() => {
    if (!wallet) return

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
    const balance = async (pid: number, walletAddress: string) => {
      const value = await contract.read.balanceOf(pid, walletAddress)
      return new BigNumber(value)
    }

    const availableWithdraw = async (pid: number, walletAddress: string) => {
      const value: string = await contract.read.availableWithdraw(pid, walletAddress)
      console.log(value)
      return Big(value)
    }

    // Write functions
    // const castVote = async (proposalId: number, vote: boolean) => {
    //   try {
    //     const tx = await contract.send.castVote(proposalId, vote)
    //     await txNotification(tx)
    //   } catch (error) {
    //     transactionErrors(error)
    //   }
    // }

    return {
      balance,
      availableWithdraw
    }
  }, [contract])
}

export default useStaking
