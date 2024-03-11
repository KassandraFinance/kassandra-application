import * as Sentry from '@sentry/nextjs'
import { useConnectWallet } from '@web3-onboard/react'
import { ContractTransactionResponse, JsonRpcProvider, isError } from 'ethers'

import { networks } from '@/constants/tokenAddresses'

import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { ToastInfo, ToastSuccess } from '@/components/Toastify/toast'
import { KassandraError } from '@/utils/KassandraError'

export type MessageType = {
  pending?: string
  error?: string
  sucess?: string
}

export type ContractInfo = {
  contractName: string
  functionName: string
}

export type CallbacksType = {
  onSuccess?: () => Promise<void> | void
  onFail?: () => Promise<void> | void
}

// Devemos criar uma lista de messagens de erros

const useTransaction = () => {
  const dispatch = useAppDispatch()
  const [{ wallet }] = useConnectWallet()

  async function txNotification(
    tx: ContractTransactionResponse,
    message?: MessageType,
    callbacks?: CallbacksType
  ) {
    // Send pending notifications
    ToastInfo(message?.pending ?? 'Transaction pending')

    // Await for transaction receipt
    const receipt = await tx.wait()

    if (receipt?.blockNumber && receipt?.status === 1) {
      // If status code 1 then send success toast
      ToastSuccess(message?.sucess ?? 'Transaction success')

      // call function on success
      if (callbacks?.onSuccess) {
        await callbacks.onSuccess()
      }

      return receipt
    } else {
      // If status code 1 or null send transaction failed modal
      dispatch(
        setModalAlertText({ errorText: message?.error ?? 'Transaction failed' })
      )

      // call function on fail
      if (callbacks?.onFail) {
        await callbacks.onFail()
      }

      return receipt
    }
  }

  async function transactionErrors(
    error: any,
    contractInfo?: ContractInfo,
    onFail?: () => Promise<void> | void
  ) {
    if (onFail) {
      await onFail()
    }

    if (error?.transaction) {
      const chainId = Number(wallet?.chains[0].id ?? '0')
      const readProvider = new JsonRpcProvider(networks[chainId].rpc)

      const transactionData: string = error.transaction.data.toString()
      const currentBlock = await readProvider.getBlockNumber()

      const MAX_SIZE_ALLOWED_SENTRY = 8000
      if (transactionData.length >= MAX_SIZE_ALLOWED_SENTRY) {
        Sentry.getCurrentScope().addAttachment({
          filename: 'transactionData.txt',
          data: transactionData.slice(
            MAX_SIZE_ALLOWED_SENTRY,
            transactionData.length
          ),
          contentType: 'text/plain'
        })

        Sentry.setContext('transaction', {
          firstTransactionData: transactionData.slice(
            0,
            MAX_SIZE_ALLOWED_SENTRY
          ),
          blockNumber: currentBlock
        })

        Sentry.getCurrentScope().clearAttachments()
      } else {
        Sentry.setContext('transaction', {
          data: transactionData,
          blockNumber: currentBlock
        })
      }

      Sentry.captureException(error, {
        tags: {
          contractName: contractInfo?.contractName,
          functionName: contractInfo?.functionName,
          userAddress: error.transaction.from,
          chainId: chainId
        }
      })
    }

    if (error instanceof KassandraError) {
      dispatch(
        setModalAlertText({
          errorText: error.message
        })
      )
      return
    }

    if (isError(error, 'ACTION_REJECTED')) {
      dispatch(setModalAlertText({ errorText: 'Transaction cancelled' }))
      return error.code
    }

    dispatch(
      setModalAlertText({
        errorText:
          'Sorry, something went wrong with your transaction. Please copy the transaction data below and send it to us on Discord so we can assist you',
        transactionData: error?.transaction?.data.toString()
      })
    )
    return
  }

  return {
    txNotification,
    transactionErrors
  }
}

export default useTransaction
