import { ContractTransactionResponse, isError } from 'ethers'

import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { ToastInfo, ToastSuccess } from '@/components/Toastify/toast'

export type MessageType = {
  pending?: string
  error?: string
  sucess?: string
}

export type CallbacksType = {
  onSuccess?: () => Promise<void> | void
  onFail?: () => Promise<void> | void
}

// Devemos criar uma lista de messagens de erros

const useTransaction = () => {
  const dispatch = useAppDispatch()

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
    error: unknown,
    onFail?: () => Promise<void> | void
  ) {
    if (onFail) {
      await onFail()
    }

    if (isError(error, 'ACTION_REJECTED')) {
      dispatch(setModalAlertText({ errorText: 'Transaction cancelled' }))
      return error.code
    }

    if (isError(error, 'CALL_EXCEPTION')) {
      dispatch(setModalAlertText({ errorText: 'Transaction reverted' }))
      return error.code
    }

    if (isError(error, 'INSUFFICIENT_FUNDS')) {
      dispatch(setModalAlertText({ errorText: '' }))
      return error.code
    }

    if (isError(error, 'NONCE_EXPIRED')) {
      dispatch(setModalAlertText({ errorText: '' }))
      return error.code
    }

    dispatch(setModalAlertText({ errorText: 'error unknown' }))
    return
  }

  return {
    txNotification,
    transactionErrors
  }
}

export default useTransaction
