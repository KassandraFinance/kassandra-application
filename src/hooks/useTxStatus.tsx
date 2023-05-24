import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { ToastInfo, ToastSuccess } from '@/components/Toastify/toast'
import { ContractTransactionResponse } from 'ethers'

const useTxStatus = () => {
  const dispatch = useAppDispatch()

  async function txNotification(tx: ContractTransactionResponse) {
    ToastInfo('Transaction pending')
    const receipt = await tx.wait()

    if (receipt?.blockNumber && receipt?.status === 1) {
      ToastSuccess('Transaction success')
      return receipt.status
    } else {
      dispatch(setModalAlertText({ errorText: 'Transaction failed' }))
      return receipt?.status || 0
    }
  }

  return {
    txNotification
  }
}

export default useTxStatus
