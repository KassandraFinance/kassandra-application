import React from 'react'
import { useRouter } from 'next/router'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { networks } from '@/constants/tokenAddresses'

import usePoolInfo from '@/hooks/usePoolInfo'
import useManagePool from '@/hooks/useManagePoolEthers'

import Button from '@/components/Button'
import Modal from '@/components/Modals/Modal'
import Overlay from '@/components/Overlay'

import * as S from './styles'

interface IPrivacySettingsModal {
  onClose: () => void
}

const PrivacySettingsModal = ({ onClose }: IPrivacySettingsModal) => {
  const [isTransaction, setIsTransaction] = React.useState(false)

  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()
  const { poolInfo } = usePoolInfo(
    wallet ? getAddress(wallet.accounts[0].address) : '',
    poolId
  )

  const chainId = parseInt(connectedChain?.id ?? '0x89', 16)

  const { setPublicPool } = useManagePool(
    poolInfo?.controller ?? '',
    networks[chainId].rpc
  )

  async function handleMakePublic() {
    setIsTransaction(true)

    async function handleSuccess() {
      setIsTransaction(false)
      onClose()
    }

    function handleFail() {
      setIsTransaction(false)
    }

    const text = {
      success: 'Pool is now public!'
    }

    await setPublicPool(handleSuccess, handleFail, text)
  }

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
            You can&apos;t undo this action. Are you sure you want to proceed?
          </S.WarningText>

          <S.ButtonContainer>
            {poolInfo?.chain_id === chainId ? (
              <>
                {!isTransaction ? (
                  <Button
                    text="Make it Public"
                    backgroundSecondary
                    fullWidth
                    onClick={() => handleMakePublic()}
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
                      setChain({
                        chainId: `0x${poolInfo.chain_id.toString(16)}`
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
