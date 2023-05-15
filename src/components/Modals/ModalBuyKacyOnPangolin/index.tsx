import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Web3 from 'web3'
import {
  SwapWidget as SwapWidgetType,
  PangolinProvider as PangolinProviderType
} from '@pangolindex/components'

import { useAppSelector } from '../../../store/hooks'

import { Kacy, networks } from '../../../constants/tokenAddresses'

import Button from '../../Button'
import Overlay from '../../Overlay'

import { provider } from '../../../utils/web3'
import changeChain from '@/utils/changeChain'

import spinerIcon from '../../../../public/assets/iconGradient/spinner.png'

import swapTheme from './swapTheme.json'
import * as S from './styles'

//eslint-disable-next-line prettier/prettier
const SwapWidget = dynamic(
  () =>
    import('@pangolindex/components').then(module => module.SwapWidget) as any,
  {
    ssr: false
  }
) as typeof SwapWidgetType

const PangolinProvider = dynamic(
  () =>
    import('@pangolindex/components').then(
      module => module.PangolinProvider
    ) as any,
  { ssr: false }
) as typeof PangolinProviderType

interface IModalBuyKacyOnPangolinProps {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalBuyKacyOnPangolin = ({
  setModalOpen
}: IModalBuyKacyOnPangolinProps) => {
  const [isModalWallet, setIsModaWallet] = React.useState<boolean>(false)

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)
  const avalanche = networks[43114]

  const connect = localStorage.getItem('walletconnect')

  const walletProvider = new Web3(provider as any)

  function handleCloseModal() {
    setModalOpen(false)
  }

  React.useEffect(() => {
    connect && handleCloseModal()
  }, [connect])

  return (
    <>
      <Overlay onClick={handleCloseModal} />

      <S.LoadingContainer>
        <S.LoadingContent>
          <S.textContainer>
            <S.Spinner>
              <Image src={spinerIcon} />
            </S.Spinner>
            <p>Initializing Pangolin widget...</p>
          </S.textContainer>
          {userWalletAddress === '' ? (
            <Button
              type="button"
              text="Connect Wallet"
              size="huge"
              backgroundSecondary
              fullWidth
              onClick={() => setIsModaWallet(true)}
            />
          ) : avalanche.chainId !== chainId ? (
            <Button
              type="button"
              text="Connect to Avalanche Mainnet"
              size="huge"
              backgroundSecondary
              fullWidth
              onClick={() =>
                changeChain({
                  chainId: avalanche.chainId,
                  rpcUrls: [avalanche.rpc],
                  chainName: avalanche.chainName,
                  nativeCurrency: avalanche.nativeCurrency
                })
              }
            />
          ) : (
            <></>
          )}
        </S.LoadingContent>
      </S.LoadingContainer>
      {userWalletAddress !== '' && chainId === avalanche.chainId && (
        <PangolinProvider
          account={userWalletAddress}
          chainId={chainId}
          library={walletProvider.givenProvider}
          theme={swapTheme}
        >
          <S.ModalBuyKacyContainer>
            <SwapWidget isLimitOrderVisible={false} defaultOutputToken={Kacy} />
          </S.ModalBuyKacyContainer>
        </PangolinProvider>
      )}
    </>
  )
}

export default ModalBuyKacyOnPangolin
