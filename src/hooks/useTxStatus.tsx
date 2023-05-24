import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { ToastInfo, ToastSuccess } from '@/components/Toastify/toast'
import { ContractTransactionResponse } from 'ethers'

const useTxStatus = () => {
  const dispatch = useAppDispatch()

  async function txNotification(tx: ContractTransactionResponse) {
    // Send pending notifications
    ToastInfo('Transaction pending')

    // Await for transaction receipt
    const receipt = await tx.wait()

    if (receipt?.blockNumber && receipt?.status === 1) {
      // If status code 1 then send success toast
      ToastSuccess('Transaction success')
      return receipt.status
    } else {
      // If status code 1 or null send transaction failed modal
      dispatch(setModalAlertText({ errorText: 'Transaction failed' }))
      return receipt?.status || 0
    }
  }

  return {
    txNotification
  }
}

export default useTxStatus
