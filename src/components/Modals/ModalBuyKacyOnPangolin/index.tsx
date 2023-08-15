import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
// import { NetworkContextName } from '@pangolindex/components'
import { createWeb3ReactRoot } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { Kacy, networks } from '@/constants/tokenAddresses'

import Button from '@/components/Button'
import Overlay from '@/components/Overlay'

import spinerIcon from '@assets/iconGradient/spinner.png'

import swapTheme from './swapTheme.json'
import * as S from './styles'

const SwapWidget = dynamic(
  () => import('@pangolindex/components').then(module => module.SwapWidget),
  {
    ssr: false
  }
)

const PangolinProvider = dynamic(
  () =>
    import('@pangolindex/components').then(module => module.PangolinProvider),
  { ssr: false }
)

const Web3ReactProvider = dynamic(
  () => import('@web3-react/core').then(module => module.Web3ReactProvider),
  { ssr: false }
)

const Web3ProviderNetwork =
  typeof window !== 'undefined' && createWeb3ReactRoot('NETWORK')

function getLibrary(provider: any): Web3Provider {
  try {
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 15000
    return library
  } catch (error) {
    return provider
  }
}

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
              background="secondary"
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
      {Web3ProviderNetwork &&
        wallet?.provider &&
        Number(wallet.chains[0].id) === avalanche.chainId && (
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
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
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        )}
    </>
  )
}

export default ModalBuyKacyOnPangolin
