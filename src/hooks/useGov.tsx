import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers'

import Governance from '@/constants/abi/Governance.json'
import { networks } from '@/constants/tokenAddresses'

import useTxStatus from './useTxStatus'
import useTransactionError from './useTransactionError'

import approved from '@assets/notificationStatus/approved.svg'
import cancelled from '@assets/notificationStatus/cancelled.svg'
import executed from '@assets/notificationStatus/executed.svg'
import failed from '@assets/notificationStatus/failed.svg'
import queued from '@assets/notificationStatus/queued.svg'
import votingOpen from '@assets/notificationStatus/voting-open.svg'

const valuesStateProposal = [
  ['Active', 'Pending', queued, '0'],
  ['Active', 'Voting Open', votingOpen, '1'],
  ['Failed', 'Canceled', cancelled, '2'],
  ['Failed', 'Defeated', failed, '3'],
  ['Succeeded', 'Succeeded', approved, '4'],
  ['Succeeded', 'Queued', queued, '5'],
  ['Failed', 'Expired', failed, '6'],
  ['Succeeded', 'Executed', executed, '7']
]

const useGov = (address: string) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification } = useTxStatus()
  const { transactionErrors } = useTransactionError()

  const rpcURL = networks[43114].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

  const [contract, setContract] = React.useState({
    send: new Contract(address, Governance, readProvider),
    read: new Contract(address, Governance, readProvider)
  })

  React.useEffect(() => {
    if (!wallet) return

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContract({
        send: new Contract(address, Governance, signer),
        read: new Contract(address, Governance, readProvider)
      })
    }

    signContranct()
  }, [wallet])

  return React.useMemo(() => {
    // Read functions
    const proposalCount = async () => {
      const value = await contract.read.proposalCount()
      return value
    }

    const proposals = async (id: number) => {
      const value = await contract.read.proposals(id)
      return value
    }

    const stateProposals = async (id: number) => {
      const value = await contract.read.state(id)
      return valuesStateProposal[value]
    }

    const pastEvents = async (eventName: string, block: number) => {
      const events = await contract.read.getPastEvents(eventName, {
        fromBlock: block - 1,
        toBlock: block
      })

      return events
    }

    // Write functions
    const castVote = async (proposalId: number, vote: boolean) => {
      try {
        const tx = await contract.send.castVote(proposalId, vote)
        await txNotification(tx)
      } catch (error) {
        transactionErrors(error)
      }
    }

    return {
      proposalCount,
      proposals,
      stateProposals,
      pastEvents,

      castVote
    }
  }, [contract])
}

export default useGov
