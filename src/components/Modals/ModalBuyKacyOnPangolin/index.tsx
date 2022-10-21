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

import Web3Modal from 'web3modal';
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
  const [web3Modal, setWeb3Modal] = React.useState<Web3Modal>()
  const [web3ModalProvider, setWeb3ModalProvider] = React.useState()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  React.useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            logo: 'data:image/gif;base64,INSERT_BASE64_STRING',
            name: 'Injected',
            description: 'Connect with the provider in your Browser',
          },
          package: null,
        },
      },
    });

    setWeb3Modal(web3Modal);
  }, []);

  const connectWallet = async () => {
    try {
      const web3provider = await web3Modal?.connect();
      setWeb3ModalProvider(web3provider)
    } catch (error: any) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (web3Modal?.cachedProvider && userWalletAddress) {
      connectWallet();
    }
  }, [web3Modal, userWalletAddress]);


  function handleCloseModal() {
    setModalOpen(false)
  }

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
      {userWalletAddress !== '' && (
        <PangolinProvider account={userWalletAddress} chainId={chainId} library={web3ModalProvider} theme={swapTheme}>
            <S.ModalBuyKacyContainer modalOpen={modalOpen}>
              <SwapWidget isLimitOrderVisible={false} defaultOutputToken={Kacy} />
            </S.ModalBuyKacyContainer>
        </PangolinProvider>
      )}
      {isModalWallet && <ModalWalletConnect setModalOpen={setIsModaWallet} />}
    </>
  )
}

export default ModalBuyKacyOnPangolin
