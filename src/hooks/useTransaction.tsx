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
    error: any,
    onFail?: () => Promise<void> | void
  ) {
    if (onFail) {
      await onFail()
    }

    if (error?.code === 'KASS#01') {
      dispatch(
        setModalAlertText({
          errorText: 'Amount you put is low to complete the transaction'
        })
      )
      return error?.code
    }

    if (error?.code === 'KASS#02') {
      dispatch(
        setModalAlertText({
          errorText: 'There was an error in the transaction, please recalculate'
        })
      )
      return error?.code
    }

    if (isError(error, 'ACTION_REJECTED')) {
      dispatch(setModalAlertText({ errorText: 'Transaction cancelled' }))
      return error.code
    }

    if (isError(error, 'CALL_EXCEPTION')) {
      const errorStr = error.toString().match(/(BAL#\d{0,3})/)
      const err = errorStr
        ? errorStr[0]
        : error?.message ?? 'Transaction reverted'

      dispatch(setModalAlertText({ errorText: err }))
      console.log(error)
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

    dispatch(setModalAlertText({ errorText: error.toString() }))
    return
  }

  return {
    txNotification,
    transactionErrors
  }
}

export default useTransaction
