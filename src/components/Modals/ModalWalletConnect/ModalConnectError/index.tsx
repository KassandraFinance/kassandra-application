import Image from 'next/image'
import React from 'react'

import Button from '../../../Button'

import metamaskIcon from '../../../../../public/assets/logos/metamask.svg'
import walletConnectIcon from '../../../../../public/assets/logos/connect-wallet.svg'

import * as S from './styles'

type ProviderType = {
  [key: string]: {
    icon: string
    name: string
  }
}

interface IWalletConnectingProps {
  provider: string
  metaMaskError: string
  handleCloseModal(): void
  handleConnect(): void
  cleanError: () => void
}

const ModalConnectError = ({
  provider,
  metaMaskError,
  handleCloseModal,
  handleConnect,
  cleanError
}: IWalletConnectingProps) => {
  const providers: ProviderType = {
    metamask: {
      icon: metamaskIcon,
      name: 'Metamask'
    },
    walletConnect: {
      icon: walletConnectIcon,
      name: 'walletConnect'
    }
  }

  return (
    <>
      <S.TitleWrapper>
        <Image src={providers[provider].icon} width={40} height={36} />
        {providers[provider].name}
      </S.TitleWrapper>

      <S.Text>Oops...</S.Text>

      <S.TextError>{metaMaskError}</S.TextError>

      <S.ButtonWrapper>
        <Button
          text="Retry"
          background="secondary"
          fullWidth
          onClick={() => {
            handleConnect()
            cleanError()
          }}
        />
        <Button
          text="Cancel"
          background="black"
          fullWidth
          onClick={handleCloseModal}
        />
      </S.ButtonWrapper>
    </>
  )
}

export default ModalConnectError
