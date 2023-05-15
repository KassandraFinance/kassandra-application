import React from 'react'
import { useRouter } from 'next/router'
import { AbiItem } from 'web3-utils'

import web3 from '@/utils/web3'
import waitTransaction, { MetamaskError } from '@/utils/txWait'
import { networks } from '@/constants/tokenAddresses'
import changeChain from '@/utils/changeChain'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'
import usePoolInfo from '@/hooks/usePoolInfo'

import KassandraControlerAbi from '@/constants/abi/KassandraController.json'

import Button from '@/components/Button'
import Modal from '@/components/Modals/Modal'
import Overlay from '@/components/Overlay'
import { ToastSuccess } from '@/components/Toastify/toast'

import * as S from './styles'

interface IPrivacySettingsModal {
  onClose: () => void
}

const PrivacySettingsModal = ({ onClose }: IPrivacySettingsModal) => {
  const [isTransaction, setIsTransaction] = React.useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  async function callBack(error: MetamaskError, txHash: string) {
    if (error) {
      if (error.code === 4001) {
        dispatch(setModalAlertText({ errorText: `Approval cancelled` }))

        setIsTransaction(false)

        return false
      }

      dispatch(
        setModalAlertText({
          errorText: error.message
        })
      )

      setIsTransaction(false)

      return false
    }

    const txReceipt = await waitTransaction(txHash)

    if (txReceipt.status) {
      ToastSuccess('Pool is now public!')
      onClose()

      return true
    } else {
      dispatch(
        setModalAlertText({
          errorText: 'Transaction reverted'
        })
      )

      setIsTransaction(false)

      return false
    }
  }

  async function handleMakePublic(poolControler: string) {
    setIsTransaction(true)
    // eslint-disable-next-line prettier/prettier
    const controller = new web3.eth.Contract(
      KassandraControlerAbi as unknown as AbiItem,
      poolControler
    )

    await controller.methods.setPublicPool().send(
      {
        from: userWalletAddress
      },
      callBack
    )
  }

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { poolInfo } = usePoolInfo(userWalletAddress, poolId)

  return (
    <S.PrivacySettingsModal>
      <Overlay onClick={onClose} />

      <Modal title="Privacy Settings" onCloseModal={onClose}>
        <S.Content>
          <S.Title>Turn into a Public Pool</S.Title>

          <S.Text>
            Anyone can invest in the investment pool that you are managing.
          </S.Text>

          <S.WarningText>
            You can't undo this action. Are you sure you want to proceed?
          </S.WarningText>

          <S.ButtonContainer>
            {poolInfo?.chain_id === chainId ? (
              <>
                {!isTransaction ? (
                  <Button
                    text="Make it Public"
                    backgroundSecondary
                    fullWidth
                    onClick={() => handleMakePublic(poolInfo.controller)}
                  />
                ) : (
                  <Button
                    text="Waiting transaction"
                    type="button"
                    backgroundPrimary
                    disabled
                    fullWidth
                  />
                )}
              </>
            ) : (
              <>
                {poolInfo?.chain_id && (
                  <Button
                    text={`Connect to ${networks[poolInfo.chain_id].chainName}`}
                    backgroundPrimary
                    fullWidth
                    type="button"
                    onClick={() =>
                      changeChain({
                        chainId: networks[poolInfo.chain_id].chainId,
                        chainName: networks[poolInfo.chain_id].chainName,
                        rpcUrls: [networks[poolInfo.chain_id].rpc],
                        nativeCurrency:
                          networks[poolInfo.chain_id].nativeCurrency
                      })
                    }
                  />
                )}
              </>
            )}

            {!isTransaction && (
              <Button
                text="Keep it Private"
                backgroundBlack
                fullWidth
                onClick={onClose}
              />
            )}
          </S.ButtonContainer>
        </S.Content>
      </Modal>
    </S.PrivacySettingsModal>
  )
}

export default PrivacySettingsModal
