import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Web3 from 'web3';
import {
  SwapWidget as SwapWidgetType,
  PangolinProvider as PangolinProviderType
} from '@pangolindex/components';

import { useAppSelector } from '../../../store/hooks'

import { Kacy } from '../../../constants/tokenAddresses'

import Button from '../../Button'
import ModalWalletConnect from '../ModalWalletConnect'
import Overlay from '../../Overlay';

import { provider } from '../../../utils/web3';

import spinerIcon from '../../../../public/assets/iconGradient/spinner.png'

import swapTheme from './swapTheme.json'
import * as S from './styles'


//eslint-disable-next-line prettier/prettier
const SwapWidget = dynamic(() => import('@pangolindex/components').then((module) => module.SwapWidget) as any, {
ssr: false,
}) as typeof SwapWidgetType;

const PangolinProvider = dynamic(
  () => import('@pangolindex/components').then((module) => module.PangolinProvider) as any,
  { ssr: false },
) as typeof PangolinProviderType;

interface IModalBuyKacyOnPangolinProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBuyKacyOnPangolin = ({
  setModalOpen
}: IModalBuyKacyOnPangolinProps) => {
  const [isModalWallet, setIsModaWallet] = React.useState<boolean>(false)

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const connect = localStorage.getItem('walletconnect')

  const walletProvider = new Web3(provider as any);

  function handleCloseModal() {
    setModalOpen(false)
  }

  React.useEffect(() => {
    connect && handleCloseModal()
  }, [connect])

  return (
    <>
      <Overlay onClick={handleCloseModal}/>

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
      {userWalletAddress !== '' && (
        <PangolinProvider account={userWalletAddress} chainId={chainId} library={walletProvider.givenProvider} theme={swapTheme}>
            <S.ModalBuyKacyContainer>
              <SwapWidget isLimitOrderVisible={false} defaultOutputToken={Kacy} />
            </S.ModalBuyKacyContainer>
        </PangolinProvider>
      )}
      {isModalWallet && <ModalWalletConnect setModalOpen={setIsModaWallet} />}
    </>
  )
}

export default ModalBuyKacyOnPangolin
