import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import {
  BrowserProvider,
  Contract,
  ContractTransactionReceipt,
  ContractTransactionResponse,
  ErrorCode,
  JsonRpcProvider
} from 'ethers'
import { WalletState } from '@web3-onboard/core'

import { networks } from '@/constants/tokenAddresses'
import KassandraController from '@/constants/abi/KassandraController.json'

import useTransaction, {
  CallbacksType,
  ContractInfo,
  MessageType
} from './useTransaction'

type ContractType = {
  read: Contract
  send: Contract
}

type FeesPercentages = {
  feesToManager: string
  feesToReferral: string
}

function managePoolFunctions(
  controller: ContractType,
  txNotification: (
    tx: ContractTransactionResponse,
    message?: MessageType | undefined,
    callbacks?: CallbacksType | undefined
  ) => Promise<ContractTransactionReceipt | null>,
  transactionErrors: (
    error: unknown,
    contractInfo: ContractInfo,
    onFail?: (() => void | Promise<void>) | undefined
  ) => Promise<ErrorCode | undefined>
) {
  // Read functions
  const getAumFeesToManagerAndKassandra = async (
    userWalletAddress: string
  ): Promise<{
    feesToManager: string
    feesToKassandra: string
  }> => {
    return await controller.read.withdrawCollectedManagementFees.staticCall({
      from: userWalletAddress
    })
  }

  const getJoinFees = async (): Promise<{
    feesToManager: string
    feesToReferral: string
  }> => {
    return await controller.read.getJoinFees.staticCall()
  }

  const getManagerCandidate = async (): Promise<string> => {
    return await controller.read.getManagerCandidate.staticCall()
  }

  // Write functions
  const withdrawAumFees = async (onSuccess: () => void): Promise<void> => {
    try {
      const tx = await controller.send.withdrawCollectedManagementFees()
      // Check transaction receipt and send notification if success
      await txNotification(tx, {}, { onSuccess: onSuccess })
    } catch (error) {
      // check error and send error modal
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'getJoinFees'
      }
      transactionErrors(error, contractInfo)
    }
  }

  const setJoinFees = async (
    feesPercentages: FeesPercentages,
    transactionText: MessageType,
    onSuccess?: () => void,
    onFail?: () => void
  ) => {
    try {
      const tx = await controller.send.setJoinFees(feesPercentages)

      await txNotification(tx, transactionText, { onSuccess, onFail })
    } catch (error) {
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'setJoinFees'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const addAllowedAddresses = async (
    investorsList: string[],
    onSuccess: () => void,
    onFail: () => void,
    transactionText: MessageType
  ) => {
    try {
      const tx = await controller.send.addAllowedAddresses(investorsList)
      // Check transaction receipt and send notification if success
      await txNotification(tx, transactionText, { onSuccess, onFail })
    } catch (error) {
      console.log(error)
      // check error and send error modal
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'addAllowedAddresses'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const removeAllowedAddresses = async (
    investorsList: string[],
    onSuccess: () => void,
    onFail: () => void,
    transactionText: MessageType
  ) => {
    try {
      const tx = await controller.send.removeAllowedAddresses(investorsList)
      // Check transaction receipt and send notification if success
      await txNotification(tx, transactionText, { onSuccess, onFail })
    } catch (error) {
      console.log(error)
      // check error and send error modal
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'removeAllowedAddresses'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const setPublicPool = async (
    onSuccess: () => void,
    onFail: () => void,
    transactionText: {
      success?: string
    }
  ) => {
    try {
      const tx = await controller.send.setPublicPool()
      // Check transaction receipt and send notification if success
      await txNotification(
        tx,
        { sucess: transactionText.success },
        { onSuccess, onFail }
      )
    } catch (error) {
      console.log(error)
      // check error and send error modal
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'setPublicPool'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const setStrategist = async (
    address: string,
    transactionText: {
      success?: string
    },
    onSuccess?: () => void,
    onFail?: () => void
  ) => {
    try {
      const tx = await controller.send.setStrategist(address)
      await txNotification(
        tx,
        { sucess: transactionText.success },
        { onSuccess, onFail }
      )
    } catch (error) {
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'setStrategist'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const claimOwnership = async (
    transactionText?: {
      success: string
    },
    onSuccess?: () => void,
    onFail?: () => void
  ) => {
    try {
      const tx = await controller.send.claimOwnership()
      await txNotification(
        tx,
        { sucess: transactionText?.success },
        { onSuccess, onFail }
      )
    } catch (error) {
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'claimOwnership'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const transferOwnership = async (
    address: string,
    transactionText: {
      success?: string
    },
    onSuccess?: () => void,
    onFail?: () => void
  ) => {
    try {
      const tx = await controller.send.transferOwnership(address)
      await txNotification(
        tx,
        { sucess: transactionText.success },
        { onSuccess, onFail }
      )
    } catch (error) {
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'transferOwnership'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const rebalancePool = async (
    currentDateAdded: number,
    periodSelected: number,
    assetsAddresses: string[],
    weightsList: string[],

    onSuccess: () => void,
    onFail: () => void
  ) => {
    try {
      const tx = await controller.send.updateWeightsGradually(
        currentDateAdded,
        periodSelected,
        assetsAddresses,
        weightsList
      )
      // Check transaction receipt and send notification if success
      await txNotification(tx, {}, { onFail, onSuccess })
    } catch (error) {
      console.log(error)
      // check error and send error modal
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'rebalancePool'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const removeToken = async (
    selectedTokenAddress: string,
    userWalletAddress: string,
    onSuccess: () => void,
    onFail: () => void
  ) => {
    try {
      const tx = await controller.send.removeToken(
        selectedTokenAddress,
        userWalletAddress,
        userWalletAddress
      )
      // Check transaction receipt and send notification if success
      await txNotification(tx, {}, { onSuccess, onFail })
    } catch (error) {
      console.log(error)
      // check error and send error modal
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'removeToken'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  const addToken = async (
    selectedTokenAddress: string,
    allocation: string,
    tokenToAddBalance: string,
    userWalletAddress: string,
    onSuccess: () => void,
    onFail: () => void
  ) => {
    try {
      const tx = await controller.send.addToken(
        selectedTokenAddress,
        allocation,
        tokenToAddBalance,
        userWalletAddress,
        userWalletAddress
      )
      // Check transaction receipt and send notification if success
      await txNotification(tx, {}, { onSuccess, onFail })
    } catch (error) {
      console.log(error)
      // check error and send error modal
      const contractInfo = {
        contractName: 'KassandraController',
        functionName: 'addToken'
      }
      transactionErrors(error, contractInfo, onFail)
    }
  }

  return {
    getAumFeesToManagerAndKassandra,
    withdrawAumFees,
    addAllowedAddresses,
    removeAllowedAddresses,
    setPublicPool,
    rebalancePool,
    removeToken,
    addToken,
    getManagerCandidate,
    transferOwnership,
    setJoinFees,
    setStrategist,
    claimOwnership,
    getJoinFees
  }
}

const useManagePoolController = (
  controllerAddress: string,
  rpcURL = networks[137].rpc
) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const readProvider = new JsonRpcProvider(rpcURL)

  const [contract, setContract] = React.useState({
    send: new Contract(controllerAddress, KassandraController, readProvider),
    read: new Contract(controllerAddress, KassandraController, readProvider)
  })

  React.useEffect(() => {
    if (!wallet?.provider) {
      return
    }

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContract({
        send: new Contract(controllerAddress, KassandraController, signer),
        read: new Contract(controllerAddress, KassandraController, readProvider)
      })
    }

    signContranct()
  }, [controllerAddress, rpcURL, wallet])

  return React.useMemo(() => {
    return managePoolFunctions(contract, txNotification, transactionErrors)
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

export const managePoolController = async (
  address: string,
  rpcUrl = networks[137].rpc,
  params: ParamsType
) => {
  const readProvider = new JsonRpcProvider(rpcUrl)
  const contract: ContractType = {
    read: new Contract(address, KassandraController, readProvider),
    send: new Contract(address, KassandraController, readProvider)
  }

  async function signContranct(sendProvider: BrowserProvider) {
    const signer = await sendProvider.getSigner()

    contract.send = new Contract(address, KassandraController, signer)
  }

  if (params.wallet?.provider) {
    const sendProvider = new BrowserProvider(params.wallet.provider)

    await signContranct(sendProvider)
  }

  return managePoolFunctions(
    contract,
    params.txNotification,
    params.transactionErrors
  )
}

export default useManagePoolController
