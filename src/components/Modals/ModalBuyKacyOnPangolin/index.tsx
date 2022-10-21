import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import type {
  SwapWidget as SwapWidgetType,
  PangolinProvider as PangolinProviderType
} from '@pangolindex/components';

import { useAppSelector } from '../../../store/hooks'

import { Kacy } from '../../../constants/tokenAddresses'

import Button from '../../Button'
import ModalWalletConnect from '../ModalWalletConnect'

import web3, { provider } from '../../../utils/web3'

import spinerIcon from '../../../../public/assets/iconGradient/spinner.png'

import swapTheme from './swapTheme.json'
import * as S from './styles'

//eslint-disable-next-line prettier/prettier
const SwapWidget = dynamic(() => import('@pangolindex/components').then((module) => module.SwapWidget) as any, {
ssr: false,
}) as typeof SwapWidgetType;

const PangolinProvider = dynamic(
  // eslint-disable-next-line prettier/prettier
  () => import('@pangolindex/components').then((module) => module.PangolinProvider) as any,
  { ssr: false },
) as typeof PangolinProviderType;

interface IModalBuyKacyOnPangolinProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBuyKacyOnPangolin = ({
  modalOpen,
  setModalOpen
}: IModalBuyKacyOnPangolinProps) => {
  const [isModalWallet, setIsModaWallet] = React.useState<boolean>(false)

  function handleCloseModal() {
    setModalOpen(false)
  }

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const connect = localStorage.getItem('walletconnect')

  return (
    <>
      <S.Backdrop
        style={{ display: modalOpen ? 'block' : 'none' }}
        onClick={handleCloseModal}
      />
      <S.LoadingContainer>
        <S.LoadingContent>
          <S.textContainer>
            <S.Spinner>
              <Image src={spinerIcon} />
            </S.Spinner>
            <p>Initializing Pangolin widget...</p>
          </S.textContainer>
          {userWalletAddress === '' && (
            <Button
              type="button"
              text="Connect Wallet"
              size="huge"
              backgroundSecondary
              fullWidth
              onClick={() => setIsModaWallet(true)}
            />
          )}
        </S.LoadingContent>
      </S.LoadingContainer>
      <PangolinProvider account={userWalletAddress} chainId={chainId} library={connect ? provider : web3.currentProvider} theme={swapTheme}>
        {userWalletAddress !== '' && (
          <S.ModalBuyKacyContainer modalOpen={modalOpen}>
            <SwapWidget isLimitOrderVisible={false} defaultOutputToken={Kacy} />
          </S.ModalBuyKacyContainer>
        )}
      </PangolinProvider>
      {isModalWallet && <ModalWalletConnect setModalOpen={setIsModaWallet} />}
    </>
  )
}

export default ModalBuyKacyOnPangolin
