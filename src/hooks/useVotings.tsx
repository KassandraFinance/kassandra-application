import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider, JsonRpcProvider, Contract, Network } from 'ethers'

import useTransaction from './useTransaction'

import StakingContract from '../constants/abi/Staking.json'
import { networks } from '@/constants/tokenAddresses'

const useVotingPower = (address: string, chainId = 43114) => {
  // Get user wallet
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  // Set read rpc
  const networkInfo = networks[chainId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const readProvider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })

  const [contract, setContract] = React.useState({
    send: new Contract(address, StakingContract, readProvider),
    read: new Contract(address, StakingContract, readProvider)
  })

  React.useEffect(() => {
    // if user is connected set write provider
    if (!wallet) return

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContract({
        send: new Contract(address, StakingContract, signer),
        read: new Contract(address, StakingContract, readProvider)
      })
    }

    signContranct()
  }, [wallet, address])

  return React.useMemo(() => {
    // Read functions
    const totalVotes = async () => {
      const value: string = await contract.read.getTotalVotes()
      return BigInt(value)
    }

    const currentVotes = async (
      walletAddres: string | string[] | undefined
    ) => {
      if (walletAddres) {
        const value: string = await contract.read.getCurrentVotes(walletAddres)
        return BigInt(value)
      }
    }

    const getPriorVotes = async (
      walletAddress: string,
      startBlockNumber: string
    ) => {
      const value = await contract.read.getPriorVotes(
        walletAddress,
        startBlockNumber
      )
      return value
    }

    // Write functions
    const delegateVote = async (pid: number, address: string) => {
      try {
        const tx = await contract.send.delegate(pid, address)
        // Check transaction receipt and send notification if success
        await txNotification(tx)
      } catch (error) {
        // check error and send error modal
        const contractInfo = {
          contractName: 'StakingContract',
          functionName: 'delegateVote'
        }
        transactionErrors(error, contractInfo)
      }
    }

    const delegateAllVotes = async (address: string) => {
      try {
        const tx = await contract.send.delegateAll(address)
        await txNotification(tx)
      } catch (error) {
        const contractInfo = {
          contractName: 'StakingContract',
          functionName: 'delegateAllVotes'
        }
        transactionErrors(error, contractInfo)
      }
    }

    return {
      currentVotes,
      totalVotes,
      getPriorVotes,

      delegateVote,
      delegateAllVotes
    }
  }, [contract])
}

export default useVotingPower
