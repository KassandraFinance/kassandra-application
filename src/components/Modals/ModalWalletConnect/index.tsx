import React from 'react'
// import { useRouter } from 'next/router'
import detectEthereumProvider from '@metamask/detect-provider'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

// import { useAppDispatch, useAppSelector } from '../../../store/hooks'
// import { setModalWalletActive } from '../../../store/reducers/modalWalletActive'

// import useConnect from '../../../hooks/useConnect'
import useMatomoEcommerce from '../../../hooks/useMatomoEcommerce'

// import WalletConnecting from './WalletConnecting'
// import ModalConnectError from './ModalConnectError'
import Overlay from '../../Overlay'
import Modal from '../Modal'

import * as S from './styles'

const ModalWalletConnect = () => {
  const [hasEthereumProvider, setHasEthereumProvider] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  // const [provider, setProvider] = React.useState('')

  // const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  // const dispatch = useAppDispatch()

  // const {
  //   connect,
  //   connectToWalletConnect,
  //   isConnected,
  //   metaMaskError,
  //   cleanError
  // } = useConnect()
  const { trackEventFunction } = useMatomoEcommerce()

  // const router = useRouter()

  function handleCloseModal() {
    // const pahtName = router.pathname
    // const asPathId = router.asPath.slice(8)
    // if (pahtName === '/profile') {
    //   router.push(`/profile/${userWalletAddress}${asPathId}`)
    // }
    // if (metaMaskError) {
    //   cleanError()
    // }
    // dispatch(setModalWalletActive(false))
  }

  // function handleConnect() {
  //   setLoading(true)
  //   connect()
  // }

  React.useEffect(() => {
    const checkEthereumProvider = async () => {
      const provider = await detectEthereumProvider()

      if (provider) {
        setHasEthereumProvider(true)
      } else {
        setHasEthereumProvider(false)
      }
    }

    checkEthereumProvider()
  }, [])

  return (
    <S.ModalWalletConnect>
      <Overlay onClick={handleCloseModal} />

      <Modal
        title="Wallet connection is required"
        onCloseModal={handleCloseModal}
      >
        {!loading ? (
          <S.Content>
            <Tippy
              content={
                <S.Tooltip>
                  <a
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Metamask
                    <img src="/assets/utilities/external-link.svg" alt="" />
                  </a>
                  is not installed on this browser
                </S.Tooltip>
              }
              disabled={hasEthereumProvider}
              hideOnClick={false}
              interactive
            >
              <S.WrapperIconsBackGround
                className={hasEthereumProvider ? '' : 'disabled'}
                type="button"
                onClick={() => {
                  if (hasEthereumProvider) {
                    trackEventFunction(
                      'click-on-button',
                      'metamask',
                      'header-modal-connect'
                    )
                    // setProvider('metamask')
                    setLoading(true)
                    // connect()
                  }
                }}
              >
                <S.WrapperIcons>
                  <img src="/assets/logos/metamask.svg" alt="" />
                  <span>Metamask</span>
                </S.WrapperIcons>
              </S.WrapperIconsBackGround>
            </Tippy>

            <S.WrapperIconsBackGround
              type="button"
              onClick={() => {
                trackEventFunction(
                  'click-on-button',
                  'wallet-connect',
                  'header-modal-connect'
                )
                // setProvider('walletConnect')
                setLoading(true)
                // connectToWalletConnect()
              }}
            >
              <S.WrapperIcons>
                <img src="/assets/logos/connect-wallet.svg" alt="" />
                <span>WalletConnect</span>
              </S.WrapperIcons>
            </S.WrapperIconsBackGround>
          </S.Content>
        ) : (
          <S.Content>
            {/* {!metaMaskError ? (
              <WalletConnecting
                provider={provider}
                isConnected={isConnected}
                handleCloseModal={handleCloseModal}
              />
            ) : (
              <ModalConnectError
                provider={provider}
                metaMaskError={metaMaskError}
                handleCloseModal={handleCloseModal}
                handleConnect={handleConnect}
                cleanError={cleanError}
              />
            )} */}
          </S.Content>
        )}
      </Modal>
    </S.ModalWalletConnect>
  )
}

export default ModalWalletConnect
