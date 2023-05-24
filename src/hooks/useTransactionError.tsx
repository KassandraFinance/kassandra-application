import { isError } from 'ethers'

import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

export const useTransactionError = () => {
  const dispatch = useAppDispatch()

  function transactionErrors(error: unknown) {
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
  }

  return {
    transactionErrors
  }
}

export default useTransactionError
