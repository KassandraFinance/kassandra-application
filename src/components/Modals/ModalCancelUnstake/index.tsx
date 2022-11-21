/* eslint-disable prettier/prettier */
import React from 'react'
import { ToastSuccess, ToastWarning } from '../../Toastify/toast'

import useStakingContract from '../../../hooks/useStakingContract'
import useMatomoEcommerce from '../../../hooks/useMatomoEcommerce'
import { useAppDispatch } from '../../../store/hooks'
import { setModalAlertText } from '../../../store/reducers/modalAlertText'

import waitTransaction, {
  MetamaskError,
  TransactionCallback
} from '../../../utils/txWait'

import { Staking } from '../../../constants/tokenAddresses'

import Button from '../../Button'
import Overlay from '../../Overlay'

import * as S from './styles'

interface IModalRequestUnstakeProps {
  openStakeAndWithdraw: (transaction: 'staking' | 'unstaking') => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pid: number;
  staking: boolean;
  symbol: string;
}

const ModalCancelUnstake = ({
  setModalOpen,
  openStakeAndWithdraw,
  pid,
  staking,
  symbol
}: IModalRequestUnstakeProps) => {
  const dispatch = useAppDispatch()
  const kacyStake = useStakingContract(Staking)

  const { trackEventFunction } = useMatomoEcommerce()

  const cancelUnstakeCallback = React.useCallback((): TransactionCallback => {
    return async (error: MetamaskError, txHash: string) => {
      if (error) {
        if (error.code === 4001) {
          dispatch(
            setModalAlertText({
              errorText: `Request for cancelling unstaking ${symbol} cancelled`
            })
          )
          return
        }

        dispatch(
          setModalAlertText({
            errorText: `Failed to cancel unstaking of ${symbol}. Please try again later.`
          })
        )
        return
      }

      trackEventFunction(
        'click-on-cancel',
        `${symbol}`,
        'modal-cancel-unstaking'
      )
      ToastWarning(`Confirming cancelling of unstaking ${symbol}...`)
      const txReceipt = await waitTransaction(txHash)

      if (txReceipt.status) {
        ToastSuccess(`Cancelling of unstaking ${symbol} completed`)
        return
      }
    }
  }, [symbol])

  return (
    <>
      <Overlay onClick={() => setModalOpen(false)} />

      <S.ModalContainer>
        <S.Top>
          <S.Attention>
            <img src="assets/notificationStatus/error.svg" alt="" />
            <p>Warning!</p>
          </S.Attention>
          <S.Close type="button" onClick={() => setModalOpen(false)}>
            <img src="assets/utilities/close-icon.svg" alt="Close" />
          </S.Close>
        </S.Top>
        <S.Content>
          {staking ? (
            <p>By staking you will reset your withdraw time.</p>
          ) : (
            <p>
              By cancelling the withdraw you will reset your withdrawal time.
            </p>
          )}
          <p>Do you want to proceed ?</p>
          <S.ButtonContainer>
            <Button
              as="button"
              text="No"
              backgroundSecondary
              onClick={() => setModalOpen(false)}
            />
            <Button
              as="button"
              text="Yes"
              backgroundSecondary
              onClick={() => {
                if (staking) {
                  openStakeAndWithdraw('staking')
                } else {
                  kacyStake.cancelUnstake(pid, cancelUnstakeCallback())
                }
                setModalOpen(false)
              }}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.ModalContainer>
    </>
  )
}

export default ModalCancelUnstake
