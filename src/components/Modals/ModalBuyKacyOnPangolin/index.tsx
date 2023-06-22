import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import {
  SwapWidget as SwapWidgetType,
  PangolinProvider as PangolinProviderType
} from '@pangolindex/components'

import { Kacy, networks } from '@/constants/tokenAddresses'

import Button from '@/components/Button'
import Overlay from '@/components/Overlay'

import spinerIcon from '@assets/iconGradient/spinner.png'

import swapTheme from './swapTheme.json'
import * as S from './styles'

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
  const [{ wallet }] = useConnectWallet()
  const [{ settingChain }, setChain] = useSetChain()

  const avalanche = networks[43114]

  function handleCloseModal() {
    setModalOpen(false)
  }

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
          {wallet?.provider &&
          avalanche.chainId !== Number(wallet.chains[0].id) ? (
            <Button
              type="button"
              text="Connect to Avalanche Mainnet"
              size="huge"
              backgroundSecondary
              fullWidth
              disabledNoEvent={settingChain}
              onClick={() =>
                setChain({
                  chainId: `0x${avalanche.chainId.toString(16)}`
                })
              }
            />
          ) : null}
        </S.LoadingContent>
      </S.LoadingContainer>
      {wallet?.provider &&
        Number(wallet.chains[0].id) === avalanche.chainId && (
          <PangolinProvider
            account={wallet.accounts[0].address}
            chainId={Number(wallet.chains[0].id)}
            library={wallet.provider}
            theme={swapTheme}
          >
            <S.ModalBuyKacyContainer>
              <SwapWidget
                isLimitOrderVisible={false}
                defaultOutputToken={Kacy}
              />
            </S.ModalBuyKacyContainer>
          </PangolinProvider>
        )}
    </>
  )
}

export default ModalBuyKacyOnPangolin
