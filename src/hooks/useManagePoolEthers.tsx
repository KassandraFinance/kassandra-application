import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider, Contract, JsonRpcProvider } from 'ethers'

import { networks } from '@/constants/tokenAddresses'

import KassandraController from '@/constants/abi/KassandraController.json'

import useTransaction from './useTransaction'

const useManagePool = (controllerAddress: string, chainId = 137) => {
  // Get user wallet
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const rpcURL = networks[chainId].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

  const [controller, setController] = React.useState({
    send: new Contract(controllerAddress, KassandraController, readProvider),
    read: new Contract(controllerAddress, KassandraController, readProvider)
  })

  React.useEffect(() => {
    // if user is connected set write provider
    if (!wallet) return

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setController({
        send: new Contract(controllerAddress, KassandraController, signer),
        read: new Contract(controllerAddress, KassandraController, readProvider)
      })
    }

    signContranct()
  }, [wallet, controllerAddress])

  return React.useMemo(() => {
    // Read functions
    const getAumFeesToManagerAndKassandra = async (): Promise<{
      feesToManager: string
      feesToKassandra: string
    }> => {
      return await controller.read.withdrawCollectedManagementFees.staticCall({
        from: wallet?.accounts[0].address
      })
    }

    const withdrawAumFees = async (onSuccess: () => void): Promise<void> => {
      try {
        const tx = await controller.send.withdrawCollectedManagementFees()
        // Check transaction receipt and send notification if success
        await txNotification(tx, {}, { onSuccess: onSuccess })
      } catch (error) {
        // check error and send error modal
        transactionErrors(error)
      }
    }

    // Write functions
    const addAllowedAddresses = async (
      investorsList: string[],
      onSuccess: () => void,
      onFail: () => void,
      transactionText: {
        success?: string
      }
    ) => {
      try {
        const tx = await controller.send.addAllowedAddresses(investorsList)
        // Check transaction receipt and send notification if success
        await txNotification(
          tx,
          { sucess: transactionText.success },
          { onSuccess, onFail }
        )
      } catch (error) {
        console.log(error)
        // check error and send error modal
        transactionErrors(error, onFail)
      }
    }

    const removeAllowedAddresses = async (
      investorsList: string[],
      onSuccess: () => void,
      onFail: () => void,
      transactionText: {
        success?: string
      }
    ) => {
      try {
        const tx = await controller.send.removeAllowedAddresses(investorsList)
        // Check transaction receipt and send notification if success
        await txNotification(
          tx,
          { sucess: transactionText.success },
          { onSuccess, onFail }
        )
      } catch (error) {
        console.log(error)
        // check error and send error modal
        transactionErrors(error, onFail)
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
        transactionErrors(error, onFail)
      }
    }

    return {
      getAumFeesToManagerAndKassandra,
      withdrawAumFees,
      addAllowedAddresses,
      removeAllowedAddresses,
      setPublicPool
    }
  }, [controller])
}

export default useManagePool
