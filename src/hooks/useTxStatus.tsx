import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { ToastInfo, ToastSuccess } from '@/components/Toastify/toast'
import { ContractTransactionResponse } from 'ethers'

const useTxStatus = () => {
  const dispatch = useAppDispatch()

  async function txNotification(tx: ContractTransactionResponse) {
    ToastInfo('Transaction is Pending')
    const receipt = await tx.wait()

    if (receipt?.blockNumber && receipt?.status === 1) {
      ToastSuccess('Transaction concluded')
      return receipt.status
    } else {
      dispatch(setModalAlertText({ errorText: 'Transaction reverted' }))
      return receipt?.status || 0
    }
  }

  return {
    txNotification
  }
}

export default useTxStatus
