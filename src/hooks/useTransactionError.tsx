import { isError } from 'ethers'

import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

export const useTransactionError = () => {
  const dispatch = useAppDispatch()

  function transactionErrors(error: unknown) {
    if (isError(error, 'ACTION_REJECTED')) {
      console.log('CAIU AQUII')
      dispatch(setModalAlertText({ errorText: 'Transaction cancelled' }))
    }

    if (isError(error, 'CALL_EXCEPTION')) {
      dispatch(setModalAlertText({ errorText: 'Transaction reverted' }))
    }

    if (isError(error, 'INSUFFICIENT_FUNDS')) {
      dispatch(setModalAlertText({ errorText: '' }))
    }

    if (isError(error, 'NONCE_EXPIRED')) {
      dispatch(setModalAlertText({ errorText: '' }))
    }
  }

  return {
    transactionErrors
  }
}

export default useTransactionError
